import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const BookRequestList = () => {
  const [allRequestBook, setAllRequestBook] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://book-shop-server-delta.vercel.app/requestAllBook")
      .then((res) => res.json())
      .then((data) => {
        setAllRequestBook(data);
        setLoading(false);
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
        Swal.fire({
          title: "Approved!",
          text: "The book request has been approved.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        setAllRequestBook((prev) =>
          prev.map((book) => {
            return book._id === id ? { ...book, status: "approved" } : book;
          }),
        );
      });
  };

  const handleReject = (id) => {
    fetch(`https://book-shop-server-delta.vercel.app/rejectBook/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Rejected!",
          text: "The book request has been rejected.",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
        setAllRequestBook((prev) =>
          prev.map((book) => {
            return book._id === id ? { ...book, status: "reject" } : book;
          }),
        );
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-5xl rounded-3xl border border-white/20 bg-white/10  p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-2xl shadow-xl">
            📨
          </div>
          <h2 className="text-4xl font-bold text-white mt-4">
            Book Request List
          </h2>
          <p className="text-slate-300 mt-2">
            Review, approve, or decline custom book requests submitted by users.
          </p>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center my-10">
            <span className="loading loading-ring loading-lg text-cyan-400"></span>
          </div>
        ) : (
          allRequestBook?.length === 0 && (
            <p className="text-center text-slate-400 my-10 text-lg">
              No requests found
            </p>
          )
        )}

        {/* Request List Items */}
        <ul className="space-y-4">
          {allRequestBook?.map((book) => (
            <li
              key={book?._id}
              className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-white/10 bg-white/5 rounded-2xl hover:bg-white/10 transition duration-300"
            >
              {/* Image */}
              <img
                src={
                  book?.coverImage ||
                  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e"
                }
                alt={book?.title}
                className="h-20 w-20 object-cover rounded-xl border border-white/20 shadow-md"
              />

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-bold text-xl text-white">{book?.title}</h3>
                <p className="text-cyan-400 text-sm font-medium mt-0.5">
                  {book?.author}
                </p>

                <div className="mt-2 space-y-0.5">
                  <p className="text-slate-400 text-xs">
                    <span className="text-slate-500 font-semibold">
                      Requested by:
                    </span>{" "}
                    {book?.userEmail}
                  </p>
                  <p className="text-slate-400 text-xs">
                    <span className="text-slate-500 font-semibold">
                      Requested Date:
                    </span>{" "}
                    {book?.requestedDate
                      ? new Date(book.requestedDate).toLocaleString()
                      : "N/A"}
                  </p>
                </div>

                {/* Status badge */}
                <div className="mt-3">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full capitalize shadow-sm
                      ${
                        book?.status === "pending"
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : book?.status === "approved"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                      }`}
                  >
                    • {book?.status}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-row sm:flex-col gap-3 mt-4 sm:mt-0 w-full sm:w-auto justify-center">
                <button
                  disabled={book?.status !== "pending"}
                  onClick={() => handleApprove(book?._id)}
                  className="flex-1 sm:flex-none px-4 py-2 text-sm font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 disabled:bg-slate-800 disabled:text-slate-600 disabled:border-white/5 border border-transparent rounded-xl shadow-lg transition duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 hover:scale-105"
                >
                  Approve
                </button>

                <button
                  disabled={book?.status !== "pending"}
                  onClick={() => handleReject(book._id)}
                  className="flex-1 sm:flex-none px-4 py-2 text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:border-white/5 border border-transparent rounded-xl shadow-lg transition duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 hover:scale-105"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookRequestList;
