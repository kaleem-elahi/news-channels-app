import React from "react";

interface ArticleCardProps {
  title: string;
  description: string;
  publishedAt: string;
  source: string;
  date: string;
  urlToImage?: string;
  url: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  source,
  date,
  urlToImage,
  url,
}) => {
  console.log("ArticleCard props:", {
    title,
    description,
    source,
    date,
    urlToImage,
    url,
  });
  return (
    <a
      href={url}
      target="_blank"
      className="flex md:flex-row flex-col bg-neutral-50 w-auto bg-red rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-fade-in text-left"
      rel="noopener noreferrer"
    >
      <div className="w-full h-full flex-shrink-1 md:w-1/3 md:h-auto">
        {urlToImage && (
          <img
            src={urlToImage}
            alt={title}
            className="w-30 h-full object-cover"
          />
        )}
      </div>
      <div className="flex-1">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-primary line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
          <div className="flex flex-col justify-around items-left text-sm text-gray-500">
            <div>{source}</div>
            <div>{date}</div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ArticleCard;
