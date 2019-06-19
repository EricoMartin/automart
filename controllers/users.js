import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import models from '../models/model/model';

dotenv.config();

const { User } = models;
/*
  * @description - create a new user
   * @params {object}
   * @returns {object}
   */

class Users {
  static createUser(req, res) {
    let { firstname, lastname, address } = req.body;

    const { email, password } = req.body;

    // Remove unnecessary spaces
    firstname = firstname.trim().replace(/\s+/g, '');
    lastname = lastname.trim().replace(/\s+/g, '');
    address = address.trim().replace(/\s+/g, ' ');

    // Encrypt password
    const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const user = User.createUser({
      firstname,
      lastname,
      encryptedPassword,
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
        first_name: user.firstname,
        last_name: user.lastname,
        email: user.email,
        address: user.address,
        is_admin: user.isAdmin,
      },
    });
  }

  static login(req, res) {
    const { email, password } = req.body;

    // Check if email is present in Users array
    const found = User.allUsers.some(user => user.email === email);

    if (!found) {
      return res.status(400).json({
        status: 400,
        error: 'Email not found',
      });
    }

    // Get User using the email
    const user = User.findEmail(email);

    // Compare password
    const comparePassword = bcrypt.compareSync(password, user.encryptedPassword);
    if (!comparePassword) {
      res.status(400).json({
        status: 400,
        error: 'Password is incorrect',
      });
    }

    const token = jwt.sign({ user }, process.env.SECRETKEY, { expiresIn: '48h' });

    return res.status(200).json({
      status: 200,
      data: {
        token,
        id: user.id,
        first_name: user.firstname,
        last_name: user.lastname,
        email: user.email,
      },
    });
  }
  static changeUserPassword(req, res){
    const { id, newUserPassword } = req.params;

    const newPassword = bcrypt.hashSync(newUserPassword, bcrypt.genSaltSync(10));

    return res.status(200).json({
      status: 200,
      data: {
        token,
        id: user.id,
        encryptedPassword: newPassword,
      },
    });
  }

  static logout(req, res){

   
    const { id} = req.params.id;
if(user.id === req.params.id){
    delete req.header.token;    
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
}

export default Users;
