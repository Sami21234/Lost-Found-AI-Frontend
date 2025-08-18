import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow"
      >
        <h1 className="text-2xl font-bold"><b><i>Lost&Found</i></b></h1>
        <div className="space-x-6">
          <a href="#" className="hover:text-yellow-300">Home</a>
          <a href="#" className="hover:text-yellow-300">Report Lost</a>
          <a href="#" className="hover:text-yellow-300">Report Found</a>
          <a href="#" className="bg-yellow-400 px-4 py-2 rounded-lg text-black font-semibold hover:bg-yellow-300">
            Login
          </a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center flex-1 text-center px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
      >
        <motion.h2
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold mb-4"
        >
          Find What’s Lost, Return What’s Found
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg mb-6 max-w-2xl"
        >
          A smart way to connect lost items with their rightful owners using AI-powered matching.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          Report Now
        </motion.button>
      </motion.section>

      {/* Features Section */}
      <section className="py-12 bg-white px-6">
        <h3 className="text-3xl font-bold text-center mb-10">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { title: "📌 Report Lost", desc: "Submit details of your lost item so others can help you find it." },
            { title: "🔎 Report Found", desc: "Report an item you’ve found and connect with its owner." },
            { title: "🤖 AI Matching", desc: "Our system intelligently matches lost and found reports for quick results." }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3, duration: 0.6 }}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-gray-800 text-gray-300 py-4 text-center"
      >
        <p>© 2025 Lost & Found AI | Built using React + Tailwind</p>
      </motion.footer>
    </div>
  )
}