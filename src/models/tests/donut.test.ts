import { donutSchema } from '../donut'
import clone from 'clone';

const correctDonut = {
  id: '1',
  displayName: 'Original Glaze',
  price: 100,
  available: true,
  display: true,
  imageUrl: 'https://cmu-17-356.github.io/Dronuts/assets/donut_flavors/original_glaze.jpg',
  ingredients: ['sugar'],
};

test('donutSchema allows a correct donut object', () => {
  const donut = clone(correctDonut);

  expect(donutSchema.validate(donut).error).toBeNull();
})

test('donutSchema allows a correct donut object without optional fields', () => {
  const donut = clone(correctDonut);
  delete donut.imageUrl;
  delete donut.ingredients;

  expect(donutSchema.validate(donut).error).toBeNull();
})

test('donutSchema rejects a donut without an ID', () => {
  const donut = clone(correctDonut);
  delete donut.id;

  const result = donutSchema.validate(donut);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
})

test('donutSchema rejects a donut with an empty displayName', () => {
  const donut = clone(correctDonut);
  donut.displayName = '';

  const result = donutSchema.validate(donut);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
})

test('donutSchema rejects a donut with a float price', () => {
  const donut = clone(correctDonut);
  donut.price = 100.5

  const result = donutSchema.validate(donut);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
})

test('donutSchema rejects a donut with a nonboolean available', () => {
  const donut = clone(correctDonut);
  donut.available = 'trueeee' as any; // note: Joi will actually cast the string literal 'true'

  const result = donutSchema.validate(donut);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
})
