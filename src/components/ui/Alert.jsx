const Alert = ({ show, message, type }) => {
  if (!show) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg text-white shadow-lg
      ${
        type === "success"
          ? "bg-green-600"
          : type === "error"
          ? "bg-red-600"
          : "bg-blue-600"
      }`}
    >
      {message}
    </div>
  );
};

export default Alert;