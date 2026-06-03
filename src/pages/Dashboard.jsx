import React, { useEffect, useMemo, useState } from 'react'
import { RxCaretRight } from "react-icons/rx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/images/admin-hotel.png'
import img2 from '../assets/images/admin-vehicle.png'
import img3 from '../assets/images/admin-tour.png'
import api from "../services/axiosInstance"
import CountUp from "react-countup";
const Dashboard = () => {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [searchTravellers, setSearchTravellers] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [enquiries, setEnquiries] = useState([]);
  const [counts, setCounts] = useState({});
  const rowsPerPage = 3;

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

  useEffect(() => {
    const duration = 1500;
    const interval = 20;

    const timers = secondaryMetrics.map((item) => {
      const endValue = parseInt(item.value, 10);
      let current = 0;

      const step = Math.ceil(endValue / (duration / interval));

      return setInterval(() => {
        current += step;

        if (current >= endValue) {
          current = endValue;
        }

        setCounts((prev) => ({
          ...prev,
          [item.id]: current,
        }));

        if (current >= endValue) {
          clearInterval(timer);
        }
      }, interval);

      var timer;
    });

    return () => timers.forEach(clearInterval);
  }, []);

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

  const currentData = filteredData.slice(0, rowsPerPage);
  const colors = [
    "#a14112c2", // green
    "#d1571b", // blue
    "#a14000", // yellow
    "#a14112c2", // red
    "#d1571b", // purple
    "#d1571b", // cyan
    "#d1571b", // pink

  ];

  const mainMetric = {
    id: 0,
    label: "Total Revenue (Monthly)",
    value: "$142,850.00",
    trend: "+12.5% from last month",
    trendIcon: "trending_up",
    backgroundGradient: "bg-primary-gradient",
    mainIcon: "payments",
  };

  const secondaryMetrics = [
    {
      id: 1,
      icon: "deployed_code",
      title: "package count",
      value: "1284",
      iconBg: "#c6e6de", // background color for the icon
      textColor: "#004f45", // color for the icon text
      subtitleColor: "#004f45", // color for the subtitle
    },
    {
      id: 2,
      icon: "airport_shuttle",
      title: "vehicle count",
      value: "42",
      iconBg: "#ffdbd1",
      textColor: "#0f172a",
      subtitleColor: "#dc2626", // red for urgent
    },
    {
      id: 3,
      icon: "bed",
      title: "hotel bookings/list",
      value: "42",
      iconBg: "#ffdbd1",
      textColor: "#0f172a",
      subtitleColor: "#dc2626", // red for urgent
    },
    {
      id: 4,
      icon: "globe_asia",
      title: "website visitiors",
      value: "42",
      iconBg: "#ffdbd1",
      textColor: "#ffffff",
      subtitleColor: "#dc2626", // red for urgent
      backgroundGradient: "bg-primary-gradient",
    },
  ];

  // data/horizonData.js


  const dashboardData = {
    featured: {
      tag: "Featured",
      category: "Maldives Escape",
      title: "Emerald Lagoon Retreat & Spa",
      price: "$4,200",
      description:
        "A curated 7-day experience featuring overwater bungalows, private chef dining, and snorkeling tours.",
      rating: "4.9",
      reviews: "128 reviews",
      trend: "+15% Booking rate",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCAdu2VUPtWzVTFHdd0VdCpL0kqqg4lP3yqABfUpqz-WxXHIwa60Uf-7NzErO-pc0m2okH8lZICSI08LxVKjAcjtbONPom4F6SJKWLB7mgocjbfsP0qT_KkKPj8Qh80D631GxUZAhPDgD8u0ntfPlCcxpnN_TcSo6lL6_Kh3t3ESGirQBTyhYWBEJ-DT3s5FJ95VO8JN8vv4RbvVZcydFRH9N5fm7niIx31dFluLUwxOTjIrXU5IGYqWFvScHyUoKPDm1uuEEZqj2o",
    },

    hotels: [
      {
        id: 1,
        name: "The Azure Boutique",
        location: "Santorini, Greece • Edited 2h ago",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAEm_xDDDMssm3e6oCUbQJ2dMv4SW5ZaV2nU7xOP_E_i5oZXO0014OOPau_Eh6OyfNeHStz0AAUASmg8PMaCz2p8m1OQ93eY8l8MPAJZm1fwcws4pE0slw4VK4nvcJ8bXlSogYcEEme0qFph0OmlKE3u7WwMuQjPL3wSDPE4fO_JKJnzey8LD4Hi_KhiQSnCcofYMM8uy-Sdnm0tWzpmswk_9t1X86XnOepdrrvpYfHEefcGEx-tQfah-E4Ol5J3j9ExaLPIhSAWi4",
        status: "active",
      },
      {
        id: 2,
        name: "Peak Vista Lodge",
        location: "Aspen, Colorado • Edited 5h ago",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuD4hCnU-SN-r8Zc3J4Z3joCn1bBwJHiROi_oVegH6Nu5vaW83-mk5ftwy9I6b8KuW90S7TdzktfMVwvaF84-bl8Kl7KtkRhHwt_wwynGmM24z-NNvlRpuRpEW0JjTifj6mHbI5vmKG9kRz77qmi3-Ikm5oVB2X_4Kmk4PCgbiGvSCvdNXmnxHXeCS97zMAs7a9UknUvyI0_79yy5DhD4KD2tYTlvtunibyEIkcEflhZcM7FS5UePAa0ftQ5-_4rghEBBzryiYYrJQ4",
        status: "draft",
      },
    ],
  };

  const packageData = [
    {
      id: 1,
      vehicle: "Tour Manager",
      description: "Priority slots for restricted ritual areas and VIP viewing platforms.",
      image: img3,
      title: "Tours manager",
      price: "4999",
    },
  ];

  const vehicleData = [
    {
      id: 1,
      vehicle: "Hotel Manager",
      description: "Priority slots for restricted ritual areas and VIP viewing platforms.",
      image: img1,
      title: "Hotels manager",
      price: "4999",
    },
  ];


  const rentalCar = [
    {
      id: 1,
      vehicle: "Vehicles",
      description: "Priority slots for restricted ritual areas and VIP viewing platforms.",
      image: img2,
      title: "Vehicles manager",
      price: "4999",
    },
  ];


  const feedData = [
    {
      id: 1,
      icon: "history_edu",
      title: "How Lorem Ipsum Can Be Used?",
      desc: "When using Lorem Ipsum for creating dummy content for your newly created website, you can select the text formats you wa",
      time: "10 mins ago",
      type: "primary",
    },
    {
      id: 2,
      icon: "shopping_bag",
      title: "test blog",
      desc: "1914 translation by H. Rackham On the other hand we denounce with righteous indignation and dislike men who are so begu",
      time: "28 mins ago",
      type: "secondary",
    },
    {
      id: 3,
      icon: "report",
      title: "food blog1",
      desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, ea",
      time: "1h ago",
      type: "tertiary",
    },
  ];


  return (
    <div>


      <div className="p-8 space-y-8">

        <section className="metrics-grid grid-cols-1 md:grid-cols-4">
          {/* Main Metric */}
          {/* <div className="main-metric-card md:col-span-2">
            <div className="main-metric-content">
              <p className="main-metric-label">{mainMetric.label}</p>
              <h3 className="main-metric-value">{mainMetric.value}</h3>
              <div className="main-metric-trend">
                <span className="material-symbols-outlined">{mainMetric.trendIcon}</span>
                <span>{mainMetric.trend}</span>
              </div>
            </div>
            <div className="main-metric-icon">
              <span className="material-symbols-outlined">{mainMetric.mainIcon}</span>
            </div>
          </div> */}

          {/* Secondary Metrics */}
          {secondaryMetrics.map((item) => (
            <div
              key={item.id}
              className={`secondary-metric-card ${item.backgroundGradient || ""}`}
            >
              <div
                className="secondary-metric-icon rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: item.iconBg, color: item.textColor }}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>

              <div>
                <p className="secondary-metric-title" style={{ color: item.textColor }}>{item.title}</p>
                <h3
                  className="secondary-metric-value"
                  style={{ color: item.textColor }}
                >
                  {(counts[item.id] || 0).toLocaleString()}
                </h3>
              </div>

              <p
                className="secondary-metric-subtitle text-[10px] font-medium mt-2"
                style={{ color: item.subtitleColor }}
              >
                {item.subtitle}
              </p>
            </div>
          ))}
        </section>

        <div className='website-sections'>
          <section className="w-full mx-auto grid grid-cols-3 gap-5">
            <div className="space-y-6">
              {packageData.map((pkg) => (
                <div
                  key={pkg.id}
                  className="overflow-hidden rounded-xl bg-gray-50 border border-[#e8e8e8]"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="relative md:w-40 flex-shrink-0">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="h-64 w-full object-cover md:h-full"
                      />

                      {/* Vehicle Badge */}
                      {/* <div className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow">
                        {pkg.vehicle}
                      </div> */}
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div>
                        <h3 className="mb-3 text-xl font-bold text-slate-900">
                          {pkg.title}
                        </h3>

                        {pkg.description && (
                          <p className="mb-4 text-sm text-slate-600">
                            {pkg.description}
                          </p>
                        )}
                      </div>

                      <div>
                        <button
                          onClick={() => navigate("/dashboard/tours")}
                          className="flex items-center gap-2 bg-gray-200 border border-gray-300 py-1 rounded-md px-2 text-xs cursor-pointer 
                          font-medium text-gray-600 transition hover:opacity-90"
                        >
                          View Details..
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {rentalCar.map((pkg) => (
                <div
                  key={pkg.id}
                  className="overflow-hidden rounded-xl bg-gray-50 border border-[#e8e8e8]"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative md:w-40 flex-shrink-0">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="h-64 w-full object-cover md:h-full"
                      />

                      {/* <div className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow">
                        {pkg.vehicle}
                      </div> */}
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div>
                        <div>
                          <h3 className="mb-3 text-xl font-bold text-slate-900">
                            {pkg.title}
                          </h3>

                          {pkg.description && (
                            <p className="mb-4 text-slate-600 text-sm">
                              {pkg.description}
                            </p>
                          )}


                        </div>
                      </div>



                      <div>
                        <button
                          onClick={() => navigate("/dashboard/hotel")}
                          className="flex items-center gap-2 bg-gray-200 border border-gray-300 py-1 rounded-md px-2 text-xs cursor-pointer 
                          font-medium text-gray-600 transition hover:opacity-90"
                        >
                          View Details..
                        </button>
                      </div>




                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {vehicleData.map((pkg) => (
                <div
                  key={pkg.id}
                  className="overflow-hidden rounded-xl bg-gray-50 border border-[#e8e8e8]"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative md:w-40 flex-shrink-0">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="h-64 w-full object-cover md:h-full"
                      />

                      {/* <div className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow">
                        {pkg.vehicle}
                      </div> */}
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div>
                        <h3 className="mb-4 text-xl font-bold text-slate-900">
                          {pkg.title}
                        </h3>

                        {pkg.description && (
                          <p className="mb-4 text-sm text-slate-600">
                            {pkg.description}
                          </p>
                        )}
                      </div>

                      <div>
                        <button
                          onClick={() => navigate("/dashboard/vehicle")}
                          className="flex items-center gap-2 bg-gray-200 border border-gray-300 py-1 rounded-md px-2 text-xs cursor-pointer 
                          font-medium text-gray-600 transition hover:opacity-90"
                        >
                          View Details..
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="dashboard-grid">
          {/* LEFT */}
          <div className="dashboard-left">


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
                        <td className="td p-3">
                          {item.special_requirements?.length > 70
                            ? `${item.special_requirements.slice(0, 70)}...`
                            : item.special_requirements}
                        </td>
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

          {/* RIGHT */}
          <div className="dashboard-right">


            <div className="feed-card">

              <h3 className="feed-title">Real-time Feed</h3>

              <div className="feed-timeline">
                {feedData.map((item) => (
                  <div key={item.id} className="feed-item">

                    {/* Icon */}
                    <div
                      className={`feed-icon ${item.type === "primary"
                        ? "feed-icon-primary"
                        : item.type === "secondary"
                          ? "feed-icon-secondary"
                          : "feed-icon-tertiary"
                        }`}
                    >
                      <span className="material-symbols-outlined text-[12px] font-bold">
                        {item.icon}
                      </span>
                    </div>

                    {/* Content */}
                    <div>
                      <p className="feed-heading">{item.title}</p>
                      <p className="feed-desc">{item.desc}</p>
                      <p className="feed-time">{item.time}</p>
                    </div>

                  </div>
                ))}
              </div>

              <button onClick={() => navigate("/dashboard/blogs")} className="feed-btn cursor-pointer">
                Show All Activity
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard