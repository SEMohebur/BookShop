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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/10 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 blur-[150px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Hero */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-medium">
            📖 About Us
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-bold text-white">
            About
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}
              Online Book Shop
            </span>
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-400 leading-8">
            Online Book Shop is a modern platform designed for students,
            professionals, and book lovers. Discover, manage, and explore
            thousands of books with a fast, secure, and beautiful experience.
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: "📚",
              title: "Browse Books",
              text: "Explore thousands of books with detailed information, pricing, and descriptions.",
            },
            {
              icon: "➕",
              title: "Add Books",
              text: "Admins can easily add books with images, prices, and category details.",
            },
            {
              icon: "✏️",
              title: "Manage Books",
              text: "Update or remove books anytime to keep your collection accurate.",
            },
            {
              icon: "📱",
              title: "Responsive Design",
              text: "A smooth experience across mobile, tablet, and desktop devices.",
            },
            {
              icon: "🏷️",
              title: "Categories",
              text: "Find books quickly using categories like Fiction, Academic, Science, and more.",
            },
            {
              icon: "🚀",
              title: "Fast & Secure",
              text: "Built with modern technologies to ensure speed, security, and reliability.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-3xl">
                {item.icon}
              </div>

              <h2 className="mt-6 text-2xl font-bold text-white">
                {item.title}
              </h2>

              <p className="mt-4 text-gray-400 leading-7">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/10 via-slate-900 to-blue-500/10 backdrop-blur-xl p-12 text-center shadow-2xl">
            <h3 className="text-4xl font-bold text-white">
              Why Choose Online Book Shop?
            </h3>

            <p className="mt-6 max-w-3xl mx-auto text-gray-400 leading-8 text-lg">
              Whether you're a student, teacher, or passionate reader, our
              platform provides an intuitive experience with modern design,
              secure book management, and a growing collection to support your
              learning journey.
            </p>

            <button className="mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 transition duration-300">
              Explore Books
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
