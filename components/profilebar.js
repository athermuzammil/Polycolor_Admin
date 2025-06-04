"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@/redux/userContext";

import Arrowup from "@/public/icons/arrowup";
import Profile from "@/public/icons/profile";
import Logout from "@/public/icons/logout";
import World from "@/public/icons/world";
import { useChangeLocale, useCurrentLocale, useI18n } from "@/locales/client";

// import Profile from "@/public/icons/profile";
// import Subscribe from "@/public/icons/subscribe";
// import Logout from "@/public/icons/logout";

const Profilebar = () => {
  const t = useI18n();
  const [open, setOpen] = useState(false);
  const easing = [0, 0.99, 1, 1];
  const { state } = useUser();
  const user = state.user;
  const currentLocale = useCurrentLocale();
  const changeLocale = useChangeLocale({ preserveSearchParams: true });
  const [toggle, settoggle] = useState(false);
  useEffect(() => {
    if (currentLocale == "de") {
      settoggle(false);
    } else {
      settoggle(true);
    }
  }, []);
  const ChangeLang = () => {
    if (toggle) {
      changeLocale("de");
    } else {
      changeLocale("en");
    }
    settoggle(!toggle);
  };
  return (
    <div className=" w-[16rem]  relative z-[45] hidden md:flex items-center gap-5 border-[1px] border-[#E2E4E8] rounded-full    ">
      <div
        className=" w-full  flex items-center justify-between gap-2 cursor-pointer pl-2 pr-4 py-2 "
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className=" flex w-[90%] items-center gap-2 text-ellipsis ">
          <div className=" min-h-[2.4rem] min-w-[2.4rem] rounded-full overflow-hidden bg-black ">
            {/* <Image src={img} className=" object-cover h-full w-full " /> */}
          </div>
          <div className=" font-normal font-Matter w-full text-[1rem] flex flex-col  col-span-4  ">
            <div className="text-left w-full max-w-[10rem] truncate">
              {user.name}
            </div>
            <div className=" text-[#868C92] w-full truncate text-[0.95rem] text-left ">
              {user.email}
            </div>
          </div>
        </div>
        <motion.div
          initial={{
            rotate: "0deg",
          }}
          animate={{
            rotate: open ? "0deg" : "180deg",
            // paddingTop: open ? "12px" : 0,
          }}
          transition={{
            ease: easing,
          }}
        >
          <Arrowup />
        </motion.div>
      </div>

      <motion.div
        className=" absolute top-[4.5rem] left-0   w-full overflow-hidden  "
        initial={{
          height: 0,
        }}
        animate={{
          height: open ? "fit-content" : 0,
          // paddingTop: open ? "12px" : 0,
        }}
      >
        <div className=" bg-[#FFFFFF] border-[1px] border-[#E2E4E8] rounded-2xl  pl-5 flex flex-col gap-5 w-full py-4   ">
          {/* <div className=" flex items-center gap-3 ">
              <Profile size={20} />
              <div className=" font-Matter text-[#2F3B50] text-[0.9rem] leading-none ">
                {t("p112")}
              </div>
            </div> */}
          <div
            className=" flex items-center gap-3 cursor-pointer "
            onClick={() => {
              ChangeLang();
            }}
          >
            <World />
            <div className=" font-Matter text-[#2F3B50] text-[0.9rem] leading-none ">
              {t("p113")}
            </div>
          </div>
          <div
            className=" flex items-center gap-3 cursor-pointer  "
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            <Logout />
            <div className=" font-Matter text-[#EE5454] text-[0.9rem] leading-none ">
              {t("p114")}
            </div>
          </div>
        </div>
      </motion.div>
      {/* {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed left-0 top-0 bg-[#0000000b] h-screen w-screen z-10"
        ></div>
      )} */}
    </div>
  );
};

export default Profilebar;
