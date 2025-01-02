import { NextFunction, Request, RequestHandler, Response } from 'express';
import Joi from 'joi';

export const validate = (schema: Joi.ObjectSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(400).json({
        message: 'Validation error',
        details: error.details.map((err) => err.message),
      });
      return;
    }
    next();
  };
};
