import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiEdit2, FiEye } from "react-icons/fi";
import ViewModal from "../../viewmodel/ViewModal";


const TourTable = ({ hotels, onAdd, onEdit, onDelete, onView }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const [search, setSearch] = useState({
    title: "",
    category: "",
  });


  const itemsPerPage = 7;
  const goToForm = () => {
    navigate("/tour-form"); // ✅ redirect to login
  };

  // ✅ FILTER (UPDATED)
  const filteredData = hotels.filter((tour) =>
    tour.title.toLowerCase().includes(search.title.toLowerCase()) &&
    tour.category.toLowerCase().includes(search.category.toLowerCase())
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const startItem = totalItems === 0 ? 0 : startIndex + 1;
  const endItem = Math.min(startIndex + itemsPerPage, totalItems);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [totalPages]);

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
            <h2 className="title">Tour Manager</h2>
            <p className="subtitle">Manage your tour listings</p>
          </div>

          <button className="btn-primary-packages cursor-pointer" onClick={onAdd}>
            Add New Tour
          </button>

          {/* <button className="btn-primary-packages" onClick={goToForm}>
          Add New Tour
        </button> */}
        </div>

        {/* SEARCH */}
        <div className="flex gap-3 mb-0">
          <input
            placeholder="Search by Title"
            value={search.title}
            onChange={(e) =>
              setSearch({ ...search, title: e.target.value })
            }
            className="input"
          />

          <select
            value={search.category}
            onChange={(e) =>
              setSearch({ ...search, category: e.target.value })
            }
            className="input"
          >
            <option value="">All Categories</option>
            <option>Domestic</option>
            <option>International</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr className="thead-row">
                <th className="th">Tour Detail</th>
                <th className="th">Category</th>
                <th className="th">Amenities</th>
                <th className="th">Pricing</th>
                <th className="th">Status</th>
                <th className="th">Actions</th>
              </tr>
            </thead>

            <tbody className="tbody">
              {currentData.map((tour) => (
                <tr key={tour.id} className="tr group">

                  {/* TOUR DETAIL */}
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={tour.images?.[0]}
                        className="w-16 h-16 object-cover rounded"
                      />

                      <div>
                        <h3 className="font-semibold text-sm">
                          {tour.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {tour.description}
                        </p>
                      </div>
                    </div>
                  </td>
                 
                  <td className="td">{tour.category}</td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      {tour.features?.map((f) => (
                        <span
                          key={f.id}
                          className="flex items-center gap-1 bg-red-100 px-2 py-1 rounded text-xs"
                        >
                          {f.icon}
                          {f.label}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="td">₹{tour.price}</td>

                  {/* ✅ STATUS FROM JSON */}
                  <td className="td">
                    <span
                      className={
                        tour.status === "Active"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }
                    >
                      {tour.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td>
                    <div className="flex th gap-2 opacity-30 hover:opacity-100 transition">

                      {/* VIEW */}
                      <button
                        onClick={() => onView(tour)}
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
                        onClick={() => onEdit(tour)}
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
                        onClick={() => handleDeleteClick(tour.id)}
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

              <div className="text-sm text-gray-600">
                Showing {startItem} - {endItem} of {totalItems}
              </div>

              <div className="flex items-center gap-2">

                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1  rounded disabled:opacity-50"
                >
                  <FaChevronLeft />
                </button>

                {getPageNumbers().map((page, i) =>
                  page === "..." ? (
                    <span key={i}>...</span>
                  ) : (
                    <button
                      key={i}
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

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1  rounded disabled:opacity-50"
                >
                  <FaChevronRight />
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

export default TourTable;