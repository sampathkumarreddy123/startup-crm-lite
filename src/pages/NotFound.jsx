import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-slate-600 mt-4">Page not found</p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;