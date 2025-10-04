// // src/pages/Register.jsx
// import { motion } from "framer-motion";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("❌ Passwords do not match!");
//       return;
//     }

//     console.log("📌 Register Data:", formData);
//     alert("Registration submitted! (Check console for data)");
//     // 👉 Later: send this to backend (/register)
//   };

//   return (
//     <div className="flex justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 px-4 pt-16">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm" style={{ marginTop: "117px", marginBottom: "272px" }}
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
//           Create an Account
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             placeholder="Full Name"
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
//             required
//           />

//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Password"
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
//             required
//           />

//           <input
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             placeholder="Confirm Password"
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
//             required
//           />

//           <motion.button
//             type="submit"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
//           >
//             Register
//           </motion.button>
//         </form>

//         <p className="text-sm text-gray-600 text-center mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-600 hover:underline">
//             Login
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }

// src/pages/Register.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate(); // 👉 for redirect after successful register

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName, // backend expects "username"
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // save token & user_id in localStorage
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user_id", data.user_id);

        alert("✅ Registration successful!");
        navigate("/login"); // redirect to login page
      } else {
        alert(`❌ ${data.msg || "Registration failed"}`);
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 px-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm"
        style={{ marginTop: "117px", marginBottom: "272px" }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
            required
          />

          <motion.button
            type="submit"
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
