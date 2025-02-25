import React from "react";

const Noti = ({ message }) => {
  if (!message) return null;

  return (
    <div style={{ color: "red", background: "#ffd2d2", padding: "10px", borderRadius: "5px" }}>
      {message}
    </div>
  );
};

export default Noti;