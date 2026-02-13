const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repo');
const tokenRepository = require('../repositories/token.repo');
const config = require('../config/default');

// Ensure secrets are available
const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || 'access-secret-key';
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret-key';

class AuthService {
    async signup(username, email, password, role) {
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userRepository.create(username, email, hashedPassword, role);
        delete user.password_hash;
        return user;
    }

    async login(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            throw new Error('Invalid credentials');
        }

        const tokens = this.generateTokens(user);
        await tokenRepository.save(tokens.refreshToken, user.id, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)); // 7 days

        delete user.password_hash;
        return { user, ...tokens };
    }

    async refresh(refreshToken) {
        if (!refreshToken) throw new Error('Refresh token required');

        const tokenRecord = await tokenRepository.find(refreshToken);
        if (!tokenRecord) throw new Error('Invalid refresh token');

        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
                if (err) return reject(new Error('Invalid refresh token'));

                const user = await userRepository.findById(decoded.id);
                if (!user) return reject(new Error('User not found'));

                // Rotate refresh token
                await tokenRepository.revoke(refreshToken);
                const newTokens = this.generateTokens(user);
                await tokenRepository.save(newTokens.refreshToken, user.id, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

                resolve({ accessToken: newTokens.accessToken, refreshToken: newTokens.refreshToken });
            });
        });
    }

    async logout(refreshToken) {
        if (refreshToken) {
            await tokenRepository.revoke(refreshToken);
        }
    }

    generateTokens(user) {
        const payload = { id: user.id, role: user.role };
        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        return { accessToken, refreshToken };
    }
}

module.exports = new AuthService();
