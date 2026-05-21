import React, { useRef, useState, useEffect } from "react";
import { FaSnowflake, FaFan, FaUtensils, FaCrown } from "react-icons/fa";
import { FiTrash2, FiCheckCircle, FiEdit2, FiUpload } from "react-icons/fi";
import {
  IoCloudUploadOutline,
  IoFastFoodOutline,
  IoTrainOutline,
} from "react-icons/io5";
import { RiHotelLine } from "react-icons/ri";
import { PiAirplaneTakeoffLight, PiVanLight } from "react-icons/pi";
import { LuTrees } from "react-icons/lu";

// --- REUSABLE COMPONENTS ---
const InputComp = ({
  name,
  onChange,
  label,
  value,
  placeholder,
  formClass,
  inputClass = "form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20",
  type = "text",
}) => (
  <div className={`form-group ${formClass}`}>
    <label className="form-label">{label}</label>
    <input
      name={name}
      value={value ?? ""}
      onChange={onChange}
      className={inputClass}
      type={type}
      placeholder={placeholder}
    />
  </div>
);

const TextArea = ({
  name,
  value,
  onChange,
  label,
  formClass,
  placeholder = "Enter Description",
  inputClass = "form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20 ",
}) => (
  <div className={`form-group ${formClass}`}>
    <label className="form-label">{label}</label>
    <textarea
      name={name}
      value={value ?? ""}
      onChange={onChange}
      className={inputClass}
      placeholder={placeholder}
    />
  </div>
);

const SelectOption = ({ child, formClass, label, name, value, onChange }) => (
  <div className={`form-group ${formClass}`}>
    <label className="form-label">{label}</label>
    <select
      name={name}
      value={value ?? ""}
      onChange={onChange}
      className="form-input bg-surface-container-low"
    >
      {child}
    </select>
  </div>
);

// Main Form Component
const TourForm = ({ onSave, editData, onCancel }) => {
  const [activeTab, setActiveTab] = useState("itinerary");

  // --- MAIN FORM STATE ---
  const [formData, setFormData] = useState({
    main_banner: null,
    preview: "",
    title: "",
    description: "",
    category: "",
    status: "active",
    location: "",
    base_price: "",
    offer_price: "",
    total_seats: 12,
    highlights: [],
    itineraries: [],
    inclusions: [],
    seo_meta: {
      title: "",
      desc: "",
    },
  });

  // --- LOCAL STATES ---
  const [highlightInput, setHighlightInput] = useState("");
  const [highlightEditIndex, setHighlightEditIndex] = useState(null);
  const [itineraryForm, setItineraryForm] = useState({
    title: "",
    description: "",
    image: "",
    file: null,
  });
  const [currentEditItineraryIdx, setCurrentEditItineraryIdx] = useState(null);

  const topUploadRef = useRef();
  const itineraryFileRef = useRef();

  // --- PREFILL DATA ---
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || "",
        description: editData.description || "",
        category: editData.category || "",
        status: editData.status || "active",
        location: editData.location || "",

        base_price: editData.base_price || "",
        offer_price: editData.offer_price || "",

        total_seats: editData.total_seats ?? 12,

        highlights: editData.highlights || [],

        inclusions:
          editData.inclusions?.map((item) =>
            typeof item === "string" ? item : item.label
          ) || [],

        itineraries:
          editData.itineraries?.map((item) => ({
            id: item.id,
            title: item.itinerary_title || "",
            description: item.description || "",
            image: item.itineraries_image_url || "",
            file: null,
          })) || [],

        // IMPORTANT FIX
        preview: editData.image_url || "",

        // IMPORTANT
        main_banner: null,

        seo_meta: {
          title: editData.seo_title || "",
          desc: editData.seo_desc || "",
        },
      });
    } else {
      // RESET FORM WHEN ADD NEW TOUR
      setFormData({
        main_banner: null,
        preview: "",
        title: "",
        description: "",
        category: "",
        status: "active",
        location: "",
        base_price: "",
        offer_price: "",
        total_seats: 12,
        highlights: [],
        itineraries: [],
        inclusions: [],
        seo_meta: {
          title: "",
          desc: "",
        },
      });
    }
  }, [editData]);

  // for main form input onchange handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // for seo input onchange handler
  const handleSEOChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      seo_meta: { ...prev.seo_meta, [name]: value },
    }));
  };

  // for uploade main image
  const handleMainBannerUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      main_banner: file,
      preview: URL.createObjectURL(file),
    }));
  };

  // --- HIGHLIGHTS LOGIC ---
  const handleSaveHighlight = () => {
    if (!highlightInput.trim()) return;
    const updatedHighlights = [...formData.highlights];

    if (highlightEditIndex !== null) {
      updatedHighlights[highlightEditIndex] = highlightInput;
      setHighlightEditIndex(null);
    } else {
      updatedHighlights.push(highlightInput);
    }

    setFormData((prev) => ({ ...prev, highlights: updatedHighlights }));
    setHighlightInput("");
  };

  //  helight remove
  const removeHighlight = (index) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  // --- ITINERARY LOGIC ---
  const handleItineraryImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setItineraryForm((prev) => ({
      ...prev,
      file,
      image: URL.createObjectURL(file),
    }));
  };

  // for Ititneary data submit
  const submitItineraryData = () => {
    if (!itineraryForm.title.trim() || !itineraryForm.description.trim())
      return;

    const updatedList = [...formData.itineraries];

    const newItem = {
      id: itineraryForm.id || null,
      title: itineraryForm.title,
      description: itineraryForm.description,
      image:
        itineraryForm.file instanceof File
          ? URL.createObjectURL(itineraryForm.file)
          : itineraryForm.image || "",
      file: itineraryForm.file instanceof File
        ? itineraryForm.file
        : null,
    };

    if (currentEditItineraryIdx !== null) {
      updatedList[currentEditItineraryIdx] = newItem;
      setCurrentEditItineraryIdx(null);
    } else {
      updatedList.push(newItem);
    }

    setFormData((prev) => ({
      ...prev,
      itineraries: updatedList,
    }));

    setItineraryForm({
      title: "",
      description: "",
      image: "",
      file: null,
    });
  };

  const options = [
    { id: "hotel", label: "Hotel", icon: <RiHotelLine /> },
    { id: "meals", label: "Meals", icon: <IoFastFoodOutline /> },
    { id: "flight", label: "Flight", icon: <PiAirplaneTakeoffLight /> },
    { id: "sightseeing", label: "Sightseeing", icon: <LuTrees /> },
    { id: "transport", label: "Transport", icon: <PiVanLight /> },
    { id: "train", label: "Train", icon: <IoTrainOutline /> },
  ];

  const handleToggleAmenity = (option) => {
    const exists = formData.inclusions.includes(option.label);
    let updated = exists
      ? formData.inclusions.filter((item) => item !== option.label)
      : [...formData.inclusions, option.label];

    setFormData((prev) => ({ ...prev, inclusions: updated }));
  };

  // --- FINAL FORM SUBMISSION WITH FORM DATA ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();

      // BASIC DETAILS
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("category", formData.category);
      submitData.append("status", formData.status);
      submitData.append("location", formData.location);
      submitData.append("base_price", formData.base_price);
      submitData.append("offer_price", formData.offer_price || "0");
      submitData.append("total_seats", formData.total_seats);

      // METADATA
      submitData.append("seo_title", formData.seo_meta.title);
      submitData.append("seo_desc", formData.seo_meta.desc);

      // ARRAYS SANITIZATION
      formData.highlights.forEach((item) =>
        submitData.append("highlights[]", item),
      );
      formData.inclusions.forEach((item) =>
        submitData.append("inclusions[]", item),
      );

      // COMPLEX OBJECT ARRAY HANDLING
      formData.itineraries.forEach((day, index) => {
        submitData.append(
          `itineraries[${index}][itinerary_title]`,
          day.title || "",
        );

        submitData.append(
          `itineraries[${index}][description]`,
          day.description || "",
        );

        // Existing DB id
        if (day.id) {
          submitData.append(`itineraries[${index}][id]`, day.id);
        }

        // Only send image if new file uploaded
        if (day.file instanceof File) {
          submitData.append(`itineraries[${index}][image]`, day.file);
        }

        // // New image upload
        // if (day.file instanceof File) {
        //   submitData.append(`itineraries[${index}][image]`, day.file);
        // }

        // // Existing image url
        // else if (day.image) {
        //   submitData.append(`itineraries[${index}][image]`, day.image);
        // }
      });

      if (formData.main_banner) {
        submitData.append("main_banner", formData.main_banner);
      }

      for (let pair of submitData.entries()) {
        console.log(pair[0], pair[1]);
      }

      onSave(submitData);
    } catch (error) {
      console.error("Submit Serialization Error:", error);
    }
  };

  return (
    <main className="page-container">
      <form onSubmit={handleSubmit}>
        <div className="p-8 max-w-[1400px] mx-auto w-full grid grid-cols-12 gap-8">
          {/* LEFT CONTAINER */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <div className="card bg-surface-container-lowest">
              <div className="card-header">
                <span className="material-symbols-outlined text-primary">
                  edit_note
                </span>
                <h2 className="card-title">Basic Information</h2>
              </div>

              <div className="form-grid">
                <InputComp
                  label="Tour Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  formClass="full"
                  placeholder="Tour Package Name"
                />

                <TextArea
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  formClass="full"
                />

                <SelectOption
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  child={
                    <>
                      <option value="">Select Category</option>
                      <option value="Religious Tourism">
                        Religious Tourism
                      </option>
                      <option value="Eco-Tourism">Eco-Tourism</option>
                      <option value="Culinary Tourism">Culinary Tourism</option>
                    </>
                  }
                />

                <SelectOption
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  child={
                    <>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </>
                  }
                />

                <SelectOption
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  child={
                    <>
                      <option value="">Select Location</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Pune">Pune</option>
                      <option value="Goa">Goa</option>
                    </>
                  }
                />
              </div>
            </div>

            {/* HIGHLIGHTS SECTION */}
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm ring-1 ring-black/[0.03]">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">
                    auto_awesome
                  </span>
                  <h2 className="text-lg font-bold tracking-tight">
                    Tour Highlights
                  </h2>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-2 mb-4">
                  {formData.highlights.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center group justify-between bg-surface-container-low px-3 py-2 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FiCheckCircle className="text-green-600" />
                        <span>{item}</span>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button
                          type="button"
                          onClick={() => {
                            setHighlightInput(item);
                            setHighlightEditIndex(index);
                          }}
                          className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeHighlight(index)}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full flex gap-2">
                  <input
                    type="text"
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleSaveHighlight())
                    }
                    placeholder="Enter something..."
                    className="w-full px-4 py-3 bg-surface-container-low rounded-lg focus:ring-2 focus:ring-primary/20 text-sm"
                  />
                  <button
                    onClick={handleSaveHighlight}
                    type="button"
                    className="bg-primary cursor-pointer w-[120px] text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    {highlightEditIndex !== null ? "Update" : "Save"}
                  </button>
                </div>
              </div>
            </div>

            {/* TABS VIEW CONTROLLER */}
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm ring-1 ring-black/[0.03]">
              <div className="flex gap-2 mb-6 border-b pb-2">
                {["itinerary", "inclusions", "seo"].map((tab) => (
                  <button
                    type="button"
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 cursor-pointer rounded-lg text-sm font-medium transition capitalize ${activeTab === tab ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div>
                {activeTab === "itinerary" && (
                  <div className="max-w-4xl mx-auto bg-white">
                    <div className="space-y-3 mb-6">
                      {formData.itineraries.map((data, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-surface-container-low p-4 rounded-xl group"
                        >
                          <div className="flex items-center gap-4">
                            {data.image && (
                              <img
                                src={data.image}
                                alt="preview"
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                            )}
                            <div>
                              <h2 className="text-xs font-bold text-primary">
                                Day: {idx + 1}
                              </h2>
                              <h3 className="font-semibold">{data.title}</h3>
                              <p className="text-sm text-gray-600">
                                {data.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                            <button
                              type="button"
                              onClick={() => {
                                setItineraryForm({
                                  id: data.id,
                                  title: data.title,
                                  description: data.description,
                                  image: data.image || "",
                                  file: null,
                                });
                                setCurrentEditItineraryIdx(idx);
                              }}
                              className="text-blue-500 cursor-pointer"
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  itineraries: formData.itineraries.filter(
                                    (_, i) => i !== idx,
                                  ),
                                })
                              }
                              className="text-red-500"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex w-full gap-5 items-stretch">
                      <div className="w-1/2 flex">
                        <div
                          onClick={() => itineraryFileRef.current.click()}
                          className="flex flex-1 items-center justify-center bg-surface-container-low border-2 border-dashed rounded-xl cursor-pointer h-[220px] overflow-hidden"
                        >
                          {itineraryForm.image ? (
                            <img
                              src={itineraryForm.image}
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
                          ref={itineraryFileRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handleItineraryImage}
                        />
                      </div>

                      <div className="w-1/2 flex flex-col">
                        <InputComp
                          placeholder="Enter Itinerary Title"
                          value={itineraryForm.title}
                          onChange={(e) =>
                            setItineraryForm({
                              ...itineraryForm,
                              title: e.target.value,
                            })
                          }
                          formClass="mb-4"
                          inputClass="w-full px-4 py-3 bg-surface-container-low rounded-lg"
                        />
                        <TextArea
                          placeholder="Enter Itinerary Description"
                          value={itineraryForm.description}
                          onChange={(e) =>
                            setItineraryForm({
                              ...itineraryForm,
                              description: e.target.value,
                            })
                          }
                          formClass="flex-1"
                          inputClass="w-full h-full px-4 py-3 bg-surface-container-low rounded-lg resize-none"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={submitItineraryData}
                      className="w-[200px] bg-primary cursor-pointer text-white py-2 rounded-lg mt-4"
                    >
                      {currentEditItineraryIdx !== null
                        ? "Update Itinerary"
                        : "Add Itinerary"}
                    </button>
                  </div>
                )}

                {activeTab === "inclusions" && (
                  <div className="w-full mx-auto bg-white">
                    <h2 className="text-lg font-semibold mb-4">
                      Select Amenities
                    </h2>
                    <div className="flex gap-4 flex-wrap mb-6">
                      {options.map((opt) => (
                        <label
                          key={opt.id}
                          className="flex items-center gap-2 cursor-pointer p-2 border rounded-lg hover:bg-gray-50"
                        >
                          <input
                            type="checkbox"
                            checked={formData.inclusions.includes(opt.label)}
                            onChange={() => handleToggleAmenity(opt)}
                          />
                          <span className="flex items-center gap-2">
                            {opt.icon} {opt.label}
                          </span>
                        </label>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {formData.inclusions.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-green-50 text-green-800 px-3 py-2 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <FiCheckCircle />
                            {item}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleToggleAmenity({ label: item })}
                            className="text-red-500"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "seo" && (
                  <div>
                    <InputComp
                      label="SEO Title"
                      name="title"
                      value={formData.seo_meta.title}
                      onChange={handleSEOChange}
                      placeholder="Enter title"
                      formClass="mb-4"
                    />
                    <TextArea
                      label="SEO Description"
                      name="desc"
                      value={formData.seo_meta.desc}
                      onChange={handleSEOChange}
                      placeholder="Enter description"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT CONTAINER */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm ring-1 ring-black/[0.03]">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">
                  payments
                </span>
                <h2 className="text-lg font-bold tracking-tight">
                  Pricing & Rules
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <InputComp
                  label="Base Price"
                  name="base_price"
                  type="number"
                  value={formData.base_price}
                  onChange={handleChange}
                />
                <InputComp
                  label="Offer Price"
                  name="offer_price"
                  type="number"
                  value={formData.offer_price}
                  onChange={handleChange}
                />
              </div>

              <div className="pt-4 border-t space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold">Total Seats</p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          total_seats: Math.max(0, formData.total_seats - 1),
                        })
                      }
                      className="px-2 bg-gray-200 rounded cursor-pointer"
                    >
                      −
                    </button>
                    <span className="text-xs font-black">
                      {formData.total_seats}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          total_seats: formData.total_seats + 1,
                        })
                      }
                      className="px-2 bg-gray-200 rounded cursor-pointer"
                    >
                      +
                    </button>
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
              <div
                onClick={() => topUploadRef.current.click()}
                className="group relative flex items-center justify-center bg-surface-container-low border-2 border-dashed rounded-xl h-[250px] cursor-pointer overflow-hidden"
              >
                {formData.preview ? (
                  <img
                    src={formData.preview}
                    alt="banner"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-sm text-gray-500">
                    Click to upload
                  </div>
                )}
              </div>
              <input
                type="file"
                hidden
                ref={topUploadRef}
                onChange={handleMainBannerUpload}
              />
            </section>
          </div>
        </div>

        <div className="flex gap-4 px-8 max-w-[1400px] mx-auto pb-10">
          <button
            type="submit"
            className="bg-primary cursor-pointer text-white px-6 py-3 rounded-lg font-bold"
          >
            {editData ? "Update Tour" : "Submit Tour"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 cursor-pointer border rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default TourForm;
