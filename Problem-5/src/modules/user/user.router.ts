import { Router } from 'express';
import { isAdmin } from '../../middlewares/admin.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { controllerWrapper } from '../../utils/helper';
import { UserController } from './user.controller';
import { createUserSchema, loginSchema, updateSchema } from './user.validation';

const userRouter = Router();
const userController = controllerWrapper(new UserController());

userRouter.post('/login', validate(loginSchema), userController.login);
userRouter.get('/:id', authMiddleware, isAdmin, userController.get);
userRouter.patch('/:id', authMiddleware, isAdmin, validate(updateSchema), userController.update);
userRouter.delete('/:id', authMiddleware, isAdmin, userController.delete);
userRouter.post('/', validate(createUserSchema), userController.create);
userRouter.get('/', authMiddleware, isAdmin, userController.list);

export default userRouter;
