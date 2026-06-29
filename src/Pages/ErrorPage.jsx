import React, { useEffect } from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { useRouteError, Link } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  useEffect(() => {
    document.title = "Error | My Book Shop";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white flex flex-col justify-between">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.4)] p-8 text-center border-t-rose-500/40 border-t-2">
          {/* Glowing Warning Icon */}
          <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-3xl shadow-xl animate-pulse">
            ⚠️
          </div>

          <h2 className="text-3xl font-bold text-white mt-5">
            Something Went Wrong
          </h2>
          <p className="text-slate-300 mt-2 text-sm">
            An unexpected error occurred while routing or processing your
            request.
          </p>

          {/* Error Message Box */}
          <div className="mt-5 p-4 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 font-mono text-sm break-words max-h-40 overflow-y-auto">
            {error?.statusText || error?.message || "Unknown Routing Error"}
          </div>

          {/* Action Button */}
          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              className="px-8 py-3 font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 rounded-xl transition duration-300 shadow-lg shadow-cyan-500/10 hover:scale-[1.02] text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ErrorPage;
