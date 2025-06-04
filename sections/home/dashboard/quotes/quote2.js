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
          <div className="flex justify-between pb-3 items-center">
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
          }  w-full  text-[#16191D]  font-medium text-[0.90rem] font-Matter pb-7 xl:pb-9`}
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
                  <SelectTrigger className="flex w-[120px] gap-4 items-center border border-[#E5EAEF] rounded-[53px] px-6 py-4 h-[50px] relative outline-none  ">
                    <div>
                      <Filter />
                    </div>
                    <div>Filter</div>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl w-[150px] font-Matter text-[1rem] font-medium outline-none  ">
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
        <div className="  flex flex-col lg:flex-row flex-wrap gap-6 1xl:gap-8 pb-10  ">
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
      {/* <div
        className={` h-[100vh] w-[100vw] bg-black bg-opacity-30 fixed top-0 left-0 z-[10000000]  flex justify-center items-center duration-1000  ${
          popUp ? "block " : "hidden"
        }  `}
      >
        <div className=" flex flex-col gap-8 bg-white py-4 px-6 rounded-3xl w-[400px] ">
          <div className=" font-Polysans  text-[1.3rem] text-[#141415] font-semibold   ">
            Filter Quotes
          </div>
          <div className=" flex flex-col gap-6 ">
            <div className=" flex flex-col w-full gap-3 ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                Status
              </div>
              <div
                className=" flex flex-col cursor-pointer relative  border border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem] "
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <div className="  flex items-center justify-between w-full   ">
                  <div
                    className={`  font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium  w-full flex justify-between items-center ${
                      open ? "" : ""
                    } leading-none transition-all duration-300 `}
                  >
                    <div>
                      {" "}
                      {status ? (
                        <div className=" text-[#464646] ">{status}</div>
                      ) : (
                        "Select Status"
                      )}
                    </div>
                    <motion.div
                      animate={{
                        rotate: open ? "180deg" : "0deg",
                      }}
                      transition={{
                        duration: 0.3,
                        ease: easeInOut,
                      }}
                    >
                      <Halfarrow />
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  className={` font-medium  font-Matter text-[1rem] w-full flex flex-col  leading-[1.5] overflow-hidden absolute z-30 px-2 top-14 left-0 bg-[#FFFFFF] rounded-2xl ${
                    open ? "border" : ""
                  } border-[#DFDFDF]  `}
                  initial={{
                    height: 0,
                  }}
                  animate={{
                    height: open ? "fit-content" : 0,
                    // paddingTop: open ? "12px" : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: easeInOut,
                  }}
                >
                  <div
                    className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                    onClick={() => {
                      setStatus("Accepted");
                    }}
                  >
                    Accepted
                  </div>
                  <div
                    className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                    onClick={() => {
                      setStatus("Pending");
                    }}
                  >
                    Pending
                  </div>
                  <div
                    className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                    onClick={() => {
                      setStatus("Rejected");
                    }}
                  >
                    Rejected
                  </div>
                </motion.div>
              </div>
            </div>
            <div className=" flex flex-col w-full gap-3 ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                Quote Type
              </div>
              <div
                className=" flex flex-col cursor-pointer relative  border border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem] "
                onClick={() => {
                  setOpen1(!open1);
                }}
              >
                <div className="  flex items-center justify-between w-full   ">
                  <div
                    className={`  font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium  w-full flex justify-between items-center ${
                      open1 ? "" : ""
                    } leading-none transition-all duration-300 `}
                  >
                    <div>
                      {" "}
                      {type ? (
                        <div className=" text-[#464646] ">{type}</div>
                      ) : (
                        "Select Quote Type"
                      )}
                    </div>
                    <motion.div
                      animate={{
                        rotate: open1 ? "180deg" : "0deg",
                      }}
                      transition={{
                        duration: 0.3,
                        ease: easeInOut,
                      }}
                    >
                      <Halfarrow />
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  className={` font-medium  font-Matter text-[1rem] w-full flex flex-col  leading-[1.5] overflow-hidden absolute z-30 px-2 top-14 left-0 bg-[#FFFFFF] rounded-2xl ${
                    open1 ? "border" : ""
                  } border-[#DFDFDF]  `}
                  initial={{
                    height: 0,
                  }}
                  animate={{
                    height: open1 ? "fit-content" : 0,
                    // paddingTop: open ? "12px" : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: easeInOut,
                  }}
                >
                  <div
                    className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                    onClick={() => {
                      setType("Converted");
                    }}
                  >
                    Converted to order
                  </div>
                  <div
                    className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                    onClick={() => {
                      setType("Not Converted");
                    }}
                  >
                    Not Converted to order
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
          <div className=" w-full flex items-center justify-end gap-3 ">
            <div
              className=" font-Matter text-[1rem] font-medium text-[#9B9B9B] leading-none px-8 py-3 cursor-pointer border border-[#EDEDED] rounded-3xl   "
              onClick={() => {
                setPopUp(false);
              }}
            >
              Cancel
            </div>
            <div className=" bg-[#205FFF] font-Matter text-[1rem] font-medium text-[#FFFFFF] leading-none px-8 py-3 cursor-pointer  rounded-3xl   ">
              Apply
            </div>
          </div>
        </div>
      </div> */}
      {/* <div
        className={` h-[100vh] w-[100vw] bg-black bg-opacity-30 fixed top-0 left-0 z-[10000000]  flex justify-center items-center duration-1000  ${
          popUp1 ? "block " : "hidden"
        }  `}
      >
        <div className=" flex flex-col gap-8 bg-white py-4 px-6 rounded-3xl w-[500px] ">
          <div className=" font-Polysans  text-[1.3rem] text-[#141415] font-semibold   ">
            Sort Quotes
          </div>
          <div className=" flex flex-col gap-4 ">
            <div className=" flex items-center gap-2 ">
              <div
                className={` ${
                  click == 1
                    ? " bg-[#BED0FF]  text-[#2864FF] border-[#BED0FF]  flex items-center gap-2   "
                    : "  bg-[#F7F7F7] border-[#F1F1F1] text-[#303030] "
                } rounded-3xl  border px-6 py-4 leading-none font-Matter text-[0.9rem] cursor-pointer duration-300   `}
                onClick={() => {
                  setclick(1);
                }}
              >
                {click == 1 && <Bluetick />}
                <div>Price - Low to High</div>
              </div>
              <div
                className={` ${
                  click == 2
                    ? " bg-[#BED0FF]  text-[#2864FF] border-[#BED0FF]  flex items-center gap-2   "
                    : "  bg-[#F7F7F7] border-[#F1F1F1] text-[#303030] "
                } rounded-3xl  border px-6 py-4 leading-none font-Matter text-[0.9rem] cursor-pointer duration-300   `}
                onClick={() => {
                  setclick(2);
                }}
              >
                {click == 2 && <Bluetick />}
                <div>Price - High to Low</div>
              </div>
            </div>
            <div className=" flex items-center gap-2 ">
              <div
                className={` ${
                  click == 3
                    ? " bg-[#BED0FF]  text-[#2864FF] border-[#BED0FF]  flex items-center gap-2   "
                    : "  bg-[#F7F7F7] border-[#F1F1F1] text-[#303030] "
                } rounded-3xl  border px-6 py-4 leading-none font-Matter text-[0.9rem] cursor-pointer duration-300   `}
                onClick={() => {
                  setclick(3);
                }}
              >
                {click == 3 && <Bluetick />}
                <div>Date - Latest</div>
              </div>
              <div
                className={` ${
                  click == 4
                    ? " bg-[#BED0FF]  text-[#2864FF] border-[#BED0FF]  flex items-center gap-2   "
                    : "  bg-[#F7F7F7] border-[#F1F1F1] text-[#303030] "
                } rounded-3xl  border px-6 py-4 leading-none font-Matter text-[0.9rem] cursor-pointer duration-300   `}
                onClick={() => {
                  setclick(4);
                }}
              >
                {click == 4 && <Bluetick />}
                <div>Date - Earliest</div>
              </div>
            </div>
            <div className=" flex items-center gap-2 ">
              <div
                className={` ${
                  click == 5
                    ? " bg-[#BED0FF]  text-[#2864FF] border-[#BED0FF]  flex items-center gap-2   "
                    : "  bg-[#F7F7F7] border-[#F1F1F1] text-[#303030] "
                } rounded-3xl  border px-6 py-4 leading-none font-Matter text-[0.9rem] cursor-pointer duration-300   `}
                onClick={() => {
                  setclick(5);
                }}
              >
                {click == 5 && <Bluetick />}
                <div>Quote No. - High to Low</div>
              </div>
              <div
                className={` ${
                  click == 6
                    ? " bg-[#BED0FF]  text-[#2864FF] border-[#BED0FF]  flex items-center gap-2   "
                    : "  bg-[#F7F7F7] border-[#F1F1F1] text-[#303030] "
                } rounded-3xl  border px-6 py-4 leading-none font-Matter text-[0.9rem] cursor-pointer duration-300   `}
                onClick={() => {
                  setclick(6);
                }}
              >
                {click == 6 && <Bluetick />}
                <div>Quote No. - Low to high</div>
              </div>
            </div>
          </div>
          <div className=" w-full flex items-center justify-end gap-3 ">
            <div
              className=" font-Matter text-[1rem] font-medium text-[#9B9B9B] leading-none px-8 py-3 cursor-pointer border border-[#EDEDED] rounded-3xl   "
              onClick={() => {
                setPopUp1(false);
                setclick(0);
              }}
            >
              Cancel
            </div>
            <div
              className=" bg-[#205FFF] font-Matter text-[1rem] font-medium text-[#FFFFFF] leading-none px-8 py-3 cursor-pointer  rounded-3xl   "
              onClick={() => {
                handleApply();
                setPopUp1(false);
              }}
            >
              Apply
            </div>
          </div>
        </div>
      </div> */}
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
            } font-Matter  text-white text-[0.9rem] font-medium leading-none duration-200 delay-300 `}
          >
            <div className=" min-w-[200px]  ">{t("p19")}</div>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
};

export default Quote;

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// export function Shad({
//   options,
//   setoptions,
//   tog,
//   settog,
//   accepted,
//   rejected,
//   pending,
//   created,
// }) {
//   const items = [
//     {
//       id: "one",
//       label: accepted,
//     },
//     {
//       id: "two",
//       label: rejected,
//     },
//     {
//       id: "three",
//       label: pending,
//     },
//     {
//       id: "four",
//       label: created,
//     },
//   ];

//   const FormSchema = z.object({
//     items: z.array(z.string()).min(1, " "),
//   });

//   const form = useForm({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       items: [], // Updated to start with an empty array
//     },
//   });

//   function onSubmit(data) {
//     // Handle the form submission, e.g., send data to the server or display it in a toast
//     //console.log("Submitted Data: ", data);
//     setoptions(data);
//     settog(!tog);
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-max">
//         <FormField
//           control={form.control}
//           name="items"
//           render={({ field }) => (
//             <FormItem>
//               <div className="mb-4 w-max">
//                 <FormLabel className="text-[0.9rem] text-black font-Matter font-medium w-max">
//                   Status
//                 </FormLabel>
//                 <FormDescription>
//                   {/* Select the items you want to display in the sidebar. */}
//                 </FormDescription>
//               </div>
//               {items.map((item) => (
//                 <FormField
//                   key={item.id}
//                   control={form.control}
//                   name="items"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-row items-center space-x-2 space-y-0">
//                       <FormControl>
//                         <Checkbox
//                           checked={field.value.includes(item.id)}
//                           onCheckedChange={(checked) => {
//                             if (checked) {
//                               field.onChange([...field.value, item.id]);
//                             } else {
//                               field.onChange(
//                                 field.value.filter((value) => value !== item.id)
//                               );
//                             }
//                           }}
//                         />
//                       </FormControl>
//                       <FormLabel className="font-Matter text-[#76828D] font-medium text-[0.875rem]">
//                         {item.label}
//                       </FormLabel>
//                     </FormItem>
//                   )}
//                 />
//               ))}
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <div className="flex items-center gap-2.5">
//           <Button
//             className="rounded-full px-5 text-black border border-[#E5EAEF] bg-white"
//             type="button"
//             onClick={() => form.reset({ items: [] })}
//           >
//             Reset
//           </Button>
//           <Button
//             className={`rounded-full px-[18px] bg-[#1053FF]  text-white ${
//               options.length < 1 ? " cursor-not-allowed " : ""
//             } `}
//             type="submit"
//           >
//             Apply
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Shad } from "./shad";
// import Filter from "@/public/icons/filter";
// import { useCurrentLocale, useI18n } from "@/locales/client";

// export function PopoverDemo({ options, setoptions, tog, settog }) {
//   const t = useI18n();
//   const currentLocale = useCurrentLocale();
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           className={`flex ${
//             currentLocale == "en" ? "w-[110px]" : "w-[150px]"
//           } gap-4 items-center border border-[#E5EAEF] rounded-[53px] px-6 py-4 h-[50px] relative  `}
//         >
//           <Filter />
//           <div className="text-[#16191D] font-Matter font-medium text-[0.875rem]">
//             Filter
//           </div>
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-48">
//         <Shad
//           options={options}
//           setoptions={setoptions}
//           tog={tog}
//           settog={settog}
//           accepted={t("p124")}
//           rejected={t("p125")}
//           pending={t("p131")}
//           created={t("p24")}
//         />
//       </PopoverContent>
//     </Popover>
//   );
// }
