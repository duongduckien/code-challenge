import Joi from 'joi';

const createUserSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(6).max(100).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(6).max(100).required(),
});

const updateSchema = Joi.object({
  name: Joi.string().max(100).required(),
});

export { createUserSchema, loginSchema, updateSchema };
