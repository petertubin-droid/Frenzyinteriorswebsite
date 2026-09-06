export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0a1a3a] flex flex-col items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-[#d4af37]/20" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#d4af37] animate-spin" />
      </div>
      <p className="mt-6 text-white/80 text-sm font-medium tracking-wider animate-pulse">
        Loading Frenzy Interiors
      </p>
    </div>
  );
}
