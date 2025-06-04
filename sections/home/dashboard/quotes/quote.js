"use client";
import Getallquotes from "@/api/getallquotes";
import Getallrequested from "@/api/getallrequested";
import Navbar from "@/components/navbar";
import Quoteidreq from "@/components/quoteidreq";
import Quotesid from "@/components/quotesid";
import Quotesidskeleton from "@/components/quotesidskeleton";
import Arrowleft from "@/public/icons/arrowleft";
import Bluetick from "@/public/icons/bluetick";
import Filter from "@/public/icons/filter";
import Halfarrow from "@/public/icons/halfarrow";
import Sort from "@/public/icons/sort";
import formatDateAndTime from "@/utils/formatDateAndTime";
import { easeInOut, motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCurrentLocale, useI18n } from "@/locales/client";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Noquotes from "@/public/icons/noquotes";
import Plus from "@/public/icons/plus";
import Plus2 from "@/public/icons/plus2";

const Quote = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const [click, setclick] = useState();
  const [quotes, setquotes] = useState();
  const [popUp, setPopUp] = useState(false);
  const [popUp1, setPopUp1] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [status, setStatus] = useState();
  const [type, setType] = useState();
  const [tab, setTab] = useState(1);
  const [requested, setrequested] = useState();
  const [loading, setloading] = useState(true);
  const [fdata, setfdata] = useState();
  useEffect(() => {
    const quotes = async () => {
      const token = localStorage.getItem("token");
      const data = await Getallquotes(token);
      //console.log(data, "quotes");
      setquotes(data);
      setfdata(data);
      const data1 = await Getallrequested(token);
      //console.log(data, " requested quotes");
      setrequested(data1);
      setloading(false);
    };
    quotes();
  }, []);

  const hightolow = () => {
    const sortedQuotes = [...quotes].sort((a, b) => b.total - a.total);
    setquotes(sortedQuotes);
  };

  const lowtohigh = () => {
    const sortedQuotes = [...quotes].sort((a, b) => a.total - b.total);
    setquotes(sortedQuotes);
  };

  const earliest = () => {
    const sortedQuotes = [...quotes].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    setquotes(sortedQuotes);
  };

  const latest = () => {
    const sortedQuotes = [...quotes].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setquotes(sortedQuotes);
  };

  const quotelowtohigh = () => {
    const sortedQuotes = [...quotes].sort(
      (a, b) => a.quotenumber - b.quotenumber
    );
    setquotes(sortedQuotes);
  };

  const quotehightolow = () => {
    const sortedQuotes = [...quotes].sort(
      (a, b) => b.quotenumber - a.quotenumber
    );
    setquotes(sortedQuotes);
  };

  const handleApply = () => {
    if (click == 1) {
      lowtohigh();
    } else if (click == 2) {
      hightolow();
    } else if (click == 3) {
      latest();
    } else if (click == 4) {
      earliest();
    } else if (click == 5) {
      quotehightolow();
    } else if (click == 6) {
      quotelowtohigh();
    }
  };

  return (
    <div className="px-10 py-[0.5rem] relative">
      <div>
        <div className="">
          <div className="flex justify-between pb-4 items-center">
            <div className="flex gap-2 items-center">
              <div>
                {" "}
                <Arrowleft />
              </div>
              <div className="text-[1.5rem] font-semibold font-Polysans">
                {t("p13")}
              </div>
            </div>
            <div>
              <Navbar />
            </div>
          </div>
        </div>
        <div
          className={` flex gap-5 lg:gap-6 items-center ${
            tab == 1 ? "justify-start lg:justify-between" : " justify-between "
          }  w-full  text-[#16191D]  font-medium text-[0.90rem] font-Matter pb-9`}
        >
          <div className=" flex items-center border bg-[#F5F5F5] border-[#FFFFFF] rounded-[53px] p-1 ">
            <div
              className={`px-6 py-3 cursor-pointer border  rounded-3xl ${
                tab == 1
                  ? "bg-white text-black  border-[#ECECEC] "
                  : "text-[#565656] border-transparent "
              } duration-300 cursor-pointer  `}
              onClick={() => {
                setTab(1);
              }}
            >
              {t("p122")}
              <span
                className={` ${
                  currentLocale == "en"
                    ? " hidden xl:inline"
                    : " hidden 1xl:inline"
                } `}
              >
                {" "}
                {t("p321")}
              </span>
            </div>
            <div
              className={`px-6 py-3 cursor-pointer border  rounded-3xl ${
                tab == 2
                  ? "bg-white text-black  border-[#ECECEC] "
                  : "text-[#565656] border-transparent "
              } duration-300 cursor-pointer  `}
              onClick={() => {
                setTab(2);
              }}
            >
              {t("p123")}
              <span
                className={` ${
                  currentLocale == "en"
                    ? " hidden xl:inline"
                    : " hidden 1xl:inline"
                }  `}
              >
                {" "}
                {t("p321")}
              </span>
            </div>
          </div>
          <div className=" flex items-center gap-1 lg:gap-4 ">
            {tab == 1 && (
              <>
                <Select
                  onValueChange={(e) => {
                    if (e == "one") {
                      const filteredQuotes = fdata.filter(
                        (quote) => quote.Status === "Accepted"
                      );
                      setquotes(filteredQuotes);
                    } else if (e == "two") {
                      const filteredQuotes = fdata.filter(
                        (quote) => quote.Status === "Rejected"
                      );
                      setquotes(filteredQuotes);
                    } else if (e == "three") {
                      const filteredQuotes = fdata.filter(
                        (quote) => quote.Status === null
                      );
                      setquotes(filteredQuotes);
                    } else if (e == "four") {
                      const filteredQuotes = fdata.filter(
                        (quote) => quote.order
                      );
                      setquotes(filteredQuotes);
                    } else if (e == "five") {
                      setquotes(fdata);
                    }
                  }}
                >
                  <SelectTrigger className="flex w-[120px] gap-4 items-center border border-[#E5EAEF] rounded-[53px] px-6 py-4 h-[50px] relative  ">
                    <div>
                      <Filter />
                    </div>
                    <div>Filter</div>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl w-[150px] font-Matter text-[1rem] font-medium  ">
                    <div className="  text-black pl-4 py-4    ">Status</div>
                    <SelectItem
                      className="rounded-xl cursor-pointer py-2 text-[#76828D] flex items-center "
                      value="one"
                    >
                      {t("p124")}
                    </SelectItem>
                    <SelectItem
                      className="rounded-xl cursor-pointer py-2 text-[#76828D]  "
                      value="two"
                    >
                      {t("p125")}
                    </SelectItem>
                    <SelectItem
                      className="rounded-xl cursor-pointer py-2 text-[#76828D]"
                      value="three"
                    >
                      {t("p42")}
                    </SelectItem>
                    <SelectItem
                      className="rounded-xl cursor-pointer py-2 text-[#76828D]"
                      value="four"
                    >
                      {t("p24")}
                    </SelectItem>
                    <SelectItem
                      className="rounded-xl cursor-pointer py-2 text-[#76828D]"
                      value="five"
                    >
                      All
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  className=""
                  onValueChange={(e) => {
                    if (e == "one") {
                      lowtohigh();
                    } else if (e == "two") {
                      hightolow();
                    } else if (e == "three") {
                      latest();
                    } else if (e == "four") {
                      earliest();
                    } else if (e == "five") {
                      quotehightolow();
                    } else if (e == "six") {
                      quotelowtohigh();
                    }
                  }}
                >
                  <SelectTrigger
                    className={`flex ${
                      currentLocale == "en" ? "w-[110px]" : "w-[150px]"
                    } gap-4 items-center border border-[#E5EAEF] rounded-[53px] px-6 py-4 h-[50px] relative  `}
                  >
                    <div>
                      <Sort />
                    </div>
                    <div>{t("p16")}</div>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl w-[250px] font-Matter text-[1rem] font-medium relative z-[100000000000] ">
                    <div className="  text-black pl-4 py-4    ">
                      {t("p115")}
                    </div>
                    <div>
                      <SelectItem
                        className="rounded-xl cursor-pointer py-2 text-[#76828D] flex items-center  "
                        value="one"
                      >
                        {t("p116")}
                      </SelectItem>
                    </div>
                    <div>
                      <SelectItem
                        className="rounded-xl cursor-pointer py-2 text-[#76828D] flex items-center  "
                        value="two"
                      >
                        {t("p117")}
                      </SelectItem>
                    </div>
                    <div>
                      <SelectItem
                        className="rounded-xl cursor-pointer py-2 text-[#76828D]  "
                        value="three"
                      >
                        {t("p118")}
                      </SelectItem>
                    </div>
                    <div>
                      <SelectItem
                        className="rounded-xl cursor-pointer py-2 text-[#76828D]  "
                        value="four"
                      >
                        {t("p119")}
                      </SelectItem>
                    </div>
                    <div>
                      <SelectItem
                        className="rounded-xl cursor-pointer py-2 text-[#76828D]  "
                        value="five"
                      >
                        {t("p120")}
                      </SelectItem>
                    </div>
                    <div>
                      <SelectItem
                        className="rounded-xl cursor-pointer py-2 text-[#76828D]  "
                        value="six"
                      >
                        {t("p121")}
                      </SelectItem>
                    </div>
                  </SelectContent>
                </Select>
              </>
            )}
            <Link href={"/dashboard/selectcustomer"}>
              <div className=" hidden lg:flex leading-none bg-[#1053FF] rounded-full font-Matter text-[0.9rem] lg:text-[1rem] font-medium text-white px-[4px] lg:px-8 h-[50px] cursor-pointer items-center justify-center   ">
                {t("p19")}
              </div>
            </Link>
          </div>
        </div>
        <div className="  flex flex-wrap gap-6 1xl:gap-8 pb-10  ">
          {loading ? (
            <>
              <div className="w-max">
                <Quotesidskeleton />
              </div>
              <div className="w-max">
                <Quotesidskeleton />
              </div>
              <div className="w-max">
                <Quotesidskeleton />
              </div>
            </>
          ) : tab == 1 ? (
            quotes.length > 0 ? (
              quotes?.map((quote, index) => (
                <Quotesid
                  items={quote.items}
                  totaldata={quotes}
                  index={index}
                  id={quote._id}
                  quoteid={quote.quotenumber}
                  cost={quote.total}
                  itemno={quote.totalItems}
                  date={formatDateAndTime(quote.createdAt).date}
                  accept={quote.Status}
                  orderId={quote.order}
                  user={quote.userId}
                />
              ))
            ) : (
              <div className=" w-full flex flex-col items-center justify-center gap-12 ">
                <Noquotes />
                <div className=" font-Polysans text-[2rem] text-[#141415] font-semibold leading-none ">
                  {t("p250")}
                </div>
              </div>
            )
          ) : requested.length > 0 ? (
            requested?.map((quote, index) => (
              <Quoteidreq
                totaldata={quotes}
                index={index}
                id={quote._id}
                quoteid={quote.quotenumber}
                cost={quote.total}
                itemno={quote.items?.length}
                date={formatDateAndTime(quote.createdAt).date}
                accept={quote.Status}
                express={quote?.additionalDetails?.expressDelivery}
                cid={quote.userId}
                user={quote.userId}
              />
            ))
          ) : (
            <div className=" w-full flex flex-col items-center justify-center gap-12 ">
              <Noquotes />
              <div className=" font-Polysans text-[2rem] text-[#141415] font-semibold leading-none ">
                {t("p250")}
              </div>
            </div>
          )}
        </div>
      </div>

      <motion.div
        className={` fixed h-[54px] rounded-[54px] flex lg:hidden ${
          popUp ? " pl-2 gap-1 pr-4 justify-between " : "justify-center"
        }   items-center overflow-hidden bottom-32 right-10 bg-[#1053FF] `}
        initial={{
          width: "54px",
        }}
        animate={{
          width: popUp ? (currentLocale == "en" ? "155px " : "240px") : "54px",
        }}
        transition={{
          duration: 0.2,
          ease: easeInOut,
        }}
      >
        <motion.div
          initial={{
            rotate: "0deg",
          }}
          animate={{
            rotate: popUp ? "135deg" : "0deg",
          }}
          transition={{
            duration: 0.2,
            ease: easeInOut,
          }}
          onClick={() => {
            setPopUp(!popUp);
          }}
        >
          <Plus2 />
        </motion.div>
        <Link href={"/dashboard/selectcustomer"}>
          <motion.div
            className={`${
              popUp ? " flex  " : " hidden  "
            } font-Matter  text-white text-[0.9rem] font-medium leading-none duration-200 delay-100 `}
          >
            {t("p19")}
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
};

export default Quote;
