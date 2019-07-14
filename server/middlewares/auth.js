import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization == undefined || authorization == null) {
   return res.status(401).json({
      status: 401,
      error: 'Authentication failed! Please Login again',
    });
  } 
    const token = authorization.split(' ')[1].trim();

    try {
    const decodedData = jwt.verify(token, process.env.SECRETKEY);
    req.authData = decodedData;
    return next();
  } catch (err) {
    return res.status(401).json({
      status: 401,
      error: 'Authentication failed! Please Login again',
    });
  }
};