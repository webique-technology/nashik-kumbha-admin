import React, { useRef, useState, useEffect } from 'react'
import { FiUpload } from "react-icons/fi";
import { FaSnowflake, FaFan, FaUtensils, FaCrown } from "react-icons/fa";
import { FiTrash2, FiCheckCircle, FiEdit2 } from "react-icons/fi";
import { CATEGORY_OPTIONS } from "./HotelManager"; // adjust path if needed
import { RiHotelLine } from "react-icons/ri";
import { IoFastFoodOutline } from "react-icons/io5";
import { PiAirplaneTakeoffLight } from "react-icons/pi";
import { LuTrees } from "react-icons/lu";
import { PiVanLight } from "react-icons/pi";
import { IoTrainOutline } from "react-icons/io5";
const HotelForm = ({ onSave, editData, onCancel }) => {

  const [isOn, setIsOn] = useState(false);

  const [count, setCount] = useState(12);

  const increase = () => setCount((prev) => prev + 1);

  const decrease = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  };
  // ✅ FEATURES OPTIONS


  const options = [
    { id: "hotel", label: "Hotel", icon: <RiHotelLine /> },
    { id: "meals", label: "Meals", icon: <IoFastFoodOutline /> },
    { id: "flight", label: "Flight", icon: <PiAirplaneTakeoffLight /> },
    { id: "sightseeing", label: "Sightseeing", icon: <LuTrees /> },
    { id: "transport", label: "Transport", icon: <PiVanLight /> },
    { id: "train", label: "Train", icon: <IoTrainOutline /> },
  ];

  // ✅ SELECTED FEATURES STATE
  const [selected, setSelected] = useState([]);

  // ✅ TOGGLE
  const handleToggle = (option) => {
    const exists = selected.find((item) => item.id === option.id);

    if (exists) {
      setSelected((prev) => prev.filter((item) => item.id !== option.id));
    } else {
      setSelected((prev) => [...prev, option]);
    }
  };

  // ✅ DELETE
  const handleDelete = (id) => {
    setSelected((prev) => prev.filter((item) => item.id !== id));
  };
  const handleChangeNum = (e) => {
    const val = Number(e.target.value);
    if (val >= 0) setCount(val);
  };
  // 🔥 MAIN FORM STATE
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    foodcat: "",
    rating: "",
    category: "",
    location: "",
    price: "",
    images: [],
    features: {
      wifi: false,
      parking: false,
      pool: false,
      ac: false,
    },
  });

  // 🔥 PREFILL EDIT
  useEffect(() => {
    if (editData) {
      setFormData(editData);
      setImages(editData.images || []);
      setFeatured(editData.images?.[0] || null);

      // ✅ restore features
      setSelected(editData.features || []);
    }
  }, [editData]);

  // 🔥 COMMON INPUT HANDLER
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // ✅ If arrival changes, reset invalid departure
      if (name === "arrival") {
        if (updated.departure && updated.departure < value) {
          updated.departure = "";
        }
      }

      return updated;
    });
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

    const hotelData = {
      ...formData,
      rating: Number(formData.rating),
      price: Number(formData.price),
      images: images.length ? images : ["https://picsum.photos/200"],

      // ✅ SAVE FEATURES HERE
      features: selected,
    };

    if (editData) {
      hotelData.id = editData.id;
    }

    onSave(hotelData);
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
                  <label className="form-label">Hotel Title</label>
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

                <div className="form-group full">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter Description"
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
                    <option>Luxury</option>
                    <option>Premium</option>
                    <option>Mid-Range</option>
                    <option>Budget</option>
                  </select>
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
                </div>

                <div className="form-group">
                  <label className="form-label">Arrival Date</label>
                  <input
                    type="date"
                    name="arrival"
                    value={formData.arrival || ""}
                    onChange={handleChange}
                    className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">departure Date</label>

                  <div className="relative">
                    <input
                      type="date"
                      name="departure"
                      value={formData.departure || ""}
                      onChange={handleChange}
                      className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20"
                      min={formData.arrival || new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

              </div>
            </section>

            {/* <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm ring-1 ring-black/[0.03]">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">schedule</span>
                <h2 className="text-lg font-bold tracking-tight">Features</h2>
              </div>

              <div className="form-group">
                <select
                  multiple
                  onChange={handleFeatureChange}
                  className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20 w-full min-h-[120px] rounded-lg px-3 py-2"
                >
                  <option>Wifi</option>
                  <option>Parking</option>
                  <option>Pool</option>
                  <option>A/c</option>
                </select>
              </div>
            </section> */}

            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm ring-1 ring-black/[0.03]">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-primary">schedule</span>
                <h2 className="text-lg font-bold tracking-tight">Features</h2>
              </div>

              <div>
                {/* CHECKBOXES */}
                <div className="space-x-1 mb-3 flex gap-4 flex-wrap">
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



                {/* SELECTED LIST */}
                <div className="flex max-w-fit gap-3 mb-4">
                  {selected.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-green-100 text-green-800 px-3 py-2 rounded-lg group gap-3"
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
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 opacity-0 group-hover:opacity-100 transition"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-primary">schedule</span>
                <h2 className="text-lg font-bold tracking-tight">Meals</h2>
              </div>
              <div className="flex flex-wrap gap-4">
                {CATEGORY_OPTIONS.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="foodcat"
                      value={cat.id}
                      checked={formData.foodcat === cat.id}
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
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label class="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Base Price ($)</label>
                    <input
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm font-black"
                      type="number"
                    />
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Offer Price ($)</label>
                    <input
                      name="offerPrice"
                      value={formData.offerPrice || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm font-black"
                      type="number"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/20 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold">Inclusive of Taxes</p>
                      <p className="text-[10px] text-outline">VAT / GST applied automatically</p>
                    </div>
                    <div
                      onClick={() => setIsOn(!isOn)}
                      className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${isOn ? "bg-primary" : "bg-gray-300"
                        }`}
                    >
                      <div
                        className={`w-3 h-3 bg-white rounded-full shadow-md transform transition-all duration-300 ${isOn ? "translate-x-5" : "translate-x-0"
                          }`}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold">Total Seats</p>
                      <p className="text-[10px] text-outline">Max capacity per departure</p>
                    </div>
                    <div className="flex items-center gap-1">

                      {/* Down Button */}
                      <button
                        onClick={decrease} type='button'
                        className="px-2 py-1 bg-gray-200 rounded text-xs"
                      >
                        −
                      </button>

                      {/* Input */}
                      <input
                        type="number"
                        value={count}
                        onChange={handleChangeNum}
                        className="w-16 px-2 py-1 bg-surface-container-low border-none rounded text-center text-xs font-black appearance-none"
                      />

                      {/* Up Button */}
                      <button
                        onClick={increase} type='button'
                        className="px-2 py-1 bg-gray-200 rounded text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </section>



            <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm ring-1 ring-black/[0.03]">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">collections</span>
                <h2 className="text-lg font-bold tracking-tight">Visual Media</h2>
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
                    multiple
                    accept="image/*"
                    ref={topUploadRef}
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      const imageUrls = files.map((file) =>
                        URL.createObjectURL(file)
                      );

                      setImages((prev) => {
                        const updated = [...prev, ...imageUrls];

                        // 👉 Auto set featured if not exists
                        if (!featured && updated.length > 0) {
                          setFeatured(updated[0]);
                        }

                        return updated;
                      });
                    }}
                  />
                </div>

                {/* 🔷 Upload + Grid */}
                <div className="grid grid-cols-3 gap-2">

                  {/* Upload Box */}
                  <label className="aspect-square rounded-md bg-gray-100 flex items-center justify-center border-2 border-dashed cursor-pointer hover:border-blue-500 transition-colors">
                    <span className="material-symbols-outlined">
                      add_a_photo
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        const imageUrls = files.map((file) =>
                          URL.createObjectURL(file)
                        );

                        setImages((prev) => {
                          const updated = [...prev, ...imageUrls];

                          if (!featured && updated.length > 0) {
                            setFeatured(updated[0]);
                          }

                          return updated;
                        });
                      }}
                    />
                  </label>

                  {/* Images */}
                  {images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt="uploaded"
                        onClick={() => setFeatured(img)}
                        className={`aspect-square w-full h-full rounded-md object-cover cursor-pointer border-2 ${featured === img
                          ? "border-blue-500"
                          : "border-transparent"
                          }`}
                      />

                      {/* 🔴 Delete */}
                      <button
                        type="button"
                        onClick={() => {
                          const updated = images.filter((_, i) => i !== index);

                          setImages(updated);

                          // 👉 Fix featured after delete
                          if (img === featured) {
                            setFeatured(updated[0] || null);
                          }
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>
        </div>




        <div className="px-8 max-w-[1400px] mx-auto w-full flex gap-6">
          <button type="submit" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold cursor-pointer">
            {editData ? "Update Hotel" : "Submit Hotel"}
          </button>

          <button type="button" onClick={onCancel} className='px-6 py-3 rounded-lg font-semibold bg-gray-200 max-w-40.5 cursor-pointer'>
            Cancel
          </button>
        </div>

      </form>
    </main>
  )
}

export default HotelForm