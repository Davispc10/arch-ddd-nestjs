import { UserProps } from 'src/domain/user/user';
import { UserModel } from 'src/infraestructure/database/mongodb/models/user/user.model';

export interface UserRepositoryInterface {
  create: (user: UserProps) => Promise<UserModel>;
  find: () => Promise<UserModel[]>;
  findById: (id: string) => Promise<UserModel>;
  update: (id: string, dataUpdate: UserModel) => Promise<UserModel>;
  remove: (id: string) => Promise<void>;
}
