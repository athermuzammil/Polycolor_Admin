"use client";
import GetUserById from "@/api/getUserById";
import Navbar from "@/components/navbar";
import Orderlist from "@/components/orderlist";
import Quotesid from "@/components/quotesid";
import Msgicon from "@/public/icons/msgicon";
import formatDateAndTime from "@/utils/formatDateAndTime";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Userprofile = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [user, setuser] = useState();
  const [orders, setorders] = useState();
  const [quotes, setquotes] = useState();
  const [pageload, setpageload] = useState(true);
  const [error, seterror] = useState(false);

  useEffect(() => {
    if (id) {
      const getUser = async () => {
        const token = localStorage.getItem("token");
        const res = await GetUserById(token, id);
        if (res?.error) {
          seterror(true);
          return;
        }
        setuser(res.user);
        setorders(res.orders);
        setquotes(res.quotes);
        setpageload(false);
      };
      getUser();
    }
  }, [id]);

  function calculateTimeAgo(dateString) {
    const joinDate = new Date(dateString);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 30) {
      const diffMonths = Math.floor(diffDays / 30);
      return `Joined ${diffMonths} months ago`;
    } else {
      return `Joined ${diffDays} days ago`;
    }
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
              User Profile
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

  if (pageload) {
    return (
      <div className=" flex justify-center h-[100vh] w-full  ">
        <div className="loader" />
      </div>
    );
  }

  return (
    <div className=" px-10 pt-2 ">
      <div className="flex justify-between items-center sticky top-0 left-0 bg-white pb-2 z-[100] ">
        <div className=" font-Polysans font-semibold text-[#141415] text-[1.6rem]  ">
          User Profile
        </div>
        <div className=" pt-2  w[25%]">
          <Navbar />
        </div>
      </div>
      <div className=" flex flex-col gap-6 ">
        <div className=" w-full bg-[#F7F8F9] border-[1px] border-[#E5EAEF] rounded-3xl px-8 py-8 flex gap-4 items-center ">
          <div className=" h-24 w-24 rounded-full bg-[#205FFF] flex items-center justify-center uppercase text-[2.3rem] text-white  ">
            {user?.name?.slice(0, 1)}
          </div>
          <div className=" flex flex-col gap-1 ">
            <div className=" font-Polysans text-[1.6rem] capitalize font-semibold text-[#2C2D2D] ">
              {user?.name}
            </div>
            <div className=" font-Matter text-[1rem] capitalize text-[#7C8186] ">
              {calculateTimeAgo(user?.createdAt)}
            </div>
          </div>
        </div>
        <div className=" w-full  border-[1px] border-[#E5EAEF] rounded-3xl px-8 pt-4 pb-8 flex flex-col gap-6  ">
          <div className=" font-Polysans font-semibold text-[#141415] text-[1.3rem]  ">
            Contact Info
          </div>
          <div className=" flex items-center gap-3 ">
            <Msgicon />
            <div className=" flex flex-col ">
              <div className=" font-Matter text-[0.9rem] capitalize text-[#737A82]">
                E-Mail Address
              </div>
              <div className=" font-Matter text-[1.1rem] font-medium text-[#2E303A]">
                {user?.email}
              </div>
            </div>
          </div>
        </div>
      </div>
      {orders?.length > 0 && (
        <div className=" pt-10 ">
          <div className=" font-Polysans font-semibold  text-[1.5rem] ">
            Orders
          </div>
          <div className="flex flex-col gap-4  py-6">
            {orders?.map((order) => (
              <Orderlist
                item={order.name}
                order={order.ordernumber}
                status={order.status}
                date={order.expectedcompletion}
                cost={formatPrice(order.total)}
                id={order._id}
              />
            ))}
          </div>
        </div>
      )}
      {quotes?.length > 0 && (
        <div className=" pt-10 ">
          <div className=" font-Polysans font-semibold  text-[1.5rem] ">
            Quotes
          </div>
          <div className="flex flex-wrap gap-8  py-6">
            {quotes
              ?.slice()
              .reverse()
              .map((quote, index) => (
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
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Userprofile;
