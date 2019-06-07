import {Router} from 'express';
import AuthRouter from '/authrouter';
const router = Router();

router.use('/authrouter', AuthRouter);

export default router;