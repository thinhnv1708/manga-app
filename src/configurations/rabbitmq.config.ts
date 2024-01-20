import { IRabbitmqConfig } from './interfaces';

export default (): {
  RABBITMQ_CONFIG: IRabbitmqConfig;
} => ({
  RABBITMQ_CONFIG: {
    PROTOCOL: process.env.RABBITMQ_PROTOCOL || 'amqp',
    BROKERS: process.env.RABBITMQ_BROKERS?.split(' ') || ['localhost:5672'],
    USERNAME: process.env.RABBITMQ_USER || 'admin',
    PASSWORD: process.env.RABBITMQ_PASSWORD || 'admin',
  },
});
