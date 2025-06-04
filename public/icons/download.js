import React from "react";

const Download = ({ h }) => {
  return (
    <svg
      width={h || "60"}
      height={h || "60"}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" fill="white" />
      <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" stroke="#205FFF" />
      <path
        d="M24 29L30 35L36 29"
        stroke="#205FFF"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M30 35V19"
        stroke="#205FFF"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20 40C26.4833 40 33.5167 40 40 40"
        stroke="#205FFF"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Download;
