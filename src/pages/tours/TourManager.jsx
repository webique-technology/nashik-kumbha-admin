import React, { useState, useEffect } from "react";
import TourForm from "./TourForm";
import TourTable from "./TourTable";
import ViewModal from "../../viewmodel/ViewModal";
import api from "../../services/axiosInstance";

const TourManager = () => {
  const [tours, setTours] = useState([]);
  const [page, setPage] = useState("table");
  const [editData, setEditData] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // this function fetch the tour packages data
  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await api.get('/tours');
      // Adjusting to your specific nested data structure
      setTours(response.data.data.data || []);
      console.log("tour package",response.data);
      
    } catch (err) {
      setError("Failed to load tours.");
    } finally {
      setLoading(false);
    }
  };

  // --- Unified Save Handler ---
  const handleSave = async (tourData) => {
    setLoading(true);
    setError("");
    try {
      if (editData) {
        // UPDATE Logic (PUT)
        const response = await api.put(`/tours/${editData.id}`, tourData);
        setTours((prev) =>
          prev.map((item) => (item.id === editData.id ? response.data.data : item))
        );
      } else {
        // CREATE Logic (POST)
        const response = await api.post('/tours', tourData);
        const newTour = response.data.data;
        setTours((prev) => [newTour, ...prev]);
      }

      // Success: Go back to table
      setPage("table");
      setEditData(null);
    } catch (err) {
      console.error("Save Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to save tour.");
      // Note: We stay on the form page so the user doesn't lose their input on error
    } finally {
      setLoading(false);
    }
  };

  // this funtion delete the tour-package by id [any our package]
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;
    try {
      await api.delete(`/tours/${id}`);
      setTours((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      alert("Failed to delete tour.");
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // ... (handleEdit and handleView stay the same)

  const handleEdit = (tour) => {
    setEditData(tour);
    setPage("form");
  };

  const handleView = (tour) => {
    setSelectedTour(tour);
    setViewModal(true);
  };

  return (
    <>
      {page === "table" ? (
        <TourTable
          tourData={tours}
          onAdd={() => setPage("form")}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          loading={loading}
          error={error}
        />
      ) : (
        <TourForm
          onSave={handleSave} // Now handles both Post and Put
          editData={editData}
          onCancel={() => {
            setPage("table");
            setEditData(null);
          }}
        />
      )}

      {/* ViewModal remains same */}
    </>
  );
};

export default TourManager;