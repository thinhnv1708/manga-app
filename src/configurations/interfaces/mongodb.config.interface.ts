export interface IMongodbConfig {
  SERVERS: string[];
  DB_NAME: string;
  USERNAME: string;
  PASSWORD: string;
  AUTH_SOURCE: string;
  REPL: string;
}
