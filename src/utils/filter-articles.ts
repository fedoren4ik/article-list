import { Article, FilterArticlesType } from "../types";

export const filterArticles = (
  articles: Article[],
  topic: FilterArticlesType,
  search: string,
): Article[] => {
  return articles.filter((a) => {
    const matchesTopic = topic === 'all' || a.topic === topic;
    const matchesSearch = a.title.toLowerCase().includes(search.trim().toLowerCase());
    return matchesTopic && matchesSearch;
  });
};
