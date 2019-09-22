import React from "react";

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null;
  }

  const errorStyle = { color: "red" };

  return (
    <div className="notification" style={isError && errorStyle}>
      {message}
    </div>
  );
};

export default Notification;
