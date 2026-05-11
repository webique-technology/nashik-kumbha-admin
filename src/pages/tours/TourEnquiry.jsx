import React, { useMemo, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
const TourEnquiry = () => {
     const data = [
    { id: 1, name: "Rahul Sharma", email: "rahul@mail.com", phone: "9876543210", travellers: 2, date: "2026-05-10", tour: "Goa", requirements: "Sea facing hotel" },
    { id: 2, name: "Priya Patel", email: "priya@mail.com", phone: "9123456780", travellers: 4, date: "2026-06-15", tour: "Manali", requirements: "Snow activities" },
    { id: 3, name: "Amit Verma", email: "amit@mail.com", phone: "9988776655", travellers: 3, date: "2026-07-01", tour: "Dubai", requirements: "Luxury stay" },
    { id: 4, name: "Sneha Iyer", email: "sneha@mail.com", phone: "9090909090", travellers: 5, date: "2026-08-20", tour: "Kerala", requirements: "Houseboat" },
    { id: 5, name: "Rohan Das", email: "rohan@mail.com", phone: "8888888888", travellers: 1, date: "2026-09-12", tour: "Ladakh", requirements: "Bike trip" },
    { id: 6, name: "Neha Singh", email: "neha@mail.com", phone: "7777777777", travellers: 6, date: "2026-10-05", tour: "Bali", requirements: "Private villa" },
    { id: 7, name: "Karan Mehta", email: "karan@mail.com", phone: "6666666666", travellers: 2, date: "2026-11-18", tour: "Thailand", requirements: "Nightlife" },
    { id: 8, name: "Anjali Gupta", email: "anjali@mail.com", phone: "9999999999", travellers: 3, date: "2026-12-25", tour: "Singapore", requirements: "Family friendly" },
    { id: 9, name: "Vikas Rao", email: "vikas@mail.com", phone: "9555555555", travellers: 2, date: "2027-01-10", tour: "Maldives", requirements: "Water villa" },
    { id: 10, name: "Pooja Shah", email: "pooja@mail.com", phone: "9444444444", travellers: 4, date: "2027-02-14", tour: "Paris", requirements: "Eiffel view" },
    { id: 11, name: "Arjun Nair", email: "arjun@mail.com", phone: "9333333333", travellers: 5, date: "2027-03-01", tour: "Switzerland", requirements: "Snow train" },
    { id: 12, name: "Meera Joshi", email: "meera@mail.com", phone: "9222222222", travellers: 2, date: "2027-04-05", tour: "Udaipur", requirements: "Lake view" },
    { id: 13, name: "Sahil Khan", email: "sahil@mail.com", phone: "9111111111", travellers: 3, date: "2027-05-10", tour: "Turkey", requirements: "Hot air balloon" },
    { id: 14, name: "Divya Reddy", email: "divya@mail.com", phone: "9000000000", travellers: 4, date: "2027-06-20", tour: "Japan", requirements: "Cherry blossom" },
    { id: 15, name: "Manish Gupta", email: "manish@mail.com", phone: "9898989898", travellers: 2, date: "2027-07-15", tour: "London", requirements: "City tour" },
  ];

  const [searchName, setSearchName] = useState("");
  const [searchTravellers, setSearchTravellers] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 7;

  // 🔍 Filter Data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchName.toLowerCase()) &&
        (searchTravellers === "" ||
          item.travellers.toString().includes(searchTravellers))
      );
    });
  }, [searchName, searchTravellers]);

  // 📄 Pagination Logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );
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
                  <td className="td p-3">{item.name}</td>
                  <td className="td p-3">{item.email}</td>
                  <td className="td p-3">{item.phone}</td>
                  <td className="td p-3">{item.travellers}</td>
                  <td className="td p-3">{item.date}</td>
                  <td className="td p-3">{item.tour}</td>
                  <td className="td p-3">{item.requirements}</td>
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
        <div className="text-sm text-gray-600">
          Showing {filteredData.length === 0 ? 0 : startIndex + 1} -{" "}
          {Math.min(startIndex + rowsPerPage, filteredData.length)} of{" "}
          {filteredData.length}
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