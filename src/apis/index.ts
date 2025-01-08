
interface NewsApiArticle {
  title: string;
  description: string;
  source: { name: string };
  publishedAt: string; // ISO8601 date format (e.g. 2010-07-20T10:00:00Z)
  url: string;
  urlToImage?: string;
}

interface GuardianArticle {
  webTitle: string;
  webPublicationDate: string;
  webUrl: string;
  fields?: {
    thumbnail?: string;
    bodyText?: string;
  };
  sectionName: string;
}

interface NormalizedArticle {
  title: string;
  description: string;
  source: string;
  publishedAt: string;
  url: string;
  urlToImage?: string;
}

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || '';
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY || '';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2/everything';
const GUARDIAN_API_BASE_URL = 'https://content.guardianapis.com/search';

export const fetchNewsApiArticles = async (
  query?: string,
  category?: string,
  sources?: string,
  fromDate?: Date,
  toDate?: Date
): Promise<NewsApiArticle[]> => {
  try {
    const params = new URLSearchParams();
    
    if (query) params.append('q', query);
    if (category) params.append('category', category);
    if (sources) params.append('sources', sources);
    if (fromDate) params.append('from', encodeURIComponent(fromDate.toISOString()));
    if (toDate) params.append('to', encodeURIComponent(toDate.toISOString()));
    params.append('apiKey', NEWS_API_KEY);

    const response = await fetch(`${NEWS_API_BASE_URL}?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('Error fetching from NewsAPI:', error);
    return [];
  }
};

export const fetchGuardianArticles = async (
  query: string,
  category: string,
  sources: string,
  fromDate: string,
  toDate: string
): Promise<GuardianArticle[]> => {
  try {
    const params = new URLSearchParams();
    
    if (query) params.append('q', query);
    if (category) params.append('tags', category);
    if (sources) params.append('sources', sources);
    if (fromDate) params.append('from-date', encodeURIComponent(fromDate));
    if (toDate) params.append('to-date', encodeURIComponent(toDate));
    params.append('show-fields', 'thumbnail,bodyText,source,category');
    params.append('api-key', GUARDIAN_API_KEY);

    const response = await fetch(`${GUARDIAN_API_BASE_URL}?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.response.results || [];
  } catch (error) {
    console.error('Error fetching from Guardian API:', error);
    return [];
  }
};


export const normalizeArticles = (
  newsApiArticles: NewsApiArticle[],
  guardianArticles: GuardianArticle[]
): NormalizedArticle[] => {
  const normalizedNewsApiArticles = newsApiArticles.map((article) => ({
    title: article.title,
    description: article.description,
    source: article.source.name,
    publishedAt: article.publishedAt,
    url: article.url, 
    urlToImage: article.urlToImage,
  }));

  const normalizedGuardianArticles = guardianArticles.map((article) => ({
    title: article.webTitle,
    description: article.fields?.bodyText?.slice(0, 200) + '...' || '',
    source: 'The Guardian',
    publishedAt: article.webPublicationDate,
    url: article.webUrl,
    urlToImage: article.fields?.thumbnail,
  }));

  return [...normalizedNewsApiArticles, ...normalizedGuardianArticles];
};