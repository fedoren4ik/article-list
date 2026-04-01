import { Article } from "../../types";
import { formatDate } from "../../utils";

type ArticleCardProps = {
  article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <article
      style={{
        border: '1px solid #ddd',
        borderRadius: 6,
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{article.title}</h3>
      <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#555' }}>
        <span data-testid="article-topic">{article.topic}</span>
        <span data-testid="article-date">{formatDate(article.publishedAt)}</span>
      </div>
    </article>
  );
};
