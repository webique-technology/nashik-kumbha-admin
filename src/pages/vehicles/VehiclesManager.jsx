import React, { useState } from "react";

import VehiclesTable from "./VehiclesTable";
import VehiclesForm from "./VehiclesForm";

import vehicleOne from "../../assets/images/vehicles/sedan-one-toyota-etios.png";
import vehicleTwo from "../../assets/images/vehicles/sedan-two-maruti-swift-dezire.jpg";
import vehicleThr from "../../assets/images/vehicles/sedan-three-honda-amaze.jpg";

import busOne from "../../assets/images/vehicles/bus-one-tempo-traveler.png";
import busTwo from "../../assets/images/vehicles/bus-three-tempo-traveler.png";
import busThr from "../../assets/images/vehicles/bus-two-mini-bus.jpg";

import suvOne from "../../assets/images/vehicles/suv-one-toyota-innova.png";
import suvTwo from "../../assets/images/vehicles/suv-two-toyota-innova-crysta.png";
import suvThr from "../../assets/images/vehicles/suv-three-ertiga.jpg";
import suvFvr from "../../assets/images/vehicles/suv-four-toyota-innova.png";
import ViewModal from "../../viewmodel/ViewModal";
import { FaRegSnowflake } from "react-icons/fa";
import { FaFan } from "react-icons/fa";
import { FaLuggageCart } from "react-icons/fa";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { IoBowlingBallOutline } from "react-icons/io5";
export const CATEGORY_OPTIONS = [
  { id: "crista", label: "Crista" },
  { id: "traveller", label: "Traveller" },
  { id: "car", label: "Car" },
  { id: "sedan", label: "Sedan" },
  { id: "bus", label: "Bus" },
];

const getCategoryLabel = (id) => {
  return CATEGORY_OPTIONS.find((c) => c.id === id)?.label || id;
};

const VehiclesManager = () => {
  const [viewModal, setViewModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const handleView = (tour) => {
    setSelectedTour(tour);
    setViewModal(true);
  };
  const initialHotels = [
    {
      id: 1,
      image: suvOne,
      name: "Toyota Innova Crysta (7 Seater)",
      description: "SUVs – Comfortable option for families or small groups",
      category: "crista",
      tseat: 2,
      location: "Mumbai",
      pterm: "Net Terms",
      price: 180.00,
      status: "AVAILABLE",
      features: [   
              { id: "ac", label:"AC", icon: <FaRegSnowflake  /> },
              { id: "nac", label:"Non AC", icon: <FaFan /> },
              { id: "ma", label:"ABS and Multiple Airbags", icon: <IoBowlingBallOutline /> },
            ],
    },
    {
      id: 2,
      image: suvTwo,
      name: "Toyota Innova (7 Seater)",
      description: "SUVs – Comfortable option for families or small groups",
      category: "sedan",
      tseat: 3,
      location: "Delhi",
      pterm: "Cash on Delivery (COD)",
      price: 200.00,
      status: "RENTED",
      features: [   
              { id: "ac", label:"AC", icon: <FaRegSnowflake  /> },
              { id: "nac", label:"Non AC", icon: <FaFan /> },
            ],
    },
    {
      id: 3,
      image: suvThr,
      name: "Maruti Suzuki Ertiga (7 Seater)",
      description: "SUVs – Comfortable option for families or small groups",
      category: "traveller",
      tseat: 5,
      location: "Pune",
      pterm: "Due on Receipt",
      price: 150.00,
      status: "AVAILABLE",
      features: [   
              { id: "ac", label:"AC", icon: <FaRegSnowflake  /> },
              { id: "nac", label:"Non AC", icon: <FaFan /> },
              { id: "ma", label:"ABS and Multiple Airbags", icon: <IoBowlingBallOutline /> },
            ],
    },
    {
      id: 4,
      image: suvFvr,
      name: "Toyota Innova (7 Seater)",
      description: "SUVs – Comfortable option for families or small groups",
      category: "bus",
      tseat: 1,
      location: "Bangalore",
      pterm: "Installment / Stage Payment",
      price: 120.00,
      status: "In Maintenance",
      features: [   
              { id: "ac", label:"AC", icon: <FaRegSnowflake  /> },
              { id: "nac", label:"Non AC", icon: <FaFan /> },
              { id: "als", label:"Ample Luggage Space", icon: <FaLuggageCart /> },
            ],
    },
    {
      id: 5,
      image: vehicleOne,
      name: "Toyota Etios (5 Seater)",
      description: "Sedans – Ideal for solo travelers or couples",
      category: "car",
      tseat: 4,
      location: "Chennai",
      pterm: "Advance Payment",
      price: 130.00,
      status: "AVAILABLE",
      features: [   
              { id: "cs", label:"Comfortable Seating", icon: <MdAirlineSeatReclineNormal /> },
              { id: "ma", label:"ABS and Multiple Airbags", icon: <IoBowlingBallOutline /> },
            ],
    },
    {
      id: 6,
      image: vehicleTwo,
      name: "Maruti Swift Dezire (5 Seater)",
      description: "Sedans – Ideal for solo travelers or couples",
      category: "crista",
      tseat: 2,
      location: "Jaipur",
      pterm: "Installment / Stage Payment",
      price: 170.00,
      status: "RENTED",
      features: [   
              { id: "ac", label:"AC", icon: <FaRegSnowflake  /> },
              { id: "nac", label:"Non AC", icon: <FaFan /> },
              { id: "ma", label:"ABS and Multiple Airbags", icon: <IoBowlingBallOutline /> },
            ],
    },
    {
      id: 7,
      image: vehicleThr,
      name: "Honda Amaze (5 Seater)",
      description: "Sedans – Ideal for solo travelers or couples",
      category: "sedan",
      tseat: 6,
      location: "Hyderabad",
      pterm: "Advance Payment",
      price: 220.00,
      status: "AVAILABLE",
      features: [   
              { id: "ac", label:"AC", icon: <FaRegSnowflake  /> },
              { id: "ma", label:"ABS and Multiple Airbags", icon: <IoBowlingBallOutline /> },
            ],
    },
    {
      id: 8,
      image: busOne,
      name: "Tempo Traveler (17 Seater)",
      description: "Tempo Travelers / Buses – Perfect for larger groups",
      category: "car",
      tseat: 2,
      location: "Ahmedabad",
      pterm: "Installment / Stage Payment",
      price: 160.00,
      status: "RENTED",
      features: [   
              { id: "ac", label:"AC", icon: <FaRegSnowflake  /> },
              { id: "nac", label:"Non AC", icon: <FaFan /> },
              { id: "als", label:"Ample Luggage Space", icon: <FaLuggageCart /> },
            ],
    },
    {
      id: 9,
      image: busTwo,
      name: "Mini Bus (35 Seater to 50 seater)",
      description: "Tempo Travelers / Buses – Perfect for larger groups",
      category: "traveller",
      tseat: 5,
      location: "Kolkata",
      pterm: "Cash on Delivery (COD)",
      price: 110.00,
      status: "AVAILABLE",
      features: [   
              { id: "ac", label:"AC", icon: <FaRegSnowflake  /> },
              { id: "als", label:"Ample Luggage Space", icon: <FaLuggageCart /> },
              { id: "cs", label:"Comfortable Seating", icon: <MdAirlineSeatReclineNormal /> },
             
            ],
    },
    {
      id: 10,
      image: busThr,
      name: "Tempo Traveler (13 Seater)",
      description: "Tempo Travelers / Buses – Perfect for larger groups",
      category: "bus",
      tseat: 10,
      location: "Nagpur",
      pterm: "Advance Payment",
      price: 100.00,
      status: "In Maintenance",
      features: [   
              { id: "ac", label:"AC", icon: <FaRegSnowflake  /> },
              { id: "nac", label:"Non AC", icon: <FaFan /> },
              { id: "ma", label:"ABS and Multiple Airbags", icon: <IoBowlingBallOutline /> },
            ],
    },
    {
      id: 11,
      image: suvOne,
      name: "Toyota Innova Crysta (7 Seater)",
      description: "SUVs – Comfortable option for families or small groups",
      category: "crista",
      tseat: 20,
      location: "Mumbai",
      pterm: "Cash on Delivery (COD)",
      price: 180.00,
      status: "AVAILABLE",
      features: [   
              { id: "ac", label:"AC", icon: <FaRegSnowflake  /> },
              { id: "ma", label:"ABS and Multiple Airbags", icon: <IoBowlingBallOutline /> },
            ],
    },
    {
      id: 12,
      image: suvTwo,
      name: "Toyota Innova (7 Seater)",
      description: "SUVs – Comfortable option for families or small groups",
      category: "bus",
      tseat: 21,
      location: "Delhi",
      pterm: "Advance Payment",
      price: 200.00,
      status: "RENTED",
      features: [   
            
              { id: "ma", label:"ABS and Multiple Airbags", icon: <IoBowlingBallOutline /> },
            ],
    },
    {
      id: 13,
      image: suvThr,
      name: "Maruti Suzuki Ertiga (7 Seater)",
      description: "SUVs – Comfortable option for families or small groups",
      category: "Traveller",
      tseat: 22,
      location: "Pune",
      pterm: "Advance Payment",
      price: 150.00,
      status: "AVAILABLE",
      features: [   
              { id: "ac", label:"AC", icon: <FaRegSnowflake  /> },
              { id: "nac", label:"Non AC", icon: <FaFan /> },
              { id: "ma", label:"ABS and Multiple Airbags", icon: <IoBowlingBallOutline /> },
            ],
    },
    {
      id: 14,
      image: suvThr,
      name: "Maruti Suzuki Ertiga (7 Seater)",
      description: "SUVs – Comfortable option for families or small groups",
      category: "sedan",
      tseat: 14,
      location: "Pune",
      pterm: "Cash on Delivery (COD)",
      price: 150.00,
      status: "AVAILABLE",
      features: [   
              { id: "als", label:"Ample Luggage Space", icon: <FaLuggageCart /> },
              { id: "cs", label:"Comfortable Seating", icon: <MdAirlineSeatReclineNormal /> },
              { id: "ma", label:"ABS and Multiple Airbags", icon: <IoBowlingBallOutline /> },
            ],
    },
    {
      id: 15,
      image: vehicleThr,
      name: "Honda Amaze (5 Seater)",
      description: "Sedans – Ideal for solo travelers or couples",
      category: "car",
      tseat: 25,
      location: "Hyderabad",
      pterm: "Cash on Delivery (COD)",
      price: 220.00,
      status: "AVAILABLE",
      features: [   
              { id: "ac", label:"AC", icon: <FaRegSnowflake  /> },
              { id: "nac", label:"Non AC", icon: <FaFan /> },
            ],
    },
  ];

  const [hotels, setHotels] = useState(initialHotels);
  const [page, setPage] = useState("table");
  const [editData, setEditData] = useState(null);


  const tourFields = [
    { key: "name", label: "Vehicle Name" },
    { key: "description", label: "Description" },
    {
      key: "category",
      label: "Category",
      render: (value) => getCategoryLabel(value),
    },
    
    { key: "tseat", label: "total Seat" },
    { key: "location", label: "Location" },
    { key: "price", label: "Price" },
    { key: "pterm", label: "payment terms" },
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
        <span className={value === "AVAILABLE" ? "text-green-600" : "text-red-600"}>
          {value}
        </span>
      ),
    },
  ];



  const handleSave = (data) => {
    if (editData) {
      setHotels((prev) =>
        prev.map((item) =>
          item.id === data.id ? data : item
        )
      );
    } else {
      setHotels((prev) => [
        {
          ...data,
          id: Date.now(),
        },
        ...prev, // ✅ already correct (adds on top)
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
        <VehiclesTable
          hotels={hotels}
          onAdd={() => setPage("form")}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      ) : (
        <VehiclesForm
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
        title="Vehicles Details"
      />
    </>
  );
};

export default VehiclesManager;