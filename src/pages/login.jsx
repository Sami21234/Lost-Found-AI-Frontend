
// import { motion } from "framer-motion";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Login({setIsLoggedIn}) {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.email && formData.password) {
//       setIsLoggedIn(true);
//       localStorage.setItem("isLoggedIn", "true");   // save in the localstorage
//       navigate("/dashboard")    // redirects to the dashboard page after successful login
//     } else{
//       alert("❌ please enter correct email & password")
//     }
//     console.log("📌 Login Data:", formData);
//     alert("Login submitted! (Check console for data)");
//     // 👉 Later: send this to backend (/login)
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mb-24"
//       >
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Email Input */}
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
//             required
//           />

//           {/* Password Input */}
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Enter your password"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
//             required
//           />

//           {/* Login Button */}
//           <motion.button
//             type="submit"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
//           >
//             Login
//           </motion.button>
//         </form>

//         {/* Register Link */}
//         <p className="text-sm text-gray-600 mt-4 text-center">
//           Don&apos;t have an account?{" "}
//           <Link to="/register" className="text-blue-600 hover:underline">
//             Register
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }

import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!formData.email || !formData.password) {
      alert("❌ Please enter email & password");
      return;
    }

    try {
      setLoading(true);

      // 👉 Call backend API
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email:formData.email,
          password:formData.password,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        alert("✅ Login successful!");
        console.log("📌 Login Response:", data);

        // Save login status/token
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        alert(`❌ ${data.message || "Invalid email or password"}`);
      }
    } catch (error) {
      setLoading(false);
      console.error("❌ Login error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mb-24"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            required
          />

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
