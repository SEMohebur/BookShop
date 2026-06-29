import React, { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  FaStarHalfAlt,
  FaBook,
  FaGlobe,
  FaLayerGroup,
  FaBuilding,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthContext";

const Details = () => {
  const { userInfo, setAddToCartCounter } = use(AuthContext);
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://book-shop-server-delta.vercel.app/books/${id}`)
      .then((res) => res.json())
      .then((book) => {
        setBook(book);
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
        });
      });
  }, []);

  const addToCartPost = () => {
    const { _id, ...rest } = book;

    const payload = {
      ...rest,
      userEmail: userInfo?.email,
      status: "pending",
      requestedDate: new Date(),
    };

    if (userInfo?.email) {
      fetch("https://book-shop-server-delta.vercel.app/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then(() => {
          Swal.fire({
            title: "Added to Cart!",
            text: "This book has been added to your cart.",
            icon: "success",
            confirmButtonText: "OK",
          });
          setAddToCartCounter((prev) => prev + 1);
          navigate("/myBookList");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Failed to Add",
            text: err.message,
          });
        });
    } else {
      navigate("/login");
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "You need to login to add items to the cart.",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    document.title = "Details | My Book Shop";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-5xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.4)] p-6 md:p-10">
        {/* Back Button */}
        <Link
          to="/books"
          className="text-cyan-400 hover:text-cyan-300 mb-8 inline-flex items-center gap-2 text-sm font-semibold transition"
        >
          ← Back to Books
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Book Image */}
          <div className="flex justify-center w-full">
            <div className="relative group p-4 border border-white/10 bg-white/5 rounded-2xl">
              <img
                src={
                  book?.coverImage ||
                  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e"
                }
                alt={book?.title}
                className="w-full max-w-sm rounded-xl shadow-2xl object-cover transition duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Book Info */}
          <div className="flex flex-col h-full justify-center">
            {/* Category Tag */}
            <div className="mb-4">
              <span className="inline-block bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-4 py-1 rounded-full text-xs font-bold capitalize">
                {book?.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 leading-tight">
              {book?.title}
            </h1>
            <p className="text-slate-300 text-base mb-4 font-medium">
              by{" "}
              <span className="text-cyan-400 font-semibold">
                {book?.author}
              </span>
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5 bg-white/5 w-fit px-3 py-1 rounded-xl border border-white/5">
              <FaStarHalfAlt className="text-amber-400" />
              <span className="text-amber-400 font-bold text-sm">
                {" "}
                {book?.rating}
              </span>
              <span className="text-slate-400 text-xs">
                ({book?.totalReviews || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-5 flex items-baseline gap-3">
              <span className="text-3xl font-black text-emerald-400">
                ৳{book?.discountPrice}
              </span>
              <span className="line-through text-slate-500 text-sm font-medium">
                ৳{book?.price}
              </span>
            </div>

            {/* Stock */}
            <div className="mb-6">
              <span
                className={`inline-block px-3 py-1 text-xs font-bold rounded-lg
                  ${
                    book?.inStock
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  }`}
              >
                •{" "}
                {book?.inStock
                  ? `In Stock (${book?.stockQuantity} available)`
                  : "Out of Stock"}
              </span>
            </div>

            <hr className="border-white/10 mb-6" />

            {/* Meta Info Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs text-slate-300 mb-8 bg-white/5 p-4 rounded-2xl border border-white/5">
              <p className="flex items-center gap-2">
                <FaGlobe className="text-slate-500 text-sm" />
                <span>
                  <strong className="text-slate-400">Language:</strong>{" "}
                  {book?.language}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <FaLayerGroup className="text-slate-500 text-sm" />
                <span>
                  <strong className="text-slate-400">Pages:</strong>{" "}
                  {book?.pages}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <FaBook className="text-slate-500 text-sm" />
                <span>
                  <strong className="text-slate-400">Format:</strong>{" "}
                  {book?.format}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <FaBuilding className="text-slate-500 text-sm" />
                <span>
                  <strong className="text-slate-400">Publisher:</strong>{" "}
                  {book?.publisher}
                </span>
              </p>
              <p className="flex items-center gap-2 col-span-2">
                <FaClock className="text-cyan-400 text-sm" />
                <span>
                  <strong className="text-cyan-400">Reading days:</strong>{" "}
                  {book?.readingDay} Days
                </span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={addToCartPost}
                className="flex-1 md:flex-none px-8 py-3 text-sm font-bold text-slate-900 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 rounded-xl shadow-lg transition duration-300 hover:scale-105 active:scale-95"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            📖 Book Description
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-line bg-white/5 p-5 rounded-2xl border border-white/5">
            {book?.description || "No description available for this book."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
