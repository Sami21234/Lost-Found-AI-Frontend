import { motion } from "framer-motion";
import { useState } from "react";

export default function ReportLost() {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    location: "",
    image: null,
    preview: null,
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    dateLost: ""
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

      // Use FormData for text + file
      const data = new FormData();
      data.append("itemName", formData.itemName);
      data.append("description", formData.description);
      data.append("location", formData.location);
      data.append("contactName", formData.contactName);
      data.append("contactPhone", formData.contactPhone);
      data.append("contactEmail", formData.contactEmail);
      data.append("dateLost", formData.dateLost || new Date().toISOString().split('T')[0]);
      
      if (formData.image) {
        data.append("image", formData.image);
      }

      // Call backend API
      const res = await fetch("http://localhost:5000/api/report-lost", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      setLoading(false);

      if (res.ok) {
        alert("Lost item reported successfully!");
        console.log("Report Lost Response:", result);

        // Reset form
        setFormData({
          itemName: "",
          description: "",
          location: "",
          image: null,
          preview: null,
          contactName: "",
          contactPhone: "",
          contactEmail: "",
          dateLost: ""
        });
      } else {
        alert(`${result.message || "Something went wrong"}`);
      }
    } catch (error) {
      setLoading(false);
      console.error("Report Lost Error:", error);
      alert("Failed to submit. Please try again later.");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600 flex flex-col items-center px-4 pt-20"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-3xl font-bold text-white mt-16 mb-6 text-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        Report Lost Item
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
          placeholder="Item Name (e.g., iPhone 13, Blue Wallet)"
          className="w-full p-3 border rounded text-sm sm:text-base"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description (color, brand, unique features)"
          className="w-full p-3 border rounded text-sm sm:text-base"
          rows="3"
          required
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location Lost (e.g., Library, Metro Station)"
          className="w-full p-3 border rounded text-sm sm:text-base"
          required
        />

        <input
          type="date"
          name="dateLost"
          value={formData.dateLost}
          onChange={handleChange}
          className="w-full p-3 border rounded text-sm sm:text-base"
          max={new Date().toISOString().split('T')[0]}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-sm sm:text-base cursor-pointer"
        />

        {formData.preview && (
          <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src={formData.preview}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          </div>
        )}

        <div className="border-t pt-4 mt-4">
          <p className="text-sm text-gray-600 mb-3 font-semibold">
            Your Contact Information (so people can reach you)
          </p>

          <input
            type="text"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 border rounded text-sm sm:text-base mb-3"
            required
          />

          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            className="w-full p-3 border rounded text-sm sm:text-base mb-3"
            required
          />

          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 border rounded text-sm sm:text-base"
            required
          />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Report Lost Item"}
        </motion.button>

        <p className="text-xs text-gray-500 text-center">
          Your contact info will be visible on the dashboard so finders can reach you.
        </p>
      </motion.form>
    </motion.div>
  );
}