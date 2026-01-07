import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const BookRequestList = () => {
  const [allRequestBook, setAllRequestBook] = useState([]);

  useEffect(() => {
    fetch("https://book-shop-server-delta.vercel.app/requestAllBook")
      .then((res) => res.json())
      .then((data) => {
        setAllRequestBook(data);
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
        });
      });
  }, []);

  const handleApprove = (id) => {
    fetch(`https://book-shop-server-delta.vercel.app/approveBook/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => {
        setAllRequestBook((prev) =>
          prev.map((book) => {
            return book._id === id ? { ...book, status: "approved" } : book;
          })
        );
      });
  };

  const handleReject = (id) => {
    fetch(`https://book-shop-server-delta.vercel.app/rejectBook/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => {
        setAllRequestBook((prev) =>
          prev.map((book) => {
            return book._id === id ? { ...book, status: "reject" } : book;
          })
        );
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Book Request List</h2>

      {allRequestBook?.length === 0 && (
        <p className="text-center text-gray-500">No requests found</p>
      )}

      <ul className="space-y-3">
        {allRequestBook?.map((book) => (
          <li
            key={book?._id}
            className="flex items-center gap-4 p-3 shadow rounded-md bg-white hover:shadow-lg transition"
          >
            {/* Image */}
            <img
              src={book?.coverImage}
              alt={book?.title}
              className="h-16 w-16 object-cover rounded"
            />

            {/* Info */}
            <div className="flex-1">
              <h3 className="font-semibold">{book?.title}</h3>
              <p className="text-sm text-gray-500">{book?.author}</p>
              <p className="text-xs text-gray-400 ">
                Requested by: {book?.userEmail}
              </p>
              <p className=" text-xs">
                Requested Date : {new Date(book.requestedDate).toLocaleString()}
              </p>

              {/* Status badge */}
              <span
                className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full
                  ${
                    book?.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : book?.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
              >
                {book?.status}
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-2">
              <button
                disabled={book?.status !== "pending"}
                onClick={() => handleApprove(book?._id)}
                className="px-3 py-1 bg-green-200 text-gray-700 rounded hover:shadow disabled:opacity-40 cursor-pointer"
              >
                Approve
              </button>

              <button
                disabled={book?.status !== "pending"}
                onClick={() => handleReject(book._id)}
                className="px-3 py-1 bg-red-200 text-gray-700 rounded hover:shadow disabled:opacity-40 cursor-pointer"
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookRequestList;
