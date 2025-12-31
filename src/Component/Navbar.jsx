import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="  navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow font-semibold"
          >
            <li className=" hover:text-green-700 duration-300 cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className=" hover:text-green-700 duration-300 cursor-pointer">
              <Link to="/books">Books</Link>
            </li>

            <li className=" hover:text-green-700 duration-300 cursor-pointer">
              <Link to="/about">About</Link>
            </li>
            <li className=" hover:text-green-700 duration-300 cursor-pointer">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className=" flex items-center gap-2">
          <Link to="/">
            {" "}
            <img
              className=" h-12 w-12 rounded-full"
              src="https://plus.unsplash.com/premium_photo-1669652639337-c513cc42ead6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D"
              alt=""
            />
          </Link>
          <h3 className=" font-bold text-gray-700">Book Shop</h3>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold">
          <li className=" hover:text-green-700 duration-300 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className=" hover:text-green-700 duration-300 cursor-pointer">
            <Link to="/books">Books</Link>
          </li>

          <li className=" hover:text-green-700 duration-300 cursor-pointer">
            <Link to="/about">About</Link>
          </li>
          <li className=" hover:text-green-700 duration-300 cursor-pointer">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end me-3">
        <button
          className="btn"
          popoverTarget="popover-1"
          style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}
        >
          Admin
        </button>

        <ul
          className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
          popover="auto"
          id="popover-1"
          style={{ positionAnchor: "--anchor-1" } /* as React.CSSProperties */}
        >
          <li>
            <Link to="/bookList">Book List</Link>
          </li>
          <li className=" hover:text-green-700 duration-300 cursor-pointer">
            <Link to="/addBook">Add Book</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
