import {
  appConfig,
  elasticsearchConfig,
  loggerConfig,
  mongodbConfig,
  rabbitmqConfig,
  redisConfig,
} from '@configurations/index';
import { ElasticsearchModule } from '@modules/elasticsearch';
import { LoggerModule } from '@modules/logger';
import { MongooseModule } from '@modules/mongodb';
import { SearchModule } from '@modules/search';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        loggerConfig,
        mongodbConfig,
        rabbitmqConfig,
        redisConfig,
        elasticsearchConfig,
      ],
      envFilePath: ['.development.env'],
    }),
    LoggerModule,
    MongooseModule,
    ElasticsearchModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
