import usersData from '../test/mock_db/users';

class User{
	constructor(){
		this.users = usersData;
	}
    createUser(data){
    	const id = parseInt(this.users.length + 1, 10);
    	const userData ={
    		id,
            email: data.email || '',
            first_name: data.first_name || '',
            last_name: data.last_name || '',
            password: data.password || '',
            address: data.address|| '',
            is_admin: data.is_admin || '',
            status: data.status || ''
    	}
    	this.users.push(userData);
    	return userData;
    }
     getAllUsers() {
    return this.users;
  }
     findByFirstName(first_name){
     	return this.users.find(user => user.first_name === first_name );
     }
     findByEmail(email){
     	return this.users.find(user => user.email === email );
     }
     getUser(id){
     	return this.users.find(user => user.id  === id );
     }
     deleteUser(userdata){
     	const idx = this.users.indexOf(userdata);
     	this.users.splice(idx, 1);
     	userdata.status = 'deleted';

     	return userdata;
     }
     loginUser(id){
     	console.log(this.users);
     	const logUser = this.users.filter(user => parseInt(user.id, 10)  === parseInt(id, 10) );
   		logUser.status  = 'loggedIn';
   		console.log(logUser);
     	return logUser;

     }
}

export default new User();
