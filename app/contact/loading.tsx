export default function ContactLoading() {
  return (
    <div className="min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mb-4 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
