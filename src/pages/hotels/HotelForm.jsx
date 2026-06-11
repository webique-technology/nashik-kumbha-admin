import React, { useRef, useState, useEffect } from "react";
import { FiTrash2, FiCheckCircle } from "react-icons/fi";
import { CATEGORY_OPTIONS } from "./HotelManager";
import { RiHotelLine } from "react-icons/ri";
import { IoFastFoodOutline, IoTrainOutline } from "react-icons/io5";
import { PiAirplaneTakeoffLight, PiVanLight } from "react-icons/pi";
import { LuTrees } from "react-icons/lu";
import { useParams } from "react-router-dom";
import BackButton from "../../components/ui/BackButton";

const HotelForm = ({ onSave, editData, onCancel,errors = {}, }) => {
  const { id } = useParams();

  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [featured, setFeatured] = useState(null);

  const topUploadRef = useRef();

  const options = [
    { id: "wifi", label: "Wifi", icon: <RiHotelLine /> },
    { id: "pool", label: "Pool", icon: <IoFastFoodOutline /> },
    { id: "parking", label: "Parking", icon: <PiAirplaneTakeoffLight /> },
    { id: "ac", label: "Ac", icon: <LuTrees /> },
    { id: "meals", label: "Meals", icon: <PiVanLight /> },
    // { id: "train", label: "Train", icon: <IoTrainOutline /> },
  ];

  const [selected, setSelected] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    // description: "",
    meals: "",
    rating: "",
    category: "",
    location: "",
    base_price: "",
    offer_price: "",
    images: [],
    features: [],
  });

  // ================= PREFILL EDIT =================
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || "",
        // description: editData.description || "",
        meals: editData.meals || "",
        rating: editData.rating || "",
        category: editData.category || "",
        location: editData.location || "",
        base_price: editData.base_price || "",
        offer_price: editData.offer_price || "",
        images: editData.images || [],
        features: editData.features || [],
      });

      const mappedFeatures = (editData.features || []).map((feature) => {
        return options.find(
          (opt) =>
            opt.label.toLowerCase() === feature.toLowerCase()
        );
      }).filter(Boolean);

      setSelected(mappedFeatures);

      // setSelected(editData.features || []);

      if (editData.images?.length > 0) {
        setPreviewImages(editData.images);
        setFeatured(editData.images[0]);
      }
    }
  }, [editData]);

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= FEATURE TOGGLE =================
  const handleToggle = (option) => {
    const exists = selected.find((item) => item.id === option.id);

    if (exists) {
      setSelected((prev) =>
        prev.filter((item) => item.id !== option.id)
      );
    } else {
      setSelected((prev) => [...prev, option]);
    }
  };

  // ================= FEATURE DELETE =================
  const handleDeleteFeature = (id) => {
    setSelected((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // ================= IMAGE UPLOAD =================
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setImages((prev) => [...prev, ...files]);

    setPreviewImages((prev) => [...prev, ...previews]);

    if (!featured && previews.length > 0) {
      setFeatured(previews[0]);
    }
  };

  // ================= IMAGE DELETE =================
  const handleDeleteImage = (index) => {
    const updatedPreview = previewImages.filter(
      (_, i) => i !== index
    );

    const updatedImages = images.filter(
      (_, i) => i !== index
    );

    setPreviewImages(updatedPreview);
    setImages(updatedImages);

    if (featured === previewImages[index]) {
      setFeatured(updatedPreview[0] || null);
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();

    // const hotelData = {
    //   ...formData,
    //   images,
    //   features: selected,
    // };
    const hotelData = {
      ...formData,
      images,
      features: selected.map((f) => f.label),
    };

    if (id) {
      hotelData.id = Number(id);
    }

    onSave(hotelData);
  };

  return (
    <main className="page-container">


      <div className="px-8 max-w-[1400px] mx-auto w-full mb-0 gap-8">
        <div className="flex items-center justify-start gap-3">
          <BackButton
            // label="Back to Blogs"
            to="/hotel"
            className="bg-primary text-white cursor-pointer"
          />
          <div>
            <h1 className="text-xl font-bold">
              {id ? "Edit Hotel" : "Add New Hotel Booking"}
            </h1>
            <p className="text-sm text-gray-500">
              {id
                ? "Update your Hotel Details below"
                : "Add New Hotel"}
            </p>
          </div>
        </div>
      </div>


      <form onSubmit={handleSubmit}>
        <div className="p-8 max-w-[1400px] mx-auto w-full grid grid-cols-12 gap-8">

          {/* LEFT SIDE */}
          <div className="col-span-12 lg:col-span-8 space-y-8">

            {/* BASIC INFO */}
            <section className="card bg-surface-container-lowest rounded-xl p-8 shadow-sm ring-1 ring-black/[0.03]">
              <div className="card-header flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">
                  edit_note
                </span>

                <h2 className="card-title text-lg font-bold tracking-tight">
                  Basic Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="form-label block mb-2">
                    Hotel Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title || ""}
                    onChange={handleChange}
                    placeholder="Hotel Name"
                    className="form-input w-full px-4 py-3 rounded-lg bg-surface-container-low"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="form-label block mb-2">
                    Rating
                  </label>

                  <input
                    type="number"
                    name="rating"
                    value={formData.rating || ""}
                    onChange={handleChange}
                    placeholder="5"
                    className="form-input w-full px-4 py-3 rounded-lg bg-surface-container-low"
                  />
                  {errors.rating && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.rating[0]}
                    </p>
                  )}
                </div>

                {/* <div className="md:col-span-2">
                  <label className="form-label block mb-2">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    placeholder="Hotel Description"
                    rows={5}
                    className="form-input w-full px-4 py-3 rounded-lg bg-surface-container-low"
                  />
                </div> */}

                <div>
                  <label className="form-label block mb-2">
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category || ""}
                    onChange={handleChange}
                    className="form-input w-full px-4 py-3 rounded-lg bg-surface-container-low"
                  >
                    <option value="">Select Category</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Premium">Premium</option>
                    <option value="Mid-Range">Mid-Range</option>
                    <option value="Budget">Budget</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="form-label block mb-2">
                    Location
                  </label>

                  {/* <select
                    name="location"
                    value={formData.location || ""}
                    onChange={handleChange}
                    className="form-input w-full px-4 py-3 rounded-lg bg-surface-container-low"
                  >
                    <option value="">Select Location</option>
                    <option value="Jaipur, Rajasthan">
                      Jaipur, Rajasthan
                    </option>
                    <option value="Mumbai, Maharashtra">
                      Mumbai, Maharashtra
                    </option>
                    <option value="Delhi">
                      Delhi
                    </option>
                    <option value="Goa">
                      Goa
                    </option>
                  </select> */}
                   <input
                    type="text"
                    name="location"
                    value={formData.location || ""}
                    onChange={handleChange}
                    placeholder="Location"
                    className="form-input w-full px-4 py-3 rounded-lg bg-surface-container-low"
                  />
                  {errors.location && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.location[0]}
                      </p>
                    )}
                </div>

              </div>
            </section>

            {/* FEATURES */}
            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm ring-1 ring-black/[0.03]">

              <div className="flex items-center gap-3 mb-5">
                <span className="material-symbols-outlined text-primary">
                  schedule
                </span>

                <h2 className="text-lg font-bold tracking-tight">
                  Features
                </h2>
              </div>

              <div className="flex gap-4 flex-wrap mb-5">
                {options.map((opt) => (
                  <label
                    key={opt.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selected.some(
                        (item) => item.id === opt.id
                      )}
                      onChange={() => handleToggle(opt)}
                    />

                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {selected.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-green-100 text-green-800 px-3 py-2 rounded-lg gap-3 group"
                  >
                    <div className="flex items-center gap-2">
                      <FiCheckCircle className="text-green-600" />

                      <span className="flex items-center gap-2">
                        {item.icon}
                        {item.label}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteFeature(item.id)
                      }
                      className="text-red-500 opacity-0 group-hover:opacity-100 transition"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>

              {/* MEALS */}
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary">
                  restaurant
                </span>

                <h2 className="text-lg font-bold tracking-tight">
                  Meals
                </h2>
              </div>

              <div className="flex flex-wrap gap-5">
                {CATEGORY_OPTIONS.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="meals"
                      value={cat.id}
                      checked={formData.meals === cat.id}
                      onChange={handleChange}
                    />

                    {cat.label}
                  </label>
                ))}

              {errors.meals && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.meals[0]}
                </p>
              )}
              </div>
            </section>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-span-12 lg:col-span-4 space-y-8">

            {/* PRICE */}
            <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm ring-1 ring-black/[0.03]">

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-2">
                    Base Price
                  </label>

                  <input
                    type="number"
                    name="base_price"
                    value={formData.base_price || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-surface-container-low"
                  />
                  {errors.base_price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.base_price[0]}
                  </p>
                )}
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-2">
                    Offer Price
                  </label>

                  <input
                    type="number"
                    name="offer_price"
                    value={formData.offer_price || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-surface-container-low"
                  />
                  {errors.offer_price && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.offer_price[0]}
                    </p>
                  )}
                </div>

              </div>
            </section>

            {/* MEDIA */}
            <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm ring-1 ring-black/[0.03]">

              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">
                  collections
                </span>

                <h2 className="text-lg font-bold tracking-tight">
                  Visual Media
                </h2>
              </div>

              {/* FEATURED */}
              <div
                onClick={() => topUploadRef.current.click()}
                className="relative group w-full h-64 rounded-md overflow-hidden border cursor-pointer mb-5"
              >
                {featured ? (
                  <img
                    src={featured}
                    alt="featured"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    Please Add Image
                  </div>
                )}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all">
                  <span className="material-symbols-outlined text-white text-3xl">
                    upload
                  </span>

                  <span className="text-white text-[10px] font-bold uppercase mt-2">
                    Change Featured
                  </span>
                </div>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={topUploadRef}
                  className="hidden"
                  onChange={handleUpload}
                />
              </div>

              {/* GRID */}
              <div className="grid grid-cols-3 gap-2">

                {/* UPLOAD */}
                <label className="aspect-square rounded-md bg-gray-100 flex items-center justify-center border-2 border-dashed cursor-pointer hover:border-blue-500 transition-colors">
                  <span className="material-symbols-outlined">
                    add_a_photo
                  </span>

                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleUpload}
                  />
                </label>

                {/* IMAGES */}
                {previewImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative group"
                  >
                    <img
                      src={img}
                      alt={`hotel-${index}`}
                      onClick={() => setFeatured(img)}
                      className={`aspect-square w-full h-full rounded-md object-cover cursor-pointer border-2 ${featured === img
                        ? "border-blue-500"
                        : "border-transparent"
                        }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteImage(index)
                      }
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="px-8 max-w-[1400px] mx-auto w-full flex gap-6 pb-10">

          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold cursor-pointer"
          >
            {editData ? "Update Hotel" : "Submit Hotel"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-lg font-semibold bg-gray-200 cursor-pointer"
          >
            Cancel
          </button>

        </div>
      </form>
    </main>
  );
};

export default HotelForm;