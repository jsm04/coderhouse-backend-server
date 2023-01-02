import jwt from 'jsonwebtoken';
import config from '../config/main.config.js';

const accessSecret = config.jwtAccessSecret;
const refreshSecret = config.jwtRefreshSecret;

export const accessToken = (payload) => {
	return jwt.sign(payload, accessSecret, { expiresIn: '10m' });
};

export const refreshToken = (payload) => {
	return jwt.sign(payload, refreshSecret, { expiresIn: '1d' });
};

export const isTokenVerified = (accesstoken, refreshtoken) => {
	let message;
	jwt.verify(accesstoken, accessSecret, (err, decoded) => {
		const isExpired = Date.now() >= decoded.exp * 1000;
	});
	jwt.verify(refreshtoken, refreshSecret, (err, decoded) => {
		const isExpired = Date.now() >= decoded.exp * 1000;
		//login redirect
		if (err || isExpired) {
			return false;
		}
		return true;
	});
};

// visits route
// 	if token is ok continues
//	if access token is invalid request refresh access token
//	if refresh token is expired redirects to login
// 	if no token
