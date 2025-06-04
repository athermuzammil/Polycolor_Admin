"use client";
import Getdashboarddata from "@/api/getdashboarddata";
import Dashboardskeleton from "@/components/dashboardskeleton";
import Navbar from "@/components/navbar";
import Orderlist from "@/components/orderlist";
import Orderslistskeleton from "@/components/orderslistskeleton";
import Quotescard from "@/components/quotescard";
import Sendcard from "@/components/sendcard";
import Arrowright from "@/public/icons/arrowright";
import Cross from "@/public/icons/cross";
import Order from "@/public/icons/order";
import { useUser } from "@/redux/userContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCurrentLocale, useI18n } from "@/locales/client";

const Dashboard = () => {
  const t = useI18n();
  const [dashdata, setdashdata] = useState();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const dashboard = async () => {
      const token = localStorage.getItem("token");
      const data = await Getdashboarddata(token);
      //console.log(data, "dashboard");
      setdashdata(data);
      setloading(false);
    };
    dashboard();
  }, []);
  const { state } = useUser();
  const user = state.user;
  useEffect(() => {
    //console.log(user, "userrr");
  }, [user]);

  function formatPrice(price) {
    if (price < 1000) {
      return price.toString();
    } else {
      // Convert the price to 'k' format if greater than or equal to 1000
      return (price / 1000).toFixed(1) + "k";
    }
  }
  return (
    <div className="w-full  px-9 py-[1.5rem] pb-20 lg:pb-10">
      <Navbar heading={t("p1")} className={"text-[2rem]"} />
      <div className="pt-5">
        <div className="bg-[#205FFF] rounded-[32px] lg:rounded-[39px] px-8  min-w-full ">
          <div className="">
            <div className="text-[#FFFFFF] text-[1.6rem] leading-[2rem]  lg:text-[1.9rem] lg:leading-[2.4rem]  font-semibold font-Polysans w-[400px] lg:w-[450px] pt-6 px-1 ">
              {t("p2")}
            </div>
            <div className=" flex justify-between py-6   px-1 w-full">
              <div className="text-[#D6E1FF] text-[0.92rem]  font-Matter w-[290px] lg:w-[320px] pb-3 lg:pb-2 ">
                {t("p3")}
              </div>
              <Link href={"/dashboard/quotes"}>
                <div className="bg-[#FFFFFF] h-max place-self-end px-6 py-4 text-[#205FFF] text-[0.9rem] leading-none font-Matter font-medium rounded-full text-center ">
                  {t("p4")}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gridcols-2 lg: grid-cols-3 gap-5 py-6">
        {loading ? (
          <>
            <div className="w-full">
              <Dashboardskeleton />
            </div>
            <div className="w-full">
              <Dashboardskeleton />
            </div>
            <div className="w-full">
              <Dashboardskeleton />
            </div>
          </>
        ) : (
          <>
            <Quotescard
              heading={t("p266")}
              number={dashdata?.requestedQuotes.sent}
              num2={dashdata?.requestedQuotes.total}
            />
            <Quotescard
              number={dashdata?.quotes.accepted}
              num2={dashdata?.quotes.total}
              heading={t("p267")}
            />
            <Quotescard
              number={dashdata?.quotes.rejected}
              num2={dashdata?.quotes.total}
              heading={t("p268")}
            />
          </>
        )}
      </div>
      <div className="bg-[#F7F8F9] border-[#E5EAEF] border-[1px] rounded-[32px] lg:rounded-[40px] p-3 lg:px-6 lg:py-6">
        <div className="flex justify-between pl-4 pt-4 lg:pt-0 pb-5 items-center">
          <div className="text-[#141415] font-Polysans font-semibold text-[1.4rem]">
            {t("p5")}
          </div>
          <Link href={"/dashboard/orders"}>
            <div className="flex gap-2 items-center">
              <div className="text-[#838486] text-[0.9rem] font-Matter font-medium">
                {t("p6")}
              </div>
              <div>
                <Arrowright />
              </div>
            </div>
          </Link>
        </div>
        <div className=" flex flex-col gap-4">
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
          ) : (
            dashdata?.recentorders.map((order) => (
              <Orderlist
                id={order._id}
                item={order.name}
                order={order.ordernumber}
                status={order.status}
                date={order.expectedcompletion}
                cost={formatPrice(order.total)}
              />
            ))
          )}
        </div>
      </div>

      {/* <div
        className={` fixed top-0 right-0 h-screen w-full bg-black bg-opacity-50 z-[10000] ${
          open ? "block" : "hidden"
        }  `}
      >
       
      </div> */}
      {/* <div className=" flex flex-col gap-5 ">
        <Sendcard
          type={1}
          items={22}
          date={"12/09/2024"}
          time={"22:39"}
          service={"Express Service"}
        />
        <Sendcard
          type={2}
          items={22}
          quoteNum={"#015AF0"}
          date={"12/09/2024"}
          amount={"CHF 2.200K"}
          status={"Payment pending"}
        />
        <Sendcard
          type={3}
          items={22}
          quoteNum={"#015AF0"}
          time={"22:39"}
          date={"12/09/2024"}
          service={"Express Service"}
        />
        <Sendcard
          type={4}
          items={22}
          orderNum={"#28827293"}
          time={"22:39"}
          date={"12/09/2024"}
          service={"Express Service"}
        />
      </div> */}
    </div>
  );
};

export default Dashboard;
