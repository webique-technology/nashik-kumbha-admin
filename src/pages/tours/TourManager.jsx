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
  errors
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
      errors={errors}
      vehicleCategories={vehicleCategories}
      onCancel={() => navigate("/dashboard/tours")}
    />
  );
};

const TourManager = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({});

  const [tours, setTours] = useState([]);
  const [editData, setEditData] = useState(null);

  const [viewModal, setViewModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  const [vehicleCategories, setVehicleCategories] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [errors, setErrors] = useState({});

  const handleView = (tour) => {
    setSelectedTour(tour);
    setViewModal(true);
  };

  const fetchTours = async (page = 1,title = "") => {
    try {
       const response = await api.get("/tours", {params: { page, title,}, });
      setTours(response.data.data.data);
      setPagination({
        current_page: response.data.data.current_page,
        last_page: response.data.data.last_page,
        total: response.data.data.total,
        from: response.data.data.from,
        to: response.data.data.to,
        next_page_url: response.data.data.next_page_url,
        prev_page_url: response.data.data.prev_page_url,
      });
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

  // useEffect(() => {
  //   fetchTours();
  //   fetchVehicleCategories();
  // }, []);
    useEffect(() => {
      const timer = setTimeout(() => {
        fetchTours(
          1,
          searchTitle,
        );
        fetchVehicleCategories();
      }, 500);
      return () => clearTimeout(timer);
    }, [searchTitle]);

  const handleSave = async (data) => {
    try {
      setErrors({});
      if (editData) {
        await api.post(`/tours/${editData.id}`, data);
      } else {
        setErrors({});
        await api.post("/tours", data);
      }

      fetchTours();
      setEditData(null);
      navigate("/dashboard/tours");
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      }
    }
  };

  const handleEdit = async (tour) => {
     setErrors({});
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
    { key: "title", label: "Tour Name" },
    { key: "description", label: "Description" },
    { key: "base_price", label: "Price" },
    { key: "status", label: "Status" },
    {
      key: "highlights",
      label: "highlights",
      render: (highlights) => (
        <div className="flex flex-wrap gap-2">
          {highlights?.map((item) => (
            <span
              key={item}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-200 rounded"
            >
              <span className="text-sm">{item.icon}</span>
              {item}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "inclusions",
      label: "Inclusions",
      render: (inclusions) => (
        <div className="flex flex-wrap gap-2">
          {inclusions?.map((item) => (
            <span
              key={item}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-200 rounded"
            >
              <span className="text-sm">{item.icon}</span>
              {item}
            </span>
          ))}
        </div>
      ),
    },
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
          pagination={pagination}
          fetchTours={fetchTours}
          searchTitle={searchTitle}
          setSearchTitle={setSearchTitle}
        />
    }
  />

  <Route
    path="add"
    element={
      <TourForm
        onSave={handleSave}
        errors={errors}
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
        errors={errors}
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