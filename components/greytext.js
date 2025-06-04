import Msgfile from "@/public/icons/msgfile";
import Link from "next/link";
import React from "react";

const Greytext = ({ text, time, file, ext }) => {
  function getFileExtension(filename) {
    const lastDotIndex = filename.lastIndexOf(".");
    if (lastDotIndex === -1) return ""; // No extension found
    return filename.substring(lastDotIndex + 1);
  }
  //console.log(file, text, "ffffffff");
  return (
    <div className=" flex flex-col w-full  items-end ">
      {file && (
        <Link className=" w-[250px] mt-3.5" target="#" href={file}>
          <div className=" w-full bg-[#FFFFFF] flex items-start gap-2 h-20 rounded-2xl p-2 border border-[#E5EAEF]   ">
            <div className=" h-full bg-[#EBF1F8] border border-[#BBD4F0] rounded-2xl flex items-center justify-center px-3  ">
              <Msgfile />
            </div>
            <div className=" text-[#363B40] min-w-max text-[20px] font-Matter font-medium leading-none  ">
              . {ext || getFileExtension(file)}
            </div>
            <div className="text-[#A3ABB3] font-Matter font-medium text-[0.85rem] text-end w-full pt-2 place-self-end pr-2 ">
              {time}
            </div>
          </div>
        </Link>
      )}
      {text && (
        <div className="flex justify-end w-full pt-3.5">
          <div className=" border border-[#E5EAEF] break-words bg-[#F7F8F9] text-[#0B0B0B] font-Matter font-normal text-[0.9rem] rounded-[14px] py-3 px-4 min-w-[96px] max-w-[256px] relative">
            <div className=" break-words px-2 pr-11 ">{text}</div>
            <div className="text-[#A3ABB3] font-Matter font-medium text-[0.85rem] text-right  absolute bottom-0 right-0 pr-3">
              {time}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Greytext;
