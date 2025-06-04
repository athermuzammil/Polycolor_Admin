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
import React, { useState } from "react";
import { useCurrentLocale, useI18n } from "@/locales/client";
import Inspector from "@/public/icons/inspector";
import { easeInOut, motion } from "framer-motion";
import Arrowright from "@/public/icons/arrowright";
import Logo2 from "@/public/icons/logo2";

const Sidebar2 = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className=" w-full h-full relative z-[100] ">
      <motion.div
        className={` overflow-hidden duration-300 relative z-[40]    h-full  w-full`}
        initial={{
          width: "7rem",
        }}
        animate={{
          width: open ? "17rem" : "7rem",
        }}
        transition={{
          duration: 0.1,
          ease: easeInOut,
        }}
      >
        <div className=" flex flex-col w-full justify-between px-4 xl:px-6 py-8 font-Matter bg-[#F7F8F9] h-full border border-[#DFDFDF] ">
          <div className=" w-full space-y-10 text-[1.3rem] text-[#737A82] font-normal ">
            <div
              className="pb-12 w-max mx-auto"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Link href={"/"}>
                <Logo2 />
              </Link>
            </div>
            <div className=" w-full ">
              <Link className=" w-full" href={"/dashboard"}>
                <div
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={clsx(
                    " px-[18px] h-[60px] py-6  border-[1.5px] min-w-full rounded-[13px] flex gap-6 items-center ",
                    pathname == "/en/dashboard" || pathname == "/de/dashboard"
                      ? "bg-white text-[#16191D] border-[#E2E4E8] "
                      : " border-transparent "
                  )}
                >
                  <div classname=" scale-125 ">
                    <Dashboard size={"40"} />
                  </div>
                  <div className={`${open ? " block " : "hidden"}`}>
                    {t("p1")}
                  </div>
                </div>{" "}
              </Link>{" "}
            </div>
            <div className=" w-full ">
              {" "}
              <Link className=" w-full" href={"/dashboard/quotes"}>
                <div
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={clsx(
                    " px-[18px] h-[60px] py-6 border-[1.5px] w-full rounded-[13px] flex gap-6 items-center ",
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
                  <div classname=" scale-125 ">
                    <Quotes size={"40"} />
                  </div>
                  <div className={`${open ? " block " : "hidden"}`}>
                    {t("p13")}
                  </div>
                </div>
              </Link>{" "}
            </div>
            <div className=" w-full ">
              {" "}
              <Link className=" w-full" href={"/dashboard/orders"}>
                <div
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={clsx(
                    " px-[18px] h-[60px] py-6 border-[1.5px] w-full rounded-[13px] flex gap-6 items-center ",
                    pathname == "/en/dashboard/orders" ||
                      pathname == "/de/dashboard/orders"
                      ? "bg-white text-[#16191D] border-[#E2E4E8] "
                      : pathname == "/en/dashboard/orderdetails" ||
                        pathname == "/de/dashboard/orderdetails"
                      ? "bg-white text-[#16191D] border-[#E2E4E8] "
                      : " border-transparent "
                  )}
                >
                  <div classname=" scale-125 ">
                    <Orders size={"40"} />
                  </div>
                  <div className={`${open ? " block " : "hidden"}`}>
                    {t("p9")}
                  </div>
                </div>
              </Link>
            </div>
            <div className=" w-full ">
              {" "}
              <Link className=" w-full" href={"/dashboard/customers"}>
                <div
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={clsx(
                    " px-[18px] h-[60px] py-6 border-[1.5px] w-full rounded-[13px] flex gap-6 items-center ",
                    pathname == "/en/dashboard/customers" ||
                      pathname == "/de/dashboard/customers"
                      ? "bg-white text-[#16191D] border-[#E2E4E8] "
                      : pathname == "/en/dashboard/customers" ||
                        pathname == "/de/dashboard/customers"
                      ? "bg-white text-[#16191D] border-[#E2E4E8] "
                      : " border-transparent "
                  )}
                >
                  <div classname=" scale-125 ">
                    <Customersicon size={"40"} />
                  </div>
                  <div className={`${open ? " block " : "hidden"}`}>
                    {t("p14")}
                  </div>
                </div>
              </Link>
            </div>
            <div className=" w-full ">
              {" "}
              <Link className=" w-full" href={"/dashboard/chat"}>
                <div
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={clsx(
                    " px-5 h-[60px] py-6 border-[1.5px] w-full rounded-[13px] flex justify-between items-center ",
                    pathname == "/en/dashboard/chat" ||
                      pathname == "/de/dashboard/chat"
                      ? "bg-white text-[#16191D] border-[#E2E4E8] "
                      : pathname == "/en/dashboard/messages" ||
                        pathname == "/de/dashboard/messages"
                      ? "bg-white text-[#16191D] border-[#E2E4E8] "
                      : " border-transparent "
                  )}
                >
                  <div className="flex gap-6 items-center">
                    <div classname=" scale-125 ">
                      <Message size={"40"} />
                    </div>
                    <div className={`${open ? " block " : "hidden"}`}>
                      {t("p15")}
                    </div>
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
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={clsx(
                    " px-5 h-[60px] py-6 border-[1.5px] w-full rounded-[13px] flex justify-between items-center ",
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
                  <div className="flex gap-6 items-center">
                    <div classname=" scale-125 ">
                      <Inspector size={"43"} />
                    </div>
                    <div className={`${open ? " block " : "hidden"}`}>
                      Inspectors
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className=" flex gap-6 items-center absolute bottom-[10%] right-[1.5rem] ">
          <div
            className={` ${
              open ? "block" : "hidden"
            } font-Matter font-medium text-[1.5rem] leading-none text-black  `}
          >
            Close
          </div>
          <div
            className={` flex  px-2 py-2 bg-white border-[#E2E4E8] rounded-full border  ${
              open ? "rotate-180" : "rotate-0"
            } duration-200 `}
            onClick={(e) => {
              setOpen(!open);
              //   e.preventDefault();
            }}
          >
            <Arrowright size={"40"} />
          </div>
        </div>
      </motion.div>
      <div
        className={` fixed z-10 h-screen w-[calc(100vw)] top-0 right-0 bg-black opacity-40 ${
          open ? " block xl:hidden " : "hidden"
        } `}
        onClick={() => {
          setOpen(false);
        }}
      ></div>
    </div>
  );
};

export default Sidebar2;
