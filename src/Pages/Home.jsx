import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookCard from "../Component/BookCard";
import { IoBookSharp } from "react-icons/io5";
import { MdMonetizationOn } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { FaCartShopping, FaStar } from "react-icons/fa6";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { FaBook, FaMoneyCheckAlt } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";

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
        }),
      );
  }, []);

  // console.log(recentBoos);
  useEffect(() => {
    document.title = "Home | My Book Shop";
  }, []);
  return (
    <div>
      <div className="min-h-fit bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4 py-10 flex flex-col items-center">
        <div className="w-full max-w-7xl rounded-3xl border border-white/20 p-6 md:p-8">
          <Slider {...settings}>
            {bannerData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="outline-none px-2" /* স্লাইডারের স্লাইড গ্যাপের জন্য */
                >
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl group">
                    {/* Image Container */}
                    <div className="w-full h-96 overflow-hidden">
                      <img
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                        src={item.img}
                        alt={item.name || "Banner"}
                      />
                    </div>

                    {/* Overlay Content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/40 to-black/20 flex flex-col justify-center items-center text-center text-white p-6 transition-all duration-300 group-hover:bg-black/60">
                      <h2 className="text-4xl md:text-6xl font-extrabold drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] text-white tracking-wide">
                        {item.name}
                      </h2>
                      <p className="font-light text-slate-200 mt-3 max-w-2xl text-sm md:text-base drop-shadow-md">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      {/* Recent Books */}
      <section className="relative py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        {/* Background Blur */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/10  rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-medium mb-4">
              📚 Latest Collection
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Recent Books
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-gray-400 leading-7">
              Discover our newest arrivals featuring programming, technology,
              academic and best-selling books carefully selected for every
              reader.
            </p>
          </div>

          {/* Books Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {recentBoos?.map((book, i) => (
              <div
                key={i}
                className="group transition duration-500 hover:-translate-y-2"
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="flex justify-center mt-14">
            <Link
              to="/books"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition duration-300"
            >
              View All Books
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 overflow-hidden">
        {/* Background Blur */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10  rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-medium">
              ⭐ Why Choose Us
            </span>

            <h2 className="mt-5 text-4xl md:text-5xl font-bold text-white">
              Why Choose Our Book Shop
            </h2>

            <p className="mt-5 max-w-2xl mx-auto text-gray-400 leading-8">
              We provide premium quality books, affordable prices and a seamless
              shopping experience designed for every passionate reader.
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <div className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center transition-all duration-500 hover:-translate-y-3 hover:border-cyan-500/50 hover:bg-white/10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 group-hover:scale-110 transition">
                <IoBookSharp className="text-5xl text-cyan-400" />
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                Wide Collection
              </h3>

              <p className="mt-3 text-gray-400 text-sm leading-7">
                Discover thousands of programming, academic and best-selling
                books from trusted publishers.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center transition-all duration-500 hover:-translate-y-3 hover:border-green-500/50 hover:bg-white/10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-green-500/10 border border-green-500/20 group-hover:scale-110 transition">
                <MdMonetizationOn className="text-5xl text-green-400" />
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                Best Pricing
              </h3>

              <p className="mt-3 text-gray-400 text-sm leading-7">
                Get competitive prices with exclusive discounts and amazing
                seasonal offers.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center transition-all duration-500 hover:-translate-y-3 hover:border-blue-500/50 hover:bg-white/10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 group-hover:scale-110 transition">
                <MdOutlineSecurity className="text-5xl text-blue-400" />
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                Secure Shopping
              </h3>

              <p className="mt-3 text-gray-400 text-sm leading-7">
                Fast checkout, secure payments and reliable order management for
                complete peace of mind.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center transition-all duration-500 hover:-translate-y-3 hover:border-yellow-500/50 hover:bg-white/10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-yellow-500/10 border border-yellow-500/20 group-hover:scale-110 transition">
                <FaStar className="text-5xl text-yellow-400" />
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                Trusted by Readers
              </h3>

              <p className="mt-3 text-gray-400 text-sm leading-7">
                Thousands of happy readers trust us for quality books, quick
                delivery and excellent support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-500/10  rounded-full"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-500/10  rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-medium">
                📚 Discover Knowledge
              </span>

              <h2 className="mt-6 text-4xl md:text-5xl font-bold text-white leading-tight">
                Discover Your Next
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Favorite Book
                </span>
              </h2>

              <p className="mt-6 text-gray-400 text-lg leading-8 max-w-xl">
                Explore thousands of programming, academic, and best-selling
                books. Learn faster, improve your skills, and grow your career
                with our trusted collection.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  to="/books"
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition duration-300"
                >
                  Browse Books
                </Link>

                <Link
                  to="/books"
                  className="px-8 py-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur-lg text-white hover:bg-white/10 transition"
                >
                  Shop Now
                </Link>
              </div>
            </div>

            {/* Right Card */}
            <div>
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl hover:border-cyan-500/40 transition-all duration-500">
                <span className="inline-block px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-sm">
                  ⭐ Bestseller
                </span>

                <h3 className="mt-5 text-3xl font-bold text-white">
                  Best Seller of the Month
                </h3>

                <p className="mt-4 text-gray-400 leading-7">
                  Upgrade your programming journey with our most popular books
                  recommended by industry professionals and experienced
                  developers.
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Starting From</p>

                    <h4 className="text-3xl font-bold text-cyan-400">৳499</h4>
                  </div>

                  <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute -top-24 left-0 w-80 h-80 bg-cyan-500/10 blur-[140px] rounded-full"></div>
        <div className="absolute -bottom-24 right-0 w-80 h-80 bg-blue-500/10  rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-medium">
              🚀 Simple Process
            </span>

            <h2 className="mt-5 text-4xl md:text-5xl font-bold text-white">
              How It Works
            </h2>

            <p className="mt-5 max-w-2xl mx-auto text-gray-400 leading-8">
              Buying books has never been easier. Just follow these four simple
              steps and enjoy a seamless shopping experience.
            </p>
          </div>

          {/* Steps */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Step 1 */}
            <div className="relative group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center transition-all duration-500 hover:-translate-y-3 hover:border-cyan-500/50">
              <div className="absolute top-5 right-5 h-10 w-10 rounded-full bg-cyan-500 text-white font-bold flex items-center justify-center">
                1
              </div>

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 group-hover:scale-110 transition">
                <FaBook className="text-5xl text-cyan-400" />
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                Browse Books
              </h3>

              <p className="mt-3 text-gray-400 text-sm leading-7">
                Explore our huge collection by category, author, or bestseller
                and discover your next favorite book.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center transition-all duration-500 hover:-translate-y-3 hover:border-green-500/50">
              <div className="absolute top-5 right-5 h-10 w-10 rounded-full bg-green-500 text-white font-bold flex items-center justify-center">
                2
              </div>

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-green-500/10 border border-green-500/20 group-hover:scale-110 transition">
                <FaCartShopping className="text-5xl text-green-400" />
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">Add to Cart</h3>

              <p className="mt-3 text-gray-400 text-sm leading-7">
                Select the books you love and add them to your shopping cart
                with a single click.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center transition-all duration-500 hover:-translate-y-3 hover:border-blue-500/50">
              <div className="absolute top-5 right-5 h-10 w-10 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center">
                3
              </div>

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 group-hover:scale-110 transition">
                <FaMoneyCheckAlt className="text-5xl text-blue-400" />
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                Secure Checkout
              </h3>

              <p className="mt-3 text-gray-400 text-sm leading-7">
                Complete your purchase with our secure payment process in just a
                few seconds.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center transition-all duration-500 hover:-translate-y-3 hover:border-yellow-500/50">
              <div className="absolute top-5 right-5 h-10 w-10 rounded-full bg-yellow-500 text-white font-bold flex items-center justify-center">
                4
              </div>

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-yellow-500/10 border border-yellow-500/20 group-hover:scale-110 transition">
                <CiDeliveryTruck className="text-5xl text-yellow-400" />
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                Fast Delivery
              </h3>

              <p className="mt-3 text-gray-400 text-sm leading-7">
                Sit back and relax while we deliver your books quickly and
                safely to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
