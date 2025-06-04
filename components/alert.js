"use client";
import React, { useState } from "react";
import { AnimatePresence, easeInOut, motion } from "framer-motion";

const Alert = ({ text, children }) => {
  const [enter, setEnter] = useState(false);
  return (
    <div
      className=" flex relative "
      onMouseEnter={() => setEnter(true)}
      onMouseLeave={() => setEnter(false)}
    >
      <div className=" cursor-pointer ">{children}</div>
      <AnimatePresence>
        {enter && (
          <motion.div
            className={` flex gap-[0px] absolute left-5 top-2 pt-2 ${
              enter ? "block" : "hidden"
            }`}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: easeInOut,
            }}
          >
            <div className="">
              <div className="text-[#B5B5B5] bg-[#FFFFFF] border-[#DFDFDF] border font-medium font-Matter w-[400px] px-4 rounded-[14px] py-2 text-[0.95rem] ">
                <div className="  leading-[1.5] ">{text}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Alert;
