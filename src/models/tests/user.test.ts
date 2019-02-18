import { userSchema, registerUserSchema } from '../user'
import clone from 'clone';

const correctUser = {
  id: '1',
  username: 'bobbie',
  passwordSalt: 'salt',
  passwordHash: '0x234567865434',
  isEmployee: true,
};

test('userSchema allows a correct user object', () => {
  const user = clone(correctUser);

  expect(userSchema.validate(user).error).toBeNull();
})

test('userSchema allows a correct user object without optional fields', () => {
  const user = clone(correctUser);
  delete user.isEmployee;

  expect(userSchema.validate(user).error).toBeNull();
})

test('userSchema rejects a user object without an ID', () => {
  const user = clone(correctUser);
  delete user.id;

  const result = userSchema.validate(user);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
})

test('registerUserSchema allows a correct registerUser object', () => {
  const registerUser = {
    username: 'bobbie',
    password: 'password'
  };

  expect(registerUserSchema.validate(registerUser).error).toBeNull();
})

test('registerUserSchema disallows extra fields', () => {
  const registerUser = {
    username: 'bobbie',
    password: 'password',
    potato: 'yup,'
  };

  const result = registerUserSchema.validate(registerUser);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
})
