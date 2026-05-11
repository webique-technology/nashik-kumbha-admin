import React from "react";

const ViewModal = ({ isOpen, onClose, data, fields, title }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">

        <h3 className="text-lg font-semibold mb-4">{title}</h3>

        {(data.image || data.images?.[0]) && (
          <img
            src={data.image || data.images[0]}
            className="w-full h-40 object-cover rounded mb-3 border border-gray-200 p-1 bg-white"
            alt="preview"
          />
        )}
        <div className="space-y-2">
          {fields.map((field) => (
            <p key={field.key}>
              <strong>{field.label}:</strong>{" "}
              {field.render
                ? field.render(data[field.key], data)
                : data[field.key]}
            </p>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-amber-800 transition-all duration-300 hover:text-white cursor-pointer">
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default ViewModal;