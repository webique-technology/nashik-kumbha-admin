import React, { useState, useEffect } from "react";
import {
  useNavigate,
  useParams,
  Routes,
  Route,
} from "react-router-dom";

import TourTable from "./TourTable";
import TourForm from "./TourForm";
import api from "../../services/axiosInstance";
import ViewModal from "../../viewmodel/ViewModal";

const EditTourWrapper = ({
  fetchSingleTour,
  editData,
  handleSave,
  navigate,
  vehicleCategories,
}) => {
  const { id } = useParams();

  useEffect(() => {
    if (id && !editData) {
      fetchSingleTour(id);
    }
  }, [id]);

  if (!editData) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <TourForm
      onSave={handleSave}
      editData={editData}
      vehicleCategories={vehicleCategories}
      onCancel={() => navigate("/dashboard/tours")}
    />
  );
};

const TourManager = () => {
  const navigate = useNavigate();

  const [tours, setTours] = useState([]);
  const [editData, setEditData] = useState(null);

  const [viewModal, setViewModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  const [vehicleCategories, setVehicleCategories] = useState([]);

  const handleView = (tour) => {
    setSelectedTour(tour);
    setViewModal(true);
  };

  const fetchTours = async () => {
    try {
      const response = await api.get("/tours");
      setTours(response.data.data.data);
    } catch (error) {
      console.log("tour fetch error:", error);
    }
  };
  const fetchVehicleCategories = async () => {
    try {
      const response = await api.get("/vehicle-categories");

      // response.data.data same as vehicles manager
      setVehicleCategories(response.data.data || []);
    } catch (error) {
      console.log("vehicle categories error:", error);
    }
  };

  const fetchSingleTour = async (id) => {
    try {
      const response = await api.get(`/tours/${id}`);
      setEditData(response.data.data);
    } catch (error) {
      console.log("single tour error:", error);
    }
  };

  useEffect(() => {
    fetchTours();
    fetchVehicleCategories();
  }, []);

  const handleSave = async (data) => {
    try {
      if (editData) {
        await api.post(`/tours/${editData.id}`, data);
      } else {
        await api.post("/tours", data);
      }

      fetchTours();
      setEditData(null);
      navigate("/dashboard/tours");
    } catch (error) {
      console.log("save error:", error);
    }
  };

  const handleEdit = async (tour) => {
    await fetchSingleTour(tour.id);
    navigate(`/dashboard/tours/edit/${tour.id}`);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tours/${id}`);
      fetchTours();
    } catch (error) {
      console.log("delete error:", error);
    }
  };

  const tourFields = [
    { key: "name", label: "Tour Name" },
    { key: "location", label: "Location" },
    { key: "price", label: "Price" },
    { key: "status", label: "Status" },
  ];

  return (
    <>
      <Routes>
  <Route
    index
    element={
      // <TourTable
      //   tours={tours}
      //   onAdd={() => navigate("/dashboard/tour/add")}
      //   onEdit={handleEdit}
      //   onDelete={handleDelete}
      //   onView={handleView}
      // />
      <TourTable
          tourData={tours}
          onAdd={() => navigate("/dashboard/tours/add")}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          
        />
    }
  />

  <Route
    path="add"
    element={
      <TourForm
        onSave={handleSave}
        vehicleCategories={vehicleCategories}
        onCancel={() => navigate("/dashboard/tours")}
      />
    }
  />

  <Route
    path="edit/:id"
    element={
      <EditTourWrapper
        fetchSingleTour={fetchSingleTour}
        editData={editData}
        handleSave={handleSave}
        navigate={navigate}
        vehicleCategories={vehicleCategories}
      />
    }
  />
</Routes>

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