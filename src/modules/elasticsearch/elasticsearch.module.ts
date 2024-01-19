import { IElasticsearchConfig } from '@configurations/interfaces';
import { makeElasticsearchConfig } from '@helpers/makeElasticsearchConfig.helper';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule as ElasticsearchLibModule } from '@nestjs/elasticsearch';

@Global()
@Module({
  imports: [
    ElasticsearchLibModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const elasticsearchConfig = configService.get<IElasticsearchConfig>(
          'ELASTICSEARCH_CONFIG',
        );

        return makeElasticsearchConfig(elasticsearchConfig);
      },
      inject: [ConfigService],
    }),
  ],
  exports: [ElasticsearchLibModule],
})
export class ElasticsearchModule {}
