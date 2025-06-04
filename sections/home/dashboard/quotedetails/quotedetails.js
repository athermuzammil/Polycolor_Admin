"use client";
import Getsinglequote from "@/api/getsinglequote";
import Navbar from "@/components/navbar";
import Quotestatus from "@/components/quotestatus";
import Arrowleft from "@/public/icons/arrowleft";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";

import { useCurrentLocale, useI18n } from "@/locales/client";
import Spinner from "@/components/spinner";

const Quotedetails = () => {
  const t = useI18n();
  const [pageload, setpageload] = useState(true);
  const [error, seterror] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [data, setdata] = useState();

  const [src, setsrc] = useState();
  useEffect(() => {
    if (data?.file) {
      setsrc(`https://media.polycolor.ch/polycolor-media/${data?.file}`);
    }
  }, [data]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getQuote = async () => {
      const data = await Getsinglequote(token, id);
      if (data?.error) {
        seterror(true);
        return;
      }
      setdata(data);
      //console.log(data, "data");
      setpageload(false);
    };
    if (id) {
      getQuote();
    }
  }, []);

  if (error) {
    return (
      <div className="   h-full w-full px-10">
        <div className="flex justify-between   items-center">
          <div className="flex items-center gap-4">
            <div>
              <Arrowleft />
            </div>
            <div className="font-Polysans font-semibold text-[1.5rem] ">
              {t("p28")}
            </div>
          </div>
          <div>
            <Navbar />
          </div>
        </div>
        <div className="font-Poppins font-semibold text-[2rem] text-center text-[#FF3F66]">
          {t("p276")}
        </div>
      </div>
    );
  }

  if (pageload) {
    return (
      <div className=" w-full h-[100vh] flex  justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-10 bg-white overflow-hidden h-[100vh]">
      <div className="h-full pt-[1rem] ">
        <div className="flex justify-between   items-center">
          <div className="flex items-center gap-4">
            <div>
              <Arrowleft />
            </div>
            <div className="font-Polysans font-semibold text-[1.5rem] ">
              {t("p28")} - #{data?.quotenumber}
            </div>
          </div>
          <div>
            <Navbar />
          </div>
        </div>
        <div className="flex gap-8 w-full py-8 h-full">
          <div className="bg-[#F7F8F9] border border-[#E5EAEF] rounded-[41px] px-16 pt-16 w-[70%] h-[90%] ">
            <div className="bg-[#FFFFFF] rounded-t-[23px] min-h-full max-h-max flex justify-center overflow-y-scroll">
              {src && (
                <Worker
                  className="px-0"
                  workerUrl={`https://unpkg.com/pdfjs-dist@${process.env.NEXT_PUBLIC_PDFJS_VERSION}/build/pdf.worker.min.js`}
                >
                  <Viewer className=" w-full object-cover" fileUrl={src} />
                </Worker>
              )}
            </div>
          </div>
          <div className=" w-[30%]">
            <div className="">
              <Quotestatus
                valid={data?.validTill}
                created={data?.createdAt}
                status={data?.Status}
                id={data?._id}
                link={src}
                send={data?.send}
                link1={data?.filewithoutprice}
                data={data}

                // create={`${day}/${month}/${year}`}
              />
              {/* <div
                className={clsx(
                  " gap-6 flex w-full pt-10 pb-4",
                  data?.Status ? " hidden " : ""
                )}
              >
                <div
                  className={`w-[60%] ${
                    data?.Status
                      ? data?.Status == "Accepted"
                        ? "bg-[#1053FF] cursor-pointer"
                        : "bg-[#608CFF66] cursor-not-allowed pointer-events-none"
                      : "bg-[#618DFF] cursor-pointer"
                  }  rounded-[42px] py-3 text-center`}
                >
                  <div
                    onClick={() => setStatus("Accepted")}
                    className={` font-medium text-[#FFFFFF] text-[1rem] 
                  font-Matter`}
                  >
                    Accept
                  </div>
                </div>
                <div
                  className={`w-[40%] border border-[#E5EAEF] 
                ${
                  data?.Status
                    ? data?.Status == "Rejected"
                      ? "bg-[#FF8383] text-[#FFFFFF] cursor-pointer"
                      : "bg-[#ffFFff] text-[#00000066] cursor-not-allowed pointer-events-none"
                    : "bg-[#ffffFF] cursor-pointer"
                } rounded-[42px] py-3 text-center`}
                >
                  <div
                    onClick={() => setStatus("Rejected")}
                    className="  font-medium text-[#000000] text-[1rem] font-Matter"
                  >
                    Reject
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotedetails;
