import React from "react";

const Profile = ({ size }) => {
  return (
    <div>
      <svg
        width={size || "40"}
        height={size || "40"}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.0003 20C24.6027 20 28.3337 16.269 28.3337 11.6667C28.3337 7.0643 24.6027 3.33334 20.0003 3.33334C15.398 3.33334 11.667 7.0643 11.667 11.6667C11.667 16.269 15.398 20 20.0003 20Z"
          stroke="#292D32"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M34.3169 36.6667C34.3169 30.2167 27.9003 25 20.0003 25C12.1003 25 5.68359 30.2167 5.68359 36.6667"
          stroke="#292D32"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default Profile;
