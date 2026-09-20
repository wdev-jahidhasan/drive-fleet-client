export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Outer Glowing Ring */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-teal-500/20 border-t-teal-400 rounded-full animate-spin"></div>
        {/* Inner Spinner */}
        <div className="absolute w-10 h-10 sm:w-12 sm:h-12 border-4 border-cyan-500/20 border-b-cyan-400 rounded-full animate-spin"></div>
      </div>
      <p className="text-slate-300 font-medium mt-4 text-sm sm:text-base tracking-wider animate-pulse">
        Loading...
      </p>
    </div>
  );
}