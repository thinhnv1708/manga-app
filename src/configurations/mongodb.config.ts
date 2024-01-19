import { IMongodbConfig } from './interfaces';

export default (): { MONGODB_CONFIG: IMongodbConfig } => ({
  MONGODB_CONFIG: {
    DB_NAME: process.env.MONGODB_DB_NAME,
    USERNAME: process.env.MONGODB_USER,
    PASSWORD: process.env.MONGODB_PASSWORD,
    REPL: process.env.MONGODB_REPLS,
    SERVERS: process.env.MONGODB_SERVERS
      ? process.env.MONGODB_SERVERS.split(' ')
      : ['localhost:27017'],
    AUTH_SOURCE: process.env.MONGODB_AUTH_SOURCE || 'admin',
  },
});
