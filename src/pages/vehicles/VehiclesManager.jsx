import React, { useState, useEffect} from "react";

import VehiclesTable from "./VehiclesTable";
import VehiclesForm from "./VehiclesForm";
import api from "../../services/axiosInstance";

import { useNavigate, useLocation, useParams,Routes, Route } from "react-router-dom";

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

const EditVehicleWrapper = ({
      fetchSingleVehicle,
      editData,
      handleSave,
      navigate,
    }) => {

      const { id } = useParams();

      useEffect(() => {
        if (id && !editData) {
          fetchSingleVehicle(id);
        }
      }, [id]);

      if (!editData) {
        return <div className="p-5">Loading...</div>;
      }
      return (
        <VehiclesForm
          onSave={handleSave}
          editData={editData}
          onCancel={() => navigate("/dashboard/vehicle")}
        />
      );
  };

const VehiclesManager = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [viewModal, setViewModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const handleView = (tour) => {
    setSelectedTour(tour);
    setViewModal(true);
  };

  // const [hotels, setHotels] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [editData, setEditData] = useState(null);

// const VehiclesTable = ({
//     vehicles,
//     onAdd,
//     onEdit,
//     onDelete,
//     onView,
//   })
  
  

  const fetchVehicles = async () => {
    try {
      const response = await api.get("/vehicles");
      console.log("vehicles:", response.data);
      setVehicles(response.data.data.data);
    } catch (error) {
      console.log("vehicle fetch error:", error);
    }
  };

  const fetchSingleVehicle = async (id) => {
    try {
      const response = await api.get(`/vehicles/${id}`);
      setEditData(response.data.data);
    } catch (error) {
      console.log("single vehicle error:", error);
    }
  };

  // const [hotels, setHotels] = useState(initialHotels);
  // const [page, setPage] = useState("table");


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

  useEffect(() => {
    fetchVehicles();
  }, []);

  // const handleSave = (data) => {
  //   if (editData) {
  //     setHotels((prev) =>
  //       prev.map((item) =>
  //         item.id === data.id ? data : item
  //       )
  //     );
  //   } else {
  //     setHotels((prev) => [
  //       {
  //         ...data,
  //         id: Date.now(),
  //       },
  //       ...prev,
  //     ]);
  //   }

  //   setPage("table");
  //   setEditData(null);
  // };

  const handleSave = async (data) => {

      try {

        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("total_seats", data.total_seats);
        formData.append("location", data.location);
        formData.append("base_price", data.base_price);
        formData.append("status", data.status);

        // features array
          data.features.forEach((feature, index) => {
            formData.append(`features[${index}]`, feature);
          });

        // image
        if (data.image instanceof File) {
          formData.append("car_image", data.image);
        }

        let response;

        // UPDATE
        if (editData) {

          response = await api.post(
            `/vehicles/${editData.id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

        } else {

          // CREATE
          response = await api.post(
            "/vehicles",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

        }
        console.log("save response:", response.data);

        fetchVehicles();
        setEditData(null);
        navigate("/dashboard/vehicle");

      } catch (error) {
        console.log("vehicle save error:", error);
      }
  };

  // const handleEdit = (hotel) => {
  //   setEditData(hotel);
  //   setPage("form");
  // };

  const handleEdit = async (vehicle) => {
    await fetchSingleVehicle(vehicle.id);
    navigate(`/dashboard/vehicle/edit/${vehicle.id}`);
  };


  // const handleDelete = (id) => {
  //   setHotels((prev) => prev.filter((h) => h.id !== id));
  // };

  const handleDelete = async (id) => {
      try {
        const response = await api.delete(`/vehicles/${id}`);
        console.log("delete response:", response.data);
        fetchVehicles();
      } catch (error) {
        console.log("delete error:", error);
      }
  };

  return (
  <>
    <Routes>

      <Route
        path="/"
        element={
          <VehiclesTable
            vehicles={vehicles}
            onAdd={() => navigate("/dashboard/vehicle/add")}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        }
      />

      <Route
        path="/add"
        element={
          <VehiclesForm
            onSave={handleSave}
            onCancel={() => navigate("/dashboard/vehicle")}
          />
        }
      />

      <Route
        path="/edit/:id"
        element={
          <EditVehicleWrapper
            fetchSingleVehicle={fetchSingleVehicle}
            editData={editData}
            handleSave={handleSave}
            navigate={navigate}
          />
        }
      />

    </Routes>

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