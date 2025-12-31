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
    };
    fetch("https://book-shop-server-delta.vercel.app/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
        console.log(err.message);
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
  return (
    <div className="w-11/12 mx-auto ">
      <div className=" p-8 ">
        <div className=" p-4 shadow rounded-2xl">
          <h2 className=" text-center font-bold text-3xl text-gray-800 mb-4 ">
            {" "}
            Add New Book{" "}
          </h2>

          <form
            onSubmit={handleSubmite}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Book Title */}
            <div className="flex flex-col gap-1">
              <label className="label font-semibold">Book Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter book title"
                className="input w-full"
                required
              />
            </div>

            {/* Author */}
            <div className="flex flex-col gap-1">
              <label className="label font-semibold">Author</label>
              <input
                type="text"
                name="author"
                placeholder="Enter author name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Publisher */}
            <div className="flex flex-col gap-1">
              <label className="label font-semibold">Publisher</label>
              <input
                type="text"
                name="publisher"
                placeholder="Enter publisher name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1">
              <label className="label font-semibold">Category</label>
              <input
                type="text"
                name="category"
                placeholder="Enter book category"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Language */}
            <div className="flex flex-col gap-1">
              <label className="label font-semibold">Language</label>
              <select
                name="language"
                className="select select-bordered w-full"
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
            <div className="flex flex-col gap-1">
              <label className="label font-semibold">Price (৳)</label>
              <input
                type="number"
                name="price"
                placeholder="Enter book price"
                className="input input-bordered w-full"
                min="0"
                required
              />
            </div>

            {/* Discount Price */}
            <div className="flex flex-col gap-1">
              <label className="label font-semibold">Discount Price (৳)</label>
              <input
                type="number"
                name="discountPrice"
                placeholder="Enter discounted price"
                className="input input-bordered w-full"
                min="0"
              />
            </div>

            {/* Stock Quantity */}
            <div className="flex flex-col gap-1">
              <label className="label font-semibold">Stock Quantity</label>
              <input
                type="number"
                name="stockQuantity"
                placeholder="Enter stock quantity"
                className="input input-bordered w-full"
                min="0"
                required
              />
            </div>

            {/* Rating */}
            <div className="flex flex-col gap-1">
              <label className="label font-semibold">Rating</label>
              <input
                type="number"
                name="rating"
                placeholder="Enter book rating"
                className="input input-bordered w-full"
                min="0"
                max="5"
                step="0.1"
                required
              />
            </div>

            {/* Total Reviews */}
            <div className="flex flex-col gap-1">
              <label className="label font-semibold">Total Reviews</label>
              <input
                type="number"
                name="totalReviews"
                placeholder="Enter total reviews"
                className="input input-bordered w-full"
                min="0"
                required
              />
            </div>

            {/* Total Pages */}
            <div className="flex flex-col gap-1">
              <label className="label font-semibold">Total Pages</label>
              <input
                type="number"
                name="pages"
                placeholder="Enter total pages"
                className="input input-bordered w-full"
                min="1"
                required
              />
            </div>

            {/* Format */}
            <div className="flex flex-col gap-1">
              <label className="label font-semibold">Format</label>
              <select
                name="format"
                className="select select-bordered w-full"
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
            <div className="flex flex-col gap-1">
              <label className="label font-semibold">Cover Image URL</label>
              <input
                type="text"
                name="coverImage"
                placeholder="Enter image URL"
                className="input input-bordered w-full"
              />
            </div>

            {/* Created At */}
            <div className="flex flex-col gap-1">
              <label className="label font-semibold">Created At</label>
              <input
                type="date"
                name="createdAt"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Checkboxes full width */}
            <div className="flex gap-6 items-center mt-2 col-span-1 sm:col-span-2 lg:col-span-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isOnSale"
                  checked={isOnSale}
                  onChange={(e) => setIsOnSale(e.target.checked)}
                  className="checkbox"
                  disabled={!inStock}
                />
                On Sale
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="checkbox"
                />
                In Stock
              </label>
            </div>

            {/* Description full width */}
            <div className="flex flex-col gap-1 col-span-1 sm:col-span-2 lg:col-span-3">
              <label className="label font-semibold">Description</label>
              <textarea
                name="description"
                placeholder="Enter book description"
                className="textarea textarea-bordered w-full"
                rows={4}
              ></textarea>
            </div>

            {/* Submit button full width */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 mt-4">
              <button type="submit" className="btn btn-primary w-full">
                Save Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBooks;
