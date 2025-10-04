
// Responsive part


import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import ReportLost from "./pages/reportLost";
import ReportFound from "./pages/reportFound";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import { useState, useEffect } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // check localstorage when the app loads 
  useEffect(()=>{
    const storedLogin = 
    localStorage.getItem("isLoggedIn");
    if(storedLogin === "true"){
      setIsLoggedIn(true);
    }
  },[]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn")   //When the logout button is clicked only the data from the localstorge will be removed
    alert("✅ Logged out!")
  };
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen flex flex-col">

        {/* ✅ Responsive Navbar */}
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-blue-600 text-white px-4 sm:px-6 md:px-10 py-4 
                     flex flex-col sm:flex-row sm:justify-between sm:items-center 
                     gap-4 sm:gap-0 shadow"
        >
          {/* Logo / Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
            <b><i>Lost&Found</i></b>
          </h1>

          {/* Nav Links */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-center">
            <Link to="/" className="hover:text-yellow-300 text-sm sm:text-base">Home</Link>
            <Link to="/dashboard" className="hover:text-yellow-300 text-sm sm:text-base">Dashboard</Link>
            <Link to="/reportLost" className="hover:text-yellow-300 text-sm sm:text-base">Report Lost</Link>
            <Link to="/reportFound" className="hover:text-yellow-300 text-sm sm:text-base">Report Found</Link>

            {!isLoggedIn ? (
              <>
                <Link
              to="/login"
              className="bg-yellow-400 px-4 py-2 rounded-lg text-black font-semibold 
                         hover:bg-yellow-300 text-sm sm:text-base"
            >
              Login
            </Link>
            <Link to="/register" className="bg-green-400 px-4 py-2 rounded-lg text-black font-semibold hover:bg-green-300 text-sm sm:text-base"
            >Register
            </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-400 text-sm sm:text-base">
                Logout
              </button>
            )}
          </div>
        </motion.nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reportLost" element={<ReportLost />} />
          <Route path="/reportFound" element={<ReportFound />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
