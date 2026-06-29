import React, { use, useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthContext";

const Login = () => {
  const { login, googleSignIn, setUserInfo } = use(AuthContext);
  const [paswordShow, setPassworShow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "login | Eco Bill";
  }, []);

  //login
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    login(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful ",
          text: "Welcome back!",
          timer: 1500,
          showConfirmButton: false,
        });
        // console.log(res.user);
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err.message,
        });
      });
  };

  // Google Sign-In function
  const signInWithGoogle = () => {
    googleSignIn()
      .then((res) => {
        const user = res.user;
        const newUser = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };

        // Save user in your database if needed
        fetch("https://book-shop-server-delta.vercel.app/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .catch((err) =>
            Swal.fire({
              title: "Error!",
              text: err.message,
              icon: "error",
            }),
          );

        setUserInfo(user);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${user.displayName}!`,
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed",
          text: err.message,
        });
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.4)] p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-3xl shadow-xl">
            🔐
          </div>

          <h2 className="text-4xl font-bold text-white mt-5">Welcome Back</h2>

          <p className="text-slate-300 mt-2">Login to continue your journey.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm text-slate-300 mb-2 block">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-slate-400 px-4 py-3 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-slate-300 mb-2 block">
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={paswordShow ? "text" : "password"}
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-slate-400 px-4 py-3 pr-12 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500"
              />

              <button
                type="button"
                onClick={() => setPassworShow(!paswordShow)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-slate-300 hover:text-cyan-400"
              >
                {paswordShow ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-cyan-400 hover:text-cyan-300"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button className="w-full rounded-xl py-3 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition duration-300 shadow-lg hover:shadow-cyan-500/40">
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-slate-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-white py-3 font-semibold text-gray-700 hover:bg-gray-100 transition"
          >
            <svg
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path fill="#fff" d="M0 0h512v512H0z" />
                <path
                  fill="#34A853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                />
                <path
                  fill="#4285F4"
                  d="M386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                />
                <path
                  fill="#FBBC05"
                  d="M90 341a208 200 0 010-171l63 49q-12 37 0 73"
                />
                <path
                  fill="#EA4335"
                  d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                />
              </g>
            </svg>
            Continue with Google
          </button>

          {/* Footer */}
          <p className="text-center text-slate-300 pt-2">
            Don't have an account?
            <Link
              to="/register"
              className="ml-2 text-cyan-400 font-semibold hover:text-cyan-300"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
