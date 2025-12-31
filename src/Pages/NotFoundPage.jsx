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
    <div>
      <Navbar></Navbar>
      <div className="h-[60vh] w-full flex flex-col justify-center items-center text-center my-4 ">
        <img src={notFoundPage} alt="Not found" className="w-60 mb-6" />

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Oops, page not found!
        </h2>
        <p className="text-gray-500 max-w-md">
          The page you are looking for is not available.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="px-6 py-3 rounded-md shadow bg-blue-300 
                  font-semibold flex items-center gap-2"
          >
            Go Back!
          </Link>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default NotFoundPage;
