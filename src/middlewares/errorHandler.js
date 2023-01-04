const errorHandler = (req, res, next) => {
	res.on('finish', () => {
		if ((res.statusCode = 404)) {
			//TODO handling of cannot get
			return next();
		}
	});
	return next();
};

export default errorHandler;
