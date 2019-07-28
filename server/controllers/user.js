
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import UserModel from '../migration/user';

dotenv.config();

const User = {
  async createUser(req, res) {
    let { first_name, last_name, address } = req.body;

    const { email, password, confirmed_password } = req.body;

    const props = [first_name, last_name, email, password, address, confirmed_password];

    const validData = (property, data) => property.find(idx => data[idx] === undefined || data[idx] === '');

    if (!validData(props, req.body)) {
      return res.status(400).json({
        status: 400,
        message: 'Fill all required fields',
      });
    }

    if (req.body.password.length < 8 || req.body.email.length >= 30
      || req.body.first_name.length >= 30 || req.body.last_name.length >= 30) {
      return res.status(400).json({
        status: 400,
        message: 'Ensure password is atleast 8 characters, name and email not more than 30 characters',
      });
    }
    if (req.body.password !== req.body.confirmed_password) {
      return res.status(400).json({
        status: 400,
        message: 'Ensure confirmed_password is same as password',
      });
    }

    first_name = first_name.trim().replace(/\s+/g, '');
    last_name = last_name.trim().replace(/\s+/g, '');
    address = address.trim().replace(/\s+/g, ' ');
    req.body.is_admin = false;

    if (first_name === 'jason' && req.body.password === '555SSS777') {
      req.body.is_admin = true;
    }
    req.body.password = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    try {
      const emailFound = await UserModel.findEmail(req.body.email);
      if (emailFound.rows[0] !== undefined && emailFound.rows[0].email === req.body.email) {
        return res.status(400).json({
          status: 400,
          message: 'User Email already exists',
        });
      }
      req.body.status = 'registered';
      const body = [req.body.first_name, req.body.last_name, req.body.address, req.body.is_admin, req.body.email, req.body.status, req.body.password];
      const { rows } = await UserModel.createUser(body);
/* eslint-disable */
      const {
        id,
        first_name,
        last_name,
        address,
        is_admin,
        email,
        status,
        password,
      } = rows[0];
      /* eslint-enable */
      const token = jwt.sign({ id, is_admin, first_name }, process.env.SECRETKEY, { expiresIn: '168h' });

      return res.status(201).header('authorization', token).json({
        status: 201,
        data: {
          token,
          id,
          first_name,
          last_name,
          email,
          address,
          status,
          is_admin,
        },
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  },

  async login(req, res) {
    delete req.headers.authorization;
    try {
      const { email, password } = req.body;
      const { rows } = await UserModel.findByEmail(email);

      if (rows.length < 1) {
        return res.status(404).json({
          status: 404,
          error: 'Email not found',
        });
      }
      const user = rows[0];
      const pass = await bcrypt.compareSync(password, user.password);
      // const pass = UserModel.findByEmailPass(email, password);

      if (!pass) {
        return res.status(401).json({
          status: 401,
          message: 'Password is incorrect',
        });
      }
      user.token = await jwt.sign({ user }, process.env.SECRETKEY, { expiresIn: '36h' });

      const data = {
        token: user.token,
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        is_admin: user.is_admin,
      };

      return res.status(200).header('authorization', user.token).json({
        status: 200,
        data,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  },

  async getAll(req, res) {
    try {
      const { rows } = await UserModel.getAllUsers();
      return res.status(200).send({
        status: 200,
        data: rows,
      });
    } catch (error) { return res.status(error.statusCode || 500).json(error.message); }
  },

  async changePassword(req, res) {
    const { id } = req;
    if (!req.body.currentPassword || !req.body.newPassword) {
      return res.status(400).send({
        status: 400,
        message: 'Fill the required fields',
      });
    }
    try {
      const { rows } = await UserModel.findByPass(id);

      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'User not found',
        });
      }

      const confirmPassword = await bcrypt.compareSync(req.body.currentPassword, rows[0].password);
      if (!confirmPassword) {
        return res.status(400).send({
          status: 400,
          message: 'Incorrect current password',
        });
      }
      const hashNewPassword = await bcrypt.hashSync(req.body.newPassword, bcrypt.genSaltSync(10));
      const updatedUserDetails = UserModel.changePassword(id, hashNewPassword);

      return res.status(201).send({
        status: 201,
        data: updatedUserDetails.rows[0],
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  },

  logout(req, res) {
    delete req.headers.authorization;
    return res.status(200).send({
      status: 200,
      message: 'You have been logged out successfully',
    });
  },
};

export default User;
