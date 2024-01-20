import { IAppConfig } from '@configurations/interfaces';
import { AbstractLoggerGwAdp } from '@modules/logger';
import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { buildLogContext } from '@utils/buildLogContext.util';
import { buildLogMessage } from '@utils/buildLogMessage.util';
import { searchMangasQueryJoiSchema } from './dtos/joiSchemas';
import { ISearchMangasResult } from './dtos/searchMangasResult.interface';
import { SearchService } from './search.service';
import { ISearchMangasQuery } from './dtos';
import { LoggingHttpReqResInterceptor } from 'src/interceptors';
const CONTEXT_LOG = 'SearchRestControllerAdp';

@UseInterceptors(LoggingHttpReqResInterceptor)
@Controller('/api/v1/search')
export class SearchRestControllerAdp {
  constructor(
    private readonly loggerGwAdp: AbstractLoggerGwAdp,
    private readonly configService: ConfigService,
    private readonly searchService: SearchService,
  ) {}

  @Get('/manga')
  async searchMangas(
    @Query('txtSearch') txtSearch: string,
  ): Promise<ISearchMangasResult[]> {
    const { MANGA_SEARCH_LIMIT_DOC } =
      this.configService.get<IAppConfig>('APP_CONFIG');

    const { error: validateError, value } = searchMangasQueryJoiSchema.validate(
      {
        txtSearch,
      },
    );

    if (validateError) {
      this.loggerGwAdp.error(
        buildLogMessage(validateError.message, JSON.stringify(value)),
        buildLogContext(CONTEXT_LOG, 'searchMangas'),
      );

      return [];
    }

    const { txtSearch: newTxtSearch } = <ISearchMangasQuery>value;

    const mangas = await this.searchService.searchMangas(
      newTxtSearch,
      MANGA_SEARCH_LIMIT_DOC,
    );

    return mangas.map((manga) => {
      const { id, title, subTitle, thumbnail, totalChapter, genreTitles } =
        manga;

      return {
        id,
        title,
        subTitle,
        thumbnail,
        totalChapter,
        genreTitles,
      };
    });
  }
}
