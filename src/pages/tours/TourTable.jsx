import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiEdit2, FiEye } from "react-icons/fi";

// Default tourData to [] in props to prevent crashes
const TourTable = ({ tourData = [], onAdd, onEdit, onDelete, loading, error, onView }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState({
    title: "",
    category: "",
  });

  const itemsPerPage = 7;

  // filter Logic with safely checks
  const safeTourData = Array.isArray(tourData) ? tourData : [];
  const filteredData = safeTourData.filter((tour) => {
    const titleMatch =
      tour.title?.toLowerCase().includes(search.title.toLowerCase()) ?? false;

    const categoryMatch =
      tour.category?.toLowerCase().includes(search.category.toLowerCase()) ?? false;

    return titleMatch && categoryMatch;
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const startItem = totalItems === 0 ? 0 : startIndex + 1;
  const endItem = Math.min(startIndex + itemsPerPage, totalItems);

  // Sync page number if data shrinks
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);
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
    <div className="page-container bg-transparent">
      <div className="inner-page-container">
        {/* HEADER */}
        <div className="header flex justify-between items-center mb-6">
          <div>
            <h2 className="title text-xl font-bold">Tour Manager</h2>
            <p className="subtitle text-gray-500">Manage your tour listings</p>
          </div>
          <button className="btn-primary-packages bg-primary text-white px-4 py-2 rounded cursor-pointer" onClick={onAdd}>
            Add New Tour
          </button>
        </div>

        {/* SEARCH */}
        <div className="flex gap-3 mb-4">
          <input
            placeholder="Search by Title"
            value={search.title}
            onChange={(e) => setSearch({ ...search, title: e.target.value })}
            className="input border p-2 rounded w-full"
          />
          <select
            value={search.category}
            onChange={(e) => setSearch({ ...search, category: e.target.value })}
            className="input border p-2 rounded"
          >
            <option value="">All Categories</option>
            <option value="Domestic">Domestic</option>
            <option value="International">International</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="table-wrapper overflow-x-auto">
          <table className="table w-full border-collapse">
            <thead>
              <tr className="thead-row bg-gray-50 border-b">
                <th className="th p-3 text-left">Tour Detail</th>
                <th className="th p-3 text-left">Category</th>
                <th className="th p-3 text-left">Amenities</th>
                <th className="th p-3 text-left">Pricing</th>
                <th className="th p-3 text-left">Status</th>
                <th className="th p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {currentData.length > 0 ? (
                currentData.map((tour) => (
                  <tr key={tour.id} className="tr border-b hover:bg-gray-50 transition">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={tour.main_banner?.[0] || "https://via.placeholder.com/64"}
                          alt={tour.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-semibold text-sm">{tour.title}</h3>
                          <p className="text-xs text-gray-500 line-clamp-2">{tour.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="td p-3">{tour.category}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-2">
                        {tour.inclusions?.map((f) => (
                          <span key={f + 1} className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                            {f}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="td p-3">₹{tour.offer_price ? tour.offer_price : tour.base_price}</td>
                    <td className="td p-3">
                      <span className={tour.status === "Active" ? "text-green-600 font-medium" : "text-yellow-600 font-medium"}>
                        {tour.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2 opacity-70 hover:opacity-100 transition">
                        <button onClick={() => onView(tour)} className="p-1 hover:text-blue-600"><FiEye size={18} /></button>
                        <button onClick={() => onEdit(tour)} className="p-1 hover:text-blue-600"><FiEdit2 size={18} /></button>
                        <button onClick={() => handleDeleteClick(tour.id)} className="p-1 hover:text-red-600"><FiTrash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-10 text-gray-400">
                    {loading ? "Tour Packages Loading..." : ""}
                    {tourData == [0] ? error : ""}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="pagination flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              Showing {startItem} - {endItem} of {totalItems}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border rounded disabled:opacity-30"
              >
                <FaChevronLeft />
              </button>
              {getPageNumbers().map((page, i) => (
                <button
                  key={i}
                  disabled={page === "..."}
                  onClick={() => typeof page === "number" && setCurrentPage(page)}
                  className={`px-3 py-1 border rounded ${currentPage === page ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 border rounded disabled:opacity-30"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* DELETE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[300px] text-center">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete?</h3>
            <div className="flex justify-center gap-4">
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourTable;