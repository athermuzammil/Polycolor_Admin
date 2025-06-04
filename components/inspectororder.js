import Order from "@/public/icons/order";
import React from "react";

const Inspectororder = ({ name, number, status, completion, cost, id }) => {
  return (
    <div className=" bg-white p-4 w-full flex items-center justify-between border rounded-3xl border-[#E5EAEF] ">
      <div className=" flex items-center gap-4   ">
        <Order />
        <div className=" h-full flex flex-col items-start justify-between ">
          <div className=" font-Polysans font-semibold text-[1rem] text-black  ">
            {name}
          </div>
          <div className=" font-Matter text-[0.9rem] text-[#838486] ">
            Order #{number}
          </div>
        </div>
      </div>
      <div className=" flex flex-col items-start justify-between  ">
        <div className=" font-Polysans font-semibold text-[1rem] text-black  ">
          Order Status
        </div>
        <div className=" font-Matter text-[0.9rem] text-[#838486] ">
          {status}
        </div>
      </div>
      <div className=" flex flex-col items-start justify-between  ">
        <div className=" font-Polysans font-semibold text-[1rem] text-black  ">
          Expected Completion
        </div>
        <div className=" font-Matter text-[0.9rem] text-[#838486] ">
          {completion}
        </div>
      </div>
      <div className=" flex flex-col items-start justify-between  ">
        <div className=" font-Polysans font-semibold text-[1rem] text-black  ">
          Total Cost
        </div>
        <div className=" font-Matter text-[0.9rem] text-[#838486] ">
          CHF {cost}
        </div>
      </div>
    </div>
  );
};

export default Inspectororder;
