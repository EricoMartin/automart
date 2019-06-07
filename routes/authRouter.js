import {Router} from 'express';
const AuthRouter = Router();

AuthRouter.post('/signup', (req, res) => res.status(201).json({
	success : true
});

export default AuthRouter;