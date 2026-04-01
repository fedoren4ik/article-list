import { useEffect, useState } from "react";
import { Article } from "../types";
import { articlesList } from "../data";

export const useArticles = () => {
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
}
