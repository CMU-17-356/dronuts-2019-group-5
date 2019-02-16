import * as Joi from 'joi'

export const locationSchema = Joi.object().keys({
  id: Joi.string().required(),
  userId: Joi.string().required(),
  displayName: Joi.string().required(),
  address: Joi.string(),
  latitude: Joi.string().required(),
  longitude: Joi.string().required(),
});
