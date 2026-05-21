import React, { useMemo, useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import api from "../../services/axiosInstance";

const TourEnquiry = () => {
  
  const [searchName, setSearchName] = useState("");
  const [searchTravellers, setSearchTravellers] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [enquiries, setEnquiries] = useState([]);

  const [loading, setLoading] = useState(true);
  const rowsPerPage = 10;

  const [totalPages, setTotalPages] = useState(1);

    const fetchEnquiries = async (page = 1) => {
      try {
        const response = await api.get(`/tour-enquiries?page=${page}`);

        console.log("tour enquiries:", response.data);

        setEnquiries(response.data.data.data);

        setCurrentPage(response.data.data.current_page);
        setTotalPages(response.data.data.last_page);

      } catch (error) {
        console.log("tour enquiry fetch error:", error);
      }
    };

  useEffect(() => {
    fetchEnquiries(currentPage);
  }, [currentPage]);


      const filteredData = useMemo(() => {
      return enquiries.filter((item) => {
        return (
          item.full_name
            ?.toLowerCase()
            .includes(searchName.toLowerCase()) &&
          (
            searchTravellers === "" ||
            item.number_of_travelers
              ?.toString()
              .includes(searchTravellers)
          )
        );
      });
    }, [enquiries, searchName, searchTravellers]);

  // 📄 Pagination Logic
  // const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  // const startIndex = (currentPage - 1) * rowsPerPage;
  // const currentData = filteredData.slice(
  //   startIndex,
  //   startIndex + rowsPerPage
  // );
  const currentData = filteredData;
    return (
        <div className='page-container'>
            <div className='inner-page-container'>
            <div class="header">
                <div>
                    <h2 class="title text-on-surface">Tour Enquiry</h2>
                    <p class="subtitle">Manage your tour listings</p>
                </div>
            </div>
            <div>
      {/* 🔍 Search */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="input"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search travellers"
          className="input"
          value={searchTravellers}
          onChange={(e) => setSearchTravellers(e.target.value)}
        />
      </div>

      {/* 📊 Table */}
      <div className="table-wrapper bg-surface-container-lowest">
        <table className="table">
          <thead className="bg-gray-100 text-left">
            <tr className='thead-row'>
              <th className="th">Full Name</th>
              <th className="th">Email</th>
              <th className="th">Phone</th>
              <th className="th">Travellers</th>
              <th className="th">Preferred Date</th>
              <th className="th">Tour</th>
              <th className="th">Requirements</th>
            </tr>
          </thead>
          <tbody className='tbody'>
            {currentData.length > 0 ? (
              currentData.map((item) => (
                <tr key={item.id} className="thead-row tr group bg-white">
                  <td className="td p-3">{item.full_name}</td>
                  <td className="td p-3">{item.email}</td>
                  <td className="td p-3">{item.phone_number}</td>
                  <td className="td p-3">{item.number_of_travelers}</td>
                  <td className="td p-3">{item.preferred_dates}</td>
                  <td className="td p-3">{item.tour_name}</td>
                  <td className="td p-3">{item.special_requirements}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* 📄 Pagination */}
      <div className="pagination">
        {/* <div className="text-sm text-gray-600"> */}
          {/* Showing {filteredData.length === 0 ? 0 : startIndex + 1} -{" "} */}
          {/* Showing Page {currentPage} of {totalPages}
          {Math.min(startIndex + rowsPerPage, filteredData.length)} of{" "}
          {filteredData.length}
        </div> */}

        <div className="text-sm text-gray-600">
          Showing Page {currentPage} of {totalPages}
        </div>

        <div className="flex items-center gap-1">
          <button
            className="px-2 py-1  rounded"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
           <FaChevronLeft />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "px-3 py-1 border rounded bg-primary text-white" : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-2 py-1 rounded"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      </div>

      
    </div>
        </div>
        </div>
    )
}

export default TourEnquiry