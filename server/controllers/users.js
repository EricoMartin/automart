import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import model from '../models/model/model';
import APIError from '../helpers/ErrorClass';

dotenv.config();

const { users } = model;
/*
  * @description - create a new user
   * @params {object}
   * @returns {object}
   */

class Users {
  static createUser(req, res) {
    try{

      let { firstName, lastName, address } = req.body;

      const { email, password } = req.body;

      // Remove unnecessary spaces
      firstName = firstName.trim().replace(/\s+/g, '');
      lastName = lastName.trim().replace(/\s+/g, '');
      address = address.trim().replace(/\s+/g, ' ');

      // Encrypt password
      const user = users.createUser({
        firstName,
        lastName,
        password,
        address,
        email,
      });
      if (req.originalUrl === '/api/v1/auth/admin/signup') {
        user.isAdmin = true;
      }

      const token = jwt.sign({ user }, process.env.SECRETKEY, { expiresIn: '48h' });

      return res.status(201).json({
        status: 201,
        data: {
          token,
          id: user.id,
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          address: user.address,
          is_admin: user.isAdmin,
        },
      });
      } catch (error) {
      res.status(error.statusCode).json(error.message);
    }
  }

  static login(req, res) {
    try {
      const { email, password } = req.body;

      // Check if email is present in Users array
      const found = users.allUsers.some(user => user.email === email);

      if (!found) {
        throw new APIError(400, 'Email not found');
      }

      // Get User using the email
      const user = users.findEmail(email);

      // Compare password
     
      if (!password) {
        throw new APIError(400, 'Password is incorrect');
      }

      const token = jwt.sign({ user }, process.env.SECRETKEY, { expiresIn: '48h' });

      res.status(200).json({
        status: 200,
        data: {
          token,
          id: user.id,
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(error.statusCode).json(error.message);
    }
  }
  static changeUserPassword(req, res){
    try{
    const { id, newUserPassword } = req.params;

    const newPassword = newUserPassword;

    return res.status(200).json({
      status: 200,
      data: {
        token,
        id: user.id,
        password: newPassword,
      },
    });
  } catch (error) {
      res.status(error.statusCode).json(error.message);
    }
  }

  static logout(req, res){

   try{
    const { id} = req.params.id;
if(user.id === req.params.id){
    delete req.header;    
     res.status(204).send({
      status: 200,
      message: 'You have logged out successfully',
    });
   }else{
    res.status(400).send({
      status: 400,
      error: 'error logging out try again'
    });
   }
  }
    catch (error) {
      res.status(error.statusCode).json(error.message);
    }
  }
} 

export default Users;
