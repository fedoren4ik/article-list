import { useMemo, useState } from "react";
import { Topic, SortKey, FilterArticlesType } from "../../types";
import { filterArticles, sortArticles } from "../../utils";
import { ArticleCard } from "../article-card";
import { articlesList } from "../../data";

export const TOPICS = ['technology', 'finance', 'sports', 'health'] as const satisfies Topic[];

export const Articles = () => {
  const [search, setSearch] = useState('');
  const [topic, setTopic] = useState<FilterArticlesType>('all');
  const [sortKey, setSortKey] = useState<SortKey>('date');

  const displayed = useMemo(
    () => sortArticles(filterArticles(articlesList, topic, search), sortKey),
    [search, topic, sortKey],
  );

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: 24 }}>Articles</h1>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20, alignItems: 'center' }}>
          <input
            type="text"
            aria-label="Search by title"
            placeholder="Search by title…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, fontSize: 14, flex: '1 1 180px' }}
          />

          <select
            aria-label="Filter by topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value as Topic | 'all')}
            style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, fontSize: 14 }}
          >
            <option value="all">All topics</option>
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>

          <select
            aria-label="Sort articles"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, fontSize: 14 }}
          >
            <option value="date">Newest first</option>
            <option value="title-asc">Title A → Z</option>
            <option value="title-desc">Title Z → A</option>
          </select>
        </div>

        <p style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>
          {displayed.length} of {articlesList.length} articles
        </p>

          {displayed.length === 0 ? (
            <p role="status">No articles found.</p>
          ) : (
            <ul
              aria-label="Article list"
              style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              {displayed.map((article) => (
                <li key={article.id}>
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          )}
    </div>
  );
};
