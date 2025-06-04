"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Arrowleft = () => {
  const router = useRouter();
  return (
    <div>
      <svg
        onClick={() => router.back()}
        className=" cursor-pointer "
        width="24"
        height="24"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.1528 9.38916L5.54199 19L15.1528 28.6108"
          stroke="#292D32"
          stroke-width="2.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M32.458 19H5.81055"
          stroke="#292D32"
          stroke-width="2.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default Arrowleft;
