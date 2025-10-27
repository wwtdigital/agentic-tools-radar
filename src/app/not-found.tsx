export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
      <p className="text-lg text-slate-600 mb-8">Page not found</p>
      <a href="/radar" className="text-blue-600 hover:underline">
        Go to Radar
      </a>
    </div>
  );
}
