import { orderSchema } from '../order'
import clone from 'clone';

const correctOrder = {
  id: '1',
  customerId: '2',
  items: [{
    donutId: '3',
    quantity: 1,
    unitPrice: 100,
  }],
  totalPrice: 100,

  srcLocationId: '3',
  dstLocationId: '4',

  status: 'delivered',
  orderTime: '2008-09-15T15:53:00',
  acceptTime: '2008-09-15T15:54:00',
  dispatchTime: '2008-09-15T15:56:00',
  deliverTime: '2008-09-15T16:03:00',

  acceptedBy: '5',
  droneId: '6',
};

test('orderSchema allows a fully-filled order object', () => {
  const order = correctOrder;
  expect(orderSchema.validate(order).error).toBeNull();
})

test('orderSchema rejects an order object without any items', () => {
  const order = clone(correctOrder);
  order.items = [];

  const result = orderSchema.validate(order);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
})

test('orderSchema rejects an order object with acceptTime but without acceptedBy', () => {
  const order = clone(correctOrder);
  delete order.acceptedBy;

  const result = orderSchema.validate(order);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
})

test('orderSchema rejects an order object with missing middle time', () => {
  const order = clone(correctOrder);
  delete order.dispatchTime;

  const result = orderSchema.validate(order);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
})

test('orderSchema rejects an order with non-enum status', () => {
  const order = clone(correctOrder);
  order.status = 'lost in the abyss';

  const result = orderSchema.validate(order);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
})

