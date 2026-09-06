export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse" />
          <div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6 animate-pulse" />
            <div className="h-20 bg-gray-200 rounded mb-6 animate-pulse" />
            <div className="h-12 bg-gray-200 rounded w-1/3 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
