import React from "react";

const Spinner = ({ size, border }) => {
  return (
    <div>
      <div
        class={`spinner ${border ? ` border-[2px] ` : " border-[4px]"}  `}
        style={{
          height: size || "50px",
          width: size || "50px",
        }}
      ></div>
    </div>
  );
};

export default Spinner;
