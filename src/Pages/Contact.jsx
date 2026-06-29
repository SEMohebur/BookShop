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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/10 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 blur-[150px] rounded-full"></div>

      <div className="relative max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-medium">
            💬 Contact Us
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-bold text-white">
            Get In
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}
              Touch
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400 leading-8">
            Have a question, suggestion, or feedback? We'd love to hear from
            you. Fill out the form below and our team will get back to you as
            soon as possible.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12 shadow-2xl"
        >
          <form className="space-y-7">
            {/* Name */}
            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                placeholder="John Doe"
                required
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-5 py-3 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                Email Address
              </label>

              <input
                type="email"
                placeholder="john@example.com"
                required
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-5 py-3 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                Subject
              </label>

              <input
                type="text"
                placeholder="How can we help you?"
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-5 py-3 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                Message
              </label>

              <textarea
                rows="6"
                required
                placeholder="Write your message here..."
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-5 py-3 text-white placeholder:text-gray-500 resize-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
              ></textarea>
            </div>

            {/* Button */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="pt-2"
            >
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 text-lg font-semibold text-white shadow-lg transition duration-300 hover:shadow-cyan-500/30"
              >
                Send Message →
              </button>
            </motion.div>
          </form>
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-6 py-3 text-cyan-300">
            <span className="text-xl">⚡</span>

            <span>
              We usually respond within <strong>24 hours</strong>.
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
