import { createContext, useContext, useState } from "react";
import Alert from "../components/ui/Alert";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showAlert = (
    message,
    type = "success",
    duration = 3000
  ) => {
    setAlert({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setAlert({
        show: false,
        message: "",
        type: "success",
      });
    }, duration);
  };

  return (
    <AlertContext.Provider
      value={{
        showAlert,
      }}
    >
      {children}

      <Alert
        show={alert.show}
        message={alert.message}
        type={alert.type}
      />
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  return useContext(AlertContext);
};