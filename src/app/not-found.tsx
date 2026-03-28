import Link from "next/link"

export default function NotFound() {
  return (
    <html lang="en">
      <body className="bg-[#0A0F1C] text-white min-h-screen flex items-center justify-center font-sans">
        <div className="relative text-center px-6 py-20 max-w-lg mx-auto isolate">
          {/* Background Orbs */}
          <div className="absolute top-[-20%] right-[-30%] w-[60%] h-[120%] bg-orange-500/15 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-30%] left-[-20%] w-[50%] h-[120%] bg-pink-500/15 blur-[100px] rounded-full pointer-events-none" />

          {/* 404 Badge */}
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 shadow-lg shadow-orange-500/30 mb-8">
              <span className="text-3xl font-extrabold text-white tracking-tighter" style={{ fontFamily: "var(--font-outfit)" }}>
                404
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Page not{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">
                found
              </span>
            </h1>

            <p className="text-gray-400 text-base md:text-lg mb-10 max-w-md mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="px-8 py-3.5 rounded-xl bg-white text-[#0A0F1C] font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all"
              >
                ← Back to Dashboard
              </Link>
              <Link
                href="/"
                className="px-8 py-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-gray-200 font-semibold text-sm hover:bg-white/10 transition-all"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
