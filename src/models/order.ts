import * as Joi from 'joi'

export const ORDER_STATES = [
  'ordered',
  'accepted',
  'dispatched',
  'delivered'
];

export const orderItemSchema = Joi.object().keys({
  donutId: Joi.string().required(),
  quantity: Joi.number().required(),
  unitPrice: Joi.number().required(),
});


// Represents an order after it has been paid for
export const orderSchema = Joi.object().keys({
  id: Joi.string().required(),
  customerId: Joi.string().required(),
  items: Joi.array().items(orderItemSchema).min(1),
  totalPrice: Joi.number().required(),

  srcLocationId: Joi.string().required(),
  dstLocationId: Joi.string().required(),

  status: Joi.string().valid(ORDER_STATES),
  orderTime: Joi.date().iso().required(),
  acceptTime: Joi.date().iso(),
  dispatchTime: Joi.date().iso(),
  deliverTime: Joi.date().iso(),

  acceptedBy: Joi.string(),
  droneId: Joi.string(),
}).with('acceptTime', ['acceptedBy', 'orderTime'])   // If the order has been accepted, the employee who accepted it should be recorded
  .with('dispatchTime', ['droneId', 'acceptTime', 'orderTime']) // If the order has been dispatched, the drone that it was dispatched on should be recorded
  .with('deliverTime', ['dispatchTime', 'acceptTime', 'orderTime']); // Each time must also have all the other times

