const express = require('express');

const Token = require('../models/token');
const { generateAccessToken } = require('../auth/GenerateTokens');
const getTokenFromHeaders = require('../lib/getTokenFromHeaders');
const { verifyRefreshToken } = require('../lib/verifyTokens');
const refreshTokenRoutes = express.Router();

refreshTokenRoutes.post('/', async (req, res) => {
    const refreshToken = getTokenFromHeaders(req.headers);
    if (refreshToken) {
        try {
            const found = await Token.findOne({ token: refreshToken });
            if (!found) {
                return res.status(400).json({ error: 'Unauthorized1' });
            }
            const payload = verifyRefreshToken(found.token);
            if (payload) {
                const accessToken = generateAccessToken(payload.user);
                return res.status(200).json({ accessToken });
            } else {
                return res.status(400).json({ error: 'Unauthorized2' });
            }
        } catch (err) {
            return res.status(400).json({ error: 'Unauthorized3' });
        }
    } else {
        return res.status(400).json({ error: 'Unauthorized4' });
    }
});

module.exports = refreshTokenRoutes;