import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const AddBooks = () => {
  const [inStock, setInStock] = useState(true);
  const [isOnSale, setIsOnSale] = useState(false);

  const navigate = useNavigate();

  const handleSubmite = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;
    const publisher = e.target.publisher.value;
    const category = e.target.category.value;
    const language = e.target.language.value;
    const price = e.target.price.value;
    const discountPrice = e.target.discountPrice.value;
    const stockQuantity = e.target.stockQuantity.value;
    const rating = e.target.rating.value;
    const totalReviews = e.target.totalReviews.value;
    const pages = e.target.pages.value;
    const format = e.target.format.value;
    const coverImage = e.target.coverImage.value;
    const createdAt = e.target.createdAt.value;
    const description = e.target.description.value;
    const readingDay = e.target.readingDays.value;

    const newBook = {
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
    fetch("https://book-shop-server-delta.vercel.app/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Book added successfully",
          icon: "success",
          draggable: true,
        }).then(() => {
          e.target.reset();
          navigate("/books");
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
        });
      });
  };

  useEffect(() => {
    document.title = "Add Books | My Book Shop";
  }, []);

  // কমন ইনপুট স্টাইল যা রেজিষ্টার ফর্মে ব্যবহার করা হয়েছে
  const inputStyle =
    "w-full rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-slate-400 px-4 py-3 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500";
  const labelStyle = "text-sm text-slate-300 mb-1 block font-semibold";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-5xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.4)] p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-2xl shadow-xl">
            📚
          </div>
          <h2 className="text-4xl font-bold text-white mt-4">Add New Book</h2>
          <p className="text-slate-300 mt-2">
            Fill up the details to expand your store library.
          </p>
        </div>

        <form
          onSubmit={handleSubmite}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Book Title */}
          <div>
            <label className={labelStyle}>Book Title</label>
            <input
              type="text"
              name="title"
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
              className={`${inputStyle} [&>option]:text-gray-900`}
              required
            >
              <option value="" className="text-slate-400">
                Select language
              </option>
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
              Save Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBooks;
