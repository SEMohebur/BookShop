import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
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

      <section>2Ei khane recent 6 ti book card dekhabo</section>
      <section>3 eikhane ei section rakbo Why Choose Our Book Shop</section>
      <section>4 Add New Book CTA Section</section>
      <section>5 How It Works Section</section>
    </div>
  );
};

export default Home;
