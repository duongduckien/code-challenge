import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../enums/user.enum';

const buildQuery = (query: Object) => {
  return {
    ...query,
    isDeleted: 0,
  };
};

type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

const wrapper = (controller: ControllerFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    controller(req, res, next).catch(next);
  };
};

const controllerWrapper = (controller: any): any => {
  const wrappedController: any = {};
  Object.getOwnPropertyNames(Object.getPrototypeOf(controller)).forEach(
    (methodName) => {
      const method = controller[methodName];
      if (typeof method === 'function' && methodName !== 'constructor') {
        wrappedController[methodName] = wrapper(method.bind(controller));
      }
    },
  );
  return wrappedController;
};

const generateToken = ({
  id,
  email,
  role,
}: {
  id: number;
  email: string;
  role: UserRole;
}) => {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET || '', {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });
};

export { buildQuery, controllerWrapper, generateToken };
