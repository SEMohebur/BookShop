import React, { useEffect } from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { Link } from "react-router";
import notFoundPage from "../assets/App-Error.png";

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "Not Found 404 | My Book Shop";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white flex flex-col justify-between">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.4)] p-8 text-center flex flex-col items-center">
          {/* Image with subtle glow */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-cyan-500/10 blur-2xl rounded-full"></div>
            <img
              src={notFoundPage}
              alt="Not found"
              className="w-60 relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
            />
          </div>

          {/* Heading & Text */}
          <h2 className="text-3xl font-bold text-white mb-2">
            Oops, page not found!
          </h2>
          <p className="text-slate-300 max-w-md text-sm">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          {/* Action Button */}
          <div className="mt-8">
            <Link
              to="/"
              className="px-8 py-3 font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 rounded-xl transition duration-300 shadow-lg shadow-cyan-500/10 hover:scale-[1.02] text-center inline-flex items-center gap-2 cursor-pointer"
            >
              <span>🔙</span> Go Back Home
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NotFoundPage;
