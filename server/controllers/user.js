import UserModel from '../models/user';
import APIError from '../helpers/ErrorClass';
import APISuccess from '../helpers/SuccessClass';

class User {
  static createUser(req, res) {
    let {
      firstname, lastname, address, status,
    } = req.body;
    const { email, password } = req.body;

    firstname = firstname.trim().replace(/\s+/g, '');
    lastname = lastname.trim().replace(/\s+/g, '');
    address = address.trim().replace(/\s+/g, ' ');
    status = status.trim().replace(/\s+/g, ' ');


    const user = UserModel.createUser({
      firstname,
      lastname,
      password,
      address,
      status,
      email,
    });
    if (req.originalUrl === '/api/v1/auth/admin/signup') {
      user.isAdmin = true;
    }

    return res.status(201).json({
      status: 201,
      data: {
        id: user.id,
        first_name: user.firstname,
        last_name: user.lastname,
        email: user.email,
        address: user.address,
        status: user.status,
        is_admin: user.isAdmin,

      },
    });
  }

  static login(req, res) {
    const { email, password } = req.body;

    const user = UserModel.findByEmail(email);

    if (!user) return APIError(400, 'Email not found');

    const pass = UserModel.findByEmailPass(email, password);
    if (!pass) return APIError(400, 'Enter correct password');

    return res.status(200).json({
      status: 200,
      data: {
        id: user.id,
        first_name: user.firstname,
        last_name: user.lastname,
        email: user.email,
      },
    });
  }

  static getAll(req, res) {
    const users = UserModel.getAllUsers();
    return APISuccess(res, 200, users);
  }

  static logout(req, res) {
    return res.status(200).send({
      status: 200,
      message: 'You have been logged out successfully',
    });
  }
}

export default new User();
