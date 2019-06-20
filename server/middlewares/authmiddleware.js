import APIError from '/Helpers/ErrorClass';

export default class AuthMiddlewares{
	static validateParams(req, res,next){
		try{
			if(!req.body.firstName){
				throw APIError(400, 'First Name is required');
			}
			next();
		}catch(error){
			res.status(error.statusCode || 500).json({
				status: error.statusCode || 500,
				message: error.message
			});
		}
	}
}