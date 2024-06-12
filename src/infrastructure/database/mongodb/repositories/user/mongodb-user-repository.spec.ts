import { Model } from 'mongoose';
import { UserModel } from '../../models/user/user.model';
import { MongoDBUserRepository } from './mongodb-user.repository';
import { User, UserProps } from '../../../../../domain/user/user';

const userModelMock = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findOneAndUpdate: jest.fn(),
  deleteOne: jest.fn(),
} as unknown as Model<UserModel>;

describe('MongoDBUserRepository Unit Test', () => {
  let mongodbUserRepository: MongoDBUserRepository;

  beforeEach(() => {
    jest.clearAllMocks();

    mongodbUserRepository = new MongoDBUserRepository(userModelMock);
  });

  it('should be defined', () => {
    expect(mongodbUserRepository).toBeDefined();
  });

  it('should create new user', async () => {
    // Arrange
    const userPropos: UserProps = {
      name: 'John Doe',
      surname: 'Doe',
      email: 'oi@email.com',
      password: 'password123',
    };

    const user = User.create(userPropos);

    // Act
    await mongodbUserRepository.create(user);

    // Assert
    expect(userModelMock.create).toHaveBeenCalledWith(user);
  });

  it('should find all users', async () => {
    // Arrange
    const userProps: UserProps = {
      name: 'John Doe',
      surname: 'Doe',
      email: 'any@mail.com',
      password: 'password123',
    };
    const user = User.create(userProps);
    await mongodbUserRepository.create(user);
    await mongodbUserRepository.find();
    expect(userModelMock.create).toHaveBeenCalledWith(user);
    expect(userModelMock.find).toHaveBeenCalledTimes(1);
  });

  it('should find all users', async () => {
    const userProps: UserProps = {
      name: 'John Doe',
      surname: 'Doe',
      email: 'any@mail.com',
      password: 'password123',
    };
    const user = User.create(userProps);
    await mongodbUserRepository.create(user);
    await mongodbUserRepository.find();
    expect(userModelMock.create).toHaveBeenCalledWith(user);
    expect(userModelMock.find).toHaveBeenCalledTimes(1);
  });

  it('should findById a user by id', async () => {
    const userProps: UserProps = {
      name: 'John Doe',
      surname: 'Doe',
      email: 'any@mail.com',
      password: 'password123',
    };
    const user = User.create(userProps);
    await mongodbUserRepository.create(user);

    await mongodbUserRepository.findById(user.id);

    expect(userModelMock.findById).toHaveBeenCalledTimes(1);
  });

  it('should update a user', async () => {
    // Arrange
    const userProps: UserProps = {
      name: 'John Doe',
      surname: 'Doe',
      email: 'any@mail.com',
      password: 'password123',
    };
    const user = User.create(userProps);
    await mongodbUserRepository.create(user);

    // Act
    const updatedUserProps: UserProps = {
      name: 'Jane Doe',
      surname: 'Doe',
      email: 'updated@mail.com',
      password: 'newpassword123',
    };
    const updatedUser = User.create(updatedUserProps);
    await mongodbUserRepository.update(user.id, updatedUser);

    // Assert
    expect(userModelMock.findOneAndUpdate).toHaveBeenCalledTimes(1);
  });

  it('should delete a user', async () => {
    // Arrange
    const userProps: UserProps = {
      name: 'John Doe',
      surname: 'Doe',
      email: 'any@mail.com',
      password: 'password123',
    };
    const user = User.create(userProps);
    await mongodbUserRepository.create(user);

    // Act
    await mongodbUserRepository.remove(user.id);

    // Assert
    expect(userModelMock.deleteOne).toHaveBeenCalledTimes(1);
  });
});
