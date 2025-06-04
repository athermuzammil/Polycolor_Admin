import React from "react";

const Customer = ({ h, w }) => {
  return (
    <div>
      <svg
        width={w || "40"}
        height={h || "40"}
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.5 22.5C27.6777 22.5 31.875 18.3027 31.875 13.125C31.875 7.94733 27.6777 3.75 22.5 3.75C17.3223 3.75 13.125 7.94733 13.125 13.125C13.125 18.3027 17.3223 22.5 22.5 22.5Z"
          stroke="#292D32"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M38.606 41.25C38.606 33.9938 31.3873 28.125 22.4998 28.125C13.6123 28.125 6.39355 33.9938 6.39355 41.25"
          stroke="#292D32"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default Customer;
