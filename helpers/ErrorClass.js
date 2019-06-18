export default Class APIError extends error{
	constructor(statusCode, message){
		super();
		Error.captureStackTrace(this, APIError);
	}
}