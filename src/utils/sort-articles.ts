import { Article, SortKey } from "../types";

export const sortArticles = (articles: Article[], sortKey: SortKey): Article[] => {
  const copy = [...articles];

  if (sortKey === 'date') {
    return copy.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  }

  if (sortKey === 'title-desc') {
    return copy.sort((a, b) => b.title.localeCompare(a.title));
  }

  return copy.sort((a, b) => a.title.localeCompare(b.title));
};
