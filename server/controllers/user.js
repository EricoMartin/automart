import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import UserModel from '../models/user';
import usersData from '../test/mock_db/users';

dotenv.config();

class User {
  static createUser(req, res) {
    let { firstName, lastName, address, status, } = req.body;

    const {  email, password, confirmedPassword } = req.body;
    
    const props = [firstName, lastName, email, password, address, status, confirmedPassword ];

      const invalidData = (property, data) => property.find(idx => data[idx] === undefined || data[idx] === '');

      if(!invalidData(props, req.body)){
        return res.status(400).json({
          status: 400,
          message: 'Fill all required fields'
        });
      }

      if (req.body.password.length < 8 || req.body.email.length >= 30
      || req.body.firstName.length >= 30 || req.body.lastName.length >= 30) {
      return res.status(400).json({
          status: 400,
          message: 'Ensure password is atleast 8 characters, name and email not more than 30 characters'
        }); 
    }

    firstName = firstName.trim().replace(/\s+/g, '');
    lastName = lastName.trim().replace(/\s+/g, '');
    address = address.trim().replace(/\s+/g, ' ');
    status = status.trim().replace(/\s+/g, ' ');
    

    if(confirmedPassword !== password){
      return res.status(400).json({
        status: 400,
        message: 'Password and confirmation does not match',
      });
    }
    try{
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const user = UserModel.createUser({
      firstName,
      lastName,
      hashPassword,
      address,
      status,
      email,
    });
    if (req.originalUrl === '/api/v1/auth/admin/signup') {
      user.isAdmin = true;
    }

    const token = jwt.sign({ user }, process.env.SECRETKEY, { expiresIn: '168h' });


    return res.status(201).header('Authorization', token).json({
      status: 201,
      data: {
        token,
        id: user.id,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        address: user.address,
        status: user.status,
        is_admin: user.isAdmin,

      },
    });
  }catch(error){
    return res.status(error.statusCode || 500).json(error.message);
  }
  }

  static async login(req, res) {
    //delete req.headers['Authorization'];
    try{
      const { email, password } = req.body;
      const user = UserModel.findByEmail(email);

      if (!user){
      return res.status(400).json({
        status: 400,
        error: 'Email not found',
      });
    } 
    try{
    const pass = bcrypt.compare(password, user.password);
    //const pass = UserModel.findByEmailPass(email, password);
    
    }catch(error){
      return res.status(400).json({
        status: 400,
        error: error.message,
        message: 'Password is incorrect',
      });
    }
    finally{
      const token = await jwt.sign({ user }, process.env.SECRETKEY, { expiresIn: '36h' });
    

    return res.status(200).json({
      status: 200,
      data: {
        token,
        id: user.id,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
      },
    });
    }
    }
    catch(error){
      return res.status(error.statusCode || 500).json(error.message);
    }
  }

  static getAll(req, res) {
    const users = UserModel.getAllUsers();
    return res.status(200).send({
      status: 200,
      data: users,
    }); 
  }

  static changePassword(req, res) {
    const { id } = req;
    if (!req.body.currentPassword || !req.body.newPassword) {
      return res.status(400).send({
      status: 400,
      message: 'Fill the required fields',
    });
    }
    const user = UserModel.getUser(id);
    if (!user) {
      return res.status(404).send({
      status: 404,
      message: 'User not found',
    });
    }
    try{
    const confirmPassword = comparePasswordSync(req.body.currentPassword, user.password);
    if (!confirmPassword) {
      return res.status(400).send({
      status: 400,
      message: 'Incorrect current password',
    });
    }
    const hashNewPassword = bcrypt.hashSync(req.body.newPassword, bcrypt.genSaltSync(10));
    const updatedUserDetails = UserModel.changePassword(id, hashNewPassword);

    return res.status(201).send({
      status: 201,
      data: updatedUserDetails,
    });
  }catch(error){
    return res.status(error.statusCode || 500).json(error.message);
  }
  }


  static logout(req, res) {
    return res.status(200).send({
      status: 200,
      message: 'You have been logged out successfully',
    });
  }
}

export default User;

