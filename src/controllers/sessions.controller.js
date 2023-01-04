import { accessToken, isTokenVerified, refreshToken } from '../entities/jwt.js';
import { logger } from '../entities/logger.js';

const getAndSetJwtTokens = (req, payload) => {
	const accesstoken = accessToken(payload);
	const refreshtoken = refreshToken(payload);
	req.session.user = payload;
	req.session.token = {
		accesstoken,
		refreshtoken
	};
};

const testHandler = (req, res) => {
	const { session } = req;
	if (!session.token) return res.send({ error: 'no session' });
	const response = {
		status: 'ok',
		session: req.session
	};
	res.send(response);
};

const registerHandler = (req, res) => {
	if (req.session && req.session.token) {
		return res.send({ status: 'error', message: 'user already has an active session' });
	}
	
	const { email, id } = req.user;

	const payload = {
		email,
		id
	};

	getAndSetJwtTokens(req, payload);

	return res.status(200).send({ status: 'success, user registered', user: req.session.user, token: req.session.token });
};

const loginHandler = (req, res) => {
	if (req.session && req.session.token) {
		return res.send({ error: 'error', status: 'user already has an active session' });
	}

	if (!req.user) {
		return res.send({ status: 'error', message: 'user does not exist' });
	}

	const { email, id } = req.user;

	const payload = {
		email,
		id
	};

	getAndSetJwtTokens(req, payload);

	return res.status(200).send({ message: 'success, user logged in', user: req.session.user, token: req.session.token });
};

const logoutHandler = (req, res) => {
	if (req.session) {
		return res.send({ status: 'error', message: 'no active session to logout' });
	}
	req.session.destroy((err) => {
		if (err) {
			return res.status(400).send({ status: 'error', error: 'logout failed' });
		}
		return res.status(200).send({ status: 'ok', message: 'user logout' });
	});
};

export default {
	testHandler,
	registerHandler,
	loginHandler,
	logoutHandler
};

/* Cookie example

  "_id": "gHflbePF39KF8gii5z_olcilmNXoyG2A",
  "expires": {
    "$date": {
      "$numberLong": "1672785854248"
    }
  },
  "session": "{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"email\":\"test@test.com\",\"id\":\"e27c1d33-edfa-4b5f-b8c8-70fe174fa8d5\"},\"token\":{\"accesstoken\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpZCI6ImUyN2MxZDMzLWVkZmEtNGI1Zi1iOGM4LTcwZmUxNzRmYThkNSIsImlhdCI6MTY3MjY5OTQ0NCwiZXhwIjoxNjcyNzAwMDQ0fQ.3160OZRKkeJhPgS_-tAvts9x7MHcTsjOkjczTutUwXM\",\"refreshtoken\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpZCI6ImUyN2MxZDMzLWVkZmEtNGI1Zi1iOGM4LTcwZmUxNzRmYThkNSIsImlhdCI6MTY3MjY5OTQ0NCwiZXhwIjoxNjcyNzg1ODQ0fQ.cEcTAYjtaTuD4GnMU3pN8xtHRBn3CQefKRF1u-IOCWA\"}}"
*/
