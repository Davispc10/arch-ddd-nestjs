import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // ThrottlerModule.forRootAsync({
    //   inject: [ConfigService],
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => [
    //     {
    //       ttl: configService.get('THROTTLE_TTL'),
    //       limit: configService.get('THROTTLE_LIMIT'),
    //     },
    //   ],
    // }),
  ],
})
export class ConfigureModule {}
