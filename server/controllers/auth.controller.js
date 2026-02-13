const authService = require('../services/auth.service');

class AuthController {
    async signup(req, res, next) {
        try {
            const { username, email, password, role } = req.body;
            const user = await authService.signup(username, email, password, role);
            res.status(201).json(user);
        } catch (error) {
            console.error('Signup error:', error);
            res.status(400).json({ error: error.message || 'Signup failed' });
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);

            // Send refresh token as HTTP-only cookie
            res.cookie('refreshToken', result.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.json({ user: result.user, accessToken: result.accessToken });
        } catch (error) {
            console.error('Login error:', error);
            res.status(401).json({ error: error.message || 'Login failed' });
        }
    }

    async refresh(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            const result = await authService.refresh(refreshToken);

            res.cookie('refreshToken', result.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.json({ accessToken: result.accessToken });
        } catch (error) {
            res.status(403).json({ error: error.message });
        }
    }

    async logout(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            await authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.json({ message: 'Logged out successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();
