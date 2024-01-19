const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 1000;

export const getPageLimit = (
  page: number,
  limit: number,
): [page: number, limit: number] => {
  const newPage = page > 0 ? page : DEFAULT_PAGE;
  const newLimit = limit > 0 ? limit : DEFAULT_LIMIT;

  return [newPage, newLimit];
};
