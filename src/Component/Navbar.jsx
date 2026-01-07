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
        console.log("User logged out successfully");
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have successfully logged out.",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        console.log(err.message);
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: err.message,
        });
      });
    setUserDb(null);
  };

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
            {/* admin  */}
            <li className="dropdown ">
              <button
                tabIndex={0}
                className={`${
                  userdb?.role == "admin"
                    ? "text-gray-700 hover:text-green-700 w-full duration-300"
                    : "text-gray-300"
                }`}
                disabled={userdb?.role !== "admin"}
              >
                Admin
              </button>

              {userInfo?.email && userdb?.role === "admin" && (
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/bookList" className="hover:text-green-700">
                      Book List
                    </Link>
                  </li>
                  <li>
                    <Link to="/addBook" className="hover:text-green-700">
                      Add Book
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/bookRequestList"
                      className="hover:text-green-700"
                    >
                      Book Request List
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
        <div className=" flex items-center gap-2 ml-3">
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
          <li className="hover:text-green-700 duration-300 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-green-700 duration-300 cursor-pointer">
            <Link to="/books">Books</Link>
          </li>
          <li className="hover:text-green-700 duration-300 cursor-pointer">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-green-700 duration-300 cursor-pointer">
            <Link to="/contact">Contact</Link>
          </li>

          {/* admin  */}
          <li className="dropdown ">
            <button
              tabIndex={0}
              className={`${
                userdb?.role == "admin"
                  ? "text-gray-700 hover:text-green-700 duration-300"
                  : "text-gray-300"
              }`}
              disabled={userdb?.role !== "admin"}
            >
              Admin
            </button>

            {userInfo?.email && userdb?.role === "admin" && (
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/bookList" className="hover:text-green-700">
                    Book List
                  </Link>
                </li>
                <li>
                  <Link to="/addBook" className="hover:text-green-700">
                    Add Book
                  </Link>
                </li>

                <li>
                  <Link to="/bookRequestList" className="hover:text-green-700">
                    Book Request List
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* login register  */}
      <ul className="navbar-end me-3 flex gap-3">
        <Link to="/myBookList" className="relative inline-block">
          <FaShoppingBag className="text-2xl" />

          {addtoCartCounter > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
              {addtoCartCounter}
            </span>
          )}
        </Link>
        {userInfo ? (
          // user img dropdown
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={userInfo?.photoURL}
                  alt={userInfo?.displayName || "User"}
                />
              </div>
            </div>

            {/* Dropdown menu */}
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2 gap-2"
            >
              <li className="font-semibold">
                <span>{userInfo?.displayName || "User"}</span>
              </li>
              <li className="text-gray-500 text-sm">{userInfo?.email}</li>
              <li>
                <button
                  onClick={LogOut}
                  className="btn w-full text-left px-2 py-1 hover:bg-red-100 rounded"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            {" "}
            <li>
              <Link className=" btn btn-sm" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className=" btn btn-sm">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
