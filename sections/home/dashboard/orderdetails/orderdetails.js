"use client";
import addDispatchFile from "@/api/addDispatchFile";
import Addinspector from "@/api/addinspector";
import createBilling from "@/api/createbilling";
import Deletemessageorder from "@/api/deletemessageorder";
import Getallinspectors from "@/api/getallinspectors";
import getBillingsOfOrder from "@/api/getbillingsoforder";
import Getsingleorder from "@/api/getsingleorder";
import getSingleUser from "@/api/getsingleuser";
import { getToken } from "@/api/getToken";
import updateInspector from "@/api/updateInspector";
import updateOrderMessage from "@/api/updateordermessage";
import updateOrderStatus from "@/api/updateOrderStatus";
import UpdateTimelines from "@/api/updatetimeline";
import Alert from "@/components/alert";
import Navbar from "@/components/navbar";
import Orderdetailsskeleton from "@/components/orderdetailsskeleton";
import Spinner from "@/components/spinner";
import { DatePicker } from "@/components/ui/datepicker";
import { toast } from "@/components/ui/use-toast";
import useDraggableScroll from "@/components/usedragablescroll";
import { useCurrentLocale, useI18n } from "@/locales/client";
import Arrowdown from "@/public/icons/arrowdown";
import Arrowleft from "@/public/icons/arrowleft";
import Cross from "@/public/icons/cross";
import Danger from "@/public/icons/danger";
import Delete from "@/public/icons/delete";
import Download from "@/public/icons/download";
import Edit from "@/public/icons/edit";
import Editpencil from "@/public/icons/editpencil";
import Flag from "@/public/icons/flag";
import Full from "@/public/icons/full";
import Half from "@/public/icons/half";
import Info from "@/public/icons/info";
import Inspectorprofile from "@/public/icons/inspectorprofile";
import Note from "@/public/icons/note";
import Orders from "@/public/icons/orders";
import Quater from "@/public/icons/quater";
import Smalldownload from "@/public/icons/smalldownload";
import Start from "@/public/icons/start";
import Submit from "@/public/icons/submit";
import Tick from "@/public/icons/tick";
import formatDateAndTime from "@/utils/formatDateAndTime";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

const Orderdetails = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const [orders, setorders] = useState();
  const [loading, setloading] = useState(true);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [billings, setBillings] = useState();
  const [pop, setpop] = useState(false);
  const [amount, setamount] = useState();
  const [amounterror, setamounterror] = useState(false);
  const [statusopen, setstatusopen] = useState(false);
  const [total, settoal] = useState(0);
  const [type, settype] = useState();
  const [timelines, settimelines] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [chatId, setchatId] = useState();
  const [updatepop, setupdatepop] = useState(false);
  const [updatetype, setupdatetype] = useState();
  const [updatemessage, setupupdatemessage] = useState();
  const [updatetypedrop, setupdatetypedrop] = useState(false);
  const [billingdate, setbillindate] = useState();
  const [remark, setremark] = useState();
  const [inspector, setinspector] = useState();
  const [editinspector, seteditinspector] = useState(false);
  const [inspectordrop, setinspectordrop] = useState(false);
  const [inspectors, setinspectors] = useState();
  const [markascompletepop, setmarkascompletepop] = useState(false);
  const [oldinspector, setoldinspector] = useState();
  const [completeload, setcompleteload] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [popUp, setPopUp] = useState();
  const [msg, setMsg] = useState();
  const token = getToken();
  const [error, setError] = useState(false);

  const {
    scrollContainerRef,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
    dragged,
  } = useDraggableScroll();

  useEffect(() => {
    const getdata = async () => {
      const token = localStorage.getItem("token");
      const data = await Getallinspectors(token);
      //console.log(data, "inspectors");
      setinspectors(data);
    };
    getdata();
  }, []);

  const needData = {
    name: name,
    email: email,
  };

  const addInspector = async (data) => {
    const res = await Addinspector(token, data);
    const data1 = await Getallinspectors(token);
    setinspectors(data1);
  };

  useEffect(() => {
    const orders = async () => {
      const token = localStorage.getItem("token");
      const data = await Getsingleorder(token, id);
      if (data?.error) {
        setError(true);
        return;
      }
      setorders(data);
      setinspector(data?.inspector);
      setoldinspector(data?.inspector);
      const user = await getSingleUser(token, data?.userId);
      setchatId(user?.chatId);
      setSelectedStatus(data?.status);
      const billingsdata = await getBillingsOfOrder(token, id);
      //console.log(billingsdata, "billings");
      setBillings(billingsdata);
      settimelines(data?.timeline);
      let total = 0;
      billingsdata?.forEach((item) => {
        total += item?.amount;
      });
      settoal(total);
      setloading(false);
    };

    if (id) {
      orders();
    }
  }, [id]);
  const [open, setopen] = useState(false);
  function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  const addBillings = async () => {
    if (!amount) {
      setamounterror(true);
      toast({
        variant: "destructive",
        title: t("p151"),
      });
      return;
    }
    if (!billingdate) {
      toast({
        variant: "destructive",
        title: t("p152"),
      });
      return;
    }
    if (!remark) {
      toast({
        variant: "destructive",
        title: t("p153"),
      });
      return;
    }
    setamounterror(false);
    const token = localStorage.getItem("token");
    const data = await createBilling(token, {
      orderId: id,
      amount: amount,
      date: billingdate,
      remark: remark,
    });
    setpop(false);
    setamount("");
    const billingsdata = await getBillingsOfOrder(token, id);
    setBillings(billingsdata);
    let total = 0;
    billingsdata.forEach((item) => {
      total += item?.amount;
    });
    settoal(total);
  };

  const handleClick = async (index) => {
    const updatedTimelines = timelines.map((item, i) => {
      if (i <= index) {
        return { ...item, completed: true };
      }
      return { ...item, completed: false };
    });
    settimelines(updatedTimelines);
    const token = localStorage.getItem("token");
    const timelinedata = await UpdateTimelines(token, {
      orderId: orders._id,
      timeline: updatedTimelines,
    });
  };

  const handleStatusChange = async (status) => {
    setSelectedStatus(status);
    setIsDropdownOpen(false);
    const token = localStorage.getItem("token");
    const updatedOrder = await updateOrderStatus(token, {
      orderId: orders._id,
      status: status,
    });
  };

  const handleOrderComplete = async (status) => {
    setcompleteload(true);
    setSelectedStatus(status);
    setIsDropdownOpen(false);
    const token = localStorage.getItem("token");
    const updatedOrder = await updateOrderStatus(token, {
      orderId: orders?._id,
      status: status,
    });
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

    const blob = base64ToBlob(base64, "application/pdf");

    const myfile = new File([blob], `${orders._id}.pdf`, {
      type: "application/pdf",
    });

    const add = await addDispatchFile(token, orders._id, myfile);
    if (add?._id) {
      toast({
        title: t("p154"),
      });
      setorders(add);
      setmarkascompletepop(false);
    }
    setcompleteload(false);
  };

  const handleUpdateInspector = async () => {
    if (inspector?._id && oldinspector?._id != inspector?._id) {
      const token = localStorage.getItem("token");
      const updatedOrder = await updateInspector(token, {
        orderId: orders._id,
        inspectorId: inspector._id,
      });
      if (updatedOrder?._id) {
        toast({
          title: t("p155"),
        });
        setoldinspector(updatedOrder);
      }
      //console.log(updatedOrder, "updated order");
    }
    setmarkascompletepop(false);
    seteditinspector(false);
  };

  const addUpdate = async () => {
    if (!updatetype) {
      toast({
        variant: "destructive",
        title: t("p156"),
      });
      return;
    }
    if (!updatemessage) {
      toast({
        variant: "destructive",
        title: t("p157"),
      });
      return;
    }
    const token = localStorage.getItem("token");
    const updatedOrder = await updateOrderMessage(token, {
      orderId: orders?._id,
      type: updatetype,
      message: updatemessage,
    });
    if (updatedOrder) {
      toast({
        title: t("p158"),
      });
    }
    //console.log(updatedOrder, "updated order");
    setupdatepop(false);
    setupupdatemessage("");
    setorders(updatedOrder);
  };
  const deleteupdate = async () => {
    const token = localStorage.getItem("token");
    const res = await Deletemessageorder(token, orders._id);
    if (res) {
      toast({
        title: t("p159"),
      });
    }
    setorders(res);
  };
  useEffect(() => {
    if (updatepop) {
      // Directly set the overflow style of the body to hidden
      document.body.style.overflow = "hidden";
    } else {
      // Reset the overflow style of the body to its default value
      document.body.style.overflow = "";
    }

    // Clean up when the component unmounts or when the pop-up closes
    return () => {
      document.body.style.overflow = "";
    };
  }, [updatepop]);
  useEffect(() => {
    if (popUp) {
      // Directly set the overflow style of the body to hidden
      document.body.style.overflow = "hidden";
    } else {
      // Reset the overflow style of the body to its default value
      document.body.style.overflow = "";
    }

    // Clean up when the component unmounts or when the pop-up closes
    return () => {
      document.body.style.overflow = "";
    };
  }, [popUp]);

  const [scrollLeft, setScrollLeft] = useState(0);

  const handleScroll = () => {
    const scrollPos = scrollContainerRef.current.scrollLeft;
    setScrollLeft(scrollPos);
  };

  useEffect(() => {
    // Delay the execution by 10 seconds
    const timer = setTimeout(() => {
      const scrollableDiv = scrollContainerRef.current;

      if (scrollableDiv) {
        // Add scroll event listener
        scrollableDiv.addEventListener("scroll", handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
          scrollableDiv.removeEventListener("scroll", handleScroll);
        };
      }
    }, 10000); // 10000 milliseconds = 10 seconds

    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array to run only once after the component mounts

  if (error) {
    return (
      <div className="   h-full w-full px-10 xl:pb-0">
        <div className="flex justify-between   items-center">
          <div className="flex items-center gap-4">
            <div className="font-Polysans font-semibold text-[1.5rem] ">
              {t("p28")}
            </div>
          </div>
          <div>
            <Navbar />
          </div>
        </div>
        <div className="font-Poppins font-semibold text-[2rem] text-center text-[#FF3F66]">
          No such order
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className=" w-full h-[100vh] flex  justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-9 w-full h-max bg-white  pt-[1.5rem]">
      {pop && (
        <>
          <div className=" w-[100vw]  backdrop-blur-[1px] bg-black/30 h-[100vh] fixed top-0 left-0 flex justify-center items-center z-[48]  "></div>
          <div className=" fixed top-0 z-[48] h-[100vh] w-full left-0 justify-center items-center flex ">
            {type == 1 || type == 2 || type == 3 ? (
              <div className=" w-[350px] bg-white relative rounded-2xl overflow-hidden z-[100] px-5 py-4 ">
                <div className=" w-full flex justify-between ">
                  <div className=" font-Polysans font-semibold w-[70%] flex justify-between items-center pb-2 text-[1.2rem] ">
                    {t("p160")}
                  </div>
                </div>
                <div className=" font-Matter pt-3 text-[#909099] ">
                  <div className=" text-[#101010] font-Matter font-medium text-[0.95rem] pb-1 ">
                    {t("p161")}
                  </div>
                  <Input
                    className=" border-[#DFDFDF] outline-none border px-3 py-2 w-full rounded-xl "
                    readOnly
                    value={amount}
                  />
                </div>
                <div className=" font-Matter pt-3 text-[#909099] ">
                  <div className=" text-[#101010] font-Matter font-medium text-[0.95rem] pb-1 ">
                    {t("p162")}
                  </div>
                  <div className=" border-[#DFDFDF] outline-none   py-0.5 w-full rounded-xl ">
                    <DatePicker dedlinedate={setbillindate} />
                  </div>
                </div>
                <div className="  font-Matter font-medium  w-full flex justify-between items-center pb-2.5 text-[0.95rem] pt-4">
                  {t("p163")}
                </div>
                <div>
                  <textarea
                    placeholder={t("p164")}
                    className=" border-[#EDEDED] outline-none  placeholder:text-[#979797] text-[0.95rem] font-Matter  min-h-[6rem] border px-2 py-1 bg-[#FFFFFF] w-full rounded-xl  "
                    onChange={(e) => setremark(e.target.value)}
                  />
                </div>
                <div className=" text-[0.9rem] flex gap-3 pt-3 justify-end ">
                  <div
                    className=" text-[#9B9B9B] cursor-pointer border border-[#EDEDED] px-4 py-2 rounded-full font-Matter font-medium "
                    onClick={() => {
                      setpop(false);
                    }}
                  >
                    {t("p78")}
                  </div>
                  <div
                    onClick={() => addBillings()}
                    className=" cursor-pointer text-[#ffffff] bg-[#205FFF] border bordeer-[#EDEDED] px-4 py-2 rounded-full font-Matter font-medium "
                  >
                    {t("p65")}
                  </div>
                </div>
              </div>
            ) : (
              <div className=" w-[350px] bg-white relative rounded-2xl overflow-hidden z-[100] px-5 py-4 ">
                <div className=" font-Polysans font-semibold flex justify-between items-center pb-2 text-[1.1rem] ">
                  {t("p58")}
                </div>
                <div className=" pt-3 text-[#101010] font-Matter font-medium text-[0.95rem] pb-1 ">
                  {t("p161")}
                </div>
                <div className=" relative  ">
                  <Input
                    placeholder={t("p190")}
                    type="number"
                    className={clsx(
                      "  w-full duration-300 font-Matter outline-none py-2 px-3 border rounded-xl ",
                      amounterror ? " border-red-400 " : "border-[#DFDFDF] "
                    )}
                    onChange={(e) => {
                      setamount(e.target.value);
                    }}
                    onClick={() => setamounterror(false)}
                    value={amount}
                  />
                  <div className=" absolute top-3 font-Matter font-medium right-3 text-[0.9rem] text-[#717171]">
                    CHF
                  </div>
                </div>
                <div className=" font-Matter pt-3   text-[#909099] ">
                  <div className=" text-[#101010] font-Matter font-medium text-[0.95rem] pb-1 ">
                    {t("p162")}
                  </div>
                  <div className=" border-[#DFDFDF] outline-none border overflow-hidden py-0.5 w-full rounded-xl ">
                    <DatePicker dedlinedate={setbillindate} />
                  </div>
                </div>
                <div className="  font-Matter font-medium  w-full flex justify-between items-center pb-2.5 text-[0.95rem] pt-4">
                  {t("p163")}
                </div>
                <div>
                  <textarea
                    placeholder={t("p164")}
                    className=" border-[#EDEDED] outline-none  placeholder:text-[#979797] text-[0.95rem] font-Matter  min-h-[6rem] border px-2 py-1 bg-[#FFFFFF] w-full rounded-xl  "
                    onChange={(e) => setremark(e.target.value)}
                  />
                </div>
                <div className=" text-[0.9rem] flex gap-3 pt-3 justify-end ">
                  <div
                    className=" text-[#9B9B9B] cursor-pointer border bordeer-[#EDEDED] px-4 py-2 rounded-full font-Matter font-medium "
                    onClick={() => {
                      setpop(false);
                    }}
                  >
                    {t("p78")}
                  </div>
                  <div
                    onClick={() => addBillings()}
                    className=" cursor-pointer text-[#ffffff] bg-[#205FFF] border bordeer-[#EDEDED] px-4 py-2 rounded-full font-Matter font-medium "
                  >
                    {t("p65")}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {updatepop && (
        <>
          <div className=" w-[100vw]  backdrop-blur-[1px] bg-black/30 h-[100vh] fixed top-0 left-0 flex justify-center items-center z-[10000]  "></div>
          <div className=" fixed top-0 z-[10001] h-[100vh] w-full left-0 justify-center items-center flex ">
            <div className=" w-[350px] bg-white border-[#DBE0E6] border-[1px] relative rounded-2xl overflow-hidden z-[100] px-5 py-4 ">
              <div className=" w-full  ">
                <div className=" text-[#141415] font-Polysans font-semibold w-[100%] flex justify-between items-center pb-2 text-[1.2rem] ">
                  {t("p165")}
                  <div onClick={() => setupdatepop(false)}>
                    <Cross h={34} />
                  </div>
                </div>
                <div className="  font-Matter font-medium  w-full flex justify-between items-center pb-2.5 text-[0.95rem] pt-4">
                  {t("p166")}
                </div>
                <div>
                  <div
                    onClick={() => setupdatetypedrop(!updatetypedrop)}
                    className={clsx(
                      "  bg-[#FAFAFA] relative rounded-xl  border-[#EDEDED] border px-3 font-Matter font-medium text-[0.9rem] py-2.5 w-full justify-between flex items-center",
                      updatetype ? "" : " text-[#979797]"
                    )}
                  >
                    {" "}
                    {msg || t("p166")} <Arrowdown />
                    {updatetypedrop && (
                      <div className=" absolute text-black top-[110%] left-0 z-50 border-[#EDEDED] rounded-xl bg-white border overflow-hidden w-full ">
                        <div
                          onClick={() => {
                            setupdatetype("issue");
                            setMsg(t("p167"));
                            setupdatetypedrop(false);
                          }}
                          className=" px-3 cursor-pointer py-2 flex items-center gap-2 w-full hover:bg-[#FAFAFA] "
                        >
                          {" "}
                          <Danger color={"#000000"} /> {t("p167")}{" "}
                        </div>
                        <div
                          onClick={() => {
                            setupdatetype("information");
                            setMsg(t("p168"));
                            setupdatetypedrop(false);
                          }}
                          className=" px-3 py-2 cursor-pointer flex items-center gap-2 w-full hover:bg-[#FAFAFA] "
                        >
                          {" "}
                          <Info color={"#000000"} /> {t("p168")}{" "}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="  font-Matter font-medium  w-full flex justify-between items-center pb-2.5 text-[0.95rem] pt-4">
                  {t("p169")}
                </div>
                <div>
                  <textarea
                    placeholder={t("p195")}
                    className=" border-[#EDEDED] outline-none  placeholder:text-[#979797] text-[0.9rem] font-Matter font-medium min-h-[6rem] border px-2 py-1 bg-[#FAFAFA] w-full rounded-xl  "
                    onChange={(e) => setupupdatemessage(e.target.value)}
                  />
                </div>
              </div>
              <div className=" text-[0.9rem] flex gap-3 pt-3 justify-end ">
                <div
                  className=" text-[#9B9B9B] cursor-pointer border bordeer-[#EDEDED] px-4 py-2 rounded-full font-Matter font-medium "
                  onClick={() => {
                    setupdatepop(false);
                    setupdatetype("");
                    setupupdatemessage("");
                  }}
                >
                  {t("p78")}
                </div>
                <div
                  onClick={() => addUpdate()}
                  className=" cursor-pointer text-[#ffffff] bg-[#205FFF] border bordeer-[#EDEDED] px-4 py-2 rounded-full font-Matter font-medium "
                >
                  {t("p65")}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {markascompletepop && (
        <>
          <div className=" w-[100vw]  backdrop-blur-[1px] bg-black/30 h-[100vh] fixed top-0 left-0 flex justify-center items-center z-[48]  "></div>
          <div className=" fixed top-0 z-[48] h-[100vh] w-full left-0 justify-center items-center flex ">
            <div className=" w-[450px] pt-8 bg-white px-8 rounded-2xl pb-6 ">
              <div className="text-[#101010] font-Matter font-medium text-center text-[0.95rem] ">
                {t("p170")}
              </div>
              <div className=" text-[#595959] text-[0.9rem] font-Matter text-center font-medium w-[90%] mx-auto ">
                {t("p171")}
              </div>
              <div className=" text-[0.9rem] flex gap-3 pt-8 justify-center ">
                <div
                  className=" text-[#9B9B9B] cursor-pointer border border-[#EDEDED] px-4 py-2 rounded-full font-Matter font-medium "
                  onClick={() => {
                    setmarkascompletepop(false);
                  }}
                >
                  {t("p78")}
                </div>
                <div
                  onClick={() => handleOrderComplete("completed")}
                  className=" cursor-pointer flex justify-center items-center text-[#ffffff] bg-[#205FFF] w-[150px]  py-2 rounded-full font-Matter font-medium "
                >
                  {completeload ? (
                    <span className=" loader " />
                  ) : (
                    "Mark as complete"
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="px-10 w-full  font-Polysans">
        <div className="flex justify-between pt-4 pb-16 items-center">
          <div className="flex items-center gap-4">
            <div>
              {" "}
              <Arrowleft />
            </div>
            <div className="text-[1.5rem] font-semibold font-Polysans">
              {t("p9")} #{orders?.ordernumber}
            </div>
          </div>
          <div>
            <Navbar />
          </div>
        </div>
        <div className="flex bg-[#F7F8F9] border border-[#E5EAEF] rounded-[40px] justify-between font-Polysans font-semibold px-6 py-6 items-center ">
          <div className="flex items-center gap-4">
            <div>
              <Orders />
            </div>
            <div>
              <div className="text-[0.95rem]">
                {t("p28")} #{orders?.quote?.quotenumber}
              </div>
              <div className="flex items-center gap-2 pt-2">
                <div className="text-[#838486] font-normal font-Matter text-[0.875rem] leading-none">
                  {t("p60")}
                </div>
                <div class="text-[#000000] text-[0.95rem] font-Polysans font-semibold leading-none">
                  {t("p9")} #{orders?.ordernumber}
                </div>
              </div>
            </div>
          </div>
          <Link
            href={`/dashboard/quotedetails?id=${orders?.quote?._id}`}
            target="#"
          >
            <div className="text-[0.875rem] cursor-pointer  font-medium  font-Matter  bg-[#FFFFFF] rounded-[42px] border border-[#E5EAEF] px-4 py-2 flex items-center">
              {t("p30")}
            </div>
          </Link>
        </div>
        <div className="py-8 w-full ">
          <div className="bg-[#FEFEFF] border w-full border-[#E5EAEF]  rounded-[40px] px-8 py-4 pb-6 relative">
            <div className="flex justify-between">
              <div className="flex gap-4 items-center">
                <div className="text-[1.5rem] font-semibold ">{t("p10")}</div>
                {orders?.status != "completed" && (
                  <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={clsx(
                      " relative rounded-[42px] cursor-pointer w-[140px] bg-white border-[#E5EAEF] border  flex gap-2 items-center text-[0.875rem] justify-center text-center font-medium font-Matter leading-none h-[44px] py-2"
                    )}
                  >
                    {selectedStatus == "On time" ? t("p62") : t("p61")}{" "}
                    <motion.div
                      className=" duration-100 "
                      initial={{
                        rotate: "180deg",
                      }}
                      animate={{
                        rotate: isDropdownOpen ? "180deg" : "0deg",
                        // paddingTop: open ? "12px" : 0,
                      }}
                    >
                      <Arrowdown h={20} />
                    </motion.div>
                    <div
                      className={clsx(
                        "  absolute duration-0 right-0 mt-2 top-[100%]  w-full overflow-hidden rounded-md  bg-white ",
                        isDropdownOpen ? " h-max  " : " h-0"
                      )}
                    >
                      <div className="py-1">
                        {selectedStatus === "On time" ? (
                          <div
                            className="  px-4  h-[40px] border border-[#E5EAEF] font-Matter font-medium text-[0.875rem] flex items-center justify-center text-black rounded-full  w-full text-center"
                            onClick={() => handleStatusChange("Delay")}
                          >
                            {t("p61")}
                          </div>
                        ) : (
                          <div
                            className="border border-[#E5EAEF]  flex justify-center  items-center  font-Matter font-medium  h-[40px]   text-[0.875rem] w-full px-4  text-center rounded-full"
                            onClick={() => handleStatusChange("On time")}
                          >
                            {t("p62")}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <div
                  className={clsx(
                    "text-[0.875rem] select-none font-medium gap-2 font-Matter  bg-[#FFFFFF] rounded-[42px] border border-[#E5EAEF] px-4 py-3 flex items-center cursor-pointer  "
                  )}
                  onClick={() => setopen(!open)}
                >
                  {t("p63")}
                  <motion.div
                    className=" duration-100 "
                    initial={{
                      rotate: "180deg",
                    }}
                    animate={{
                      rotate: open ? "180deg" : "0deg",
                      // paddingTop: open ? "12px" : 0,
                    }}
                  >
                    <Arrowdown h={20} />
                  </motion.div>
                </div>

                <div
                  className={clsx(
                    " absolute top-[130%]   rounded-xl  z-[1000] border border-[#ECECEC]  bg-[#FFFFFF] right-0 transition-height  w-full",
                    open
                      ? " h-[200px] border-[#ECECEC] overflow-y-scroll "
                      : " overflow-hidden h-0 border-transparent "
                  )}
                >
                  <div className="h-max overflow-hidden">
                    <div className=" text-[#717171] cursor-pointer text-[0.8rem] font-Matter   ">
                      {timelines?.map((item, index) => (
                        <div
                          className=" flex gap-3  hover:bg-[#F7F8F9] px-3 w-full py-2.5 items-center"
                          onClick={() => handleClick(index)}
                        >
                          <div>
                            {item?.completed ? (
                              <Submit color={"#0EB75C"} />
                            ) : (
                              <Start />
                            )}
                          </div>
                          <div className=" w-full truncate ">{item?.title}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {open && (
                  <div
                    onClick={() => setopen(false)}
                    className="fixed left-0 top-0 bg-[#0000000] h-screen w-screen z-10"
                  ></div>
                )}
              </div>
            </div>
            <div
              onMouseDown={onMouseDown}
              onMouseLeave={onMouseLeave}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
              id="scrollable-div"
              ref={scrollContainerRef}
              className="flex w-full overflow-x-auto max-w-full pt-16 cursor-grab   "
            >
              <div className="  flex select-none w-max ">
                {loading ? (
                  <>
                    <div className="w-full">
                      <Orderdetailsskeleton />
                    </div>
                  </>
                ) : (
                  orders &&
                  timelines?.map((order, index, array) => (
                    <div key={index} className=" w-[15rem] ">
                      <div className="flex items-center">
                        <div
                          className={clsx(
                            "w-2 h-2 rounded-full  ",
                            timelines[index]?.completed
                              ? " bg-black "
                              : " bg-gray-300 "
                          )}
                        ></div>
                        {timelines.length - 1 != index && (
                          <div className=" relative bg-gray-200 h-[2px] w-full">
                            {timelines[index + 1]?.completed && (
                              <div className="h-[2px] w-full bg-black  absolute "></div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="text-[0.9375rem] font-semibold font-Matter text-[#1D1D1F] pt-4">
                        {order?.title}
                      </div>
                      <div className="text-[#909099] font-semibold text-[0.9375rem] font-Matter">
                        {order?.dueDate
                          ? formatDateAndTime(order?.dueDate).date
                          : "-"}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            {orders?.message ? (
              <div className=" pt-12 w-full  ">
                {orders?.message?.type == "issue" ? (
                  <div className=" w-full bg-[#FFF7F7] border border-[#EACFCF] rounded-2xl flex gap-4 justify-between items-center px-4 py-4 ">
                    <div className="flex gap-4">
                      <Danger />
                      <div className=" flex font-Matter text-[1rem] text-[#FF4D40] ">
                        {orders?.message?.message}
                      </div>
                    </div>
                    <div onClick={() => deleteupdate()}>
                      <Delete />
                    </div>
                  </div>
                ) : (
                  <div className=" w-full bg-[#F7F8F9] border border-[#E5EAEF] rounded-2xl flex gap-4 justify-between items-center px-4 py-4 ">
                    <div className="flex gap-4">
                      <Info />
                      <div className=" flex font-Matter text-[1rem] text-[#1D1D1F] ">
                        {orders?.message?.message}
                      </div>
                    </div>
                    <div onClick={() => deleteupdate()}>
                      <Delete color={"#1D1D1F"} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                onClick={() => setupdatepop(!updatepop)}
                className=" cursor-pointer font-Matter font-medium w-max rounded-full flex gap-2 items-center border px-5 py-2.5 border-[#D6DCE2] mt-12 "
              >
                <Flag /> {t("p165")}
              </div>
            )}
            <div className="  h-[80px] w-[120px] absolute z-40 top-[39.5%] right-[30px] flex">
              <div className="bg-white w-[5%] h-full opacity-5"></div>
              <div className="bg-white w-[5%] h-full opacity-10"></div>
              <div className="bg-white w-[5%] h-full opacity-15"></div>
              <div className="bg-white w-[5%] h-full opacity-20"></div>
              <div className="bg-white w-[5%] h-full opacity-25"></div>
              <div className="bg-white w-[5%] h-full opacity-30"></div>
              <div className="bg-white w-[5%] h-full opacity-35"></div>
              <div className="bg-white w-[5%] h-full opacity-40"></div>
              <div className="bg-white w-[5%] h-full opacity-45"></div>
              <div className="bg-white w-[5%] h-full opacity-50"></div>
              <div className="bg-white w-[5%] h-full opacity-55"></div>
              <div className="bg-white w-[5%] h-full opacity-60"></div>
              <div className="bg-white w-[5%] h-full opacity-65"></div>
              <div className="bg-white w-[5%] h-full opacity-70"></div>
              <div className="bg-white w-[5%] h-full opacity-75"></div>
              <div className="bg-white w-[5%] h-full opacity-80"></div>
              <div className="bg-white w-[5%] h-full opacity-85"></div>
              <div className="bg-white w-[5%] h-full opacity-90"></div>
              <div className="bg-white w-[5%] h-full opacity-95"></div>
              <div className="bg-white w-[5%] h-full opacity-100"></div>
            </div>
            <div
              className={` h-[80px] w-[120px] absolute z-40 top-[39%] flex left-[30px] transition-all duration-200 ${
                scrollLeft > 100 ? " opacity-100" : " opacity-0"
              }`}
            >
              <div className="bg-white w-[5%] h-full opacity-100"></div>
              <div className="bg-white w-[5%] h-full opacity-95"></div>
              <div className="bg-white w-[5%] h-full opacity-90"></div>
              <div className="bg-white w-[5%] h-full opacity-85"></div>
              <div className="bg-white w-[5%] h-full opacity-80"></div>
              <div className="bg-white w-[5%] h-full opacity-75"></div>
              <div className="bg-white w-[5%] h-full opacity-70"></div>
              <div className="bg-white w-[5%] h-full opacity-65"></div>
              <div className="bg-white w-[5%] h-full opacity-60"></div>
              <div className="bg-white w-[5%] h-full opacity-55"></div>
              <div className="bg-white w-[5%] h-full opacity-50"></div>
              <div className="bg-white w-[5%] h-full opacity-45"></div>
              <div className="bg-white w-[5%] h-full opacity-40"></div>
              <div className="bg-white w-[5%] h-full opacity-35"></div>
              <div className="bg-white w-[5%] h-full opacity-30"></div>
              <div className="bg-white w-[5%] h-full opacity-25"></div>
              <div className="bg-white w-[5%] h-full opacity-20"></div>
              <div className="bg-white w-[5%] h-full opacity-15"></div>
              <div className="bg-white w-[5%] h-full opacity-10"></div>
              <div className="bg-white w-[5%] h-full opacity-5"></div>
            </div>
          </div>
        </div>

        <div className="bg-[#FEFEFF] border border-[#E5EAEF]  rounded-[40px] px-8 py-7 mb-6 ">
          <div className="text-[1.5rem] font-semibold flex justify-between w-full  font-Polysans">
            {t("p143")}
            {editinspector && (
              <div
                onClick={() => handleUpdateInspector()}
                className=" cursor-pointer bg-[#205FFF] px-4 py-2 text-white text-[0.9rem] font-Matter font-medium rounded-full "
              >
                {t("p172")}
              </div>
            )}
          </div>
          {editinspector ? (
            <div className=" w-full flex gap-2 mt-5 ">
              <div
                onClick={() => {
                  setinspectordrop(!inspectordrop);
                }}
                className={clsx(
                  " border select-none relative cursor-pointer font-Matter  bg-[#FAFAFA] w-[40%] rounded-xl py-2.5 px-3 flex justify-between   ",
                  inspector ? "" : "text-[#A1A7B0]"
                )}
              >
                {inspector?.name || "Choose inspector"}{" "}
                <motion.div
                  className=" duration-100 "
                  initial={{
                    rotate: "180deg",
                  }}
                  animate={{
                    rotate: inspectordrop ? "180deg" : "0deg",
                    // paddingTop: open ? "12px" : 0,
                  }}
                >
                  <Arrowdown h={20} />
                </motion.div>
                {inspectordrop && (
                  <div className=" absolute top-[110%] w-full left-0 bg-white border border-[#E5EAEF] rounded-xl overflow-hidden ">
                    {inspectors &&
                      inspectors?.map((inspector) => (
                        <div
                          onClick={() => setinspector(inspector)}
                          className=" px-3 py-2 text-black font-Matter capitalize cursor-pointer hover:bg-[#FAFAFA] "
                        >
                          {inspector?.name}
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
          ) : (
            <div className=" flex gap-5 pt-5 ">
              <div className=" flex capitalize items-center gap-2 text-[0.9rem] text-[#1D1D1F] font-Matter font-medium ">
                <Inspectorprofile /> {inspector?.name}
              </div>
              {orders?.status != "completed" && (
                <div
                  onClick={() => seteditinspector(true)}
                  className=" flex gap-2 items-center font-Matter font-medium cursor-pointer border border-[#D6DCE2] text-[0.9rem] rounded-full px-3.5 py-2 "
                >
                  <Editpencil />
                  {t("p173")}
                </div>
              )}
            </div>
          )}
        </div>
        <div className=" pb-24">
          <div className="bg-[#FEFEFF] border border-[#E5EAEF]  rounded-[40px] px-8 py-4 ">
            <div className="  flex justify-between w-full items-center">
              <div className="text-[1.5rem] font-semibold ">{t("p64")}</div>
              <div className=" flex gap-5 items-center ">
                <div className=" text-[#8F8F8F] font-Matter font-medium text-[1.1rem] ">
                  Order Total :{" "}
                  <span className=" text-black ">
                    CHF{" "}
                    {orders?.quote?.discountAdded
                      ? orders?.quote?.discountedTotal
                      : orders?.quote?.total}
                  </span>
                </div>

                <div
                  className={clsx(
                    " relative select-none border border-[#E5EAEF] flex justify-center items-center gap-3 px-7 text-[0.95rem] font-Matter font-medium py-2 rounded-full ",
                    Number(
                      orders?.quote?.discountAdded
                        ? orders?.quote?.discountedTotal
                        : orders?.total
                    ) > total
                      ? "   cursor-pointer "
                      : " cursor-not-allowed opacity-50 "
                  )}
                  onClick={() => {
                    Number(
                      orders?.quote?.discountAdded
                        ? orders?.quote?.discountedTotal
                        : orders?.total
                    ) > total
                      ? setstatusopen(!statusopen)
                      : "";
                  }}
                >
                  {t("p65")}
                  <motion.div
                    className=" duration-100 "
                    initial={{
                      rotate: "180deg",
                    }}
                    animate={{
                      rotate: statusopen ? "180deg" : "0deg",
                      // paddingTop: open ? "12px" : 0,
                    }}
                  >
                    <Arrowdown h={20} />
                  </motion.div>
                  <div
                    className={clsx(
                      " w-full absolute left-0 -top-[460%] xl:top-[100%] overflow-hidden h-[230ppx] z-[10000] ",
                      !statusopen
                        ? " scale-y-0 origin-bottom xl:origin-top duration-250 "
                        : " duration-250  scale-y-100 xl:origin-top origin-bottom "
                    )}
                  >
                    <div className=" text-[#717171] border border-[#ECECEC] text-[0.9rem] bg-white overflow-hidden mt-1 rounded-2xl w-full font-Matter grid ">
                      {Number(
                        orders?.quote?.discountAdded
                          ? orders?.quote?.discountedTotal
                          : orders?.total
                      ) /
                        4 >
                        total && (
                        <div
                          onClick={() => {
                            setstatusopen(false);
                            setpop(true);
                            settype(1);
                            setamount(
                              Number(
                                orders?.quote?.discountAdded
                                  ? orders?.quote?.discountedTotal
                                  : orders?.total
                              ) /
                                4 -
                                total
                            );
                          }}
                          className=" flex gap-2 items-center cursor-pointer hover:bg-[#F7F8F9] px-3 py-2.5 w-full "
                        >
                          <Quater /> {t("p43")}
                        </div>
                      )}
                      {Number(
                        orders?.quote?.discountAdded
                          ? orders?.quote?.discountedTotal
                          : orders?.total
                      ) /
                        2 >
                        total && (
                        <div
                          onClick={() => {
                            setstatusopen(false);
                            setpop(true);
                            settype(2);
                            setamount(
                              Number(
                                orders?.quote?.discountAdded
                                  ? orders?.quote?.discountedTotal
                                  : orders?.total
                              ) /
                                2 -
                                total
                            );
                          }}
                          className=" flex gap-2 items-center cursor-pointer hover:bg-[#F7F8F9] px-3 py-2.5 w-full "
                        >
                          <Half /> {t("p44")}
                        </div>
                      )}
                      {Number(
                        orders?.quote?.discountAdded
                          ? orders?.quote?.discountedTotal
                          : orders?.total
                      ) > total && (
                        <div
                          onClick={() => {
                            setpop(true);
                            setstatusopen(false);
                            settype(3);
                            setamount(
                              Number(
                                orders?.quote?.discountAdded
                                  ? orders?.quote?.discountedTotal
                                  : orders?.total
                              ) - total
                            );
                          }}
                          className=" flex gap-2 items-center cursor-pointer hover:bg-[#F7F8F9] px-3 py-2.5 w-full "
                        >
                          <Full /> {t("p45")}
                        </div>
                      )}
                      <div
                        onClick={() => {
                          setstatusopen(false);
                          setpop(true);
                          settype(4);
                          setamount("");
                        }}
                        className=" flex gap-2 items-center cursor-pointer hover:bg-[#F7F8F9] px-3 py-2.5 w-full "
                      >
                        <span className=" text-black text-[0.8rem] ">CHF</span>{" "}
                        {t("p46")}
                      </div>
                    </div>
                  </div>
                  {statusopen && (
                    <div
                      onClick={() => setopen(false)}
                      className="fixed left-0 top-0 bg-[#0000000] h-screen w-screen z-10"
                    ></div>
                  )}
                </div>
              </div>
            </div>
            {billings?.map((billing) => (
              <div className="flex  rounded-[40px] justify-between font-Polysans font-semibold px-1 py-6 pt-8 items-center ">
                <div className="flex items-center gap-4">
                  <div>
                    <Note />
                  </div>
                  <div>
                    <div className="text-[1.0675rem] flex items-center gap-4">
                      {t("p66")} #{billing?._id.slice(19, 24)}
                      {billing?.remark && (
                        <Alert text={`Remark: ${billing?.remark}`}>
                          <Info />
                        </Alert>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-[#838486] font-normal font-Matter text-[0.9375rem]">
                        {formatDateAndTime(billing?.createdAt).date}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="   ">
                  <div className="text-[#595959] font-normal text-[0.9375rem] ">
                    {t("p67")}
                  </div>
                  <div className=" font-medium font-Matter text-[1.195rem]">
                    CHF {Math.round(billing?.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 sticky bottom-20 xl:bottom-0 right-[40px] justify-between py-5 bg-white ">
          <div className=" flex gap-4 items-center ">
            <div
              className={`text-[#909099] ${
                currentLocale == "en"
                  ? " text-[0.95rem] xl:text-[1rem]"
                  : "text-[0.95rem] xl:text-[1rem]"
              } w-max  font-Matter font-normal `}
            >
              <span
                className={` text-[0.95rem] xl:text-[1rem] ${
                  currentLocale == "en" ? " lg:hidden " : " xl:hidden "
                }`}
              >
                {" "}
                {t("p283")}{" "}
              </span>
              <span
                className={`text-[0.95rem] xl:text-[1rem] ${
                  currentLocale == "en"
                    ? "lg:block hidden "
                    : " hidden xl:block "
                }`}
              >
                {" "}
                {t("p68")}{" "}
              </span>
            </div>
            <Link href={`/dashboard/chat?id=${chatId}`}>
              <div
                className={`bg-[#FFFFFF] border-[#000000] border  font-medium font-Matter   rounded-[42px] ${
                  currentLocale == "en"
                    ? "px-6 xl:px-8 xl:py-4 py-3 text-[0.95rem] xl:pb-[18px]"
                    : "px-4 py-3 xl:px-8 text-[0.95rem] xl:py-4 xl:text-[0.95rem]"
                } `}
              >
                <span
                  className={`text-[0.95rem] xl:text-[1rem] ${
                    currentLocale == "en" ? " lg:hidden " : " xl:hidden "
                  }`}
                >
                  {" "}
                  {t("p282")}{" "}
                </span>
                <span
                  className={`text-[0.95rem] xl:text-[1rem] ${
                    currentLocale == "en"
                      ? "lg:block hidden "
                      : " hidden xl:block "
                  }`}
                >
                  {" "}
                  {t("p69")}{" "}
                </span>
              </div>
            </Link>
          </div>
          {selectedStatus == "completed" ? (
            <div className=" flex gap-4 font-Matter ">
              {orders?.dispatchfile && (
                <Link
                  target="#"
                  href={`https://media.polycolor.ch/polycolor-media/${orders?.dispatchfile}`}
                >
                  <div className=" text-[#205FFF] border-[#205FFF] cursor-pointer border rounded-full flex gap-2 items-center px-7 py-4 ">
                    <Smalldownload />
                    <span
                      className={`text-[0.95rem] xl:text-[1rem] ${
                        currentLocale == "en" ? " lg:hidden " : " xl:hidden "
                      }`}
                    >
                      {" "}
                      {t("p284")}{" "}
                    </span>
                    <span
                      className={`text-[0.95rem] xl:text-[1rem] ${
                        currentLocale == "en"
                          ? "lg:block hidden "
                          : " hidden xl:block "
                      }`}
                    >
                      {" "}
                      {t("p174")}{" "}
                    </span>
                  </div>
                </Link>
              )}
              <div className=" bg-[#F1F2F3] text-[#5D6269] rounded-full flex gap-2 items-center px-7 py-4 ">
                <Tick />
                <span
                  className={`text-[0.95rem] xl:text-[1rem] ${
                    currentLocale == "en" ? " lg:hidden " : " xl:hidden "
                  }`}
                >
                  {" "}
                  {t("p180")}{" "}
                </span>
                <span
                  className={`text-[0.95rem] xl:text-[1rem] ${
                    currentLocale == "en"
                      ? "lg:block hidden "
                      : " hidden xl:block "
                  }`}
                >
                  {" "}
                  {t("p175")}{" "}
                </span>
              </div>
            </div>
          ) : (
            <div
              onClick={() => setmarkascompletepop(true)}
              className="bg-[#205FFF] flex gap-2 items-center cursor-pointer text-white  text-[0.95rem] font-medium font-Matter px-4 xl:px-8 py-3 xl:py-4 xl:pb-[18px] rounded-[42px]"
            >
              <Tick color={"#FFFFFF"} />
              <div className="flex justify-center">{t("p280")}</div>
            </div>
          )}
        </div>
      </div>
      {orders?.status != "completed" && (
        <div className="border-[1px] absolute -z-50   -top-[100%] py-[1rem] border-[#F1F1F1] shadow-md ">
          <div id="content" className=" px-[1rem] ">
            <div className=" bg-[#181818] px-[1rem]  py-6 ">
              <div className=" text-[2.75rem] flex justify-between pb-5 leading-none text-white font-Polysans font-semibold ">
                <div>
                  <div className="pb-5 text-[1.5rem] ">{t("p177")}</div>
                  <div className=" text-[#C6C6C6] text-[0.95rem] font-Matter font-medium ">
                    #{orders?.ordernumber}
                  </div>
                </div>
                <div>polycolor</div>
              </div>
              <div className=" text-[#C6C6C6] font-Matter  flex  justify-between py-8 ">
                <div>
                  <div>
                    <div className=" text-[#C6C6C6] text-[0.95rem] font-Matter   pb-10 ">
                      <div className=" font-Polysans text-[1.1rem] text-[#FFFFFF] pb-2 ">
                        {t("p178")}
                      </div>
                      <div>Polycolor</div>
                      <div>{t("p83")}: +41 798881212</div>
                      <div>{t("p98")}: info@polycolor.com</div>
                    </div>
                    <div className=" flex gap-8 ">
                      <div>
                        <div className=" font-Polysans  text-white text-[1.1rem] ">
                          {t("p179")}
                        </div>
                        <div className=" pt-1">
                          {" "}
                          {formatDateAndTime(orders?.createdAt).formatted}{" "}
                        </div>
                      </div>
                      <div className="  ">
                        <div className=" font-Polysans  text-white text-[1.1rem] ">
                          {t("p180")}
                        </div>
                        <div className=" pt-1">
                          {formatDateAndTime(new Date()).formatted}{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" text-right ">
                  <div className=" font-Polysans font-medium text-white text-[1.1rem] ">
                    {t("p81")}
                  </div>
                  <div className=" pt-1">
                    {orders?.quote?.billingAddress?.username}
                  </div>
                  <div>
                    {t("p99")}: +41 {orders?.quote?.billingAddress?.phone}
                  </div>
                  <div>
                    {t("p98")}: {orders?.quote?.billingAddress?.email}
                  </div>
                </div>
              </div>
            </div>
            <div className=" pb-6 pt-10 font-Polysans font-semibold flex gap-10 w-full ">
              <div className="  w-[5%]"></div>
              <div className="  w-[45%]">{t("p87")}</div>
              <div className=" flex justify-end pr-8 w-[50%]   ">
                <div className=" text-center">{t("p89")} </div>
              </div>
            </div>
            <div className=" w-full   border-t-[1px] pt-6 border-black grid gap-10">
              {orders?.quote?.items?.map((item, index) => (
                <div className="flex gap-10 w-full" key={index}>
                  <div className=" font-Polysans font-semibold w-[5%]">
                    {index < 9 && "0"}
                    {index + 1}.
                  </div>
                  <div className=" text-[#424242] font-Matter font-medium w-[45%]">
                    {item?.name || "---"}
                    <div className=" font-Matter  font-normal text-[#424242] text-[0.85rem]">
                      {item?.description}
                    </div>
                  </div>
                  <div className=" flex justify-end text-[#3E3E3E] font-Matter pr-8 gap-5 font-medium w-[50%]">
                    <div className="  text-center">{item?.quantity}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="page-break-inside-avoid font-Polysans font-semibold flex justify-between py-10 pt-32">
              <div className=" w-[80%]">
                <div className=" w-[350px] h-[150px] border border-[#000000] font-Matter font-medium mb-7 flex justify-center pb-2 text-[#A5A5A5] items-end ">
                  {t("p181")}
                </div>
                <div className=" font-Matter text-[#424242] font-normal text-[0.9rem] ">
                  {t("p182")}
                </div>
              </div>
            </div>
            <div className="page-break-inside-avoid text-center font-Polysans mt-10 font-semibold text-[1.1rem] py-4">
              {t("p95")}
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
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
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
                if (name && email) {
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

export default Orderdetails;
