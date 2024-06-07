import { Module } from '@nestjs/common';
import { ConfigureModule } from './infraestructure/configure/configure.module';
import { DatabaseModule } from './infraestructure/database/database.module';

@Module({
  imports: [ConfigureModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
