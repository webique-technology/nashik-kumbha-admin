import React, { useEffect, useMemo, useState } from 'react';
import { RxCaretRight } from "react-icons/rx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import img1 from '../assets/images/admin-hotel.png';
import img2 from '../assets/images/admin-vehicle.png';
import img3 from '../assets/images/admin-tour.png';
import api from "../services/axiosInstance";
import BackButton from '../components/ui/BackButton';

// Native local animation component to bypass the broken third-party bundler asset resolution
const LocalCountUp = ({ end, duration = 1.5 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const startValue = 0;
    const endValue = Number(end) || 0;

    if (endValue === 0) {
      setCount(0);
      return;
    }

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * (endValue - startValue) + startValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{count.toLocaleString()}</>;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [searchTravellers, setSearchTravellers] = useState("");
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  const rowsPerPage = 3;

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/dashboard");
      setDashboardData(response.data);
    } catch (error) {
      console.log("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const counts = {
    tours: dashboardData?.counts?.tours ?? 0,
    vehicles: dashboardData?.counts?.vehicles ?? 0,
    hotels: dashboardData?.counts?.hotels ?? 0,
    blogs: dashboardData?.counts?.blogs ?? 0,
    visitors: dashboardData?.counts?.visitors ?? 0
  };
  
  const enquiries = dashboardData?.recent_enquiries || [];
  const feedData = dashboardData?.recent_activities || [];

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

  const secondaryMetrics = [
    {
      id: "tours",
      icon: "deployed_code",
      title: "Tour package count",
      value: counts.tours,
      iconBg: "#c6e6de", 
      textColor: "#004f45", 
      subtitleColor: "#004f45", 
    },
    {
      id: "vehicles",
      icon: "airport_shuttle",
      title: "vehicle count",
      value: counts.vehicles,
      iconBg: "#ffdbd1",
      textColor: "#0f172a",
      subtitleColor: "#dc2626", 
    },
    {
      id: "hotels",
      icon: "bed",
      title: "hotel count",
      value: counts.hotels,
      iconBg: "#ffdbd1",
      textColor: "#0f172a",
      subtitleColor: "#dc2626", 
    },
    {
      id: "blogs",
      icon: "globe_asia",
      title: "Blog count",
      value: counts.blogs,
      iconBg: "#ffdbd1",
      textColor: "#0f172a",
      subtitleColor: "#dc2626", 
    },
    // {
    //   id: "blogs",
    //   icon: "globe_asia",
    //   title: "Blog count",
    //   value: counts.blogs_count,
    //   iconBg: "#ffdbd1",
    //   textColor: "#0f172a",
    //   subtitleColor: "#dc2626", 
    //   // backgroundGradient: "bg-primary-gradient",
    // },
  ];

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 font-medium">Loading Dashboard Data...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="p-8 space-y-8">
        <section className="metrics-grid grid-cols-1 md:grid-cols-4">
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
                  <LocalCountUp end={item.value} duration={1.5} />
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
                    <div className="relative md:w-40 flex-shrink-0">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="h-64 w-full object-cover md:h-full"
                      />
                    </div>

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
                    <div className="relative md:w-40 flex-shrink-0">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="h-64 w-full object-cover md:h-full"
                      />
                    </div>

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

            <div className="space-y-6">
              {vehicleData.map((pkg) => (
                <div
                  key={pkg.id}
                  className="overflow-hidden rounded-xl bg-gray-50 border border-[#e8e8e8]"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-40 flex-shrink-0">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="h-64 w-full object-cover md:h-full"
                      />
                    </div>

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
          </section>
        </div>

        <div className="dashboard-grid">
          {/* LEFT - Tour Enquiry */}
          <div className="dashboard-left">
            <h3 className='mb-3 text-xl font-bold text-slate-900'>Tour Enquiry</h3>
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
                            : item.special_requirements || "None"}
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
            </div>
            <div className='flex justify-end'>
              <Link
                to="/dashboard/tour-enquriy"
                className="px-4 py-2 bg-transparent icon-color font-semibold underline rounded inline-block"
              >
                Go to Tour Enquiry
              </Link>
            </div>
          </div>

          {/* RIGHT - Real-time Activities Feed */}
          <div className="dashboard-right">
            <div className="feed-card">
              <h3 className="feed-title">Real-time Feed</h3>
              <div className="feed-timeline">
                {feedData.length > 0 ? (
                  feedData.map((item, index) => {
                    // Safe regex extraction to remove raw HTML tag remnants and space entities
                    const cleanDescription = item.description 
                      ? item.description.replace(/<\/?[^>]+(>|$)/g, "").replace(/&nbsp;/g, " ") 
                      : "";

                    const shortDescription = cleanDescription.length > 110 
                      ? `${cleanDescription.slice(0, 110)}...` 
                      : cleanDescription;

                    return (
                      <div key={item.id || index} className="feed-item">
                        {/* Icon */}
                        <div
                          className={`feed-icon ${
                            index % 3 === 0
                              ? "feed-icon-primary"
                              : index % 3 === 1
                                ? "feed-icon-secondary"
                                : "feed-icon-tertiary"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[12px] font-bold">
                            {item.icon || "history_edu"}
                          </span>
                        </div>

                        <div>
                          <p className="feed-heading">{item.title}</p>
                          <p className="feed-desc">
                            {shortDescription}
                          </p>
                          <p className="feed-time">
                            {item.created_at ? new Date(item.created_at).toLocaleDateString() : "Just now"}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500 text-center p-4">No recent activity</p>
                )}
              </div>

              <button onClick={() => navigate("/dashboard/blogs")} className="feed-btn cursor-pointer">
                Show All Activity
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;