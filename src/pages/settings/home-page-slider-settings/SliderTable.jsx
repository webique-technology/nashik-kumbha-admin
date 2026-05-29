import React, { useState, useEffect } from "react";
import { FiTrash2, FiEdit2, FiEye } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
const SliderTable = ({ sliders, onAdd, onEdit, onDelete, setSliders, onView }) => {



  // 👉 State
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;


  const data = Array.isArray(sliders) ? sliders : [];

  // 👉 Pagination logic
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  // const currentData = data.slice(
  //   startIndex,
  //   startIndex + itemsPerPage  
  // );

  const currentData = Array.isArray(data)
    ? data.slice(startIndex, startIndex + itemsPerPage)
    : [];

  // 👉 Showing text
  const startItem = totalItems === 0 ? 0 : startIndex + 1;
  const endItem = Math.min(startIndex + itemsPerPage, totalItems);

  // 👉 Fix page overflow (after delete)
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [totalPages]);

  // 👉 Smart pagination
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) pages.push("...");

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    onDelete(selectedId);
    setShowModal(false);
    setSelectedId(null);
  };
  return (
    <div className="page-container">
      <div className="inner-page-container">
        {/* HEADER */}
        <div className="header">
          <div>
            <h2 className="title text-on-surface">Slider Manager</h2>
            <p className="subtitle text-on-surface-variant">Create and manage slider with title & Description</p>
          </div>
          <button className="btn-primary-packages cursor-pointer" onClick={onAdd}>
            Add New Slider
          </button>
        </div>

        {/* TABLE */}
        <div className="table-wrapper bg-surface-container-lowest">
          <table className="table">
            <thead>
              <tr className="thead-row">
                <th className="th">Image</th>
                <th className="th">Description</th>
                <th className="th">Actions</th>
              </tr>
            </thead>

            <tbody className="tbody">
              {currentData.map((blog) => (
                <tr className="tr group" key={blog.id}>



                  <td className="p-3">
                    <div className="flex items-center gap-3">

                      {/* Image */}
                      <img className="tour-img" src={blog.image_url} width="50" alt="" />

                      {/* Title + Description */}
                      <div>
                        <h3 className="font-semibold text-sm">{blog.title}</h3>

                      </div>

                    </div>
                  </td>

                  {/* <td className="td">{blog.title}</td> */}

                  {/* <td className="td">{blog.description}</td> */}
                  <td className="td">
                    {(blog.description || "")
                      .replace(/<[^>]+>/g, "")
                      .substring(0, 120)}
                    ...
                  </td>

                  <td>
                    <div className="flex th gap-2 opacity-30 hover:opacity-100 transition">

                      {/* VIEW */}
                      <button
                        onClick={() => onView(blog)}
                        className="relative group/btn p-1 cursor-pointer"
                      >
                        <FiEye size={18} />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1
      opacity-0 group-hover/btn:opacity-100 transition-all duration-200
      bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap
      pointer-events-none">
                          View
                        </span>
                      </button>

                      {/* EDIT */}
                      <button
                        onClick={() => onEdit(blog)}
                        className="relative group/btn p-1 text-gray-500 hover:text-blue-700 cursor-pointer"
                      >
                        <FiEdit2 size={18} />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1
      opacity-0 group-hover/btn:opacity-100 transition-all duration-200
      bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap
      pointer-events-none">
                          Edit
                        </span>
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDeleteClick(blog.id)}
                        className="relative group/btn p-1 text-gray-500 hover:text-red-700 cursor-pointer"
                      >
                        <FiTrash2 size={18} />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1
      opacity-0 group-hover/btn:opacity-100 transition-all duration-200
      bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap
      pointer-events-none">
                          Delete
                        </span>
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="pagination">

              {/* LEFT SIDE */}
              <div className="text-sm text-gray-600">
                Showing {startItem} - {endItem} of {totalItems} tours
              </div>

              {/* RIGHT SIDE */}


              <div className="flex items-center gap-2">

                {/* Prev */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1  rounded disabled:opacity-50"
                >
                  {<FaChevronLeft />}
                </button>



                {getPageNumbers().map((page, index) =>
                  page === "..." ? (
                    <span key={index} className="px-2">...</span>
                  ) : (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 border rounded ${currentPage === page
                        ? "bg-primary text-white"
                        : "bg-secondary border-gray-300 hover:bg-gray-100"
                        }`}
                    >
                      {page}
                    </button>
                  )
                )}

                {/* Next */}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1  rounded disabled:opacity-50"
                >
                  {<FaChevronRight />}
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[300px] text-center">
            <h3 className="text-lg font-semibold mb-4">
              Do you want to delete?
            </h3>

            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-primary text-white rounded"
              >
                Yes
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SliderTable;