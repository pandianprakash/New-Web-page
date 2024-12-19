import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests

const Dashboard = () => {
  const navigate = useNavigate();

  // State variables for managing post content, image, and posts list
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showPostInput, setShowPostInput] = useState(false); // For toggling the post creation modal visibility

  // Dummy user data for profile
  const profileName = "Debbie Moran";
  const profileImage = "https://via.placeholder.com/50"; // You can replace this with actual profile image URL

  // Handle logout
  const handleLogout = () => {
    navigate("/LoginPage");
  };

  // Handle text change in the post input field
  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  // Handle image upload
  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0])); // Set the selected image URL
  };

  // Handle post submission with axios request
  const handlePostSubmit = async () => {
    if (postContent.trim() === "" && !image) {
      alert("Please enter a post or upload an image!");
      return;
    }

    const newPost = {
      text: `${profileName}: ${postContent}`, // Add profile name to the post content
      image: image,
    };

    try {
      // Post the new post to the backend
      const response = await axios.post("http://localhost:5000/api/posts/add", newPost);
      setPosts([response.data.post, ...posts]); // Add the new post to the local state
      setPostContent(""); // Reset post content
      setImage(null); // Reset image
      setShowPostInput(false); // Hide the post creation modal after submission
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  // Toggle the visibility of the post input form (modal)
  const handlePostButtonClick = () => {
    setShowPostInput(!showPostInput);
  };

  // Close the post input modal
  const handleClosePostModal = () => {
    setShowPostInput(false); // Hide the post input form
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <nav className="bg-blue-600 p-4 flex items-center justify-between shadow-md">
        {/* Left section: Profile */}
        <div className="flex items-center space-x-4">
          <img
            src={profileImage}
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-white"
          />
          <span className="text-white text-xl font-semibold">{profileName}</span>
        </div>

        {/* Center section: Post Button */}
        <div className="flex items-center space-x-8">
          <button
            onClick={handlePostButtonClick}
            className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
          >
            What's on your mind?
          </button>
        </div>

        {/* Right section: Logout */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Log Out
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-grow p-6">
        {/* Post Input Modal */}
        {showPostInput && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
              {/* Close Button */}
              <button
                onClick={handleClosePostModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h2 className="text-2xl font-medium text-gray-700 mb-4">Create Post</h2>

              {/* Profile Picture and Name */}
              <div className="flex items-center mb-4">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <span className="text-lg font-semibold">{profileName}</span>
              </div>

              {/* Post Content */}
              <textarea
                className="w-full p-4 border rounded-lg mb-4"
                rows="4"
                placeholder="What's on your mind?"
                value={postContent}
                onChange={handlePostChange}
              />

              {/* Image Upload */}
              <div className="mt-4 flex items-center">
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer text-blue-600 hover:text-blue-800"
                >
                  <box-icon name="image" size="lg"></box-icon>
                  <span className="ml-2">Add Image</span>
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* Display selected image */}
              {image && (
                <div className="mt-4">
                  <img
                    src={image}
                    alt="Post Image"
                    className="w-full h-auto max-w-md mx-auto rounded-lg"
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handlePostSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700"
              >
                Post
              </button>
            </div>
          </div>
        )}

        {/* Displaying Posts */}
        <div className="mt-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-md mb-6">
              <p className="text-gray-800">{post.text}</p>
              {post.image && (
                <div className="mt-4">
                  <img
                    src={post.image}
                    alt="Post Image"
                    className="w-full h-auto max-w-md mx-auto rounded-lg"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
