"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Getuserunreadmessage from "@/api/getuserunreadmessage";
import { useCurrentLocale, useI18n } from "@/locales/client";
import { motion } from "framer-motion";
import Message2 from "@/public/icons/message2";
import Orders2 from "@/public/icons/orders2";
import Quotes2 from "@/public/icons/quotes2";
import Dashboard2 from "@/public/icons/dashboard2";
import Inspecicon from "@/public/icons/inspecicon";
import Inspector from "@/public/icons/inspector";

const Ipadsidebar = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const router = useRouter();
  const tabRefs = useRef([]);
  const pathname = usePathname();
  const [num, setnum] = useState();
  //console.log(pathname, "aaaaa");
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  //   const [activeTab, setActiveTabState] = useState(0); // Initial tab is 0

  useEffect(() => {
    // Remove the language prefix from the pathname
    const cleanedPath = pathname.replace(/^\/(en|de)\//, "/");

    // Determine active tab based on the cleaned pathname
    let newActiveTab = activeTab; // Default to current active tab if no match is found

    if (cleanedPath.includes("quote")) {
      newActiveTab = 2;
    } else if (cleanedPath.includes("order")) {
      newActiveTab = 3;
    } else if (cleanedPath.includes("chat")) {
      newActiveTab = 4;
    } else if (cleanedPath.includes("inspector")) {
      newActiveTab = 5;
    } else if (cleanedPath.startsWith("/dashboard")) {
      newActiveTab = 1; // Default to 1 if no match is found
    }

    // Update the state and call the setActiveTab function
    setActiveTab(newActiveTab);
    setActiveTab(newActiveTab);
  }, [pathname, activeTab, setActiveTab]);

  //   // Return the current active tab if needed
  //   return activeTab;
  useEffect(() => {
    const getdata = async () => {
      const token = localStorage.getItem("token");
      const res = await Getuserunreadmessage(token);
      //console.log(res, "rrrrrrrrrrrr");
      setnum(res?.userunreadmessages);
    };
    getdata();
  }, []);
  return (
    <div className="px-[1.5rem] ">
      <div className="border border-[#DFDFDF] bg-[#F7F8F9]   rounded-full p-[0.5rem]">
        <div className=" ">
          <div
            className={` flex w-full ${
              currentLocale == "en" ? "justify-between" : " justify-between"
            }  `}
          >
            <Link className="w-max" href={"/dashboard"}>
              <div
                //   ref={(el) => (tabRefs.current[1] = el)}
                onClick={() => setActiveTab(1)}
                className={clsx(
                  ` w-max  relative flex  items-center  ${
                    currentLocale == "en"
                      ? "px-4 py-3 gap-2.5"
                      : "lg:px-4 lg:py-3 px-4 py-4 lg:gap-2.5 gap-1.5"
                  }`,
                  activeTab == 1 ? "text-black" : "",
                  pathname === "/en/dashboard" || pathname === "/de/dashboard"
                    ? ""
                    : ""
                )}
              >
                {activeTab == 1 && (
                  <motion.span
                    layoutId="tabs1"
                    className="bg-[#FFFFFF] absolute  rounded-full left-0 w-full h-[100%] border-[1px] border-[#E2E4E8]  text-[#000000]"
                  />
                )}
                <div className="z-20">
                  <Dashboard2 size={24} />
                </div>
                <div
                  className={` z-20 font-Matte ${
                    currentLocale == "de"
                      ? "text-[0.95rem] lg:text-[1rem] "
                      : " text-[1rem]"
                  }  r`}
                >
                  {t("p1")}
                </div>
              </div>
            </Link>
            <Link className=" w-max" href={"/dashboard/quotes"}>
              <div
                //   ref={(el) => (tabRefs.current[2] = el)}
                onClick={() => setActiveTab(2)}
                className={clsx(
                  ` w-max  relative flex  items-center  ${
                    currentLocale == "en"
                      ? "px-4 py-3 gap-2.5"
                      : "lg:px-4 lg:py-3 p-4 lg:gap-2.5 gap-1.5"
                  }`,
                  pathname == "/en/dashboard/quotes" ||
                    pathname == "/de/dashboard/quotes" ||
                    pathname == "/en/dashboard/createquote" ||
                    pathname == "/de/dashboard/createquote"
                    ? " "
                    : pathname == "/en/dashboard/quotedetails" ||
                      pathname == "/de/dashboard/quotedetails"
                    ? " "
                    : "  "
                )}
              >
                {activeTab == 2 && (
                  <motion.span
                    layoutId="tabs1"
                    className="bg-[#FFFFFF] absolute  rounded-full left-0 w-full h-[100%] border-[1px] border-[#E2E4E8]  text-[#000000]"
                  />
                )}
                <div className="z-20">
                  <Quotes2 size={"24"} />
                </div>
                <div
                  className={`z-20 font-Matter ${
                    currentLocale == "de"
                      ? "text-[0.95rem] lg:text-[1rem] "
                      : " text-[1rem]"
                  }`}
                >
                  {t("p13")}
                </div>
              </div>
            </Link>{" "}
            <Link className=" w-max" href={"/dashboard/orders"}>
              <div
                //   ref={(el) => (tabRefs.current[3] = el)}
                className={clsx(
                  ` w-max  relative flex  items-center  ${
                    currentLocale == "en"
                      ? "px-4 py-3 gap-2.5"
                      : "lg:px-4 lg:py-3 p-4 lg:gap-2.5 gap-1.5"
                  }`,
                  pathname == "/de/dashboard/orders"
                    ? " "
                    : pathname == "/en/dashboard/orderdetails" ||
                      pathname == "/de/dashboard/orderdetails"
                    ? " "
                    : "  "
                )}
                onClick={() => setActiveTab(3)}
              >
                {activeTab == 3 && (
                  <motion.span
                    layoutId="tabs1"
                    className="bg-[#FFFFFF] absolute  rounded-full left-0 w-full h-[100%] border-[1px] border-[#E2E4E8] px-3  text-[#000000]"
                  />
                )}
                <div className="z-20">
                  <Orders2 size={"24"} />
                </div>
                <div
                  className={`z-20 font-Matter ${
                    currentLocale == "de"
                      ? "text-[0.95rem] lg:text-[1rem]"
                      : " text-[1rem]"
                  }`}
                >
                  {t("p50")}
                </div>
              </div>
            </Link>
            <Link className=" w-max" href={"/dashboard/chat"}>
              <div
                //   ref={(el) => (tabRefs.current[4] = el)}
                className={clsx(
                  ` w-max  relative flex  items-center  ${
                    currentLocale == "en"
                      ? "px-4 py-3 gap-2.5"
                      : "lg:px-4 lg:py-3 p-4 lg:gap-2.5 gap-1.5"
                  }`,
                  pathname == "/en/dashboard/chat" ||
                    pathname == "/de/dashboard/chat"
                    ? " "
                    : pathname == "/en/dashboard/chat" ||
                      pathname == "/de/dashboard/chat"
                    ? " "
                    : "  "
                )}
                onClick={() => setActiveTab(4)}
              >
                {activeTab == 4 && (
                  <motion.span
                    layoutId="tabs1"
                    className="bg-[#FFFFFF] absolute  rounded-full left-0 w-full h-[100%] border-[1px] border-[#E2E4E8]  text-[#000000]"
                  />
                )}
                <div
                  className={`flex items- z-20 ${
                    currentLocale == "en" ? "gap-4" : " gap-1.5 lg:gap-4"
                  }`}
                >
                  <div>
                    <Message2 size={"24"} />
                  </div>
                  <div
                    className={` font-Matter ${
                      currentLocale == "de"
                        ? "text-[0.95rem] lg:text-[1rem] "
                        : " text-[1rem]"
                    } `}
                  >
                    {t("p15")}
                  </div>
                </div>
                {num > 0 && (
                  <div>
                    <No num={num} />
                  </div>
                )}
              </div>
            </Link>
            <Link className=" w-max" href={"/dashboard/inspectors"}>
              <div
                //   ref={(el) => (tabRefs.current[4] = el)}
                className={clsx(
                  ` w-max  relative flex  items-center  ${
                    currentLocale == "en"
                      ? "px-4 py-3 gap-2.5"
                      : "lg:px-4 lg:py-3 p-4 lg:gap-2.5 gap-1.5"
                  }`,
                  pathname == "/en/dashboard/inspectors" ||
                    pathname == "/de/dashboard/inspectors"
                    ? " "
                    : pathname == "/en/dashboard/singleinspector" ||
                      pathname == "/de/dashboard/singleinspector"
                    ? " "
                    : "  "
                )}
                onClick={() => setActiveTab(5)}
              >
                {activeTab == 5 && (
                  <motion.span
                    layoutId="tabs1"
                    className="bg-[#FFFFFF] absolute  rounded-full left-0 w-full h-[100%] border-[1px] border-[#E2E4E8]  text-[#000000]"
                  />
                )}
                <div
                  className={`flex  items- z-20 ${
                    currentLocale == "en" ? "gap-4" : "lg:gap-4 gap-1.5"
                  }`}
                >
                  <div>
                    <Inspector size={"24"} />
                  </div>
                  <div
                    className={`font-Matter ${
                      currentLocale == "de"
                        ? "text-[0.95rem] lg:text-[1rem] "
                        : " text-[1rem]"
                    } `}
                  >
                    {t("p194")}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ipadsidebar;
