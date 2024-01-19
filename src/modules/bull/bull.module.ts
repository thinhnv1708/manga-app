import { IRedisConfig } from '@configurations/interfaces';
import { COMMONS } from '@constants/index';
import { makeBullConfig } from '@helpers/makeBullConfig.helper';
import { BullModule as BullLibModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    BullLibModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const redisConfig = configService.get<IRedisConfig>('REDIS_CONFIG');

        return makeBullConfig(redisConfig);
      },
      inject: [ConfigService],
    }),
    BullLibModule.registerQueue(
      ...Object.values(COMMONS.BULL_QUEUE_NAMES).map((queueName) => ({
        name: queueName,
      })),
    ),
  ],
  exports: [BullLibModule],
})
export class BullModule {}
