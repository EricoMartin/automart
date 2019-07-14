<<<<<<< HEAD
export default class APIError extends Error{
	constructor(statusCode, message){
		super();
		
		this.statusCode = statusCode;
		this.message = message;
	}
}
=======
class APIError extends Error {
  constructor(statusCode, message) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.message = message;
  }
}
module.exports = APIError;
>>>>>>> code-refactor-travis
