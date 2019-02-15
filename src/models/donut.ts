import * as Joi from 'joi'

export const donutSchema = Joi.object().keys({
  id: Joi.string().required(),
  displayName: Joi.string().required(),
  price: Joi.number().integer().required(),
  available: Joi.boolean().required(),
  display: Joi.boolean().required(),
  imageUrl: Joi.string(),
  ingredients: Joi.array().items(Joi.string()),
});

export default donutSchema;
