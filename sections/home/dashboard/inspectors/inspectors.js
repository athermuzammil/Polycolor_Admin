"use client";
import Addinspector from "@/api/addinspector";
import Getallinspectors from "@/api/getallinspectors";
import { getToken } from "@/api/getToken";
import Inspectorcard from "@/components/inspectorcard";
import Navbar from "@/components/navbar";
import Orderslistskeleton from "@/components/orderslistskeleton";
import { Input } from "@/components/ui/input";
import { useCurrentLocale, useI18n } from "@/locales/client";
import Cross from "@/public/icons/cross";
import React, { useEffect, useState } from "react";

const Inspectors = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const token = getToken();
  const [data1, setData] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [popUp, setPopUp] = useState();
  const [loading, setLoading] = useState(true);
  const [tog, settog] = useState(true);

  useEffect(() => {
    const getall = async () => {
      const res = await Getallinspectors(token);
      //console.log(res, "resssssss");
      setData(res);
      setLoading(false);
    };
    getall();
  }, [tog]);

  const needData = {
    name: name,
    email: email,
  };

  const addInspector = async (data) => {
    const res = await Addinspector(token, data);
    //console.log(data);
    //console.log(res, "ressponseeeeeee");
    settog(!tog);
  };
  // useEffect(() => {
  //   if (updatepop) {
  //     // Directly set the overflow style of the body to hidden
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     // Reset the overflow style of the body to its default value
  //     document.body.style.overflow = "";
  //   }

  //   // Clean up when the component unmounts or when the pop-up closes
  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, [updatepop]);
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

  return (
    <div className=" w-full px-9 py-[2rem] pb-28 xl:pb-0">
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
      <div className=" w-full flex items-center justify-end pb-8 ">
        <div
          className=" leading-none bg-[#1053FF] rounded-full font-Matter text-[1rem] font-medium text-white px-8  h-[50px] cursor-pointer flex items-center justify-center   "
          onClick={() => {
            setPopUp(true);
          }}
        >
          {t("p146")}
        </div>
      </div>
      <div className=" flex flex-col gap-3 w-full p-4 pb-6  bg-[#F7F8F9] rounded-3xl  ">
        {loading ? (
          <>
            <Orderslistskeleton height={"h-[80px]"} />
            <Orderslistskeleton height={"h-[80px]"} />
            <Orderslistskeleton height={"h-[80px]"} />
          </>
        ) : data1?.length > 0 ? (
          data1?.map((item) => (
            <Inspectorcard
              name={item.name}
              email={item.email}
              orders={item.orders}
              id={item._id}
            />
          ))
        ) : (
          <div className=" text-[1.5rem] font-Matter font-medium ">
            No Inspectors
          </div>
        )}
      </div>
      <div
        className={`h-[100vh] w-[100vw] backdrop-blur-sm fixed left-0  top-0 z-[100]  flex justify-center items-center duration-1000  ${
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
                  // window.location.reload();
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

export default Inspectors;
