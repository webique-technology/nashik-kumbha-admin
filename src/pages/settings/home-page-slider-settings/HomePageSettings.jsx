import { useState } from "react";
import CarouselTable from "./CarouselTable";
import VideoTable from "./VideoTable";

export default function HomePageSettings() {
  const [activeTab, setActiveTab] = useState("carousel");

  return (
    <div className="page-container h-screen">
        <div className="inner-page-container">
      {/* Tabs */}
      <div className="inline-flex gap-2 rounded-xl bg-gray-100 p-2 ">
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

        <button
          onClick={() => setActiveTab("reel")}
          className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
            activeTab === "reel"
              ? "bg-primary text-white shadow-md"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          Create Reel
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === "carousel" && (
          <div>
            <CarouselTable/>
          </div>
        )}

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