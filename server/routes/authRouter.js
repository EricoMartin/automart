import {Router} from 'express';
const AuthRouter = Router();

AuthRouter.post('/signup', (req, res) => res.status(201).json({
	success : true,
	message : 'Connected to Automart App'
}));

export default AuthRouter;