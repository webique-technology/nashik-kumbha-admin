import React, { useState } from "react";
import TourForm from "./TourForm";
import TourTable from "./TourTable";
import ViewModal from "../../viewmodel/ViewModal";
import { RiHotelLine } from "react-icons/ri";
import { IoFastFoodOutline } from "react-icons/io5";
import { PiAirplaneTakeoffLight } from "react-icons/pi";
import { LuTrees } from "react-icons/lu";
import { PiVanLight } from "react-icons/pi";
import { IoTrainOutline } from "react-icons/io5";



const TourManager = () => {
  const [viewModal, setViewModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const handleView = (tour) => {
    setSelectedTour(tour);
    setViewModal(true);
  };
  const initialTours = [
    {
      id: 1,
      title: "Trimbakeshwar Jyotirlinga Darshan",
      description: "Visit the sacred Trimbakeshwar temple and experience spiritual rituals.",
      category: "Religious Tourism",
      price: 2500,
      status: "Active",
      images: ["https://picsum.photos/200?1"],
      features: [
        { id: "hotel", label: "Hotel", icon: <RiHotelLine /> },
        { id: "meals", label: "Meals", icon: <IoFastFoodOutline /> },
        { id: "train", label: "Train", icon: <IoTrainOutline /> },
      ],
    },
    {
      id: 2,
      title: "Panchvati Ramayana Trail",
      description: "Explore Ramayana-era sites like Sita Gufa and Kalaram Temple.",
      category: "Religious Tourism",
      price: 1800,
      status: "Active",
      images: ["https://picsum.photos/200?2"],
      features: [
        { id: "hotel", label: "Hotel", icon: <RiHotelLine /> },
        { id: "meals", label: "Meals", icon: <IoFastFoodOutline /> },
        { id: "flight", label: "Flight", icon: <PiAirplaneTakeoffLight /> },
        { id: "train", label: "Train", icon: <IoTrainOutline /> },
      ],
    },
    {
      id: 3,
      title: "Saptashrungi Devi Temple Trek",
      description: "Spiritual trek to one of Maharashtra’s Shakti Peeths.",
      category: "Religious Tourism",
      price: 2200,
      status: "Active",
      images: ["https://picsum.photos/200?3"],
      features: [
        { id: "sightseeing", label: "Sightseeing", icon: <LuTrees /> },
        { id: "transport", label: "Transport", icon: <PiVanLight /> },
        { id: "train", label: "Train", icon: <IoTrainOutline /> },
      ],
    },
    {
      id: 4,
      title: "Anjaneri Hills & Hanuman Birthplace",
      description: "Trek to Anjaneri hills believed to be Lord Hanuman’s birthplace.",
      category: "Eco-Tourism",
      price: 2000,
      status: "Active",
      images: ["https://picsum.photos/200?4"],
      features: [
        { id: "hotel", label: "Hotel", icon: <RiHotelLine /> },
        { id: "meals", label: "Meals", icon: <IoFastFoodOutline /> },
      ],
    },
    {
      id: 5,
      title: "Igatpuri Nature & Meditation Retreat",
      description: "Relax in nature with meditation at Vipassana center.",
      category: "Eco-Tourism",
      price: 3500,
      status: "Active",
      images: ["https://picsum.photos/200?5"],
      features: [
        { id: "hotel", label: "Hotel", icon: <RiHotelLine /> },
      ],
    },
    {
      id: 6,
      title: "Harihar Fort Trek Adventure",
      description: "Thrilling trek with steep rock-cut steps and scenic views.",
      category: "Eco-Tourism",
      price: 2800,
      status: "Active",
      images: ["https://picsum.photos/200?6"],
      features: [
        { id: "transport", label: "Transport", icon: <PiVanLight /> },
        { id: "train", label: "Train", icon: <IoTrainOutline /> },
      ],
    },
    {
      id: 7,
      title: "Nashik Vineyard Wine Tour",
      description: "Explore vineyards and enjoy wine tasting sessions.",
      category: "Culinary Tourism",
      price: 4000,
      status: "Active",
      images: ["https://picsum.photos/200?7"],
      features: [
        { id: "hotel", label: "Hotel", icon: <RiHotelLine /> },
        { id: "transport", label: "Transport", icon: <PiVanLight /> },
        { id: "train", label: "Train", icon: <IoTrainOutline /> },
      ],
    },
    {
      id: 8,
      title: "Harihareshwar Temple",
      description: "Known as “Dakshin Kashi,” located near the sea.",
      category: "Religious Tourism",
      price: 4500,
      status: "Active",
      images: ["https://picsum.photos/200?8"],
       features: [
        { id: "hotel", label: "Hotel", icon: <RiHotelLine /> },
        { id: "meals", label: "Meals", icon: <IoFastFoodOutline /> },
        { id: "flight", label: "Flight", icon: <PiAirplaneTakeoffLight /> },
        { id: "sightseeing", label: "Sightseeing", icon: <LuTrees /> },
        { id: "transport", label: "Transport", icon: <PiVanLight /> },
        { id: "train", label: "Train", icon: <IoTrainOutline /> },
      ],
    },
    {
      id: 9,
      title: "Local Maharashtrian Food Walk",
      description: "Taste authentic Nashik street food and local cuisine.",
      category: "Culinary Tourism",
      price: 1500,
      status: "Active",
      images: ["https://picsum.photos/200?9"],
       features: [
        { id: "flight", label: "Flight", icon: <PiAirplaneTakeoffLight /> },

      ],
    },
    {
      id: 10,
      title: "Tulja Bhavani Temple",
      description: "Kuldevi of Chhatrapati Shivaji Maharaj.",
      category: "Religious Tourism",
      price: 1200,
      status: "Active",
      images: ["https://picsum.photos/200?10"],
       features: [   
        { id: "flight", label: "Flight", icon: <PiAirplaneTakeoffLight /> },
        { id: "sightseeing", label: "Sightseeing", icon: <LuTrees /> },
        { id: "transport", label: "Transport", icon: <PiVanLight /> },
        { id: "train", label: "Train", icon: <IoTrainOutline /> },
      ],
    },
    {
      id: 11,
      title: "Brahmagiri Hills Trek",
      description: "Trek to the origin of River Godavari with scenic views.",
      category: "Eco-Tourism",
      price: 2600,
      status: "Inactive",
      images: ["https://picsum.photos/200?11"],
      features: [
        { id: "flight", label: "Flight", icon: <PiAirplaneTakeoffLight /> },
      ],
    },
    {
      id: 12,
      title: "Pandharpur Vitthal Temple",
      description: "Dedicated to Lord Vitthal (Krishna). A major pilgrimage, especially during Ashadhi Ekadashi.",
      category: "Religious Tourism",
      price: 1700,
      status: "Active",
      images: ["https://picsum.photos/200?12"],
      features: [
        { id: "flight", label: "Flight", icon: <PiAirplaneTakeoffLight /> },
        { id: "sightseeing", label: "Sightseeing", icon: <LuTrees /> },
        { id: "train", label: "Train", icon: <IoTrainOutline /> },
      ],
    },
    {
      id: 13,
      title: "Kalaram Temple Darshan",
      description: "Sacred visit to the famous Kalaram Temple in Panchvati.",
      category: "Religious Tourism",
      price: 1300,
      status: "Active",
      images: ["https://picsum.photos/200?13"],
      features: [
        { id: "flight", label: "Flight", icon: <PiAirplaneTakeoffLight /> },
        { id: "sightseeing", label: "Sightseeing", icon: <LuTrees /> },
        { id: "train", label: "Train", icon: <IoTrainOutline /> },
      ],
    },
    {
      id: 14,
      title: "Ashtavinayak (Ganpati Temples Circuit)",
      description: "A group of 8 sacred temples of Lord Ganesha across Maharashtra",
      category: "Religious Tourism",
      price: 3000,
      status: "Inactive",
      images: ["https://picsum.photos/200?14"],
       features: [   
        { id: "flight", label: "Flight", icon: <PiAirplaneTakeoffLight /> },
        { id: "sightseeing", label: "Sightseeing", icon: <LuTrees /> },
        { id: "transport", label: "Transport", icon: <PiVanLight /> },
        { id: "train", label: "Train", icon: <IoTrainOutline /> },
      ],
    },
    {
      id: 15,
      title: "Street Food & Market Tour",
      description: "Explore local markets and taste Nashik’s famous snacks.",
      category: "Culinary Tourism",
      price: 1400,
      status: "Active",
      images: ["https://picsum.photos/200?15"],
       features: [   
        { id: "flight", label: "Flight", icon: <PiAirplaneTakeoffLight /> },
        { id: "sightseeing", label: "Sightseeing", icon: <LuTrees /> },
      ],
    },
  ];




  const [tours, setTours] = useState(initialTours);
  const [page, setPage] = useState("table");
  const [editData, setEditData] = useState(null);

  const tourFields = [
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price" },
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
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span className={value === "Active" ? "text-green-600" : "text-yellow-600"}>
          {value}
        </span>
      ),
    },
  ];

  // ✅ SAVE (ADD + EDIT)
  const handleSave = (data) => {
    if (editData) {
      setTours((prev) =>
        prev.map((item) => (item.id === data.id ? data : item))
      );
    } else {
      setTours((prev) => [
        { ...data, id: Date.now() }, // add at top
        ...prev,
      ]);
    }

    setPage("table");
    setEditData(null);
  };

  // ✅ EDIT
  const handleEdit = (tour) => {
    setEditData(tour);
    setPage("form");
  };

  // ✅ DELETE
  const handleDelete = (id) => {
    setTours((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      {page === "table" ? (
        <TourTable
          hotels={tours} // reused prop name
          onAdd={() => setPage("form")}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      ) : (
        <TourForm
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
        title="Tour Details"
      />
    </>
  );
};

export default TourManager;