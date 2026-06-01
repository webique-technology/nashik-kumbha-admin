import React, { useState,useEffect } from "react";
import BlogTable from "./SliderTable";
import SliderForm from "./SliderForm";
import img1 from '../../../assets/images/hoelOne.jpg'
import ViewModal from "../../../viewmodel/ViewModal";
import api from "../../../services/axiosInstance";
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
    <SliderForm
      onSave={handleSave}
      editData={editData}
      onCancel={() => navigate("/dashboard/home-page-settings")}
    />
  );
};

const SliderManager = () => {

  const [viewModal, setViewModal] = useState(false);
    const [selectedTour, setSelectedTour] = useState(null);
    const handleView = (tour) => {
      setSelectedTour(tour);
      setViewModal(true);
    };

  const [sliders, setSliders] = useState([]);
  // const [page, setPage] = useState("table");
  const [editData, setEditData] = useState(null);
  const navigate = useNavigate();

    const fetchsliders = async () => {
    try {
        const response = await api.get("/home-page-slider-settings");

        console.log("home-page-slider-settings:", response.data);

        setSliders(response.data.data.data);

      } catch (error) {
        console.log("Slider fetch error:", error);
      }
    };

    useEffect(() => {
      fetchsliders();
    }, []);

  // const [sliders, setsliders] = useState(initialsliders);
  
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
//     setsliders((prev) =>
//       prev.map((item) => (item.id === data.id ? data : item))
//     );
//   } else {
//     // ADD (with fallback image)
//     setsliders((prev) => [
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
        formData.append("description", data.description);

        if (data.image instanceof File) {
          formData.append("image", data.image);
        }

        let response;
        // UPDATE
        if (editData) {

          response = await api.post(
            `/home-page-settings/${editData.id}`,
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
            "/home-page-settings",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }

        console.log("response:", response.data);

        // REFRESH sliders
        fetchsliders();

        // BACK TO TABLE
        // setPage("table");
        navigate("/dashboard/sliders");

        setEditData(null);

      } catch (error) {

        console.log("save error:", error);

      }
  };

  const fetchSingleSlider = async (id) => {
    try {
      const response = await api.get(`/home-page-settings/${id}`);
      setEditData(response.data.data);
    } catch (error) {
      console.log("single Slider error:", error);
    }
  };
  // EDIT
  // const handleEdit = (blog) => {
  //   setEditData(blog);
  //   setPage("form");
  // };
  
  const handleEdit = async (blog) => {
    await fetchSingleBlog(blog.id);
    navigate(`/dashboard/sliders/edit/${blog.id}`);
  };

  // DELETE (WORKS ON DUMMY TOO NOW)
  // const handleDelete = (id) => {
  //   setsliders((prev) => prev.filter((b) => b.id !== id));
  // };
  
  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/home-page-settings/${id}`);
      console.log("delete response:", response.data);
      fetchsliders();
    } catch (error) {
      console.log("delete error:", error);
    }
  };

  // return (
  //   <div>
  //     {page === "table" ? (
  //       // <BlogTable
  //       //   sliders={sliders}
  //       //   // onAdd={() => setPage("form")}
  //       //   onAdd={() => navigate("/dashboard/sliders/add")}
  //       //   onEdit={handleEdit}
  //       //   onDelete={handleDelete}
  //       //   setsliders={setsliders}
  //       //   onView={handleView}
  //       // />
  //       <BlogTable
  //         sliders={sliders}
  //         onAdd={() => navigate("/dashboard/sliders/add")}
  //         onEdit={handleEdit}
  //         onDelete={handleDelete}
  //         setsliders={setsliders}
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
              sliders={sliders}
              onAdd={() => navigate("/dashboard/home-page-slider-settings/add")}
              onEdit={handleEdit}
              onDelete={handleDelete}
              setsliders={setSliders}
              onView={handleView}
            />
          }
        />

        {/* ADD */}
        <Route
          path="/add"
          element={
            <SliderForm
              onSave={handleSave}
              onCancel={() => navigate("/dashboard/home-page-slider-settings")}
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
        title="Slider Details"
      />

    </div>
  );
};

export default SliderManager;