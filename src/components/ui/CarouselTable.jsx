import { useState, useEffect } from "react";
import api from "../../services/axiosInstance";
const API_URL = import.meta.env.VITE_API_URL;
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import {
    FiEye,
    FiEdit2,
    FiTrash2,
    FiUploadCloud,
} from "react-icons/fi";

export default function CarouselTable() {
    const [carouselData, setCarouselData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [errors, setErrors] = useState({}); // Stores Laravel API validation errors

    // Track both visual preview (base64/URL) and raw file data for submission
    const [form, setForm] = useState({
        title: "",
        sub_title: "",
        description: "",
        first_button_name: "",
        first_button_link: "",
        second_button_name: "",
        second_button_link: "",
        status: 1, // 1 for Active, 0 for Inactive
        carousel_image: null, 
        imagePreview: "" // For visual rendering in the modal
    });


    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch carousels on mount
    useEffect(() => {
        fetchCarousels();
    }, []);

    // --- API Interactions ---

    const fetchCarousels = async (page = 1) => {
        setLoading(true);

        try {
            const response = await api.get(`/carousel?page=${page}`);

            setCarouselData(response.data.data);

            setPagination({
                current_page: response.data.current_page,
                last_page: response.data.last_page,
                per_page: response.data.per_page,
                total: response.data.total,
                from: response.data.from,
                to: response.data.to,
                next_page_url: response.data.next_page_url,
                prev_page_url: response.data.prev_page_url,
                links: response.data.links,
            });

            setCurrentPage(response.data.current_page);
        } catch (error) {
            console.log("Carousel fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setErrors({}); // Reset error messages on initial save request
        
        // Build FormData to support file/image updates reliably over POST
        const formData = new FormData();
        formData.append("title", form.title || "");
        formData.append("sub_title", form.sub_title || "");
        formData.append("description", form.description || "");
        formData.append("first_button_name", form.first_button_name || "");
        formData.append("first_button_link", form.first_button_link || "");
        formData.append("second_button_name", form.second_button_name || "");
        formData.append("second_button_link", form.second_button_link || "");
        formData.append("status", form.status);

        // Append file binary only if a new file object was selected
        if (form.carousel_image instanceof File) {
            formData.append("carousel_image", form.carousel_image);
        }

        try {
            if (modalType === "add") {
                await api.post("/carousel/store", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                console.log("Carousel created successfully");
            } else if (modalType === "edit") {
                // Using POST for updates with files bypassing structural PUT limitations
                await api.post(`/carousel/update/${selectedItem.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                console.log("Carousel updated successfully");
            }
            
            fetchCarousels();
            closeModal();
            setCurrentPage(1);
        } catch (error) {
            console.log("Carousel save error:", error);
            // Check if error response details validation properties match Laravel rules
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/carousel/delete/${selectedItem.id}`);
            console.log("Carousel deleted successfully");
            
            // Adjust pagination context if last element is deleted
           if (currentPage > 1 && carouselData.length === 1) {
                setCurrentPage((prev) => prev - 1);
            }
            
            fetchCarousels(currentPage);
            closeModal();
        } catch (error) {
            console.log("Carousel deletion error:", error);
        }
    };

    // --- Image Handling Setup ---

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setForm((prev) => ({
                ...prev,
                carousel_image: file, // Store actual File structure for API payload
                imagePreview: reader.result, // For immediate UI display
            }));
        };
        reader.readAsDataURL(file);
    };

    // --- Modal Event Configurations ---

    const openAddModal = () => {
        setForm({
            title: "",
            sub_title: "",
            description: "",
            first_button_name: "",
            first_button_link: "",
            second_button_name: "",
            second_button_link: "",
            status: 1,
            carousel_image: null,
            imagePreview: ""
        });
        setErrors({});
        setModalType("add");
    };

    const openViewModal = (item) => {
        setSelectedItem(item);
        setModalType("view");
    };

    const openEditModal = (item) => {
        setSelectedItem(item);
        setForm({
            title: item.title || "",
            sub_title: item.sub_title || "",
            description: item.description || "",
            first_button_name: item.first_button_name || "",
            first_button_link: item.first_button_link || "",
            second_button_name: item.second_button_name || "",
            second_button_link: item.second_button_link || "",
            status: Number(item.status),
            carousel_image: item.carousel_image, 
            imagePreview: item.carousel_image // Existing URL asset acts as initial preview
        });
        setErrors({});
        setModalType("edit");
    };

    const openDeleteModal = (item) => {
        setSelectedItem(item);
        setModalType("delete");
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedItem(null);
        setErrors({});
    };

    return (
        <div className="rounded-xl bg-white">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="title text-on-surface">Carousel Management</h2>
                <button
                    onClick={openAddModal}
                    className="rounded-lg btn-primary-packages text-white"
                >
                    Add New Carousel
                </button>
            </div>

            {/* Table wrapper containing dynamic response view hook */}
            <div className="table-wrapper bg-surface-container-lowest">
                {loading ? (
                    <div className="p-6 text-center text-gray-500">Loading Carousels...</div>
                ) : (
                    <table className="table">
                        <thead>
                            <tr className="thead-row">
                                <th className="th">Carousel Image</th>
                                <th className="th">Title &amp; Sub Title</th>
                                <th className="th">Description</th>
                                <th className="th">Status</th>
                                <th className="th">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carouselData.map((item) => (
                                <tr key={item.id} className="tr group">
                                    <td className="p-3">
                                        <img
                                            // src={item.carousel_image}
                                            src={item.image_url ? item.image_url :""}
                                            alt=""
                                            className="h-16 w-24 rounded-lg object-cover bg-gray-100"
                                        />
                                    </td>
                                    <td className="p-3">
                                        <p className="font-medium">{item.title}</p>
                                        <p className="text-xs text-gray-500">{item.sub_title}</p>
                                    </td>
                                    <td className="p-3 max-w-sm">{item.description}</td>
                                    <td className="p-3">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                Number(item.status) === 1
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {Number(item.status) === 1 ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex gap-4 text-lg">
                                            <button title="View" onClick={() => openViewModal(item)}>
                                                <FiEye />
                                            </button>
                                            <button title="Edit" onClick={() => openEditModal(item)}>
                                                <FiEdit2 />
                                            </button>
                                            <button title="Delete" onClick={() => openDeleteModal(item)}>
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {carouselData.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-6 text-center text-gray-400">
                                        No entries found. Create a new carousel setting to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}

                {/* Pagination Controls */}
                {carouselData.length > 0 && (
                    <div className="pagination">
                        <div className="text-sm text-gray-600">
                            Showing {pagination.from || 0} - {pagination.to || 0}
                            of {pagination.total || 0}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                disabled={!pagination.prev_page_url}
                                onClick={() => fetchCarousels(currentPage - 1)}
                                className="px-3 py-1 rounded disabled:opacity-50"
                            >
                                <FaChevronLeft />
                            </button>
                            {Array.from({ length: pagination.last_page || 0 },(_, i) => (
                                <button
                                    key={i}
                                    onClick={() => fetchCarousels(i + 1)}
                                    className={`h-9 w-9 rounded ${
                                        currentPage === i + 1
                                            ? "px-3 py-1 border rounded bg-primary text-white"
                                            : "px-3 py-1 border rounded bg-secondary border-gray-300 hover:bg-gray-100"
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                disabled={!pagination.next_page_url}
                                onClick={() => fetchCarousels(currentPage + 1)}
                                className="px-3 py-1 rounded disabled:opacity-50"
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* View Modal */}
            {modalType === "view" && selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-xl rounded-xl bg-white p-6 max-h-[90vh] overflow-y-auto">
                        <img
                            src={selectedItem.image_url}
                            alt=""
                            className="mb-6 h-64 w-full rounded-lg object-cover bg-gray-100"
                        />
                        <div className="space-y-4">
                            <div>
                                <p className="mb-1 text-sm font-medium text-gray-500">Subtitle :</p>
                                <p className="text-base text-gray-900">{selectedItem.sub_title}</p>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium text-gray-500">Title :</p>
                                <p className="text-base font-semibold text-gray-900">{selectedItem.title}</p>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium text-gray-500">Description :</p>
                                <p className="text-base text-gray-700">{selectedItem.description}</p>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium text-gray-500">First Button Name :</p>
                                <p className="text-base text-gray-900">{selectedItem.first_button_name}</p>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium text-gray-500">First Button Link :</p>
                                <p className="break-all text-base text-blue-600">{selectedItem.first_button_link}</p>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium text-gray-500">Second Button Name :</p>
                                <p className="text-base text-gray-900">{selectedItem.second_button_name}</p>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium text-gray-500">Second Button Link :</p>
                                <p className="break-all text-base text-blue-600">{selectedItem.second_button_link}</p>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button onClick={closeModal} className="rounded bg-primary px-4 py-2 text-white cursor-pointer">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Modal */}
            {(modalType === "add" || modalType === "edit") && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-3xl rounded-xl bg-white p-6 max-h-[95vh] overflow-y-auto">
                        <h3 className="mb-5 text-xl font-semibold">
                            {modalType === "add" ? "Add Carousel" : "Edit Carousel"}
                        </h3>

                        <div className="mb-5">
                            <label className="mb-2 block text-sm font-medium text-gray-700">Carousel Image</label>
                            <div className={`group relative mx-auto h-52 overflow-hidden rounded-xl border-2 border-dashed bg-gray-50 ${errors.carousel_image ? "border-red-500" : "border-gray-300"}`}>
                                <img
                                    src={form.imagePreview || "https://placehold.co/600x400?text=Upload+Image"}
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                                <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/50">
                                    <div className="translate-y-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        <div className="flex flex-col items-center text-white">
                                            <FiUploadCloud size={36} />
                                            <span className="mt-2 text-sm font-medium">Upload Image</span>
                                        </div>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </label>
                            </div>
                            {errors.carousel_image && (
                                <p className="mt-1.5 text-xs font-medium text-red-600">{errors.carousel_image[0]}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700">Subtitle</label>
                            <input
                                placeholder="Enter subtitle"
                                value={form.sub_title}
                                onChange={(e) => setForm({ ...form, sub_title: e.target.value })}
                                className={`form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20 ${errors.sub_title ? "border-red-500" : ""}`}
                            />
                            {errors.sub_title && (
                                <p className="mt-1 text-xs font-medium text-red-600">{errors.sub_title[0]}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700">Title</label>
                            <input
                                placeholder="Title"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className={`form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20 ${errors.title ? "border-red-500" : ""}`}
                            />
                            {errors.title && (
                                <p className="mt-1 text-xs font-medium text-red-600">{errors.title[0]}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">First Button Name</label>
                                <input
                                    placeholder="Enter first button name"
                                    value={form.first_button_name}
                                    onChange={(e) => setForm({ ...form, first_button_name: e.target.value })}
                                    className={`form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20 ${errors.first_button_name ? "border-red-500" : ""}`}
                                />
                                {errors.first_button_name && (
                                    <p className="mt-1 text-xs font-medium text-red-600">{errors.first_button_name[0]}</p>
                                )}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">First Button Link</label>
                                <input
                                    placeholder="Enter button link"
                                    value={form.first_button_link}
                                    onChange={(e) => setForm({ ...form, first_button_link: e.target.value })}
                                    className={`form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20 ${errors.first_button_link ? "border-red-500" : ""}`}
                                />
                                {errors.first_button_link && (
                                    <p className="mt-1 text-xs font-medium text-red-600">{errors.first_button_link[0]}</p>
                                )}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">Second Button Name</label>
                                <input
                                    placeholder="Enter second button name"
                                    value={form.second_button_name}
                                    onChange={(e) => setForm({ ...form, second_button_name: e.target.value })}
                                    className={`form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20 ${errors.second_button_name ? "border-red-500" : ""}`}
                                />
                                {errors.second_button_name && (
                                    <p className="mt-1 text-xs font-medium text-red-600">{errors.second_button_name[0]}</p>
                                )}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">Second Button Link</label>
                                <input
                                    placeholder="Enter button link"
                                    value={form.second_button_link}
                                    onChange={(e) => setForm({ ...form, second_button_link: e.target.value })}
                                    className={`form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20 ${errors.second_button_link ? "border-red-500" : ""}`}
                                />
                                {errors.second_button_link && (
                                    <p className="mt-1 text-xs font-medium text-red-600">{errors.second_button_link[0]}</p>
                                )}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                rows={4}
                                placeholder="Description"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                className={`form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20 mb-4 ${errors.description ? "border-red-500" : ""}`}
                            />
                            {errors.description && (
                                <p className="mt-1 text-xs font-medium text-red-600">{errors.description[0]}</p>
                            )}
                        </div>

                        <div className="mb-5 flex items-center gap-3">
                            <span>Status</span>
                            <button
                                onClick={() => setForm({ ...form, status: form.status === 1 ? 0 : 1 })}
                                className={`relative h-6 w-11 rounded-full transition-colors ${
                                    form.status === 1 ? "bg-green-500" : "bg-gray-300"
                                }`}
                            >
                                <span
                                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                                        form.status === 1 ? "translate-x-5" : "translate-x-0.5"
                                    }`}
                                />
                            </button>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">
                                Cancel
                            </button>
                            <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary cursor-pointer">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {modalType === "delete" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6">
                        <h3 className="text-lg font-semibold">Delete Carousel</h3>
                        <p className="mt-3 text-gray-600">Are you sure you want to delete this carousel track entry?</p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                                Cancel
                            </button>
                            <button onClick={handleDelete} className="rounded bg-primary px-4 py-2 text-white">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}