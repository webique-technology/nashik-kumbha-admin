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

  // Fetch the tour packages data
  const fetchTours = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/tours");
      // Gracefully handle deep nested data structure
      const fetchedData =
        response.data?.data?.data || response.data?.data || response.data || [];
      setTours(Array.isArray(fetchedData) ? fetchedData : []);
    } catch (err) {
      setError("Failed to load tours.");
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- Unified Save Handler (Handles FormData) ---
  const handleSave = async (formDataInstance) => {
    setLoading(true);
    setError("");
    try {
      if (editData) {
        // UPDATE Logic (Multipart forms usually need POST spoofing or regular PUT depending on backend)
        // Adjust endpoint if your backend expects /tours/update/${editData.id}
        const response = await api.post(
          `/tours/${editData.id}`,
          formDataInstance,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );

        const updatedTour = response.data?.data || response.data;
        setTours((prev) =>
          prev.map((item) =>
            item.id === editData.id ? { ...item, ...updatedTour } : item,
          ),
        );
      } else {
        // CREATE Logic (POST)
        const response = await api.post("/tours", formDataInstance, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const newTour = response.data?.data || response.data;
        setTours((prev) => [newTour, ...prev]);
      }

      setPage("table");
      setEditData(null);
    } catch (err) {
      console.error("Save Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to save tour.");
    } finally {
      setLoading(false);
    }
  };

  // Delete tour package by id
  const handleDelete = async (id) => {
    try {
      await api.delete(`/tours/${id}`);
      setTours((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete tour.");
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

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
          onSave={handleSave}
          editData={editData}
          onCancel={() => {
            setPage("table");
            setEditData(null);
          }}
        />
      )}

      {viewModal && (
        <ViewModal
          isOpen={viewModal}
          onClose={() => setViewModal(false)}
          data={selectedTour}
          fields={tours}
        />
      )}
    </>
  );
};

export default TourManager;
