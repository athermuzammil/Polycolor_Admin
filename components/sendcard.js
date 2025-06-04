import Tick from "@/public/icons/tick";
import Link from "next/link";
import React from "react";

const Sendcard = ({
  type,
  quoteNum,
  orderNum,
  items,
  date,
  time,
  service,
  amount,
  status,
  id,
}) => {
  return (
    <div className=" py-3 mt-3.5 ">
      <div className=" bg-[#F7F8F9] border-[#E5EAEF] border-[1px] rounded-3xl flex flex-col gap-3 p-3 w-[350px] font-Matter font-medium ">
        <div className=" flex items-center justify-between text-[#3F3F3F] text-[1rem] font-Matter font-semibold leading-none pl-3 ">
          {type == 1 && <div>Quote Requested</div>}
          {type == 2 && <div>Quote #{quoteNum} Sent</div>}
          {type == 3 && (
            <div className=" flex items-center gap-1 ">
              <Tick />
              Quote #{quoteNum} Accepted
            </div>
          )}
          {type == 4 && (
            <div className=" flex items-center gap-1 ">
              <Tick />
              Created Order #{orderNum}
            </div>
          )}
          <Link
            href={
              type == 1
                ? `/dashboard/singlerequestquote?id=${id}`
                : type == 2 || type == 3
                ? `/dashboard/quotedetails?id=${id}`
                : `/dashboard/orderdetails?id=${id}`
            }
          >
            <div className=" bg-[#FFFFFF] rounded-[20px] py-3 px-4 w-max text-[0.9rem] font-medium leading-none text-[#363B40] cursor-pointer border border-[#E5EAEF]   ">
              View Details
            </div>
          </Link>
        </div>
        <div className=" bg-[#FFFFFF] rounded-3xl p-4 border-[#E5EAEF] border-[1px] w-full flex flex-col gap-8   ">
          <div className=" w-full flex items-start justify-between ">
            <div className=" flex flex-col gap-3 ">
              <div className=" text-[#737A82] text-[0.9rem]  ">Total items</div>
              <div className=" text-[#363B40] text-[2.5rem] leading-none  ">
                {items}
              </div>
            </div>
            <div className=" flex flex-col items-end gap-3 ">
              <div className=" text-[#737A82] text-[0.9rem]  ">
                {type == 3 && <div>Accepted on</div>}
                {type == 4 && <div>Created on</div>}
                {type == 1 && <div>Requested on</div>}
                {type == 2 && <div>Quote Due by</div>}
              </div>
              <div className=" text-[#363B40] text-[0.9rem]   ">
                {type == 2 ? (
                  <div>{date}</div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div>{date}</div>
                    <div>{time}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=" w-full flex items-start justify-between  ">
            <div className=" flex flex-col gap-2 ">
              <div className=" text-[#737A82] text-[0.9rem]  ">
                {type != 1 ? <div>Amount</div> : <div>Service type</div>}
              </div>
              <div className=" text-[#363B40] text-[1.25rem] font-semibold leading-none  ">
                {type != 1 ? <div>CHF {amount}</div> : <div>{service}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sendcard;
