import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users and posts from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, postsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/users"),
          axios.get("http://localhost:5000/api/posts"),
        ]);
        setUsers(usersResponse.data || []); // Default to empty array if data is not returned
        setPosts(postsResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Toggle Block/Unblock user (POST request)
  const toggleBlockStatus = async (userId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/users/${userId}/toggle`);
      const updatedUser = response.data;
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    navigate("/LoginPage");
  };

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-800 p-4 shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src="https://via.placeholder.com/50" alt="Logo" className="w-12 h-12 rounded-full" />
          <span className="text-white text-2xl font-semibold">Admin Dashboard</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Log Out
        </button>
      </nav>

      {/* Main Content */}
      <div className="p-6 flex flex-col space-y-6">
        {/* Manage Users Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="border-b p-2 text-left">Username</th>
                  <th className="border-b p-2 text-left">Email</th>
                  <th className="border-b p-2 text-left">Status</th>
                  <th className="border-b p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) && users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td className="border-b p-2">{user.username}</td>
                      <td className="border-b p-2">{user.email}</td>
                      <td className="border-b p-2">
                        <span
                          className={`${
                            user.isBlocked ? "text-red-600" : "text-green-600"
                          } font-semibold`}
                        >
                          {user.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td className="border-b p-2">
                        <button
                          onClick={() => toggleBlockStatus(user._id)}
                          className={`${
                            user.isBlocked ? "bg-green-600" : "bg-red-600"
                          } text-white px-4 py-2 rounded-lg`}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Manage Posts Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Manage Posts</h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="border-b p-2 text-left">Post Text</th>
                  <th className="border-b p-2 text-left">Image</th>
                  <th className="border-b p-2 text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(posts) && posts.length > 0 ? (
                  posts.map((post) => (
                    <tr key={post._id}>
                      <td className="border-b p-2">{post.text}</td>
                      <td className="border-b p-2">
                        {post.image && <img src={post.image} alt="Post" className="w-16 h-16 object-cover" />}
                      </td>
                      <td className="border-b p-2">{new Date(post.createdAt).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">No posts found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
