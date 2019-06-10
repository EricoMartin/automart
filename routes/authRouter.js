import {Router} from 'express';
const AuthRouter = Router();

AuthRouter.post('/signup', (req, res) => res.status(201).json({
	success : true,
	message : 'Connected to Autoart App'
});

export default AuthRouter;