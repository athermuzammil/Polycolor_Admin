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
import formatDateAndTime from "@/utils/formatDateAndTime";
import Delete from "@/public/icons/delete";
import { DatePicker } from "./ui/datepicker";
import Pending from "@/public/icons/pending";
import Quater from "@/public/icons/quater";
import Half from "@/public/icons/half";
import Full from "@/public/icons/full";
import Createorder from "@/api/createorder";
import createBilling from "@/api/createbilling";

import { useCurrentLocale, useI18n } from "@/locales/client";
import Spinner from "./spinner";
import Threedots from "@/public/icons/threedots";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Deletequote from "@/api/deletequote";
import AddQuotewithouprice from "@/api/addquotewithoutprice";
import Arrowdown from "@/public/icons/arrowdown";
import Getallinspectors from "@/api/getallinspectors";
import Addinspector from "@/api/addinspector";
import { getToken } from "@/api/getToken";
import { Input } from "./ui/input";

const Quotesid = ({
  id,
  itemno,
  cost,
  quoteid,
  date,
  accept,
  index,
  totaldata,
  orderId,
  items,
  user,
}) => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const [show, setshow] = useState(false);
  const [message, setmessage] = useState();
  const [popUp, setPopUp] = useState(false);
  const { toast, handleToastClick } = useToast();
  const [data, setData] = useState();
  const [phrase, setPhrase] = useState();
  const [deadline, setDate] = useState();
  const [statusopen, setstatusopen] = useState(false);
  const [paymentstatus, setpaymentstatus] = useState();
  const [paymentstatuserror, setpaymentstatuserror] = useState();
  const [name, setname] = useState();
  const [name1, setName1] = useState("");
  const [email, setEmail] = useState("");
  const [expcompdate, setexpcompdate] = useState();
  const [nameerror, setnameerror] = useState();
  const [expcompdaterror, setexpcompdaterror] = useState();
  const [amount, setamount] = useState();
  const [newpopup, setnewpopup] = useState(false);
  const [loading, setloading] = useState(false);
  const [deletepop, setdeletepop] = useState(false);
  const [open, setopen] = useState(false);
  const [inspectors, setinspectors] = useState();
  const [inspector, setinspector] = useState();
  const [inspectordrop, setinspectordrop] = useState(false);
  const [inspectorerror, setinspectorerror] = useState(false);
  const token = getToken();

  const needData = {
    name: name1,
    email: email,
  };

  const addInspector = async (data) => {
    const res = await Addinspector(token, data);
    //console.log(data);
    //console.log(res, "ressponseeeeeee");
    setName1("");
    setEmail("");
    const data1 = await Getallinspectors(token);
    //console.log(data1, "inspectors");
    setinspectors(data1);
  };

  useEffect(() => {
    //console.log(show, "immmmmm");
  }, [show]);

  useEffect(() => {
    if (accept == "Accepted") {
      setmessage("Accepted");
    } else if (accept == "Rejected") {
      setmessage("Rejected");
    } else {
      setmessage("-");
    }
  }, []);

  useEffect(() => {
    const getdata = async () => {
      const token = localStorage.getItem("token");
      const data = await Getallinspectors(token);
      //console.log(data, "inspectors");
      setinspectors(data);
    };
    getdata();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const handleAddPhrase = () => {
    if (!phrase) {
      toast({
        title: t("p129"),
      });
    } else {
      setAllPhrases((prevItems) => [...prevItems, phrase]);
      setPhrase("");
      //console.log(allPhrases, "phraseeee");
    }
  };

  const [allPhrases, setAllPhrases] = useState([]);

  const [timelines, settimelines] = useState([
    {
      title: "",
      dueDate: "",
    },
  ]);

  const handleAddTimeline = () => {
    settimelines((prevItems) => [
      ...prevItems,
      {
        title: "",
        dueDate: "",
      },
    ]);
  };

  const handleTitleChange = (index, newTitle) => {
    const updatedTimelines = timelines.map((item, idx) =>
      idx === index ? { ...item, title: newTitle } : item
    );
    settimelines(updatedTimelines);
  };

  const handleDateChange = (newDate, index) => {
    //console.log(newDate, "kkkkkkkkkkkkkkk");
    if (newDate) {
      const date = new Date(newDate).toISOString();
      const updatedTimelines = timelines.map((item, idx) =>
        idx === index ? { ...item, dueDate: date } : item
      );
      settimelines(updatedTimelines);
    }
  };
  const handleexpDateChange = (newDate, index) => {
    //console.log(newDate, "kkkkkkkkkkkkkkk");
    if (newDate) {
      const date = new Date(newDate).toISOString();
      setexpcompdate(date);
    }
  };

  const handleDelete = (index) => {
    const updatedTimelines = timelines.filter((_, idx) => idx !== index);
    settimelines(updatedTimelines);
  };

  useEffect(() => {
    //console.log(timelines, "tttttttttt");
  }, [timelines]);

  const validateAndCreateOrder = async () => {
    if (!name || name.length == 0) {
      setnameerror(true);
      toast({
        variant: "destructive",
        title: t("p132"),
      });
      return;
    }
    if (!expcompdate) {
      setexpcompdaterror(true);
      toast({
        variant: "destructive",
        title: t("p133"),
      });
      return;
    }

    if (!inspector) {
      setinspectorerror(true);
      toast({
        variant: "destructive",
        title: t("p134"),
      });
      return;
    }

    if (timelines.length < 1) {
      toast({
        variant: "destructive",
        title: t("p135"),
      });
      return;
    }

    if (!paymentstatus) {
      setpaymentstatuserror(true);
      toast({
        variant: "destructive",
        title: t("p136"),
      });
      return;
    }

    for (const timeline of timelines) {
      if (!timeline.title || !timeline.dueDate) {
        toast({
          variant: "destructive",
          title: t("p137"),
        });
        return;
      }
    }

    const resttimelines = [];

    if (data.requestedQuoteId) {
      const item = {
        title: "Quote Requested",
        dueDate: data.requestedQuoteId.createdAt,
        completed: true,
      };
      resttimelines.push(item);
    }

    if (data.updatedAt) {
      const item = {
        title: "Quote Created",
        dueDate: data.updatedAt,
        completed: true,
      };
      resttimelines.push(item);
    }
    if (data.acceptedon) {
      const item = {
        title: "Quote Accepted",
        dueDate: data.acceptedon,
        completed: true,
      };
      resttimelines.push(item);
    }
    const item = {
      title: "Order Created",
      dueDate: new Date().toISOString(),
      completed: true,
    };

    resttimelines.push(item);
    const itemreceived = {
      title: "Items Received",
      dueDate: "",
    };
    resttimelines.push(itemreceived);

    const newTimelines = [...resttimelines, ...timelines];

    const reqdata = {
      ordername: name,
      expectedcompletion: expcompdate,
      timeline: newTimelines,
      userId: data.userId,
      quoteId: data._id,
      inspector: inspector._id,
    };
    setloading(true);

    const token = localStorage.getItem("token");
    const res = await Createorder(token, reqdata);
    if (res.error) {
      toast({
        variant: "destructive",
        title: res.error,
      });
      setloading(false);
      return;
    }
    const html2pdf = (await import("html2pdf.js/dist/html2pdf.min.js")).default;
    const element = document.getElementById("content");
    const options = {
      filename: "GFG.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
      },
    };

    var file = await html2pdf().set(options).from(element).outputPdf("blob");
    let newfile = new File([file], "my-invoice.pdf", {
      type: "application/pdf",
    });
    //console.log(newfile, "ffffff");

    function blobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }

    function base64ToBlob(base64, type = "application/octet-stream") {
      const binStr = atob(base64);
      const len = binStr.length;
      const arr = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
      }
      return new Blob([arr], { type: type });
    }

    const base64 = await blobToBase64(file);
    //console.log(base64);

    const blob = base64ToBlob(base64, "application/pdf");
    //console.log(blob, "blob");

    const myfile = new File([blob], `${data._id}.pdf`, {
      type: "application/pdf",
    });
    //console.log(myfile);

    const add = await AddQuotewithouprice(token, data._id, myfile);
    //console.log(add, "qqqqqq");

    if (res._id) {
      const billingreqdata = {
        orderId: res._id,
        amount: amount,
      };

      if (amount && amount > 0) {
        const billingres = await createBilling(token, billingreqdata);
        //console.log(billingres);
      }
    }
    window.location.reload();
    //console.log(res);
  };

  useEffect(() => {
    //console.log(amount);
  }, [amount]);

  const [delload, setdelload] = useState(false);

  const deleteQuote = async () => {
    const token = localStorage.getItem("token");
    setdelload(true);
    const res = await Deletequote(token, id);
    //console.log(res);
    if (res.message) {
      window.location.reload();
    }
  };

  return (
    <div className=" w-full lg:w-[335px]  xl:w-[303.5px] 1xl:w-[350px] ">
      <AlertDialog className={" w-[10rem]  md:max-w-[10rem]  "} open={open}>
        <AlertDialogContent
          className={"w-[22rem] md:rounded-2xl md:max-w-[22rem]  "}
        >
          <AlertDialogHeader>
            <AlertDialogTitle
              className={" font-Polysans pb-0 font-medium text-center "}
            >
              {t("p138")}
              <div className=" text-center text-[#76828D] text-[0.9rem] font-Matter font-normal ">
                {t("p139")}
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={"  "}>
            <div className=" flex items-center w-full justify-center gap-2 pb-4 ">
              <AlertDialogCancel
                className={" p-2 font-Matter py-1 outline-none"}
                onClick={() => setopen(false)}
              >
                {t("p140")}
              </AlertDialogCancel>

              <AlertDialogAction>
                <div
                  onClick={() => {
                    !delload && deleteQuote();
                  }}
                  className=" bg-[#f42f4e] font-Matter font-medium text-[0.9rem] w-[80px] h-[35px] text-white px-3  flex items-center justify-center rounded-full "
                >
                  {delload ? <span className=" loader "></span> : "Confirm"}
                </div>
              </AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {newpopup && (
        <>
          <div className=" w-[100vw]  backdrop-blur-[1px] bg-black/30 h-[100vh] fixed top-0 left-0 flex justify-center items-center z-[999]  "></div>
          <div className=" fixed top-0 z-[1009] h-[100vh] w-full left-0 justify-center items-center flex ">
            <div
              className=" w-[300px] bg-white relative rounded-2xl overflow-hidden z-[100] px-5 py-4
             "
            >
              <div className=" font-Polysans font-semibold text-[1.1rem] pb-3 flex justify-between items-center ">
                {t("p141")}
                <div onClick={() => setnewpopup(false)}>
                  <Cross h={30} />
                </div>
              </div>
              <div className=" pt-2 relative  ">
                <Input
                  placeholder={t("p190")}
                  type="number"
                  className="  w-full  font-Matter outline-none py-1.5 px-3 border border-[#DFDFDF] rounded-xl "
                  onChange={(e) => {
                    setamount(e.target.value);
                    setpaymentstatus(
                      e.target.value ? ` ${e.target.value} CHF` : ""
                    );
                  }}
                />
                <div className=" absolute top-4 font-Matter font-medium right-3 text-[0.9rem] text-[#717171]">
                  CHF
                </div>
              </div>
              <div className=" pt-10 pb-2 flex justify-end ">
                <div
                  onClick={() => setnewpopup(false)}
                  className=" cursor-pointer bg-[#205FFF] rounded-full px-4 py-2 text-white w-max font-Matter font-medium text-[0.9rem] "
                >
                  {t("p57")}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Link href={`/dashboard/quotedetails?id=${id}`}>
        <div className="bg-[#F7F8F9] border border-[#E5EAEF] rounded-[40px] font-Polysans px-[8px] pb-[8px] ">
          <div className=" font-semibold  py-4 px-4">
            {t("p322")} - #{quoteid}
          </div>
          <div className="bg-[#ffffff] border border-[#E5EAEF] rounded-[32px] pb-4  px-5">
            <div className={` flex w-full justify-between items-center pt-4 `}>
              {user?.name && (
                <div className=" text-[#76828D] font-Polysans pt-0 text-[0.9rem] ">
                  {t("p126")}
                </div>
              )}
              {accept == "Rejected" ||
                (accept == null && (
                  <div
                    className=" p-2 relative"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setdeletepop(!deletepop);
                    }}
                  >
                    <Threedots />
                    {deletepop && (
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setopen(true);
                          setdeletepop(false);
                        }}
                        className=" absolute flex  select-none items-center z-20 right-0 gap-2 bg-white rounded-xl shadow-[1px_1px_10px_0px_rgba(0,0,0,0.05)] border text-[#FF4D40] font-Matter font-medium border-[#E5EAEF] px-4 py-2.5 top-[100%]  "
                      >
                        <Delete /> {t("p142")}
                      </div>
                    )}
                  </div>
                ))}
            </div>
            {deletepop && (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  setdeletepop(false);
                }}
                className="fixed left-0 top-0  h-screen w-screen z-10"
              ></div>
            )}
            <div className="  text-[#2F3133] text-[1.1rem] font-Matter  pt-1 font-[500] ">
              {" "}
              {user?.name}
            </div>
            <div className="text-[#76828D] text-[0.9rem]  pt-6 ">
              {t("p20")}
            </div>
            <div className=" font-Matter text-[#2F3133]  text-[1.1rem] font-[500]">
              CHF {cost}
            </div>
            <div className="flex justify-between text-[#76828D] text-[0.9rem] py-7 pt-8 ">
              <div>
                <div className="  font-normal">{t("p21")}</div>
                <div className=" text-[1.1rem] font-Matter   text-[#1c2731]  font-[500]">
                  {itemno}
                </div>
              </div>
              <div>
                <div className=" font-normal">{t("p22")}</div>
                <div className=" text-[1.1rem] font-Matter   text-[#2F3133]  font-[500]">
                  {date}
                </div>
              </div>
            </div>
            <div
              className={` ${
                currentLocale == "en"
                  ? "flex items-end "
                  : "flex 1xl:flex-row  items-end  1xl:items-end   gap-0  lg:gap-2 xl:gap-1 1xl:gap-0 "
              }   justify-between`}
            >
              <div className=" text-[#2F3133]  pt-4 lg:pt-0 xl:pt-4">
                <div className=" text-[#76828D] font-medium text-[0.9rem]">
                  Status
                </div>
                {!accept && (
                  <span
                    className={` font-Matter w-max  ${
                      currentLocale == "en"
                        ? "text-[1.1rem]"
                        : "  text-[0.95rem] xl:text-[0.9rem] 1xl:text-[1rem]"
                    } `}
                  >
                    {t("p23")}
                  </span>
                )}
                {accept && orderId && (
                  <span
                    className={` text-[#2F3133] w-max  font-Matter  ${
                      currentLocale == "en"
                        ? "text-[1.1rem]"
                        : " text-[0.95rem] xl:text-[0.9rem] 1xl:text-[1rem]"
                    } `}
                  >
                    {" "}
                    {t("p24")}{" "}
                  </span>
                )}
                {accept && !orderId && (
                  <div
                    className={` w-max ${
                      currentLocale == "en"
                        ? " text-[1.1rem]"
                        : "text-[1.1rem] xl:text-[1rem] 1xl:text-[1.1rem]"
                    } ${
                      accept == "Accepted" ? "text-[#37BD8D]" : " text-red-400 "
                    } font-Matter `}
                  >
                    {accept}
                  </div>
                )}
              </div>
              {accept == "Accepted" && !orderId && (
                <div
                  className={clsx(
                    `bg-[#205FFF] rounded-[42px] px-4 h-max text-[#FFFFFF] text-[0.9rem] cursor-pointer ${
                      currentLocale == "en" ? " py-2" : "py-2.5"
                    } `
                  )}
                  onClick={(e) => {
                    setshow(true);
                    setData(totaldata[index]);
                    e.preventDefault();
                  }}
                >
                  {t("p25")}
                </div>
              )}
              {orderId && (
                <Link href={`/dashboard/orderdetails?id=${orderId}`}>
                  <div
                    className={`  py-2 w-max rounded-full ${
                      currentLocale == "en"
                        ? " text-[0.9rem] px-[20px]"
                        : "text-[0.85rem] px-[16px]"
                    } font-Polysans border-[#E5EAEF] border `}
                  >
                    {t("p275")}
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Link>
      {show && (
        <div
          onClick={() => {
            setshow(false);
          }}
          className=" overflow-hidden w-[100vw] left-0 bg-black/30 flex justify-center  items-center z-[49] h-[100vh] fixed top-0 backdrop-blur-md"
        >
          <motion.div
            className=" h-full  overflow-hidden overflow-y-scroll w-[65%] bg-[#FFFFFF] absolute top-0 right-0 flex flex-col gap-4 shadow-lg p-6  "
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setstatusopen(false);
            }}
          >
            <div className=" w-full flex items-center justify-between ">
              <div className="font-Polysans font-semibold text-[#141415] text-[1.6rem]">
                {t("p27")}
              </div>
              <div
                onClick={() => {
                  setshow(false);
                  setAllPhrases([]);
                  setDate(null);
                }}
              >
                <Cross />
              </div>
            </div>
            <div className=" flex w-full items-center justify-between bg-[#F7F8F9] border-[1px] border-[#E5EAEF] rounded-3xl p-6 ">
              <div className="flex gap-4 ">
                <div>
                  <Order />
                </div>
                <div>
                  <div className="text-[0.95rem] font-semibold font-Polysans text-[black] ">
                    {t("p28")} #{data.quotenumber}
                  </div>
                  <div className="text-[0.85rem] font-normal font-Matter text-[#838486]">
                    {t("p29")}
                  </div>
                </div>
              </div>
              <Link target="#" href={`/dashboard/quotedetails?id=${id}`}>
                <div
                  className=" bg-white py-4 font-medium px-6 font-Matter text-[#000000] text-[0.9rem] leading-none rounded-3xl border-[1px] border-[#E5EAEF]  "
                  onClick={() => {
                    setshow(false);
                  }}
                >
                  {t("p30")}
                </div>
              </Link>
            </div>
            <div className=" w-full  bg-[#ffffff] border-[1px] border-[#E5EAEF] rounded-3xl p-6 ">
              <div className=" w-full flex justify-between ">
                <div className=" w-[40%] ">
                  <div className=" font-Polysans font-medium pb-3 ">
                    {t("p31")}
                  </div>
                  <Input
                    type="text"
                    className={clsx(
                      "outline-none w-full font-normal py-2 pl-4 bg-[#ffffff] duration-300 border-[1px] rounded-xl text-black font-Matter text-[0.9rem]  placeholder:text-[0.9rem] placeholder:font-Matter placeholder:text-[#AFB2B6]",
                      nameerror ? " border-red-400 " : "border-[#E5EAEF]"
                    )}
                    onClick={() => setnameerror(false)}
                    placeholder={t("p191")}
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
                <div className=" w-[40%] ">
                  <div className=" font-Polysans font-medium pb-3 ">
                    {t("p32")}
                  </div>
                  <div
                    onClick={() => setexpcompdaterror(false)}
                    className={clsx(
                      " duration-300 border-[1px] w-full rounded-xl overflow-hidden",
                      expcompdaterror ? " border-red-400 " : "border-[#E5EAEF]"
                    )}
                  >
                    <DatePicker idx={0} dedlinedate={handleexpDateChange} />
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex flex-col bg-[#F7F8F9] border-[1px] border-[#E5EAEF] rounded-3xl p-6 ">
              <div className=" flex flex-col ">
                <div className="font-Polysans font-semibold text-[#141415] text-[1rem]">
                  {t("p33")}
                </div>
                <div className="font-Matter text-[#838486] text-[0.9rem]">
                  {t("p34")}
                </div>
              </div>
              <div className=" flex items-center justify-start py-6 ">
                {data.requestedQuoteId && (
                  <>
                    <div className=" h-[12px] w-[12px] rounded-full bg-[#000000] "></div>
                    <div className=" w-[20%] h-[2px] bg-[#000000]   "></div>
                  </>
                )}
                <div className=" h-[12px] w-[12px] rounded-full bg-[#000000] "></div>
                <div className=" w-[20%] h-[2px] bg-[#000000]   "></div>
                <div className=" h-[12px] w-[12px] rounded-full bg-[#000000] "></div>
                <div className=" w-[20%] h-[2px] bg-[#000000]   "></div>
                <div className=" h-[12px] w-[12px] rounded-full bg-[#000000] "></div>
                <div className=" w-[20%] h-[2px] bg-[#E0E0E3]   "></div>
                <div className=" h-[12px] w-[12px] rounded-full bg-[#E0E0E3] "></div>
              </div>
              <div className=" flex items-start justify-start w-full ">
                {data.requestedQuoteId && (
                  <div className=" flex flex-col  w-[21%] gap-1 ">
                    <div className=" font-Matter text-[1rem] font-medium text-[#1D1D1F] leading-none   ">
                      {t("p35")}
                    </div>
                    <div className=" font-Matter text-[0.9rem] font-medium text-[#909099] leading-none   ">
                      {formatDateAndTime(data.requestedQuoteId.createdAt).date}
                    </div>
                  </div>
                )}
                <div className=" flex flex-col  w-[21%] gap-1 ">
                  <div className=" font-Matter text-[1rem] font-medium text-[#1D1D1F] leading-none   ">
                    {t("p36")}
                  </div>
                  <div className=" font-Matter text-[0.9rem] font-medium text-[#909099] leading-none   ">
                    {formatDate(data.updatedAt)}
                  </div>
                </div>
                <div className=" flex flex-col  w-[21%] gap-1 ">
                  <div className=" font-Matter text-[1rem] font-medium text-[#1D1D1F] leading-none   ">
                    {t("p37")}
                  </div>
                  <div className=" font-Matter text-[0.9rem] font-medium text-[#909099] leading-none   ">
                    {formatDate(data.acceptedon)}
                  </div>
                </div>
                <div className=" flex flex-col  w-[21%] gap-1 ">
                  <div className=" font-Matter text-[1rem] font-medium text-[#1D1D1F] leading-none   ">
                    {t("p24")}
                  </div>
                  <div className=" font-Matter text-[0.9rem] font-medium text-[#909099] leading-none   ">
                    {formatDateAndTime(new Date()).date}
                  </div>
                </div>
                <div className=" flex flex-col   gap-1 ">
                  <div className=" font-Matter text-[1rem] font-medium text-[#1D1D1F] leading-none   ">
                    {t("p38")}
                  </div>
                  <div className=" font-Matter text-[0.9rem] font-medium text-[#909099] leading-none   ">
                    {t("p39")}
                  </div>
                </div>
              </div>
            </div>
            <div className=" w-full  bg-[#ffffff] border-[1px] border-[#E5EAEF] rounded-3xl p-6">
              <div className=" font-Polysans font-semibold ">{t("p143")}</div>
              <div className=" w-full flex gap-2 mt-5 ">
                <div
                  onClick={() => {
                    setinspectordrop(!inspectordrop);
                    setinspectorerror(false);
                  }}
                  className={clsx(
                    " border select-none relative cursor-pointer font-Matter duration-300  bg-[#FAFAFA] w-[40%] rounded-xl py-2.5 px-3 flex justify-between   ",
                    inspector ? "" : "text-[#A1A7B0]",
                    inspectorerror ? " border-red-400 " : "border-[#E5EAEF]"
                  )}
                >
                  {inspector?.name || "Choose inspector"} <Arrowdown />
                  {inspectordrop && (
                    <div className=" absolute top-[110%] w-full left-0 bg-white border border-[#E5EAEF] rounded-xl overflow-hidden ">
                      {inspectors &&
                        inspectors.map((inspector) => (
                          <div
                            onClick={() => setinspector(inspector)}
                            className=" px-3 py-2 text-black font-Matter capitalize cursor-pointer hover:bg-[#FAFAFA] "
                          >
                            {inspector.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                <div
                  className=" border cursor-pointer w-[150px] font-Matter font-medium rounded-xl border-[#205FFF] flex gap-3 justify-center items-center  text-[#205FFF]  "
                  onClick={() => {
                    setPopUp(true);
                  }}
                >
                  <span className=" text-[1.5rem] font-normal  ">+</span>{" "}
                  {t("p144")}
                </div>
              </div>
            </div>
            <div className="   w-full items-start justify-between bg-[#ffffff] border-[1px] border-[#E5EAEF] rounded-3xl p-6 ">
              <div className=" flex w-full justify-between ">
                <div className="font-Polysans font-semibold text-[#141415] text-[1rem]">
                  {t("p40")}
                </div>
                <div className=" flex flex-col gap-10 ">
                  <div className=" flex items-center gap-8 ">
                    <div className="font-medium font-Polysans text-[#000000] text-[0.9rem]">
                      {t("p41")}
                    </div>
                    <div className=" relative w-max ">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setstatusopen(!statusopen);
                          setpaymentstatuserror(false);
                        }}
                        className={clsx(
                          " bg-white w-[150px] text-center duration-200 py-4 cursor-pointer select-none font-medium px-6 font-Matter text-[#000000] text-[0.9rem] leading-none rounded-3xl border-[1px]  ",
                          paymentstatuserror
                            ? " border-red-400 "
                            : " border-[#E5EAEF]"
                        )}
                      >
                        {paymentstatus || "Change Status"}
                      </div>
                      <div
                        className={clsx(
                          " w-full absolute top-[100%] transition-height overflow-hidden ",
                          !statusopen ? " h-[0%] " : " h-[230px] "
                        )}
                      >
                        <div className=" text-[#717171] border border-[#ECECEC] text-[0.9rem] bg-white overflow-hidden mt-1 rounded-2xl w-full font-Matter grid ">
                          <div
                            onClick={() => {
                              setpaymentstatus("Pending");
                              setstatusopen(false);
                              setamount(0);
                            }}
                            className=" flex gap-2 items-center cursor-pointer hover:bg-[#F7F8F9] px-3 py-2.5 w-full "
                          >
                            <Pending /> {t("p42")}
                          </div>
                          <div
                            onClick={() => {
                              setpaymentstatus("Paid Quarter");
                              setstatusopen(false);
                              setamount(data.total / 4);
                            }}
                            className=" flex gap-2 items-center cursor-pointer hover:bg-[#F7F8F9] px-3 py-2.5 w-full "
                          >
                            <Quater /> {t("p43")}
                          </div>
                          <div
                            onClick={() => {
                              setpaymentstatus("Paid Half");
                              setstatusopen(false);
                              setamount(data.total / 2);
                            }}
                            className=" flex gap-2 items-center cursor-pointer hover:bg-[#F7F8F9] px-3 py-2.5 w-full "
                          >
                            <Half /> {t("p44")}
                          </div>

                          <div
                            onClick={() => {
                              setpaymentstatus("Paid Full");
                              setstatusopen(false);
                              setamount(data.total);
                            }}
                            className=" flex gap-2 items-center cursor-pointer hover:bg-[#F7F8F9] px-3 py-2.5 w-full "
                          >
                            <Full /> {t("p45")}
                          </div>

                          <div
                            onClick={() => {
                              setnewpopup(true);
                            }}
                            className=" flex gap-2 items-center cursor-pointer hover:bg-[#F7F8F9] px-3 py-2.5 w-full "
                          >
                            <span className=" text-black ">CHF</span> {t("p46")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex w-full flex-col gap-10 ">
                <div className=" flex flex-col w-full gap-2 ">
                  <div className=" flex justify-between w-full  pt-9">
                    <div className="font-Polysans w-[40%]  text-[#000000] text-[1rem]">
                      {t("p47")}
                    </div>
                    <div className=" font-Polysans w-[40%] text-[1rem] text-[#000000] leading-none ">
                      {t("p48")}
                    </div>
                  </div>
                  {timelines.map((item, index) => (
                    <div key={index} className="flex justify-between  ">
                      <div className="w-[40%]">
                        <Input
                          type="text"
                          className="outline-none w-full font-normal py-3 pl-4 bg-[#ffffff] border-[#E5EAEF] border-[1px] rounded-xl text-black font-Matter text-[0.9rem]
                         placeholder:text-[0.9rem] placeholder:font-Matter placeholder:text-[#AFB2B6]"
                          placeholder={t("p192")}
                          value={item.title}
                          onChange={(e) =>
                            handleTitleChange(index, e.target.value)
                          }
                        />
                      </div>
                      <div className="w-[40%]  flex gap-3">
                        <div className="border-[#E5EAEF] border-[1px] w-full rounded-xl overflow-hidden">
                          <DatePicker
                            idx={index}
                            dedlinedate={handleDateChange}
                          />
                        </div>

                        {timelines.length > 1 && (
                          <button
                            onClick={() => handleDelete(index)}
                            className="ml-4 text-red-500 hover:text-red-700"
                          >
                            <Delete />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className=" border-[1px]  select-none border-[#205FFF] cursor-pointer rounded-lg flex gap-2 py-3 px-3 items-center w-fit   "
                  onClick={() => {
                    handleAddTimeline();
                  }}
                >
                  <Bplus />
                  <div className="font-Matter leading-none font-medium text-[#205FFF] text-[0.9rem]">
                    {t("p49")}
                  </div>
                </div>
              </div>
            </div>
            <div className=" w-max place-self-end flex justify-end sticky bottom-0 py-5 ">
              <div
                onClick={() => {
                  !loading && validateAndCreateOrder();
                }}
                className=" text-[white] w-[160px]  bg-[#205FFF] cursor-pointer rounded-full font-Matter font-medium text-[0.9rem] leading-none h-[45px] flex items-center justify-center "
              >
                {/* PP */}
                {loading ? <Spinner size={22} /> : "Create Order"}
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {show && (
        <div className="border-[1px] absolute w-[70%] -z-50 bg-white top-0 py-[1rem] border-[#F1F1F1] shadow-md ">
          <div id="content" className=" px-[1rem] ">
            <div className=" bg-[#181818] px-[1rem]  py-6 ">
              <div className=" text-[2.75rem] flex justify-between leading-none text-white font-Polysans font-semibold ">
                <div>
                  <div className="pb-5 ">{t("p28")}</div>
                  <div className=" text-[#C6C6C6] text-[0.95rem] font-Matter font-medium ">
                    #{quoteid}
                  </div>
                </div>
                <div>polycolor</div>
              </div>
              <div
                className=" flex w-full items-center
               justify-between "
              >
                <div className=" text-[0.95rem] ">
                  <div className=" font-Polysans text-[#FFFFFF] text-[1.1rem] pt-5 ">
                    From
                  </div>
                  <div className=" max-w-[180px] pt-2 text-[#C6C6C6] ">
                    Polycolor Schönenwerd AG, Bahnhofstrasse 77, 5012
                    Schönenwerd
                  </div>
                </div>
                <div className=" text-[#C6C6C6] font-Matter  flex items-center  justify-between py-8 ">
                  <div>
                    <div className="  ">
                      <div className=" font-Polysans font-medium text-white text-[1.1rem] ">
                        {t("p145")}
                      </div>
                      <div className=" pt-1">{inspector?.name}</div>
                    </div>
                    <div>
                      <div className=" mt-6 font-Polysans font-medium text-white text-[1.1rem] ">
                        {t("p100")}{" "}
                      </div>
                      <div className=" pt-1">
                        {" "}
                        {formatDateAndTime(new Date()).formatted}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" pb-6 pt-10 font-Polysans font-semibold flex gap-10 w-full ">
              <div className=" min-w-[45px] max-w-[45px] "></div>

              <div className="  w-[5%]"></div>
              <div className="  w-[35%]">{t("p87")}</div>
              <div className="   w-[30%] text-center ">{t("p89")}</div>
              <div className=" min-w-[100px] max-w-[100px] "> Missing QTY</div>
            </div>
            <div className=" w-full   border-t-[1px] py-6 border-black grid gap-10">
              {items.map((item, index) => (
                <div className="flex gap-10 w-full" key={index}>
                  <div className="min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] border border-black "></div>
                  <div className=" font-Polysans font-semibold w-[5%]">
                    {index < 9 && "0"}
                    {index + 1}.
                  </div>
                  <div className=" text-[#424242] font-Matter font-medium w-[35%]">
                    {item.name || "---"}
                    <div className=" font-Matter pb-2  font-normal text-[#424242] text-[0.85rem]">
                      {item.description}
                    </div>
                  </div>
                  <div className="  text-[#3E3E3E] font-Matter  font-medium w-[30%]">
                    <div className="  text-center">{item.quantity}</div>
                  </div>
                  <div className=" min-w-[100px] max-w-[100px]  border border-black h-full ">
                    {" "}
                  </div>
                </div>
              ))}
            </div>
            <div className=" my-4 mt-20 w-[400px] border border-black ">
              <div className=" text-[#3E3E3E] px-3 font-Matter border-b border-black py-2 pb-4 font-medium ">
                Date Of Inspection:
              </div>
              <div className=" text-[#A5A5A5] text-[0.9rem] font-Matter flex justify-center items-end pb-3 h-[100px] ">
                Sign here
              </div>
            </div>
            <div className=" max-w-[400px] mb-4 text-[#424242] font-Matter ">
              I hereby confirm that the products mentioned above are of right
              quantity and complete.
            </div>
            <div className=" mt-10 text-center font-Polysans font-semibold text-[1.2rem] mb-3 ">
              Thank you for your business
            </div>
          </div>
        </div>
      )}
      <div
        className={`h-[100vh] w-[100vw] bg-white bg-opacity-50 fixed left-0  top-0 z-[100]  flex justify-center items-center duration-1000  ${
          popUp ? "block " : "hidden"
        }  `}
      >
        <div className=" w-[25rem] bg-white p-6 rounded-3xl flex flex-col gap-10 shadow-xl  border   ">
          <div className=" font-Polysans font-semibold text-[1.3rem] text-[#141415] flex w-full items-center justify-between    ">
            <div> {t("p146")} </div>
          </div>
          <div className=" flex flex-col gap-8 ">
            <div className=" flex flex-col gap-3 ">
              <div className=" flex flex-col gap-3 w-full ">
                <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                  {t("p147")}
                </div>
                <Input
                  type="text"
                  value={name1}
                  onChange={(e) => {
                    setName1(e.target.value);
                  }}
                  className={`border outline-none 
                       border-[#DFDFDF]
                   font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-xl p-3 w-full`}
                  placeholder={t("p149")}
                />
              </div>
            </div>
            <div className=" flex flex-col gap-3 ">
              <div className=" flex flex-col gap-3 w-full ">
                <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                  {t("p148")}
                </div>
                <Input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className={`border outline-none 
                       border-[#DFDFDF]
                   font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-xl p-3 w-full`}
                  placeholder={t("p150")}
                />
              </div>
            </div>
          </div>
          <div className=" w-full items-center flex gap-3 justify-end ">
            <div
              className=" leading-none  bg-white border border-[#c9c9c9] rounded-full font-Matter text-[1rem] font-medium text-[#9B9B9B] px-6 h-[40px] cursor-pointer flex items-center justify-center   "
              onClick={() => {
                setPopUp(false);
              }}
            >
              {t("p78")}
            </div>
            <div
              className=" leading-none  bg-[#205FFF] border border-transparent rounded-full font-Matter text-[1rem] font-medium text-white px-8 h-[40px] cursor-pointer flex items-center justify-center   "
              onClick={() => {
                if (name1 && email) {
                  addInspector(needData);
                  setPopUp(false);
                }
              }}
            >
              {t("p59")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotesid;
