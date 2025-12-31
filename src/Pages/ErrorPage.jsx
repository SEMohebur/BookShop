import React from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div>
      <Navbar></Navbar>
      <div className=" min-h-60 flex justify-center items-center text-center">
        <div>
          {" "}
          <p className=" font-bold text-2xl">Something went Wrong</p>
          <p className=" text-red-500">{error.message}</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ErrorPage;
