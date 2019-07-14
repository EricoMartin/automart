import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
/**
 * @description - generate auth token for users
 * @param {string} id
 * @param {boolean} userRole
 * @return {string} token
 */

dotenv.config();

const generateToken = (id, userRole) => {
  const token = jwt.sign({
    id, role: userRole,
  }, process.env.SECRETKEY, { expiresIn: '36h' });
  return token;
};

export default generateToken;
