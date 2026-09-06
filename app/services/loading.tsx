export default function ServicesLoading() {
  return (
    <div className="min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mb-4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-12 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
