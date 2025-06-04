"use client";
import Navbar from "@/components/navbar";
import Arrowleft from "@/public/icons/arrowleft";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Allcustomers from "@/components/allcustomers";
import getallcustomernquotes from "@/api/getallcustomernquotes";
import Orderslistskeleton from "@/components/orderslistskeleton";
import getAllRequestedQuotes from "@/api/getallrequestedquotes";
import { useCurrentLocale, useI18n } from "@/locales/client";

const Selectcustomer = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const [activeTab, setActiveTab] = useState(1);
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  const [filteredData, setfilteredData] = useState([]);
  const Ref = useRef();
  const changeTab = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");
      const data = await getallcustomernquotes(token);
      if (data) {
        setdata(data);
        const filteredData = data.filter((data) => {
          return data.requested == true;
        });
        setfilteredData(filteredData);
        setloading(false);
      }
      //console.log(data, "data");
    };
    getData();
  }, []);
  return (
    <div className="px-9 py-[2rem]">
      <div className="flex justify-between pb-5 items-center">
        <div className="flex gap-4 items-center">
          <div>
            {" "}
            <Arrowleft />
          </div>
          <div className="text-[1.5rem] font-semibold font-Polysans">
            {t("p103")}
          </div>
        </div>
        <div>
          <Navbar />
        </div>
      </div>
      <div className=" w-[300px] ">
        <div className="grid grid-cols-2 rounded-full text-[0.95rem]  relative text-[#939393] overflow-hidden p-1 font-[700] bg-[#F7F8F9] font-Matter items-center border-2 border-[#EBECEE]">
          <motion.div
            className={clsx(
              "relative z-40 font-Matter font-semibold hover:cursor-pointer flex justify-center w-[100%] items-center leading-none  rounded-full h-max xl:px-5 xl:py-4 px-5 py-4 transition-all duration-1000",
              activeTab === 1 ? "text-[#000000]" : "text-[#000000]"
            )}
            onClick={() => changeTab(1)}
          >
            {t("p104")}
          </motion.div>
          <motion.div
            className={clsx(
              "relative z-40 font-Matter font-semibold flex justify-center w-[100%] items-center leading-none rounded-full xl:px-5 xl:py-4 px-5 py-4 transition-all duration-1000 cursor-pointer",
              activeTab === 2 ? "text-[#000000]" : "text-[#000000]"
            )}
            onClick={() => {
              // if (user?.mode) {
              changeTab(2);
              // }
            }}
          >
            {t("p105")}
          </motion.div>

          <motion.span
            style={{
              transform: `translateX(calc(${(activeTab - 1) * 100}% + (${
                activeTab === 1 ? "0.25rem" : "0rem"
              })))`, // Adjust translation with gap
              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              width: "49.6%", // Set width to 1/3 of its parent
              height: "calc(100% - 0.5rem)", // Adjust height with 0.25rem gap
              top: "0.25rem", // Adjust top position to align with the gap
            }}
            className="bg-[#FFFFFF] up rounded-[2rem] leading-none border-[2px] absolute border-[#ECECEC]"
          />
        </div>
      </div>
      <>
        {activeTab === 1 ? (
          <div className="py-[2rem]">
            <div className=" bg-[#F7F8F9] border-[1px] border-[#E5EAEF] p-6  rounded-[40px]   flex flex-col gap-4">
              {loading ? (
                <>
                  <Orderslistskeleton />
                  <Orderslistskeleton />
                  <Orderslistskeleton />
                  <Orderslistskeleton />
                  <Orderslistskeleton />
                </>
              ) : (
                data?.map((cus) => (
                  <Allcustomers
                    id={cus.id}
                    rqid={cus.requestedQuoteId}
                    Name={cus.name}
                    mail={cus.email}
                    progress={cus.status}
                    date={cus.date}
                  />
                ))
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="py-[2rem]">
              <div className=" bg-[#F7F8F9] border-[1px] border-[#E5EAEF] py-4 rounded-[40px] px-6 flex flex-col gap-4">
                {filteredData?.map((cus) => (
                  <Allcustomers
                    id={cus.id}
                    rqid={cus.requestedQuoteId}
                    Name={cus.name}
                    mail={cus.email}
                    progress={cus.status}
                    date={cus.date}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Selectcustomer;
