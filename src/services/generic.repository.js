export class GenericRepository {
	constructor(dao, model) {
		this.dao = dao;
		this.model = model;
	}

	list = () => {
		return this.dao.list(this.model);
	};

	getByParam = (params) => {
		return this.dao.getByParam(params, this.model);
	};

	getById = (id) => {
		return this.dao.getById(id, this.model);
	};

	getOneByParam = (params) => {
		return this.dao.findOne(params, this.model);
	};

	findOneAndPopulate = (params, fieldRef) => {
		return this.dao.findOneAnPopulate(params, fieldRef, this.model);
	};

	save = (data) => {
		return this.dao.save(data, this.model);
	};

	saveMany = (arr) => {
		return this.dao.saveMany(arr, this.model);
	};

	update = (filter, update) => {
		return this.dao.update(filter, update, this.model);
	};

	deleteOne = (params) => {
		return this.dao.deleteOne(params, this.model);
	};

	deleteMany = (params) => {
		return this.dao.deleteMany(params, this.model);
	};

	destroy = () => {
		return this.dao.destroy(this.model);
	};
}
