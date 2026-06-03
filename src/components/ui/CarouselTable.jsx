import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import {
    FiEye,
    FiEdit2,
    FiTrash2,
    FiUploadCloud,
} from "react-icons/fi";

export default function CarouselTable() {
    const [carouselData, setCarouselData] = useState([
  {
    id: 1,
    image: "https://picsum.photos/300/200?1",
    subtitle: "Discover New Trends",
    title: "Summer Collection",
    description: "Explore our latest summer collection.",
    ctaNameOne: "button text 1",
    ctaNameLinkOne: "button link 1",
    ctaNameTwo: "button text 1",
    ctaNameLinkTwo: "button link 1",
    active: true,
  },
  {
    id: 2,
    image: "https://picsum.photos/300/200?2",
    subtitle: "Limited Time Offer",
    title: "Winter Sale",
    description: "Exclusive winter discounts available.",
    ctaNameOne: "button text 2",
    ctaNameLinkOne: "button link 2",
    ctaNameTwo: "button text 2",
    ctaNameLinkTwo: "button link 2",
    active: false,
  },
  {
    id: 3,
    image: "https://picsum.photos/300/200?3",
    subtitle: "Style Redefined",
    title: "Fashion Week",
    description: "New fashion arrivals.",
    ctaNameOne: "button text 3",
    ctaNameLinkOne: "button link 3",
    ctaNameTwo: "button text 3",
    ctaNameLinkTwo: "button link 3",
    active: true,
  },
  {
    id: 4,
    image: "https://picsum.photos/300/200?4",
    subtitle: "Fresh Arrival",
    title: "New Launch",
    description: "Introducing our newest products.",
    ctaNameOne: "button text 4",
    ctaNameLinkOne: "button link 4",
    ctaNameTwo: "button text 4",
    ctaNameLinkTwo: "button link 4",
    active: true,
  },
  {
    id: 5,
    image: "https://picsum.photos/300/200?5",
    subtitle: "Popular Right Now",
    title: "Trending",
    description: "Trending products collection.",
    ctaNameOne: "button text 10",
    ctaNameLinkOne: "button link 10",
    ctaNameTwo: "button text 10",
    ctaNameLinkTwo: "button link 10",
    active: true,
  },
  {
    id: 6,
    image: "https://picsum.photos/300/200?6",
    subtitle: "Celebrate With Savings",
    title: "Festival Offer",
    description: "Special festive discounts.",
    ctaNameOne: "button text 5",
    ctaNameLinkOne: "button link 5",
    ctaNameTwo: "button text 5",
    ctaNameLinkTwo: "button link 5",
    active: false,
  },
  {
    id: 7,
    image: "https://picsum.photos/300/200?7",
    subtitle: "Don't Miss Out",
    title: "Mega Sale",
    description: "Biggest sale of the season.",
    ctaNameOne: "button text 9",
    ctaNameLinkOne: "button link 9",
    ctaNameTwo: "button text 9",
    ctaNameLinkTwo: "button link 9",
    active: true,
  },
  {
    id: 8,
    image: "https://picsum.photos/300/200?8",
    subtitle: "Luxury Collection",
    title: "Premium Range",
    description: "Premium products showcase.",
    ctaNameOne: "button text 6",
    ctaNameLinkOne: "button link 6",
    ctaNameTwo: "button text 6",
    ctaNameLinkTwo: "button link 6",
    active: true,
  },
  {
    id: 9,
    image: "https://picsum.photos/300/200?9",
    subtitle: "Exclusive Release",
    title: "Special Edition",
    description: "Limited edition collection.",
    ctaNameOne: "button text 7",
    ctaNameLinkOne: "button link 7",
    ctaNameTwo: "button text 7",
    ctaNameLinkTwo: "button link 7",
    active: false,
  },
  {
    id: 10,
    image: "https://picsum.photos/300/200?10",
    subtitle: "Customer Favorites",
    title: "Best Sellers",
    description: "Our most popular products.",
    ctaNameOne: "button text 8",
    ctaNameLinkOne: "button link 8",
    ctaNameTwo: "button text 8",
    ctaNameLinkTwo: "button link 8",
    active: true,
  },
]);

    const [modalType, setModalType] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const [form, setForm] = useState({
        image: "",
        subtitle: "",
        title: "",
        description: "",
        ctaNameOne: "",
        ctaNameLinkOne: "",
        ctaNameTwo: "",
        ctaNameLinkTwo: "",
        active: true,
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            setForm((prev) => ({
                ...prev,
                image: reader.result,
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
            image: "",
            subtitle: "",
            title: "",
            description: "",
            ctaNameOne: "",
            ctaNameLinkOne: "",
            ctaNameTwo: "",
            ctaNameLinkTwo: "",
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
            image: item.image,
            subtitle: item.subtitle,
            title: item.title,
            description: item.description,
            ctaNameOne: item.ctaNameOne,
            ctaNameLinkOne: item.ctaNameLinkOne,
            ctaNameTwo: item.ctaNameTwo,
            ctaNameLinkTwo: item.ctaNameLinkTwo,
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
                    Carousel Management
                </h2>

                <button
                    onClick={openAddModal}
                    className="rounded-lg btn-primary-packages text-white"
                >
                    Add New Carousel
                </button>
            </div>

            {/* Table */}

            <div className="table-wrapper bg-surface-container-lowest">
                <table className="table">
                    <thead>
                        <tr className="thead-row">
                            <th className="th">
                                Carousel Image
                            </th>

                            <th className="th">
                                Title &amp; Sub Title
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
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="h-16 w-24 rounded-lg object-cover"
                                    />
                                </td>

                                <td className="p-3">
                                    
                                    <p className="font-medium">
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {item.subtitle}
                                    </p>
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
                       <FaChevronLeft />
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
                        <FaChevronRight />
                    </button>
                </div>
            </div>
            </div>

            {/* Pagination */}

            

            {/* View Modal */}

            {modalType === "view" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-xl rounded-xl bg-white p-6">
                        <img
                            src={selectedItem.image}
                            alt=""
                            className="mb-6 h-64 w-full rounded-lg object-cover"
                        />

                        <div className="space-y-4">
                            <div>
                                <p className="mb-1 text-sm font-medium text-gray-500">
                                    Subtitle :
                                </p>
                                <p className="text-base text-gray-900">
                                    {selectedItem.subtitle}
                                </p>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium text-gray-500">
                                    Title :
                                </p>
                                <p className="text-base font-semibold text-gray-900">
                                    {selectedItem.title}
                                </p>
                            </div>

                            <div>
                                <p className="mb-1 text-sm font-medium text-gray-900">
                                    Description
                                </p>
                                <p className="text-base text-gray-700">
                                    {selectedItem.description}
                                </p>
                            </div>

                            <div>
                                <p className="mb-1 text-sm font-medium text-gray-500">
                                    First Button Name :
                                </p>
                                <p className="text-base text-gray-900">
                                    {selectedItem.ctaNameOne}
                                </p>
                            </div>

                            <div>
                                <p className="mb-1 text-sm font-medium text-gray-500">
                                    First Button Link :
                                </p>
                                <p className="break-all text-base text-blue-600">
                                    {selectedItem.ctaNameLinkOne}
                                </p>
                            </div>

                            <div>
                                <p className="mb-1 text-sm font-medium text-gray-500">
                                    Second Button Name :
                                </p>
                                <p className="text-base text-gray-900">
                                    {selectedItem.ctaNameTwo}
                                </p>
                            </div>

                            <div>
                                <p className="mb-1 text-sm font-medium text-gray-500">
                                    Second Button Link :
                                </p>
                                <p className="break-all text-base text-blue-600">
                                    {selectedItem.ctaNameLinkTwo}
                                </p>
                            </div>

                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="rounded mt-6 bg-primary px-4 py-2 text-white cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Modal */}

            {(modalType === "add" ||
                modalType === "edit") && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="w-full max-w-3xl rounded-xl bg-white p-6">
                            <h3 className="mb-5 text-xl font-semibold">
                                {modalType === "add"
                                    ? "Add Carousel"
                                    : "Edit Carousel"}
                            </h3>

                            <div className="mb-5">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Carousel Image
                                </label>

                                <div className="group relative mx-auto h-52 overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">

                                    <img
                                        src={
                                            form.image ||
                                            "https://placehold.co/600x400?text=Upload+Image"
                                        }
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />

                                    <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/50">

                                        <div className="translate-y-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                            <div className="flex flex-col items-center text-white">
                                                <FiUploadCloud size={36} />

                                                <span className="mt-2 text-sm font-medium">
                                                    Upload Image
                                                </span>
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
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Subtitle
                                </label>

                                <input
                                    placeholder="Enter subtitle"
                                    value={form.subtitle}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            subtitle: e.target.value,
                                        })
                                    }
                                    className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    placeholder="Title"
                                    value={form.title}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            title: e.target.value,
                                        })
                                    }
                                    className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        First Button Name
                                    </label>
                                    <input
                                        placeholder="Enter first button name"
                                        value={form.ctaNameOne}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                ctaNameOne: e.target.value,
                                            })
                                        }
                                        className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        First Button Link
                                    </label>
                                    <input
                                        placeholder="Enter button link"
                                        value={form.ctaNameLinkOne}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                ctaNameLinkOne: e.target.value,
                                            })
                                        }
                                        className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Second Button Name
                                    </label>
                                    <input
                                        placeholder="Enter second button name"
                                        value={form.ctaNameTwo}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                ctaNameTwo: e.target.value,
                                            })
                                        }
                                        className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Second Button Link
                                    </label>
                                    <input
                                        placeholder="Enter button link"
                                        value={form.ctaNameLinkTwo}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                ctaNameLinkTwo: e.target.value,
                                            })
                                        }
                                        className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Description
                                </label>
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
                                    className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20 mb-4"
                                />
                            </div>
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
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary cursor-pointer"
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