import { useState, useEffect } from "react";
import { FiEye, FiEdit2, FiTrash2, FiUploadCloud } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import api from "../../services/axiosInstance";
const API_URL = import.meta.env.VITE_API_URL;

export default function VideoTable() {
    const [carouselData, setCarouselData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 7,
        total: 0,
        from: 1,
        to: 1,
    });

    const [modalType, setModalType] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const [form, setForm] = useState({
        video_link: "",
        video_image: null,
        imagePreview: null,
        title: "",
        description: "",
        status: true,
    });

    useEffect(() => {
        fetchVideos(currentPage);
    }, [currentPage]);

    const fetchVideos = async (page = 1) => {
        setLoading(true);
        try {
            const response = await api.get(`/videos?page=${page}`);
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
            console.log("Video fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setForm((prev) => ({
            ...prev,
            video_image: file,
            imagePreview: URL.createObjectURL(file),
        }));
    };

    const openAddModal = () => {
        setForm({
            video_link: "",
            video_image: null,
            imagePreview: null,
            title: "",
            description: "",
            status: true,
        });
        setModalType("add");
    };

    const openViewModal = (item) => {
        setSelectedItem(item);
        setModalType("view");
    };

    const openEditModal = (item) => {
        setSelectedItem(item);
        setForm({
            video_link: item.video_link || "",
            video_image: null,
            imagePreview: item.image_url,
            title: item.title || "",
            description: item.description || "",
            status: item.status == 1 || item.status === true,
        });
        setModalType("edit");
    };

    const openDeleteModal = (item) => {
        setSelectedItem(item);
        setModalType("delete");
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedItem(null);
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("video_link", form.video_link);
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("status", form.status ? 1 : 0);
        
        if (form.video_image) {
            formData.append("video_image", form.video_image);
        }

        try {
            if (modalType === "add") {
                await api.post("/videos/store", formData);
            }

            if (modalType === "edit") {
                await api.post(`/videos/update/${selectedItem.id}`, formData);
            }

            closeModal();
            fetchVideos(modalType === "add" ? 1 : currentPage);
        } catch (error) {
            console.log("Error saving video:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/videos/delete/${selectedItem.id}`);
            closeModal();
            fetchVideos(currentPage);
        } catch (error) {
            console.log("Delete error:", error);
        }
    };

    // Helper function to format any video link dynamically
    const renderVideoPlayer = (url) => {
        if (!url) return <div className="text-gray-500 text-center py-10">No video link provided</div>;

        // 1. YouTube Handler (Converts watch links and shorts links to structural embed links)
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            let videoId = "";
            if (url.includes("youtu.be/")) {
                videoId = url.split("youtu.be/")[1].split(/[?#]/)[0];
            } else if (url.includes("embed/")) {
                videoId = url.split("embed/")[1].split(/[?#]/)[0];
            } else if (url.includes("shorts/")) {
                videoId = url.split("shorts/")[1].split(/[?#]/)[0];
            } else {
                videoId = url.split("v=")[1]?.split("&")[0];
            }
            return (
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    className="w-full h-72 rounded-lg bg-black border-0"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            );
        }

        // 2. Vimeo Handler
        if (url.includes("vimeo.com")) {
            const videoId = url.split("vimeo.com/")[1]?.split(/[?#]/)[0];
            return (
                <iframe
                    src={`https://player.vimeo.com/video/${videoId}`}
                    className="w-full h-72 rounded-lg bg-black border-0"
                    title="Vimeo video player"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                />
            );
        }

        // 3. Direct Video File Handler (.mp4, .webm, .ogg, or local storage API paths)
        const isDirectVideoFile = /\.(mp4|webm|ogg)($|\?)/i.test(url) || url.includes("/storage/");
        if (isDirectVideoFile) {
            return (
                <video 
                    src={url} 
                    controls 
                    className="w-full h-72 rounded-lg bg-black object-contain"
                >
                    Your browser does not support the video tag.
                </video>
            );
        }

        // 4. Fallback Embedder for any other platform links
        return (
            <iframe
                src={url}
                className="w-full h-72 rounded-lg bg-black border-0"
                title="Video player"
                allowFullScreen
            />
        );
    };

    return (
        <div className="rounded-xl bg-white">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="title text-on-surface">
                    Video Management
                </h2>
                <button
                    onClick={openAddModal}
                    className="rounded-lg btn-primary-packages text-white"
                >
                    Add New video
                </button>
            </div>

            {/* Table */}
            <div className="table-wrapper bg-surface-container-lowest">
                <table className="table">
                    <thead>
                        <tr className="thead-row">
                            <th className="th">Thumbnail Image</th>
                            <th className="th">Title</th>
                            <th className="th">Description</th>
                            <th className="th">Status</th>
                            <th className="th">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {carouselData.map((item) => (
                            <tr key={item.id} className="tr group">
                                <td className="p-3">
                                    <div className="h-16 w-24 overflow-hidden rounded-lg bg-black">
                                        <img
                                            src={item.image_url}
                                            className="h-full w-full object-cover"
                                            alt=""
                                        />
                                    </div>
                                </td>

                                <td className="p-3 font-medium">
                                    {item.title}
                                </td>

                                <td className="p-3 max-w-sm">
                                    {item.description}
                                </td>

                                <td className="p-3">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                                            item.status == 1
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {item.status == 1 ? "Active" : "Inactive"}
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
                    </tbody>
                </table>
                
                {/* Pagination */}
                <div className="pagination">
                    <div className="text-sm text-gray-600">
                        Showing {pagination.from || 0} - {pagination.to || 0} of {pagination.total || 0}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                            className="px-3 py-1 rounded disabled:opacity-50"
                        >
                            <FaChevronLeft/>
                        </button>

                        {Array.from(
                            { length: pagination.last_page || 1 },
                            (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`h-9 w-9 rounded ${
                                        currentPage === i + 1
                                            ? "px-3 py-1 border rounded bg-primary text-white"
                                            : "px-3 py-1 border rounded bg-secondary border-gray-300 hover:bg-gray-100"
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            )
                        )}

                        <button
                            disabled={currentPage === pagination.last_page}
                            onClick={() => setCurrentPage((p) => p + 1)}
                            className="px-3 py-1 rounded disabled:opacity-50"
                        >
                            <FaChevronRight/>
                        </button>
                    </div>
                </div>
            </div>

            {/* View Modal */}
            {modalType === "view" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-xl rounded-xl bg-white p-6">
                        
                        {/* DYNAMIC PLAYER SELECTION */}
                        <div className="mb-4">
                            {renderVideoPlayer(selectedItem.video_link)}
                        </div>

                        <h3 className="text-xl font-semibold">
                            {selectedItem.title}
                        </h3>

                        <p className="mt-3 text-gray-600">
                            {selectedItem.description}
                        </p>

                        <button
                            onClick={closeModal}
                            className="mt-6 rounded bg-primary px-4 py-2 text-white"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Add/Edit Modal */}
            {(modalType === "add" || modalType === "edit") && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-xl rounded-xl bg-white p-6">
                        <h3 className="mb-5 text-xl font-semibold">
                            {modalType === "add" ? "Add Video" : "Edit Video"}
                        </h3>

                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium"> Video Link </label>
                            <input
                                placeholder="Video Link"
                                value={form.video_link}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        video_link: e.target.value,
                                    })
                                }
                                className="mb-4 w-full rounded-lg border p-3"
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700">Thumbnail Image</label>
                            <div className="group relative mx-auto h-52 overflow-hidden rounded-xl border-2 border-dashed bg-gray-50 ">
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
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium">Title </label>
                            <input
                                placeholder="Title"
                                value={form.title}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        title: e.target.value,
                                    })
                                }
                                className="mb-4 w-full rounded-lg border p-3"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium"> Description </label>
                            <textarea
                                rows={4}
                                placeholder="Description"
                                value={form.description}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        description: e.target.value,
                                    })
                                }
                                className="mb-4 w-full rounded-lg border p-3"
                            />
                        </div>

                        <div className="mb-5 flex items-center gap-3">
                            <span>Status</span>

                            <button
                                onClick={() =>
                                    setForm({
                                        ...form,
                                        status: !form.status,
                                    })
                                }
                                className={`relative h-6 w-11 left-0 rounded-full ${
                                    form.status
                                        ? "bg-green-500"
                                        : "bg-gray-300"
                                }`}
                            >
                                <span
                                    className={`absolute top-0.5 h-5 w-5 left-0 rounded-full bg-white transition ${
                                        form.status
                                            ? "translate-x-5"
                                            : "translate-x-0.5"
                                    }`}
                                />
                            </button>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                className="rounded bg-primary px-4 py-2 text-white"
                            >
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
                        <h3 className="text-lg font-semibold">
                            Delete Video
                        </h3>

                        <p className="mt-3">
                            Are you sure you want to delete this video?
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDelete}
                                className="rounded bg-primary px-4 py-2 text-white"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}