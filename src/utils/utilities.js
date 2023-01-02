import bcrypt from 'bcrypt';

export const createHash = (value) => {
	return bcrypt.hashSync(value, bcrypt.genSaltSync(12));
};
export const isValidHash = (value, hashedValue) => {
	return bcrypt.compareSync(value, hashedValue);
};
