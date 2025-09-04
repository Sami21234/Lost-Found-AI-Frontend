// import { motion } from "framer-motion";
// export default function Login () {
//     return(
//         <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600">
//             <motion.div
//             initial={{ opacity: 0, y:50 }}
//             animate={{ opacity: 1, y:0 }}
//             transition={{ duration: 0.6 }}
//             className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mt-[-100px]"
//                 >
//                   <h2 className="text-3xl font-bold text-center text-grey-800 mb-6">Login</h2>

//                   {/* Email Input */}
//                   <div className="mb-4">
//                     <label className="block text-gray-600 mb-2">Email</label>
//                     <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-400"/>
//                   </div>

//                   {/* Password Input */}
//                         <div className="mb-4">
//                     <label className="block text-gray-600 mb-2">Password</label>
//                     <input type="password" placeholder="Enter your password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/>
//                   </div>

//                   {/* Login Button */}
//                   <motion.button
//                     whileHover={{scale: 1.05 }}
//                     whileTap={{scale: 0.95}}
//                     className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
//                   >
//                     Login
//                   </motion.button>

//                 {/* Register Link */}
//                 <p className="text-sm text-gray-600 mt-4 text-center">Don't have an account?{" "}
//                     <a href="/register" className="text-blue-600 hover:underline">Register
//                     </a>
//                 </p>
//             </motion.div>
//         </div>
//     );
// }

// Responsive part


import { motion } from "framer-motion";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
        style={{ marginTop: "-100px" }}  // inline style for negative margin to avoid Tailwind warning
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
          />
        </div>

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
        >
          Login
        </motion.button>

        {/* Register Link */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </motion.div>
    </div>
  );
}
