"use client";
import Getsingleinspector from "@/api/getsingleinspector";
import { getToken } from "@/api/getToken";
import Inspectororder from "@/components/inspectororder";
import Navbar from "@/components/navbar";
import Orderlist from "@/components/orderlist";
import Orderslistskeleton from "@/components/orderslistskeleton";
import Spinner from "@/components/spinner";
import { useCurrentLocale, useI18n } from "@/locales/client";
import Inspecicon from "@/public/icons/inspecicon";
import clsx from "clsx";
import { format, parseISO } from "date-fns";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Singleinspector = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const [loading, setLoading] = useState(true);
  const params = useSearchParams();
  const [data1, setData1] = useState();
  const [tab, setTab] = useState(1);
  const id = params.get("id");
  const token = getToken();
  const [error, seterror] = useState(false);
  const [completes, setcompleted] = useState();
  const [notcompleted, setnotcompleted] = useState();

  useEffect(() => {
    const getData = async () => {
      const res = await Getsingleinspector(token, id);
      if (res?.error) {
        seterror(true);
        return;
      }
      //console.log(res, "ressssss");
      setData1(res);
      const cdata = res.orders.filter(
        (order) => order.order.status === "completed"
      );
      setcompleted(cdata);
      const ddata = res.orders.filter(
        (order) => order.order.status !== "completed"
      );
      setnotcompleted(ddata);
      setLoading(false);
      //console.log(cdata,"cdata")
    };
    getData();
  }, []);

  function formatDate(isoDate) {
    const date = parseISO(isoDate);

    // Ensure the input is a valid date
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    return format(date, "dd-MM-yyyy");
  }

  function formatPrice(price) {
    if (price < 1000) {
      return price.toString();
    } else {
      // Convert the price to 'k' format if greater than or equal to 1000
      return (price / 1000).toFixed(1) + "k";
    }
  }

  if (error) {
    return (
      <div className="   h-full w-full px-10">
        <div className="flex justify-between   items-center">
          <div className="flex items-center gap-4">
            <div className="font-Polysans font-semibold text-[1.5rem] ">
              {t("p194")}
            </div>
          </div>
          <div>
            <Navbar />
          </div>
        </div>
        <div className="font-Poppins font-semibold text-[2rem] text-center text-[#FF3F66]">
          No such customer
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
    <div className=" w-full px-9 py-[2rem] ">
      <div className="flex w-full justify-between pb-5 items-center">
        <div className="flex gap-4 items-center">
          <div className="text-[1.5rem] font-semibold font-Polysans">
            {t("p194")}
          </div>
        </div>
        <div>
          <Navbar />
        </div>
      </div>
      <div className=" bg-[#F7F8F9] px-6 py-4 w-full flex items-center justify-between border rounded-3xl border-[#E5EAEF] ">
        <div className=" flex items-center gap-4   ">
          <Inspecicon />
          <div className=" h-full flex flex-col items-start justify-between ">
            <div className=" font-Polysans font-semibold text-[1rem] text-black  ">
              {data1?.name}
            </div>
            <div className=" font-Matter text-[0.9rem] text-[#838486] ">
              {data1?.email}
            </div>
          </div>
        </div>
      </div>
      <div className=" flex items-start w-full py-6 font-Matter font-medium text-[0.85rem]  ">
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
            {t("p253")}
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
            {t("p249")}
          </div>
        </div>
      </div>

      <div>
        {loading ? (
          <>
            <Orderslistskeleton height={"h-[80px]"} />
            <Orderslistskeleton height={"h-[80px]"} />
            <Orderslistskeleton height={"h-[80px]"} />
          </>
        ) : tab == 1 ? (
          <>
            <div
              className={clsx(
                ` `,
                notcompleted.length > 0
                  ? "flex flex-col gap-3 w-full p-4 bg-[#F7F8F9] rounded-3xl"
                  : ""
              )}
            >
              {notcompleted.map((item) => (
                <Orderlist
                  item={item.order.name}
                  order={item.order.ordernumber}
                  status={item.order.status}
                  date={item.order.expectedcompletion}
                  cost={formatPrice(item.order.total)}
                  id={item.order._id}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div
              className={clsx(
                ` `,
                completes.length > 0
                  ? "flex flex-col gap-3 w-full p-4 bg-[#F7F8F9] rounded-3xl"
                  : ""
              )}
            >
              {completes.map((item) => (
                <Orderlist
                  item={item.order.name}
                  order={item.order.ordernumber}
                  status={item.order.status}
                  date={item.order.expectedcompletion}
                  cost={formatPrice(item.order.total)}
                  id={item.order._id}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Singleinspector;
