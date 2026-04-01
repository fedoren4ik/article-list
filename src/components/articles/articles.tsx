import { useMemo, useState } from 'react';
import { Topic, SortKey, FilterArticlesType } from '../../types';
import { filterArticles, sortArticles } from '../../utils';
import { ArticleCard } from '../article-card';
import { useArticles } from '../../hooks';

export const TOPICS = ['technology', 'finance', 'sports', 'health'] as const satisfies Topic[];

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const styles = {
  wrapper: {
    maxWidth: 760,
    margin: '0 auto',
    padding: '32px 16px',
    fontFamily: 'system-ui, sans-serif',
  },
  heading: { marginBottom: 24 },
  controls: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap' as const,
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: 4,
    fontSize: 14,
    flex: '1 1 180px',
  },
  select: {
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: 4,
    fontSize: 14,
  },
  resultCount: { fontSize: 13, color: '#666', marginBottom: 16 },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 12,
  },
  feedback: { fontSize: 14, color: '#555' },
} as const;

export const Articles = () => {
  const [search, setSearch] = useState('');
  const [topic, setTopic] = useState<FilterArticlesType>('all');
  const [sortKey, setSortKey] = useState<SortKey>('date');

  const { data, isLoading } = useArticles();

  const displayed = useMemo(
    () => sortArticles(filterArticles(data, topic, search), sortKey),
    [data, search, topic, sortKey],
  );

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>Articles</h1>
        <div style={styles.controls}>
          <input
            type="text"
            aria-label="Search by title"
            placeholder="Search by title…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />

          <select
            aria-label="Filter by topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value as FilterArticlesType)}
            style={styles.select}
          >
            <option value="all">All topics</option>
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {capitalize(t)}
              </option>
            ))}
          </select>

          <select
            aria-label="Sort articles"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            style={styles.select}
          >
            <option value="date">Newest first</option>
            <option value="title-asc">Title A → Z</option>
            <option value="title-desc">Title Z → A</option>
          </select>
        </div>

        {isLoading ? (
          <p role="status" style={styles.feedback}>Loading articles…</p>
        ) : (
          <>
            <p style={styles.resultCount}>
              {displayed.length} of {data.length} articles
            </p>
            {displayed.length === 0 ? (
              <p role="status">No articles found.</p>
            ) : (
              <ul aria-label="Article list" style={styles.list}>
                {displayed.map((article) => (
                  <li key={article.id}>
                    <ArticleCard article={article} />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
    </div>
  );
};
