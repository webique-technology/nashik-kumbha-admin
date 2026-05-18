import React, { useRef, useState, useEffect } from 'react'
import { FaSnowflake, FaFan, FaUtensils, FaCrown } from "react-icons/fa";
import { FiTrash2, FiCheckCircle, FiEdit2, FiUpload } from "react-icons/fi";
import { IoCloudUploadOutline, IoFastFoodOutline, IoTrainOutline } from "react-icons/io5";
import { RiHotelLine } from "react-icons/ri";
import { PiAirplaneTakeoffLight, PiVanLight } from "react-icons/pi";
import { LuTrees } from "react-icons/lu";


// --- REUSABLE COMPONENTS (Logic Inside) ---
const InputComp = ({ name, onChange, label, value, placeholder, formClass, inputClass = "form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20", type = "text" }) => (
  <div className={`form-group ${formClass}`}>
    <label className="form-label">{label}</label>
    <input name={name} value={value} onChange={onChange} className={`${inputClass}`} type={type} placeholder={placeholder} />
  </div>
);

const TextArea = ({ name, value, onChange, label, formClass, placeholder = "Enter Description", inputClass = "form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20 " }) => (
  <div className={`form-group ${formClass}`}>
    <label className="form-label">{label}</label>
    <textarea name={name} value={value} onChange={onChange} className={`${inputClass}`} placeholder={placeholder} />
  </div>
);

const SelectOption = ({ child, formClass, label, name, value, onChange }) => (
  <div className={`form-group ${formClass}`}>
    <label className="form-label">{label}</label>
    <select name={name} value={value} onChange={onChange} className="form-input bg-surface-container-low">
      {child}
    </select>
  </div>
);

// Main Form Component
const TourForm = ({ onSave, editData, onCancel }) => {
  // --- UI STATE ---
  const [activeTab, setActiveTab] = useState("itinerary");
  const [isOn, setIsOn] = useState(false); // Tax toggle

  // --- MAIN FORM STATE ---
  const [formData, setFormData] = useState({
    main_banner: [],
    title: "",
    description: "",
    category: "",
    status: "active",
    location: "",
    base_price: "",
    offer_price: "",
    total_seats: 12,
    highlights: [],
    itinerary: [], // Fixed spelling consistency
    inclusions: [],  // This maps to your "inclusions" selected items
    seo_meta: {
      title: "",
      desc: ""
    },
  });

  // --- LOCAL COMPONENT STATES (For temporary input handling) ---
  const [highlightInput, setHighlightInput] = useState("");
  const [highlightEditIndex, setHighlightEditIndex] = useState(null);
  const [itineraryForm, setItineraryForm] = useState({
    title: "",
    description: "",
    preview: "",
  });
  const [currentEditItineraryIdx, setCurrentEditItineraryIdx] = useState(null);

  // --- REFS ---
  const topUploadRef = useRef();
  const itineraryFileRef = useRef();

  // --- PREFILL DATA ---
  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        itinerary: editData.itinerary || editData.itineary || [], // Handle potential spelling variants
        inclusions: editData.inclusions || [],
      });
      setIsOn(editData.tax_inclusive || false);
    }
  }, [editData]);

  // --- BASIC INPUT HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSEOChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      seo_meta: { ...prev.seo_meta, [name]: value }
    }));
  };

  const handleMainBannerUpload = (e) => {
    
    const file = e.target.files[0];

    // if (file) {
    //   // setFormData((prev) => ({ ...prev, main_banner: file.name }));
    //   setFormData((prev) => ({ ...prev, preview: URL.createObjectURL(file) }));
    //   console.log("file image:", file);
    // }

    if (file) {
      setFormData((prev) => ({ ...prev,
        main_banner: file, // actual file object
        preview: URL.createObjectURL(file), // preview url
      }));

    }
    console.log("formdata.mainbanner:", formData.main_banner);
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

    setFormData({ ...formData, highlights: updatedHighlights });
    setHighlightInput("");
  };

  const removeHighlight = (index) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== index)
    });
  };

  // --- ITINERARY LOGIC ---
  const handleItineraryImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setItineraryForm({ ...itineraryForm, preview: URL.createObjectURL(file) });
    }
  };

  const submitItineraryData = () => {
    if (!itineraryForm.title.trim() || !itineraryForm.description.trim()) return;

    const updatedList = [...formData.itinerary];
    if (currentEditItineraryIdx !== null) {
      updatedList[currentEditItineraryIdx] = itineraryForm;
      setCurrentEditItineraryIdx(null);
    } else {
      updatedList.push(itineraryForm);
    }

    setFormData({ ...formData, itinerary: updatedList });
    setItineraryForm({ title: "", description: "", preview: "" });
  };

  // --- AMENITIES / INCLUSIONS LOGIC ---
  const options = [
    { id: "hotel", label: "Hotel", icon: <RiHotelLine /> },
    { id: "meals", label: "Meals", icon: <IoFastFoodOutline /> },
    { id: "flight", label: "Flight", icon: <PiAirplaneTakeoffLight /> },
    { id: "sightseeing", label: "Sightseeing", icon: <LuTrees /> },
    { id: "transport", label: "Transport", icon: <PiVanLight /> },
    { id: "train", label: "Train", icon: <IoTrainOutline /> },
  ];

  const handleToggleAmenity = (option) => {
    const exists = formData.inclusions.find((item) => item.id === option.id);
    let updated;
    if (exists) {
      updated = formData.inclusions.filter((item) => item.id !== option.id);
    } else {
      updated = [...formData.inclusions, option];
    }
    setFormData({ ...formData, inclusions: updated });
  };

  // --- FINAL SUBMIT ---
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit data image", formData);

    const cleanedinclusions = formData.inclusions.map(feature => ({
      label: feature.label
      // We EXCLUDE the 'icon' property here
    }));

    onSave({
      ...formData,
      base_price: Number(formData.base_price),
      offer_price: Number(formData.offer_price),
      inclusions: cleanedinclusions,
      tax_inclusive: isOn,
      // Ensure specific field mapping required by your backend
      images: [formData.main_banner]
    });
  };
  return (
    <main className="page-container">
      <form onSubmit={handleSubmit}>
        <div className="p-8 max-w-[1400px] mx-auto w-full grid grid-cols-12 gap-8">

          {/* LEFT SIDE */}
          <div className="col-span-12 lg:col-span-8 space-y-8">

            <section className="card bg-surface-container-lowest">
              <div className="card-header">
                <span className="material-symbols-outlined text-primary">edit_note</span>
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
                      <option value="Religious Tourism">Religious Tourism</option>
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
                      <option>Mumbai</option>
                      <option>Delhi</option>
                      <option>Pune</option>
                      <option>Goa</option>
                    </>
                  }
                />
              </div>
            </section>

            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm ring-1 ring-black/[0.03]">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">auto_awesome</span>
                  <h2 className="text-lg font-bold tracking-tight">Tour Highlights</h2>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-2 mb-4">
                  {formData.highlights.map((item, index) => (
                    <div key={index} className="flex items-center group justify-between bg-surface-container-low px-3 py-2 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FiCheckCircle className="text-green-600" />
                        <span>{item}</span>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button type='button' onClick={() => { setHighlightInput(item); setHighlightEditIndex(index) }} className="text-blue-500 hover:text-blue-700"><FiEdit2 /></button>
                        <button type='button' onClick={() => removeHighlight(index)} className="text-red-500 hover:text-red-700"><FiTrash2 /></button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full flex gap-2">
                  <input
                    type="text"
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleSaveHighlight())}
                    placeholder="Enter something..."
                    className="w-full px-4 py-3 bg-surface-container-low rounded-lg focus:ring-2 focus:ring-primary/20 text-sm"
                  />
                  <button onClick={handleSaveHighlight} type='button' className="bg-primary w-[120px] text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    {highlightEditIndex !== null ? "Update" : "Save"}
                  </button>
                </div>
              </div>
            </section>

            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm ring-1 ring-black/[0.03]">
              <div className="flex gap-2 mb-6 border-b pb-2">
                {["itinerary", "inclusions", "seo"].map((tab) => (
                  <button type='button' key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition capitalize ${activeTab === tab ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                    {tab}
                  </button>
                ))}
              </div>

              <div>
                {activeTab === "itinerary" && (
                  <div className="max-w-4xl mx-auto bg-white">
                    <div className="space-y-3 mb-6">
                      {formData.itinerary.map((data, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-surface-container-low p-4 rounded-xl group">
                          <div className="flex items-center gap-4">
                            {data.preview && <img src={data.preview} alt="preview" className="w-20 h-20 object-cover rounded-lg" />}
                            <div>
                              <h2 className="text-xs font-bold text-primary">Day: {idx + 1}</h2>
                              <h3 className="font-semibold">{data.title}</h3>
                              <p className="text-sm text-gray-600">{data.description}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                            <button type='button' onClick={() => { setItineraryForm(data); setCurrentEditItineraryIdx(idx) }} className="text-blue-500"><FiEdit2 /></button>
                            <button type="button" onClick={() => setFormData({ ...formData, itinerary: formData.itinerary.filter((_, i) => i !== idx) })} className="text-red-500"><FiTrash2 /></button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className='flex w-full gap-5 items-stretch'>
                      <div className='w-1/2 flex'>
                        <div onClick={() => itineraryFileRef.current.click()} className="flex flex-1 items-center justify-center bg-surface-container-low border-2 border-dashed rounded-xl cursor-pointer h-[220px] overflow-hidden">
                          {itineraryForm.preview ? <img src={itineraryForm.preview} alt="preview" className="w-full h-full object-cover" /> :
                            <div className="text-center"><FiUpload className="text-3xl mb-2 text-gray-500 mx-auto" /><p className="text-sm text-gray-500">Click to upload image</p></div>}
                        </div>
                        <input type="file" ref={itineraryFileRef} className="hidden" accept="image/*" onChange={handleItineraryImage} />
                      </div>

                      <div className='w-1/2 flex flex-col'>
                        <InputComp
                          placeholder="Enter Itinerary Title"
                          value={itineraryForm.title}
                          onChange={(e) => setItineraryForm({ ...itineraryForm, title: e.target.value })}
                          formClass="mb-4"
                          inputClass="w-full px-4 py-3 bg-surface-container-low rounded-lg"
                        />
                        <TextArea
                          placeholder='Enter Itinerary Description'
                          value={itineraryForm.description}
                          onChange={(e) => setItineraryForm({ ...itineraryForm, description: e.target.value })}
                          formClass="flex-1"
                          inputClass='w-full h-full px-4 py-3 bg-surface-container-low rounded-lg resize-none'
                        />
                      </div>
                    </div>
                    <button type="button" onClick={submitItineraryData} className="w-[200px] bg-primary text-white py-2 rounded-lg mt-4">
                      {currentEditItineraryIdx !== null ? "Update Itinerary" : "Add Itinerary"}
                    </button>
                  </div>
                )}

                {activeTab === "inclusions" && (
                  <div className="w-full mx-auto bg-white">
                    <h2 className="text-lg font-semibold mb-4">Select Amenities</h2>
                    <div className="flex gap-4 flex-wrap mb-6">
                      {options.map((opt) => (
                        <label key={opt.id} className="flex items-center gap-2 cursor-pointer p-2 border rounded-lg hover:bg-gray-50">
                          <input type="checkbox" checked={formData.inclusions.some(i => i.id === opt.id)} onChange={() => handleToggleAmenity(opt)} />
                          <span className="flex items-center gap-2">{opt.icon} {opt.label}</span>
                        </label>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {formData.inclusions.map((item) => (
                        <div key={item.id} className="flex items-center justify-between bg-green-50 text-green-800 px-3 py-2 rounded-lg">
                          <div className="flex items-center gap-2"><FiCheckCircle />{item.icon} {item.label}</div>
                          <button type="button" onClick={() => handleToggleAmenity(item)} className="text-red-500"><FiTrash2 /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "seo" && (
                  <div>
                    <InputComp label="SEO Title" name="title" value={formData.seo_meta.title} onChange={handleSEOChange} placeholder="Enter title" formClass="mb-4" />
                    <TextArea label="SEO Description" name="desc" value={formData.seo_meta.desc} onChange={handleSEOChange} placeholder="Enter description" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <section className='bg-surface-container-lowest rounded-xl p-6 shadow-sm ring-1 ring-black/[0.03]'>
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">payments</span>
                <h2 className="text-lg font-bold tracking-tight">Pricing & Rules</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <InputComp label="Base Price" name="base_price" type="number" value={formData.base_price} onChange={handleChange} />
                <InputComp label="Offer Price" name="offer_price" type="number" value={formData.offer_price || 999} onChange={handleChange} />
              </div>

              <div className="pt-4 border-t space-y-4">
                <div className="flex justify-between items-center">
                  <div><p className="text-xs font-bold">Total Seats</p></div>
                  <div className="flex items-center gap-2">
                    <button type='button' onClick={() => setFormData({ ...formData, total_seats: Math.max(0, formData.total_seats - 1) })} className="px-2 bg-gray-200 rounded">−</button>
                    <span className="text-xs font-black">{formData.total_seats}</span>
                    <button type='button' onClick={() => setFormData({ ...formData, total_seats: formData.total_seats + 1 })} className="px-2 bg-gray-200 rounded">+</button>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm ring-1 ring-black/[0.03]">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">collections</span>
                <h2 className="text-lg font-bold tracking-tight">Main Banner</h2>
              </div>
              <div onClick={() => topUploadRef.current.click()} className="group relative flex items-center justify-center bg-surface-container-low border-2 border-dashed rounded-xl h-[250px] cursor-pointer overflow-hidden">
                {formData.main_banner ? <img src={formData.main_banner} alt="banner" className="w-full h-full object-cover" /> : <div className="text-center text-sm text-gray-500">Click to upload</div>}
              </div>
              <input type="file" hidden ref={topUploadRef} onChange={handleMainBannerUpload} />
            </section>
          </div>
        </div>

        <div className="flex gap-4 px-8 max-w-[1400px] mx-auto pb-10">
          <button type="submit" className="bg-primary text-white px-6 py-3 rounded-lg font-bold">
            {editData ? "Update Hotel" : "Submit Hotel"}
          </button>
          <button type="button" onClick={onCancel} className="px-6 py-3 border rounded-lg">Cancel</button>
        </div>
      </form>
    </main>
  );
}

export default TourForm;