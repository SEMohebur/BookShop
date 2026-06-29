import React from "react";
import { FaStarHalfAlt } from "react-icons/fa";
import { Link } from "react-router";

const BookCard = ({ book }) => {
  // console.log(book);
  return (
    <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg transition-all duration-500 hover:-translate-y-3 hover:border-cyan-500/40 hover:shadow-cyan-500/20">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

        {/* Sale Badge */}
        {book.isOnSale && (
          <div className="absolute left-4 top-4 rounded-full bg-red-500 px-4 py-1 text-xs font-bold text-white shadow-lg">
            SALE
          </div>
        )}

        {/* Rating */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 backdrop-blur-md">
          <FaStarHalfAlt className="text-yellow-400" />

          <span className="text-sm font-semibold text-white">
            {book.rating}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="line-clamp-1 text-2xl font-bold text-white">
          {book.title}
        </h2>

        <p className="mt-2 text-cyan-400 font-medium">by {book.author}</p>

        <p className="mt-4 line-clamp-3 text-sm leading-7 text-gray-400">
          {book.description}
        </p>

        {/* Price */}
        <div className="mt-6 flex items-center justify-between">
          <div>
            {book.isOnSale && (
              <span className="mr-3 text-2xl font-bold text-red-400">
                ${book.discountPrice}
              </span>
            )}

            <span
              className={`text-xl font-bold ${
                book.isOnSale ? "line-through text-gray-500" : "text-white"
              }`}
            >
              ${book.price}
            </span>
          </div>

          <span className="text-sm text-gray-400">
            ({book.totalReviews} Reviews)
          </span>
        </div>

        {/* Button */}
        <Link
          to={`/detaile/${book._id}`}
          className="mt-7 flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white transition duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-cyan-500/30"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
