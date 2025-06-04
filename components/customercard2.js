import { useCurrentLocale, useI18n } from "@/locales/client";
import Arrowright from "@/public/icons/arrowright";
import Customer from "@/public/icons/customer";
import formatDateAndTime from "@/utils/formatDateAndTime";
import Link from "next/link";
import React from "react";

const CustomerCard2 = ({ Name, mail, quotes, orders, id, uid }) => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  return (
    <div className="w-full">
      <Link href={`/dashboard/userprofile?id=${uid}`}>
        <div className="flex justify-between xl:justify-start min-w-full font-Polysans border bg-[#ffffff] border-[#E5EAEF] rounded-[23px] px-2 py-4 lg:px-4 lg:py-4 lg:gap-2 xl:gap-0 ">
          <div className="flex itc gap-4 min-w-[27.5%] lg:min-w-[24%] xl:min-w-[27.5%] items-center">
            <div className=" flex items-center">
              <div className="h-[40px]">
                <Customer h={38} w={38} />
              </div>
            </div>
            <div className="">
              <div className="text-[1rem] font-semibold">{t("p188")}</div>
              <div className="text-[0.85rem] font-light  capitalize text-[#838486]">
                {Name}
              </div>
            </div>
          </div>
          <div className="lg:min-w-[27%] xl:min-w-[27.5%] min-w-[27.5%] flex justify-start">
            <div>
              <div className="text-[0.95rem] xl:text-[1rem] font-semibold ">
                {t("p269")}
              </div>
              <div className="text-[0.85rem] font-light text-[#838486]">
                {mail}
              </div>
            </div>
          </div>
          <div className="min-w-[18.25%] lg:min-w-[15%] 1xl:min-w-[18%] text-start">
            <div className="text-[0.95rem] xl:text-[1rem] font-semibold w-max">
              {t("p51")}
            </div>
            <div className="text-[0.85rem] font-normal text-start text-[#838486]">
              {quotes}
            </div>
          </div>
          <div className="min-w-[18.25%] lg:min-w-[20.5%] xl:min-w-[15%] text-start">
            <div className="text-[0.95rem] xl:text-[1rem] font-semibold">
              {t("p52")}
            </div>
            <div className="text-[0.85rem] font-normal text-start text-[#838486]">
              {orders}
            </div>
          </div>
          <div className=" min-w-[8.5%] xl:min-w-[18%] 1xl:min-w-[15%] flex justify-center items-center">
            <Link href={`/dashboard/chat?id=${id}`}>
              <div className="flex gap-2 border-[1px] border-[#E5EAEF] rounded-[42px] px-4 py-2 items-center">
                <div className=" hidden min-[1279px]:flex text-[0.95rem] ">
                  {t("p53")}
                </div>
                <div>
                  <Arrowright size={18} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CustomerCard2;
