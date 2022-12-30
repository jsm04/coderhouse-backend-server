import { User } from '../models/users.model.js';
import { GenericRepository } from './generic.repository.js';
export class UsersRepository extends GenericRepository {
	constructor(dao) {
		super(dao, User.model);
	}
}
