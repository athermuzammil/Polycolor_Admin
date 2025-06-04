import React from "react";

const Cross = ({ h }) => {
  return (
    <div className=" cursor-pointer ">
      <svg
        width={h || "44"}
        height={h || "44"}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 30L30 14"
          stroke="#474849"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M30 30L14 14"
          stroke="#474849"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default Cross;
