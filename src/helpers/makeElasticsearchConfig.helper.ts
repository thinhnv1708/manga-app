import { IElasticsearchConfig } from '@configurations/interfaces';
import { ElasticsearchModuleOptions } from '@nestjs/elasticsearch';

export const makeElasticsearchConfig = (
  elasticsearchConfig: IElasticsearchConfig,
): ElasticsearchModuleOptions => {
  const { NODES, USERNAME, PASSWORD } = elasticsearchConfig;

  if (!USERNAME) {
    return {
      nodes: NODES,
      tls: { rejectUnauthorized: false },
    };
  }

  return {
    nodes: NODES,
    auth: {
      username: USERNAME,
      password: PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  };
};
