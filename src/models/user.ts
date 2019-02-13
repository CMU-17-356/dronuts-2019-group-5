import * as Joi from 'joi'

export const userSchema = Joi.object().keys({
  id: Joi.string().required(),
  username: Joi.string().required(),
  passwordSalt: Joi.string(),
  passwordHash: Joi.string(),
  isEmployee: Joi.boolean(),
});

export const registerUserSchema = Joi.object().keys({
  username: Joi.string(),
  password: Joi.string(),
});
