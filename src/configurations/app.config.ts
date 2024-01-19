import { convertEnvNumber } from '@helpers/index';
import { IAppConfig } from './interfaces';

export default (): {
  APP_CONFIG: IAppConfig;
} => ({
  APP_CONFIG: {
    SERVICE_TAG: process.env.SERVICE_TAG || 'search-worker',
    PORT: convertEnvNumber(process.env.PORT) ?? 3000,
    MANGA_SYNC_CHUNK_SIZE:
      convertEnvNumber(process.env.MANGA_SYNC_CHUNK_SIZE) ?? 100,
    MANGA_SEARCH_LIMIT_DOC:
      convertEnvNumber(process.env.MANGA_SEARCH_LIMIT_DOC) ?? 20,
  },
});
