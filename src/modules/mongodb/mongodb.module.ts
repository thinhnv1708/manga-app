import { IMongodbConfig } from '@configurations/interfaces';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  MongooseModule as MongooseLibModule,
  MongooseModuleFactoryOptions,
} from '@nestjs/mongoose';
import { makeMongodbConfig } from '@helpers/index';

@Module({
  imports: [
    MongooseLibModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongooseConfig =
          configService.get<IMongodbConfig>('MONGODB_CONFIG');

        const uri = makeMongodbConfig(mongooseConfig);

        return <MongooseModuleFactoryOptions>{
          uri,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class MongooseModule {}
