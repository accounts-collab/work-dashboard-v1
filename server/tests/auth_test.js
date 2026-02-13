const axios = require('axios');
const { wrapper } = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');

const jar = new CookieJar();
const client = wrapper(axios.create({ jar, baseURL: 'http://localhost:5000' }));

async function testAuth() {
    try {
        console.log('--- Auth Test Started ---');

        // 1. Signup
        console.log('1. Testing Signup...');
        const uniqueSuffix = Date.now();
        const signupRes = await client.post('/api/auth/signup', {
            username: `testuser_${uniqueSuffix}`,
            email: `test_${uniqueSuffix}@example.com`,
            password: 'password123'
        });
        console.log('✅ Signup Successful:', signupRes.data.username);

        // 2. Login
        console.log('\n2. Testing Login...');
        const loginRes = await client.post('/api/auth/login', {
            email: `test_${uniqueSuffix}@example.com`,
            password: 'password123'
        });
        console.log('✅ Login Successful');
        const accessToken = loginRes.data.accessToken;
        console.log('Access Token:', accessToken ? 'Received' : 'Missing');

        // 3. Protected Route (with token)
        console.log('\n3. Testing Protected Route (with token)...');
        try {
            await client.get('/api/transactions', {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            console.log('✅ Protected Route Access Successful');
        } catch (err) {
            console.error('❌ Protected Route Failed:', err.response?.status, err.response?.data);
        }

        // 4. Protected Route (without token)
        console.log('\n4. Testing Protected Route (without token)...');
        try {
            await client.get('/api/transactions');
            console.error('❌ Protected Route should have failed but succeeded');
        } catch (err) {
            if (err.response?.status === 401) {
                console.log('✅ Protected Route correctly denied access (401)');
            } else {
                console.error('❌ Unexpected status:', err.response?.status);
            }
        }

        // 5. Refresh Token
        console.log('\n5. Testing Refresh Token...');
        try {
            const refreshRes = await client.post('/api/auth/refresh');
            console.log('✅ Refresh Token Successful');
            const newAccessToken = refreshRes.data.accessToken;
            console.log('New Access Token:', newAccessToken ? 'Received' : 'Missing');
        } catch (err) {
            console.error('❌ Refresh Token Failed:', err.response?.status, err.response?.data);
        }

        // 6. Logout
        console.log('\n6. Testing Logout...');
        await client.post('/api/auth/logout');
        console.log('✅ Logout Successful');

    } catch (error) {
        console.error('❌ Test Failed:', error.response?.data || error.message);
    }
}

testAuth();
