import React, { useRef, useState, useEffect } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../components/ui/BackButton";


const BlogForm = ({ onSave, editData, onCancel ,errors = {}}) => {
  const editorRef = useRef();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: "",
    description: "",
  });

  const { id } = useParams();

  // 👉 PREFILL (EDIT MODE)
  useEffect(() => {
    if (editData) {
      setFormData(editData);

      if (editorRef.current) {
        editorRef.current.innerHTML = editData.description || "";
      }
    }
  }, [editData]);

  // FORMAT TEXT
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  // LINK
  const addLink = () => {
    const url = prompt("Enter URL");
    if (url) formatText("createLink", url);
  };

  // IMAGE INSIDE EDITOR
  const addImageToEditor = () => {
    const url = prompt("Enter Image URL");
    if (url) formatText("insertImage", url);
  };

  // FEATURED IMAGE UPLOAD
  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const url = URL.createObjectURL(file);
  //     setFormData({ ...formData, image: url });
  //   }
  // };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        image: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  // SAVE CONTENT
  const handleContentChange = () => {
    setFormData((prev) => ({
      ...prev,
      description: editorRef.current.innerHTML,
    }));
  };

  // 👉 PUBLISH (ADD + EDIT)
  // const handlePublish = () => {
  //   const contentHTML = editorRef.current.innerHTML;

  //   // 👉 Convert HTML → Plain Text
  //   const tempDiv = document.createElement("div");
  //   tempDiv.innerHTML = contentHTML;
  //   const plainText = tempDiv.innerText;

  //   // 👉 Take first 120 characters as description
  //   const description = plainText.substring(0, 120) + "...";

  //   const finalData = {
  //     ...formData,
  //     description: contentHTML,
  //     description, // ✅ ADDED
  //     id: editData?.id,
  //   };

  //   onSave(finalData);
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handlePublish = () => {

    const contentHTML = editorRef.current.innerHTML;

    const finalData = {
      title: formData.title,
      category: formData.category,
      image: formData.image,
      description: contentHTML,
      id: editData?.id,
    };

    onSave(finalData);
  };

  return (
    <main className="w-full">
      <div className="page-container">

        {/* HEADER */}


        <div className="block-grid">
          <section className="block-left">

            <div className="mb-6 flex items-center justify-start gap-3">
              <BackButton
                // label="Back to Blogs"
                to="/blogs"
                className="bg-primary text-white cursor-pointer"
              />
              <div>
                <h1 className="text-xl font-bold">
                  {id ? "Edit Blog" : "Add New Blog"}
                </h1>
                <p className="text-sm text-gray-500">
                  {id
                    ? "Update your blog details below"
                    : "Create a new blog article"}
                </p>
              </div>
            </div>

            <div className="block-card bg-surface-container-lowest border-outline-variant/10">

              <div className="block-form">

                {/* TITLE */}
                <div>
                  <label className="block-label">Article Title</label>
                  <input
                    className="block-input form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter title..."
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title[0]}
                    </p>
                  )}
                </div>
                 <div>
                  <label className="block-label">Article Category</label>
                  {/* <input
                    className="block-input form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="Enter title..."
                  /> */}
                   <select
                    name="category"
                    value={formData.category || ""}
                    onChange={handleChange}
                    className="form-input w-full px-4 py-3 rounded-lg bg-surface-container-low"
                  >
                    <option value="">Select Category</option>
                    <option value="Travel-tips">Travel-tips</option>
                    <option value="Food">Food</option>
                    <option value="Guide">Guide</option>
                    <option value="History">History</option>
                  </select>
                </div>

                {/* FEATURED IMAGE */}
                <div>
                  <label className="block-label">{id ? "Update Image" : "Upload Image"}</label>

                  <label className="group relative flex items-center justify-center bg-surface-container-low border-2 border-gray-300 border-dashed rounded-xl h-[250px] w-full cursor-pointer overflow-hidden">

                    <img
                      // src={
                      //   formData.image ||
                      //   "https://lh3.googleusercontent.com/aida-public/AB6AXuA3WQlX_leJ_Ty8fktKfNtPNRlJrGOYIXZgE9gMd4b5NOF1WyC2nfC9TfBE66s2kU1NuA1UOup8_2CVfJUSGOhPd777c3yNupZJewuorQuhDMbaVOBuCn-GbSOzQzvehmLGPtK5Zzb3Ol5qkoyiVzfX4YrciuCEOceO89MduUCopYVr5ftUEa24BFA5hAToAN9kh13qYssgbYLEMYM48s7o9dSJD4JUxdVsfAS0KRPDP1diEmgpsRM1e80ukOIRcfVt2YyUEj6J5xs"
                      // }
                      src={formData.preview || formData.image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuA3WQlX_leJ_Ty8fktKfNtPNRlJrGOYIXZgE9gMd4b5NOF1WyC2nfC9TfBE66s2kU1NuA1UOup8_2CVfJUSGOhPd777c3yNupZJewuorQuhDMbaVOBuCn-GbSOzQzvehmLGPtK5Zzb3Ol5qkoyiVzfX4YrciuCEOceO89MduUCopYVr5ftUEa24BFA5hAToAN9kh13qYssgbYLEMYM48s7o9dSJD4JUxdVsfAS0KRPDP1diEmgpsRM1e80ukOIRcfVt2YyUEj6J5xs"}
                      alt="featured"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />

                    {/* Overlay text (optional) */}
                    {!formData.image && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 text-white">
                        <span className="text-white text-3xl"><IoCloudUploadOutline /></span>
                        <div className="font-semibold text-2xl">
                          Click to upload
                        </div>
                      </div>
                    )}

                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>

                {/* EDITOR */}
                 <label className="block-label">Description</label>
                <div className="bg-surface-container-low rounded-xl overflow-hidden border border-gray-300">

                  {/* TOOLBAR */}
                  <div className="flex items-center gap-1 p-2 bg-surface-container border-b border-gray-300">

                    <button onClick={() => formatText("bold")} className="p-2">
                      <b>B</b>
                    </button>

                    <button onClick={() => formatText("italic")} className="p-2">
                      <i>I</i>
                    </button>

                    <button
                      onClick={() => formatText("insertUnorderedList")}
                      className="p-2"
                    >
                      •
                    </button>

                    <button onClick={addLink} className="p-2">🔗</button>

                    <button onClick={addImageToEditor} className="p-2">🖼️</button>

                    <button
                      onClick={() => formatText("formatBlock", "blockquote")}
                      className="p-2"
                    >
                      ❝ ❞
                    </button>

                  </div>

                  {/* EDITABLE AREA */}
                  <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleContentChange}
                    className="w-full p-6 min-h-[300px] outline-none"
                    suppressContentEditableWarning={true}
                    data-placeholder="Begin your journey here..."
                  ></div>

                </div>
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.description[0]}
                      </p>
                    )}
                {/* FOOTER */}
                <div className="block-footer">


                  <button
                    onClick={handlePublish}
                    className="bg-primary text-white px-6 py-3 rounded-lg font-semibold cursor-pointer"
                  >
                    {id ? "Update Article" : "Publish Article"}
                  </button>

                  <button
                    onClick={onCancel}
                    className="px-6 py-3 rounded-lg font-semibold bg-gray-200 max-w-40.5 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default BlogForm;