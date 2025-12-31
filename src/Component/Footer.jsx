import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">
            Online Book Shop
          </h2>
          <p className="text-sm leading-relaxed">
            A beginner-friendly MERN stack project focused on building a clean,
            responsive, and user-friendly book management system using React.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Books</li>
            <li className="hover:text-white cursor-pointer">Add Book</li>
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
          <p className="text-sm">Email: mdmohebur11@gmail.com.com</p>
          <p className="text-sm mt-1">Phone: +880 1881555963</p>
          <p className="text-sm mt-1">Location: Bangladesh</p>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} Online Book Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
