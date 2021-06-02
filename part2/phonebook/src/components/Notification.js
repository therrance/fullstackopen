import React from "react";

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null;
  }

  const errorStyle = isError ? { color: "red" } : {};

  return (
    <div className="notification" style={errorStyle}>
      {message}
    </div>
  );
};

export default Notification;
