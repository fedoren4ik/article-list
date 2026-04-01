import { useEffect, useState } from "react";
import { Article } from "../types";
import { articlesList } from "../data";

type ArticlesResultType = { data: Article[]; isLoading: boolean };

export const useArticles = (): ArticlesResultType => {
  const [data, setData] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(articlesList);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading };
};
