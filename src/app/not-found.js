import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 bg-slate-800">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-white mb-2">
        This page could not be found.
      </h2>
      <p className="text-white mb-6 text-center">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-[#8a0e37] text-white rounded-lg hover:bg-[#bd2a5b] transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
}