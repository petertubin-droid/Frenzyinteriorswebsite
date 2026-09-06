export default function SectionSkeleton({ count = 3, height = "h-48" }: { count?: number; height?: string }) {
  return (
    <div className="py-16 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-12" />
        <div className={`grid grid-cols-1 md:grid-cols-${Math.min(count, 3)} gap-8`}>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className={`${height} bg-gray-200 rounded-lg`} />
          ))}
        </div>
      </div>
    </div>
  );
}
