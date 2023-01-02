import crypto from 'crypto';
import passport from 'passport';
import local from 'passport-local';
import { logger } from '../entities/logger.js';
import { createHash, isValidHash } from '../utils/utilities.js';

const LocalStrategy = local.Strategy;

//TODO replace credentials with db implementation
const credentials = {
	email: 'test@test.com',
	password: '1234abcd'
};

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
					// if (req.session && req.session.token) {
					// 	return done(null, false);
					// }

					// verification of the request
					// should contain all field from request
					// const {} = req.body;
					// if invalid body return

					if (!email || !password) {
						return done(null, false, {
							message: 'missing fields'
						});
					}

					const verifyPayload = () => {
						if (email !== credentials.email || password !== credentials.password) {
							return false;
						}
						return true;
					};

					if (!verifyPayload()) {
						return done(null, false);
					}

					// dto for session store filter
					const user = {
						email: email,
						id: crypto.randomUUID()
					};

					// store user in db with db.service in a separate process

					return done(null, user);
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
						return done(null, false);
					}

					// user from db
					const user = credentials;

					if (email !== user.email) {
						return done(null, false);
					}

					// dto filter whats necesary
					const payload = {
						email: user.email,
						id: crypto.randomUUID()
					};

					if (email === user.email && password === user.password) {
						return done(null, payload);
					}

					//TODO this is required for hashing implementation
					// if (isValidHash(user, password)) {
					// 	return done(null, user);
					// }

					// failed auth
					return done(null, false);
				} catch (err) {
					logger.log(err);
				}
			}
		)
	);

	// 	//TODO after db implementation double check and remove
	// passport.serializeUser((user, done) => {
	// 	console.log('serializeWasUse');
	// 	done(null, user);
	// });
	// passport.deserializeUser(async (user, done) => {
	// 	// let result = await services.userService.getByEmail(user.email);
	// 	console.log('deserializeWasUse');
	// 	const result = credentials;
	// 	return done(null, { email: result.email });
	// });
};
