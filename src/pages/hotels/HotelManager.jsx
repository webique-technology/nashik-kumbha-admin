import React, { useState, useEffect } from "react";
import HotelForm from "./HotelForm";
import HotelTable from "./HotelTable";
import ViewModal from "../../viewmodel/ViewModal";
import api from "../../services/axiosInstance";
import {
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";

export const CATEGORY_OPTIONS = [
  { id: "Veg", label: "Veg" },
  { id: "Nonveg", label: "Nonveg" },
  { id: "Jain", label: "Jain" },
];

const EditHotelWrapper = ({
  fetchSingleHotel,
  editData,
  handleSave,
  navigate,
}) => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchSingleHotel(id);
    }
  }, [id]);

  if (!editData) {
    return (
      <div className="p-6 text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <HotelForm
      onSave={handleSave}
      editData={editData}
      onCancel={() => navigate("/dashboard/hotel")}
    />
  );
};

const HotelManager = () => {
  const navigate = useNavigate();

  const [viewModal, setViewModal] = useState(false);
  const [selectedHotel, setSelectedHotel] =
    useState(null);

  const [hotels, setHotels] = useState([]);
  const [editData, setEditData] = useState(null);

  // ================= FETCH ALL HOTELS =================
  const fetchHotels = async () => {
    try {
      const response = await api.get("/hotels");

      console.log("hotels:", response.data);

      setHotels(response?.data?.data?.data || []);
    } catch (error) {
      console.log("hotel fetch error:", error);
    }
  };

  // ================= FETCH SINGLE HOTEL =================
  const fetchSingleHotel = async (id) => {
    try {
      const response = await api.get(`/hotels/${id}`);

      console.log("single hotel:", response.data);

      setEditData(response?.data?.data || null);
    } catch (error) {
      console.log("single hotel fetch error:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // ================= VIEW =================
  const handleView = (hotel) => {
    setSelectedHotel(hotel);
    setViewModal(true);
  };

  // ================= SAVE =================
  const handleSave = async (formData) => {
    try {
      const payload = new FormData();

      payload.append("name", formData.name || "");
      payload.append(
        "description",
        formData.description || ""
      );
      payload.append("rating", formData.rating || "");
      payload.append(
        "category",
        formData.category || ""
      );
      payload.append("foodcat", formData.foodcat || "");
      payload.append(
        "location",
        formData.location || ""
      );
      payload.append("price", formData.price || "");
      payload.append(
        "offerPrice",
        formData.offerPrice || ""
      );

      // FEATURES
      payload.append(
        "features",
        JSON.stringify(formData.features || [])
      );

      // IMAGES
      if (formData.images?.length) {
        formData.images.forEach((img) => {
          if (img instanceof File) {
            payload.append("images[]", img);
          }
        });
      }

      // UPDATE
      if (editData?.id) {
        payload.append("_method", "PUT");

        await api.post(
          `/hotels/${editData.id}`,
          payload,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );
      }

      // CREATE
      else {
        await api.post("/hotels", payload, {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        });
      }

      await fetchHotels();

      setEditData(null);

      navigate("/dashboard/hotel");
    } catch (error) {
      console.log("hotel save error:", error);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await api.delete(`/hotels/${id}`);

      fetchHotels();
    } catch (error) {
      console.log("hotel delete error:", error);
    }
  };

  // ================= TABLE FIELDS =================
  const hotelFields = [
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "rating", label: "Rating" },
    { key: "category", label: "Category" },
    { key: "foodcat", label: "Food Category" },
    { key: "price", label: "Price" },
    { key: "location", label: "Location" },
  ];

  return (
    <>
      <Routes>

        {/* TABLE PAGE */}
        <Route
          index
          element={
            <HotelTable
              hotels={hotels}
              onAdd={() =>
                navigate("/dashboard/hotel/add")
              }
              onEdit={(hotel) =>
                navigate(
                  `/dashboard/hotel/edit/${hotel.id}`
                )
              }
              onDelete={handleDelete}
              onView={handleView}
            />
          }
        />

        {/* ADD PAGE */}
        <Route
          path="add"
          element={
            <HotelForm
              onSave={handleSave}
              onCancel={() =>
                navigate("/dashboard/hotel")
              }
            />
          }
        />

        {/* EDIT PAGE */}
        <Route
          path="edit/:id"
          element={
            <EditHotelWrapper
              fetchSingleHotel={fetchSingleHotel}
              editData={editData}
              handleSave={handleSave}
              navigate={navigate}
            />
          }
        />
      </Routes>

      {/* VIEW MODAL */}
      <ViewModal
        isOpen={viewModal}
        onClose={() => setViewModal(false)}
        data={selectedHotel}
        fields={hotelFields}
        title="Hotel Details"
      />
    </>
  );
};

export default HotelManager;