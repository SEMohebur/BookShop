import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const BookList = () => {
  const [books, setBooks] = useState(null);
  const [book, setBook] = useState(null);

  // update states
  const [inStock, setInStock] = useState(true);
  const [isOnSale, setIsOnSale] = useState(false);
  const [language, setLanguage] = useState("");
  const [format, setFormat] = useState("");
  const [loading, setLoading] = useState(true);

  // get all books
  useEffect(() => {
    fetch("https://book-shop-server-delta.vercel.app/books")
      .then((res) => res.json())
      .then((book) => {
        setBooks(book);
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

  // update handler
  const handleSubmite = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;
    const publisher = e.target.publisher.value;
    const category = e.target.category.value;
    const price = e.target.price.value;
    const discountPrice = e.target.discountPrice.value;
    const stockQuantity = e.target.stockQuantity.value;
    const rating = e.target.rating.value;
    const totalReviews = e.target.totalReviews.value;
    const pages = e.target.pages.value;
    const coverImage = e.target.coverImage.value;
    const createdAt = e.target.createdAt.value;
    const description = e.target.description.value;
    const readingDay = e.target.readingDays.value;

    const updateBook = {
      title,
      author,
      publisher,
      category,
      language,
      price,
      discountPrice,
      stockQuantity,
      rating,
      totalReviews,
      pages,
      format,
      coverImage,
      createdAt,
      description,
      isOnSale,
      inStock,
      readingDay,
    };

    fetch(`https://book-shop-server-delta.vercel.app/books/${book._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateBook),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Book updated successfully",
          icon: "success",
          draggable: true,
        }).then(() => {
          e.target.reset();
          setBooks((prevBooks) =>
            prevBooks.map((b) =>
              b._id === book._id ? { ...b, ...updateBook } : b,
            ),
          );
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
        });
      });
    document.getElementById("my_modal_3").close();
  };

  const updateBtn = (_id) => {
    document.getElementById("my_modal_3").showModal();
    const filterdBook = books.find((book) => book._id === _id);
    setBook(filterdBook);

    setIsOnSale(filterdBook.isOnSale);
    setInStock(filterdBook.inStock);
    setLanguage(filterdBook.language || "");
    setFormat(filterdBook.format || "");
  };

  // delete handler
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22d3ee",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://book-shop-server-delta.vercel.app/books/${_id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to delete");
            return res.json();
          })
          .then(() => {
            setBooks((prevBooks) =>
              prevBooks.filter((book) => book._id !== _id),
            );
            Swal.fire("Deleted!", "The book has been deleted.", "success");
          })
          .catch((err) => {
            Swal.fire("Error!", err.message, "error");
          });
      }
    });
  };

  useEffect(() => {
    document.title = "Book List | My Book Shop";
  }, []);

  // AddBooks এর কমন ডিজাইন স্টাইল গাইডলাইনস
  const inputStyle =
    "w-full rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-slate-400 px-4 py-3 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500";
  const labelStyle = "text-sm text-slate-300 mb-1 block font-semibold";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-5xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.4)] p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-2xl shadow-xl">
            📖
          </div>
          <h2 className="text-4xl font-bold text-white mt-4">Book List</h2>
          <p className="text-slate-300 mt-2">
            Manage, update, or remove books from your store library.
          </p>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center my-10">
            <span className="loading loading-ring loading-lg text-cyan-400"></span>
          </div>
        )}

        {/* Book List Items */}
        <ul className="space-y-4">
          {books?.map((book) => (
            <li
              key={book._id}
              className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-white/10 bg-white/5 rounded-2xl hover:bg-white/10 transition duration-300"
            >
              <img
                src={
                  book.coverImage ||
                  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e"
                }
                alt={book.title}
                className="h-20 w-20 object-cover rounded-xl border border-white/20 shadow-md"
              />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-bold text-xl text-white">{book.title}</h3>
                <p className="text-cyan-400 text-sm font-medium mt-0.5">
                  {book.author}
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Category: {book.category} | Price: ৳{book.price}
                </p>
              </div>
              <div className="flex gap-3 mt-4 sm:mt-0">
                <button
                  onClick={() => updateBtn(book._id)}
                  className="px-4 py-2 text-sm font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition duration-300 cursor-pointer hover:scale-105"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-lg transition duration-300 cursor-pointer hover:scale-105"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* UPDATE MODAL */}
      <dialog id="my_modal_3" className="modal backdrop-blur-md">
        <div className="modal-box w-full max-w-5xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-white/20 rounded-3xl p-8 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-slate-400 hover:text-white transition">
              ✕
            </button>
          </form>

          <h2 className="text-center font-bold text-3xl text-white mb-8 tracking-wide">
            UPDATE BOOK DETAILS
          </h2>

          <form
            onSubmit={handleSubmite}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
          >
            {/* Book Title */}
            <div>
              <label className={labelStyle}>Book Title</label>
              <input
                type="text"
                name="title"
                defaultValue={book?.title || ""}
                placeholder="Enter book title"
                className={inputStyle}
                required
              />
            </div>

            {/* Author */}
            <div>
              <label className={labelStyle}>Author</label>
              <input
                type="text"
                name="author"
                defaultValue={book?.author || ""}
                placeholder="Enter author name"
                className={inputStyle}
                required
              />
            </div>

            {/* Publisher */}
            <div>
              <label className={labelStyle}>Publisher</label>
              <input
                type="text"
                name="publisher"
                defaultValue={book?.publisher || ""}
                placeholder="Enter publisher name"
                className={inputStyle}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className={labelStyle}>Category</label>
              <input
                type="text"
                name="category"
                defaultValue={book?.category || ""}
                placeholder="Enter book category"
                className={inputStyle}
                required
              />
            </div>

            {/* Language */}
            <div>
              <label className={labelStyle}>Language</label>
              <select
                name="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`${inputStyle} [&>option]:text-gray-900`}
                required
              >
                <option value="">Select language</option>
                <option value="English">English</option>
                <option value="Bangla">Bangla</option>
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
                <option value="German">German</option>
                <option value="Chinese">Chinese</option>
                <option value="Japanese">Japanese</option>
                <option value="Korean">Korean</option>
                <option value="Russian">Russian</option>
                <option value="Arabic">Arabic</option>
                <option value="Hindi">Hindi</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Italian">Italian</option>
                <option value="Turkish">Turkish</option>
                <option value="Dutch">Dutch</option>
                <option value="Swedish">Swedish</option>
                <option value="Norwegian">Norwegian</option>
                <option value="Finnish">Finnish</option>
                <option value="Greek">Greek</option>
                <option value="Urdu">Urdu</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className={labelStyle}>Price (৳)</label>
              <input
                type="number"
                name="price"
                defaultValue={book?.price || ""}
                placeholder="Enter book price"
                className={inputStyle}
                min="0"
                required
              />
            </div>

            {/* Discount Price */}
            <div>
              <label className={labelStyle}>Discount Price (৳)</label>
              <input
                type="number"
                name="discountPrice"
                defaultValue={book?.discountPrice || ""}
                placeholder="Enter discounted price"
                className={inputStyle}
                min="0"
              />
            </div>

            {/* Stock Quantity */}
            <div>
              <label className={labelStyle}>Stock Quantity</label>
              <input
                type="number"
                name="stockQuantity"
                defaultValue={book?.stockQuantity || ""}
                placeholder="Enter stock quantity"
                className={inputStyle}
                min="0"
                required
              />
            </div>

            {/* Rating */}
            <div>
              <label className={labelStyle}>Rating</label>
              <input
                type="number"
                name="rating"
                defaultValue={book?.rating || ""}
                placeholder="Enter book rating"
                className={inputStyle}
                min="0"
                max="5"
                step="0.1"
                required
              />
            </div>

            {/* Total Reviews */}
            <div>
              <label className={labelStyle}>Total Reviews</label>
              <input
                type="number"
                name="totalReviews"
                defaultValue={book?.totalReviews || ""}
                placeholder="Enter total reviews"
                className={inputStyle}
                min="0"
                required
              />
            </div>

            {/* Total Pages */}
            <div>
              <label className={labelStyle}>Total Pages</label>
              <input
                type="number"
                name="pages"
                defaultValue={book?.pages || ""}
                placeholder="Enter total pages"
                className={inputStyle}
                min="1"
                required
              />
            </div>

            {/* Reading Days */}
            <div>
              <label className={labelStyle}>Reading Days</label>
              <input
                type="number"
                name="readingDays"
                defaultValue={book?.readingDay || ""}
                placeholder="Enter Reading Days"
                className={inputStyle}
                min="1"
                required
              />
            </div>

            {/* Format */}
            <div>
              <label className={labelStyle}>Format</label>
              <select
                name="format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className={`${inputStyle} [&>option]:text-gray-900`}
                required
              >
                <option value="">Select format</option>
                <option value="Paperback">Paperback</option>
                <option value="Hardcover">Hardcover</option>
                <option value="Ebook">Ebook</option>
                <option value="Audiobook">Audiobook</option>
              </select>
            </div>

            {/* Cover Image URL */}
            <div>
              <label className={labelStyle}>Cover Image URL</label>
              <input
                type="text"
                name="coverImage"
                defaultValue={book?.coverImage || ""}
                placeholder="Enter image URL"
                className={inputStyle}
              />
            </div>

            {/* Created At */}
            <div>
              <label className={labelStyle}>Created At</label>
              <input
                type="date"
                name="createdAt"
                defaultValue={book?.createdAt || ""}
                className={`${inputStyle} [color-scheme:dark]`}
                required
              />
            </div>

            {/* Checkboxes full width */}
            <div className="flex gap-6 items-center mt-2 col-span-1 sm:col-span-2 lg:col-span-3 text-white">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="isOnSale"
                  checked={isOnSale}
                  onChange={(e) => setIsOnSale(e.target.checked)}
                  className="checkbox checkbox-info border-white/40"
                  disabled={!inStock}
                />
                <span className="text-sm font-medium">On Sale</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="checkbox checkbox-info border-white/40"
                />
                <span className="text-sm font-medium">In Stock</span>
              </label>
            </div>

            {/* Description full width */}
            <div className="flex flex-col gap-1 col-span-1 sm:col-span-2 lg:col-span-3">
              <label className={labelStyle}>Description</label>
              <textarea
                name="description"
                defaultValue={book?.description || ""}
                placeholder="Enter book description"
                className={inputStyle}
                rows={4}
              ></textarea>
            </div>

            {/* Submit button full width */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 mt-4">
              <button
                type="submit"
                className="w-full rounded-xl py-3 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.01] transition duration-300 shadow-lg hover:shadow-cyan-500/20"
              >
                Update Book
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default BookList;
