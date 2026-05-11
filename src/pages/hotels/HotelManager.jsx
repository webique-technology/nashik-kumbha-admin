import React, { useState } from "react";
import HotelForm from "./HotelForm";
import HotelTable from "./HotelTable";
import { FaSnowflake, FaFan, FaUtensils, FaCrown } from "react-icons/fa";
import ViewModal from "../../viewmodel/ViewModal";

import { RiHotelLine } from "react-icons/ri";
import { IoFastFoodOutline } from "react-icons/io5";
import { PiAirplaneTakeoffLight } from "react-icons/pi";
import { LuTrees } from "react-icons/lu";
import { PiVanLight } from "react-icons/pi";
import { IoTrainOutline } from "react-icons/io5";

export const CATEGORY_OPTIONS = [
  { id: "Veg", label: "Veg" },
  { id: "Nonveg", label: "Nonveg" },
  { id: "Jain", label: "Jain" },
];

const getCategoryLabel = (id) => {
  return CATEGORY_OPTIONS.find((c) => c.id === id)?.label || id;
};


const HotelManager = () => {

  const [viewModal, setViewModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const handleView = (tour) => {
    setSelectedTour(tour);
    setViewModal(true);
  };

const initialHotels = [
  {
    id: 1,
    name: "Taj Palace",
    category: "Luxury",
    foodcat: "Veg",
    rating: 5,
    location: "Mumbai",
    price: 15000,
    arrival: "2026-05-10",
    departure: "2026-05-14",
    images: ["https://picsum.photos/200?1"],
    features: [
      { id: "hotel", label: "Hotel", icon: <RiHotelLine /> },
      { id: "meals", label: "Meals", icon: <IoFastFoodOutline /> },
      { id: "flight", label: "Flight", icon: <PiAirplaneTakeoffLight /> },
    ],
    description: "Premium luxury stay with sea view",
  },
  {
    id: 2,
    name: "Oberoi Grand",
    category: "Luxury",
    foodcat: "Nonveg",
    rating: 5,
    location: "Kolkata",
    price: 14000,
    arrival: "2026-05-12",
    departure: "2026-05-16",
    images: ["https://picsum.photos/200?2"],
    features: [
      { id: "transport", label: "Transport", icon: <PiVanLight /> },
      { id: "train", label: "Train", icon: <IoTrainOutline /> },
    ],
    description: "Elegant heritage property with classic charm",
  },
  {
    id: 3,
    name: "Leela Palace",
    category: "Luxury",
    foodcat: "Jain",
    rating: 5,
    location: "Delhi",
    price: 16000,
    arrival: "2026-05-15",
    departure: "2026-05-20",
    images: ["https://picsum.photos/200?3"],
    features: [
      { id: "hotel", label: "Hotel", icon: <RiHotelLine /> },
      { id: "meals", label: "Meals", icon: <IoFastFoodOutline /> },
      { id: "train", label: "Train", icon: <IoTrainOutline /> },
    ],
    description: "Royal palace experience with modern luxury",
  },
  {
    id: 4,
    name: "ITC Maratha",
    category: "Luxury",
    foodcat: "Veg",
    rating: 5,
    location: "Mumbai",
    price: 13000,
    arrival: "2026-05-18",
    departure: "2026-05-22",
    images: ["https://picsum.photos/200?4"],
    features: [
      { id: "hotel", label: "Hotel", icon: <RiHotelLine /> },
      { id: "meals", label: "Meals", icon: <IoFastFoodOutline /> },
      { id: "train", label: "Train", icon: <IoTrainOutline /> },
    ],
    description: "Business luxury hotel with fine dining",
  },
  {
    id: 5,
    name: "Radisson Blu",
    category: "Premium",
    foodcat: "Nonveg",
    rating: 4,
    location: "Pune",
    price: 9000,
    arrival: "2026-05-20",
    departure: "2026-05-25",
    images: ["https://picsum.photos/200?5"],
    features: [
      { id: "transport", label: "Transport", icon: <PiVanLight /> },
      { id: "train", label: "Train", icon: <IoTrainOutline /> },
    ],
    description: "Comfortable premium stay in city center",
  },
  {
    id: 6,
    name: "Holiday Inn Resort",
    category: "Premium",
    foodcat: "Jain",
    rating: 4,
    location: "Goa",
    price: 8500,
    arrival: "2026-05-22",
    departure: "2026-05-27",
    images: ["https://picsum.photos/200?6"],
    features: [
      { id: "hotel", label: "Hotel", icon: <RiHotelLine /> },
      { id: "train", label: "Train", icon: <IoTrainOutline /> },
    ],
    description: "Beachside resort with relaxing vibes",
  },
  {
    id: 7,
    name: "Lemon Tree Hotel",
    category: "Mid-Range",
    foodcat: "Veg",
    rating: 4,
    location: "Hyderabad",
    price: 6000,
    arrival: "2026-05-25",
    departure: "2026-05-29",
    images: ["https://picsum.photos/200?7"],
    features: [
      { id: "sightseeing", label: "Sightseeing", icon: <LuTrees /> },
    ],
    description: "Affordable comfort with modern design",
  },
  {
    id: 8,
    name: "Treebo Trend",
    category: "Budget",
    foodcat: "Nonveg",
    rating: 3,
    location: "Bangalore",
    price: 3500,
    arrival: "2026-05-28",
    departure: "2026-06-01",
    images: ["https://picsum.photos/200?8"],
    features: [
      { id: "transport", label: "Transport", icon: <PiVanLight /> },
    ],
    description: "Budget-friendly stay for travelers",
  },
  {
    id: 9,
    name: "FabHotel Prime",
    category: "Budget",
    foodcat: "Jain",
    rating: 3,
    location: "Jaipur",
    price: 3000,
    arrival: "2026-06-01",
    departure: "2026-06-04",
    images: ["https://picsum.photos/200?9"],
    features: [
      { id: "hotel", label: "Hotel", icon: <RiHotelLine /> },
      { id: "flight", label: "Flight", icon: <PiAirplaneTakeoffLight /> },
    ],
    description: "Simple stay with essential amenities",
  },
  {
    id: 10,
    name: "The Park Hotel",
    category: "Premium",
    foodcat: "Veg",
    rating: 4,
    location: "Chennai",
    price: 7500,
    arrival: "2026-06-03",
    departure: "2026-06-07",
    images: ["https://picsum.photos/200?10"],
    features: [
      { id: "flight", label: "Flight", icon: <PiAirplaneTakeoffLight /> },
      { id: "sightseeing", label: "Sightseeing", icon: <LuTrees /> },
      { id: "transport", label: "Transport", icon: <PiVanLight /> },
    ],
    description: "Stylish hotel with nightlife access",
  },
  // ...you can continue same pattern for remaining
];

  const [hotels, setHotels] = useState(initialHotels);
  const [page, setPage] = useState("table");
  const [editData, setEditData] = useState(null);


  const tourFields = [
    { key: "name", label: "name" },
    { key: "description", label: "Description" },
    { key: "rating", label: "rating" },
    { key: "category", label: "Category" },
    { key: "foodcat", label: "Food Category" },
    { key: "price", label: "Price" },
    { key: "arrival", label: "Arrival" },
    { key: "departure", label: "Departure" },
    { key: "location", label: "location" },
    {
      key: "features",
      label: "Features",
      render: (features) => (
        <div className="flex flex-wrap gap-2">
          {features?.map((item) => (
            <span
              key={item.id}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-200 rounded"
            >
              <span className="text-sm">{item.icon}</span>
              {item.label}
            </span>
          ))}
        </div>
      ),
    },

  ];

  const handleSave = (data) => {
    if (editData) {
      setHotels((prev) =>
        prev.map((item) => (item.id === data.id ? data : item))
      );
    } else {
      setHotels((prev) => [
        { ...data, id: Date.now() },
        ...prev,
      ]);
    }

    setPage("table");
    setEditData(null);
  };

  const handleEdit = (hotel) => {
    setEditData(hotel);
    setPage("form");
  };

  const handleDelete = (id) => {
    setHotels((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <>
      {page === "table" ? (
        <HotelTable
          hotels={hotels}
          onAdd={() => setPage("form")}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      ) : (
        <HotelForm
          onSave={handleSave}
          editData={editData}
          onCancel={() => setPage("table")}
        />
      )}

      <ViewModal
        isOpen={viewModal}
        onClose={() => setViewModal(false)}
        data={selectedTour}
        fields={tourFields}
        title="Hotel Details"
      />
    </>
  );
};

export default HotelManager;