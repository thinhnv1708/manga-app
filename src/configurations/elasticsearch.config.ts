import { IElasticsearchConfig } from './interfaces';

export default (): {
  ELASTICSEARCH_CONFIG: IElasticsearchConfig;
} => ({
  ELASTICSEARCH_CONFIG: {
    NODES: process.env.ES_NODES.split(' '),
    MANGA_SEARCH_INDEX: process.env.ES_MANGA_SEARCH_INDEX,
    USERNAME: process.env.ES_USER,
    PASSWORD: process.env.ES_PASSWORD,
  },
});
