import React, { useEffect } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Contact = () => {
  useEffect(() => {
    document.title = "Contact | My Book Shop";
  }, []);
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Page Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          Contact Us
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Have a question, suggestion, or feedback? Fill out the form below and
          our team will get back to you shortly.
        </p>
      </motion.div>

      {/* Contact Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
      >
        <form className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Subject
            </label>
            <input
              type="text"
              placeholder="How can we help you?"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Write your message here..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="text-center pt-4"
          >
            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-indigo-700 transition shadow-md"
            >
              Send Message
            </button>
          </motion.div>
        </form>
      </motion.div>

      {/* Footer Text */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-center text-gray-500 text-sm mt-8"
      >
        We usually respond within 24 hours.
      </motion.p>
    </div>
  );
};

export default Contact;
