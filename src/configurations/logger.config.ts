import { convertEnvNumber } from '@helpers/index';
import { ILoggerConfig } from './interfaces';

export default (): { LOGGER_CONFIG: ILoggerConfig } => ({
  LOGGER_CONFIG: {
    DEBUG_MODE: convertEnvNumber(process.env.DEBUG_MODE) ?? 0,
    TRUNCATE: {
      REQUEST: convertEnvNumber(process.env.LOG_TRUNCATE_REQUEST_LENGTH) ?? 300,
      RESPONSE:
        convertEnvNumber(process.env.LOG_TRUNCATE_RESPONSE_LENGTH) ?? 300,
      DEBUG: convertEnvNumber(process.env.LOG_TRUNCATE_DEBUG_LENGTH) ?? 500,
    },
  },
});
