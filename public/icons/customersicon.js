"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Customersicon = ({ size }) => {
  const pathname = usePathname();
  const strokeColor =
    pathname == "/en/dashboard/customers" ||
    pathname == "/de/dashboard/customers" ||
    pathname.includes("userprofile")
      ? "#16191D"
      : "#737A82";
  return (
    <svg
      width={size || "20"}
      height={size || "20"}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.63314 9.05834C7.5498 9.05 7.4498 9.05 7.35814 9.05834C5.3748 8.99167 3.7998 7.36667 3.7998 5.36667C3.7998 3.32501 5.4498 1.66667 7.4998 1.66667C9.54147 1.66667 11.1998 3.32501 11.1998 5.36667C11.1915 7.36667 9.61647 8.99167 7.63314 9.05834Z"
        stroke={strokeColor}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.6752 3.33333C15.2919 3.33333 16.5919 4.64166 16.5919 6.25C16.5919 7.825 15.3419 9.10833 13.7836 9.16666C13.7169 9.15833 13.6419 9.15833 13.5669 9.16666"
        stroke={strokeColor}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.4666 12.1333C1.44993 13.4833 1.44993 15.6833 3.4666 17.025C5.75827 18.5583 9.5166 18.5583 11.8083 17.025C13.8249 15.675 13.8249 13.475 11.8083 12.1333C9.52494 10.6083 5.7666 10.6083 3.4666 12.1333Z"
        stroke={strokeColor}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.2832 16.6667C15.8832 16.5417 16.4499 16.3 16.9165 15.9417C18.2165 14.9667 18.2165 13.3583 16.9165 12.3833C16.4582 12.0333 15.8999 11.8 15.3082 11.6667"
        stroke={strokeColor}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Customersicon;
