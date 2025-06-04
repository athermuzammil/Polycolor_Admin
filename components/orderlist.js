import Order from "@/public/icons/order";
import formatDateAndTime from "@/utils/formatDateAndTime";
import Link from "next/link";
import React from "react";

import { useCurrentLocale, useI18n } from "@/locales/client";
const Orderlist = ({ item, order, status, date, cost, id }) => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  return (
    <Link href={`/dashboard/orderdetails?id=${id} `}>
      <div className=" w-[100%] max-w-[100%]  border bg-[#ffffff] border-[#E5EAEF] rounded-[23px] overflow-hidden overflow-x-scroll  ">
        <div className="flex w-full justify-between xl:justify-start  font-Polysans p-3  px-4 lg:py-5">
          <div className="flex gap-3 lg:gap-4 xl:w-[40%]">
            <div>
              <Order />
            </div>
            <div>
              <div className="text-[0.95rem] capitalize font-semibold">
                {item}
              </div>
              <div className="text-[0.85rem] font-normal text-[#838486]">
                {t("p9")} #{order}
              </div>
            </div>
          </div>
          <div className="xl:w-[25%]">
            <div className="text-[0.95rem] lg:text-[1rem] font-semibold">
              {t("p10")}
            </div>
            <div className="text-[0.85rem] lg:text-[0.95rem] font-normal text-[#838486]">
              {status}
            </div>
          </div>
          <div className="xl:w-[25%]">
            <div className="text-[0.95rem] lg:text-[1rem] font-semibold">
              {t("p11")}
            </div>
            <div className="text-[0.85rem] lg:text-[0.95rem] font-normal text-[#838486]">
              {formatDateAndTime(date).date}
            </div>
          </div>
          <div className="xl:w-[10%]">
            <div className="text-[0.95rem] lg:text-[1rem] font-semibold">
              {t("p12")}
            </div>
            <div className="text-[0.85rem] lg:text-[0.95rem] font-normal text-[#838486]">
              CHF {cost}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Orderlist;
