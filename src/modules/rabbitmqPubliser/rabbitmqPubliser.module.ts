import { IRabbitmqConfig } from '@configurations/interfaces';
import { COMMONS } from '@constants/index';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { makeRabbitmqConfig } from '@helpers/index';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: COMMONS.RABBITMQ_QUEUES_PUBLISHER.MANGA,
        useFactory: (configService: ConfigService) => {
          const rabbitConfig =
            configService.get<IRabbitmqConfig>('RABBITMQ_CONFIG');
          const { QUEUE_NAME } = rabbitConfig;

          return {
            transport: Transport.RMQ,
            options: {
              urls: makeRabbitmqConfig(rabbitConfig),
              queueOptions: {
                durable: true,
              },
              queue: QUEUE_NAME,
              noAck: true,
            },
          };
        },
      },
    ]),
  ],
  exports: [],
})
export class HandleMangaDataAdapterModule {}
