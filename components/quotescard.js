import React from "react";
import { useCurrentLocale, useI18n } from "@/locales/client";

const Quotescard = ({ number, num2, heading }) => {
  const t = useI18n();

  return (
    <div className=" bg-[#F7F8F9] rounded-[25px] w-full px-6 py-4 border-[1px] border-[#EAEAEA]">
      <div className=" text-[#333333] text-[1.1rem]  xl:text-[1.3rem] font-Polysans w-max">
        {heading}
      </div>
      <div className=" font-Matter font-medium flex flex-col lg:flex-row gap-2 lg:gap-4  xl:gap-4 2xl:gap-6 pt-4 lg:pt-4 xl:pt-6">
        <div className=" text-[#333333] 2xl:text-[6rem] xl:text-[4.5rem] lg:text-[4.75rem] text-[3.875rem] pt-1 leading-none">
          {number}
        </div>
        <div className="text-[#97979F] text-[0.8rem] xl:text-[1rem] 2xl:text-[1.1rem] lg:place-self-end pb-[0.4rem] w-max">
          {t("p7")} {num2} {t("p8")}
        </div>
      </div>
    </div>
  );
};

export default Quotescard;
//  <div className=" bg-[#F7F8F9] rounded-[32px] w-full px-6 py-4 border-[1px] border-[#EAEAEA]">
//    <div className=" text-[#333333] text-[1.3rem] font-Polysans ">{heading}</div>
//    <div className=" font-Matter font-medium flex gap-2 xl:gap-4 2xl:gap-4 pt-1">
//      <div className=" text-[#333333] 2xl:text-[6rem] xl:text-[4.5rem] lg:text-[5.3rem] pt-1 leading-none">
//        {number}
//      </div>
//      <div className="text-[#97979F] text-[0.8rem] xl:text-[1rem] 2xl:text-[1.1rem] place-self-end pb-[0.4rem]">
//        {t("p7")} {num2} {t("p8")}
//      </div>
//    </div>
//  </div>;
