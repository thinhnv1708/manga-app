import { IElasticsearchConfig } from '@configurations/interfaces';
import { QueryDslQueryContainer } from '@elastic/elasticsearch/lib/api/types';
import { AbstractLoggerGwAdp } from '@modules/logger';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { buildLogContext } from '@utils/buildLogContext.util';
import { buildLogMessage } from '@utils/buildLogMessage.util';
import { excutePromise } from '@utils/excutePromise.util';
import { AbstractMangaSearchRepository, IMangaSearchData } from './abstracts';
import { COMMONS } from '@constants/index';
const CONTEXT_LOG = 'MangaSearchRepository';

@Injectable()
export class MangaSearchRepository implements AbstractMangaSearchRepository {
  private index: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly loggerGwAdp: AbstractLoggerGwAdp,
    private readonly elasticsearchService: ElasticsearchService,
  ) {
    const { MANGA_SEARCH_INDEX } = this.configService.get<IElasticsearchConfig>(
      'ELASTICSEARCH_CONFIG',
    );

    this.index = MANGA_SEARCH_INDEX;
  }

  async searchMangas(
    txtSearch: string,
    limit: number,
  ): Promise<IMangaSearchData[]> {
    const query: QueryDslQueryContainer = {
      bool: {
        must: [
          {
            bool: {
              must_not: {
                match: {
                  status: COMMONS.HIDDEN_STATUS,
                },
              },
            },
          },
          {
            bool: {
              should: [
                { match: { title: txtSearch } },
                { match: { subTitle: txtSearch } },
              ],
            },
          },
        ],
      },
    };

    const [error, result] = await excutePromise(
      this.elasticsearchService.search<IMangaSearchData>({
        index: this.index,
        query,
        sort: [{ _score: { order: 'desc' } }],
        size: limit,
      }),
    );

    if (error) {
      this.loggerGwAdp.error(
        buildLogMessage(
          error.message,
          JSON.stringify({ query }),
          '',
          error.stack,
        ),
        buildLogContext(CONTEXT_LOG, 'searchMangas'),
      );

      throw error;
    }

    this.loggerGwAdp.debug(
      buildLogMessage('', JSON.stringify(query), JSON.stringify(result)),
      buildLogContext(CONTEXT_LOG, 'searchMangas'),
    );

    return result.hits.hits.map(
      (searchHitMetadata) => searchHitMetadata._source,
    );
  }
}
