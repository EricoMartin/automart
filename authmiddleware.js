import APIError from '/Helpers/ErrorClass';

export default Class AuthMiddlewares{
	static validate params(req res,next){
		try{
			if(!req.body.firstName){
				throw APIError(400, 'First Name is required');
			}
			next();
		}catch(error){
			res.status(401).json({
				success: false,
				message: 'An error has occurred while trying to connect'
			});
		}
	}
}