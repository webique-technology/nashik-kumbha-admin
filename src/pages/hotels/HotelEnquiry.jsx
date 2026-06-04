import React, { useMemo, useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import api from "../../services/axiosInstance";

const HotelEnquiry = () => {

    const [searchDate, setSearchDate] = useState("");
    const [searchTravellers, setSearchTravellers] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [enquiries, setEnquiries] = useState([]);

    const [loading, setLoading] = useState(true);
    const rowsPerPage = 10;

    const [totalPages, setTotalPages] = useState(1);

    const fetchEnquiries = async (page = 1) => {
        try {
            const response = await api.get(`/tour-enquiries?page=${page}`);

            console.log("Hotel enquiries:", response.data);

            setEnquiries(response.data.data.data);

            setCurrentPage(response.data.data.current_page);
            setTotalPages(response.data.data.last_page);

        } catch (error) {
            console.log("Hotel enquiry fetch error:", error);
        }
    };

    useEffect(() => {
        fetchEnquiries(currentPage);
    }, [currentPage]);


const filteredData = useMemo(() => {
  return enquiries.filter((item) => {
    const date = item.preferred_dates || "";
    const month = date.split("-")[1];

    return (
      (searchDate === "" || date === searchDate) &&
      (selectedMonth === "" || month === selectedMonth)
    );
  });
}, [enquiries, searchDate, selectedMonth]);



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
                        <h2 class="title text-on-surface">Hotel Enquiry</h2>
                        <p class="subtitle">Manage your Hotel listings</p>
                    </div>
                </div>
                <div>
                    {/* 🔍 Search */}
                    <div className="flex gap-3 mb-4 w-4/12">
                        <input
                            type="date"
                            className="input"
                            value={searchDate}
                            onChange={(e) => setSearchDate(e.target.value)}
                        />
                        {/* <select
                            className="input"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                            <option value="">All Months</option>
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select> */}
                    </div>

                    {/* 📊 Table */}
                    <div className="table-wrapper bg-surface-container-lowest">
                        <table className="table">
                            <thead className="bg-gray-100 text-left">
                                <tr className='thead-row'>
                                    <th className="th">Client Deatils</th>
                                    <th className="th">Room Type</th>
                                    <th className="th">Check-in Date</th>
                                    <th className="th">Check-out Date</th>
                                    <th className="th">Adults</th>
                                    <th className="th">Children</th>
                                </tr>
                            </thead>
                            <tbody className='tbody'>
                                {currentData.length > 0 ? (
                                    currentData.map((item) => (
                                        <tr key={item.id} className="thead-row tr group bg-white">
                                            <td className="td p-3">
                                                <p><span className='font-semibold'>Name:</span> {item.full_name}</p>
                                                <p><span className='font-semibold'>Email:</span> {item.email}</p>
                                                <p><span className='font-semibold'>Phone Number:</span> {item.phone_number}</p>
                                            </td>
                                            <td className="td p-3">{item.email}</td>
                                            <td className="td p-3">{item.preferred_dates}</td>
                                            <td className="td p-3">{item.phone_number}</td>
                                            <td className="td p-3">{item.number_of_travelers}</td>

                                            <td className="td p-3">{item.tour_name}</td>
                                            {/* <td className="td p-3 w-4/12">

                                                {item.special_requirements?.length > 70
                                                    ? `${item.special_requirements.slice(0, 70)}...`
                                                    : item.special_requirements}
                                            </td> */}


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
                                        className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "px-3 py-1 border rounded bg-primary text-white" : ""
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

export default HotelEnquiry