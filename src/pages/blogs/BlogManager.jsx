import React, { useState } from "react";
import BlogTable from "./BlogTable";
import BlogForm from "./BlogForm";
import img1 from '../../assets/images/hoelOne.jpg'
import ViewModal from "../../viewmodel/ViewModal";
const BlogManager = () => {

  const [viewModal, setViewModal] = useState(false);
    const [selectedTour, setSelectedTour] = useState(null);
    const handleView = (tour) => {
      setSelectedTour(tour);
      setViewModal(true);
    };

  // 👉 Dummy JSON (NOW REAL STATE)
  const initialBlogs = [
    {
      id: 1,
      title: "Travel in Paris",
      description: "Explore the beauty of Paris streets...",
      image: img1,
      status: true,
      content: "<p>Paris blog...</p>",
    },
    {
      id: 2,
      title: "Mountains of Alps",
      description: "A journey through snowy mountains...",
      image: "https://picsum.photos/200?2",
      status: false,
      content: "<p>Alps blog...</p>",
    },
    {
      id: 3,
      title: "Goa Beaches",
      description: "Sun, sand and sea vibes...",
      image: "https://picsum.photos/200?3",
      status: true,
      content: "<p>Goa blog...</p>",
    },
    {
      id: 4,
      title: "Desert Safari",
      description: "Adventure in the desert...",
      image: "https://picsum.photos/200?4",
      status: true,
      content: "<p>Desert blog...</p>",
    },
    {
      id: 5,
      title: "Kerala Backwaters",
      description: "Peaceful houseboat experience...",
      image: "https://picsum.photos/200?5",
      status: false,
      content: "<p>Kerala blog...</p>",
    },
    {
      id: 6,
      title: "Tokyo Nights",
      description: "City lights and culture...",
      image: "https://picsum.photos/200?6",
      status: true,
      content: "<p>Tokyo blog...</p>",
    },
    {
      id: 7,
      title: "Swiss Villages",
      description: "Charming European villages...",
      image: "https://picsum.photos/200?7",
      status: true,
      content: "<p>Swiss blog...</p>",
    },
    {
      id: 8,
      title: "New York Life",
      description: "Fast life in NYC...",
      image: "https://picsum.photos/200?8",
      status: false,
      content: "<p>NY blog...</p>",
    },
  ];





  const [blogs, setBlogs] = useState(initialBlogs);
  const [page, setPage] = useState("table");
  const [editData, setEditData] = useState(null);



  
const blogFields = [
  { key: "title", label: "Title" },

  { key: "description", label: "Description" },

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

  // 👉 ADD / EDIT
const handleSave = (data) => {
  const placeholderImage = "https://picsum.photos/80"; // small image

  if (editData) {
    // UPDATE
    setBlogs((prev) =>
      prev.map((item) => (item.id === data.id ? data : item))
    );
  } else {
    // ADD (with fallback image)
    setBlogs((prev) => [
      {
        ...data,
        id: Date.now(),
        status: true,
        image: data.image || placeholderImage, // ✅ fix
      },
      ...prev, // ✅ also fixing 2nd requirement here
    ]);
  }

  setPage("table");
  setEditData(null);
};

  // EDIT
  const handleEdit = (blog) => {
    setEditData(blog);
    setPage("form");
  };

  // DELETE (WORKS ON DUMMY TOO NOW)
  const handleDelete = (id) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div>

      {page === "table" ? (
        <BlogTable
          blogs={blogs}
          onAdd={() => setPage("form")}
          onEdit={handleEdit}
          onDelete={handleDelete}
          setBlogs={setBlogs}
          onView={handleView}
        />
      ) : (
        <BlogForm
          onSave={handleSave}
          editData={editData}
          onCancel={() => setPage("table")}
        />
      )}
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