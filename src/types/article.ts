import { Topic } from "./topic";

export type Article = {
  id: string;
  title: string;
  topic: Topic;
  publishedAt: string;
};
