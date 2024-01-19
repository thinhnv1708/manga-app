import { Module } from '@nestjs/common';
import { AbstractMangaSearchRepository } from './abstracts';
import { MangaSearchRepository } from './mangaSearch.repository';
import { SearchService } from './search.service';
import { SearchRestControllerAdp } from './search.rest.controller.adp';

@Module({
  controllers: [SearchRestControllerAdp],
  providers: [
    { provide: AbstractMangaSearchRepository, useClass: MangaSearchRepository },
    SearchService,
  ],
})
export class SearchModule {}
