import SendQuoteToUser from "@/api/sendquotetouser";
import { useCurrentLocale, useI18n } from "@/locales/client";
import Download from "@/public/icons/download";
import Downloadwithouprice from "@/public/icons/downloadwithouprice";
import Downloadwithprice from "@/public/icons/downloadwithprice";
import Edit from "@/public/icons/edit";
import Tick from "@/public/icons/tick";
import formatDateAndTime from "@/utils/formatDateAndTime";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Spinner from "./spinner";
import { toast } from "./ui/use-toast";
import AddQuoteFile from "@/api/addquotefile";
import Download1 from "@/public/icons/download1";

const Quotestatus = ({
  id,
  send,
  link,
  valid,
  status,
  created,
  link1,
  data,
}) => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const [loading, setloading] = useState(false);
  const [disloading, setdisloading] = useState(false);
  const SendQuote = async () => {
    setloading(true);
    const res = await SendQuoteToUser(id);

    if (res?.error) {
      toast({
        variant: "destructive",
        title: res.error,
      });
      setloading(false);
      return;
    }

    if (res.status == true) {
      window.location.reload();
    }

    window.location.reload();
    //console.log(res);
  };
  useEffect(() => {
    //console.log(data, "ddddddddd");
  }, [data]);

  const addFile = async () => {
    setdisloading(true);
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

    if (data) {
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
      const token = localStorage.getItem("token");
      const add = await AddQuoteFile(
        token,
        data._id,
        myfile,
        true,
        Number(data?.subtotal) -
          Number(data?.subtotal) * (data?.discount / 100).toFixed(2) +
          ((Number(data?.subtotal) -
            Number(data?.subtotal) * (data?.discount / 100).toFixed(2)) *
            18) /
            100
      );
      if (add) {
        window.location.reload();
      }
    }
  };

  const [downloadpop, setdownloadpop] = useState(false);

  return (
    <div className="pb-24 xl:pb-0">
      <div className=" bg-[#F7F8F9] border overflow-hidden border-[#E5EAEF] rounded-[41px]  px-6 py-6">
        <div className="bg-[#F7F8F9]  text-[#ADAEAE] text-[1rem] font-Polysans font-normal">
          <div>{t("p106")}</div>
          <div className=" font-Matter font-medium text-[#393B3E] pt-1">
            {status ? status : send ? "Pending from user" : " Pending from you"}
          </div>
          <div className="pt-4">{t("p107")}</div>
          <div className=" font-Matter font-medium text-[#393B3E] pt-1">
            {formatDateAndTime(created).date}
          </div>
          <div className=" pt-4">{t("p108")}</div>
          <div className=" font-Matter font-medium text-[#393B3E] pt-1">
            {formatDateAndTime(valid).date}
          </div>
          {data?.discount > 0 && !data?.discountAdded && (
            <div
              onClick={() => addFile()}
              className=" text-blue-600 border-blue-600 border px-4 flex justify-center py-3 pb-3.5 w-[200px] rounded-full leading-none mt-6 cursor-pointer "
            >
              {disloading ? (
                <Spinner size={15} border={2} />
              ) : (
                "Add discount to quote"
              )}
            </div>
          )}
          <Link href={`/dashboard/editquote?id=${id}`}>
            <div
              className={` bg-[#fff] font-Matter font-medium text-[#413D3D] flex justify-center items-center mt-5 gap-2 w-full rounded-full py-3  border-[#D9DEE3] border ${
                currentLocale == "en"
                  ? "text-[1rem]"
                  : " text-[0.95rem] xl:text-[1rem]"
              }  `}
            >
              <Edit />
              {t("p109")}
            </div>
          </Link>
        </div>
      </div>
      <div className=" flex flex-col lg:flex-row gap-3 h-max font-Matter font-medium items-center mt-6 w-full ">
        {!send ? (
          <div
            onClick={() => {
              SendQuote();
            }}
            className=" bg-[#205FFF] cursor-pointer text-white text-center rounded-full h-[60px] flex items-center justify-center w-full "
          >
            {loading ? <Spinner border={true} size={22} /> : t("p110")}
          </div>
        ) : (
          <div className=" bg-[#F1F2F3] text-[#5D6269] text-center rounded-full h-[60px] flex gap-2 items-center justify-center w-full ">
            <Tick /> {t("p111")}
          </div>
        )}

        <div
          className=" relative cursor-pointer select-none "
          onClick={() => setdownloadpop(!downloadpop)}
        >
          <div className="hidden lg:block">
            <Download />
          </div>
          <div className="lg:hidden py-4 border-[#205FFF] border rounded-[42px] w-full flex justify-center items-center gap-4 px-12 lg:px-12 ">
            <Download1 />
            <div className=" font-Matter font-medium text-[1rem] text-[#205FFF]">
              Download
            </div>
          </div>
          {downloadpop && (
            <div className=" absolute top-[110%] right-0 bg-white border border-[#ECECEC] w-[250px] rounded-xl ">
              <Link href={link ? link : ""} target="#">
                <div className=" w-full flex gap-2  text-[#292D32] font-Matter text-[0.95rem] px-4 py-3 ">
                  <Downloadwithprice />
                  Download With prices
                </div>
              </Link>
              {link1 && (
                <Link
                  href={
                    link1
                      ? `https://media.polycolor.ch/polycolor-media/${link1}`
                      : ""
                  }
                  target="#"
                >
                  <div className=" w-full flex gap-2  text-[#292D32] font-Matter text-[0.95rem] px-4 py-3 ">
                    <Downloadwithouprice />
                    Download Without prices
                  </div>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="border-[1px] absolute left-0 bg-white -z-50 bottom-0 py-[1rem] border-[#F1F1F1]  ">
        <div id="content" className=" px-[1rem] ">
          <div className=" bg-[#181818] px-[1rem]  py-6 ">
            <div className=" text-[2.75rem] flex justify-between leading-none text-white font-Polysans font-semibold ">
              <div>
                <div className="pb-5 ">{t("p28")}</div>
              </div>
              <div>polycolor</div>
            </div>
            <div className=" text-[#C6C6C6] font-Matter  flex   justify-between py-8 ">
              <div className=" text-[0.95rem] ">
                <div className=" font-Polysans text-[#FFFFFF] text-[1.1rem] ">
                  From
                </div>
                <div className=" max-w-[180px] pt-2">
                  Polycolor Schönenwerd AG, Bahnhofstrasse 77, 5012 Schönenwerd
                </div>
                <div className="font-Polysans text-[#FFFFFF] text-[1.1rem] pt-6 ">
                  Contact Us on
                </div>
                <div className=" flex gap-8 pt-2 ">
                  <div>PHONE: 062 823 00 34</div>
                  <div>FAX: 062 823 00 35</div>
                </div>
              </div>
              <div className=" text-right ">
                <div className=" font-Polysans font-medium text-white text-[1.1rem] ">
                  {t("p81")}
                </div>
                <div className=" pt-1">{data?.billingAddress?.userName}</div>
                <div>
                  {t("p99")}: +41 {data?.billingAddress?.phone}
                </div>
                <div>
                  {t("p98")}: {data?.billingAddress?.email}
                </div>
                <div className=" flex items-center justify-end mt-5 gap-8 ">
                  <div>
                    <div className=" font-Polysans font-medium text-white text-[1.1rem] ">
                      {t("p100")}{" "}
                    </div>
                    <div className=" pt-1">
                      {" "}
                      {formatDateAndTime(new Date()).formatted}{" "}
                    </div>
                  </div>
                  <div className=" ">
                    <div className=" font-Polysans font-medium text-white text-[1.1rem] ">
                      {t("p101")}{" "}
                    </div>
                    <div className=" pt-1 ">
                      {formatDateAndTime(data?.validTill).formatted}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" pb-6 pt-10 font-Polysans font-semibold flex gap-10 w-full ">
            <div className="  w-[5%]"></div>
            <div className="  w-[45%]">{t("p87")}</div>
            <div className=" grid grid-cols-3 w-[50%]   ">
              <div className=" text-center ">{t("p88")} </div>
              <div className=" text-center">{t("p89")} </div>
              <div
                className="
               text-center"
              >
                {t("p90")}{" "}
              </div>
            </div>
          </div>
          <div className=" w-full   border-t-[1px] pt-6 border-black grid gap-10">
            {data?.items.map((item, index) => (
              <div className="flex gap-10 w-full" key={index}>
                <div className=" font-Polysans font-semibold w-[5%]">
                  {index < 9 && "0"}
                  {index + 1}.
                </div>
                <div className=" text-[#424242] font-Matter font-medium w-[45%]">
                  {item.name || "---"}
                  <div className=" font-Matter  font-normal text-[#424242] text-[0.85rem]">
                    {item.description}
                  </div>
                </div>
                <div className="grid grid-cols-3 text-[#3E3E3E] font-Matter gap-5 font-medium w-[50%]">
                  <div className=" text-center ">
                    CHF {item.price || "0.00"}
                  </div>
                  <div className="  text-center">{item.quantity}</div>
                  <div className="   text-black">
                    CHF {item.cost.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className=" w-full page-break-inside-avoid flex justify-end pt-20 pb-6 pr-8">
            <div className=" w-[40%] font-Matter font-semibold text-[#909099]">
              <div className=" border-t-[1px] flex justify-between  pt-1 pb-4 border-[#C3C3C3]">
                <div className=" text-[#1D1D1F]">{t("p97")}</div>
                <div className=" text-[0.95rem] ">CHF {data?.subtotal}</div>
              </div>
              {data?.discount != 0 && (
                <div className=" flex justify-between pt-2 pb-5  border-[#C3C3C3] border-t-[1px]">
                  <div>Discount {data?.discount}%</div>
                  <div className=" text-[0.95rem]">
                    CHF{" "}
                    {Number(data?.subtotal) * (data?.discount / 100).toFixed(2)}{" "}
                  </div>
                </div>
              )}
              <div className=" flex justify-between pt-2 pb-5  border-[#C3C3C3] border-y-[1px]">
                <div>GST 18%</div>
                <div className=" text-[0.95rem]">
                  CHF{" "}
                  {(
                    ((Number(data?.subtotal) -
                      Number(data?.subtotal) *
                        (data?.discount / 100).toFixed(2)) *
                      18) /
                    100
                  ).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          <div className=" page-break-inside-avoid bg-[#EEEEEE] text-[#1D1D1F] px-2 pb-5 flex justify-between items-center pt-1 font-Matter font-medium pr-7 ">
            <div>{t("p96")}</div>
            <div>
              {" "}
              CHF{" "}
              {Number(data?.subtotal) -
                Number(data?.subtotal) * (data?.discount / 100).toFixed(2) +
                ((Number(data?.subtotal) -
                  Number(data?.subtotal) * (data?.discount / 100).toFixed(2)) *
                  18) /
                  100}
            </div>
          </div>
          <div className="page-break-inside-avoid text-center font-Polysans    font-semibold text-[1.1rem] py-4">
            {t("p95")}
          </div>
          <div className="page-break-inside-avoid font-Polysans font-semibold flex justify-between py-10">
            <div className=" w-[40%]">
              <div>{t("p94")} </div>

              <div className=" font-Matter text-[#424242] font-normal text-[0.9rem] ">
                <div
                  className=" font-medium
                     "
                >
                  Visit{" "}
                  <a
                    className=" text-[#205FFF] "
                    href="https://polycolor.vercel.app"
                  >
                    www.polycolor.ch
                  </a>{" "}
                  to know more
                </div>
              </div>
            </div>
            <div>
              <div>{t("p93")} </div>
            </div>
          </div>
          <div className="page-break-inside-avoid pb-5 text-[#424242] text-[0.9rem] font-Matter ">
            <div className=" text-black font-Polysans font-semibold text-[1rem] ">
              Bank Details
            </div>
            <div className=" flex justify-around pt-4 ">
              <div>Raiffeisenbank Aarau-Lenzburg</div>
              <div>IBAN: CH76 8080 8004 5904 6640 9</div>
              <div>Konto-Nr: 50-2947-4</div>
            </div>
            <div className=" flex justify-around pt-3 ">
              <div>BIC/SWIFT: RAIFCH22698</div>
              <div>MwSt-Nr: CHE-393-861-899</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotestatus;
