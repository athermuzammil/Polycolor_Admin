import { useCurrentLocale, useI18n } from "@/locales/client";
import Arrowright from "@/public/icons/arrowright";
import Inspecicon from "@/public/icons/inspecicon";
import Link from "next/link";
import React from "react";

const Inspectorcard = ({ name, orders, email, id }) => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  return (
    <Link href={`/dashboard/singleinspector?id=${id}`}>
      <div className=" bg-white p-4 w-full flex items-center justify-between border rounded-3xl border-[#E5EAEF] ">
        <div className=" flex items-center gap-4 xl:w-[25%] max-w-[25%]   ">
          <Inspecicon />
          <div className=" h-full flex flex-col items-start justify-between ">
            <div className=" font-Polysans font-semibold text-[1rem] text-black  ">
              {name}
            </div>
            <div className=" font-Matter text-[0.9rem] text-[#838486] ">
              {email}
            </div>
          </div>
        </div>
        <div className=" flex flex-col items-start justify-between  ">
          <div className=" font-Polysans font-semibold text-[1rem] text-black  ">
            {t("p248")}
          </div>
          <div className=" font-Matter text-[0.9rem] text-[#838486] ">
            {
              orders?.filter((order) => order?.order?.status != "completed")
                .length
            }
          </div>
        </div>
        <div className=" flex flex-col items-start justify-between  ">
          <div className=" font-Polysans font-semibold text-[1rem] text-black  ">
            {t("p249")}
          </div>
          <div className=" font-Matter text-[0.9rem] text-[#838486] ">
            {
              orders?.filter((order) => order?.order?.status == "completed")
                .length
            }
          </div>
        </div>
        <Link
          className="hidden lg:block"
          href={`/dashboard/singleinspector?id=${id}`}
        >
          <div className=" flex cursor-pointer items-center font-medium py-2.5 px-4 lg:py-3 lg:px-5 justify-between gap-2 font-Matter text-[0.9rem] text-[#101010]  border border-[#E5EAEF] rounded-[40px]   ">
            <div className=" hidden lg:flex items-center ">{t("p252")}</div>
            <Arrowright size={17} color={"#292D32"} />
          </div>
        </Link>
      </div>
    </Link>
  );
};

export default Inspectorcard;
