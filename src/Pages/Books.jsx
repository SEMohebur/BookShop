import React, { useEffect, useState } from "react";
import BookCard from "../Component/BookCard";

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
      .catch((err) => console.log(err.message));
  }, []);

  // console.log(books);

  // uniq category filter
  useEffect(() => {
    if (books) {
      const uniqueCategories = Array.from(
        new Set(books.map((b) => b.category))
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
    <div className=" w-11/12 mx-auto py-8">
      <div>
        <h2 className=" text-3xl font-bold text-gray-800 text-center  mb-4">
          Books
        </h2>
        {/* search filtering  */}
        <div className=" py-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full mb-4">
            <input
              type="text"
              onChange={onChangeInpute}
              onFocus={() => setOnFocused(true)}
              onBlur={() => setOnFocused(false)}
              placeholder="Search by title, author, or publisher"
              className="border border-gray-300 p-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={() => onSearch(value)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              Search
            </button>
          </div>
          {onFocused && value && (
            <div className=" dropdown h-20 border border-gray-300 rounded-md px-1 w-full overflow-y-auto ">
              {books?.map((book, i) => {
                return (
                  <ul key={i} className=" dropdown-row">
                    <li
                      onMouseDown={() => {
                        onSearch(book.title);
                        setOnFocused(false);
                      }}
                      className=" text-gray-500 hover:bg-indigo-500 hover:text-white duration-200 rounded"
                    >
                      {book.title}
                    </li>
                  </ul>
                );
              })}
            </div>
          )}
        </div>
        {/* select filtering */}
        <div className="w-full sm:w-64 mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-medium mb-2"
          >
            Select Category
          </label>
          <select
            id="category"
            onChange={(e) => selectSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            defaultValue=""
          >
            <option value="" disabled>
              Choose a category
            </option>

            <option value="All">All</option>
            {categorys &&
              categorys.map((category, i) => {
                return (
                  <option key={i} value={category}>
                    {category}
                  </option>
                );
              })}
          </select>
        </div>
        {/* loading  */}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="flex flex-col items-center gap-4">
              <span className="loading loading-ring loading-xl"></span>{" "}
            </div>
          </div>
        )}
        {/* book card  */}
        <div className=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-center">
          {filterBooks?.map((book, i) => {
            return <BookCard book={book} key={i} />;
          })}
        </div>
        <div>
          {filterBooks.length < 1 && (
            <div className=" flex justify-center items-center">
              <img
                className=" h-64"
                src="https://unsplash-assets.imgix.net/empty-states/photos.png?auto=format&fit=crop&q=60"
                alt=""
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
