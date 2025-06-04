"use client ";
import Cross from "@/public/icons/cross";
import Order from "@/public/icons/order";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Bplus from "@/public/icons/bplus";

const Convertorder = ({ show, setshow }) => {
  const set = false;
  const [phrase, setPhrase] = useState();
  const [date, setDate] = useState();
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  return (
    <motion.div
      className=" h-full z-[40000] overflow-hidden overflow-y-scroll w-[65%] bg-[#FFFFFF] absolute top-0 right-0 flex flex-col gap-4 shadow-lg p-6  "
      initial={{
        x: "100%",
      }}
      animate={{
        x: 0,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <div className=" w-full flex items-center justify-between ">
        <div className="font-Polysans font-semibold text-[#141415] text-[1.6rem]">
          Create an order
        </div>
        <div
          onClick={() => {
            setshow(false);
          }}
        >
          <Cross />
        </div>
      </div>
      <div className=" flex w-full items-center justify-between bg-[#F7F8F9] border-[1px] border-[#E5EAEF] rounded-3xl p-6 ">
        <div className="flex gap-4 ">
          <div>
            <Order />
          </div>
          <div>
            <div className="text-[0.95rem] font-semibold font-Polysans text-[black] ">
              Quote #298372
            </div>
            <div className="text-[0.85rem] font-normal font-Matter text-[#838486]">
              Will be Converted to Order
            </div>
          </div>
        </div>
        <div className=" bg-white py-4 font-medium px-6 font-Matter text-[#000000] text-[0.9rem] leading-none rounded-3xl border-[1px] border-[#E5EAEF]  ">
          View Quote
        </div>
      </div>
      <div className=" flex flex-col bg-[#F7F8F9] border-[1px] border-[#E5EAEF] rounded-3xl p-6 ">
        <div className=" flex flex-col ">
          <div className="font-Polysans font-semibold text-[#141415] text-[1rem]">
            Default Items in timeline
          </div>
          <div className="font-Matter text-[#838486] text-[0.9rem]">
            These will be added to order by default
          </div>
        </div>
        <div className=" flex items-center justify-start py-6 ">
          <div className=" h-[12px] w-[12px] rounded-full bg-[#E0E0E3] "></div>
          <div className=" w-[20%] h-[2px] bg-[#E0E0E3]   "></div>
          <div className=" h-[12px] w-[12px] rounded-full bg-[#E0E0E3] "></div>
          <div className=" w-[20%] h-[2px] bg-[#E0E0E3]   "></div>
          <div className=" h-[12px] w-[12px] rounded-full bg-[#E0E0E3] "></div>
          <div className=" w-[20%] h-[2px] bg-[#E0E0E3]   "></div>
          <div className=" h-[12px] w-[12px] rounded-full bg-[#E0E0E3] "></div>
          <div className=" w-[20%] h-[2px] bg-[#E0E0E3]   "></div>
          <div className=" h-[12px] w-[12px] rounded-full bg-[#E0E0E3] "></div>
        </div>
        <div className=" flex items-start justify-start w-full ">
          <div className=" flex flex-col  w-[21%] gap-1 ">
            <div className=" font-Matter text-[1rem] font-medium text-[#1D1D1F] leading-none   ">
              Quote Requested
            </div>
            <div className=" font-Matter text-[0.9rem] font-medium text-[#909099] leading-none   ">
              Mar 20,2024
            </div>
          </div>
          <div className=" flex flex-col  w-[21%] gap-1 ">
            <div className=" font-Matter text-[1rem] font-medium text-[#1D1D1F] leading-none   ">
              Quote Created
            </div>
            <div className=" font-Matter text-[0.9rem] font-medium text-[#909099] leading-none   ">
              Mar 20,2024
            </div>
          </div>
          <div className=" flex flex-col  w-[21%] gap-1 ">
            <div className=" font-Matter text-[1rem] font-medium text-[#1D1D1F] leading-none   ">
              Quote Accepted
            </div>
            <div className=" font-Matter text-[0.9rem] font-medium text-[#909099] leading-none   ">
              Mar 20,2024
            </div>
          </div>
          <div className=" flex flex-col  w-[21%] gap-1 ">
            <div className=" font-Matter text-[1rem] font-medium text-[#1D1D1F] leading-none   ">
              Order Created
            </div>
            <div className=" font-Matter text-[0.9rem] font-medium text-[#909099] leading-none   ">
              Mar 20,2024
            </div>
          </div>
          <div className=" flex flex-col   gap-1 ">
            <div className=" font-Matter text-[1rem] font-medium text-[#1D1D1F] leading-none   ">
              Items Recieved
            </div>
            <div className=" font-Matter text-[0.9rem] font-medium text-[#909099] leading-none   ">
              Mar 20,2024
            </div>
          </div>
        </div>
      </div>
      <div className=" flex w-full items-start justify-between bg-[#F7F8F9] border-[1px] border-[#E5EAEF] rounded-3xl p-6 ">
        <div className=" flex flex-col gap-10 ">
          <div className="font-Polysans font-semibold text-[#141415] text-[1.6rem]">
            Order Timeline
          </div>
          <div className=" flex flex-col gap-2 ">
            <div className="font-Polysans text-[#141415] text-[1rem]">
              Name of phase
            </div>
            <input
              className=" outline-none w-[350px] font-normal py-3 pl-4 bg-[#FAFAFA] border-[#E5EAEF] border-[1px] rounded-xl text-black font-Matter text-[0.9rem]
             placeholder:text-[0.9rem] placeholder:font-Matter placeholder:text-[#7e8183]  "
              placeholder="Enter name here"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
            />
          </div>
          <div className=" border-[1px] border-[#205FFF] rounded-lg flex gap-2 py-3 px-3 items-center w-fit   ">
            <Bplus />
            <div className="font-Matter leading-none font-medium text-[#205FFF] text-[0.9rem]">
              Add More
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-10 ">
          <div className=" flex items-center gap-8 ">
            <div className="font-medium font-Polysans text-[#000000] text-[0.9rem]">
              Payment Status
            </div>
            <div className=" bg-white py-4 font-medium px-6 font-Matter text-[#000000] text-[0.9rem] leading-none rounded-3xl border-[1px] border-[#E5EAEF]  ">
              Change Status
            </div>
          </div>
          <div className=" flex flex-col w-full gap-3 ">
            <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
              Set Deadline
            </div>
            <input
              type="date"
              placeholder="DD/MM/YYYY"
              onChange={handleDateChange}
              className="border font-Matter placeholder:uppercase text-[1rem] text-[#AFB2B6] font-medium border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-3 outline-none "
            />
          </div>
        </div>
      </div>
      <div className=" w-full flex justify-end py-14 ">
        <div className=" text-[white] bg-[#205FFF] rounded-full font-Matter font-medium text-[0.9rem] leading-none px-8 py-5    ">
          Create Order
        </div>
      </div>
    </motion.div>
  );
};

export default Convertorder;
