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

	save = (data) => {
		return this.dao.save(data, this.model);
	};

	update = (filter, update) => {
		return this.dao.update(filter, update, this.model);
	};

	destroy = () => {
		return this.dao.destroy(this.model);
	};
}
