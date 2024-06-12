import { UserRepositoryInterface } from 'src/data/propotols/db/user/user-repository.interface';
import { UserProps } from 'src/domain/user/user';
import { UserModel } from 'src/infrastructure/database/mongodb/models/user/user.model';

export class AddUserUseCases {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async create(user: UserProps): Promise<UserModel> {
    const userCreated = await this.userRepository.create(user);
    return userCreated;
  }
}
