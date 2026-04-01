import { render, screen } from '@testing-library/react';
import { Article } from "../../types";
import { ArticleCard } from './article-card';

const article: Article = {
  id: '1',
  title: 'AI is transforming healthcare',
  topic: 'technology',
  publishedAt: '2026-03-20T10:15:00Z',
};

describe('ArticleCard', () => {
  it('renders the article title', () => {
    render(<ArticleCard article={article} />);
    expect(screen.getByRole('heading', { name: article.title })).toBeInTheDocument();
  });

  it('renders the topic', () => {
    render(<ArticleCard article={article} />);
    expect(screen.getByTestId('article-topic')).toHaveTextContent('technology');
  });

  it('renders the formatted date', () => {
    render(<ArticleCard article={article} />);
    expect(screen.getByTestId('article-date')).toHaveTextContent('Mar 20, 2026');
  });
});
