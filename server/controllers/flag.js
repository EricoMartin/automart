import Flags from '../models/flag';
import validate from '../middlewares/validateData';
import user from '../test/mock_db/users';
import APIError from '../helpers/ErrorClass';
import APISuccess from '../helpers/SuccessClass';

class Flag{
	static createFlag(req, res){
		try{
			let { user_id, car_id, reason, description } = req.body;
			const props = [user_id, car_id, reason, description];

			if(!validate(props, req.body)){ 
				return res.status(400).json({
					status: 400,
					message: 'All fields must be filled' 
				});

			}
			if(reason === '' || reason.match(/\s/g).length > 60 || description.match(/\s/g).length > 60) {
				return res.status(400).json({
					status: 400,
					message: 'Note that reason and description cannot be more than 60 words' 
				});
			}

			car_id = parseInt(car_id, 10);
			user_id = parseInt(user_id, 10);
			reason = reason.trim().replace(/\s+/g, ' ');
			description = description.trim().replace(/\s+/g, '');
			//user_id = user_id.trim().replace(/\s+/g, '');
			

			const flagCreated = Flags.createdFlag(req.body);

			return res.status(201).json({
				status: 201,
				data: {
					id: flagCreated.id,
					user_id: flagCreated.user_id,
					car_id: flagCreated.car_id,
					reason: flagCreated.reason,
					description: flagCreated.description,
					status: flagCreated.status,
				}
			});
		}catch(error){
			res.status(error.statusCode || 500).json(error.message);
		}
		
	}

	static updateFlagStatus(req, res){
		const flag = Flags.findFlag(req.params.flag-id);
		if (!flag) {
			return res.status(404).json({ 
				status: 404,
				message: 'Flag not found',
			});
		}
		if(role !== isAdmin){
			return res.status(401).json({
				status: 401,
				message: 'You dont have the permission to access this resource',
			})
		}
		const updatedFlag = Flags.updateFlagStatus(req.params.flag-id);
		return res.status(200).json({ 
				status: 200,
				data: updatedFlag,
			});
	}

    static getAllFlags(req, res) {
		const flags = Flags.getAllFlags();
		if (flags.length < 1) {
			return res.status(404).json({ 
				status: 404,
				message: 'There are no flags now'
			});
		} return res.status(200).json({ 
				status: 200,
				data: flags,
			});
  }
  static deleteFlag(req, res) {
  	const flagger = Flags.findFlag(req.params.flag-id);
  	if (!flagger) {
  		return res.status(404).json({ 
				status: 404,
				message: 'The flag is no longer available'
			});
  	}
  	return res.status(200).json({ 
				status: 200,
				message: 'Flag successfully deleted'
			});
  }
}

export default Flag;