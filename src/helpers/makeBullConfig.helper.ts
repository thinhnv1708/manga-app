import { IRedisConfig } from '@configurations/interfaces';
import { BullRootModuleOptions } from '@nestjs/bull';

export const makeBullConfig = (
  redisConfig: IRedisConfig,
): BullRootModuleOptions => {
  const {
    HOST,
    PORT,
    SENTINELS,
    REDIS_CLUSTER_NAME,
    REDIS_CLUSTER_PASSWORD,
    DB,
    BASE_PREFIX,
  } = redisConfig;

  if (SENTINELS) {
    return {
      redis: {
        sentinels: SENTINELS,
        name: REDIS_CLUSTER_NAME,
        password: REDIS_CLUSTER_PASSWORD,
        db: DB,
        keyPrefix: BASE_PREFIX,
      },
    };
  } else {
    return {
      redis: { host: HOST, port: PORT, db: DB, keyPrefix: BASE_PREFIX },
    };
  }
};
