import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { articlesList } from "../../data";
import * as useArticlesModule from "../../hooks/use-articles";
import { Articles } from "../articles";

beforeEach(() => {
  window.history.pushState(null, '', '/');

  jest.spyOn(useArticlesModule, 'useArticles').mockReturnValue({
    data: articlesList,
    isLoading: false,
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

function setup() {
  const user = userEvent.setup({ document });
  render(<Articles />);
  return { user };
}

describe('Loading state', () => {
  it('shows loading indicator while fetching', () => {
    jest.spyOn(useArticlesModule, 'useArticles').mockReturnValue({
      data: [],
      isLoading: true,
    });

    setup();

    expect(screen.getByRole('status')).toHaveTextContent('Loading articles…');
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });

  it('hides loading indicator when data is ready', () => {
    setup();
    expect(screen.queryByText('Loading articles…')).not.toBeInTheDocument();
  });
});

describe('ArticleList rendering', () => {
  it('renders all articles on initial load', () => {
    setup();
    expect(screen.getAllByRole('article')).toHaveLength(articlesList.length);
  });

  it('displays each article title, topic, and date', () => {
    setup();
    const first = articlesList.find((a) => a.id === '1')!;
    expect(screen.getByText(first.title)).toBeInTheDocument();
    expect(screen.getAllByTestId('article-topic')[0]).toBeInTheDocument();
    expect(screen.getAllByTestId('article-date')[0]).toBeInTheDocument();
  });

  it('shows the correct result count on load', () => {
    setup();
    expect(
      screen.getByText(`${articlesList.length} of ${articlesList.length} articles`),
    ).toBeInTheDocument();
  });
});

describe('Search by title', () => {
  it('filters articles as the user types', async () => {
    const { user } = setup();
    await user.type(screen.getByRole('textbox', { name: /search/i }), 'AI');
    screen.getAllByRole('article').forEach((item) =>
      expect(within(item).getByRole('heading').textContent?.toLowerCase()).toContain('ai'),
    );
  });

  it("shows 'No articles found.' when search has no results", async () => {
    const { user } = setup();
    await user.type(screen.getByRole('textbox', { name: /search/i }), 'xyzzy_no_match');
    expect(screen.getByRole('status')).toHaveTextContent('No articles found.');
  });

  it('is case-insensitive', async () => {
    const { user } = setup();
    const input = screen.getByRole('textbox', { name: /search/i });

    await user.type(input, 'ai');
    const lowerCount = screen.getAllByRole('article').length;

    await user.clear(input);
    await user.type(input, 'AI');
    const upperCount = screen.getAllByRole('article').length;

    expect(lowerCount).toBe(upperCount);
  });
});

describe('Filter by topic', () => {
  it('filters to only the selected topic', async () => {
    const { user } = setup();
    await user.selectOptions(screen.getByRole('combobox', { name: /filter by topic/i }), 'technology');
    screen
      .getAllByTestId('article-topic')
      .forEach((el) => expect(el).toHaveTextContent('technology'));
  });

  it("returns all articles when 'All topics' is selected", async () => {
    const { user } = setup();
    const select = screen.getByRole('combobox', { name: /filter by topic/i });
    await user.selectOptions(select, 'technology');
    await user.selectOptions(select, 'all');
    expect(screen.getAllByRole('article')).toHaveLength(articlesList.length);
  });

  it('updates result count when a topic is selected', async () => {
    const { user } = setup();
    await user.selectOptions(screen.getByRole('combobox', { name: /filter by topic/i }), 'finance');
    const financeCount = articlesList.filter((a) => a.topic === 'finance').length;
    expect(
      screen.getByText(`${financeCount} of ${articlesList.length} articles`),
    ).toBeInTheDocument();
  });
});

describe('Sort articles', () => {
  it('sorts newest first by default', () => {
    setup();
    const dates = screen
      .getAllByTestId('article-date')
      .map((el) => new Date(el.textContent ?? '').getTime());
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i - 1]).toBeGreaterThanOrEqual(dates[i]);
    }
  });

  it("sorts titles A → Z when 'Title A → Z' is selected", async () => {
    const { user } = setup();
    await user.selectOptions(screen.getByRole('combobox', { name: /sort articles/i }), 'title-asc');
    const titles = screen
      .getAllByRole('heading', { level: 3 })
      .map((el) => el.textContent ?? '');
    for (let i = 1; i < titles.length; i++) {
      expect(titles[i - 1].localeCompare(titles[i])).toBeLessThanOrEqual(0);
    }
  });

  it("sorts titles Z → A when 'Title Z → A' is selected", async () => {
    const { user } = setup();
    await user.selectOptions(screen.getByRole('combobox', { name: /sort articles/i }), 'title-desc');
    const titles = screen
      .getAllByRole('heading', { level: 3 })
      .map((el) => el.textContent ?? '');
    for (let i = 1; i < titles.length; i++) {
      expect(titles[i - 1].localeCompare(titles[i])).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('Composed filters', () => {
  it('applies search and topic filter simultaneously', async () => {
    const { user } = setup();
    await user.selectOptions(screen.getByRole('combobox', { name: /filter by topic/i }), 'technology');
    await user.type(screen.getByRole('textbox', { name: /search/i }), 'AI');
    screen.getAllByRole('article').forEach((item) => {
      expect(within(item).getByTestId('article-topic')).toHaveTextContent('technology');
      expect(within(item).getByRole('heading').textContent?.toLowerCase()).toContain('ai');
    });
  });
});
