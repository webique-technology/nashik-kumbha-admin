import React, { useState, useEffect } from "react";
import HotelForm from "./HotelForm";
import HotelTable from "./HotelTable";
import ViewModal from "../../viewmodel/ViewModal";
import api from "../../services/axiosInstance";
import useAlert from "../../hooks/useAlert";
import NotFound from "../404";
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
  errors
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
      errors={errors}
      onCancel={() => navigate("/hotel")}
    />
  );
};

const HotelManager = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [viewModal, setViewModal] = useState(false);
  const [selectedHotel, setSelectedHotel] =
    useState(null);

  const [hotels, setHotels] = useState([]);
  const [editData, setEditData] = useState(null);
  const [pagination, setPagination] = useState({});
  const [searchTitle, setSearchTitle] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [errors, setErrors] = useState({});

  // ================= FETCH ALL HOTELS =================

  const fetchHotels = async (
    page = 1,
    title = searchTitle,
    category = searchCategory,
    location = searchLocation
  ) => {
    try {
      const response = await api.get("/hotels", {
        params: {
          page,
          title,
          category, location
        },
      });

      const result = response.data.data;

      setHotels(result.data);

      setPagination({
        current_page: result.current_page,
        last_page: result.last_page,
        total: result.total,
        from: result.from,
        to: result.to,
        next_page_url: result.next_page_url,
        prev_page_url: result.prev_page_url,
      });
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

  // useEffect(() => {
  //   fetchHotels(1);
  // }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchHotels(
        1,
        searchTitle,
        searchCategory,
        searchLocation
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTitle, searchCategory, searchLocation]);

  // ================= VIEW =================
  const handleView = (hotel) => {
    setSelectedHotel(hotel);
    setViewModal(true);
  };

  // ================= SAVE =================
  // const handleSave = async (formData) => {
  //   try {
  //     const payload = new FormData();

  //     payload.append("title", formData.title || "");
  //     payload.append(
  //       "description",
  //       formData.description || ""
  //     );
  //     payload.append("rating", formData.rating || "");
  //     payload.append(
  //       "category",
  //       formData.category || ""
  //     );
  //     payload.append("meals", formData.meals || "");
  //     payload.append(
  //       "location",
  //       formData.location || ""
  //     );
  //     payload.append("base_price", formData.base_price || "");
  //     payload.append(
  //       "offer_price",
  //       formData.offer_price || ""
  //     );

  //     // FEATURES
  //     // payload.append(
  //     //   "features",
  //     //   JSON.stringify(formData.features || [])
  //     // );
  //     formData.features.forEach((feature) => {
  //       payload.append("features[]", feature);
  //     });

  //     // IMAGES
  //     if (formData.images?.length) {
  //       formData.images.forEach((img) => {
  //         if (img instanceof File) {
  //           payload.append("images[]", img);
  //         }
  //       });
  //     }

  //     // UPDATE
  //     if (editData?.id) {
  //       // payload.append("_method", "PUT");

  //       await api.post(
  //         `/hotels/${editData.id}`,
  //         payload,
  //         {
  //           headers: {
  //             "Content-Type":
  //               "multipart/form-data",
  //           },
  //         }
  //       );
  //     }

  //     // CREATE
  //     else {
  //       await api.post("/hotels", payload, {
  //         headers: {
  //           "Content-Type":
  //             "multipart/form-data",
  //         },
  //       });
  //     }

  //     await fetchHotels();

  //     setEditData(null);

  //     navigate("/hotel");
  //   } catch (error) {
  //     console.log("hotel save error:", error);
  //   }
  // };

  const handleSave = async (formData) => {
    setErrors({});

    try {
      const payload = new FormData();

      payload.append("title", formData.title || "");
      payload.append("rating", formData.rating || "");
      payload.append("category", formData.category || "");
      payload.append("meals", formData.meals || "");
      payload.append("location", formData.location || "");
      payload.append("base_price", formData.base_price || "");
      payload.append("offer_price", formData.offer_price || "");

      formData.features.forEach((feature) => {
        payload.append("features[]", feature);
      });
      formData.room_type.forEach((room) => {
        payload.append("room_type[]", room);
      });

      if (formData.images?.length) {
        formData.images.forEach((img) => {
          if (img instanceof File) {
            payload.append("images[]", img);
          }
        });
      }

      if (editData?.id) {
        await api.post(`/hotels/${editData.id}`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        showAlert(
          "Hotel updated successfully",
          "success"
        );

      } else {
        await api.post("/hotels", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        showAlert(
          "Hotel created successfully",
          "success"
        );

      }

      await fetchHotels();

      setErrors({});
      setEditData(null);

      navigate("/hotel");
    } catch (error) {

      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      }

      console.log(error);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await api.delete(`/hotels/${id}`);
      showAlert(
        "Hotel deleted successfully",
        "success"
      );

      fetchHotels(pagination.current_page, searchTitle, searchCategory, searchLocation);
    } catch (error) {
      showAlert(
        "Failed to delete hotel",
        "error"
      );

      console.log("hotel delete error:", error);
    }
  };

  // ================= TABLE FIELDS =================
  const hotelFields = [
    { key: "title", label: "title" },
    { key: "description", label: "Description" },
    { key: "rating", label: "Rating" },
    { key: "category", label: "Category" },
    { key: "meals", label: "Food Category" },
    { key: "base_price", label: "base_price" },
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
                navigate("/hotel/add")
              }
              onEdit={(hotel) =>
                navigate(
                  `/hotel/edit/${hotel.id}`
                )
              }
              onDelete={handleDelete}
              onView={handleView}
              pagination={pagination}
              fetchHotels={fetchHotels}
              searchTitle={searchTitle}
              setSearchTitle={setSearchTitle}
              searchCategory={searchCategory}
              setSearchCategory={setSearchCategory}
              searchLocation={searchLocation}
              setSearchLocation={setSearchLocation}
            />
          }
        />

        {/* ADD PAGE */}
        <Route
          path="add"
          element={
            <HotelForm
              onSave={handleSave}
              errors={errors}
              onCancel={() =>
                navigate("/hotel")
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
              errors={errors}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
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