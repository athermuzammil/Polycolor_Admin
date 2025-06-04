"use client";
import Navbar from "@/components/navbar";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Getsinglerequestquote from "@/api/getrequestquote";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import Alert from "@/components/alert";
import Panic from "@/public/icons/panic";
import Edit2 from "@/public/icons/edit2";

import Halfarrow from "@/public/icons/halfarrow";
import Updaterequestquote from "@/api/updaterequestquote";
import { getToken } from "@/api/getToken";
import src from "@/public/images/Frame.png";
import Image from "next/image";
import { useCurrentLocale, useI18n } from "@/locales/client";
import Spinner from "@/components/spinner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const Singlerequestquote = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const token = getToken();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [open8, setOpen8] = useState(false);
  const [open9, setOpen9] = useState(false);
  const [loading, setLoading] = useState(true);
  const [side, setSide] = useState(false);
  const search = useSearchParams();
  const id = search.get("id");
  const [details, setDetails] = useState();
  const [visibleItem, setVisibleItem] = useState("");
  const [newDetails, setNewDetails] = useState();
  const itemRefs = useRef([]);
  const [images, setImages] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, seterror] = useState(false);

  useEffect(() => {
    const quotes = async () => {
      const token = localStorage.getItem("token");
      const data = await Getsinglerequestquote(token, id);
      if (data?.error) {
        seterror(true);
        return;
      }
      //console.log(data, "quotes");
      setDetails(data);
      setNewDetails(data);
      setLoading(false);
      //console.log(data.items, "itemsss");
    };
    quotes();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItem(entry.target.getAttribute("data-name"));
          }
        });
      },
      { threshold: 0.5 } // Adjust this value to detect as per requirement
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [newDetails]);

  const handleSave = async () => {
    setLoad(true);
    const data = {
      id: newDetails._id,
      items: newDetails.items,
      additionalDetails: newDetails.additionalDetails,
    };
    const res = await Updaterequestquote(token, data);
    //console.log(res, "resssssssss");
    setLoad(false);
    setEdit(false);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const [edit, setEdit] = useState(false);

  const cantons = [
    { value: "AG-Aargau", label: "AG-Aargau" },
    { value: "AR-Appenzell AusserRhoden", label: "AR-Appenzell AusserRhoden" },
    { value: "AI-Appenzell Inner-Rhoden", label: "AI-Appenzell Inner-Rhoden" },
    { value: "BL-Basel-Landschaft", label: "BL-Basel-Landschaft" },
    { value: "BS-Basel-Stadt", label: "BS-Basel-Stadt" },
    { value: "BE-Bern", label: "BE-Bern" },
    { value: "FR-Fribourg", label: "FR-Fribourg" },
    { value: "GE-Geneva", label: "GE-Geneva" },
    { value: "GL-Glarus", label: "GL-Glarus" },
    { value: "GR-Graubunden", label: "GR-Graubunden" },
    { value: "JU-Jura", label: "JU-Jura" },
    { value: "LU-Luzern", label: "LU-Luzern" },
    { value: "NE-Neuchâtel", label: "NE-Neuchâtel" },
    { value: "NW-Nidwalden", label: "NW-Nidwalden" },
    { value: "OW-Obwalden", label: "OW-Obwalden" },
    { value: "SG-Sankt Gallen", label: "SG-Sankt Gallen" },
    { value: "SH-Schaffhausen", label: "SH-Schaffhausen" },
    { value: "SZ-Schwyz", label: "SZ-Schwyz" },
    { value: "SO-Solothurn", label: "SO-Solothurn" },
    { value: "TG-Thurgau", label: "TG-Thurgau" },
    { value: "TI-Ticino", label: "TI-Ticino" },
    { value: "UR-Uri", label: "UR-Uri" },
    { value: "VS-Valais", label: "VS-Valais" },
    { value: "VD-Vaud", label: "VD-Vaud" },
    { value: "ZG-Zug", label: "ZG-Zug" },
    { value: "ZH-Zürich", label: "ZH-Zürich" },
  ];

  const townss = [
    { value: "Aarau", label: "Aarau" },
    { value: "Allschwil", label: "Allschwil" },
    { value: "Baden", label: "Baden" },
    { value: "Basel", label: "Basel" },
    { value: "Bern", label: "Bern" },
    { value: "Biel", label: "Biel" },
    { value: "La Chaux-de-Fonds", label: "La Chaux-de-Fonds" },
    { value: "Chur", label: "Chur" },
    { value: "Davos", label: "Davos" },
    { value: "Ebikon", label: "Ebikon" },
    { value: "Emmen", label: "Emmen" },
    { value: "Frauenfeld", label: "Frauenfeld" },
    { value: "Fribourg", label: "Fribourg" },
    { value: "Geneva", label: "Geneva" },
    { value: "Grindelwald", label: "Grindelwald" },
    { value: "Interlaken", label: "Interlaken" },
    { value: "Kloten", label: "Kloten" },
    { value: "Lausanne", label: "Lausanne" },
    { value: "Lauterbrunnen", label: "Lauterbrunnen" },
    { value: "Littau", label: "Littau" },
    { value: "Locarno", label: "Locarno" },
    { value: "Lucerne", label: "Lucerne" },
    { value: "Lugano", label: "Lugano" },
    { value: "Montreux-Vevey", label: "Montreux-Vevey" },
    { value: "Muttenz", label: "Muttenz" },
    { value: "Neuchâtel", label: "Neuchâtel" },
    { value: "Neuhausen", label: "Neuhausen" },
    { value: "Olten", label: "Olten" },
    { value: "Reinach", label: "Reinach" },
    { value: "Rhine Falls", label: "Rhine Falls" },
    { value: "Riehen", label: "Riehen" },
    { value: "St. Gallen", label: "St. Gallen" },
    { value: "St. Moritz", label: "St. Moritz" },
    { value: "Schaffhausen", label: "Schaffhausen" },
    { value: "Sion", label: "Sion" },
    { value: "Solothurn", label: "Solothurn" },
    { value: "Thun", label: "Thun" },
    { value: "Vitznau", label: "Vitznau" },
    { value: "Wettingen", label: "Wettingen" },
    { value: "Winterthur", label: "Winterthur" },
    { value: "Zermatt", label: "Zermatt" },
    { value: "Zug", label: "Zug" },
    { value: "Zurich", label: "Zurich" },
    { value: "Zurich Airport", label: "Zurich Airport" },
  ];

  if (error) {
    return (
      <div className="   h-full w-full px-10">
        <div className="flex justify-between   items-center">
          <div className="flex items-center gap-4">
            <div className="font-Polysans font-semibold text-[1.5rem] ">
              {t("p28")}
            </div>
          </div>
          <div>
            <Navbar />
          </div>
        </div>
        <div className="font-Poppins font-semibold text-[2rem] text-center text-[#FF3F66]">
          No such requested quote
        </div>
      </div>
    );
  }

  return loading ? (
    <div className=" h-screen w-full flex items-center justify-center  ">
      <Spinner />
    </div>
  ) : (
    <div className=" px-8 w-full   relative ">
      <div className="">
        <Navbar heading={"Quote #015AF0"} className={"text-[1.5rem]"} />
      </div>
      <div className=" flex w-full pb-16 gap-16 ">
        <div className=" w-[23%] ">
          <div className=" bg-[#F7F8F9] border-[1px] border-[#E5EAEF] rounded-3xl p-4 flex flex-col gap-2 ">
            <div className=" flex flex-col gap-2 w-48 ">
              <div className=" font-Matter font-medium text-[1rem] text-[#929292]   ">
                {t("p198")}
              </div>
              <div className=" font-Matter font-medium text-[1.3rem] text-[#000000]   ">
                {newDetails?.items?.length}
              </div>
            </div>
            <div className=" flex flex-col gap-2 w-full">
              <div className=" font-Matter font-medium text-[1rem] text-[#929292]   ">
                {t("p21")}
              </div>
              <div className=" font-Matter flex flex-col gap-2   font-medium text-[1.3rem] text-[#000000]   ">
                {newDetails?.items?.map((item, index) => (
                  <div className=" hover:bg-[white] cursor-pointer border-1 border-transparent duration-300  hover:border-[#E5EAEF] rounded-[9px] ">
                    {index + 1}. {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full flex flex-col gap-16 ">
          {newDetails?.items.map((item, index) => (
            <div
              className=" flex flex-col gap-8  "
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              data-name={item.name}
            >
              <div className=" font-Matter text-[3rem] text-[#242425] font-medium leading-none    ">
                {t("p270")} #{index + 1}
              </div>

              <div className=" flex w-full gap-12  ">
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                    {t("p199")}
                  </div>
                  {edit ? (
                    <div>
                      <Input
                        type="text"
                        value={item.name}
                        onChange={(e) => {
                          setNewDetails((prevDetails) => {
                            // Copy the items array to avoid mutating the state directly
                            const newItems = [...prevDetails.items];

                            // Ensure index is within bounds
                            if (index < 0 || index >= newItems.length) {
                              console.error("Index out of bounds:", index);
                              return prevDetails;
                            }

                            // Update the name of the specific item
                            newItems[index] = {
                              ...newItems[index],
                              name: e.target.value,
                            };

                            // Return the updated state with the new items array
                            return {
                              ...prevDetails,
                              items: newItems,
                            };
                          });
                        }}
                        className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                        placeholder={t("p200")}
                      />
                    </div>
                  ) : (
                    <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                      {item.name}
                    </div>
                  )}
                </div>
                <div className=" w-full "></div>
              </div>
              <div className=" flex w-full gap-12  ">
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                    {t("p201")}
                  </div>
                  {edit ? (
                    <div
                      className=" flex flex-col cursor-pointer relative  border border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem] "
                      onClick={() => {
                        setOpen(!open);
                      }}
                    >
                      <div className="  flex items-center justify-between w-full   ">
                        <div
                          className={`  font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium  w-full flex justify-between items-center ${
                            open ? "" : ""
                          } leading-none transition-all duration-300 `}
                        >
                          <div>
                            {" "}
                            {item?.materialType ? (
                              <div className=" text-[#464646] ">
                                {item.materialType == "steel"
                                  ? t("p203")
                                  : item.materialType == "stainless steel"
                                  ? t("p204")
                                  : item.materialType == "aluminium"
                                  ? t("p205")
                                  : item.materialType == "galvanized steel"
                                  ? t("p206")
                                  : item.materialType == "brass"
                                  ? t("p207")
                                  : item.materialType}
                              </div>
                            ) : (
                              t("p202")
                            )}
                          </div>
                          <motion.div
                            animate={{
                              rotate: open ? "180deg" : "0deg",
                            }}
                            transition={{
                              duration: 0.3,
                              ease: easeInOut,
                            }}
                          >
                            <Halfarrow />
                          </motion.div>
                        </div>
                      </div>
                      <motion.div
                        className={` font-medium  font-Matter text-[1rem] w-full flex flex-col  leading-[1.5] overflow-hidden absolute z-30 pl-2 top-14 left-0 bg-[#FFFFFF] rounded-2xl ${
                          open ? "border" : ""
                        } border-[#DFDFDF]  `}
                        initial={{
                          height: 0,
                        }}
                        animate={{
                          height: open ? "fit-content" : 0,
                          // paddingTop: open ? "12px" : 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: easeInOut,
                        }}
                      >
                        <div
                          className=" py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                          onClick={() => {
                            setNewDetails((prevDetails) => {
                              // Copy the items array to avoid mutating the state directly
                              const newItems = [...prevDetails.items];

                              // Ensure index is within bounds

                              // Update the materialType of the specific item
                              newItems[index] = {
                                ...newItems[index],
                                materialType: "steel",
                              };

                              // Return the updated state with the new items array
                              return {
                                ...prevDetails,
                                items: newItems,
                              };
                            });
                          }}
                        >
                          {t("p203")}
                        </div>
                        <div
                          className=" py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                          onClick={() => {
                            setNewDetails((prevDetails) => {
                              // Copy the items array to avoid mutating the state directly
                              const newItems = [...prevDetails.items];

                              // Ensure index is within bounds

                              // Update the materialType of the specific item
                              newItems[index] = {
                                ...newItems[index],
                                materialType: "stainless steel",
                              };

                              // Return the updated state with the new items array
                              return {
                                ...prevDetails,
                                items: newItems,
                              };
                            });
                          }}
                        >
                          {t("p204")}
                        </div>
                        <div
                          className=" py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                          onClick={() => {
                            setNewDetails((prevDetails) => {
                              // Copy the items array to avoid mutating the state directly
                              const newItems = [...prevDetails.items];

                              // Ensure index is within bounds

                              // Update the materialType of the specific item
                              newItems[index] = {
                                ...newItems[index],
                                materialType: "aluminium",
                              };

                              // Return the updated state with the new items array
                              return {
                                ...prevDetails,
                                items: newItems,
                              };
                            });
                          }}
                        >
                          {t("p205")}
                        </div>
                        <div
                          className=" py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                          onClick={() => {
                            setNewDetails((prevDetails) => {
                              // Copy the items array to avoid mutating the state directly
                              const newItems = [...prevDetails.items];

                              // Ensure index is within bounds

                              // Update the materialType of the specific item
                              newItems[index] = {
                                ...newItems[index],
                                materialType: "galvanized steel",
                              };

                              // Return the updated state with the new items array
                              return {
                                ...prevDetails,
                                items: newItems,
                              };
                            });
                          }}
                        >
                          {t("p206")}
                        </div>
                        <div
                          className=" py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                          onClick={() => {
                            setNewDetails((prevDetails) => {
                              // Copy the items array to avoid mutating the state directly
                              const newItems = [...prevDetails.items];

                              // Ensure index is within bounds

                              // Update the materialType of the specific item
                              newItems[index] = {
                                ...newItems[index],
                                materialType: "brass",
                              };

                              // Return the updated state with the new items array
                              return {
                                ...prevDetails,
                                items: newItems,
                              };
                            });
                          }}
                        >
                          {t("p207")}
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                      {item.materialType == "steel"
                        ? t("p203")
                        : item.materialType == "stainless steel"
                        ? t("p204")
                        : item.materialType == "aluminium"
                        ? t("p205")
                        : item.materialType == "galvanized steel"
                        ? t("p206")
                        : item.materialType == "brass"
                        ? t("p207")
                        : item.materialType}
                    </div>
                  )}
                </div>
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                    {t("p208")}
                  </div>
                  {edit ? (
                    <div>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          setNewDetails((prevDetails) => {
                            // Copy the items array to avoid mutating the state directly
                            const newItems = [...prevDetails.items];

                            // Ensure index is within bounds

                            // Update the quantity of the specific item
                            newItems[index] = {
                              ...newItems[index],
                              quantity: e.target.value,
                            };

                            // Return the updated state with the new items array
                            return {
                              ...prevDetails,
                              items: newItems,
                            };
                          });
                        }}
                        className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                        placeholder={t("p200")}
                      />
                    </div>
                  ) : (
                    <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                      {item.quantity}
                    </div>
                  )}
                </div>
              </div>
              <div className=" flex flex-col w-full gap-6  ">
                <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none flex items-center gap-2 relative z-[20] ">
                  <div> {t("p209")}</div>
                  <Alert text={t("p210")} children={<Panic />} />
                </div>
                <div className=" flex w-full gap-12  ">
                  {edit ? (
                    <div>
                      <Input
                        type="number"
                        value={item.dimensions.length}
                        onChange={(e) => {
                          setNewDetails((prevDetails) => {
                            // Copy the items array to avoid mutating the state directly
                            const newItems = [...prevDetails.items];

                            // Ensure index is within bounds

                            // Update the length of the dimensions object for the specific item
                            newItems[index] = {
                              ...newItems[index],
                              dimensions: {
                                ...newItems[index].dimensions,
                                length: e.target.value,
                              },
                            };

                            // Return the updated state with the new items array
                            return {
                              ...prevDetails,
                              items: newItems,
                            };
                          });
                        }}
                        className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                        placeholder={t("p200")}
                      />
                    </div>
                  ) : (
                    <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                      {item.dimensions.length}
                    </div>
                  )}
                  {edit ? (
                    <div>
                      <Input
                        type="number"
                        value={item.dimensions.width}
                        onChange={(e) => {
                          setNewDetails((prevDetails) => {
                            // Copy the items array to avoid mutating the state directly
                            const newItems = [...prevDetails.items];

                            // Ensure index is within bounds

                            // Update the length of the dimensions object for the specific item
                            newItems[index] = {
                              ...newItems[index],
                              dimensions: {
                                ...newItems[index].dimensions,
                                width: e.target.value,
                              },
                            };

                            // Return the updated state with the new items array
                            return {
                              ...prevDetails,
                              items: newItems,
                            };
                          });
                        }}
                        className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                        placeholder={t("p200")}
                      />
                    </div>
                  ) : (
                    <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                      {item.dimensions.width}
                    </div>
                  )}
                  {edit ? (
                    <div>
                      <Input
                        type="number"
                        value={item.dimensions.height}
                        onChange={(e) => {
                          setNewDetails((prevDetails) => {
                            // Copy the items array to avoid mutating the state directly
                            const newItems = [...prevDetails.items];

                            // Ensure index is within bounds

                            // Update the length of the dimensions object for the specific item
                            newItems[index] = {
                              ...newItems[index],
                              dimensions: {
                                ...newItems[index].dimensions,
                                height: e.target.value,
                              },
                            };

                            // Return the updated state with the new items array
                            return {
                              ...prevDetails,
                              items: newItems,
                            };
                          });
                        }}
                        className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                        placeholder={t("p200")}
                      />
                    </div>
                  ) : (
                    <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                      {item.dimensions.height}
                    </div>
                  )}
                  {edit ? (
                    <div
                      id="onee"
                      className=" flex flex-col cursor-pointer relative w-[25%]  border border-[#DFDFDF] bg-[#FFFFFF] rounded-xl px-2 py-4 pb-[0.95rem] "
                      onClick={() => {
                        setOpen9(!open9);
                      }}
                    >
                      <div className="  flex items-center justify-between w-full   ">
                        <div
                          className={`  font-Matter capitalize text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium  w-full flex justify-between items-center ${
                            open9 ? "" : ""
                          } leading-none transition-all duration-300 `}
                        >
                          <div>
                            {" "}
                            {item.dimensions?.unit ? (
                              <div className=" text-[#464646] ">
                                {item?.dimensions?.unit}
                              </div>
                            ) : (
                              t("p273")
                            )}
                          </div>
                          <motion.div
                            animate={{
                              rotate: open9 ? "180deg" : "0deg",
                            }}
                            transition={{
                              duration: 0.3,
                              ease: easeInOut,
                            }}
                          >
                            <Halfarrow />
                          </motion.div>
                        </div>
                      </div>
                      <motion.div
                        className={` font-medium  font-Matter text-[1rem] w-full flex flex-col  leading-[1.5] overflow-hidden absolute z-30 px-2 top-14 left-0 bg-[#FFFFFF] rounded-2xl ${
                          open9 ? "border" : ""
                        } border-[#DFDFDF]  `}
                        initial={{
                          height: 0,
                        }}
                        animate={{
                          height: open9 ? "fit-content" : 0,
                          // paddingTop: open ? "12px" : 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: easeInOut,
                        }}
                      >
                        <div
                          className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                          onClick={() => {
                            setNewDetails((prevDetails) => {
                              // Copy the items array to avoid mutating the state directly
                              const newItems = [...prevDetails.items];

                              // Ensure index is within bounds

                              // Update the length of the dimensions object for the specific item
                              newItems[index] = {
                                ...newItems[index],
                                dimensions: {
                                  ...newItems[index].dimensions,
                                  unit: "(m)",
                                },
                              };

                              // Return the updated state with the new items array
                              return {
                                ...prevDetails,
                                items: newItems,
                              };
                            });
                          }}
                        >
                          (m)
                        </div>
                        <div
                          className="  my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                          onClick={() => {
                            setNewDetails((prevDetails) => {
                              // Copy the items array to avoid mutating the state directly
                              const newItems = [...prevDetails.items];

                              // Ensure index is within bounds

                              // Update the length of the dimensions object for the specific item
                              newItems[index] = {
                                ...newItems[index],
                                dimensions: {
                                  ...newItems[index].dimensions,
                                  unit: "(mm)",
                                },
                              };

                              // Return the updated state with the new items array
                              return {
                                ...prevDetails,
                                items: newItems,
                              };
                            });
                          }}
                        >
                          (mm)
                        </div>
                        <div
                          className="  my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                          onClick={() => {
                            setNewDetails((prevDetails) => {
                              // Copy the items array to avoid mutating the state directly
                              const newItems = [...prevDetails.items];

                              // Ensure index is within bounds

                              // Update the length of the dimensions object for the specific item
                              newItems[index] = {
                                ...newItems[index],
                                dimensions: {
                                  ...newItems[index].dimensions,
                                  unit: "(mm)",
                                },
                              };

                              // Return the updated state with the new items array
                              return {
                                ...prevDetails,
                                items: newItems,
                              };
                            });
                          }}
                        >
                          (cm)
                        </div>
                        <div
                          className="  my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                          onClick={() => {
                            setNewDetails((prevDetails) => {
                              // Copy the items array to avoid mutating the state directly
                              const newItems = [...prevDetails.items];

                              // Ensure index is within bounds

                              // Update the length of the dimensions object for the specific item
                              newItems[index] = {
                                ...newItems[index],
                                dimensions: {
                                  ...newItems[index].dimensions,
                                  unit: "(sq2)",
                                },
                              };

                              // Return the updated state with the new items array
                              return {
                                ...prevDetails,
                                items: newItems,
                              };
                            });
                          }}
                        >
                          (sq2)
                        </div>
                        <div
                          className="  my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                          onClick={() => {
                            setNewDetails((prevDetails) => {
                              // Copy the items array to avoid mutating the state directly
                              const newItems = [...prevDetails.items];

                              // Ensure index is within bounds

                              // Update the length of the dimensions object for the specific item
                              newItems[index] = {
                                ...newItems[index],
                                dimensions: {
                                  ...newItems[index].dimensions,
                                  unit: "(m1)",
                                },
                              };

                              // Return the updated state with the new items array
                              return {
                                ...prevDetails,
                                items: newItems,
                              };
                            });
                          }}
                        >
                          (m1)
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <div
                      id="one"
                      className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  "
                    >
                      {item.dimensions.unit}
                    </div>
                  )}
                </div>
              </div>
              <div className=" flex w-full gap-12 ">
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none">
                    {t("p211")}{" "}
                    <span className=" text-[#BDBDBD] "> {t("p212")}</span>
                  </div>
                  <div className="rounded-2xl text-[#AFB2B6] p-3 border font-medium outline-none border-[#DFDFDF] h-32 w-full ">
                    {item?.description}
                  </div>
                </div>
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none">
                    {t("p213")}{" "}
                    <span className=" text-[#BDBDBD] "> {t("p212")}</span>
                  </div>
                  <div className="rounded-2xl p-[6px] border font-medium outline-none border-[#DFDFDF] h-32 w-full ">
                    <div
                      className=" h-full w-full rounded-2xl flex flex-col items-center justify-center bg-[#F7F8F9] border border-[#F1F1F1] cursor-pointer "
                      onClick={() => {
                        if (item?.referenceImage?.length > 0) {
                          setSide(true);
                        }
                        setImages(item?.referenceImage);
                      }}
                    >
                      <div className=" font-Polysans text-[0.85rem] font-semibold text-[#4B5563]     ">
                        {item?.referenceImage?.length || 0} {t("p246")}
                      </div>
                      {item?.referenceImage?.length > 0 && (
                        <div className="  font-Matter text-[0.85rem] text-[#9CA3AF] ">
                          {t("p214")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex w-full gap-12  ">
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                    {t("p215")}
                  </div>
                  {edit ? (
                    <div
                      className=" flex flex-col cursor-pointer relative  border border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem] "
                      onClick={() => {
                        setOpen4(!open4);
                      }}
                    >
                      <div className="  flex items-center justify-between w-full   ">
                        <div
                          className={`  font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium  w-full flex justify-between items-center ${
                            open4 ? "" : ""
                          } leading-none transition-all duration-300 `}
                        >
                          <div>
                            {" "}
                            {item.applicationEnvironment ? (
                              <div className=" text-[#464646] ">
                                {item.applicationEnvironment == "indoor"
                                  ? t("p217")
                                  : item.applicationEnvironment == "outdoor"
                                  ? t("p218")
                                  : item.applicationEnvironment}
                              </div>
                            ) : (
                              t("p216")
                            )}
                          </div>
                          <motion.div
                            animate={{
                              rotate: open4 ? "180deg" : "0deg",
                            }}
                            transition={{
                              duration: 0.3,
                              ease: easeInOut,
                            }}
                          >
                            <Halfarrow />
                          </motion.div>
                        </div>
                      </div>
                      <motion.div
                        className={` font-medium  font-Matter text-[1rem] w-full flex flex-col  leading-[1.5] overflow-hidden absolute z-30 px-2 top-14 left-0 bg-[#FFFFFF] rounded-2xl ${
                          open4 ? "border " : ""
                        } border-[#DFDFDF]   `}
                        initial={{
                          height: 0,
                        }}
                        animate={{
                          height: open4 ? "fit-content" : 0,

                          // paddingTop: open ? "12px" : 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: easeInOut,
                        }}
                      >
                        <div
                          className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                          onClick={() => {
                            setNewDetails((prevDetails) => {
                              // Copy the items array to avoid mutating the state directly
                              const newItems = [...prevDetails.items];

                              // Ensure index is within bounds

                              // Update the applicationEnvironment of the specific item
                              newItems[index] = {
                                ...newItems[index],
                                applicationEnvironment: "indoor",
                              };

                              // Return the updated state with the new items array
                              return {
                                ...prevDetails,
                                items: newItems,
                              };
                            });
                          }}
                        >
                          {t("p217")}
                        </div>
                        <div
                          className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                          onClick={() => {
                            setNewDetails((prevDetails) => {
                              // Copy the items array to avoid mutating the state directly
                              const newItems = [...prevDetails.items];

                              // Ensure index is within bounds

                              // Update the applicationEnvironment of the specific item
                              newItems[index] = {
                                ...newItems[index],
                                applicationEnvironment: "outdoor",
                              };

                              // Return the updated state with the new items array
                              return {
                                ...prevDetails,
                                items: newItems,
                              };
                            });
                          }}
                        >
                          {t("p218")}
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                      {item.applicationEnvironment == "indoor"
                        ? t("p217")
                        : item.applicationEnvironment == "outdoor"
                        ? t("p218")
                        : item.applicationEnvironment}
                    </div>
                  )}
                </div>
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                    {t("p219")}
                  </div>
                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                    {item.color ? t("p221") : t("p247")}
                  </div>
                </div>
              </div>
              <div className=" flex w-full gap-12  ">
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                    {t("p220")}
                  </div>
                  {edit ? (
                    <div
                      className=" flex flex-col cursor-pointer relative  border border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem] "
                      onClick={() => {
                        setOpen2(!open2);
                      }}
                    >
                      <div className="  flex items-center justify-between w-full   ">
                        <div
                          className={`  font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium  w-full flex justify-between items-center ${
                            open2 ? "" : ""
                          } leading-none transition-all duration-300 `}
                        >
                          <div>
                            <div className=" text-[#464646] ">
                              {item.sandBlastingRequires
                                ? t("p221")
                                : t("p222")}
                            </div>
                          </div>
                          <motion.div
                            animate={{
                              rotate: open2 ? "180deg" : "0deg",
                            }}
                            transition={{
                              duration: 0.3,
                              ease: easeInOut,
                            }}
                          >
                            <Halfarrow />
                          </motion.div>
                        </div>
                      </div>
                      <motion.div
                        className={` font-medium  font-Matter text-[1rem] w-full flex flex-col  leading-[1.5] overflow-hidden absolute z-30 px-2 top-14 left-0 bg-[#FFFFFF] rounded-2xl ${
                          open2 ? "border " : ""
                        } border-[#DFDFDF]   `}
                        initial={{
                          height: 0,
                        }}
                        animate={{
                          height: open2 ? "fit-content" : 0,

                          // paddingTop: open ? "12px" : 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: easeInOut,
                        }}
                      >
                        <div
                          className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                          onClick={() => {
                            setNewDetails((prevDetails) => {
                              // Copy the items array to avoid mutating the state directly
                              const newItems = [...prevDetails.items];

                              // Ensure index is within bounds

                              // Update the sandBlastingRequired of the specific item
                              newItems[index] = {
                                ...newItems[index],
                                sandBlastingRequires: true,
                              };

                              // Return the updated state with the new items array
                              return {
                                ...prevDetails,
                                items: newItems,
                              };
                            });
                          }}
                        >
                          {t("p221")}
                        </div>
                        <div
                          className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                          onClick={() => {
                            setNewDetails((prevDetails) => {
                              // Copy the items array to avoid mutating the state directly
                              const newItems = [...prevDetails.items];

                              // Ensure index is within bounds

                              // Update the sandBlastingRequired of the specific item
                              newItems[index] = {
                                ...newItems[index],
                                sandBlastingRequires: false,
                              };

                              // Return the updated state with the new items array
                              return {
                                ...prevDetails,
                                items: newItems,
                              };
                            });
                          }}
                        >
                          {t("p222")}
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                      {item.sandBlastingRequires ? t("p221") : t("p222")}
                    </div>
                  )}
                </div>
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                    {t("p223")}
                  </div>
                  {edit ? (
                    <div
                      className=" flex flex-col cursor-pointer relative  border border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem] "
                      onClick={() => {
                        setOpen3(!open3);
                      }}
                    >
                      <div className="  flex items-center justify-between w-full   ">
                        <div
                          className={`  font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium  w-full flex justify-between items-center ${
                            open3 ? "" : ""
                          } leading-none transition-all duration-300 `}
                        >
                          <div>
                            {" "}
                            <div className=" text-[#464646] ">
                              {item.surfaceProtectionRequired
                                ? t("p221")
                                : t("p222")}
                            </div>
                          </div>
                          <motion.div
                            animate={{
                              rotate: open3 ? "180deg" : "0deg",
                            }}
                            transition={{
                              duration: 0.3,
                              ease: easeInOut,
                            }}
                          >
                            <Halfarrow />
                          </motion.div>
                        </div>
                      </div>
                      <motion.div
                        className={` font-medium  font-Matter text-[1rem] w-full flex flex-col  leading-[1.5] overflow-hidden absolute z-30 px-2 top-14 left-0 bg-[#FFFFFF] rounded-2xl ${
                          open3 ? "border " : ""
                        } border-[#DFDFDF]   `}
                        initial={{
                          height: 0,
                        }}
                        animate={{
                          height: open3 ? "fit-content" : 0,

                          // paddingTop: open ? "12px" : 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: easeInOut,
                        }}
                      >
                        <div
                          className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                          onClick={() => {
                            setNewDetails((prevDetails) => {
                              // Copy the items array to avoid mutating the state directly
                              const newItems = [...prevDetails.items];

                              // Ensure index is within bounds

                              // Update the sandBlastingRequired of the specific item
                              newItems[index] = {
                                ...newItems[index],
                                surfaceProtectionRequired: true,
                              };

                              // Return the updated state with the new items array
                              return {
                                ...prevDetails,
                                items: newItems,
                              };
                            });
                          }}
                        >
                          {t("p221")}
                        </div>
                        <div
                          className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                          onClick={() => {
                            setNewDetails((prevDetails) => {
                              // Copy the items array to avoid mutating the state directly
                              const newItems = [...prevDetails.items];

                              // Ensure index is within bounds

                              // Update the sandBlastingRequired of the specific item
                              newItems[index] = {
                                ...newItems[index],
                                surfaceProtectionRequired: false,
                              };

                              // Return the updated state with the new items array
                              return {
                                ...prevDetails,
                                items: newItems,
                              };
                            });
                          }}
                        >
                          {t("p222")}
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                      {item.surfaceProtectionRequired ? t("p221") : t("p222")}
                    </div>
                  )}
                </div>
              </div>
              {item.color && (
                <div className=" flex w-full gap-12  ">
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p224")}{" "}
                      <span className=" text-[#BDBDBD] "> (Hex Code)</span>
                    </div>
                    {edit ? (
                      <div>
                        <Input
                          type="text"
                          value={item.color}
                          onChange={(e) => {
                            setNewDetails((prevDetails) => {
                              // Copy the items array to avoid mutating the state directly
                              const newItems = [...prevDetails.items];

                              // Ensure index is within bounds

                              // Update the color of the specific item
                              newItems[index] = {
                                ...newItems[index],
                                color: e.target.value,
                              };

                              // Return the updated state with the new items array
                              return {
                                ...prevDetails,
                                items: newItems,
                              };
                            });
                          }}
                          className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                          placeholder={t("p200")}
                        />
                      </div>
                    ) : (
                      <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                        {item.color}
                      </div>
                    )}
                  </div>
                  <div className=" flex flex-col gap-3 w-full "></div>
                </div>
              )}
            </div>
          ))}
          <div className=" flex flex-col gap-6 w-full ">
            <div className=" font-Polysans text-[2.3rem] text-[#141415] font-semibold    ">
              {t("p225")}
            </div>
            <div className=" flex w-full flex-col gap-8 ">
              <div className=" flex w-full gap-12  ">
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                    {t("p226")}
                  </div>
                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                    {newDetails?.additionalDetails?.pickupLocation?.userName
                      ? t("p221")
                      : t("p222")}
                  </div>
                </div>
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                    {t("p227")}
                  </div>
                  {edit &&
                  newDetails?.additionalDetails?.pickupLocation?.userName ? (
                    <div>
                      <Input
                        type="date"
                        onChange={(e) => {
                          setNewDetails((prevDetails) => ({
                            ...prevDetails,
                            additionalDetails: {
                              ...prevDetails.additionalDetails,
                              pickupDate: e.target.value,
                            },
                          }));
                        }}
                        className="border font-Matter placeholder:uppercase text-[1rem] text-[#AFB2B6] font-medium border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-3 outline-none "
                      />
                    </div>
                  ) : (
                    <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                      {newDetails?.additionalDetails?.pickupLocation?.userName
                        ? formatDate(newDetails?.additionalDetails?.pickupDate)
                        : "-"}
                    </div>
                  )}
                </div>
              </div>
              <div className=" flex w-full gap-12  ">
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                    Delivery ?
                  </div>
                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                    {newDetails?.additionalDetails?.deliveryLocation?.streetName
                      ? t("p221")
                      : t("p222")}
                  </div>
                </div>
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                    {t("p228")}
                  </div>
                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                    {newDetails?.additionalDetails?.pickupLocation?.userName
                      ? `
                   ${newDetails?.additionalDetails?.pickupLocation?.userName},
                  ${newDetails?.additionalDetails?.pickupLocation?.streetNumber}
                  ,${newDetails?.additionalDetails?.pickupLocation?.streetName}
                `
                      : "-"}
                  </div>
                </div>
              </div>
              <div className=" flex w-full gap-12  ">
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none flex items-center gap-2   ">
                    {t("p229")}
                    <Alert children={<Panic />} text={t("p230")} />
                  </div>
                  {edit ? (
                    <div
                      className=" flex flex-col cursor-pointer relative  border border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem] "
                      onClick={() => {
                        setOpen1(!open1);
                      }}
                    >
                      <div className="  flex items-center justify-between w-full   ">
                        <div
                          className={`  font-Matter text-[1rem] px-2 pr-2 text-[black] font-medium  w-full flex justify-between items-center ${
                            open1 ? "" : ""
                          } leading-none transition-all duration-300 `}
                        >
                          <div>
                            {" "}
                            {newDetails?.additionalDetails?.filmApplication ? (
                              <div className="  ">
                                {newDetails?.additionalDetails?.filmApplication
                                  ? t("p221")
                                  : t("p222")}
                              </div>
                            ) : (
                              t("p222")
                            )}
                          </div>
                          <motion.div
                            animate={{
                              rotate: open1 ? "180deg" : "0deg",
                            }}
                            transition={{
                              duration: 0.3,
                              ease: easeInOut,
                            }}
                          >
                            <Halfarrow />
                          </motion.div>
                        </div>
                      </div>
                      <motion.div
                        className={` font-medium  font-Matter text-[1rem] w-full flex flex-col  leading-[1.5] overflow-hidden absolute z-30 px-2 top-14 left-0 bg-[#FFFFFF] rounded-2xl ${
                          open1 ? "border " : ""
                        } border-[#DFDFDF]   `}
                        initial={{
                          height: 0,
                        }}
                        animate={{
                          height: open1 ? "fit-content" : 0,

                          // paddingTop: open ? "12px" : 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: easeInOut,
                        }}
                      >
                        <div
                          className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                          onClick={() => {
                            setNewDetails((prevDetails) => ({
                              ...prevDetails,
                              additionalDetails: {
                                ...prevDetails.additionalDetails,
                                filmApplication: true,
                              },
                            }));
                          }}
                        >
                          {t("p221")}
                        </div>
                        <div
                          className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                          onClick={() => {
                            setNewDetails((prevDetails) => ({
                              ...prevDetails,
                              additionalDetails: {
                                ...prevDetails.additionalDetails,
                                filmApplication: false,
                              },
                            }));
                          }}
                        >
                          {t("p222")}
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                      {newDetails?.additionalDetails?.filmApplication
                        ? t("p221")
                        : t("p222")}
                    </div>
                  )}
                </div>
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none flex items-center gap-2    ">
                    {t("p231")}
                    <Alert children={<Panic />} text={t("p230")} />
                  </div>
                  {edit ? (
                    <div
                      className=" flex flex-col cursor-pointer relative  border border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem] "
                      onClick={() => {
                        setOpen5(!open5);
                      }}
                    >
                      <div className="  flex items-center justify-between w-full   ">
                        <div
                          className={`  font-Matter text-[1rem] px-2 pr-2 text-[black] font-medium  w-full flex justify-between items-center ${
                            open5 ? "" : ""
                          } leading-none transition-all duration-300 `}
                        >
                          <div>
                            {" "}
                            {newDetails.additionalDetails.filmRemoval ? (
                              <div className="  ">
                                {newDetails.additionalDetails.filmRemoval
                                  ? t("p221")
                                  : t("p222")}
                              </div>
                            ) : (
                              t("p222")
                            )}
                          </div>
                          <motion.div
                            animate={{
                              rotate: open5 ? "180deg" : "0deg",
                            }}
                            transition={{
                              duration: 0.3,
                              ease: easeInOut,
                            }}
                          >
                            <Halfarrow />
                          </motion.div>
                        </div>
                      </div>
                      <motion.div
                        className={` font-medium  font-Matter text-[1rem] w-full flex flex-col  leading-[1.5] overflow-hidden absolute z-30 px-2 top-14 left-0 bg-[#FFFFFF] rounded-2xl ${
                          open5 ? "border " : ""
                        } border-[#DFDFDF]   `}
                        initial={{
                          height: 0,
                        }}
                        animate={{
                          height: open5 ? "fit-content" : 0,

                          // paddingTop: open ? "12px" : 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: easeInOut,
                        }}
                      >
                        <div
                          className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                          onClick={() => {
                            setNewDetails((prevDetails) => ({
                              ...prevDetails,
                              additionalDetails: {
                                ...prevDetails.additionalDetails,
                                filmRemoval: true,
                              },
                            }));
                          }}
                        >
                          {t("p221")}
                        </div>
                        <div
                          className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                          onClick={() => {
                            setNewDetails((prevDetails) => ({
                              ...prevDetails,
                              additionalDetails: {
                                ...prevDetails.additionalDetails,
                                filmRemoval: false,
                              },
                            }));
                          }}
                        >
                          {t("p222")}
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                      {newDetails?.additionalDetails?.filmRemoval
                        ? t("p221")
                        : t("p222")}
                    </div>
                  )}
                </div>
              </div>
              <div className=" flex w-full gap-12  ">
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none flex items-center gap-2   ">
                    {t("p232")}
                    <Alert children={<Panic />} text={t("p233")} />
                  </div>
                  {edit ? (
                    <div
                      className=" flex flex-col cursor-pointer relative  border border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem] "
                      onClick={() => {
                        setOpen6(!open6);
                      }}
                    >
                      <div className="  flex items-center justify-between w-full   ">
                        <div
                          className={`  font-Matter text-[1rem] px-2 pr-2 text-[black] font-medium  w-full flex justify-between items-center ${
                            open6 ? "" : ""
                          } leading-none transition-all duration-300 `}
                        >
                          <div>
                            {" "}
                            {newDetails?.additionalDetails?.expressDelivery ? (
                              <div className="  ">
                                {newDetails?.additionalDetails?.expressDelivery
                                  ? t("p221")
                                  : t("p222")}
                              </div>
                            ) : (
                              t("p222")
                            )}
                          </div>
                          <motion.div
                            animate={{
                              rotate: open6 ? "180deg" : "0deg",
                            }}
                            transition={{
                              duration: 0.3,
                              ease: easeInOut,
                            }}
                          >
                            <Halfarrow />
                          </motion.div>
                        </div>
                      </div>
                      <motion.div
                        className={` font-medium  font-Matter text-[1rem] w-full flex flex-col  leading-[1.5] overflow-hidden absolute z-30 px-2 top-14 left-0 bg-[#FFFFFF] rounded-2xl ${
                          open6 ? "border " : ""
                        } border-[#DFDFDF]   `}
                        initial={{
                          height: 0,
                        }}
                        animate={{
                          height: open6 ? "fit-content" : 0,

                          // paddingTop: open ? "12px" : 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: easeInOut,
                        }}
                      >
                        <div
                          className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                          onClick={() => {
                            setNewDetails((prevDetails) => ({
                              ...prevDetails,
                              additionalDetails: {
                                ...prevDetails.additionalDetails,
                                expressDelivery: true,
                              },
                            }));
                          }}
                        >
                          {t("p221")}
                        </div>
                        <div
                          className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                          onClick={() => {
                            setNewDetails((prevDetails) => ({
                              ...prevDetails,
                              additionalDetails: {
                                ...prevDetails.additionalDetails,
                                expressDelivery: false,
                              },
                            }));
                          }}
                        >
                          {t("p222")}
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                      {newDetails?.additionalDetails?.expressDelivery
                        ? t("p221")
                        : t("p222")}
                    </div>
                  )}
                </div>
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none flex items-center gap-2    ">
                    {t("p234")}
                  </div>
                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full h-36  ">
                    {t("p235")}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {newDetails?.additionalDetails?.deliveryLocation?.userName && (
            <div className=" flex flex-col gap-6 w-full ">
              <div className=" font-Polysans text-[2.3rem] text-[#141415] font-semibold    ">
                {t("p236")}
              </div>
              <div className=" flex flex-col gap-8 ">
                <div className=" flex w-full gap-10  ">
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p237")}
                    </div>
                    {edit ? (
                      <div>
                        <Input
                          type="text"
                          value={
                            newDetails?.additionalDetails?.deliveryLocation
                              ?.userName
                          }
                          onChange={(e) => {
                            setNewDetails((prevDetails) => ({
                              ...prevDetails,
                              additionalDetails: {
                                ...prevDetails.additionalDetails,
                                deliveryLocation: {
                                  ...prevDetails.additionalDetails
                                    .deliveryLocation,
                                  userName: e.target.value,
                                },
                              },
                            }));
                          }}
                          className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                          placeholder={t("p200")}
                        />
                      </div>
                    ) : (
                      <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                        {
                          newDetails?.additionalDetails?.deliveryLocation
                            ?.userName
                        }
                      </div>
                    )}
                  </div>
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p238")}
                    </div>
                    {edit ? (
                      <div>
                        <Input
                          type="text"
                          value={
                            newDetails?.additionalDetails?.deliveryLocation
                              ?.streetName
                          }
                          onChange={(e) => {
                            setNewDetails((prevDetails) => ({
                              ...prevDetails,
                              additionalDetails: {
                                ...prevDetails.additionalDetails,
                                deliveryLocation: {
                                  ...prevDetails.additionalDetails
                                    .deliveryLocation,
                                  streetName: e.target.value,
                                },
                              },
                            }));
                          }}
                          className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                          placeholder={t("p200")}
                        />
                      </div>
                    ) : (
                      <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                        {
                          newDetails?.additionalDetails?.deliveryLocation
                            ?.streetName
                        }
                      </div>
                    )}
                  </div>
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p239")}
                    </div>
                    {edit ? (
                      <div>
                        <Input
                          type="text"
                          value={
                            newDetails?.additionalDetails?.deliveryLocation
                              ?.streetNumber
                          }
                          onChange={(e) => {
                            setNewDetails((prevDetails) => ({
                              ...prevDetails,
                              additionalDetails: {
                                ...prevDetails.additionalDetails,
                                deliveryLocation: {
                                  ...prevDetails.additionalDetails
                                    .deliveryLocation,
                                  streetNumber: e.target.value,
                                },
                              },
                            }));
                          }}
                          className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                          placeholder={t("p200")}
                        />
                      </div>
                    ) : (
                      <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                        {
                          newDetails?.additionalDetails?.deliveryLocation
                            ?.streetNumber
                        }
                      </div>
                    )}
                  </div>
                </div>
                <div className=" flex w-full gap-10  ">
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p240")}
                    </div>
                    {edit ? (
                      <div>
                        <Input
                          type="number"
                          value={
                            newDetails?.additionalDetails?.deliveryLocation
                              ?.postalCode
                          }
                          onChange={(e) => {
                            setNewDetails((prevDetails) => ({
                              ...prevDetails,
                              additionalDetails: {
                                ...prevDetails.additionalDetails,
                                deliveryLocation: {
                                  ...prevDetails.additionalDetails
                                    .deliveryLocation,
                                  postalCode: e.target.value,
                                },
                              },
                            }));
                          }}
                          className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                          placeholder={t("p272")}
                        />
                      </div>
                    ) : (
                      <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                        {newDetails?.additionalDetails?.deliveryLocation
                          ?.postalCode
                          ? newDetails?.additionalDetails?.deliveryLocation
                              ?.postalCode
                          : "0000"}
                      </div>
                    )}
                  </div>
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p241")}
                    </div>
                    {edit ? (
                      <Popover
                        open={open7}
                        onOpenChange={setOpen7}
                        className="relative z-[10000]"
                      >
                        <PopoverTrigger asChild>
                          <div
                            className={` flex flex-col  cursor-pointer relative  border 
                        border-[#DFDFDF]
                     bg-[#FFFFFF] min-w-full text-ellipsis rounded-xl px-3 py-3 text-[#444444] font-medium font-Matter `}
                          >
                            {" "}
                            {newDetails?.additionalDetails?.deliveryLocation
                              ?.town
                              ? newDetails?.additionalDetails?.deliveryLocation
                                  ?.town
                              : t("p317")}
                          </div>
                          {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                        </PopoverTrigger>
                        <PopoverContent className="min-w-full p-0">
                          <Command>
                            <CommandInput placeholder={t("p296")} />
                            <CommandEmpty>{t("p318")}</CommandEmpty>
                            <CommandList>
                              <CommandGroup>
                                {townss.map((framework) => (
                                  <div
                                    className="hover:bg-gray-300 cursor-pointer font-Matter "
                                    onClick={() => {
                                      setOpen7(false);
                                      setNewDetails((prevDetails) => ({
                                        ...prevDetails,
                                        additionalDetails: {
                                          ...prevDetails.additionalDetails,
                                          deliveryLocation: {
                                            ...prevDetails.additionalDetails
                                              .deliveryLocation,
                                            town: framework.value,
                                          },
                                        },
                                      }));
                                    }}
                                  >
                                    <CommandItem
                                      key={framework.value}
                                      value={framework.value}
                                      onSelect={(currentValue) => {
                                        setNewDetails((prevDetails) => ({
                                          ...prevDetails,
                                          additionalDetails: {
                                            ...prevDetails.additionalDetails,
                                            deliveryLocation: {
                                              ...prevDetails.additionalDetails
                                                .deliveryLocation,
                                              town:
                                                currentValue ===
                                                newDetails?.additionalDetails
                                                  ?.deliveryLocation.town
                                                  ? ""
                                                  : currentValue,
                                            },
                                          },
                                        }));

                                        setOpen7(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          newDetails?.additionalDetails
                                            ?.deliveryLocation.town ===
                                            framework.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {framework.label}
                                    </CommandItem>
                                  </div>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                        {newDetails?.additionalDetails?.deliveryLocation?.town}
                      </div>
                    )}
                  </div>
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p242")}
                    </div>
                    {edit ? (
                      <Popover
                        open={open8}
                        onOpenChange={setOpen8}
                        className="relative z-[10000]"
                      >
                        <PopoverTrigger asChild>
                          <div
                            className={` flex flex-col  cursor-pointer relative  border 
                        border-[#DFDFDF]
                     bg-[#FFFFFF] min-w-full text-ellipsis rounded-xl px-3 py-3 text-[#444444] font-medium font-Matter `}
                          >
                            {" "}
                            {newDetails?.additionalDetails?.deliveryLocation
                              ?.canton
                              ? newDetails?.additionalDetails?.deliveryLocation
                                  ?.canton
                              : t("p318")}
                          </div>
                          {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                        </PopoverTrigger>
                        <PopoverContent className="min-w-full p-0">
                          <Command>
                            <CommandInput placeholder={t("p296")} />
                            <CommandEmpty>{t("p318")}</CommandEmpty>
                            <CommandList>
                              <CommandGroup>
                                {cantons.map((framework) => (
                                  <div
                                    className="hover:bg-gray-300 cursor-pointer font-Matter "
                                    onClick={() => {
                                      setOpen8(false);
                                      setNewDetails((prevDetails) => ({
                                        ...prevDetails,
                                        additionalDetails: {
                                          ...prevDetails.additionalDetails,
                                          deliveryLocation: {
                                            ...prevDetails.additionalDetails
                                              .deliveryLocation,
                                            canton: framework.value,
                                          },
                                        },
                                      }));
                                    }}
                                  >
                                    <CommandItem
                                      key={framework.value}
                                      value={framework.value}
                                      onSelect={(currentValue) => {
                                        setNewDetails((prevDetails) => ({
                                          ...prevDetails,
                                          additionalDetails: {
                                            ...prevDetails.additionalDetails,
                                            deliveryLocation: {
                                              ...prevDetails.additionalDetails
                                                .deliveryLocation,
                                              canton:
                                                currentValue ===
                                                newDetails?.additionalDetails
                                                  ?.deliveryLocation.canton
                                                  ? ""
                                                  : currentValue,
                                            },
                                          },
                                        }));

                                        setOpen8(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          newDetails?.additionalDetails
                                            ?.deliveryLocation.canton ===
                                            framework.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {framework.label}
                                    </CommandItem>
                                  </div>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                        {
                          newDetails?.additionalDetails?.deliveryLocation
                            ?.canton
                        }
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" w-full bg-[#FFFFFF] border-[1px] border-[#F0F0F0] rounded-full pl-12 pr-2 py-3 flex items-center justify-between sticky bottom-8 left-0 ">
        <div className=" font-Matter font-medium text-[#989898] text-[1rem]  ">
          {t("p243")} <span className=" text-[#242425] "> : {visibleItem}</span>
        </div>
        {edit ? (
          <div
            className=" h-full cursor-pointer bg-[#205FFF] rounded-3xl flex items-center gap-3  font-Matter font-medium text-[#FFFFFF] text-[0.9rem] px-5 py-2 "
            onClick={() => {
              handleSave();
            }}
          >
            {load ? <Spinner border={true} size={"20px"} /> : t("p172")}
          </div>
        ) : (
          <div
            className=" h-full cursor-pointer bg-[#205FFF] rounded-3xl flex items-center gap-3  font-Matter font-medium text-[#FFFFFF] text-[0.9rem] px-5 py-2 "
            onClick={() => {
              setEdit(true);
            }}
          >
            <Edit2 />
            {t("p244")}
          </div>
        )}
      </div>
      {side && (
        <div
          onClick={() => {
            setSide(false);
          }}
          className=" overflow-hidden w-[100vw] left-0 bg-black/30 flex justify-center  items-center z-[49] h-[100vh] fixed top-0 "
        >
          <AnimatePresence>
            <motion.div
              className=" h-full  overflow-hidden overflow-y-scroll w-[40%] bg-[#FFFFFF] absolute top-0 right-0 flex flex-col gap-12 shadow-lg p-6  "
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <div className=" w-full text-[#242425] font-Matter text-[1.7rem] font-medium  ">
                {t("p245")}
              </div>
              <div className=" grid-cols-3 grid gap-4 ">
                {images.map((img) => (
                  <div className=" h-44 rounded-3xl overflow-hidden ">
                    <img
                      src={`https://media.polycolor.ch/polycolor-media/${img}`}
                      className=" object-cover w-full h-full "
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Singlerequestquote;
