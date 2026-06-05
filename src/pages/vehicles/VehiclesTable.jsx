import React, { useState, useEffect } from "react";
import { FiTrash2, FiEdit2, FiEye } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const API_URL = import.meta.env.VITE_API_URL;

// const VehiclesTable = ({ hotels, onAdd, onEdit, onDelete, onView }) => {
const VehiclesTable = ({ vehicles, categories, pagination, fetchVehicles, onAdd, onEdit, onDelete, onView ,searchName,setSearchName,searchCategory,setSearchCategory}) => {
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
        <div className="header">
          <div>
            <h2 className="title text-on-surface">Vehicle Manager</h2>
          </div>
          <button className="btn-primary-packages cursor-pointer" onClick={onAdd}>
            Add Vehicle
          </button>
        </div>

        <div className="flex gap-3">
          <input
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) =>
              setSearchName(e.target.value)
            }
            className="input"
          />



          {/* <select
            value={search.category}
            onChange={(e) =>
              setSearch({ ...search, category: e.target.value })
            }
            className="input"
          >
            <option value="">All Categories</option>
            <option>Sedan</option>
            <option>SUV</option>
            <option>Tempo Traveller</option>
          </select> */}

          <select
            value={searchCategory}
            onChange={(e) =>
              setSearchCategory(e.target.value)
            }
            className="input"
          >
            <option value="">All Categories</option>

            {categories?.map((cat) => (
              <option
                key={cat.id}
                value={cat.category}
              >
                {cat.category}
              </option>
            ))}
          </select>
        </div>

        <div className="table-wrapper bg-surface-container-lowest">
          <table className="table">
            <thead>
              <tr className="thead-row">
                <th className="th">Vehicle</th>
                <th className="th">Category</th>
                <th className="th">Price</th>
                <th className="th">Status</th>
                <th className="th">Actions</th>
              </tr>
            </thead>

            <tbody className="tbody">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="tr group">
                  <td className="p-3 w-3/12">
                    <div className="flex items-center gap-3">
                      {/* <img
                        src={
                          vehicle.car_image_url ||              
                          (vehicle.car_image_url && vehicle.imagesl[0]) || 
                          "https://picsum.photos/200"  //
                        }
                        alt={vehicle.name}
                        className="w-16 h-16 object-cover rounded"
                      /> */}
                      <img
                        src={
                          vehicle.car_image_url ? `${API_URL}${vehicle.car_image_url}` : vehicle.images?.[0] ? `${API_URL}${vehicle.images[0]}` : "https://picsum.photos/200"
                        }
                        alt={vehicle.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <div className="font-semibold">{vehicle.name}</div>
                        <div className="text-sm text-gray-500">
                          {vehicle.description?.length > 70
                            ? `${vehicle.description.slice(0, 70)}...`
                            : vehicle.description}
                        </div>




                      </div>
                    </div>
                  </td>

                  <td className="td">{vehicle.category.category}</td>
                  <td className="td">{vehicle.base_price}</td>

                  <td className="td">
                    <span
                      className={
                        vehicle.status === "AVAILABLE"
                          ? "text-green-600"
                          : vehicle.status === "RENTED"
                            ? "text-red-500"
                            : "text-yellow-500"
                      }
                    >
                      {vehicle.status}
                    </span>
                  </td>

                  <td>
                    <div className="flex th gap-2 opacity-30 hover:opacity-100 transition">

                      {/* VIEW */}
                      <button
                        onClick={() => onView(vehicle)}
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
                        onClick={() => onEdit(vehicle)}
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
                        onClick={() => handleDeleteClick(vehicle.id)}
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

         {pagination?.last_page > 1 && (
            <div className="pagination">

              <div className="text-sm text-gray-600">
               Showing {pagination.from || 0}- {pagination.to || 0} of {pagination.total || 0}
              </div>

              <div className="flex items-center gap-2">

                <button
                  onClick={() =>  fetchVehicles(
                        pagination.current_page - 1,searchName,searchCategory
                      )
                    }
                  disabled={!pagination.prev_page_url}
                  className="px-3 py-1  rounded disabled:opacity-50"
                >
                  <FaChevronLeft />
                </button>

                  {Array.from(
                  { length: pagination.last_page || 0 },
                  (_, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        fetchVehicles(i + 1 ,searchName, searchCategory)
                      }
                      className={`px-3 py-1 border rounded ${
                        pagination.current_page === i + 1
                          ? "bg-primary text-white"
                          : "bg-secondary border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                      fetchVehicles(
                      pagination.current_page + 1,fetchVehicles,searchCategory
                    )
                  }
                 disabled={!pagination.next_page_url}
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

export default VehiclesTable;