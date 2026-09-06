export default function BlogPostLoading() {
  return (
    <div className="min-h-screen py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8 animate-pulse" />
        <div className="h-64 bg-gray-200 rounded-lg mb-8 animate-pulse" />
        <div className="space-y-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
