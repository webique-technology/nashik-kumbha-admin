import React, { useState } from "react";

import VehiclesTable from "./VehiclesTable";
import VehiclesForm from "./VehiclesForm";

const VehiclesManager = () => {
const initialHotels = [
  {
    id: 1,
    image: "https://picsum.photos/200?1",
    name: "Mahindra XUV700",
    description: "Luxury SUV · Black",
    category: "Business Luxury",
    location: "Mumbai",
    price: 180.00,
    status: "AVAILABLE",
  
  },
  {
    id: 2,
    image: "https://picsum.photos/200?1",
    name: "Toyota Fortuner",
    description: "Premium SUV · White",
    category: "Off-road Elite",
    location: "Delhi",
    price: 200.00,
    status: "RENTED",

  },
  {
    id: 3,
    image: "https://picsum.photos/200?1",
    name: "Tata Safari",
    description: "Family SUV · Grey",
    category: "Group VIP",
    location: "Pune",
    price: 150.00,
    status: "AVAILABLE",

  },
  {
    id: 4,
    image: "https://picsum.photos/200?1",
    name: "Hyundai Creta",
    description: "Compact SUV · Blue",
    category: "Business Luxury",
    location: "Bangalore",
    price: 120.00,
    status: "In Maintenance",

  },
  {
    id: 5,
    image: "https://picsum.photos/200?1",
    name: "Kia Seltos",
    description: "Stylish SUV · Red",
    category: "Business Luxury",
    location: "Chennai",
    price: 130.00,
    status: "AVAILABLE",

  },
  {
    id: 6,
    image: "https://picsum.photos/200?1",
    name: "Mahindra Thar",
    description: "Off-road Beast · Green",
    category: "Off-road Elite",
    location: "Jaipur",
    price: 170.00,
    status: "RENTED",

  },
  {
    id: 7,
    image: "https://picsum.photos/200?1",
    name: "Force Urbania",
    description: "Luxury Van · Silver",
    category: "Group VIP",
    location: "Hyderabad",
    price: 220.00,
    status: "AVAILABLE",
  
  },
  {
    id: 8,
    image: "https://picsum.photos/200?1",
    name: "Toyota Innova Crysta",
    description: "Premium MPV · White",
    category: "Group VIP",
    location: "Ahmedabad",
    price: 160.00,
    status: "RENTED",

  },
  {
    id: 9,
    image: "https://picsum.photos/200?1",
    name: "Maruti Suzuki Ertiga",
    description: "Family MPV · Silver",
    category: "Group VIP",
    location: "Kolkata",
    price: 110.00,
    status: "AVAILABLE",

  },
  {
    id: 10,
    image: "https://picsum.photos/200?1",
    name: "Honda City",
    description: "Executive Sedan · White",
    category: "Business Luxury",
    location: "Nagpur",
    price: 100.00,
    status: "In Maintenance",

  },
  {
    id: 11,
    image: "https://picsum.photos/200?1",
    name: "Skoda Superb",
    description: "Luxury Sedan · Black",
    category: "Business Luxury",
    location: "Mumbai",
    price: 210.00,
    status: "AVAILABLE",

  },
  {
    id: 12,
    image: "https://picsum.photos/200?1",
    name: "MG Gloster",
    description: "Full-size SUV · Brown",
    category: "Off-road Elite",
    location: "Delhi",
    price: 230.00,
    status: "RENTED",

  },
  {
    id: 13,
    image: "https://picsum.photos/200?1",
    name: "Jeep Compass",
    description: "Adventure SUV · Grey",
    category: "Off-road Elite",
    location: "Pune",
    price: 175.00,
    status: "AVAILABLE",

  },
  {
    id: 14,
    image: "https://picsum.photos/200?1",
    name: "Volvo XC90",
    description: "Luxury SUV · White",
    category: "Business Luxury",
    location: "Bangalore",
    price: 300.00,
    status: "AVAILABLE",

  },
  {
    id: 15,
    image: "https://picsum.photos/200?1",
    name: "Tempo Traveller",
    description: "Group Travel Van · White",
    category: "Group VIP",
    location: "Goa",
    price: 190.00,
    status: "RENTED",

  },
];

  const [hotels, setHotels] = useState(initialHotels);
  const [page, setPage] = useState("table");
  const [editData, setEditData] = useState(null);

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
        />
      ) : (
        <VehiclesForm
          onSave={handleSave}
          editData={editData}
          onCancel={() => setPage("table")}
        />
      )}
    </>
  );
};

export default VehiclesManager;