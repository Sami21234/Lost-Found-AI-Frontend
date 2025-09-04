// import { motion } from "framer-motion";
// import { useState } from "react";

// export default function ReportFound() {
//     const [image, SetImage] = useState(null);

//     // Handling file selection

//     const handleFile = (e) =>{
//         const file  = e.target.files[0];
//         if (file) {
//             SetImage(URL.createObjectURL(file));
//         }
//     };

//     return (
//         <motion.div
//             className="min-h-screen bg gray-100 flex flex-col items-center pt-20 bg-gradient-to-r from-indigo-500 to-blue-600"
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -40 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//         >

//             <motion.h2 className="text-3xl font-bold text-white mb-6"
//                 initial={{ scale: 0.8 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 0.4 }}

//             >Report Found Item</motion.h2>

//             <motion.form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2, duration: 0.5 }}
//             >
//                 <input type="text" placeholder="Item Name" className="w-full p-3 border rounded" />

//                 {/* Upload Photo (Camera or Gallery) */}
//                  <input type="file" placeholder="Upload Lost Image" accept="image/*" capture="environment" onChange={handleFile} className="w-full px-3 py-2 border bg-gray text-sm rounded-lg cursor-pointer" />

//                 <textarea placeholder="Description" className="w-full p-3 border rounded"></textarea>
//                 <input type="text" placeholder="Location Found" className="w-full p-3 border rounded" />
//                 <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
//                     Submit
//                 </motion.button>
//             </motion.form>

//         </motion.div>
//     )
// }

// Responsive part


import { motion } from "framer-motion";
import { useState } from "react";

export default function ReportFound() {
  const [image, setImage] = useState(null);

  // Handle file selection
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600 
                 flex flex-col items-center pt-20 px-4 sm:px-6 md:px-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Heading */}
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        Report Found Item
      </motion.h2>

      {/* Form */}
      <motion.form
        className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Item Name */}
        <input
          type="text"
          placeholder="Item Name"
          className="w-full p-3 border border-gray-300 rounded text-sm sm:text-base"
        />

        {/* Image Upload */}
        <input
          type="file"
          placeholder="Upload Found Image"
          accept="image/*"
          capture="environment"
          onChange={handleFile}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 text-sm sm:text-base cursor-pointer"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          className="w-full p-3 border border-gray-300 rounded text-sm sm:text-base"
        ></textarea>

        {/* Location Found */}
        <input
          type="text"
          placeholder="Location Found"
          className="w-full p-3 border border-gray-300 rounded text-sm sm:text-base"
        />

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
        >
          Submit
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
