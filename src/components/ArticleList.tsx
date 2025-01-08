import React from "react";
import ArticleCard from "./ArticleCard";
import ArticleSkeleton from "./ArticleSkeleton";

interface Article {
  title: string;
  description: string;
  source: string;
  publishedAt: string;
  url: string;
  urlToImage?: string;
}

interface ArticleListProps {
  articles: Article[];
  loading: boolean;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <ArticleSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <ArticleCard
            key={`${article.url}-${index}`}
            title={article.title}
            description={article.description}
            source={article.source}
            publishedAt={article.publishedAt}
            url={article.url}
            urlToImage={article.urlToImage}
            date={article.publishedAt}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
