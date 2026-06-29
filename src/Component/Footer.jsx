import React from "react";
import { Link } from "react-router";
import {
  FaGithub,
  FaFacebook,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Background Glow */}
      <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Book
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Shop
              </span>
            </h2>

            <p className="mt-5 text-gray-400 leading-7">
              Discover thousands of books with a modern, responsive, and secure
              online shopping experience built using the MERN Stack.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/books" className="hover:text-cyan-400 transition">
                  Books
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-cyan-400 transition">
                  About
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">Contact</h3>

            <div className="space-y-4 text-gray-400">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-cyan-400" />
                <span>mdmohebur11@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-cyan-400" />
                <span>+880 1987573972</span>
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-cyan-400" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">Follow Us</h3>

            <p className="text-gray-400 mb-5">
              Stay connected with us through social platforms.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-400 transition hover:bg-cyan-500 hover:text-white"
              >
                <FaGithub />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-400 transition hover:bg-cyan-500 hover:text-white"
              >
                <FaLinkedin />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-400 transition hover:bg-cyan-500 hover:text-white"
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-14 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="text-cyan-400 font-semibold">
              Online Book Shop
            </span>
            . All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <Link
              to="/"
              className="text-gray-500 hover:text-cyan-400 transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/"
              className="text-gray-500 hover:text-cyan-400 transition"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
