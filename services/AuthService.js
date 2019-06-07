const users = [];

export default Class AuthService{
	statis createUser(user){
		if(!user){
			throw new APIError(400, 'user not found');
		}
	}
}