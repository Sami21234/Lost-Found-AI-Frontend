import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleteForm, setDeleteForm] = useState({
    contactPhone: "",
    contactEmail: "",
    adminPassword: ""
  });
  const [deleting, setDeleting] = useState(false);
  const [showAdminDelete, setShowAdminDelete] = useState(false);

  // Fetch items from backend
  const fetchItems = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/items")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("📊 Fetched items:", data);
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching items:", err);
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Open delete confirmation modal
  const handleDeleteClick = (item) => {
    setDeleteModal(item);
    setDeleteForm({ contactPhone: "", contactEmail: "" });
  };

  // Close modal
  const closeModal = () => {
    setDeleteModal(null);
    setDeleteForm({ contactPhone: "", contactEmail: "", adminPassword: "" });
    setDeleting(false);
    setShowAdminDelete(false);
  };

  // Handle delete submission
  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    // Check if using admin password
    const ADMIN_PASSWORD = "delete2025"; // Change this to your secure password

    if (deleteForm.adminPassword === ADMIN_PASSWORD) {
      // Admin delete - bypass verification
      await performDelete(true);
    } else if (!deleteForm.contactPhone && !deleteForm.contactEmail) {
      alert("Please enter your phone number OR email to verify ownership, or use admin password");
      return;
    } else {
      // Normal verification delete
      await performDelete(false);
    }
  };

  // Perform the actual delete
  const performDelete = async (isAdmin) => {
    setDeleting(true);

    try {
      const endpoint = deleteModal.type === "lost"
        ? `http://localhost:5000/api/lost/${deleteModal._id}`
        : `http://localhost:5000/api/found/${deleteModal._id}`;

      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          isAdmin
            ? { adminPassword: deleteForm.adminPassword }
            : {
              contactPhone: deleteForm.contactPhone,
              contactEmail: deleteForm.contactEmail
            }
        )
      });

      const result = await response.json();

      if (result.success) {
        alert("Item deleted successfully!");
        closeModal();
        fetchItems(); // Refresh the list
      } else {
        alert(result.message);
        setDeleting(false);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete item. Please try again.");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading items...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center">
        <div className="text-white text-xl">❌ Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600 px-4 sm:px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Lost & Found Items ({items.length})
        </h2>

        {items.length === 0 ? (
          <div className="text-center">
            <p className="text-white text-lg mb-4">No items reported yet.</p>
            <p className="text-white/80">Be the first to report a lost or found item!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <motion.div
                key={item._id}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-5 rounded-xl shadow-lg relative"
              >
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteClick(item)}
                  className="absolute top-3 right-3 bg-blue-300 p-2 rounded-full shadow-sm hover:bg-blue-400 active:bg-blue-500 transition duration-200 z-10"
                  title="Delete this item"
                  aria-label="Delete item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                    <path d="M9 4h6l1 2H8l1-2z" />
                  </svg>
                </button>
                
                {/* Image */}
                {item.imageUrl && (
                  <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={`http://localhost:5000${item.imageUrl}`}
                      alt={item.itemName}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        console.log("Image failed to load:", item.imageUrl);
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {!item.imageUrl && (
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">No Image</span>
                  </div>
                )}

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {item.itemName}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {item.description}
                </p>
                <p className="text-gray-500 text-xs mb-3">
                  📍 {item.location}
                </p>

                <p className="text-gray-400 text-xs mb-3">
                  📅 {item.type === 'lost' ? 'Lost' : 'Found'} on: {
                    new Date(item.dateLost || item.dateFound || item.createdAt).toLocaleDateString()
                  }
                </p>

                {/* Status Badge */}
                {item.type === "found" ? (
                  <div className="bg-green-100 p-3 rounded-lg text-sm">
                    <p className="font-semibold text-green-700 mb-2">
                      ✅ Found Item
                    </p>
                    <div className="space-y-1">
                      <p className="text-gray-700">
                        👤 <span className="font-medium">{item.contactName}</span>
                      </p>
                      <p className="text-gray-700">📞 {item.contactPhone}</p>
                      <p className="text-gray-700">📧 {item.contactEmail}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-100 p-3 rounded-lg text-sm">
                    <p className="font-semibold text-red-700 mb-2">
                      ❌ Lost Item
                    </p>
                    <div className="space-y-1">
                      <p className="text-gray-700">
                        👤 <span className="font-medium">{item.contactName}</span>
                      </p>
                      <p className="text-gray-700">📞 {item.contactPhone}</p>
                      <p className="text-gray-700">📧 {item.contactEmail}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Delete {deleteModal.type === "lost" ? "Lost" : "Found"} Item?
            </h3>

            <div className="bg-gray-100 p-3 rounded mb-4">
              <p className="font-semibold">{deleteModal.itemName}</p>
              <p className="text-sm text-gray-600">{deleteModal.location}</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-3 rounded mb-4">
              <p className="text-sm text-blue-800 font-semibold mb-2">
                Need help? Here's what you used:
              </p>
              <p className="text-sm text-gray-700">
                📞 Phone: {deleteModal.contactPhone || "Not provided"}
              </p>
              <p className="text-sm text-gray-700">
                📧 Email: {deleteModal.contactEmail || "Not provided"}
              </p>
            </div>

            {(!deleteModal.contactPhone && !deleteModal.contactEmail) && (
              <div className="bg-yellow-50 border border-yellow-300 p-3 rounded mb-4">
                <p className="text-sm text-yellow-800">
                  ⚠️ This item has no contact info. You can only delete it using admin password.
                </p>
              </div>
            )}

            <p className="text-gray-700 mb-4">
              To verify ownership, enter the phone/email shown above:
            </p>

            <form onSubmit={handleDeleteSubmit} className="space-y-3">
              <input
                type="tel"
                placeholder="Your Phone Number"
                value={deleteForm.contactPhone}
                onChange={(e) => setDeleteForm({ ...deleteForm, contactPhone: e.target.value })}
                className="w-full p-3 border rounded"
                disabled={!deleteModal.contactPhone}
              />

              <div className="text-center text-gray-500 text-sm">OR</div>

              <input
                type="email"
                placeholder="Your Email"
                value={deleteForm.contactEmail}
                onChange={(e) => setDeleteForm({ ...deleteForm, contactEmail: e.target.value })}
                className="w-full p-3 border rounded"
                disabled={!deleteModal.contactEmail}
              />

              <div className="border-t pt-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAdminDelete(!showAdminDelete)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {showAdminDelete ? "Hide" : "Use"} Admin Password
                </button>

                {showAdminDelete && (
                  <input
                    type="password"
                    placeholder="Admin Password"
                    value={deleteForm.adminPassword}
                    onChange={(e) => setDeleteForm({ ...deleteForm, adminPassword: e.target.value })}
                    className="w-full p-3 border rounded mt-2"
                  />
                )}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition disabled:opacity-50"
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </form>

            <p className="text-xs text-gray-500 mt-3 text-center">
              Only the person who reported this item can delete it.
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}