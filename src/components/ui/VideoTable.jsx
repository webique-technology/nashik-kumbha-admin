import { useState } from "react";
import {
    FiEye,
    FiEdit2,
    FiTrash2,
    FiUploadCloud,
} from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import meera1 from '../../assets/videos/meera-1.mp4'
import meera2 from '../../assets/videos/meera-2.mp4'
import meera3 from '../../assets/videos/meera-3.mp4'
import meera4 from '../../assets/videos/meera-4.mp4'

import meera5 from '../../assets/videos/meera-5.mp4'
import meera6 from '../../assets/videos/meera-6.mp4'
import meera7 from '../../assets/videos/meera-7.mp4'
import meera8 from '../../assets/videos/meera-8.mp4'

import meera9 from '../../assets/videos/meera-9.mp4'
import meera10 from '../../assets/videos/meera-10.mp4'


import video1 from '../../assets/videos/reel-1.mp4'
import video2 from '../../assets/videos/reel-2.mp4'
import video3 from '../../assets/videos/reel-3.mp4'

export default function VideoTable() {
    const [carouselData, setCarouselData] = useState([
        {
            id: 1,
            video: meera1,
            title: "Kumbh Mela Highlights",
            description: "Sacred bathing rituals and spiritual gathering.",
            active: true,
        },
        {
            id: 2,
            video: meera2,
            title: "Morning Ganga Aarti",
            description: "Devotional aarti on the banks of the Ganga.",
            active: true,
        },
        {
            id: 3,
            video: meera3,
            title: "Spiritual Journey",
            description: "Experience the divine atmosphere of Kumbh.",
            active: true,
        },
        {
            id: 4,
            video: meera4,
            title: "Sadhus of Kumbh",
            description: "Life and traditions of holy saints.",
            active: true,
        },
        {
            id: 5,
            video: meera5,
            title: "Meditation and Peace",
            description: "Spiritual practices from India.",
            active: true,
        },
        {
            id: 6,
            video: meera6,
            title: "Temple Devotion",
            description: "Sacred chants and prayers.",
            active: false,
        },
        {
            id: 7,
            video: meera7,
            title: "Holy Dip Ceremony",
            description: "Pilgrims taking the sacred bath.",
            active: true,
        },
        {
            id: 8,
            video: meera8,
            title: "Spiritual India",
            description: "Journey through sacred places.",
            active: true,
        },
        {
            id: 9,
            video: meera9,
            title: "Bhajan Sandhya",
            description: "Evening devotional songs.",
            active: false,
        },
        {
            id: 10,
            video: meera10,
            title: "Divine Kumbh Experience",
            description: "The grandeur of the world's largest gathering.",
            active: true,
        },
    ]);
    const [modalType, setModalType] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const [form, setForm] = useState({
        video: "",
        title: "",
        description: "",
        active: true,
    });

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            setForm((prev) => ({
                ...prev,
                video: reader.result,
            }));
        };

        reader.readAsDataURL(file);
    };

    const ITEMS_PER_PAGE = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(
        carouselData.length / ITEMS_PER_PAGE
    );

    const paginatedData = carouselData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const openAddModal = () => {

        setForm({
            video: "",
            title: "",
            description: "",
            active: true,
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
            video: item.video,
            title: item.title,
            description: item.description,
            active: item.active,
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

    const handleSave = () => {
        if (modalType === "add") {
            setCarouselData((prev) => [
                {
                    id: Date.now(),
                    ...form,
                },
                ...prev,
            ]);
        }

        if (modalType === "edit") {
            setCarouselData((prev) =>
                prev.map((item) =>
                    item.id === selectedItem.id
                        ? { ...item, ...form }
                        : item
                )
            );
        }

        closeModal();

        // Optional: go back to first page so newly added item is visible
        setCurrentPage(1);
    };

    const handleDelete = () => {
        setCarouselData((prev) =>
            prev.filter(
                (item) => item.id !== selectedItem.id
            )
        );

        if (currentPage > 1 && paginatedData.length === 1) {
            setCurrentPage((prev) => prev - 1);
        }

        closeModal();
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
                            <th className="th">
                                Video
                            </th>

                            <th className="th">
                                Title
                            </th>

                            <th className="th">
                                Description
                            </th>

                            <th className="th">
                                Status
                            </th>

                            <th className="th">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedData.map((item) => (
                            <tr
                                key={item.id}
                                className="tr group"
                            >
                                <td className="p-3">
                                    <div className="h-16 w-24 overflow-hidden rounded-lg bg-black">
                                        <video
                                            src={item.video}
                                            className="h-full w-full object-cover"
                                            muted
                                            preload="metadata"
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
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${item.active
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {item.active
                                            ? "Active"
                                            : "Inactive"}
                                    </span>
                                </td>

                                <td className="p-3">
                                    <div className="flex gap-4 text-lg">
                                        <button
                                            title="View"
                                            onClick={() =>
                                                openViewModal(item)
                                            }
                                        >
                                            <FiEye />
                                        </button>

                                        <button
                                            title="Edit"
                                            onClick={() =>
                                                openEditModal(item)
                                            }
                                        >
                                            <FiEdit2 />
                                        </button>

                                        <button
                                            title="Delete"
                                            onClick={() =>
                                                openDeleteModal(item)
                                            }
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 <div className="pagination">
                <div className="text-sm text-gray-600">
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                    {" - "}
                    {Math.min(
                        currentPage * ITEMS_PER_PAGE,
                        carouselData.length
                    )}{" "}
                    of {carouselData.length}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage((p) => p - 1)
                        }
                        className="px-3 py-1  rounded disabled:opacity-50"
                    >
                        <FaChevronLeft/>
                    </button>

                    {Array.from(
                        { length: totalPages },
                        (_, i) => (
                            <button
                                key={i}
                                onClick={() =>
                                    setCurrentPage(i + 1)
                                }
                                className={`h-9 w-9 rounded ${currentPage === i + 1
                                    ? "px-3 py-1 border rounded bg-primary text-white"
                                    : "px-3 py-1 border rounded bg-secondary border-gray-300 hover:bg-gray-100"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        )
                    )}

                    <button
                        disabled={
                            currentPage === totalPages
                        }
                        onClick={() =>
                            setCurrentPage((p) => p + 1)
                        }
                        className="px-3 py-1  rounded disabled:opacity-50"
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
                        <video
                            controls
                            autoPlay
                            className="mb-4 h-72 w-full rounded-lg bg-black object-contain"
                        >
                            <source src={selectedItem.video} />
                        </video>
                        <h3 className="text-xl font-semibold">
                            {selectedItem.title}
                        </h3>

                        <p className="mt-3">
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

            {(modalType === "add" ||
                modalType === "edit") && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="w-full max-w-xl rounded-xl bg-white p-6">
                            <h3 className="mb-5 text-xl font-semibold">
                                {modalType === "add"
                                    ? "Add Carousel"
                                    : "Edit Carousel"}
                            </h3>

                            <div className="mb-5">
                                <label className="mb-2 block text-sm font-medium">
                                    Video
                                </label>

                                <div className="group relative h-56 overflow-hidden rounded-xl border-2 border-dashed border-gray-300">

                                    {form.video ? (
                                        <video
                                            src={form.video}
                                            controls
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-gray-50 text-gray-400">
                                            No Video Selected
                                        </div>
                                    )}

                                    <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">

                                        <div className="opacity-0 transition-all duration-300 group-hover:opacity-100">
                                            <div className="flex flex-col items-center text-white">
                                                <FiUploadCloud size={36} />
                                                <span className="mt-2">
                                                    Upload Video
                                                </span>
                                            </div>
                                        </div>

                                        <input
                                            type="file"
                                            accept="video/*"
                                            className="hidden"
                                            onChange={handleVideoUpload}
                                        />
                                    </label>
                                </div>
                            </div>

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

                            <textarea
                                rows={4}
                                placeholder="Description"
                                value={form.description}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        description:
                                            e.target.value,
                                    })
                                }
                                className="mb-4 w-full rounded-lg border p-3"
                            />

                            <div className="mb-5 flex items-center gap-3">
                                <span>Status</span>

                                <button
                                    onClick={() =>
                                        setForm({
                                            ...form,
                                            active: !form.active,
                                        })
                                    }
                                    className={`relative h-6 w-11 left-0 rounded-full ${form.active
                                        ? "bg-green-500"
                                        : "bg-gray-300"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-0.5 h-5 w-5 left-0 rounded-full bg-white transition ${form.active
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
                            Delete Carousel
                        </h3>

                        <p className="mt-3">
                            Are you sure you want to delete
                            this carousel?
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