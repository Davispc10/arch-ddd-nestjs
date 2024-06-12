import { Test, TestingModule } from '@nestjs/testing';
import { User, UserProps } from '../../domain/user/user';
import { AddUserUseCases } from '../../usecases/user/add-user-usecase';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;
  let addUserUseCase: AddUserUseCases;

  beforeEach(async () => {
    const userPropos: UserProps = {
      name: 'John Doe',
      surname: 'Doe',
      email: 'any@mail.com',
      password: 'password123',
    };
    const user = User.create(userPropos);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: AddUserUseCases,
          useValue: {
            create: jest.fn().mockResolvedValue(user),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    addUserUseCase = module.get<AddUserUseCases>(AddUserUseCases);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(addUserUseCase).toBeDefined();
  });

  it('should create new user', async () => {
    // Arrange
    const dto = {
      name: 'John Doe',
      surname: 'Doe',
      email: 'any@mail.com',
      password: 'password123',
    };

    // Act
    await userController.create(dto);

    // Assert
    expect(addUserUseCase.create).toHaveBeenCalledWith(dto);
  });
});
