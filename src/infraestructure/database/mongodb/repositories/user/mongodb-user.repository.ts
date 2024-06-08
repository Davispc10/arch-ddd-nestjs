import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepositoryInterface } from 'src/data/propotols/db/user/user-repository.interface';
import { UserProps } from 'src/domain/user/user';
import { UserModel } from '../../models/user/user.model';

export class MongoDBUserRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userCollection: Model<UserModel>,
  ) {}

  async create(user: UserProps): Promise<UserModel> {
    const userCreated = await this.userCollection.create(user);
    return userCreated;
  }

  async find(): Promise<UserModel[]> {
    const users = await this.userCollection.find();
    return users;
  }

  async findById(id: string): Promise<UserModel | null> {
    const user = await this.userCollection.findById(id).exec();
    return user;
  }

  async update(id: string, user: UserProps): Promise<UserModel | null> {
    const updatedUser = await this.userCollection.findOneAndUpdate({
      _id: { $eq: id },
      $set: user,
      new: true,
    });
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    await this.userCollection.deleteOne({ _id: { $eq: id } });
  }
}
