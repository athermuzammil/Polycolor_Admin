"use client";
import Getallorders from "@/api/getallorders";
import ConverttoOrder from "@/components/converttoOrder";
import Navbar from "@/components/navbar";
import Orderlist from "@/components/orderlist";
import Orderslistskeleton from "@/components/orderslistskeleton";
import { useCurrentLocale, useI18n } from "@/locales/client";
import Arrowleft from "@/public/icons/arrowleft";
import Noorders from "@/public/icons/noorders";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const [orders, setorders] = useState();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const orders = async () => {
      const token = localStorage.getItem("token");
      const data = await Getallorders(token);
      //console.log(data, "orders");
      setorders(data);
      setloading(false);
    };
    orders();
  }, []);

  function formatPrice(price) {
    if (price < 1000) {
      return price.toString();
    } else {
      // Convert the price to 'k' format if greater than or equal to 1000
      return (price / 1000).toFixed(1) + "k";
    }
  }
  return (
    <div className=" w-full max-w-full px-10 py-[1rem] pb-28 xl:pb-0">
      <div className=" w-full ">
        <div className=" w-full flex justify-between pb-6 items-center">
          <div className="flex gap-4 items-center">
            <div>
              {" "}
              <Arrowleft />
            </div>
            <div className="text-[1.5rem] font-semibold font-Polysans">
              {t("p50")}
            </div>
          </div>
          <div>
            <Navbar />
          </div>
        </div>
        <div className="bg-[#F7F8F9] border-[1px] rounded-[42px] w-full max-w-full border-[#E5EAEF] flex flex-col gap-5 p-3 lg:p-6">
          {loading ? (
            <>
              <div>
                <Orderslistskeleton />
              </div>
              <div>
                <Orderslistskeleton />
              </div>
              <div>
                <Orderslistskeleton />
              </div>
            </>
          ) : orders.length > 0 ? (
            orders?.map((order) => (
              <Orderlist
                item={order.name}
                order={order.ordernumber}
                status={order.status}
                date={order.expectedcompletion}
                cost={formatPrice(order.total)}
                id={order._id}
              />
            ))
          ) : (
            <div className=" w-full flex flex-col items-center justify-center gap-12 ">
              <Noorders />
              <div className=" font-Polysans text-[2rem] text-[#141415] font-semibold leading-none ">
                {t("p251")}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
