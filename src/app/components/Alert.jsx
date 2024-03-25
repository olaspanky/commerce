import React, { useState, useEffect } from "react";

const CustomAlert = ({ message, show  }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } bg-red-500 text-white px-4 py-2 rounded`}
      role="alert"
    >
      <span>{message}</span>
    </div>
  );
};

export default CustomAlert;
