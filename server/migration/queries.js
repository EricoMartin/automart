import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
	user: 'admin',
	host: 'localhost',
	port: 5432,
	database: 'automart',
	password: 'admin1234'
});

export default {
	query(data, params){
	return new Promise((resolve, reject) => {
	pool.query(data, params).then((res) =>{
		resolve(res);
	}).catch((error)=> {
		reject(error);
	}); 
});
}
};
