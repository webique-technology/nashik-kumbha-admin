import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FiTrash2, FiEdit2, FiEye } from "react-icons/fi";

const TourTable = ({ tourData = [], onAdd, onEdit, onDelete, loading, error, onView, pagination, fetchTours,searchTitle ,setSearchTitle}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  // const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState({ title: "", category: "" });

  // const safeTourData = Array.isArray(tourData) ? tourData : [];


  // FILTER DATA
  // const filteredData = safeTourData.filter((tour) => {
  //   const titleMatch =
  //     tour?.title?.toLowerCase().includes(search.title.toLowerCase()) ?? false;
  //   const categoryMatch =
  //     search.category === "" ? true : tour?.category === search.category;
  //   return titleMatch && categoryMatch;
  // });


  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (!selectedId) return;
    onDelete(selectedId);
    setShowModal(false);
    setSelectedId(null);
  };

  return (
    <div className="page-container bg-transparent">
      <div className="inner-page-container">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold">Tour Manager</h2>
            <p className="text-gray-500">Manage your tour listings</p>
          </div>
          <button
            className="bg-primary text-white px-4 py-2 rounded cursor-pointer"
            onClick={onAdd}
          >
            Add New Tour
          </button>
        </div>

        {/* SEARCH */}
        <div className="flex gap-3 mb-5">
          <input
            type="text"
            placeholder="Search by Title"
            // value={search.title}
            value={searchTitle}
            onChange={(e) =>
              // setSearch((prev) => ({ ...prev, title: e.target.value }))
               setSearchTitle(e.target.value)
            }
            className="border p-2 rounded w-full"
          />
          {/* <select
            value={search.category}
            onChange={(e) =>
              setSearch((prev) => ({ ...prev, category: e.target.value }))
            }
            className="border p-2 rounded"
          >
            <option value="">All Categories</option>
            <option value="Religious Tourism">Religious Tourism</option>
            <option value="Eco-Tourism">Eco-Tourism</option>
            <option value="Culinary Tourism">Culinary Tourism</option>
          </select> */}
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-3 text-left">Tour Detail</th>
                {/* <th className="p-3 text-left">Category</th> */}
                <th className="p-3 text-left">Inclusions</th>
                <th className="p-3 text-left">Pricing</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tourData.length > 0 ? (
                tourData.map((tour, index) => (
                  <tr
                    key={tour.id || index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3 w-4/12">
                      <div className="flex items-center gap-3">
                        <img
                          src={tour.image_url}
                          alt={tour.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-semibold text-sm">
                            {tour.title}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {tour.description?.length > 70
                              ? `${tour.description.slice(0, 70)}...`
                              : tour.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* <td className="p-3">{tour.category}</td> */}
                    <td className="p-3">
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(tour?.inclusions) &&
                          tour.inclusions.map((item, i) => (
                            <span
                              key={i}
                              className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs"
                            >
                              {typeof item === "string"
                                ? item
                                : item?.label || item}
                            </span>
                          ))}
                      </div>
                    </td>
                    <td className="p-3 font-medium">
                      ₹{tour.base_price ? tour.base_price : tour.base_price}
                    </td>
                    <td className="p-3">
                      <span
                        className={
                          tour?.status?.toLowerCase() === "active"
                            ? "text-green-600 font-medium"
                            : "text-red-600 font-medium"
                        }
                      >
                        {tour.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onView(tour)}
                          className="p-1 hover:text-blue-600 cursor-pointer"
                        >
                          <FiEye size={18} />
                        </button>
                        <button
                          onClick={() => onEdit(tour)}
                          className="p-1 hover:text-green-600 cursor-pointer"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(tour.id)}
                          className="p-1 hover:text-red-600 cursor-pointer"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-10 text-gray-400">
                    {loading
                      ? "Loading Tours..."
                      : error
                        ? error
                        : "No Tours Found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION CONTROLS */}
        {pagination?.last_page > 1 && (
            <div className="flex justify-between items-center mt-5">
              <div className="text-sm text-gray-600">
                Showing {pagination.from} - {pagination.to} of{" "}
                {pagination.total}
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={!pagination.prev_page_url}
                  onClick={() =>
                    fetchTours(pagination.current_page - 1,searchTitle)
                  }
                  className="p-2 border rounded disabled:opacity-30"
                >
                  <FaChevronLeft />
                </button>

                {Array.from(
                  { length: pagination.last_page },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => fetchTours(page, searchTitle)}
                    className={`px-3 py-1 border rounded ${
                      page === pagination.current_page
                        ? "bg-primary text-white"
                        : ""
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={!pagination.next_page_url}
                  onClick={() =>
                    fetchTours(pagination.current_page + 1,searchTitle)
                  }
                  className="p-2 border rounded disabled:opacity-30"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[320px] text-center">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete?</h3>
            <p className="text-sm text-gray-500 mb-5">
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary"
              >
                Delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
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
