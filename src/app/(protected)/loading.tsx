export default function ProtectedLoading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 animate-in fade-in duration-300">
      {/* Pulsating Logo Mark */}
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 shadow-lg shadow-orange-500/30 animate-pulse" />
        <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 blur-xl opacity-40 animate-pulse" />
      </div>

      {/* Loading Text */}
      <div className="flex flex-col items-center gap-2">
        <h2
          className="text-lg font-bold text-gray-900 tracking-tight"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Loading...
        </h2>
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  )
}
