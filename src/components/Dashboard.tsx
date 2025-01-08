import { useState, useEffect, useCallback } from "react";
import Filters from "./Filters";
import ArticleList from "./ArticleList";
import {
  fetchNewsApiArticles,
  fetchGuardianArticles,
  normalizeArticles,
} from "../apis";

interface Article {
  title: string;
  description: string;
  source: string;
  publishedAt: string;
  url: string;
  urlToImage?: string;
}

const Dashboard = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [source, setSource] = useState("all");
  const [fromDate, setFromDate] = useState<Date | string>("");
  const [toDate, setToDate] = useState<Date | string>("");

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const [newsApiArticles, guardianArticles] = await Promise.all([
        fetchNewsApiArticles(
          searchQuery,
          category,
          source,
          fromDate instanceof Date ? fromDate : undefined,
          toDate instanceof Date ? toDate : undefined
        ),
        fetchGuardianArticles(
          searchQuery,
          category,
          source,
          fromDate.toString(),
          toDate.toString()
        ),
      ]);

      const normalizedArticles = normalizeArticles(
        newsApiArticles,
        guardianArticles
      );

      setArticles(normalizedArticles);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
      alert({
        title: "Error",
        description: "Failed to fetch articles. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [searchQuery, category, source, fromDate, toDate]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchArticles();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [fetchArticles]);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">NewsHub</h1>
      <Filters
        onSearch={setSearchQuery}
        onCategoryChange={setCategory}
        onSourceChange={setSource}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
      />
      <ArticleList articles={articles} loading={loading} />
    </div>
  );
};

export default Dashboard;
