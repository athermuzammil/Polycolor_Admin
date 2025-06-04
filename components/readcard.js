import Read from "@/public/icons/read";
import Unread from "@/public/icons/unread";
import React from "react";
import Tool from "./tooltip";
const NotificationCard = ({ color, description, ago, day, marknotify, id }) => {
  return (
    <div className="w-full relative bg-[#FAFAFC] rounded-2xl p-[1rem] border-[#EAEAEE] border-[1px] cursor-pointer">
      <div
        onClick={() => marknotify(id)}
        className=" cursor-pointer absolute right-3 top-3"
      >
        {color ? (
          <Tool svg={<Unread />} msg={"Mark as read"} />
        ) : (
          <Tool svg={<Read />} msg={"Mark as unread"} />
        )}
      </div>
      <div className="flex gap-2 items-center">
        {color && (
          <div
            className={`min-h-2 min-w-2 h-max w-nax rounded-full bg-[#1D55E5]`}
          />
        )}
        <div className="text-[#333333] font-Matter font-semibold text-[1rem]">
          Admin
        </div>
      </div>
      <div className=" mt-[0.5rem] justify-between">
        <div className="text-[#2D3748] font-Matter  text-[0.85rem] w-[90%]">
          {description}
        </div>
        <div className="text-[#767676] pt-2 font-normal text-[0.8rem] ">
          {ago}, {day}
        </div>
      </div>
    </div>
  );
};
export default NotificationCard;
