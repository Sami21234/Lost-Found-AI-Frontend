// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// export default function Register() {
//     return (
//         <div className="flex justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 pt-16">
//             <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//                 className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mt-[-7px] mb-[160px]"
//                 // className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md margin-top: -7px margin-bottom: 160px"

//             >
//                 <h2 className="text-2xl font-bold text-center text-grey-600 mb-6">
//                     Create an Account
//                 </h2>

//                 {/* Form */}
//                 <form className="space-y-4">
//                     <input
//                         type="text"
//                         placeholder="Full Name"
//                         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
//                     />
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                     />
//                     <input
//                         type="password"
//                         placeholder="Confirm Password"
//                         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                     />

//                     <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
//                         Register
//                     </motion.button>
//                 </form>

//                 {/* Link to login */}
//                 <p className="text-sm text-gray-600 text-center mt-4">
//                     Already have an account?{" "}
//                     <Link to="/login" className="text-blue-600 hover:underline">
//                         Login
//                     </Link>
//                 </p>
//             </motion.div>
//         </div>
//     );
// }

// Responsive part

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 pt-16 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm"
        style={{ marginTop: "0", marginBottom: "80px" }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-600 mb-6">
          Create an Account
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none text-sm sm:text-base"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
          >
            Register
          </motion.button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
