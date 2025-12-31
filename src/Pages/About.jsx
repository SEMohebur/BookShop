import React from "react";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          About Online Book Shop
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Online Book Shop is a web application designed to make browsing,
          managing, and discovering books easy for users of all types—students,
          teachers, and book enthusiasts. Explore, add, update, or remove books
          seamlessly in a clean and user-friendly interface.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Browse Books */}
        <section className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Browse Books
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Users can explore a wide variety of books across different
            categories. Each book card displays the title, author, price, and a
            brief description to help users quickly find the books they are
            looking for.
          </p>
        </section>

        {/* Add New Books */}
        <section className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Add New Books
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Administrators or authorized users can easily add new books to the
            shop by filling out a simple form. You can provide book details,
            upload images, and set pricing to update the collection in
            real-time.
          </p>
        </section>

        {/* Update & Delete Books */}
        <section className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Update & Delete Books
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Keep your book collection accurate and up-to-date. Users with access
            can update book information or remove books that are no longer
            available, ensuring the shop always reflects current inventory.
          </p>
        </section>

        {/* Responsive & User-Friendly */}
        <section className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Responsive & User-Friendly
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The Online Book Shop provides a smooth experience on both desktop
            and mobile devices. Navigation is intuitive, and all features are
            designed to be easy for first-time users.
          </p>
        </section>

        {/* Book Categories */}
        <section className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Book Categories
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Books are organized into categories like Fiction, Non-Fiction,
            Academic, Science, and more. Users can filter and browse books by
            category, making it easier to find exactly what they want.
          </p>
        </section>

        {/* Learning & Exploration */}
        <section className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Learning & Exploration
          </h2>
          <p className="text-gray-600 leading-relaxed">
            This app is also ideal for beginners to explore React and MERN stack
            functionality. Users can see CRUD operations in action, understand
            how data flows, and interact with real-time book management
            features.
          </p>
        </section>
      </div>

      {/* Bottom Highlight Card */}
      <div className="mt-14">
        <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-8 text-center shadow-lg">
          <h3 className="text-2xl font-semibold mb-3">
            Why Use Online Book Shop?
          </h3>
          <p className="max-w-2xl mx-auto">
            Whether you are a student, teacher, or book enthusiast, Online Book
            Shop provides a complete, easy-to-use platform to browse, manage,
            and discover books efficiently. Enjoy a professional, responsive
            experience across all devices.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
