import React from "react";

const Loader = ({ fullScreen = true, size = "medium" }) => {
  return (
    <div className={`loader-container ${fullScreen ? "fullscreen" : ""}`}>
      <div className={`loader ${size}`}></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
