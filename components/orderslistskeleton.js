import React from "react";
import { Skeleton } from "./ui/skeleton";

const Orderslistskeleton = ({ height }) => {
  return (
    <Skeleton
      className={` w-full ${height || "h-[80px]"} rounded-[25px] bg-gray-200`}
    ></Skeleton>
  );
};

export default Orderslistskeleton;
