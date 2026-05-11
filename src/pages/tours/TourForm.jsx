import React, { useRef, useState, useEffect } from 'react'
import { FaSnowflake, FaFan, FaUtensils, FaCrown } from "react-icons/fa";
import { FiTrash2, FiCheckCircle, FiEdit2 } from "react-icons/fi";
import { FiUpload } from "react-icons/fi";
import { IoCloudUploadOutline } from "react-icons/io5";

import { RiHotelLine } from "react-icons/ri";
import { IoFastFoodOutline } from "react-icons/io5";
import { PiAirplaneTakeoffLight } from "react-icons/pi";
import { LuTrees } from "react-icons/lu";
import { PiVanLight } from "react-icons/pi";
import { IoTrainOutline } from "react-icons/io5";
const TourForm = ({ onSave, editData, onCancel }) => {

  const [isOn, setIsOn] = useState(false);
  const [count, setCount] = useState(12);

  const increase = () => setCount((prev) => prev + 1);
  const decrease = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));

  const handleChangeNum = (e) => {
    const val = Number(e.target.value);
    if (val >= 0) setCount(val);
  };

  // 🔥 MAIN FORM STATE
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rating: "",
    status: "",
    location: "",
    price: "",
    offerPrice: "",
    image: "",
    features: {
      wifi: false,
      parking: false,
      pool: false,
      ac: false,
    },
  });

  // 🔥 IMAGE STATE
  const [image, setImage] = useState("");
  const [featured, setFeatured] = useState(null);
  const topUploadRef = useRef();

  // 🔥 PREFILL EDIT
  useEffect(() => {
    if (editData) {
      setFormData(editData);
      setImage(editData.image || editData.images?.[0] || "");

      // ✅ Load amenities into selected
      setSelected(editData.features || []);
    }
  }, [editData]);

  // 🔥 INPUT CHANGE
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

  // 🔥 IMAGE UPLOAD
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);

      if (file) {
        const url = URL.createObjectURL(file);

        setImage(url);
        setFormData({
          ...formData,
          image: url,
        });
      }
    }
  };

  // 🔥 DELETE IMAGE
  const handleRemoveImage = () => {
    setImage("");
    setFormData({
      ...formData,
      image: "",
    });
  };

  // 🔥 FINAL SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const hotelData = {
      ...formData,
      features: formData.features || [],
      id: editData?.id,
      rating: Number(formData.rating),
      price: Number(formData.price),

      // ✅ IMPORTANT: Table expects array
      images: formData.image
        ? [formData.image]
        : ["https://picsum.photos/200"],
    };

    onSave(hotelData);
  };

  //----- this is for tabs

  const [activeTab, setActiveTab] = useState("itinerary");
  const tabs = [
    { id: "itinerary", label: "Itinerary" },
    { id: "inclusions", label: "Inclusions" },
    { id: "seo", label: "SEO Meta" },
  ];
  // --------end----------
  // ---------- for checkbox amenities -------
  const [selected, setSelected] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const options = [
    { id: "hotel", label: "Hotel", icon: <RiHotelLine /> },
    { id: "meals", label: "Meals", icon: <IoFastFoodOutline /> },
    { id: "flight", label: "Flight", icon: <PiAirplaneTakeoffLight /> },
    { id: "sightseeing", label: "Sightseeing", icon: <LuTrees /> },
    { id: "transport", label: "Transport", icon: <PiVanLight /> },
    { id: "train", label: "Train", icon: <IoTrainOutline /> },
  ];

  const handleToggle = (option) => {
    let updated;

    const exists = selected.find((item) => item.id === option.id);

    if (exists) {
      updated = selected.filter((item) => item.id !== option.id);
    } else {
      updated = [...selected, option];
    }

    setSelected(updated);

    // ✅ Sync with formData
    setFormData((prev) => ({
      ...prev,
      features: updated,
    }));
  };

  const handleSubmitCheck = () => {
    const filtered = options.filter((opt) => selected.includes(opt.id));
    setSavedItems(filtered);
  };

  const handleDeleteAmenity = (id) => {
    setSelected(prev => prev.filter(item => item.id !== id));
  };
  const fileInputRef = useRef(null);

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  // ---------- end -------


  const fileRef = useRef(null);

  const [itineraryForm, setItineraryForm] = useState({
    title: "",
    description: "",
    image: null,
    preview: "",
  });

  const [itineraryList, setItineraryList] = useState([]);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  // Handle text input
  const handleItineraryInput = (e) => {
    setItineraryForm({
      ...itineraryForm,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image upload
  const handleItineraryImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setItineraryForm({
        ...itineraryForm,
        image: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  // Open file picker
  const openImagePicker = () => {
    fileRef.current.click();
  };

  // Submit (Add / Update)
  const submitItineraryData = () => {
    if (
      !itineraryForm.title.trim() ||
      !itineraryForm.description.trim()
    ) return;

    if (currentEditIndex !== null) {
      const updatedList = [...itineraryList];
      updatedList[currentEditIndex] = itineraryForm;
      setItineraryList(updatedList);
      setCurrentEditIndex(null);
    } else {
      setItineraryList((prev) => [itineraryForm, ...prev]);
    }

    setItineraryForm({
      title: "",
      description: "",
      image: null,
      preview: "",
    });

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  // Delete
  const removeItineraryItem = (index) => {
    setItineraryList((prev) => prev.filter((_, i) => i !== index));
  };

  // Edit
  const editItineraryItem = (index) => {
    const selectedItem = itineraryList[index];
    setItineraryForm(selectedItem);
    setCurrentEditIndex(index);
  };

  //---------End------------
  //----------- add edit Tour Highlights --------------
  const [text, setText] = useState("");
  const [savedList, setSavedList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleSave = () => {
    if (!text.trim()) return;
    setSavedList((prev) => [...prev, text]);
    setText("");
  };

  const handleDelete = (index) => {
    setSavedList((prev) => prev.filter((_, i) => i !== index));
  };



  const handleEdit = (index) => {
    const item = savedList[index];
    if (!item) return;

    setEditIndex(index);
    setEditText(item);
  };

  const handleEditKeyDown = (e, index) => {
    if (e.key === "Enter") {
      if (!editText.trim()) return;

      const updated = [...savedList];
      updated[index] = editText;
      setSavedList(updated);
      setEditIndex(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  };
  // ---------- end -------

  return (
    <main className="page-container">

      <form onSubmit={handleSubmit}>
        <div className="p-8 max-w-[1400px] mx-auto w-full grid grid-cols-12 gap-8">

          {/* LEFT */}
          <div className="col-span-12 lg:col-span-8 space-y-8">

            <section className="card bg-surface-container-lowest">
              <div className="card-header">
                <span className="material-symbols-outlined text-primary">edit_note</span>
                <h2 className="card-title">Basic Information</h2>
              </div>

              <div className="form-grid">

                <div className="form-group full">
                  <label className="form-label">Tour Title</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20"
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
                    className="form-input bg-surface-container-low"
                  >
                    <option>Religious Tourism</option>
                    <option>Eco-Tourism</option>
                    <option>Culinary Tourism</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-input bg-surface-container-low"
                  >
                    <option>Active</option>
                    <option>Inactivewww</option>

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
                    <option>Goa</option>
                  </select>
                </div>

              </div>
            </section>


            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm ring-1 ring-black/[0.03]">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">auto_awesome</span>
                  <h2 className="text-lg font-bold tracking-tight">Tour Highlights</h2>
                </div>
                <button className="text-xs font-bold bg-primary/10 text-primary px-4 py-2 rounded hover:bg-primary/20 transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">add</span> Add Point
                </button>
              </div>
              <div className="space-y-3">



                <div className="space-y-2 mb-4">
                  {savedList.map((item, index) => (
                    <div key={index}>

                      {editIndex === index ? (
                        // ✏️ Edit Mode
                        <input
                          type="text"
                          value={editText}
                          placeholder='press enter after edit'
                          autoFocus
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => handleEditKeyDown(e, index)}
                          className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                        />
                      ) : (
                        // ✅ Normal View
                        <div className="flex items-center group justify-between bg-surface-container-low px-3 py-2 rounded-lg">

                          <div className="flex items-center gap-3">
                            <FiCheckCircle className="text-green-600" />
                            <span>{item}</span>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">

                            {/* Edit */}
                            <button type='button'
                              onClick={() => handleEdit(index)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <FiEdit2 />
                            </button>

                            {/* Delete */}
                            <button type='button'
                              onClick={() => handleDeleteAmenity(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FiTrash2 />
                            </button>

                          </div>
                        </div>
                      )}

                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="w-full flex gap-2">
                  <input
                    type="text"
                    value={text}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter something..."
                    className="w-full px-4 py-3 bg-surface-container-low rounded-lg focus:ring-2 focus:ring-primary/20 text-sm"
                  />

                  <button
                    onClick={handleSave} type='button'
                    className="bg-primary w-[120px] text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Save
                  </button>
                </div>


              </div>
            </section>

            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm ring-1 ring-black/[0.03]">

              {/* Tabs Buttons */}
              <div className="flex gap-2 mb-6 border-b pb-2">
                {tabs.map((tab) => (
                  <button type='button'
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition 
                          ${activeTab === tab.id
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div>
                {activeTab === "itinerary" && (
                  <div className="max-w-4xl mx-auto bg-white">

                    {/* OUTPUT */}
                    <div className="space-y-3 mb-6">
                      {itineraryList.map((data, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-surface-container-low p-4 rounded-xl group"
                        >
                          <div className="flex items-center gap-4">
                            {data.preview && (
                              <img
                                src={data.preview}
                                alt="preview"
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                            )}

                            <div>
                              <h2>Day: {idx + 1}</h2>
                              <h3 className="font-semibold">{data.title}</h3>
                              <p className="text-sm text-gray-600">{data.description}</p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                            <button type='button'
                              onClick={() => editItineraryItem(idx)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <FiEdit2 />
                            </button>

                            <button type="button"
                              onClick={() => removeItineraryItem(idx)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* FORM */}
                    <div
                      onSubmit={submitItineraryData}
                    >
                      <div className='flex w-full gap-5 items-stretch'>
                        {/* left */}
                        <div className='w-1/2 flex'>
                          <div
                            onClick={openImagePicker}
                            className="flex flex-1 items-center justify-center bg-surface-container-low border-2 border-dashed rounded-xl cursor-pointer h-[220px] overflow-hidden"
                          >
                            {itineraryForm.preview ? (
                              <img
                                src={itineraryForm.preview}
                                alt="preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-center">
                                <FiUpload className="text-3xl mb-2 text-gray-500 mx-auto" />
                                <p className="text-sm text-gray-500">
                                  Click to upload image
                                </p>
                              </div>
                            )}
                          </div>

                          <input
                            type="file"
                            ref={fileRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleItineraryImage}
                          />
                        </div>

                        {/* right */}
                        <div className='w-1/2 flex flex-col h-[220px]'>
                          <div className="mb-4">
                            <input
                              type="text"
                              name="title"
                              placeholder='Enter Itinerary Title'
                              value={itineraryForm.title}
                              onChange={handleItineraryInput}
                              className="w-full px-4 py-3 bg-surface-container-low rounded-lg"
                            />
                          </div>

                          <div className="flex-1">
                            <textarea
                              name="description"
                              placeholder='Enter Itinerary Description'
                              value={itineraryForm.description}
                              onChange={handleItineraryInput}
                              className="w-full h-full px-4 py-3 bg-surface-container-low rounded-lg resize-none"
                            />
                          </div>
                        </div>
                      </div>


                      {/* Submit */}
                      <div className="col-span-2">
                        <button
                          type="button"
                          onClick={submitItineraryData}
                          className="w-[200px] bg-primary text-white py-2 rounded-lg mt-4"
                        >
                          {currentEditIndex !== null
                            ? "Update Itinerary"
                            : "Add Itinerary"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "inclusions" && (
                  <div className="w-full mx-auto bg-white ">
                    <h2 className="text-lg font-semibold mb-4">Select Amenities</h2>

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
                      <div className="flex max-w-fit gap-3 mb-4 flex-wrap">
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


                    {/* Saved Output */}
                    <div className="mt-6">
                      {savedItems.length > 0 && (
                        <>
                          <h3 className="font-semibold mb-3">Selected Amenities</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {savedItems.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center gap-2 p-3 border rounded-lg"
                              >
                                <span className="text-xl">{item.icon}</span>
                                <span>{item.label}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}



                {activeTab === "seo" && (
                  <div>
                    <h3 className="font-semibold mb-3">SEO Meta</h3>

                    <div className="max-full mx-auto bg-white rounded-2xl ">


                      {/* Title */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <input
                          type="text"
                          placeholder="Enter title"
                          className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                        />
                      </div>

                      {/* Description */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                          placeholder="Enter description"
                          rows="4"
                          className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                        ></textarea>
                      </div>



                      {/* Submit Button */}
                      <button className="w-[200px] btn-primary flex items-center gap-2 justify-center hover:bg-blue-700 transition">
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>



            {/* FEATURES */}
            {/* <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm ring-1 ring-black/[0.03]">
              <h2 className="text-lg font-bold mb-4">Features</h2>
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
            </section> */}

          </div>

          {/* RIGHT */}
          <div className="col-span-12 lg:col-span-4 space-y-8">

            {/* PRICING */}




            <section className='bg-surface-container-lowest rounded-xl p-6 shadow-sm ring-1 ring-black/[0.03]'>

              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">payments</span>
                <h2 className="text-lg font-bold tracking-tight">Pricing &amp; Rules</h2>
              </div>
              <div className="space-y-5">

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Base Price ($)</label>
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
                      value={formData.offerPrice || "200"}
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


















            {/* VISUAL MEDIA */}
            <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm ring-1 ring-black/[0.03]">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">collections</span>
                <h2 className="text-lg font-bold tracking-tight">Main Banner</h2>
              </div>
              <label className="block-label">{editData ? "Update Image" : "Upload Image"}</label>
              <div
                onClick={() => topUploadRef.current.click()}
                className="group relative flex items-center justify-center bg-surface-container-low border-2 border-gray-300 border-dashed rounded-xl h-[250px] w-full cursor-pointer overflow-hidden"
              >
                <img
                  src={
                    image ||
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuA3WQlX_leJ_Ty8fktKfNtPNRlJrGOYIXZgE9gMd4b5NOF1WyC2nfC9TfBE66s2kU1NuA1UOup8_2CVfJUSGOhPd777c3yNupZJewuorQuhDMbaVOBuCn-GbSOzQzvehmLGPtK5Zzb3Ol5qkoyiVzfX4YrciuCEOceO89MduUCopYVr5ftUEa24BFA5hAToAN9kh13qYssgbYLEMYM48s7o9dSJD4JUxdVsfAS0KRPDP1diEmgpsRM1e80ukOIRcfVt2YyUEj6J5xs"
                  }
                  alt="preview"
                  className="w-full h-full object-cover"
                />

                {/* Optional overlay text */}
                {!image && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white text-sm">
                    Click to upload
                  </div>
                )}
              </div>

              <input
                type="file"
                hidden
                ref={topUploadRef}
                onChange={handleUpload}
              />
            </section>

          </div>

        </div>
        <div className="flex gap-4 px-8 max-w-[1400px] mx-auto">
          <button type="submit" className="bg-primary text-white px-6 py-3 rounded-lg">
            {editData ? "Update Hotel" : "Submit Hotel"}
          </button>

          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>


      </form>
    </main>
  )
}

export default TourForm