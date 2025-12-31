import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { FaStarHalfAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Details = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/books/${id}`)
      .then((res) => res.json())
      .then((book) => {
        setBook(book);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  console.log(book);

  const addToCart = () => {
    Swal.fire({
      title: "Added to Cart!",
      text: "This book has been added to your cart.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const addToWishlist = () => {
    Swal.fire({
      title: "Added to Wishlist!",
      text: "This book has been added to your wishlist.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link
        to="/books"
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        ← Back to Books
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Book Image */}
        <div className="flex justify-center">
          <img
            src={book?.coverImage}
            alt={book?.title}
            className="w-full max-w-sm rounded-xl shadow-lg"
          />
        </div>

        {/* Book Info */}
        <div>
          <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mb-3">
            {book?.category}
          </span>

          <h1 className="text-3xl font-bold mb-2">{book?.title}</h1>
          <p className="text-gray-600 mb-4">
            by <span className="font-medium">{book?.author}</span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <FaStarHalfAlt className=" text-warning" />
            <span className="text-yellow-500 text-lg"> {book?.rating}</span>
            <span className="text-gray-500 text-sm">
              ({book?.totalReviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-4">
            <span className="text-2xl font-bold text-green-600">
              ৳{book?.discountPrice}
            </span>
            <span className="line-through text-gray-400 ml-3">
              ৳{book?.price}
            </span>
          </div>

          {/* Stock */}
          <p
            className={`mb-4 font-medium ${
              book?.inStock ? "text-green-600" : "text-red-600"
            }`}
          >
            {book?.inStock
              ? `In Stock (${book?.stockQuantity} available)`
              : "Out of Stock"}
          </p>

          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
            <p>
              <strong>Language:</strong> {book?.language}
            </p>
            <p>
              <strong>Pages:</strong> {book?.pages}
            </p>
            <p>
              <strong>Format:</strong> {book?.format}
            </p>
            <p>
              <strong>Publisher:</strong> {book?.publisher}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={addToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Add to Cart
            </button>
            <button
              onClick={addToWishlist}
              className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Book Description</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {book?.description}
        </p>
      </div>
    </div>
  );
};

export default Details;
