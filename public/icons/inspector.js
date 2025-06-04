"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Inspector = ({ size }) => {
  const pathname = usePathname();
  const strokeColor =
    pathname == "en/dashboard/inspectors" ||
    pathname == "de/dashboard/inspectors"
      ? "#16191D"
      : "#737A82";
  return (
    <div>
      <svg
        width={size || "24"}
        height={size || "24"}
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M34.0133 40.5372C32.3633 41.0247 30.4133 41.2497 28.1258 41.2497H16.8758C14.5883 41.2497 12.6383 41.0247 10.9883 40.5372C11.4008 35.6622 16.407 31.8184 22.5008 31.8184C28.5945 31.8184 33.6008 35.6622 34.0133 40.5372Z"
          stroke={strokeColor}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M28.125 3.75H16.875C7.5 3.75 3.75 7.5 3.75 16.875V28.125C3.75 35.2125 5.8875 39.0937 10.9875 40.5375C11.4 35.6625 16.4062 31.8187 22.5 31.8187C28.5938 31.8187 33.6 35.6625 34.0125 40.5375C39.1125 39.0937 41.25 35.2125 41.25 28.125V16.875C41.25 7.5 37.5 3.75 28.125 3.75ZM22.5 26.5687C18.7875 26.5687 15.7875 23.55 15.7875 19.8375C15.7875 16.125 18.7875 13.125 22.5 13.125C26.2125 13.125 29.2125 16.125 29.2125 19.8375C29.2125 23.55 26.2125 26.5687 22.5 26.5687Z"
          stroke={strokeColor}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M29.2121 19.8375C29.2121 23.55 26.2121 26.5687 22.4996 26.5687C18.7871 26.5687 15.7871 23.55 15.7871 19.8375C15.7871 16.125 18.7871 13.125 22.4996 13.125C26.2121 13.125 29.2121 16.125 29.2121 19.8375Z"
          stroke={strokeColor}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default Inspector;
