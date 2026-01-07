import React, { useEffect } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  useEffect(() => {
    document.title = "About | My Book Shop";
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-6 py-14">
      {/* Page Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-5 text-base-400">
          About Online Book Shop
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Online Book Shop is a modern web application designed to make
          browsing, managing, and discovering books effortless for students,
          teachers, and book lovers. Experience a clean, fast, and user-friendly
          platform.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            title: "Browse Books",
            text: "Explore a wide range of books with detailed information including title, author, price, and descriptions.",
          },
          {
            title: "Add New Books",
            text: "Authorized users can add books easily with pricing, images, and real-time updates to the collection.",
          },
          {
            title: "Update & Delete Books",
            text: "Keep inventory accurate by updating or removing books whenever needed.",
          },
          {
            title: "Responsive & User-Friendly",
            text: "Enjoy a seamless experience across desktop and mobile devices with intuitive navigation.",
          },
          {
            title: "Book Categories",
            text: "Browse books by categories such as Fiction, Academic, Science, and more for easy discovery.",
          },
          {
            title: "Learning & Exploration",
            text: "Perfect for beginners to understand React and CRUD operations with real-world examples.",
          },
        ].map((item, index) => (
          <motion.section
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-md p-7 hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {item.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">{item.text}</p>
          </motion.section>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16"
      >
        <section className=" text-base-400  rounded-2xl p-10 text-center shadow-xl">
          <h3 className="text-3xl font-semibold mb-4">
            Why Choose Online Book Shop?
          </h3>
          <p className="max-w-3xl mx-auto leading-relaxed  text-base-400">
            Whether you are a student, teacher, or book enthusiast, Online Book
            Shop gives you a powerful, responsive, and easy-to-use platform to
            explore and manage books with confidence.
          </p>
        </section>
      </motion.div>
    </div>
  );
};

export default About;
