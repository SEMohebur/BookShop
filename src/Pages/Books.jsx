import React, { useEffect, useState } from "react";
import BookCard from "../Component/BookCard";
import Swal from "sweetalert2";

const Books = () => {
  const [books, setBooks] = useState(null);
  const [value, setvalue] = useState("");
  const [categorys, setCategorys] = useState(null);

  const [filterBooks, setFilterBook] = useState([]);
  const [loading, setLoading] = useState(true);

  const [onFocused, setOnFocused] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://book-shop-server-delta.vercel.app/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setFilterBook(data);
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

  // console.log(books);

  // uniq category filter
  useEffect(() => {
    if (books) {
      const uniqueCategories = Array.from(
        new Set(books.map((b) => b.category)),
      );
      setCategorys(uniqueCategories);
    }
  }, [books]);
  // console.log(categorys);

  // inpute value get and set useStae
  const onChangeInpute = (e) => {
    setvalue(e.target.value);
  };

  // search select and search normal
  const onSearch = (searchTearm) => {
    const filter = books.filter((book) => {
      return (
        book.title.toLowerCase().includes(searchTearm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTearm.toLowerCase()) ||
        book.publisher.toLowerCase().includes(searchTearm.toLowerCase())
      );
    });
    setFilterBook(filter);
  };

  // select search
  const selectSearch = (searchTearm) => {
    if (searchTearm == "All") {
      return setFilterBook(books);
    } else {
      const filterData = books.filter((book) => {
        return book.category.toLowerCase() === searchTearm.toLowerCase();
      });
      setFilterBook(filterData);
    }
  };

  useEffect(() => {
    document.title = "Books | My Book Shop";
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-medium">
            📚 Explore Collection
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-white">
            Discover Books
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            Browse thousands of books from different categories and discover
            your next favorite read.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 mb-10">
          <div className="grid lg:grid-cols-4 gap-6 items-end">
            {/* Search */}
            <div className="lg:col-span-3 relative">
              <label className="block text-gray-300 mb-2 font-medium">
                Search Books
              </label>

              <div className="flex gap-3">
                <input
                  type="text"
                  onChange={onChangeInpute}
                  onFocus={() => setOnFocused(true)}
                  onBlur={() => setOnFocused(false)}
                  placeholder="Search by title, author or publisher..."
                  className="flex-1 rounded-xl border border-white/10 bg-slate-900/80 px-5 py-3 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none"
                />

                <button
                  onClick={() => onSearch(value)}
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 text-white font-semibold hover:scale-105 transition"
                >
                  Search
                </button>
              </div>

              {/* Suggestions */}
              {onFocused && value && (
                <div className="absolute mt-3 w-full rounded-2xl border border-white/10 bg-slate-900 shadow-2xl max-h-56 overflow-y-auto z-50">
                  {books?.map((book, i) => (
                    <div
                      key={i}
                      onMouseDown={() => {
                        onSearch(book.title);
                        setOnFocused(false);
                      }}
                      className="cursor-pointer px-5 py-3 text-gray-300 hover:bg-cyan-500 hover:text-white transition"
                    >
                      {book.title}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                Category
              </label>

              <select
                id="category"
                defaultValue=""
                onChange={(e) => selectSearch(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white focus:border-cyan-500 outline-none"
              >
                <option value="" disabled>
                  Choose Category
                </option>

                <option value="All">All</option>

                {categorys?.map((category, i) => (
                  <option key={i} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-ring loading-xl text-cyan-400"></span>
          </div>
        ) : filterBooks.length < 1 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl py-20 flex flex-col items-center">
            <img
              className="w-72 opacity-80"
              src="https://unsplash-assets.imgix.net/empty-states/photos.png?auto=format&fit=crop&q=60"
              alt=""
            />

            <h3 className="mt-6 text-2xl font-bold text-white">
              No Books Found
            </h3>

            <p className="mt-2 text-gray-400">
              Try another keyword or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filterBooks.map((book, i) => (
              <div
                key={i}
                className="transition duration-500 hover:-translate-y-2"
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
