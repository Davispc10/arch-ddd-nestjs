import { User, UserProps } from './user';

describe('User Unit Tests', () => {
  it('should create a new User', () => {
    let userProps: UserProps = {
      name: 'John',
      surname: 'Doe',
      email: 'emailAny@mail.com',
      password: 'password',
    };
    const user = User.create(userProps);
    expect(user.props).toEqual({
      ...userProps,
    });

    userProps = {
      name: 'Jane',
      surname: 'Doe',
      email: 'emailAny@mail.com',
      password: 'password',
    };

    expect(user.id).toBeDefined();
    const user2 = User.create(userProps);
    expect(user2.props).toEqual({
      ...userProps,
    });
  });

  it('should updateName method', () => {
    const userProps: UserProps = {
      name: 'John',
      surname: 'Doe',
      email: 'emailAny@mail.com',
      password: 'password',
    };
    const user = User.create(userProps);
    user.name = 'Jane';
    expect(user.name).toBe('Jane');
  });

  it('should be toJSON() method', () => {
    const userProps: UserProps = {
      name: 'John',
      surname: 'Doe',
      email: 'emailAny@mail.com',
      password: 'password',
    };
    const user = User.create(userProps);
    user.toJSON();
    expect(user.toJSON()).toStrictEqual({
      id: user.id,
      name: 'John',
      surname: 'Doe',
      email: 'emailAny@mail.com',
      password: 'password',
    });
  });
});
