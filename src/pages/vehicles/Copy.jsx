import React, { useState, useEffect, useRef } from "react";

const VehiclesForm = ({ onSave, editData, onCancel }) => {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    location: "",
    price: "",
    image: "",
  });

  const [status, setStatus] = useState("AVAILABLE");
  const [featured, setFeatured] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    if (editData) {
      setFormData(editData);
      setStatus(editData.status);
      setFeatured(editData.image); // ✅ show image in edit
    }
  }, [editData]);

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

    onSave({
      ...formData,
      status,
      image: formData.image || featured || "https://picsum.photos/200",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="page-container">

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Vehicle Name"
        className="input"
      />

      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="input"
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="input"
      >
        <option>Business Luxury</option>
        <option>Off-road Elite</option>
        <option>Group VIP</option>
      </select>

      <select
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="input"
      >
        <option>Mumbai</option>
        <option>Delhi</option>
        <option>Pune</option>
        <option>Goa</option>
      </select>

      <input
        name="price"
        value={formData.price}
        onChange={handleChange}
        type="number"
        className="input"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="input"
      >
        <option>AVAILABLE</option>
        <option>RENTED</option>
        <option>In Maintenance</option>
      </select>

      {/* IMAGE BOX */}
      <div
        onClick={() => fileRef.current.click()}
        className="h-48 border flex items-center justify-center cursor-pointer"
      >
        {featured ? (
          <img
            src={featured}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          "Click to upload image"
        )}
      </div>

      <input
        type="file"
        ref={fileRef}
        hidden
        accept="image/*"
        onChange={handleImage}
      />

      <button type="submit">
        {editData ? "Update" : "Add"}
      </button>

      <button type="button" onClick={onCancel}>
        Cancel
      </button>

    </form>
  );
};

export default VehiclesForm;