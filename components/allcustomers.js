import { useCurrentLocale, useI18n } from "@/locales/client";
import Arrowright from "@/public/icons/arrowright";
import Customer from "@/public/icons/customer";
import formatDateAndTime from "@/utils/formatDateAndTime";
import Link from "next/link";
import React from "react";

const Allcustomers = ({ Name, mail, progress, date, id, rqid }) => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  return (
    <div>
      <div className="flex w-full font-Polysans border bg-[#ffffff] border-[#E5EAEF] rounded-[23px] px-4 py-4 justify-between">

        <div className=" w-[35%] flex flex-col gap-4 ">

          <div className="flex  gap-4">

            <div className=" flex items-center ">
              <Customer />
            </div>
            <div>
              <div className="text-[1rem] font-semibold">{Name}</div>
              <div className="text-[0.95rem] font-normal text-[#979ca7]">
                {mail}
              </div>
            </div>

          </div>

          <div className="w-full flex justify-start items-center">
            <Link href={`/dashboard/createquote?cid=${id}&rqid=${rqid}`}>
              <div className={`flex  border-[1px] border-[#E5EAEF] rounded-[42px]  py-3 items-center ${currentLocale == "en" ? " text-[1rem] pl-6 pr-5 gap-2" : "text-[0.85rem] gap-0.5 xl:text-[1rem] pl-4 pr-3"}`}>
                <div>{t("p19")}</div>
                <div>
                  <Arrowright />
                </div>
              </div>
            </Link>
          </div>
        </div>


        <div className="w-[32.5%] flex justify-center">
          <div className=" w-max">
            <div className="text-[1rem] font-semibold ">{t("p106")}</div>
            <div className="text-[0.95rem] font-normal text-[#838486]">
              {progress}
            </div>
          </div>
        </div>
        <div className="w-[25%]  flex justify-center">
          <div className="w-max">
            <div className="text-[1rem] font-semibold">{t("p274")}</div>
            <div className="text-[0.95rem] font-normal text-start text-[#838486]">
              {date == "-" ? "-" : formatDateAndTime(date).date}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Allcustomers;
