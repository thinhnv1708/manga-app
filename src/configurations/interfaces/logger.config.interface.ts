export interface ILoggerConfig {
  DEBUG_MODE: number;
  TRUNCATE: {
    REQUEST: number;
    RESPONSE: number;
    DEBUG: number;
  };
}
