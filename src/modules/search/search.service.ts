import { Injectable } from '@nestjs/common';
import { AbstractMangaSearchRepository, IMangaSearchData } from './abstracts';

@Injectable()
export class SearchService {
  constructor(
    private readonly mangaSearchRepository: AbstractMangaSearchRepository,
  ) {}

  async searchMangas(
    txtSearch: string,
    limit: number,
  ): Promise<IMangaSearchData[]> {
    return this.mangaSearchRepository.searchMangas(txtSearch, limit);
  }
}
