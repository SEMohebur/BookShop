import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const BookList = () => {
  const [books, setBooks] = useState(null);

  const [book, setBook] = useState(null);

  //   update
  const [inStock, setInStock] = useState(true);
  const [isOnSale, setIsOnSale] = useState(false);
  const [language, setLanguage] = useState("");
  const [format, setFormat] = useState("");
  const [loading, setLoading] = useState(true);
  // const [loading, setLoading] = useState(true);

  //   get all book
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

  //   console.log(books);

  //   update
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
    const format = e.target.format.value;
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
              b._id === book._id ? { ...b, ...updateBook } : b
            )
          );
        });
      })
      .catch((err) => {
        // console.log(err.message);
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
    // console.log(_id);

    const filterdBook = books.find((book) => {
      return book._id === _id;
    });
    setBook(filterdBook);

    setIsOnSale(filterdBook.isOnSale);
    setInStock(filterdBook.inStock);
    setLanguage(filterdBook.language || "");
    setFormat(filterdBook.format || "");
  };
  // console.log(book);

  // delete
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // DELETE request only after confirmation
        fetch(`https://book-shop-server-delta.vercel.app/books/${_id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to delete");
            return res.json();
          })
          .then(() => {
            // Optional: remove the deleted book from state
            setBooks((prevBooks) =>
              prevBooks.filter((book) => book._id !== _id)
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

  // if (!book) return <p>Loading</p>;

  return (
    <div className=" w-11/12 mx-auto py-8">
      <h3 className=" font-bold text-3xl text-center pb-5">Book List </h3>
      <ul className="space-y-3">
        {loading && (
          <div className=" flex justify-center">
            <span className="loading loading-ring loading-xl"></span>
          </div>
        )}
        {books?.map((book) => (
          <li
            key={book._id}
            className="flex items-center gap-4 p-2 shadow rounded-md hover:shadow-lg transition"
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="h-16 w-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{book.title}</h3>
              <p className="text-gray-500 text-sm">{book.author}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => updateBtn(book._id)}
                className=" text-gray-700 px-3 py-1 bg-yellow-100 rounded shadow-sm transition duration-300 cursor-pointer hover:shadow-2xl"
              >
                Update
              </button>

              <button
                onClick={() => handleDelete(book._id)}
                className=" text-gray-700 px-3 py-1 bg-red-200 rounded shadow-sm transition duration-300 cursor-pointer hover:shadow-2xl"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* modal  */}
      <dialog id="my_modal_3" className="modal ">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h2 className=" text-center font-bold text-3xl  text-base-400 mb-4 ">
            {" "}
            UPDATE
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
                defaultValue={book?.title || ""}
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
                defaultValue={book?.author || ""}
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
                defaultValue={book?.publisher || ""}
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
                defaultValue={book?.category || ""}
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
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
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
                defaultValue={book?.price || ""}
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
                defaultValue={book?.discountPrice || ""}
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
                defaultValue={book?.stockQuantity || ""}
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
                defaultValue={book?.rating || ""}
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
                defaultValue={book?.totalReviews || ""}
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
                defaultValue={book?.pages || ""}
                placeholder="Enter total pages"
                className="input input-bordered w-full"
                min="1"
                required
              />
            </div>

            {/* "readingDays": 3 */}
            {/* readingDays */}
            <div className="flex flex-col gap-1">
              <label className="label font-semibold">Reading Days</label>
              <input
                type="number"
                name="readingDays"
                defaultValue={book?.readingDay || ""}
                placeholder="Enter Reading Days"
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
                value={format}
                onChange={(e) => setFormat(e.target.value)}
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
                defaultValue={book?.coverImage || ""}
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
                defaultValue={book?.createdAt || ""}
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
                defaultValue={book?.description || ""}
                placeholder="Enter book description"
                className="textarea textarea-bordered w-full"
                rows={4}
              ></textarea>
            </div>

            {/* Submit button full width */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 mt-4">
              <button type="submit" className="btn btn-primary w-full">
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
