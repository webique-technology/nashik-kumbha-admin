import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
// import axios from "axios";
import api from "../../services/axiosInstance";
import "react-quill-new/dist/quill.snow.css";
import useAlert from "../../hooks/useAlert";

// Configure your base URL if not already done globally
// axios.defaults.baseURL = 'http://your-api-domain.com/api';

const PrivacyPolicy = () => {
  const [description, setDescription] = useState("");
  const [policy, setPolicy] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  // 1. Fetch Privacy Policy on component mount
  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  const fetchPrivacyPolicy = async () => {
    try {
      setLoading(true);
      const response = await api.get("/privacy-policy");
      // Checking if data exists and has the 'content' field from Laravel
      if (response.data && response.data.content) {
        setPolicy(response.data);
      }
    } catch (error) {
      console.error("Error fetching privacy policy:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Submit (Save / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || description === "<p><br/></p>") return;

    try {
      // The backend validates 'content', so we pass the state value under that key
      const response = await api.post("/privacy-policy", {
        content: description,
      });
      showAlert(
                    "Privacy-policy updated successfully",
                    "success"
                );
      if (response.data && response.data.data) {
        // Update local preview state with returned database record
        setPolicy(response.data.data);
        setIsEditing(false);
        setDescription(""); // Clear editor after successful saving
      }
    } catch (error) {
      console.error("Error saving privacy policy:", error);
      alert("Failed to save privacy policy. Please try again.");
    }
  };

  const handleEdit = () => {
    if (policy) {
      setDescription(policy.content);
      setIsEditing(true);
    }
  };

  const handleDelete = () => {
    // Note: Since your backend doesn't have a specific delete route provided,
    // this clears the local visual state. If you need a hard delete, 
    // you would trigger an axios.delete request here.
    setPolicy(null);
    setDescription("");
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Loading Privacy Policy...</p>
      </div>
    );
  }

  return (
    <div className="page-container h-screen">
      <div className="p-8 max-w-[1400px] mx-auto">

        {/* ✅ Preview */}
        {policy && policy.content && (
          <div className="mb-6 bg-white shadow-md rounded-xl p-6 border">

            <div className="flex justify-end mb-3 gap-2">
              <button
                type="button"
                onClick={handleEdit}
                className="px-3 py-1 text-sm bg-yellow-400 text-white rounded"
              >
                Edit
              </button>

              {/* <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded"
              >
                Delete
              </button> */}
            </div>

            <div
              className="
                max-w-none break-words overflow-hidden
                [&_*]:max-w-full
                [&_*]:break-words
                [&_p]:mb-3
                [&_ul]:list-disc [&_ul]:ml-6
                [&_ol]:list-decimal [&_ol]:ml-6
                [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4
                [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mb-3
                [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-2
              "
              dangerouslySetInnerHTML={{ __html: policy.content }}
            />
          </div>
        )}

        {/* ✅ Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold">
            {isEditing || policy ? "Edit Privacy Policy" : "Add Privacy Policy"}
          </h2>

          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
                ["clean"],
              ],
            }}
          />

          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold"
          >
            {isEditing || policy ? "Update Content" : "Add Content"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PrivacyPolicy;