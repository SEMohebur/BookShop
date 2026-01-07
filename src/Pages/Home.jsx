import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookCard from "../Component/BookCard";
import { IoBookSharp } from "react-icons/io5";
import { MdMonetizationOn } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Home = () => {
  const [recentBoos, setrecentBooks] = useState(null);

  // slider
  const bannerData = [
    {
      name: "Online Book Shop – Discover Your Next Read",
      img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1674&auto=format&fit=crop",
      description:
        "Online Book Shop is a modern web platform where users can explore a wide collection of books across different categories. Readers can easily browse available books, view details, and discover their next favorite read through a clean and user-friendly interface.",
    },
    {
      name: "Online Book Shop – Manage Books Easily",
      img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2070&auto=format&fit=crop",
      description:
        "This application allows book shop administrators to add, update, and delete books effortlessly. With simple forms and smooth API integration, managing book data becomes fast, efficient, and error-free.",
    },
    {
      name: "Online Book Shop – Built with MERN Stack",
      img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop",
      description:
        "The Online Book Shop Web Application is built using the MERN stack, focusing on React-based front-end development. It helps beginners understand component-based design, form handling, and REST API integration while following real-world UI/UX practices.",
    },
  ];

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  // slider

  // get recent 6 book

  useEffect(() => {
    fetch("https://book-shop-server-delta.vercel.app/recentBooks")
      .then((res) => res.json())
      .then((data) => {
        setrecentBooks(data);
      })
      .catch((err) =>
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
        })
      );
  }, []);

  // console.log(recentBoos);
  useEffect(() => {
    document.title = "Home | My Book Shop";
  }, []);
  return (
    <div>
      <Slider {...settings}>
        {bannerData.map((item, index) => {
          return (
            <div
              key={index}
              className="relative card card-side overflow-hidden  shadow-md"
            >
              <figure>
                <img
                  className="w-full h-96 object-cover"
                  src={item.img}
                  alt="Album"
                />
              </figure>
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white p-4 transition-all duration-300 hover:bg-black/60">
                <h2 className="text-6xl font-bold drop-shadow-lg">
                  {item.name}
                </h2>
                <p className="font-thin mt-2 ">{item.description}</p>
              </div>
            </div>
          );
        })}
      </Slider>
      {/* recent Books  */}
      <section className=" w-11/12 mx-auto mt-8 pb-3">
        <h3 className=" font-bold text-center text-3xl text-gray-800 mb-5">
          Recent Books
        </h3>
        <div className=" grid sm:grid-cols-2 md:grid-cols-3  gap-3 justify-center">
          {recentBoos?.map((book, i) => {
            return <BookCard key={i} book={book} />;
          })}
        </div>
      </section>
      {/* Why Choose  */}

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Why Choose Our Book Shop
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              We are committed to providing quality books, affordable prices,
              and a smooth shopping experience for every reader.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
              <div className="flex flex-col items-center text-center gap-3">
                <IoBookSharp className="text-5xl text-indigo-600" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Wide Book Collection
                </h3>
              </div>

              <p className="text-gray-600 text-sm">
                Explore a vast collection of programming, academic, and
                best-selling books from trusted publishers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
              <div className="flex flex-col items-center text-center gap-3">
                <MdMonetizationOn className="text-5xl text-green-600" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Affordable Pricing
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Enjoy competitive prices with regular discounts and special
                offers on popular titles.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="flex flex-col items-center text-center gap-3">
                <MdOutlineSecurity className="text-5xl text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Easy & Secure Ordering
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Simple ordering process with secure checkout, ensuring a smooth
                and safe shopping experience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
              <div className="flex flex-col items-center text-center gap-3">
                <FaStar className="text-5xl text-yellow-500" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Trusted by Readers
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Rated highly by readers for quality service, fast delivery, and
                excellent customer support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA  */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Text Content */}
            <div className="text-white max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Discover Your Next Favorite Book
              </h2>
              <p className="text-indigo-100 mb-6">
                Explore a wide range of programming, academic, and best-selling
                books at unbeatable prices. Start your learning journey today
                with our trusted book collection.
              </p>

              <div className="flex gap-4">
                <Link
                  to="/books"
                  className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
                >
                  Browse Books
                </Link>
                <Link
                  to="/books"
                  className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-indigo-600 transition"
                >
                  Shop Now
                </Link>
              </div>
            </div>

            {/* Image / Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 w-full md:w-96">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                📘 Best Seller of the Month
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Upgrade your skills with top-rated programming books recommended
                by industry experts.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-indigo-600 font-bold text-lg">
                  From ৳499
                </span>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* how its work section  */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              How It Works
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Buying books from our shop is quick, easy, and secure. Follow
              these simple steps to get started.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Browse Books
              </h3>
              <p className="text-gray-600 text-sm">
                Explore our wide collection of books by category, author, or
                popularity.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Add to Cart
              </h3>
              <p className="text-gray-600 text-sm">
                Select your favorite books and add them to your shopping cart in
                just one click.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Place Order
              </h3>
              <p className="text-gray-600 text-sm">
                Complete your order securely with an easy and fast checkout
                process.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600 text-sm">
                Get your books delivered quickly and safely to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
