export default function ServiceDetailLoading() {
  return (
    <div className="min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-96 bg-gray-200 rounded-lg mb-12 animate-pulse" />
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4 animate-pulse" />
        <div className="space-y-3 max-w-3xl">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: `${50 + Math.random() * 50}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
