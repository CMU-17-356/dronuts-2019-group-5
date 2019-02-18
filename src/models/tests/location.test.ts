import { locationSchema } from '../location'
import clone from 'clone';

const correctLocation = {
  id: '1',
  userId: '2',
  displayName: 'My House',
  address: '5000 Forbes Ave\nPittsburgh, PA 15289',
  latitude: '42.0',
  longitude: '42.0',
};

test('locationSchema allows a correct location object', () => {
  const location = clone(correctLocation);

  expect(locationSchema.validate(location).error).toBeNull();
})

test('locationSchema allows a correct location object missing optional fields', () => {
  const location = clone(correctLocation);
  delete location.address;

  expect(locationSchema.validate(location).error).toBeNull();
})

test('locationSchema rejects a location missing a userId', () => {
  const location = clone(correctLocation);
  delete location.userId;

  const result = locationSchema.validate(location);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
})
