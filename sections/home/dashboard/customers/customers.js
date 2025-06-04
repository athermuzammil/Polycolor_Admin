"use client";
import Navbar from "@/components/navbar";
import Arrowleft from "@/public/icons/arrowleft";
import React, { useEffect, useState } from "react";
import Allcustomers from "@/components/allcustomers";
import Orderslistskeleton from "@/components/orderslistskeleton";
import getAllCustomers from "@/api/getallcustomers";
import CustomerCard from "@/components/customercard";
import { useCurrentLocale, useI18n } from "@/locales/client";
import CustomerCard2 from "@/components/customercard2";

const Customers = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");
      const data = await getAllCustomers(token);
      if (data) {
        setdata(data);
        setloading(false);
      }
      //console.log(data, "data");
    };
    getData();
  }, []);
  return (
    <div className="px-10 py-[1rem]">
      <div className="flex justify-between pb-5 items-center">
        <div className="flex gap-4 items-center">
          <div>
            {" "}
            <Arrowleft />
          </div>
          <div className="text-[1.5rem] font-semibold font-Polysans">
            {t("p14")}
          </div>
        </div>
        <div>
          <Navbar />
        </div>
      </div>
      <>
        {
          <div className="py-[1rem]">
            <div className=" bg-[#F7F8F9] border-[1px] border-[#E5EAEF] p-3 lg:p-6  rounded-[40px]   flex flex-col gap-4">
              {loading ? (
                <>
                  <Orderslistskeleton />
                  <Orderslistskeleton />
                  <Orderslistskeleton />
                  <Orderslistskeleton />
                  <Orderslistskeleton />
                </>
              ) : (
                data?.map((cus) => (
                  <CustomerCard2
                    uid={cus._id}
                    id={cus.chatId}
                    Name={cus.name}
                    mail={cus.email}
                    quotes={cus.quotes}
                    orders={cus.orders}
                  />
                ))
              )}
            </div>
          </div>
        }
      </>
    </div>
  );
};

export default Customers;
