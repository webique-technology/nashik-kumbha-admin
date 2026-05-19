import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";

const ViewModal = ({ isOpen, onClose, data, fields, title }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg model-width">


       <div className="w-full flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold ">{title}</h3>
          <RiCloseCircleLine onClick={onClose} className="cursor-pointer text-xl"/>
        </div>


        {/* {(data.image || data.images?.[0]) && (
          <img
            src={data.image || data.images[0]}
            className="w-full h-40 object-cover rounded mb-3 border border-gray-200 p-1 bg-white"
            alt="preview"
          />
        )} */}
    <div className="content-height">

        {(data.image_url || data.image || data.images?.[0]) && (
          <img
            src={data.image_url || data.image || data.images?.[0]}
            className="w-full h-40 object-cover rounded mb-3 border border-gray-200 p-1 bg-white"
            alt="preview"
          />
        )}
    
        {/* <div className="space-y-2">
          {fields.map((field) => (
            <p key={field.key}>
              <strong>{field.label}:</strong>{" "}
              {field.render
                ? field.render(data[field.key], data)
                : data[field.key]}
            </p>
          ))}
        </div> */}

        <div className="space-y-2">
          {fields.map((field) => (
            <div key={field.key}>
              <strong>{field.label}:</strong>

              {field.render ? (
                field.render(data[field.key], data)
              ) : (
                <p>{data[field.key]}</p>
              )}
            </div>
          ))}
        </div>
        </div>
        

      </div>
    </div>
  );
};

export default ViewModal;