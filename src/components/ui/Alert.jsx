import React from "react";

const Alert = ({ show, message, type }) => {
  if (!show) return null;

  return (
    <>
      {/* Dynamic Keyframe Injection */}
      <style>
        {`
          @keyframes customSlideIn {
            from {
              transform: translateX(120%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>

      <div
        className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg text-white shadow-lg
        ${
          type === "success"
            ? "bg-green-600"
            : type === "error"
            ? "bg-red-600"
            : "bg-blue-600"
        }`}
        style={{
          /* Changed from 0.4s to 0.8s for a slower, smoother entrance */
          animation: "customSlideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {message}
      </div>
    </>
  );
};

export default Alert;