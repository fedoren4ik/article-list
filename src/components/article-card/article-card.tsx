import { Article } from '../../types';
import { formatDate } from '../../utils';

type ArticleCardProps = {
  article: Article;
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: 6,
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 6,
  },
  title: { margin: 0, fontSize: 16, fontWeight: 600 },
  meta: { display: 'flex', gap: 16, fontSize: 13, color: '#555' },
} as const;

export const ArticleCard = ({ article }: ArticleCardProps) => (
  <article style={styles.card}>
    <h3 style={styles.title}>{article.title}</h3>
      <div style={styles.meta}>
        <span data-testid="article-topic">{article.topic}</span>
        <span data-testid="article-date">{formatDate(article.publishedAt)}</span>
      </div>
  </article>
);
