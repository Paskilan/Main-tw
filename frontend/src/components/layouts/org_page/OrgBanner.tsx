import React from "react";
import defaultImage from "@/sample_data/sample_header/sample_header.jpeg"; // Import the default image correctly

const OrgBanner = ({ imageUrl }) => {
  return (
    <div
      className="h-48 bg-cover bg-center"
      style={{
        backgroundImage: `url(${imageUrl || defaultImage})`, // Use defaultImage if no imageUrl is provided
      }}
    ></div>
  );
};

export default OrgBanner;
