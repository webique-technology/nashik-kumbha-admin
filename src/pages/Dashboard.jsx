import React from 'react'

 



const Dashboard = () => {
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
      icon: "confirmation_number",
      title: "Active Bookings",
      value: "1,284",
      subtitle: "84 new since yesterday",
      iconBg: "#c6e6de", // background color for the icon
      textColor: "#004f45", // color for the icon text
      subtitleColor: "#004f45", // color for the subtitle
    },
    {
      id: 2,
      icon: "chat_bubble",
      title: "New Inquiries",
      value: "42",
      subtitle: "12 require urgent reply",
      iconBg: "#ffdbd1",
      textColor: "#0f172a",
      subtitleColor: "#dc2626", // red for urgent
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

  const feedData = [
    {
      id: 1,
      icon: "history_edu",
      title: "New Blog Post Published",
      desc: '"10 Hidden Gems in Kyoto" is now live.',
      time: "10 mins ago",
      type: "primary",
    },
    {
      id: 2,
      icon: "shopping_bag",
      title: "Booking Confirmed",
      desc: "James Miller booked Safari Tour.",
      time: "28 mins ago",
      type: "secondary",
    },
    {
      id: 3,
      icon: "report",
      title: "Inquiry Alert",
      desc: "Unresolved query from Sofia Rossi.",
      time: "1h ago",
      type: "tertiary",
    },
  ];


  return (
    <div>
     

      <div className="p-8 space-y-8">

        <section className="metrics-grid grid-cols-1 md:grid-cols-4">
          {/* Main Metric */}
          <div className="main-metric-card md:col-span-2">
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
          </div>

          {/* Secondary Metrics */}
          {secondaryMetrics.map((item) => (
            <div key={item.id} className="secondary-metric-card">
              {/* Icon wrapper with dynamic background and text color */}
              <div
                className="secondary-metric-icon rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: item.iconBg, color: item.textColor }}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>

              {/* Title and value */}
              <div>
                <p className="secondary-metric-title">{item.title}</p>
                <h3 className="secondary-metric-value">{item.value}</h3>
              </div>

              {/* Subtitle with dynamic text color */}
              <p
                className="secondary-metric-subtitle text-[10px] font-medium mt-2"
                style={{ color: item.subtitleColor }}
              >
                {item.subtitle}
              </p>
            </div>
          ))}
        </section>


        <div className="dashboard-grid">
          {/* LEFT */}
          <div className="dashboard-left">
            <div className="dashboard-header">
              <h2>Top Performing Experiences</h2>
              <button>View All Packages</button>
            </div>

            {/* Featured Card */}
            <div className="featured-card">
              <div className="featured-image">
                <img src={dashboardData.featured.image} alt="" />
                <span className="featured-tag">
                  {dashboardData.featured.tag}
                </span>
              </div>

              <div className="featured-content">
                <div className="featured-top">
                  <div>
                    <h4>{dashboardData.featured.category}</h4>
                    <h3>{dashboardData.featured.title}</h3>
                  </div>

                  <div className="featured-price">
                    <p>{dashboardData.featured.price}</p>
                    <span>Starting Price</span>
                  </div>
                </div>

                <p className="featured-desc">
                  {dashboardData.featured.description}
                </p>

                <div className="featured-stats">
                  <div>
                    ⭐ {dashboardData.featured.rating} ({dashboardData.featured.reviews})
                  </div>
                  <div>📈 {dashboardData.featured.trend}</div>
                </div>
              </div>
            </div>

            {/* Hotels */}
            <div className="hotel-list">
              <h4 class="text-sm font-bold text-on-surface mb-4">Recent Hotel Updates</h4>
              <div className='hotels-wrap'>
                {dashboardData.hotels.map((hotel) => (
                  <div key={hotel.id} className="hotel-card">
                    <div className="hotel-info">
                      <img src={hotel.image} alt="" />
                      <div>
                        <h5>{hotel.name}</h5>
                        <p>{hotel.location}</p>
                      </div>
                    </div>

                    <span className={`hotel-status ${hotel.status}`}>
                      {hotel.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="dashboard-right">
            <div className="traffic-card">
              <h3>Site Traffic</h3>

             

              <div className="traffic-bars">
                {[40, 65, 95, 50, 30, 75, 55].map((h, i) => (
                  <div 
                  key={i} 
                  style={{ 
                    height: `${h}%`, backgroundColor: colors[i], }} />
                ))}
              </div>

              <div className="traffic-stats">
                <div>
                  <span>Unique Visitors</span>
                  <strong>24,502</strong>
                </div>
                <div>
                  <span>Session Duration</span>
                  <strong>04:12</strong>
                </div>
              </div>
            </div>

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

              <button className="feed-btn">
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