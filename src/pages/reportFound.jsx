
import { motion } from "framer-motion";
import { useState } from "react";

export default function ReportFound() {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    location: "",
    image: null,
    preview: null,
    finderName: "",
    finderPhone: "",
    finderEmail: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);

      // 🔧 FIXED: Use FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('itemName', formData.itemName);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('contactName', formData.finderName);
      formDataToSend.append('contactPhone', formData.finderPhone);
      formDataToSend.append('contactEmail', formData.finderEmail);
      formDataToSend.append('dateFound', new Date().toISOString().split('T')[0]);
      
      // 🔧 Add image file if selected
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      console.log("📤 Sending FormData with image");

      // 🔧 FIXED: Send FormData (no Content-Type header needed)
      const res = await fetch("http://localhost:5000/api/report-found", {
        method: "POST",
        body: formDataToSend, // FormData handles the headers automatically
      });

      const result = await res.json();
      setLoading(false);

      if (res.ok) {
        alert("✅ Found item reported successfully!");
        console.log("📌 Report Found Response:", result);

        // Reset form
        setFormData({
          itemName: "",
          description: "",
          location: "",
          image: null,
          preview: null,
          finderName: "",
          finderPhone: "",
          finderEmail: "",
        });
      } else {
        alert(`❌ ${result.message || "Something went wrong"}`);
        console.error("Backend error:", result);
      }
    } catch (error) {
      setLoading(false);
      console.error("❌ Report Found Error:", error);
      alert("Failed to submit. Please try again later.");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600 flex flex-col items-center pt-20 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-3xl font-bold text-white mb-6 text-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        Report Found Item
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <input
          type="text"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          placeholder="Item Name"
          className="w-full p-3 border rounded text-sm sm:text-base"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 border rounded text-sm sm:text-base"
          required
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location Found"
          className="w-full p-3 border rounded text-sm sm:text-base"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-sm sm:text-base cursor-pointer"
        />

        {formData.preview && (
          <img
            src={formData.preview}
            alt="Preview"
            className="w-full h-40 object-cover rounded mt-2"
          />
        )}

        <input
          type="text"
          name="finderName"
          value={formData.finderName}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full p-3 border rounded text-sm sm:text-base"
          required
        />

        <input
          type="text"
          name="finderPhone"
          value={formData.finderPhone}
          onChange={handleChange}
          placeholder="Your Phone"
          className="w-full p-3 border rounded text-sm sm:text-base"
          required
        />

        <input
          type="email"
          name="finderEmail"
          value={formData.finderEmail}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full p-3 border rounded text-sm sm:text-base"
          required
        />

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}