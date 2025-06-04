import React from "react";
import { Skeleton } from "./ui/skeleton";

const Orderdetailsskeleton = () => {
  return (
    <div className="   ">
      <Skeleton className="h-[2px] w-full bg-gray-200 "></Skeleton>
      <div className="flex pt-5 gap-32 justify-between ">
        <div>
          <Skeleton className="w-[100px] h-[20px] mb-1.5"></Skeleton>
          <Skeleton className="w-[80px] h-[18px] "></Skeleton>
        </div>
        <div>
          <Skeleton className="w-[100px] h-[20px] mb-1.5"></Skeleton>
          <Skeleton className="w-[80px] h-[18px] "></Skeleton>
        </div>
        <div>
          <Skeleton className="w-[100px] h-[20px] mb-1.5"></Skeleton>
          <Skeleton className="w-[80px] h-[18px] "></Skeleton>
        </div>
        <div>
          <Skeleton className="w-[100px] h-[20px] mb-1.5"></Skeleton>
          <Skeleton className="w-[80px] h-[18px] "></Skeleton>
        </div>
      </div>
    </div>
  );
};

export default Orderdetailsskeleton;
