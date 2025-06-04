import { useCurrentLocale, useI18n } from "@/locales/client";
import Arrowright from "@/public/icons/arrowright";
import Customer from "@/public/icons/customer";
import formatDateAndTime from "@/utils/formatDateAndTime";
import Link from "next/link";
import React from "react";

const CustomerCard = ({ Name, mail, quotes, orders, id, uid }) => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  return (
    <div>
      <Link href={`/dashboard/userprofile?id=${uid}`}>
        <div className="flex justify-between xl:justify-start w-full font-Polysans border bg-[#ffffff] border-[#E5EAEF] rounded-[23px] px-2 py-4 lg:px-4 lg:py-4">
          <div className="flex gap-4 xl:w-[30%]">
            <div>
              <Customer />
            </div>
            <div>
              <div className="text-[0.95rem] font-semibold">{t("p188")}</div>
              <div className="text-[0.85rem] font-normal capitalize text-[#838486]">
                {Name}
              </div>
            </div>
          </div>
          <div className="xl:w-[25%] text-center">
            <div className="text-[1rem] font-semibold ">{t("p269")}</div>
            <div className="text-[0.95rem] font-normal text-[#838486]">
              {mail}
            </div>
          </div>
          <div className="xl:w-[25%] text-center">
            <div className="text-[1rem] font-semibold">{t("p51")}</div>
            <div className="text-[0.95rem] font-normal text-center text-[#838486]">
              {quotes}
            </div>
          </div>
          <div className="w-[25%] text-center">
            <div className="text-[1rem] font-semibold">{t("p52")}</div>
            <div className="text-[0.95rem] font-normal text-center text-[#838486]">
              {orders}
            </div>
          </div>
          <div className="xl:w-[25%] flex justify-center items-center">
            <Link href={`/dashboard/chat?id=${id}`}>
              <div className="flex gap-2 border-[1px] border-[#E5EAEF] rounded-[42px] px-4 py-3 items-center">
                <div className=" hidden lg:flex ">{t("p53")}</div>
                <div>
                  <Arrowright />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CustomerCard;
