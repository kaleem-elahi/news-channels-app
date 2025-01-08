import ContentLoader from "react-content-loader";

const ArticleSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden mt-5">
    <ContentLoader
      speed={2}
      width={400}
      height={200}
      viewBox="0 0 400 200"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="0" ry="0" width="200" height="200" />
      <rect x="220" y="20" rx="4" ry="4" width="240" height="20" />
      <rect x="220" y="45" rx="4" ry="4" width="160" height="20" />
      <rect x="220" y="75" rx="4" ry="4" width="60" height="20" />
    </ContentLoader>
  </div>
);

export default ArticleSkeleton;
