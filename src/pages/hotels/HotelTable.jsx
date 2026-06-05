import React, { useState, useEffect } from "react";
import { FiTrash2, FiEdit2, FiEye } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";


const HotelTable = ({ hotels, onAdd, onEdit, onDelete, setBlogs, onView,pagination,fetchHotels,searchTitle,setSearchTitle,searchCategory,setSearchCategory ,searchLocation,setSearchLocation}) => {
  // 👉 State
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
 
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
            <h2 className="title text-on-surface">Hotel Manager</h2>
            <p className="subtitle text-on-surface-variant">Curate and refine your editorial stories for the world.</p>
          </div>
          <button className="btn-primary-packages cursor-pointer" onClick={onAdd}>
            Add New Hotel
          </button>
        </div>

        <div className="flex gap-3 ">
          <input
            placeholder="Search by Name"
            value={searchTitle}
            onChange={(e) =>
              setSearchTitle(e.target.value)
            }
            className="input"
          />

          <select
            value={searchLocation}
            onChange={(e) =>
              setSearchLocation(e.target.value)
            }
            className="input"
          >
            <option value="">All Locations</option>
            <option>Mumbai</option>
            <option>Delhi</option>
            <option>Pune</option>
            <option>Goa</option>
            <option>Nashik</option>
          </select>

          <select
            value={searchCategory}
            onChange={(e) =>
             setSearchCategory(e.target.value)
            }
            className="input"
          >
            <option value="">All Categories</option>
            <option>Luxury</option>
            <option>Premium</option>
            <option>Mid-Range</option>
            <option>Budget</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="table-wrapper bg-surface-container-lowest">
          <table className="table">
            <thead>
              <tr className="thead-row">

                <th className="th">Image</th>
                <th className="th">Food Category</th>
                <th className="th">Category</th>
                <th className="th">Rating</th>
                <th className="th">Location</th>
                <th className="th">Features</th>
                <th className="th">Price</th>
                <th className="th">Actions</th>
              </tr>
            </thead>

            <tbody className="tbody">
              {hotels.map((hotel) => (


                <tr className="tr group" key={hotel.id}>
                  <td className="p-3 w-3/12">
                    <div className="flex items-center gap-3">

                      {/* Image */}
                      <img
                        src={hotel.image_url}
                        alt={hotel.name}
                        className="w-16 h-16 object-cover rounded"
                      />

                      {/* Title + Description */}
                      <div>
                        <h3 className="font-semibold text-sm">{hotel.title}</h3>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {hotel.description?.length > 70
                            ? `${hotel.description.slice(0, 70)}...`
                            : hotel.description}
                        </p>
                      </div>

                    </div>
                  </td>
                  <td className="td">{hotel.meals}</td>
                  <td className="td">{hotel.category}</td>
                  <td className="td">{hotel.rating} ⭐</td>
                  <td className="td">{hotel.location}</td>

                  {/* <td className="td">
                    {hotel.features.wifi && "WiFi "}
                    {hotel.features.parking && "Parking "}
                    {hotel.features.pool && "Pool "}
                    {hotel.features.ac && "AC "}
                  </td> */}

                  <td>
                    <div className="flex flex-wrap gap-2">
                      {hotel.features?.map((f, index) => (
                        <span
                          key={`${f.id}-${index}`}
                          className="flex items-center gap-1 bg-red-100 px-2 py-1 rounded text-xs"
                        >
                          {f.icon}
                          {f}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="td">₹{hotel.base_price}</td>

                  <td>
                    <div className="flex th gap-2 opacity-30 hover:opacity-100 transition">

                      {/* VIEW */}
                      <button
                        onClick={() => onView(hotel)}
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
                        onClick={() => onEdit(hotel)}
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
                        onClick={() => handleDeleteClick(hotel.id)}
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
        {pagination?.last_page > 1 && (
            <div className="flex justify-between items-center mt-5">
              <div className="text-sm text-gray-600">
                Showing {pagination.from} - {pagination.to} of {pagination.total}
              </div>

              <div className="flex items-center gap-2">

                {/* Previous */}
                <button
                  onClick={() =>
                    fetchHotels(
                      pagination.current_page - 1,
                      searchTitle,
                      searchCategory,searchLocation
                    )
                  }
                  disabled={!pagination.prev_page_url}
                  className="p-2 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft />
                </button>

                {/* Page Numbers */}
                {Array.from(
                  { length: pagination.last_page || 0 },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() =>
                      fetchHotels(
                        page,
                        searchTitle,
                        searchCategory,searchLocation
                      )
                    }
                    className={`px-3 py-1 border rounded ${
                      pagination.current_page === page
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next */}
                <button
                  onClick={() =>
                    fetchHotels(
                      pagination.current_page + 1,
                      searchTitle,
                      searchCategory,searchLocation
                    )
                  }
                  disabled={!pagination.next_page_url}
                  className="p-2 rounded disabled:opacity-30 disabled:cursor-not-allowed"
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

export default HotelTable;