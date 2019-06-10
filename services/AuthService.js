const users = [];

export default Class AuthService{
	static createUser(user){
		if(!user){
			throw new APIError(400, 'user not found');
		}
	}
}