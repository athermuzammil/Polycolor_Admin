import React from "react";
import { Skeleton } from "./ui/skeleton";

const Quotesidskeleton = () => {
  return (
    <div className="w-[43vw] lg:w-[335px]  xl:w-[290px] 1xl:w-[350px]">
      <div
        className=" h-[400px] w-full flex flex-col justify-between rounded-[40px] p-3 bg-[#f4f4f4] "
        shadow="none"
      >
        <Skeleton className=" h-[25px] rounded-[32px] w-3/4 mt-5  " />
        <Skeleton className=" bg-gray-200 pt-4 pb-8 w-full rounded-[32px]  h-[350px]    "></Skeleton>
      </div>
    </div>
  );
};

export default Quotesidskeleton;
