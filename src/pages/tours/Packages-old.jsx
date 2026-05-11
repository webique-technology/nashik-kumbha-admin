import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiUpload } from "react-icons/fi";
const Packages = () => {
  const navigate = useNavigate();

  // ✅ JSON DATA
  const [data, setData] = useState([
    {
      id: 1,
      title: "Maldives Azure Retreat",
      subtitle: "7 Days • Luxury Wellness",
      price: 3450,
      status: "Published",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB9OII7_D9873C1lIb82rrV7RqYpBnfzNSDG7DRnBQTMqt2uCGUF7ni1VvZdoVkO7raeGFHzH0K8vp9SwDdwO558L0xAg1jEyTiJ0TmmSFzPbQuPaAdc4uWg922XGMzKUTE29CniHEYbafVkaPyYsCWawdGLG2sztGEnZm38cW9CT_RhmS7xs6GmYOSdtnHkbScwHDagWpNj19gYS6I1awnoozuqrN1J6SRzu6uZ6sFmJDfEtA8C093zIuwsodNekv8ySDNH9g2edE",
    },
    {
      id: 2,
      title: "Golden Triangle Heritage",
      subtitle: "10 Days • Culture & History",
      price: 2100,
      status: "Draft",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBPgRm4IJybFT78p-42auzvORmDPHSdoSDNlKnx2NA3PoYglNawqkKmDOSFw9QaZhJd2wM8yAzmPzc68SVkQUAyshN7ZI38s7O0a8Newk-gCDol3cpX4sPJPfr_hG9ugb9d4_xe4shIgomuTjsQ-v3GhSt7ezwGJsVgc5cQ3wu7GOBiYMuD70QGYKrthZrUKrVBtXYnefKvkSybOtki00YMKRTYYekOvjmmj3Zr64p0m3I3xDWVgeWo6O9rp3bf0pWg2kTG-EjGTnQ",
    },
    {
      id: 3,
      title: "Sita Gumpha",
      subtitle: "10 Days • Culture & History",
      price: 2100,
      status: "Published",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBPgRm4IJybFT78p-42auzvORmDPHSdoSDNlKnx2NA3PoYglNawqkKmDOSFw9QaZhJd2wM8yAzmPzc68SVkQUAyshN7ZI38s7O0a8Newk-gCDol3cpX4sPJPfr_hG9ugb9d4_xe4shIgomuTjsQ-v3GhSt7ezwGJsVgc5cQ3wu7GOBiYMuD70QGYKrthZrUKrVBtXYnefKvkSybOtki00YMKRTYYekOvjmmj3Zr64p0m3I3xDWVgeWo6O9rp3bf0pWg2kTG-EjGTnQ",
    },
    {
      id: 4,
      title: "Ramkund",
      subtitle: "10 Days • Culture & History",
      price: 2100,
      status: "Published",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBPgRm4IJybFT78p-42auzvORmDPHSdoSDNlKnx2NA3PoYglNawqkKmDOSFw9QaZhJd2wM8yAzmPzc68SVkQUAyshN7ZI38s7O0a8Newk-gCDol3cpX4sPJPfr_hG9ugb9d4_xe4shIgomuTjsQ-v3GhSt7ezwGJsVgc5cQ3wu7GOBiYMuD70QGYKrthZrUKrVBtXYnefKvkSybOtki00YMKRTYYekOvjmmj3Zr64p0m3I3xDWVgeWo6O9rp3bf0pWg2kTG-EjGTnQ",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    id: null,
    title: "",
    subtitle: "",
    price: "",
    status: "Draft",
    image: "",
  });

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ✅ IMAGE UPLOAD
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: URL.createObjectURL(file) });
    }
  };

  // ✅ ADD / UPDATE
  const handleSubmit = () => {
    if (isEdit) {
      setData((prev) =>
        prev.map((item) => (item.id === form.id ? form : item))
      );
    } else {
      setData([...data, { ...form, id: Date.now() }]);
    }

    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      id: null,
      title: "",
      subtitle: "",
      price: "",
      status: "Draft",
      image: "",
    });
  };

  // ✅ EDIT
  const handleEdit = (item) => {
    setForm(item);
    setIsEdit(true);
    setShowModal(true);
  };

  // ✅ DELETE
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      {/* TOP BUTTONS */}

      <div className="packages-header">
        <div>
          <h2 className="packages-title">Manage Tour Packages</h2>
          <p className="packages-desc">
            Curation is at the heart of the Voyager experience. Review, edit, or introduce new horizons for your travelers.
          </p>
        </div>

        <div className="flex gap-3">
          <button
          onClick={() => {
            resetForm();
            setIsEdit(false);
            setShowModal(true);
          }}
          className="btn-primary"
        >
          + New Package
        </button>

        <button
          onClick={() => navigate("/new-form")}
          className="btn-primary"
        >
          + New Form
        </button>
        </div>
      </div>


      {/* TABLE */}
      <div className="table-wrapper">
        <table className="table-main">
          <thead className="table-head">
            <tr>
              <th className="table-th">Package</th>
              <th className="table-th">Price</th>
              <th className="table-th">Status</th>
              <th className="table-th text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data.map((item) => (
              <tr key={item.id} className="border-t border-[#ebefec]">
                <td className="px-6 py-5">
                  <div className="flex gap-3 items-center">
                    <img
                      src={item.image}
                      alt=""
                      className="w-14 h-10 object-cover rounded"
                    />

                    <div>
                      <div className="font-bold text-sm md:text-base">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">${item.price}</td>

                <td className="px-6 py-5">
                  <span
                    className={`status ${item.status === "Published"
                      ? "status-published"
                      : "status-draft"
                      }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="text-right px-6 py-5">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <FiEdit size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2 className="modal-title">
              {isEdit ? "Edit Package" : "New Package"}
            </h2>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full mb-2 border p-2"
            />

            <input
              name="subtitle"
              value={form.subtitle}
              onChange={handleChange}
              placeholder="Subtitle"
              className="w-full mb-2 border p-2"
            />

            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full mb-2 border p-2"
            />

            {/* STATUS DROPDOWN */}
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full mb-2 border p-2"
            >
              <option>Published</option>
              <option>Draft</option>
            </select>

            {/* IMAGE UPLOAD */}
            <div className="mb-3">
              <label className="block mb-1 font-medium">Upload Image</label>

              {/* Upload Box */}
              <div
                onClick={() => document.getElementById("fileInput").click()}
                className="upload-box"
              >
                <FiUpload className="upload-icon" />
                <p className="upload-text">Click to upload</p>
              </div>

              {/* Hidden Input */}
              <input
                id="fileInput"
                type="file"
                onChange={handleImage}
                className="hidden"
              />

              {/* Preview BELOW box */}
              {form.image && (
                <img
                  src={form.image}
                  alt="preview"
                  className="w-full h-32 object-cover mt-3 rounded"
                />
              )}
            </div>

            {/* {form.image && (
              <img
                src={form.image}
                alt=""
                className="w-full h-32 object-cover mb-2"
              />
            )} */}

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-1 rounded"
              >
                {isEdit ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Packages;