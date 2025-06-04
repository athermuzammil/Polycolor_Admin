"use client";

import { getToken } from "@/api/getToken";
import getChats from "@/api/getchats";
import getMessagesOfChat from "@/api/getmessagesofchat";
import sendMessage from "@/api/sendmessage";
import { BACKEND_URL } from "@/api/variables";
import Add from "@/components/add";
import Bluetext from "@/components/bluetext";
import Greytext from "@/components/greytext";
import Navbar from "@/components/navbar";
import Sendcard from "@/components/sendcard";
import Spinner from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { useCurrentLocale, useI18n } from "@/locales/client";
import Cross from "@/public/icons/cross";
import Delfile from "@/public/icons/delfile";
import Pluse from "@/public/icons/pluse";
import Profile from "@/public/icons/profile";
import Send from "@/public/icons/send";
import Startmessage from "@/public/icons/startmessage";
import formatDateAndTime from "@/utils/formatDateAndTime";
import clsx from "clsx";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const Chat = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const token = getToken();
  const fileInputRef = useRef();
  const [hide, setHide] = useState(false);
  const [open, setopen] = useState(false);
  const socket = io(BACKEND_URL);
  const [chats, setchats] = useState([]);
  const [filteredchats, setfilteredchats] = useState([]);
  const [messages, setmessages] = useState();
  const [logo, setLogo] = useState();
  const [message, setMessage] = useState();
  const [user, setuser] = useState();
  const params = useSearchParams();
  const [first, setFirst] = useState();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [referenceMessageDate, setReferenceMessageDate] = useState("Today");
  const messageRefs = useRef([]);
  const [pageload, setpageload] = useState(true);

  function convertToDateString(isoString) {
    const date = new Date(isoString);

    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const messageIndex = Array.from(
              entry.target.parentNode.children
            ).indexOf(entry.target);
            const message = messages[messageIndex];
            const refMessageDate = convertToDateString(message.updatedAt);

            setReferenceMessageDate(refMessageDate);
          }
        });
      },
      {
        root: divRef.current,
        threshold: 0.1,
      }
    );

    const messageElements = messageRefs.current.filter((ref) => ref.current);
    messageElements.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      messageElements.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [messages]);

  const router = useRouter();
  const id = params.get("id");
  const click = () => {
    setHide(!hide);
  };

  const parseJsonString = (jsonString) => {
    try {
      const jsonObject = JSON.parse(jsonString);
      return jsonObject;
    } catch (error) {
      console.error("Failed to parse JSON string:", error);
      return null;
    }
  };

  const handleChange1 = (event) => {
    const selectedFile = event.target.files[0];
    setLogo(selectedFile);
    //console.log(selectedFile, "select");
  };

  const handleSend = async () => {
    const newMessage = {
      sender: "admin",
      message: message ? message : "",
      filepath: logo ? URL.createObjectURL(logo) : null,
      updatedAt: Date(),
      custom: true,
      ext: logo ? logo.name.split(".").pop() : null,
    };
    addMessage(newMessage);
    setMessage("");
    setLogo(null);
    const res = await sendMessage(token, message, id, logo);
    //console.log(res, "resss2");
  };

  const addMessage = (newMessage) => {
    setmessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const timeDifference = (givenTimestampStr) => {
    const givenTimestamp = new Date(givenTimestampStr);
    const currentTimestamp = new Date();

    const timeDifference = currentTimestamp - givenTimestamp;

    const msInSecond = 1000;
    const msInMinute = msInSecond * 60;
    const msInHour = msInMinute * 60;
    const msInDay = msInHour * 24;

    let result;

    if (timeDifference < msInMinute) {
      const secondsDifference = Math.floor(timeDifference / msInSecond);
      result = `${secondsDifference} s`;
    } else if (timeDifference < msInHour) {
      const minutesDifference = Math.floor(timeDifference / msInMinute);
      result = `${minutesDifference} min (s)`;
    } else if (timeDifference < msInDay) {
      const hoursDifference = (timeDifference / msInHour).toFixed(2);
      result = `${hoursDifference} hr (s)`;
    } else {
      const daysDifference = Math.floor(timeDifference / msInDay);
      result = `${daysDifference} day (s)`;
    }

    return result;
  };

  useEffect(() => {
    const GetChats = async () => {
      const token = localStorage.getItem("token");
      const data = await getChats(token);
      //console.log(data, "chats");
      setchats(data);
      setfilteredchats(data);
      setpageload(false);
    };
    GetChats();
  }, []);

  useEffect(() => {
    const GetMessages = async () => {
      const token = localStorage.getItem("token");
      const data = await getMessagesOfChat(token, id);
      //console.log(data, "messages");
      setmessages(data?.messages);
      setuser(data.user);
      setLoading(false);
    };
    if (id) {
      //console.log(id);
      GetMessages();
    }
  }, [id]);

  function convertToTimeString(isoString) {
    const date = new Date(isoString);

    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  }
  const divRef = useRef(null);

  const scrollToEnd = () => {
    if (divRef.current) {
      if (first) {
        divRef.current.scrollTo({
          top: divRef.current.scrollHeight + 30,
        });
      } else if (!first) {
        divRef.current.scrollTo({
          top: divRef.current.scrollHeight + 30,
        });
        setFirst(true);
      }
    }
  };

  useEffect(() => {
    if (messages?.length > 0) {
      scrollToEnd();
    }
  }, [messages]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const link = (id) => {
    setLoading(true);
    setFirst(false);
    router.push(`/dashboard/chat?id=${id}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setfilteredchats(
      chats.filter((chat) =>
        chat.username.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (id) {
      const socket = io(BACKEND_URL); // Ensure this URL matches your backend server

      socket.emit("create_room", id);

      socket.on("foradmin", (message) => {
        //console.log("New message from admin:", message);
        if (message.chatId === id) {
          setmessages((prevMessages) => [...prevMessages, message]);
          socket.emit("markread", { id: message.chatId, type: "admin" });
        }
      });

      // Clean up the socket connection when the component unmounts
      return () => {
        socket.disconnect();
      };
    }
  }, [id]);

  if (pageload) {
    return (
      <div className="flex justify-center items-center h-[100vh] w-full ">
        <Spinner />
      </div>
    );
  }

  return (
    <div className=" pb-6 lg:py-[1.5rem] h-[100vh] w-full overflow-hidden ">
      <div className=" flex px-5 lg:px-10 justify-between  items-center">
        <div className=" text-[1.5rem] font-semibold font-Polysans">
          {t("p69")}
        </div>
        <div>
          <Navbar />
        </div>
      </div>
      <div className="border-t-[1px] w-full  border-t-[#E5EAEF]">
        <div className="flex  pl-5 xl:px-6 w-full">
          <div className=" w-[24rem] xl:w-[25rem] h-[100vh] border-r-[1px] border-r-[#DFDFDF] pr-4 py-5">
            <div className=" flex gap-3 items-center">
              <div className="text-[#000000] font-Polysans ">{t("p15")}</div>
            </div>
            <div className="py-[1.5rem]">
              <Input
                type="text"
                placeholder={t("p70")}
                className="bg-[#F7F8F9] border border-[#E5EAEF] rounded-2xl text-[0.80rem] font-normal text-[#737A82] w-full outline-none py-3 px-3"
                id=""
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className=" h-full overflow-y-scroll  flex flex-col gap-2 ">
              {filteredchats?.map((item) => (
                <Link
                  onClick={() => {
                    id != item._id ? setLoading(true) : "";
                  }}
                  href={`/dashboard/chat?id=${item._id}`}
                >
                  <div
                    className={clsx(
                      " h-[65px] flex items-center py-3 px-4 rounded-xl justify-between",
                      item._id == id
                        ? " bg-[#F8F8F8] border border-[#E5EAEF] "
                        : ""
                    )}
                  >
                    <div>
                      <div className=" text-[0.9rem] font-Matter font-[500]">
                        {item?.username}
                      </div>
                      <div className="text-[0.8rem] font-Matter font-[500] text-[#00000066]">
                        {item?.lastmessage || "Start messaging"}
                      </div>
                    </div>
                    <div className="    text-[0.85rem] text-[#838486] items-center flex  ">
                      {item?.lastmessageTime &&
                        timeDifference(item?.lastmessageTime)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {id ? (
            <div
              className="  w-full h-[100vh] overflow-y-scroll flex flex-col justify-between pb-40 "
              ref={divRef}
            >
              <div
                onClick={() => setHide(false)}
                className="pl-4 lg:pl-10 pr-4 relative w-full "
              >
                <div className=" sticky -top-[1px] z-[10]">
                  {!loading && (
                    <div className=" pt-4 bg-white rounded-b-[26px] ">
                      <div className="bg-[#F7F8F9] border border-[#E5EAEF] rounded-[26px] flex gap-4 items-center px-6 py-4">
                        <div>
                          <Profile />
                        </div>
                        <div className="  ">
                          <div className="text-[1rem] font-Polysans font-semibold   ">
                            {user?.name}
                          </div>
                          <div className="flex gap-2 items-center">
                            <div className="h-1 w-1 bg-[#2AAA84] rounded-full"></div>
                            <div className="text-[#838486]  text-[0.95rem] font-normal font-Matter">
                              {t("p72")}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="w-full  flex justify-center items-center py-4">
                    <div className="bg-[#F4F4F4] border border-[#E5EAEF] rounded-[15px] font-Matter text-[0.9375rem] py-0.5 pb-1 font-medium  text-[#565656]  w-max px-4 ">
                      {referenceMessageDate}
                    </div>
                  </div>
                </div>
                {loading ? (
                  <div className="flex justify-center w-full items-center h-[45vh]">
                    <Spinner />
                  </div>
                ) : (
                  <div>
                    {" "}
                    <div className="pb-24  px-2">
                      {messages?.length === 0 ? (
                        <div className=" w-full flex place-self-center pb-16 items-start justify-center pt-6 ">
                          <div className="  w-[40%] flex items-center justify-center  ">
                            <Startmessage />
                          </div>
                        </div>
                      ) : (
                        messages?.map((item, index) => {
                          if (!messageRefs.current[index]) {
                            messageRefs.current[index] = React.createRef();
                          }
                          if (item.type === 1) {
                            const parsedMessage = parseJsonString(item.message);
                            if (item.sender === "admin") {
                              return (
                                <div
                                  className=" w-full flex items-end justify-end "
                                  ref={messageRefs.current[index]}
                                >
                                  <Sendcard
                                    type={parsedMessage.type}
                                    date={
                                      parsedMessage.type == 2
                                        ? formatDate(parsedMessage.validTill)
                                        : formatDate(item.updatedAt)
                                    }
                                    quoteNum={parsedMessage.quotenumber}
                                    items={parsedMessage.items}
                                    amount={parsedMessage.total}
                                    service={parsedMessage.servicetype}
                                    id={parsedMessage._id}
                                    time={convertToTimeString(item.updatedAt)}
                                    orderNum={parsedMessage.ordernumber}
                                  />
                                </div>
                              );
                            } else {
                              return (
                                <div ref={messageRefs.current[index]}>
                                  <Sendcard
                                    type={parsedMessage.type}
                                    date={
                                      parsedMessage.type == 2
                                        ? formatDate(parsedMessage.validTill)
                                        : formatDate(item.updatedAt)
                                    }
                                    quoteNum={parsedMessage.quotenumber}
                                    items={parsedMessage.items}
                                    amount={parsedMessage.total}
                                    service={parsedMessage.servicetype}
                                    id={parsedMessage._id}
                                    time={convertToTimeString(item.updatedAt)}
                                    orderNum={parsedMessage.ordernumber}
                                  />
                                </div>
                              );
                            }
                          } else if (item.sender === "admin") {
                            return (
                              <div ref={messageRefs.current[index]}>
                                <Greytext
                                  file={
                                    item?.custom
                                      ? item.filepath
                                      : item.filepath
                                      ? `https://media.polycolor.ch/polycolor-media/${item.filepath}`
                                      : ""
                                  }
                                  text={
                                    item.message.trim().length > 0
                                      ? item.message
                                      : ""
                                  }
                                  time={convertToTimeString(item.updatedAt)}
                                  ext={item.ext}
                                />
                              </div>
                            );
                          } else {
                            return (
                              <div ref={messageRefs.current[index]}>
                                <Bluetext
                                  file={item.filepath}
                                  text={
                                    item.message.trim().length > 0
                                      ? item.message
                                      : ""
                                  }
                                  time={convertToTimeString(item.updatedAt)}
                                />
                              </div>
                            );
                          }
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="  flex justify-center w-full ">
                <div
                  // style={{ width: `calc(100vw - 42rem)` }}
                  className="fixed bottom-20 lg:bottom-0 bg-white rounded-t-[57px] pb-5 lg:pl-6  w-[calc(100vw-20rem)] lg:w-[calc(100vw-32rem)] xl:w-[calc(100vw-39rem)] 2xl:w-[calc(100vw-42rem)] "
                >
                  <div className="bg-[#F7F8F9] border border-[#E5EAEF] flex justify-between items-center rounded-[57px] px-5   w-full">
                    <div className="w-full">
                      <Input
                        type="text"
                        onChange={(e) => {
                          setMessage(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && (message || logo)) {
                            handleSend();
                            //console.log("lolllll");
                          }
                        }}
                        value={message}
                        placeholder={t("p75")}
                        className="bg-[#F7F8F9] text-[0.80rem] font-normal text-[#737A82] w-full outline-none px-0"
                        id=""
                      />
                    </div>
                    <div className="flex gap-3 items-center">
                      {logo ? (
                        <div
                          onClick={() => {
                            setLogo("");
                          }}
                        >
                          {" "}
                          <Delfile />{" "}
                        </div>
                      ) : (
                        <div onClick={click} className="hover:cursor-pointer">
                          <Pluse />
                        </div>
                      )}
                      <div
                        className=" cursor-pointer"
                        onClick={() => {
                          if (message || logo) {
                            handleSend();
                          }
                        }}
                      >
                        <Send />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`absolute bottom-[72px] right-16 z-[1000] ${
                      hide ? "block" : "hidden"
                    } ${click ? "hideen" : ""}`}
                  >
                    <div>
                      <div className="border border-[#EAEAEA] bg-[#FFFFFF] rounded-[12px] text-[0.95rem] font-medium font-Matter w-max">
                        {/* <div className="hover:bg-[#F7F8F9] hover:cursor-pointer py-3 px-4">
                          {t("p73")}
                        </div> */}

                        <div
                          className="hover:bg-[#F7F8F9] hover:cursor-pointer py-3 px-4"
                          onClick={() => {
                            if (!logo) {
                              fileInputRef.current.click();
                              setHide(false);
                            }
                          }}
                        >
                          {t("p74")}
                        </div>

                        <Input
                          type="file"
                          id="fileInput"
                          ref={fileInputRef}
                          onChange={handleChange1}
                          style={{ display: "none" }}
                          placeholder={t("p193")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className=" w-full flex items-start place-self-center pb-16 h-full justify-center pt-6 ">
              <div className="  w-[40%] flex items-center h-max justify-center  ">
                <Startmessage />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
