import { UserRepositoryInterface } from 'src/data/propotols/db/user/user-repository.interface';
import { AddUserUseCases } from './add-user-usecase';
import { User, UserProps } from '../../domain/user/user';

describe('AddUserUseCases Unit Test', () => {
  let addUserUseCases: AddUserUseCases;
  let userRepositoryMock: jest.Mocked<UserRepositoryInterface>;

  beforeEach(() => {
    jest.clearAllMocks();
    userRepositoryMock = {
      create: jest.fn(),
      findById: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as jest.Mocked<UserRepositoryInterface>;
    addUserUseCases = new AddUserUseCases(userRepositoryMock);
  });

  it('should be defined', () => {
    expect(addUserUseCases).toBeDefined();
  });

  it('should create new user', async () => {
    // Arrange
    const userProps: UserProps = {
      name: 'John Doe',
      surname: 'Doe',
      email: 'any@mail.com',
      password: 'password123',
    };
    const expectedUser = {
      _id: 'any_id',
      name: 'John Doe',
      surname: 'Doe',
      email: 'any@mail.com',
      password: 'password123',
      createdAt: new Date('2021-09-01T00:00:00Z'),
      updatedAt: new Date('2021-09-01T00:00:00Z'),
    };

    userRepositoryMock.create.mockResolvedValue(expectedUser);

    // Act
    const user = User.create(userProps);
    const result = await addUserUseCases.create(user);

    // Assert
    expect(userRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedUser);
  });
});
