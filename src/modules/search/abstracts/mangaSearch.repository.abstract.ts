import { IMangaSearchData } from './mangaSearchData.interface';

export abstract class AbstractMangaSearchRepository {
  abstract searchMangas(
    txtSearch: string,
    limit: number,
  ): Promise<IMangaSearchData[]>;
}
