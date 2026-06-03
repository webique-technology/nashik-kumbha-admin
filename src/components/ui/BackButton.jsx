import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const BackButton = ({
//   label = "Back",
  to,
  className = "",
  showIcon = true,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white cursor-pointer ${className}`}
    >
      {showIcon && <FaArrowLeft size={14} />}
      {/* {label} */}
    </button>
  );
};

export default BackButton;