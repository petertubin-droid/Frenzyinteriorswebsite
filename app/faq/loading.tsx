export default function FaqLoading() {
  return (
    <div className="min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mb-4 animate-pulse" />
        <div className="space-y-4 mt-8 max-w-3xl mx-auto">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-14 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
