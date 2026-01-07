import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import Books from "./Books";

const MyBookList = () => {
  const { userInfo, setAddToCartCounter } = use(AuthContext);
  const [loading, setLoading] = useState(true);
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    if (userInfo?.email) {
      fetch(`http://localhost:3000/getAllCartItem?email=${userInfo.email}`)
        .then((res) => res.json())
        .then((data) => {
          setMyBooks(data);
          setLoading(false);
          setAddToCartCounter(data.length);
        })
        .catch((err) => console.log(err.message));
    }
  }, [userInfo]);

  const bookDelete = (id) => {
    fetch(`http://localhost:3000/myBook/${id}?email=${userInfo.email}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Book removed from cart",
          });
        }
        setMyBooks((prev) => prev.filter((book) => book._id !== id));
        setAddToCartCounter((prev) => prev - 1);
      })
      .catch((err) => console.log(err.message));
  };

  if (loading)
    return (
      <div className=" flex items-center justify-center pt-10">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );

  console.log(myBooks);
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8">My Books</h2>
      {myBooks.length === 0 && (
        <div className="flex justify-center items-center h-40">
          <p>Book Not Found</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {myBooks.map((book) => (
          <div
            key={book._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition relative"
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{book.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{book.author}</p>
              <p className="text-green-600 font-semibold mb-2">
                ৳{book.discountPrice}
                <span className="line-through text-gray-400 ml-2">
                  ৳{book.price}
                </span>
              </p>
              <p
                className={`text-sm font-medium mb-2 ${
                  book.status === "approved"
                    ? "text-green-600"
                    : book.status === "pending"
                    ? "text-yellow-500"
                    : "text-red-300"
                }`}
              >
                {book?.status}
              </p>
              <p className=" text-[10px] mb-2">
                {book?.approvedAt
                  ? `Approved at: ${new Date(book.approvedAt).toLocaleString()}`
                  : book?.rejectAt
                  ? `Rejected at: ${new Date(book.rejectAt).toLocaleString()}`
                  : ""}
              </p>
              <button
                className={`px-4 py-2 rounded ${
                  book.status === "approved"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={book.status !== "approved"}
              >
                Read Book
              </button>
            </div>

            {/* Delete button */}
            <button
              onClick={() => bookDelete(book._id)}
              className="absolute top-2 right-2 bg-red-400 text-white p-2 rounded-full hover:bg-red-700 transition"
              title="Remove from cart"
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookList;
