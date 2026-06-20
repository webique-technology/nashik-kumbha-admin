import { useState } from "react";
// import CarouselTable from "../../components/ui/CarouselTable"; // Commented out to prevent unused import warnings if your linter is strict
import VideoTable from "../../components/ui/VideoTable";

export default function HomePageSettings() {
  // Set default tab to "reel" so it shows on load
  const [activeTab, setActiveTab] = useState("reel");

  return (
    <div className="page-container">
      <div className="inner-page-container">
        {/* Tabs */}
        {/* <div className="inline-flex gap-2 rounded-xl bg-gray-100 p-2 "> */}
          {/* Commented out Carousel Tab
          <button
            onClick={() => setActiveTab("carousel")}
            className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === "carousel"
                ? "bg-primary text-white shadow-md"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Create Carousel
          </button>
          */}

          {/* <button
            onClick={() => setActiveTab("reel")}
            className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === "reel"
                ? "bg-primary text-white shadow-md"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Create Reel
          </button> */}
        {/* </div> */}

        {/* Content */}
        <div>
          {/* Commented out Carousel Content Render
          {activeTab === "carousel" && (
            <div>
              <CarouselTable/>
            </div>
          )}
          */}

          {activeTab === "reel" && (
            <div>
              <VideoTable/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}