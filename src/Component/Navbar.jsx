import React, { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";
import { FaShoppingBag } from "react-icons/fa";

const Navbar = () => {
  const { userInfo, logOut, userdb, setUserDb, addtoCartCounter } =
    use(AuthContext);

  const LogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have successfully logged out.",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: err.message,
        });
      });
    setUserDb(null);
  };

  return (
    // Premium Glassmorphism Floating Navbar
    <div className="navbar sticky top-0 z-50 border-b border-white/10 bg-slate-900/100 backdrop-blur-xl text-white shadow-lg px-4 transition-all duration-300">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden hover:bg-white/10 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-slate-950/95 border border-white/10 text-slate-200 rounded-2xl z-50 mt-3 w-52 p-3 shadow-2xl font-semibold gap-1"
          >
            <li>
              <Link to="/" className="hover:text-cyan-400 focus:text-cyan-400">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/books"
                className="hover:text-cyan-400 focus:text-cyan-400"
              >
                Books
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-cyan-400 focus:text-cyan-400"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-cyan-400 focus:text-cyan-400"
              >
                Contact
              </Link>
            </li>

            {/* Mobile Admin Section */}
            {userInfo?.email && userdb?.role === "admin" && (
              <li className="border-t border-white/10 mt-1 pt-1">
                <span className="text-xs text-cyan-400 font-bold tracking-wider uppercase pl-3">
                  Admin Panel
                </span>
                <ul className="p-1 pl-2 gap-1">
                  <li>
                    <Link to="/bookList" className="hover:text-cyan-400">
                      Book List
                    </Link>
                  </li>
                  <li>
                    <Link to="/addBook" className="hover:text-cyan-400">
                      Add Book
                    </Link>
                  </li>
                  <li>
                    <Link to="/bookRequestList" className="hover:text-cyan-400">
                      Request List
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>

        {/* Logo & Name */}
        <div className="flex items-center gap-3 ml-2">
          <Link
            to="/"
            className="hover:scale-105 transition-transform duration-200"
          >
            <img
              className="h-10 w-10 rounded-full ring-2 ring-cyan-500 shadow-md shadow-cyan-500/20"
              src="https://plus.unsplash.com/premium_photo-1669652639337-c513cc42ead6?w=800&auto=format&fit=crop&q=60"
              alt="Logo"
            />
          </Link>
          <h3 className="font-extrabold text-xl tracking-wide bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Book Shop
          </h3>
        </div>
      </div>

      {/* Navbar Center (Desktop Desktop Mode) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold gap-2 text-slate-300">
          <li>
            <Link to="/" className="hover:text-cyan-400 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/books" className="hover:text-cyan-400 transition-colors">
              Books
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-cyan-400 transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-cyan-400 transition-colors"
            >
              Contact
            </Link>
          </li>

          {/* Desktop Admin Dropdown */}
          {userInfo?.email && userdb?.role === "admin" && (
            <li className="dropdown dropdown-hover">
              <button
                tabIndex={0}
                className="hover:text-cyan-400 text-cyan-400 font-bold transition-colors flex items-center gap-1"
              >
                Admin ▾
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-2xl bg-slate-950/95 border border-white/10 text-slate-200 rounded-xl w-52 z-50"
              >
                <li>
                  <Link to="/bookList" className="hover:text-cyan-400">
                    Book List
                  </Link>
                </li>
                <li>
                  <Link to="/addBook" className="hover:text-cyan-400">
                    Add Book
                  </Link>
                </li>
                <li>
                  <Link to="/bookRequestList" className="hover:text-cyan-400">
                    Book Request List
                  </Link>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>

      {/* Navbar End (Actions & Auth Context) */}
      <div className="navbar-end gap-4 me-2">
        {/* Cart Icon */}
        <Link
          to="/myBookList"
          className="relative p-2 text-slate-300 hover:text-cyan-400 transition-colors group"
        >
          <FaShoppingBag className="text-2xl group-hover:scale-110 transition-transform" />
          {addtoCartCounter > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-lg animate-pulse">
              {addtoCartCounter}
            </span>
          )}
        </Link>

        {/* User Auth Condition */}
        {userInfo ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar ring-2 ring-cyan-500/50 hover:ring-cyan-400 transition-all"
            >
              <div className="w-10 rounded-full">
                <img
                  src={userInfo?.photoURL}
                  alt={userInfo?.displayName || "User"}
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu p-3 shadow-2xl bg-slate-950/95 border border-white/10 text-slate-200 rounded-2xl w-56 mt-3 gap-2 z-50"
            >
              <li className="px-2 py-1">
                <span className="font-bold text-white block truncate">
                  {userInfo?.displayName || "User"}
                </span>
                <span className="text-xs text-slate-400 truncate block -mt-2">
                  {userInfo?.email}
                </span>
              </li>
              <div className="h-px bg-white/10 my-1" />
              <li>
                <button
                  onClick={LogOut}
                  className="w-full text-center bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white py-2 rounded-xl transition duration-200 font-medium"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="btn btn-sm border-white/10 bg-white/10 text-white hover:bg-white/20 px-4 rounded-xl font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-sm border-none bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:scale-105 px-4 rounded-xl font-medium shadow-lg shadow-cyan-500/20 transition duration-300"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
