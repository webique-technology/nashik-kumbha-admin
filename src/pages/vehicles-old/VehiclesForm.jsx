import React, { useRef, useState, useEffect } from 'react'
import { FiUpload } from "react-icons/fi";
import { FaSnowflake, FaFan, FaUtensils, FaCrown } from "react-icons/fa";
import { FiTrash2, FiCheckCircle, FiEdit2 } from "react-icons/fi";

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



  // ---------- for checkbox amenities -------
  const [selected, setSelected] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const options = [
    { id: "ac", label: "AC", icon: <FaSnowflake /> },
    { id: "nonac", label: "Non AC", icon: <FaFan /> },
    { id: "dining", label: "Dining", icon: <FaUtensils /> },
    { id: "luxury", label: "Luxury", icon: <FaCrown /> },
  ];

  const handleToggle = (option) => {
    const exists = selected.find((item) => item.id === option.id);

    if (exists) {
      // remove if unchecked
      setSelected((prev) => prev.filter((item) => item.id !== option.id));
    } else {
      // add if checked
      setSelected((prev) => [...prev, option]);
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
    category: "",
    location: "",
    price: "",
  });


  // 🔥 PREFILL EDIT
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        description: editData.description || "",
        category: editData.category || "",
        location: editData.location || "",
        price: editData.price || "",
        booking: editData.booking || "",   // ✅ ADD
      });
      setStatus(editData.status || "AVAILABLE");
    }
  }, [editData]);

  // 🔥 COMMON INPUT HANDLER
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 FEATURES
  const handleFeatureChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(o => o.value);

    setFormData({
      ...formData,
      features: {
        wifi: selected.includes("Wifi"),
        parking: selected.includes("Parking"),
        pool: selected.includes("Pool"),
        ac: selected.includes("A/c"),
      }
    });
  };

  //--------- Upload Images--------
  const [images, setImages] = useState([]);
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

  // 🔥 FINAL SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const vehicleData = {
      id: editData?.id || Date.now(),
      name: formData.name,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      price: Number(formData.price),

      status: status,

      // ✅ USE FORM VALUE
      booking: Number(formData.booking),

      images: images.length
        ? images
        : ["https://picsum.photos/200"],
    };

    onSave(vehicleData);
  };

  return (
    <main className="page-container">

      <form onSubmit={handleSubmit}>
        <div className="p-8 max-w-[1400px] mx-auto w-full grid grid-cols-12 gap-8">

          <div className="col-span-12 lg:col-span-8 space-y-8">

            <section className="card bg-surface-container-lowest">
              <div className="card-header">
                <span className="material-symbols-outlined text-primary">edit_note</span>
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

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20"
                  >
                    <option>Business Luxury</option>
                    <option>Off-road Elite</option>
                    <option>Group VIP</option>
                  </select>
                </div>

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
                  <select name="status" value={formData.status} onChange={handleChange} className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20">
                    <option>AVAILABLE</option>
                    <option>RENTED</option>
                    <option>In Maintenance</option>
                  </select>
                </div>





                <div className="form-group full">
                  <label className="form-label">Total Seats</label>
                  <input
                    name="description"
                    value=""
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
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">schedule</span>
                <h2 className="text-lg font-bold tracking-tight">Features</h2>
              </div>

              <div>

                <div className="space-x-1 mb-6 flex gap-4">
                  {options.map((opt) => (
                    <label key={opt.id} className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selected.some((item) => item.id === opt.id)}
                        onChange={() => handleToggle(opt)}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
                <div className="space-y-2">
                  {selected.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-green-100 text-green-800 px-3 py-2 rounded-lg group"
                    >
                      {/* Left */}
                      <div className="flex items-center gap-2">
                        <FiCheckCircle className="text-green-600" />
                        <span className="flex items-center gap-2">
                          {item.icon}
                          {item.label}
                        </span>
                      </div>

                      {/* Delete (hover only) */}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 opacity-0 group-hover:opacity-100 transition"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>



          </div>

          <div className="col-span-12 lg:col-span-4 space-y-8">



            <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm ring-1 ring-black/[0.03]">




              <div className="space-y-5">

                <div className='grid grid-cols-1 gap-4'>
                  <div>
                    <label class="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Base Price eee($)</label>
                    <input
                      name="price"
                      value={formData.price}
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
                <span className="material-symbols-outlined text-primary">collections</span>
                <h2 className="text-lg font-bold tracking-tight">Main Banner</h2>
              </div>
              <div className="space-y-4">

                {/* 🔷 Featured Image */}
                <div
                  onClick={() => topUploadRef.current.click()}
                  className="relative group w-full h-64 rounded-md overflow-hidden border cursor-pointer"
                >
                  {featured ? (
                    <img
                      src={featured}
                      alt="featured"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      Please Add image
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all">
                    <span className="material-symbols-outlined text-white text-3xl">
                      upload
                    </span>
                    <span className="text-white text-[10px] font-bold uppercase mt-2">
                      Change Featured
                    </span>
                  </div>

                  {/* Hidden Input */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={topUploadRef}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0]; // ✅ only first file

                      if (!file) return;

                      const imageUrl = URL.createObjectURL(file);

                      // ✅ replace instead of append
                      setImages([imageUrl]);
                      setFeatured(imageUrl);

                      setFormData((prev) => ({
                        ...prev,
                        images: [imageUrl],
                      }));
                    }}
                  />
                </div>

                {/* 🔷 Upload + Grid */}

              </div>
            </section>

          </div>
        </div>

        <div className="px-8 pb-8 flex gap-4">
          <button type="submit" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold">
            {editData ? "Update Vehicle" : "Submit Vehicle"}
          </button>

          <button type="button" className='px-6 py-3 rounded-lg font-semibold bg-gray-200' onClick={onCancel}>
            Cancel
          </button>
        </div>

      </form>
    </main>
  )
}

export default VehiclesForm