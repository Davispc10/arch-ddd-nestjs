import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user/user.controller';
import { UserRepositoryInterface } from 'src/data/propotols/db/user/user-repository.interface';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { MongoDBUserRepository } from 'src/infrastructure/database/mongodb/repositories/user/mongodb-user.repository';
import { AddUserUseCases } from 'src/usecases/user/add-user-usecase';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: AddUserUseCases,
      useFactory: (userRepo: UserRepositoryInterface) => {
        return new AddUserUseCases(userRepo);
      },
      inject: [MongoDBUserRepository],
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
