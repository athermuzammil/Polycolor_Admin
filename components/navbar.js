"use client";
import React, { useState } from "react";
import pro from "@/public/images/profile.png";
import Bell from "@/public/icons/bell";
import Image from "next/image";
import clsx from "clsx";
import Arrowup from "@/public/icons/arrowup";
import { useUser } from "@/redux/userContext";
import Profilebar from "./profilebar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Cross from "@/public/icons/cross";
import Getnotifications from "@/api/getAllNotifications";
import { getToken } from "@/api/getToken";
import Spinner from "./spinner";
import NotificationCard from "./readcard";
import MarkNotification from "@/api/marknotification";

const Navbar = ({ heading, className }) => {
  const [notifications, setNotifications] = useState([]);
  const token = getToken();
  const [tab, setTab] = useState(2);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getAll = async () => {
  //     const data = await Getnotifications(token);
  //     setNotifications(data);
  //     //console.log(data, "dataaaaaaa");
  //   };
  //   getAll();
  // }, []);

  // Function to format the date
  function formatDate(date) {
    const today = new Date();
    const notificationDate = new Date(date);

    const differenceInTime = today.getTime() - notificationDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays === 0) {
      return "Today";
    } else if (differenceInDays === 1) {
      return "Yesterday";
    } else {
      const options = { month: "short", day: "numeric" };
      return notificationDate.toLocaleDateString("en-US", options);
    }
  }

  // Filter notifications based on the tab
  const filteredNotifications = notifications.filter((item) =>
    tab === 1 ? item.isRead : !item.isRead
  );

  // Group notifications by date
  const groupedNotifications = filteredNotifications.reduce((groups, item) => {
    const date = formatDate(item.createdAt);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});

  const marknotify = async (id) => {
    const token = localStorage.getItem("token");
    //console.log(id, "iddd");
    const d = await MarkNotification(token, id);
    if (d?._id) {
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
    }
    //console.log(d);
  };

  const getFormattedDate1 = (timestamp) => {
    const date = new Date(timestamp);
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const getTimePassed = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diff = now - past;

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} mins ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  };

  return (
    <div className="w-full py-3 flex justify-between">
      <div
        className={clsx(
          " text-[#141415] font-Polysans font-semibold flex items-center",
          className
        )}
      >
        {heading}
      </div>
      <div className="flex items-center gap-7 w-fit">
        <div>
          <Sheet>
            <SheetTrigger>
              <div
                onClick={async () => {
                  const data = await Getnotifications(token);
                  setNotifications(data);
                  //console.log(data, "dataaaaaaa");
                  setLoading(false);
                }}
              >
                <Bell />
              </div>
            </SheetTrigger>
            <SheetContent className="w-[600px]">
              <SheetHeader>
                <SheetTitle>
                  <div className="w-full py-8 border-b-1 border-[#E2E2E2] px-6 flex items-center justify-between bg-[#F4F7FC]">
                    <div className="font-Polysans text-[1.2rem] font-medium text-[#737A82] leading-none">
                      Notifications {""}
                      <span className="text-black ">
                        ({notifications.length})
                      </span>
                    </div>
                    {/* <div className="font-Matter text-[0.9rem] text-[#444753] leading-none pr-4 cursor-pointer">
                      Mark all as read
                    </div> */}
                  </div>
                </SheetTitle>
                <SheetDescription>
                  {loading ? (
                    <div className=" h-screen w-full flex items-center justify-center ">
                      <Spinner />
                    </div>
                  ) : (
                    <div className="w-full flex flex-col gap-5 px-5 h-screen ">
                      <div className="flex items-center border bg-[#F5F5F5] border-[#FFFFFF] rounded-[53px] p-1 w-fit">
                        <div
                          className={`px-8 py-3 cursor-pointer border font-semibold rounded-3xl ${
                            tab == 2
                              ? "bg-white text-black border-[#ECECEC]"
                              : "text-[#565656] border-transparent"
                          } duration-300`}
                          onClick={() => setTab(2)}
                        >
                          Unread
                        </div>
                        <div
                          className={`px-8 py-3 cursor-pointer border font-semibold rounded-3xl ${
                            tab == 1
                              ? "bg-white text-black border-[#ECECEC]"
                              : "text-[#565656] border-transparent"
                          } duration-300`}
                          onClick={() => setTab(1)}
                        >
                          Read
                        </div>
                      </div>
                      <div
                        className="flex flex-col gap-4 h-[75%] overflow-hidden overflow-y-scroll
                       "
                      >
                        {groupedNotifications &&
                          Object.keys(groupedNotifications).map((date) => (
                            <div key={date}>
                              <div className=" font-Polysans text-[1rem] py-3  font-semibold text-[#2E303A]  ">
                                {date}
                              </div>
                              <div className=" flex flex-col gap-4 ">
                                {groupedNotifications[date].map((item) => (
                                  <div key={item.id}>
                                    <NotificationCard
                                      marknotify={marknotify}
                                      id={item._id}
                                      day={getFormattedDate1(item.createdAt)}
                                      ago={getTimePassed(item.createdAt)}
                                      color={!item.isRead}
                                      description={item.message}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <Profilebar />
      </div>
    </div>
  );
};

export default Navbar;
