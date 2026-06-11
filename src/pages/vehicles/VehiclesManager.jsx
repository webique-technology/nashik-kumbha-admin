import React, { useState, useEffect} from "react";
import { useNavigate, useLocation, useParams,Routes, Route } from "react-router-dom";

import VehiclesTable from "./VehiclesTable";
import VehiclesForm from "./VehiclesForm";
import api from "../../services/axiosInstance";
import ViewModal from "../../viewmodel/ViewModal";


export const CATEGORY_OPTIONS = [
  { id: "crista", label: "Crista" },
  { id: "traveller", label: "Traveller" },
  { id: "car", label: "Car" },
  { id: "sedan", label: "Sedan" },
  { id: "bus", label: "Bus" },
];


// const getCategoryLabel = (id) => {
//   return CATEGORY_OPTIONS.find((c) => c.id === id)?.label || id;
// };
// const getCategoryLabel = (id) => {
//   return categories.find((c) => String(c.id) === String(id))?.category || id;
// };


const EditVehicleWrapper = ({
      fetchSingleVehicle,
      editData,
      handleSave,
      navigate,
      categories,
      errors,
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
          categories={categories}
          errors={errors}
          onCancel={() => navigate("/vehicle")}
        />
      );
  };

const VehiclesManager = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const [viewModal, setViewModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const handleView = (tour) => {
    setSelectedTour(tour);
    setViewModal(true);
  };

  // const [hotels, setHotels] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [editData, setEditData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});

  const fetchCategories = async () => {
    try {
      const response = await api.get("/vehicle-categories");

      console.log("categories:", response.data.data);

      // adjust if api structure differs
      setCategories(response.data.data);
    } catch (error) {
      console.log("category fetch error:", error);
    }
  };
  const getCategoryLabel = (value) => {
    if (!value) return "";

    // if backend sends full object
    if (typeof value === "object") {
      return value.category || "";
    }

    // if backend sends only id
    return (
      categories.find(
        (c) => String(c.id) === String(value)
      )?.category || ""
    );
  };
  
  // const fetchVehicles = async () => {
  //   try {
  //     const response = await api.get("/vehicles");
  //     console.log("vehicles:", response.data);
  //     setVehicles(response.data.data.data);
  //   } catch (error) {
  //     console.log("vehicle fetch error:", error);
  //   }
  // };

  const fetchVehicles = async (page = 1, name = searchName, category = searchCategory) => {
    try { 
     const response = await api.get("/vehicles", { params: { page, name, category } })

      setVehicles(response.data.data.data);

      setPagination({
        current_page: response.data.data.current_page,
        last_page: response.data.data.last_page,
        total: response.data.data.total,
        from: response.data.data.from,
        to: response.data.data.to,
        next_page_url:
          response.data.data.next_page_url,
        prev_page_url:
          response.data.data.prev_page_url,
      });
    } catch (error) {
      console.log("vehicle fetch error:", error);
    }
  };

  const fetchSingleVehicle = async (id) => {
    try {
      const response = await api.get(`/vehicles/${id}`);
      // setEditData(response.data.data);
      const vehicle = response.data.data;

      setEditData({
        ...vehicle,

        category_id:
          vehicle.category_id ||
          vehicle.category?.id ||
          "",

        features:
          vehicle.features?.map((f) =>
            typeof f === "object"
              ? f.label || f.name
              : f
          ) || [],
      });
    } catch (error) {
      console.log("single vehicle error:", error);  
    }
  };


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

  const vehicleFields = [
  { key: "name", label: "Vehicle Name" },
 
  { key: "category.category", label: "Category" },
  { key: "total_seats", label: "Total Seat" },
  { key: "location", label: "Location" },
  { key: "base_price", label: "Price" },
 
  { key: "features", label: "Features" },
  { key: "status", label: "Status" },
];

  // useEffect(() => {
  //   fetchVehicles();
  //    fetchCategories();
  // }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchVehicles(1, searchName, searchCategory );
      fetchCategories();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchName, searchCategory]);

  const handleSave = async (data) => {
        setErrors({});
      try {

        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("description", data.description);
        // formData.append("category", data.category);
        formData.append("category_id", data.category_id);
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
        setErrors({});
        setEditData(null);
        navigate("/vehicle");

      } catch (error) {
         console.log("vehicle save error:", error);

          if (error.response?.status === 422) {
            console.log("vehicle error:", error.response?.data);
            setErrors(error.response.data.errors || {});
          }
      }
  };

  const handleEdit = async (vehicle) => {
    await fetchSingleVehicle(vehicle.id);
    navigate(`/vehicle/edit/${vehicle.id}`);
  };

  const handleDelete = async (id) => {
      try {
        const response = await api.delete(`/vehicles/${id}`);
        console.log("delete response:", response.data);
        fetchVehicles(pagination.current_page);
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
            categories={categories}
            onAdd={() => navigate("/vehicle/add")}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            pagination={pagination}
            fetchVehicles={fetchVehicles}
            searchName={searchName}
            setSearchName={setSearchName}
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
          />
        }
      />

      <Route
        path="/add"
        element={
          <VehiclesForm
            onSave={handleSave}
            categories={categories}
            errors={errors}
            onCancel={() => navigate("/vehicle")}
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
            categories={categories}
            errors={errors}
          />
        }
      />

    </Routes>

    <ViewModal
      isOpen={viewModal}
      onClose={() => setViewModal(false)}
      data={selectedTour}
      // fields={tourFields}
      fields={vehicleFields}
      title="Vehicles Details"
    />
  </>
);
};

export default VehiclesManager;