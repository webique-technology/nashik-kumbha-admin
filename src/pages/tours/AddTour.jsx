import React, { useRef, useState } from 'react'
import { FiUpload } from "react-icons/fi";
import { FaSnowflake, FaFan, FaUtensils, FaCrown, } from "react-icons/fa";
import { FiTrash2, FiCheckCircle, FiEdit2 } from "react-icons/fi";

const AddTour = () => {
    const [isOn, setIsOn] = useState(false);

    const [count, setCount] = useState(12);

    const increase = () => setCount((prev) => prev + 1);

    const decrease = () => {
        setCount((prev) => (prev > 0 ? prev - 1 : 0));
    };

    const handleChange = (e) => {
        const val = Number(e.target.value);
        if (val >= 0) setCount(val);
    };
    //--------- Upload Images--------
    const [images, setImages] = useState([]);
    const [featured, setFeatured] = useState(null);

    const topUploadRef = useRef();

    // Handle Upload
    const handleUpload = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map((file) => URL.createObjectURL(file));

        setImages((prev) => [...prev, ...imageUrls]);

        if (!featured && imageUrls.length > 0) {
            setFeatured(imageUrls[0]);
        }
    };


    
    // Delete Image
    const handleDeleteRep = (index) => {
        const removed = images[index];
        const updated = images.filter((_, i) => i !== index);

        setImages(updated);

        // If deleted image is featured → update it
        if (removed === featured) {
            setFeatured(updated[0] || null);
        }
    };

    //--------- End Here --------

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
    const submitItineraryData = (e) => {
        e.preventDefault();

        if (
            !itineraryForm.title.trim() ||
            !itineraryForm.description.trim()
        )
            return;

        if (currentEditIndex !== null) {
            // Update
            const updatedList = [...itineraryList];
            updatedList[currentEditIndex] = itineraryForm;
            setItineraryList(updatedList);
            setCurrentEditIndex(null);
        } else {
            // Add
            setItineraryList((prev) => [itineraryForm, ...prev]);
        }

        // Reset form
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

    const handleSubmit = () => {
        const filtered = options.filter((opt) => selected.includes(opt.id));
        setSavedItems(filtered);
    };


    const fileInputRef = useRef(null);

    const handleBoxClick = () => {
        fileInputRef.current.click();
    };

    // ---------- end -------

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

    const handleDeleteTabs = (index) => {
        setSavedList((prev) => prev.filter((_, i) => i !== index));
    };

    const handleEditTabs = (index) => {
        setEditIndex(index);
        setEditText(savedList[index]);
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


            <div className="p-8 max-w-[1400px] mx-auto w-full grid grid-cols-12 gap-8">

                <div className="col-span-12 lg:col-span-8 space-y-8">

                    <section className="card bg-surface-container-lowest">
                        <div className="card-header">
                            <span className="material-symbols-outlined text-primary">edit_note</span>
                            <h2 className="card-title">Basic Information</h2>
                        </div>

                        <div className="form-grid">

                            <div className="form-group full">
                                <label className="form-label">Package Title</label>
                                <input
                                    className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20"
                                    placeholder="e.g. Saffron Trails: Luxury Rajasthan Expedition"
                                    type="text"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Package Code</label>
                                <input className="form-input form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20" placeholder="GC-RJ-001" type="text" />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Category</label>
                                <select className="form-input form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20">
                                    <option>Cultural Heritage</option>
                                    <option>Adventure</option>
                                    <option>Luxury Wellness</option>
                                    <option>Culinary Journey</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Primary Destination</label>
                                <input className="form-input form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20" placeholder="Jaipur, Rajasthan" type="text" />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Tour Type</label>
                                <div className="btn-group">
                                    <button className="btn-primary bg-primary-container text-on-primary-container">Group</button>
                                    <button className="btn-secondary bg-surface-container hover:bg-surface-container-high">Private</button>
                                </div>
                            </div>

                        </div>
                    </section>

                    <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm ring-1 ring-black/[0.03]">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-primary">schedule</span>
                            <h2 className="text-lg font-bold tracking-tight">Duration &amp; Schedule</h2>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-3 lg:col-span-1">
                                <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Duration Text</label>
                                <input className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm font-medium" placeholder="7 Days / 6 Nights" type="text" />
                            </div>
                            <div className="col-span-3 lg:col-span-1">
                                <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Start Date</label>
                                <input className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm font-medium" type="date" />
                            </div>
                            <div className="col-span-3 lg:col-span-1">
                                <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">End Date</label>
                                <input className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm font-medium" type="date" />
                            </div>


                        </div>
                    </section>

                    {/* <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm ring-1 ring-black/[0.03]">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                                <h2 className="text-lg font-bold tracking-tight">Tour Highlights (add title, description, image)</h2>
                            </div>
                            <button className="text-xs font-bold bg-primary/10 text-primary px-4 py-2 rounded hover:bg-primary/20 transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">add</span> Add Point
                            </button>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-lg group">
                                <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                                <input className="bg-transparent border-none w-full text-sm font-medium outline-0 focus:ring-0 p-0" type="text" value="Luxury desert camping under the stars in Jaisalmer" />
                                <button className="opacity-0 group-hover:opacity-100 text-outline-variant hover:text-error transition-all">
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-lg group">
                                <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                                <input className="bg-transparent border-none w-full text-sm font-medium outline-0 focus:ring-0 p-0" type="text" value="Private guided sunset tour of the Taj Mahal" />
                                <button className="opacity-0 group-hover:opacity-100 text-outline-variant hover:text-error transition-all">
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-lg group">
                                <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                                <input className="bg-transparent border-none w-full text-sm font-medium outline-0 focus:ring-0 p-0" type="text" value="Traditional Rajasthani Thali dinner at a Haveli" />
                                <button className="opacity-0 group-hover:opacity-100 text-outline-variant hover:text-error transition-all">
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                            </div>
                        </div>
                    </section> */}

                    <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm ring-1 ring-black/[0.03]">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                                <h2 className="text-lg font-bold tracking-tight">Tour Highlights (add title, description, image)</h2>
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
                                                    <button
                                                        onClick={() => handleEditTabs(index)}
                                                        className="text-blue-500 hover:text-blue-700"
                                                    >
                                                        <FiEdit2 />
                                                    </button>

                                                    {/* Delete */}
                                                    <button
                                                        onClick={() => handleDeleteTabs(index)}
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
                                    onClick={handleSave}
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
                                <button
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
                                                    <button
                                                        onClick={() => editItineraryItem(idx)}
                                                        className="text-blue-500 hover:text-blue-700"
                                                    >
                                                        <FiEdit2 />
                                                    </button>

                                                    <button
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
                                    <form
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
                                                        value={itineraryForm.title}
                                                        onChange={handleItineraryInput}
                                                        className="w-full px-4 py-3 bg-surface-container-low rounded-lg"
                                                    />
                                                </div>

                                                <div className="flex-1">
                                                    <textarea
                                                        name="description"
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
                                                type="submit"
                                                className="w-[200px] bg-primary text-white py-2 rounded-lg mt-4"
                                            >
                                                {currentEditIndex !== null
                                                    ? "Update Itinerary"
                                                    : "Add Itinerary"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {activeTab === "inclusions" && (
                                <div className="w-full mx-auto bg-white ">
                                    <h2 className="text-lg font-semibold mb-4">Select Amenities</h2>

                                    {/* Checkboxes */}
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

                                    {/* Selected Items */}
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

                                    {/* Submit Button */}


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
                </div>

                <div className="col-span-12 lg:col-span-4 space-y-8">

                    <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm ring-1 ring-black/[0.03]">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-primary">payments</span>
                            <h2 className="text-lg font-bold tracking-tight">Pricing &amp; Rules</h2>
                        </div>
                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Base Price ($)</label>
                                    <input className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm font-black" type="number" value="1200" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Offer Price ($)</label>
                                    <input className="w-full px-4 py-3 bg-primary/5 text-primary border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm font-black" type="number" value="999" />
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
                                            onClick={decrease}
                                            className="px-2 py-1 bg-gray-200 rounded text-xs"
                                        >
                                            −
                                        </button>

                                        {/* Input */}
                                        <input
                                            type="number"
                                            value={count}
                                            onChange={handleChange}
                                            className="w-16 px-2 py-1 bg-surface-container-low border-none rounded text-center text-xs font-black appearance-none"
                                        />

                                        {/* Up Button */}
                                        <button
                                            onClick={increase}
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
                            <h2 className="text-lg font-bold tracking-tight">Main Banner</h2>
                        </div>
                        <div className="space-y-4">

                            {/* 🔷 Featured Image (NOW CLICKABLE FOR UPLOAD) */}
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

                                {/* Hidden Input for Top Upload */}
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    ref={topUploadRef}
                                    className="hidden"
                                    onChange={handleUpload}
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
                                        onChange={handleUpload}
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

                                        {/* 🔴 Delete Button */}
                                        <button
                                            onClick={() => handleDeleteRep(index)}
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
        </main>
    )
}

export default AddTour