import { convertEnvNumber } from '@helpers/index';
import { IRedisConfig } from './interfaces';

export default (): { REDIS_CONFIG: IRedisConfig } => ({
  REDIS_CONFIG: {
    HOST: process.env.REDIS_HOST || 'localhost',
    PORT: convertEnvNumber(process.env.REDIS_PORT) ?? 6379, //  Redis port
    SENTINELS: process.env.REDIS_SENTINELS
      ? process.env.REDIS_SENTINELS.split(' ').map((path) => {
          const [host, port] = path.split(':');
          return {
            host,
            port: convertEnvNumber(port),
          };
        })
      : null,
    REDIS_CLUSTER_NAME: process.env.REDIS_CLUSTER_NAME,
    REDIS_CLUSTER_PASSWORD: process.env.REDIS_CLUSTER_PASSWORD,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    DB: convertEnvNumber(process.env.REDIS_DB) ?? 0,
    BASE_PREFIX: process.env.REDIS_BASE_PREFIX,
  },
});
