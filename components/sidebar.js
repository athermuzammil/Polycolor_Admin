"use client";
import Circle from "@/public/icons/circle";
import Customersicon from "@/public/icons/customersicon";
import Dashboard from "@/public/icons/dashboard";
import Logo from "@/public/icons/logo";
import Message from "@/public/icons/message";
import Orders from "@/public/icons/orders";
import Quotes from "@/public/icons/quotes";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useCurrentLocale, useI18n } from "@/locales/client";
import Inspector from "@/public/icons/inspector";

const Sidebar = async () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const pathname = usePathname();

  return (
    <div className=" h-full w-full">
      <div className=" flex flex-col w-full justify-between px-2 xl:px-6 py-8 font-Matter bg-[#F7F8F9] h-full border border-[#DFDFDF] ">
        <div className=" w-full space-y-4 text-[1rem] text-[#737A82] font-normal ">
          <div className="pb-12 w-max px-4">
            <Link href={"/"}>
              <Logo />
            </Link>
          </div>
          <div className=" w-full ">
            <Link className=" w-full" href={"/dashboard"}>
              <div
                className={clsx(
                  " px-4 py-3 border-[1.5px] min-w-full rounded-[13px] flex gap-4 items-center ",
                  pathname == "/en/dashboard" || pathname == "/de/dashboard"
                    ? "bg-white text-[#16191D] border-[#E2E4E8] "
                    : " border-transparent "
                )}
              >
                <div>
                  <Dashboard />
                </div>
                <div>{t("p1")}</div>
              </div>{" "}
            </Link>{" "}
          </div>
          <div className=" w-full ">
            {" "}
            <Link className=" w-full" href={"/dashboard/quotes"}>
              <div
                className={clsx(
                  " px-4 py-3 border-[1.5px] w-full rounded-[13px] flex gap-4 items-center ",
                  pathname == "/en/dashboard/quotes" ||
                    pathname == "/de/dashboard/quotes" ||
                    pathname == "/en/dashboard/createquote" ||
                    pathname == "/de/dashboard/createquote" ||
                    pathname == "/en/dashboard/selectcustomer" ||
                    pathname == "/de/dashboard/selectcustomer"
                    ? "bg-white text-[#16191D] border-[#E2E4E8] "
                    : pathname == "/en/dashboard/quotedetails" ||
                      pathname == "/de/dashboard/quotedetails"
                    ? "bg-white text-[#16191D] border-[#E2E4E8] "
                    : " border-transparent "
                )}
              >
                <div>
                  <Quotes />
                </div>
                <div>{t("p13")}</div>
              </div>
            </Link>{" "}
          </div>
          <div className=" w-full ">
            {" "}
            <Link className=" w-full" href={"/dashboard/orders"}>
              <div
                className={clsx(
                  " px-4 py-3 border-[1.5px] w-full rounded-[13px] flex gap-4 items-center ",
                  pathname == "/en/dashboard/orders" ||
                    pathname == "/de/dashboard/orders"
                    ? "bg-white text-[#16191D] border-[#E2E4E8] "
                    : pathname == "/en/dashboard/orderdetails" ||
                      pathname == "/de/dashboard/orderdetails"
                    ? "bg-white text-[#16191D] border-[#E2E4E8] "
                    : " border-transparent "
                )}
              >
                <div>
                  <Orders />
                </div>
                <div>{t("p9")}</div>
              </div>
            </Link>
          </div>
          <div className=" w-full ">
            {" "}
            <Link className=" w-full" href={"/dashboard/customers"}>
              <div
                className={clsx(
                  " px-4 py-3 border-[1.5px] w-full rounded-[13px] flex gap-4 items-center ",
                  pathname == "/en/dashboard/customers" ||
                    pathname == "/de/dashboard/customers"
                    ? "bg-white text-[#16191D] border-[#E2E4E8] "
                    : pathname == "/en/dashboard/customers" ||
                      pathname == "/de/dashboard/customers" ||
                      pathname.includes("userprofile")
                    ? "bg-white text-[#16191D] border-[#E2E4E8] "
                    : " border-transparent "
                )}
              >
                <div>
                  <Customersicon />
                </div>
                <div>{t("p14")}</div>
              </div>
            </Link>
          </div>
          <div className=" w-full ">
            {" "}
            <Link className=" w-full" href={"/dashboard/chat"}>
              <div
                className={clsx(
                  " px-4 py-3 border-[1.5px] w-full rounded-[13px] flex justify-between items-center ",
                  pathname == "/en/dashboard/chat" ||
                    pathname == "/de/dashboard/chat"
                    ? "bg-white text-[#16191D] border-[#E2E4E8] "
                    : pathname == "/en/dashboard/messages" ||
                      pathname == "/de/dashboard/messages"
                    ? "bg-white text-[#16191D] border-[#E2E4E8] "
                    : " border-transparent "
                )}
              >
                <div className="flex gap-4 items-center">
                  <div>
                    <Message />
                  </div>
                  <div>{t("p15")}</div>
                </div>
                {/* <div>
                                    <No />
                                </div> */}
              </div>
            </Link>
          </div>
          <div className=" w-full ">
            {" "}
            <Link className=" w-full" href={"/dashboard/inspectors"}>
              <div
                className={clsx(
                  " px-4 py-3 border-[1.5px] w-full rounded-[13px] flex justify-between items-center ",
                  pathname == "/en/dashboard/inspectors" ||
                    pathname == "/de/dashboard/inspectors" ||
                    pathname == "/en/dashboard/singleinspector" ||
                    pathname == "/de/dashboard/singleinspector"
                    ? "bg-white text-[#16191D] border-[#E2E4E8] "
                    : pathname == "/en/dashboard/inspectors" ||
                      pathname == "/de/dashboard/inspectors"
                    ? "bg-white text-[#16191D] border-[#E2E4E8] "
                    : " border-transparent "
                )}
              >
                <div className="flex gap-4 items-center">
                  <div>
                    <Inspector />
                  </div>
                  <div>Inspectors</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
