import React, { useRef, useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { FaSnowflake, FaUtensils, FaCrown } from "react-icons/fa";
import { FiTrash2, FiCheckCircle, FiEdit2 } from "react-icons/fi";
import { IoCloudUploadOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { CATEGORY_OPTIONS } from "./VehiclesManager"; // adjust path if needed

import { FaRegSnowflake } from "react-icons/fa";
import { FaFan } from "react-icons/fa";
import { FaLuggageCart } from "react-icons/fa";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { IoBowlingBallOutline } from "react-icons/io5";

const VehiclesForm = ({ onSave, editData, onCancel }) => {
  const [isOn, setIsOn] = useState(false);

  const [count, setCount] = useState(12);

  const increase = () => setCount((prev) => prev + 1);

  const decrease = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const [status, setStatus] = useState("AVAILABLE");

  const optionsOne = [
    { label: "Available", value: "AVAILABLE" },
    { label: "Rented", value: "RENTED" },
    { label: "In Maintenance", value: "In Maintenance" },
  ];

  const handleChangeNum = (e) => {
    const val = Number(e.target.value);
    if (val >= 0) setCount(val);
  };

  //--------Technical Specifications
  const [techData, setTechData] = useState({
    seats: 4,
    fuelType: "Premium Petrol",
    climateControl: true,
  });

  const handleChangeTech = (field, value) => {
    setTechData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  //-----end here

  // FEATURED IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      // setFormData({ ...formData, image: url });

      setFormData({ ...formData,image: file, preview: url});
    }
  };

  // ---------- for checkbox amenities -------
  const [selected, setSelected] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const options = [
    { id: "ac", label: "AC", icon: <FaRegSnowflake /> },
    { id: "nac", label: "Non AC", icon: <FaFan /> },
    { id: "als", label: "Ample Luggage Space", icon: <FaLuggageCart /> },
    {
      id: "cs",
      label: "Comfortable Seating",
      icon: <MdAirlineSeatReclineNormal />,
    },
    {
      id: "ma",
      label: "ABS and Multiple Airbags",
      icon: <IoBowlingBallOutline />,
    },
  ];

  // const handleToggle = (option) => {
  //   const exists = selected.find((item) => item.id === option.id);

  //   if (exists) {
  //     // remove if unchecked
  //     setSelected((prev) => prev.filter((item) => item.id !== option.id));
  //   } else {
  //     // add if checked
  //     setSelected((prev) => [...prev, option]);
  //   }
  // };

  const handleToggle = (label) => {
    if (selected.includes(label)) {
      setSelected((prev) => prev.filter((item) => item !== label));
    } else {
      setSelected((prev) => [...prev, label]);
    }
  };

  const handleSubmitFeatures = () => {
    const filtered = options.filter((opt) => selected.includes(opt.id));
    setSavedItems(filtered);
  };

  const fileInputRef = useRef(null);

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  // ---------- end -------

  // 🔥 MAIN FORM STATE

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    total_seats: "",
    location: "",
    base_price: "",
    status: "",
    image: "",
  });

  const fileRef = useRef();

  useEffect(() => {
    if (editData) {
      setFormData(editData);
      setStatus(editData.status);
      setFeatured(editData.image); // ✅ show image in edit
      // setSelected(editData.features || []);

      setSelected(
  Array.isArray(editData.features)
    ? editData.features
    : []
);
    }
  }, [editData]);

  // 🔥 COMMON INPUT HANDLER
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setFeatured(url);
    setFormData((prev) => ({
      ...prev,
      image: url,
    }));

    e.target.value = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // onSave({
    //   ...formData,
    //   status,
    //   image: formData.image || featured || "https://picsum.photos/200",
    // });

    onSave({
      ...formData,
      status,
      image: formData.image,

      // features: selected.map((item) => item.label),
      features: selected,
    });
  };

  // 🔥 FEATURES
  // const handleFeatureChange = (e) => {
  //   const selected = Array.from(e.target.selectedOptions).map((o) => o.value);

  //   setFormData({
  //     ...formData,
  //     features: {
  //       wifi: selected.includes("Wifi"),
  //       parking: selected.includes("Parking"),
  //       pool: selected.includes("Pool"),
  //       ac: selected.includes("A/c"),
  //     },
  //   });
  // };

  //--------- Upload Images--------
  const [image, setImage] = useState(null);
  const [featured, setFeatured] = useState(null);
  const topUploadRef = useRef();

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));

    const updatedImages = [...images, ...imageUrls];

    setImages(updatedImages);
    setFormData({ ...formData, images: updatedImages });

    if (!featured && imageUrls.length > 0) {
      setFeatured(imageUrls[0]);
    }
  };

  const handleDeleteRep = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);

    setFormData({ ...formData, images: updated });

    if (images[index] === featured) {
      setFeatured(updated[0] || null);
    }
  };

  const handleDeleteRepCheck = (id) => {
    setSelected((prev) => prev.filter((item) => item.id !== id));
  };

  // 🔥 FINAL SUBMIT

  return (
    <main className="page-container">
      <form onSubmit={handleSubmit}>
        <div className="p-8 max-w-[1400px] mx-auto w-full grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <section className="card bg-surface-container-lowest">
              <div className="card-header">
                <span className="material-symbols-outlined text-primary">
                  edit_note
                </span>
                <h2 className="card-title">Basic Information</h2>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Vehicle Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. Saffron Trails: Luxury Rajasthan Expedition"
                    type="text"
                  />
                </div>

                {/* <div className="form-group">
                  <label className="form-label">Category</label>
                  <div className="flex flex-wrap gap-4">
                    {CATEGORY_OPTIONS.map((cat) => (
                      <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={cat.id}
                          checked={formData.category === cat.id}
                          onChange={handleChange}
                        />
                        {cat.label}
                      </label>
                    ))}
                  </div>
                </div> */}

                <div className="form-group">
                  <label className="form-label">Location</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-input bg-surface-container-low"
                  >
                    <option value="">Select Location</option>
                    <option>Mumbai</option>
                    <option>Delhi</option>
                    <option>Pune</option>
                    <option>Bangalore</option>
                    <option>Goa</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20"
                  >
                    <option>AVAILABLE</option>
                    <option>RENTED</option>
                    <option>In Maintenance</option>
                  </select>
                </div>

                <div className="form-group ">
                  <label className="form-label">Total Seats</label>
                  <input
                    name="total_seats"
                    value={formData.total_seats}
                    onChange={handleChange}
                    className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter Total Seats"
                  />
                </div>

                {/* <div className="form-group">
                  <label className="form-label">Rating</label>
                  <input
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20"
                    placeholder="5"
                    type="text"
                  />
                </div>

                

                <div className="form-group">
                  <label className="form-label">Location</label>

                  <div className="relative">
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Select Location</option>
                      <option>Jaipur, Rajasthan</option>
                      <option>Mumbai, Maharashtra</option>
                      <option>Delhi</option>
                      <option>Goa</option>
                    </select>
                  </div>
                </div> */}
              </div>
            </section>

            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm ring-1 ring-black/[0.03]">
              <div className="flex items-center gap-3 mb-3">
                <MdOutlineFeaturedPlayList />
                <h2 className="text-lg font-bold tracking-tight">Features</h2>
              </div>

              <div className="mb-6">
                <div className="space-x-1 mb-2 flex gap-4">
                  {options.map((opt) => (
                    <label
                      key={opt.id}
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selected.includes(opt.label)}
                        onChange={() => handleToggle(opt.label)}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
                {/* <div className="flex gap-2">
                  {selected.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-green-100 text-green-800 px-3 py-2 gap-2 rounded-lg group"
                    >
                      <div className="flex items-center gap-2 max-w-fit">
                        <FiCheckCircle className="text-green-600" />
                        <span className="flex items-center gap-2">
                          {item.icon}
                          {item.label}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteRepCheck(item.id)}
                        className="text-red-500 opacity-0 group-hover:opacity-100 transition"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div> */}

                <div className="flex gap-2 flex-wrap">
  {selected.map((label) => {
    const feature = options.find((opt) => opt.label === label);

    return (
      <div
        key={label}
        className="flex items-center justify-between bg-green-100 text-green-800 px-3 py-2 gap-2 rounded-lg group"
      >
        <div className="flex items-center gap-2">
          <FiCheckCircle className="text-green-600" />

          <span className="flex items-center gap-2">
            {feature?.icon}
            {label}
          </span>
        </div>

        <button
          type="button"
          onClick={() =>
            setSelected((prev) =>
              prev.filter((item) => item !== label)
            )
          }
          className="text-red-500 opacity-0 group-hover:opacity-100 transition"
        >
          <FiTrash2 />
        </button>
      </div>
    );
  })}
</div>

              </div>

              <div className="flex items-center gap-3 mb-3">
                <BiCategory />
                <h2 className="text-lg font-bold tracking-tight">Category</h2>
              </div>
              <div className="flex flex-wrap gap-4">
                {CATEGORY_OPTIONS.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="category"
                      value={cat.id}
                      checked={formData.category === cat.id}
                      onChange={handleChange}
                    />
                    {cat.label}
                  </label>
                ))}
              </div>
            </section>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-8">
            <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm ring-1 ring-black/[0.03]">
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label class="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">
                      Base Price eee($)
                    </label>
                    <input
                      name="base_price"
                      value={formData.base_price}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm font-black"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm ring-1 ring-black/[0.03]">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">
                  collections
                </span>
                <h2 className="text-lg font-bold tracking-tight">
                  Main Banner
                </h2>
              </div>
              <div className="space-y-4">
                {/* 🔷 Featured Image */}
                <div>
                  <label className="block-label">
                    {editData ? "Update Image" : "Upload Image"}
                  </label>

                  <label className="group relative flex items-center justify-center bg-surface-container-low border-2 border-gray-300 border-dashed rounded-xl h-[250px] w-full cursor-pointer overflow-hidden">
                    <img
                      src={
                         formData.preview ||formData.car_image_url  ||
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuA3WQlX_leJ_Ty8fktKfNtPNRlJrGOYIXZgE9gMd4b5NOF1WyC2nfC9TfBE66s2kU1NuA1UOup8_2CVfJUSGOhPd777c3yNupZJewuorQuhDMbaVOBuCn-GbSOzQzvehmLGPtK5Zzb3Ol5qkoyiVzfX4YrciuCEOceO89MduUCopYVr5ftUEa24BFA5hAToAN9kh13qYssgbYLEMYM48s7o9dSJD4JUxdVsfAS0KRPDP1diEmgpsRM1e80ukOIRcfVt2YyUEj6J5xs"
                      }
                      alt="featured"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />

                    {/* Overlay text (optional) */}
                    {!formData.image && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 text-white">
                        <span className="text-white text-3xl">
                          <IoCloudUploadOutline />
                        </span>
                        <div className="font-semibold text-2xl">
                          Click to upload
                        </div>
                      </div>
                    )}

                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>

                {/* 🔷 Upload + Grid */}
              </div>
            </section>
          </div>
        </div>

        <div className="px-8 max-w-[1400px] mx-auto w-full flex gap-6">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold max-w-40.5"
          >
            {editData ? "Update Vehicle" : "Submit Vehicle"}
          </button>

          <button
            type="button"
            className="px-6 py-3 rounded-lg font-semibold bg-gray-200 max-w-40.5"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default VehiclesForm;
