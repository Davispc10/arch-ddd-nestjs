import { Body, Controller, Post, Req } from '@nestjs/common';
import { AddUserUseCases } from '../../usecases/user/add-user-usecase';

@Controller('users')
export class UserController {
  constructor(private readonly addUserUseCase: AddUserUseCases) {}

  @Post()
  async create(@Body() dto: any) {
    return await this.addUserUseCase.create(dto);
  }
}
