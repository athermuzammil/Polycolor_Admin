"use client";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ConverttoOrder from "./converttoOrder";
import Convertorder from "./convertorder";
import Bplus from "@/public/icons/bplus";
import Order from "@/public/icons/order";
import Cross from "@/public/icons/cross";
import { useToast } from "./ui/use-toast";
import { useCurrentLocale, useI18n } from "@/locales/client";

const Quoteidreq = ({ id, itemno, express, date, accept, cid, user }) => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const [show, setshow] = useState(false);
  const [message, setmessage] = useState();
  const { toast, handleToastClick } = useToast();
  const [data, setData] = useState();
  const [phrase, setPhrase] = useState();
  const [deadline, setDate] = useState();
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  useEffect(() => {
    //console.log(show, "immmmmm");
  }, [show]);

  useEffect(() => {
    if (accept == "Accepted") {
      setmessage(t("p124"));
    } else if (accept == "Rejected") {
      setmessage(t("p125"));
    } else {
      setmessage(t("p131"));
    }
  }, []);

  useEffect(() => {
    //console.log(data, "dataaaaaaa");
  }, [data]);

  const [allPhrases, setAllPhrases] = useState([]);

  return (
    <div className="">
      <Link href={`/dashboard/singlerequestquote?id=${id}`}>
        <div className="bg-[#F7F8F9] border border-[#E5EAEF] rounded-[40px] font-Polysans   px-[8px] pb-[8px]   w-full lg:w-[335px]  xl:w-[290px] 1xl:w-[350px]   ">
          <div className=" font-semibold  py-4 px-4">{t("p35")} </div>
          <div className="bg-[#ffffff] border border-[#E5EAEF] rounded-[32px] pt-4   px-4">
            <div className=" text-[#76828D] font-Polysans text-[0.9rem] ">
              {t("p126")}
            </div>
            <div className="  text-[#2F3133] text-[1.1rem] font-Matter  pt-1 font-[500] ">
              {" "}
              {user?.name}
            </div>
            <div className="text-[#76828D] text-[0.9rem] pt-6 ">
              {t("p127")}
            </div>
            <div className=" font-Matter text-[#2F3133]  text-[1.1rem]">
              {express ? "Express Delivery" : "Normal Delivery"}
            </div>

            <div className="flex justify-between text-[#76828D] text-[0.9rem] py-7 pt-8 ">
              <div>
                <div className=" font-normal">{t("p21")}</div>
                <div className=" text-[1.1rem] font-Matter   text-[#1c2731]">
                  {itemno}
                </div>
              </div>
              <div>
                <div className=" font-normal">{t("p128")}</div>
                <div className=" text-[1.1rem] font-Matter   text-[#1c2731]">
                  {date}
                </div>
              </div>
            </div>
            <div
              className={` ${
                currentLocale == "en"
                  ? "flex items-end "
                  : "flex lg:flex-col 1xl:flex-row items-end lg:items-start 1xl:items-end   gap-0  lg:gap-2 1xl:gap-0 "
              }   justify-between text-[#2F3133] pb-3 pt-4 `}
            >
              <div>
                <div className="  text-[#76828D]  font-normal text-[0.9rem]">
                  Status
                </div>
                <div
                  className={`  pb-1 ${
                    currentLocale == "en"
                      ? "text-[1.1rem] xl:text-[0.9rem] 1xl:text-[1.1rem]"
                      : "text-[0.85rem] xl:text-[0.9rem] 1xl:text-[1rem]"
                  } ${
                    accept == "Accepted"
                      ? "text-[#37BD8D]"
                      : accept == "Rejected"
                      ? "text-[#F75A5A]"
                      : " "
                  } font-Matter  `}
                >
                  {message}
                </div>
              </div>
              <Link href={`/dashboard/createquote?cid=${cid._id}&rqid=${id}`}>
                <div
                  className={clsx(
                    `bg-[#205FFF] font-Matter w-max font-normal rounded-[42px] ${
                      currentLocale == "en"
                        ? "px-4 xl:px-2 1xl:px-4"
                        : "px-4 xl:px-2 1xl:px-2"
                    }  py-2 h-max text-[#FFFFFF] text-[0.8rem] xl:text-[0.8rem] 1xl:text-[0.8rem] cursor-pointer `
                  )}
                >
                  {t("p130")}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Quoteidreq;
