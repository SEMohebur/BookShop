import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { FaTrashAlt, FaBookOpen } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyBookList = () => {
  const { userInfo, setAddToCartCounter } = use(AuthContext);
  const [loading, setLoading] = useState(true);
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    if (userInfo?.email) {
      fetch(
        `https://book-shop-server-delta.vercel.app/getAllCartItem?email=${userInfo.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setMyBooks(data);
          setLoading(false);
          setAddToCartCounter(data.length);
        })
        .catch((err) =>
          Swal.fire({
            title: "Error!",
            text: err.message,
            icon: "error",
          }),
        );
    } else {
      setLoading(false);
    }
  }, [userInfo]);

  const bookDelete = (id) => {
    fetch(
      `https://book-shop-server-delta.vercel.app/myBook/${id}?email=${userInfo.email}`,
      {
        method: "DELETE",
      },
    )
      .then((res) => res.json())
      .then((data) => {
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
      .catch((err) =>
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
        }),
      );
  };

  // book notifications
  useEffect(() => {
    if (!myBooks || myBooks.length === 0) return;

    myBooks.forEach((book) => {
      if (!book?.approvedAt || !book?.readingDay) return;

      const buyDate = new Date(book.approvedAt);
      const allowedDays = Number(book.readingDay);
      const expiryDate = new Date(buyDate);
      expiryDate.setDate(expiryDate.getDate() + allowedDays);

      const today = new Date();
      const diffTime = expiryDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 3 && diffDays > 1) {
        Swal.fire({
          title: "Book Reminder!",
          text: `Bhaiya, apnar book er ar ${diffDays} din somoy ache.`,
          icon: "info",
          timer: 4000,
          showConfirmButton: false,
        });
      }

      if (diffDays === 1) {
        Swal.fire({
          title: "Book Almost Expired!",
          text: `Bhaiya, apnar book er ar 1 din somoy baki!`,
          icon: "warning",
          timer: 4000,
          showConfirmButton: false,
        });
      }

      if (diffDays <= 0) {
        Swal.fire({
          title: "Book Expired!",
          text: "Apnar book er somoy shesh hoye geche.",
          icon: "error",
          timer: 4000,
          showConfirmButton: false,
        });
      }
    });
  }, [myBooks]);

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center">
        <span className="loading loading-ring loading-lg text-cyan-400"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-7xl rounded-3xl border border-white/20 bg-white/10 p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-xl text-white shadow-xl">
            <FaBookOpen />
          </div>
          <h2 className="text-4xl font-bold text-white mt-4">My Books</h2>
          <p className="text-slate-300 mt-2">
            Manage your personal collection, check approval statuses, and track
            your remaining reading time.
          </p>
        </div>

        {/* Empty State */}
        {myBooks.length === 0 && (
          <p className="text-center text-slate-400 my-10 text-lg">
            Book Not Found
          </p>
        )}

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myBooks.map((book) => {
            // book remaining date count
            const buyDate = new Date(book?.approvedAt);
            const allowedDays = Number(book?.readingDay);

            const expiryDate = new Date(buyDate);
            expiryDate.setDate(buyDate?.getDate() + allowedDays);

            // কত দিন বাকি
            const today = new Date(); // আজকের date
            const diffTime = expiryDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return (
              <div
                key={book._id}
                className="flex flex-col justify-between border border-white/10 bg-white/5 rounded-2xl hover:bg-white/10 transition duration-300 relative overflow-hidden group shadow-lg"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={
                        book.coverImage ||
                        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e"
                      }
                      alt={book.title}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  </div>

                  {/* Info Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-white line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-cyan-400 text-sm font-medium mt-0.5">
                      {book.author}
                    </p>

                    {/* Price Tag */}
                    <p className="text-emerald-400 font-bold mt-2 text-base">
                      ৳{book.discountPrice}
                      <span className="line-through text-slate-500 text-xs ml-2 font-normal">
                        ৳{book.price}
                      </span>
                    </p>

                    {/* Status Badge */}
                    <div className="mt-3">
                      <span
                        className={`inline-block px-3 py-0.5 text-xs font-semibold rounded-full capitalize shadow-sm
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

                    {/* Dates Info */}
                    <p className="text-slate-400 text-[10px] mt-3 bg-white/5 p-1.5 rounded-lg border border-white/5">
                      {book?.approvedAt
                        ? `Approved at: ${new Date(book.approvedAt).toLocaleString()}`
                        : book?.rejectAt
                          ? `Rejected at: ${new Date(book.rejectAt).toLocaleString()}`
                          : "Status: Awaiting Action"}
                    </p>
                  </div>
                </div>

                {/* Footer Actions & Remaining Time */}
                <div className="p-4 pt-0 mt-auto">
                  <div className="flex flex-col gap-2 mt-2">
                    <Link
                      to={
                        book.status === "approved" && diffDays > 0
                          ? "https://www.w3schools.com/"
                          : "#"
                      }
                      onClick={(e) => {
                        if (book.status !== "approved" || diffDays <= 0) {
                          e.preventDefault();
                        }
                      }}
                      className={`w-full text-center py-2 rounded-xl text-sm font-bold shadow-md transition duration-300 hover:scale-[1.02]
                        ${
                          book.status === "approved" && diffDays > 0
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500"
                            : "bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5"
                        }`}
                    >
                      Read Book
                    </Link>

                    <p
                      className={`text-[10px] text-center font-medium ${diffDays > 0 ? "text-cyan-400/80" : "text-rose-400/80"}`}
                    >
                      {diffDays > 0
                        ? `⏰ Remaining days: ${diffDays}`
                        : "❌ Book expired / Disabled"}
                    </p>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => bookDelete(book._id)}
                  className="absolute top-2 right-2 bg-rose-600/80 text-white p-2 rounded-xl hover:bg-rose-500 backdrop-blur-md border border-white/10 shadow-md transition duration-300 hover:scale-110"
                  title="Remove from cart"
                >
                  <FaTrashAlt className="text-xs" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyBookList;
