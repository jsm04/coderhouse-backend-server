import crypto from 'crypto';
import passport from 'passport';
import local from 'passport-local';
import { logger } from '../entities/logger.js';
import { userService } from '../services/services.index.js';
import { createHash, isValidHash } from '../utils/utilities.js';

const LocalStrategy = local.Strategy;

export const registerPassportStrategies = () => {
	passport.use(
		'register',
		new LocalStrategy(
			{
				passReqToCallback: true,
				usernameField: 'email'
			},
			async (req, email, password, done) => {
				try {
					if (req.session.user) {
						return done(null, false, {
							message: 'session still active'
						});
					}

					const { name, lastname, username } = req.body;

					if ((!name, !lastname, !username, !password, !email)) {
						return done(null, false, {
							message: 'required field missing'
						});
					}

					const dbQuery = await userService.getByParam({ email: email });

					const userExists = dbQuery.length > 0;

					if (userExists) {
						return done(null, false, {
							message: 'email already in use'
						});
					}
					const user = {
						email,
						password: createHash(password),
						username,
						name,
						lastname
					};

					const userPayload = await userService.save(user);

					return done(null, userPayload);
				} catch (err) {
					logger.error(err);
				}
			}
		)
	);

	passport.use(
		'login',
		new LocalStrategy(
			{
				usernameField: 'email'
			},
			async (email, password, done) => {
				try {
					if (!password || !email) {
						return done(null, false), { message: 'required field missing' };
					}

					const dbQuery = await userService.getByParam({ email: email });

					const userExists = dbQuery.length > 0;

					if (!userExists) {
						return done(null, false, { message: 'email not registered' });
					}

					const user = dbQuery[0];

					const validatePayload = () => {
						if (user.email === email && isValidHash(password)) {
							return true;
						}
						return false;
					};

					if (!validatePayload) {
						return done(null, false, { message: 'wrong credentials' });
					}

					const payload = {
						email: user.email,
						id: user._id
					};

					return done(null, payload);
				} catch (err) {
					logger.error(err);
				}
			}
		)
	);
};
