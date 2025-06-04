import React from "react";

const Arrowright = ({ color, size }) => {
  return (
    <div>
      <svg
        width={size || "20"}
        height={size || "20"}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.4585 3.4001L12.8918 8.83343C13.5335 9.4751 13.5335 10.5251 12.8918 11.1668L7.4585 16.6001"
          stroke={color || "#6D6D6D"}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default Arrowright;
