import jwt from 'jsonwebtoken';
import config from '../config/main.config.js';
import { accessToken } from '../entities/jwt.js';
import { logger } from '../entities/logger.js';

const isTokenExpired = (exp) => Date.now() >= exp * 1000;

export const validateAccessToken = async (req, res, next) => {
	try {
		if (!req.session || req.session.user) {
			return res.redirect('/login');
		}
		const atoken = req.session.token.accesstoken;
		const isTokenValid = jwt.verify(atoken, config.jwtAccessSecret, (err, decoded) => {
			if (err) {
				req.session.destroy();
				req.session = null;
				return res.redirect('/login');
			}
			if (isTokenExpired(decoded.exp)) return false;
			return true;
		});

		if (!isTokenValid) {
			return res.redirect('/api/v1/sessions/refresh');
		}
		return next();
	} catch (error) {
		logger.error(error);
	}
};
export const renewRefreshToken = async (req, res, next) => {
	try {
		if (!req.session.user) {
			return res.redirect('/login');
		}
		const rtoken = req.session.token.refreshtoken;
		const isTokenValid = jwt.verify(rtoken, config.jwtRefreshSecret, (err, decoded) => {
			if (err) {
				req.session.destroy();
				req.session = null;
				return res.redirect('/login');
			}
			if (isTokenExpired(decoded.exp)) return false;
			return true;
		});

		if (!isTokenValid) {
			req.session.destroy();
			req.session = null;
			return res.redirect('/login');
		}

		const redirectPath = req.header('Referer') || '/';
		const payload = req.session.user;

		req.session.token.accesstoken = accessToken(payload);

		return res.redirect(redirectPath);
	} catch (error) {
		logger.error(error);
	}
};

/*
jwt flow
1 When you do log in, send 2 tokens (Access token, Refresh token) in response to the client.
2 The access token will have less expiry time and Refresh will have long expiry time.
3 The client (Front end) will store refresh token in his local storage and access token in cookies.
4 The client will use an access token for calling APIs. But when it expires, you call auth server API to get the new token (refresh token is automatically added to http request since it's stored in cookies).
5 Your auth server will have an API exposed which will accept refresh token and checks for its validity and return a new access token.
6 Once the refresh token is expired, the User will be logged out.
*/
