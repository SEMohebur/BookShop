import React from "react";
import { FaStarHalfAlt } from "react-icons/fa";
import { Link } from "react-router";

const BookCard = ({ book }) => {
  // console.log(book);
  return (
    <div className=" w-auto bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-2 hover:scale-102 transition-all duration-300">
      <img
        src={book.coverImage}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800">{book.title}</h2>
        <p className="text-gray-600 mt-1">by {book.author}</p>
        <p className="text-gray-500 mt-2 text-sm">
          {book.description.slice(0, 100)}...
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div>
            {book.isOnSale && (
              <span className="text-red-500 font-semibold mr-2">
                ${book.discountPrice}
              </span>
            )}
            <span
              className={`text-gray-800 font-bold ${
                book.isOnSale ? "line-through text-gray-400" : ""
              }`}
            >
              ${book.price}
            </span>
          </div>
          <div className="text-yellow-500 font-semibold flex items-center gap-1">
            <FaStarHalfAlt />{" "}
            <div>
              {book.rating} ({book.totalReviews})
            </div>
          </div>
        </div>

        <Link
          to={`/detaile/${book._id}`}
          className="btn mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
