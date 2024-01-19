import { IMongodbConfig } from '@configurations/interfaces';

export const makeMongodbConfig = (mongooseConfig: IMongodbConfig): string => {
  const {
    SERVERS: servers,
    USERNAME: user,
    PASSWORD: password,
    AUTH_SOURCE: authPath,
    REPL: repl,
    DB_NAME: dbName,
  } = mongooseConfig;

  if (!dbName) {
    throw new Error('Database name is not defined');
  }

  return (() => {
    const url = servers.reduce((prev, cur) => prev + cur + ',', '');

    if (user && password) {
      return (
        `mongodb://${user}:${password}@${url.substring(
          0,
          url.length - 1,
        )}/${dbName}?authSource=` +
        (authPath || 'admin') +
        (repl ? `&replicaSet=${repl}` : '')
      );
    } else {
      return (
        `mongodb://${url.substring(0, url.length - 1)}/${dbName}` +
        (repl ? `?replicaSet=${repl}` : '')
      );
    }
  })();
};
