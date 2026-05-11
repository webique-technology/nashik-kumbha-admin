import React, { useState, useEffect } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
const VehiclesTable = ({ hotels, onAdd, onEdit, onDelete }) => {
  // 👉 State
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState({
    name: "",
    location: "",
    category: "",
  });
  const itemsPerPage = 7;

  // 👉 Use blogs OR fallback dummy
  const filteredData = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(search.name.toLowerCase()) &&
    hotel.location.toLowerCase().includes(search.location.toLowerCase()) &&
    hotel.category.toLowerCase().includes(search.category.toLowerCase())
  );

  const data = filteredData;
  // 👉 Pagination logic
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentData = data.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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

  return (
    <div className="page-container">

      {/* HEADER */}
      <div className="header">
        <div>
          <h2 className="title text-on-surface">Hotel Manager</h2>
          <p className="subtitle text-on-surface-variant">Curate and refine your editorial stories for the world.</p>
        </div>
        <button className="btn-primary-packages" onClick={onAdd}>
          Add New Hotel
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <input
          placeholder="Search by Name"
          value={search.name}
          onChange={(e) =>
            setSearch({ ...search, name: e.target.value })
          }
          className="input"
        />

        <select
          value={search.location}
          onChange={(e) =>
            setSearch({ ...search, location: e.target.value })
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
          value={search.category}
          onChange={(e) =>
            setSearch({ ...search, category: e.target.value })
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

              <th className="th">Vehicle Details</th>

              <th className="th">Category</th>
              <th className="th">Price</th>
              <th className="th">Status</th>
              <th className="th">Actions</th>
            </tr>
          </thead>

          <tbody className="tbody">
            {currentData.map((hotel) => (


              <tr className="thead-row tr group bg-white" key={hotel.id}>
                <td className="p-3">
                  <div className="flex items-center gap-3">

                    {/* Image */}
                    <img
                      src={hotel.images}
                      alt={hotel.name}
                      className="w-16 h-16 object-cover rounded"
                    />

                    {/* Title + Description */}
       

                  </div>
                </td>

                <td className="td">{hotel.category}</td>
                <td className="td">{hotel.price}</td>
                <td className="td">
                  <span
                    className={
                      hotel.status === "AVAILABLE"
                        ? "text-green-600"
                        : hotel.status === "RENTED"
                          ? "text-red-500"
                          : "text-yellow-500"
                    }
                  >
                    {hotel.status}
                  </span>
                </td>
                








                <td>
                  <div className="flex th gap-2 opacity-30 group-hover:opacity-100 transition">
                    <button
                      className="cursor-pointer text-gray-500 hover:text-blue-700"
                      onClick={() => onEdit(hotel)}
                    >
                      <FiEdit2 size={18} />
                    </button>

                    <button
                      className="cursor-pointer text-gray-500 hover:text-red-700"
                      onClick={() => onDelete(hotel.id)}
                    >
                      <FiTrash2 size={18} />
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
  );
};

export default VehiclesTable;