import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const PaymentPolicy = () => {
  const [description, setDescription] = useState("");
  const [policy, setPolicy] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;

    if (isEditing) {
      // ✅ EDIT → replace content
      setPolicy({ description });
      setIsEditing(false);
    } else {
      // ✅ ADD → append content
      setPolicy((prev) => ({
        description: (prev?.description || "") + "<p><br/></p>" + description,
      }));
    }

    setDescription("");
  };

  const handleEdit = () => {
    setDescription(policy.description);
    setIsEditing(true); // 🔥 IMPORTANT
  };

  const handleDelete = () => {
    setPolicy(null);
    setDescription("");
    setIsEditing(false);
  };

  return (
    <div className="page-container h-screen">
      <div className="p-8 max-w-[1400px] mx-auto">

        {/* ✅ Preview */}
        {policy && (
          <div className="mb-6 bg-white shadow-md rounded-xl p-6 border">

            <div className="flex justify-end mb-3 gap-2">
              <button
                onClick={handleEdit}
                className="px-3 py-1 text-sm bg-yellow-400 text-white rounded"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded"
              >
                Delete
              </button>
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
              dangerouslySetInnerHTML={{ __html: policy.description }}
            />
          </div>
        )}

        {/* ✅ Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold">
            {isEditing ? "Edit Privacy Policy" : "Add Privacy Policy"}
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
            {isEditing ? "Update Content" : "Add Content"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPolicy;