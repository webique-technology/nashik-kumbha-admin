import React, { useState,useEffect } from "react";
import BlogTable from "./BlogTable";
import BlogForm from "./BlogForm";
import img1 from '../../assets/images/hoelOne.jpg'
import ViewModal from "../../viewmodel/ViewModal";
import api from "../../services/axiosInstance";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";


const EditBlogWrapper = ({ fetchSingleBlog, editData, handleSave, navigate }) => {
  const { id } = useParams();
  useEffect(() => {
    if (id && !editData) {
      fetchSingleBlog(id);
    }
  }, [id]);
  // WAIT UNTIL DATA LOADS
  if (!editData) {
    return <div className="p-5">Loading...</div>;
  }
  return (
    <BlogForm
      onSave={handleSave}
      editData={editData}
      onCancel={() => navigate("/dashboard/blogs")}
    />
  );
};

const BlogManager = () => {

  const [viewModal, setViewModal] = useState(false);
    const [selectedTour, setSelectedTour] = useState(null);
    const handleView = (tour) => {
      setSelectedTour(tour);
      setViewModal(true);
    };

  const [blogs, setBlogs] = useState([]);
  // const [page, setPage] = useState("table");
  const [editData, setEditData] = useState(null);
  const navigate = useNavigate();

    const fetchBlogs = async () => {
    try {
        const response = await api.get("/blogs");

        console.log("blogs:", response.data);

        setBlogs(response.data.data.data);

      } catch (error) {
        console.log("Blog fetch error:", error);
      }
    };

    useEffect(() => {
      fetchBlogs();
    }, []);

  // const [blogs, setBlogs] = useState(initialBlogs);
  
const blogFields = [
  { key: "title", label: "Title" },
  // { key: "description", label: "Description" },

  {
    key: "description",
    label: "Description",
    render: (value) => (
      <div
        className="prose max-w-full text-sm"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    ),
  },

  // {
  //   key: "status",
  //   label: "Status",
  //   render: (value) => (
  //     <span className={value ? "text-green-600" : "text-red-600"}>
  //       {value ? "Active" : "Inactive"}
  //     </span>
  //   ),
  // },

  // {
  //   key: "content",
  //   label: "Content",
  //   render: (value) => (
  //     <div
  //       className="prose text-sm"
  //       dangerouslySetInnerHTML={{ __html: value }}
  //     />
  //   ),
  // },
];

//   // 👉 ADD / EDIT
// const handleSave = (data) => {
//   const placeholderImage = "https://picsum.photos/80"; // small image

//   if (editData) {
//     // UPDATE
//     setBlogs((prev) =>
//       prev.map((item) => (item.id === data.id ? data : item))
//     );
//   } else {
//     // ADD (with fallback image)
//     setBlogs((prev) => [
//       {
//         ...data,
//         id: Date.now(),
//         status: true,
//         image: data.image || placeholderImage, // ✅ fix
//       },
//       ...prev, // ✅ also fixing 2nd requirement here
//     ]);
//   }

//   setPage("table");
//   setEditData(null);
// };

  const handleSave = async (data) => {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("category", data.category);
        formData.append("description", data.description);

        if (data.image instanceof File) {
          formData.append("image", data.image);
        }

        let response;
        // UPDATE
        if (editData) {

          response = await api.post(
            `/blogs/${editData.id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

        } else {
          // ADD
          response = await api.post(
            "/blogs",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }

        console.log("response:", response.data);

        // REFRESH BLOGS
        fetchBlogs();

        // BACK TO TABLE
        // setPage("table");
        navigate("/dashboard/blogs");

        setEditData(null);

      } catch (error) {

        console.log("save error:", error);

      }
  };

  const fetchSingleBlog = async (id) => {
    try {
      const response = await api.get(`/blogs/${id}`);
      setEditData(response.data.data);
    } catch (error) {
      console.log("single blog error:", error);
    }
  };
  // EDIT
  // const handleEdit = (blog) => {
  //   setEditData(blog);
  //   setPage("form");
  // };
  
  const handleEdit = async (blog) => {
    await fetchSingleBlog(blog.id);
    navigate(`/dashboard/blogs/edit/${blog.id}`);
  };

  // DELETE (WORKS ON DUMMY TOO NOW)
  // const handleDelete = (id) => {
  //   setBlogs((prev) => prev.filter((b) => b.id !== id));
  // };
  
  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/blogs/${id}`);
      console.log("delete response:", response.data);
      fetchBlogs();
    } catch (error) {
      console.log("delete error:", error);
    }
  };

  // return (
  //   <div>
  //     {page === "table" ? (
  //       // <BlogTable
  //       //   blogs={blogs}
  //       //   // onAdd={() => setPage("form")}
  //       //   onAdd={() => navigate("/dashboard/blogs/add")}
  //       //   onEdit={handleEdit}
  //       //   onDelete={handleDelete}
  //       //   setBlogs={setBlogs}
  //       //   onView={handleView}
  //       // />
  //       <BlogTable
  //         blogs={blogs}
  //         onAdd={() => navigate("/dashboard/blogs/add")}
  //         onEdit={handleEdit}
  //         onDelete={handleDelete}
  //         setBlogs={setBlogs}
  //         onView={handleView}
  //       />
  //     ) : (
  //       <BlogForm
  //         onSave={handleSave}
  //         editData={editData}
  //         onCancel={() => setPage("table")}
  //       />
  //     )}
  //     <ViewModal
  //       isOpen={viewModal}
  //       onClose={() => setViewModal(false)}
  //       data={selectedTour}
  //       fields={blogFields}
  //       title="Blog Details"
  //     />
  //   </div>
  // );

  return (
    <div>

      <Routes>

        {/* LISTING */}
        <Route
          path="/"
          element={
            <BlogTable
              blogs={blogs}
              onAdd={() => navigate("/dashboard/blogs/add")}
              onEdit={handleEdit}
              onDelete={handleDelete}
              setBlogs={setBlogs}
              onView={handleView}
            />
          }
        />

        {/* ADD */}
        <Route
          path="/add"
          element={
            <BlogForm
              onSave={handleSave}
              onCancel={() => navigate("/dashboard/blogs")}
            />
          }
        />

        {/* EDIT */}
        <Route
          path="/edit/:id"
          element={
            <EditBlogWrapper
              fetchSingleBlog={fetchSingleBlog}
              editData={editData}
              handleSave={handleSave}
              navigate={navigate}
            />
          }
        />

      </Routes>

      <ViewModal
        isOpen={viewModal}
        onClose={() => setViewModal(false)}
        data={selectedTour}
        fields={blogFields}
        title="Blog Details"
      />

    </div>
  );
};

export default BlogManager;