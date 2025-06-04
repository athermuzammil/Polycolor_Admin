"use client";
import AddQuoteFile from "@/api/addquotefile";
import getuserbillingaddress from "@/api/getUserBillingaddress";
import Alert from "@/components/alert";
import Navbar from "@/components/navbar";
import { DatePicker } from "@/components/ui/datepicker";
import { toast } from "@/components/ui/use-toast";
import Arrowleft from "@/public/icons/arrowleft";
import formatDateAndTime from "@/utils/formatDateAndTime";

import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Profile1 from "@/public/icons/profile1";
import Phone from "@/public/icons/phone";
import Email from "@/public/icons/email";
import Location from "@/public/icons/location";
import Getsinglequote from "@/api/getsinglequote";
import Updatequote from "@/api/updatequote";
import { useCurrentLocale, useI18n } from "@/locales/client";
import Spinner from "@/components/spinner";
import { Input } from "@/components/ui/input";

const Editquote = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const ref = useRef(null);
  const [pageload, setpageload] = useState(true);
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [showerror, setshowerror] = useState(false);
  const [send, setsend] = useState();
  const [items, setItems] = useState([
    { name: "", price: "", quantity: 1, cost: 0, description: "" },
  ]);
  const [error, seterror] = useState("Fill all the fields");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [validTill, setvalidTill] = useState();
  const [deadline, setDeadline] = useState("");
  const [dueDateError, setDueDateError] = useState(false);
  const [billingAddressError, setBillingAddressError] = useState(false);
  const [discount, setDiscount] = useState(0);

  const [billingaddress, setbillingaddress] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [open, setopen] = useState(false);
  const [allbillingaddress, setallbillingaddress] = useState([]);
  const [selectedidx, setselectedidx] = useState();
  const [uid, setuid] = useState();

  const handleInputChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    if (field === "price" || field === "quantity") {
      newItems[index].cost =
        parseFloat(newItems[index].price || 0) *
        parseInt(newItems[index].quantity || 0, 10);
    }
    setItems(newItems);
  };

  const handleQuantityChange = (index, delta) => {
    const newItems = [...items];
    newItems[index].quantity =
      parseInt(newItems[index].quantity || 0, 10) + delta;
    newItems[index].quantity = Math.max(newItems[index].quantity, 1); // Prevent negative quantities
    newItems[index].cost =
      parseFloat(newItems[index].price || 0) * newItems[index].quantity;
    setItems(newItems);
  };

  const handleAddItemField = () => {
    setItems([...items, { name: "", price: "", quantity: 1, cost: null }]);
  };

  const handleRemoveItemField = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };
  const validate = () => {
    if (
      billingaddress.name.trim().length == 0 ||
      !billingaddress.email.includes("@") ||
      billingaddress.phone.trim().length == 0 ||
      billingaddress.address.trim().length == 0
    ) {
      setBillingAddressError(true);
      toast({
        variant: "destructive",
        title: <div className=" text-[1.1rem] ">{t("p183")}</div>,
        description: (
          <div className=" text-[1rem] font-Matter pt-1 ">{t("p76")}</div>
        ),
      });
      if (deadline.includes("NaN") || !deadline) {
        //console.log(deadline);
        setDueDateError(true);
      }
      return false;
    }
    //console.log(deadline, "deadline");

    if (deadline?.toString().includes("NaN") || !deadline) {
      //console.log(deadline);
      setDueDateError(true);
      return false;
    }
    for (const item of items) {
      //console.log(item);
      if (item.name.trim().length == 0 || !item.price) {
        setshowerror(true);
        seterror("Fill all the required fields");
        toast({
          variant: "destructive",
          title: <div className=" text-[1.1rem] ">{t("p183")}</div>,
          description: (
            <div className=" text-[1rem] font-Matter pt-1 ">{t("p77")}</div>
          ),
        });
        return false;
      }
    }
    return true;
  };

  const downloadPDF = async () => {
    if (loading) return;
    seterror("");
    setshowerror(false);
    setDueDateError(false);
    const isValid = validate();
    if (!isValid) {
      return;
    }
    setloading(true);
    const requestdata = {
      billingAddress: {
        userName: billingaddress.name,
        phone: billingaddress.phone,
        email: billingaddress.email,
        location: billingaddress.address,
      },
      validTill: new Date(deadline),
      total: calculateTotal(),
      subtotal: calculateSubtotal(),
      items: items,
      tax: calculateGST(),
      id: id,
      discount: discount,
    };
    const token = localStorage.getItem("token");
    const Quote = await Updatequote(token, requestdata);
    if (Quote.error) {
      setloading(false);
      return toast({
        variant: "destructive",
        title: <div className=" text-[1.1rem] ">{t("p183")}</div>,
        description: (
          <div className=" text-[1rem] font-Matter pt-1 ">{Quote.error}</div>
        ),
      });
    }
    //console.log(Quote, "qqqqqq");
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

    if (Quote) {
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

      const myfile = new File([blob], `${Quote._id}.pdf`, {
        type: "application/pdf",
      });
      //console.log(myfile);

      const add = await AddQuoteFile(token, Quote._id, myfile);
      //console.log(add, "qqqqqq");
      router.push(`/dashboard/quotedetails?id=${Quote._id}`);
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.cost, 0).toFixed(2);
  };

  const calculateGST = () => {
    return (calculateSubtotal() * 0.18).toFixed(2);
  };

  const calculateTotal = () => {
    return (
      parseFloat(calculateSubtotal()) + parseFloat(calculateGST())
    ).toFixed(2);
  };

  useEffect(() => {
    const getAddress = async () => {
      const token = localStorage.getItem("token");
      const address = await getuserbillingaddress(token, uid);
      setallbillingaddress(address);
      //console.log(address, "rrrrrrr");
      return address;
    };
    if (uid) {
      getAddress();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setbillingaddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    const getQuote = async () => {
      const token = localStorage.getItem("token");
      const quote = await Getsinglequote(token, id);
      setItems(quote.items);
      setbillingaddress({
        name: quote.billingAddress.userName,
        email: quote.billingAddress.email,
        phone: quote.billingAddress.phone,
        address: quote.billingAddress.location,
      });
      setDeadline(quote.validTill);
      setvalidTill(quote.validTill);
      setDiscount(quote?.discount || 0);
      setuid(quote.userId);
      if (quote.send) {
        setsend(true);
      }
      setpageload(false);
    };
    if (id) {
      getQuote();
    }
  }, []);

  const handleQuantityInputChange = (index, value) => {
    const newItems = [...items];
    const parsedValue = parseInt(value, 10);
    newItems[index].quantity = Math.max(parsedValue, 1); // Prevent negative quantities
    newItems[index].cost =
      parseFloat(newItems[index].price || 0) * newItems[index].quantity;
    setItems(newItems);
  };

  const calculateDiscount = () => {
    return (calculateSubtotal() * (discount / 100)).toFixed(2);
  };

  if (pageload) {
    return (
      <div className=" w-full h-[100vh] flex  justify-center items-center">
        <Spinner />
      </div>
    );
  }
  // if (send) {
  //   return (
  //     <div className=" w-full h-[100vh] flex  justify-center items-center">
  //       <div className=" space-y-5 px-8 py-16 rounded-3xl text-center ">
  //         <div
  //           className="  font-Polysans
  //          font-medium text-[2rem] text-[#363B40] "
  //         >
  //           {t("p184")}
  //         </div>
  //         <div className=" flex justify-center gap-6">
  //           <div
  //             className=" bg-[#363B40] hover:bg-[#282B32] text-[#FFFFFF] font-medium font-Matter cursor-pointer text-[0.9rem] rounded-3xl px-3 py-2"
  //             onClick={() => router.push(`/dashboard/quotedetails?id=${id}`)}
  //           >
  //             {t("p185")}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <AlertDialog className={" w-full max-w-max"} open={open}>
        <AlertDialogContent className={" "}>
          <AlertDialogHeader>
            <AlertDialogTitle className={" font-Polysans font-semibold  pb-4 "}>
              {t("p186")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className=" font-Matter font-medium   text-[0.95rem] ">
                {allbillingaddress?.length == 0 ? "No saved Address" : ""}
              </div>

              <div className=" grid grid-cols-3 2xl:grid-cols-4 gap-4 ">
                {allbillingaddress?.map(
                  (item, index) =>
                    index != 0 && (
                      <div
                        className={clsx(
                          " bg-[#F7F8F9] rounded-3xl cursor-pointer select-none border-[1px] duration-300 py-4 px-8 flex flex-col gap-8  ",
                          selectedidx == index
                            ? " border-[#363B40] "
                            : " border-[#E5EAEF]"
                        )}
                        onClick={() => setselectedidx(index)}
                      >
                        <div className=" w-full flex items-start py-3 justify-between ">
                          <div className=" flex flex-col gap-6 ">
                            <div className=" flex gap-4 leading-none font-Matter font-medium text-[1rem] text-[#737A82]  ">
                              <Profile1 />
                              {item.userName}
                            </div>
                            <div className=" flex gap-4 leading-none font-Matter font-medium text-[1rem] text-[#737A82]  ">
                              <Phone />
                              {item.phone}
                            </div>
                            <div className=" flex gap-4 leading-none font-Matter font-medium text-[1rem] text-[#737A82]  ">
                              <Email />
                              {item.email}
                            </div>
                            <div className=" flex gap-4 leading-[1.3] font-Matter font-medium text-[1rem] text-[#737A82] w-[10rem]  ">
                              <Location />
                              {item.location.streetNumber},
                              {item.location.streetName},{item.location.town},
                              {item.location.postalCode}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className={" p-2 font-Matter py-1 outline-none"}
              onClick={() => setopen(false)}
            >
              {t("p78")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setbillingaddress({
                  name: allbillingaddress[selectedidx].userName,
                  phone: allbillingaddress[selectedidx].phone,
                  email: allbillingaddress[selectedidx].email,
                  address: ` ${allbillingaddress[selectedidx].location.streetNumber} ${allbillingaddress[selectedidx].location.streetName} ${allbillingaddress[selectedidx].location.town} ${allbillingaddress[selectedidx].location.postalCode}`,
                });
                setopen(false);
              }}
            >
              <div className=" bg-[#205FFF] font-Matter font-medium text-[0.9rem] text-white px-3 py-2 rounded-full ">
                {t("p79")}
              </div>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex sticky top-0 px-[1rem] justify-between pb-5 bg-white items-center">
        <div className="flex items-center gap-4">
          <div>
            {" "}
            <Arrowleft />
          </div>
          <div className="text-[1.5rem] font-semibold font-Polysans">
            {t("p80")}
          </div>
        </div>
        <div>
          <Navbar />
        </div>
      </div>
      <div className=" bg-[#F7F8F9] border mx-[1rem] mb-12 border-[#E5EAEF] rounded-xl h-[18rem] p-6 flex justify-between  ">
        <div className=" w-[40%] space-y-3 ">
          <div className=" font-Polysans font-semibold flex justify-between items-center text-[#141415]  ">
            {t("p81")}
            <div
              onClick={() => {
                setopen(true);
              }}
            >
              <Alert text={t("p187")}>
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="37"
                    height="37"
                    rx="18.5"
                    fill="white"
                  />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="37"
                    height="37"
                    rx="18.5"
                    stroke="#DFDFDF"
                  />
                  <path
                    d="M10.6665 27.333H27.3332"
                    stroke="#323336"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.4585 27.3334L11.5002 17.3084C11.5002 16.8 11.7418 16.3167 12.1418 16.0001L17.9752 11.4584C18.5752 10.9917 19.4168 10.9917 20.0252 11.4584L25.8585 15.9917C26.2668 16.3084 26.5002 16.7917 26.5002 17.3084V27.3334"
                    stroke="#323336"
                    stroke-miterlimit="10"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19.8332 23.167H18.1665C17.4748 23.167 16.9165 23.7253 16.9165 24.417V27.3337H21.0832V24.417C21.0832 23.7253 20.5248 23.167 19.8332 23.167Z"
                    stroke="#323336"
                    stroke-miterlimit="10"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.9165 20.4587H15.2498C14.7915 20.4587 14.4165 20.0837 14.4165 19.6253V18.3753C14.4165 17.917 14.7915 17.542 15.2498 17.542H16.9165C17.3748 17.542 17.7498 17.917 17.7498 18.3753V19.6253C17.7498 20.0837 17.3748 20.4587 16.9165 20.4587Z"
                    stroke="#323336"
                    stroke-miterlimit="10"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M22.75 20.4587H21.0833C20.625 20.4587 20.25 20.0837 20.25 19.6253V18.3753C20.25 17.917 20.625 17.542 21.0833 17.542H22.75C23.2083 17.542 23.5833 17.917 23.5833 18.3753V19.6253C23.5833 20.0837 23.2083 20.4587 22.75 20.4587Z"
                    stroke="#323336"
                    stroke-miterlimit="10"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M24.8333 14.833L24.8083 12.333H21.1416"
                    stroke="#323336"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Alert>
            </div>
          </div>
          <Input
            name="name"
            placeholder={t("p188")}
            value={billingaddress.name}
            onChange={handleChange}
            className={clsx(
              "  duration-300 placeholder:text-[#AFB2B6]  w-full bg-white font-Matter outline-none text-[0.95rem] border  py-2 px-3 rounded-lg ",
              billingAddressError && billingaddress.name.trim().length == 0
                ? "border-[#da3232]"
                : "border-[#DFDFDF]"
            )}
            type="text"
          />
          <Input
            name="phone"
            placeholder={t("p83")}
            onChange={handleChange}
            value={billingaddress.phone}
            className={clsx(
              "  duration-300 placeholder:text-[#AFB2B6]  w-full bg-white font-Matter outline-none text-[0.95rem] border border-[#DFDFDF] py-2 px-3 rounded-lg ",
              billingAddressError && billingaddress.phone.trim().length == 0
                ? "border-[#da3232]"
                : "border-[#DFDFDF]"
            )}
            type="number"
          />
          <Input
            name="email"
            placeholder={t("p84")}
            onChange={handleChange}
            value={billingaddress.email}
            className={clsx(
              "  duration-300 placeholder:text-[#AFB2B6]  w-full bg-white font-Matter outline-none text-[0.95rem] border border-[#DFDFDF] py-2 px-3 rounded-lg ",
              billingAddressError && !billingaddress.email.includes("@")
                ? "border-[#da3232]"
                : "border-[#DFDFDF]"
            )}
            type="email"
          />
        </div>
        <div className=" w-[40%] space-y-3 min-h-full flex flex-col h-full ">
          <div className=" font-Polysans font-semibold h-max ">{t("p85")}</div>

          <div
            className={clsx(
              " w-full border duration-300 rounded-lg ",
              dueDateError ? "border-[#da3232]" : "border-[#DFDFDF]"
            )}
            onClick={() => setDueDateError(false)}
          >
            <DatePicker olddate={deadline} dedlinedate={setDeadline} />
          </div>
          <div className=" h-full ">
            <textarea
              name="address"
              value={billingaddress.address}
              onChange={handleChange}
              placeholder={t("p86")}
              className={clsx(
                " placeholder:text-[#AFB2B6] duration-300 box-border flex items-start min-h-full text-start w-full bg-white font-Matter outline-none text-[0.95rem] border   py-2 px-3 rounded-lg ",
                billingAddressError && billingaddress.address.trim().length == 0
                  ? "border-[#da3232]"
                  : "border-[#DFDFDF]"
              )}
              type="text"
            />
          </div>
        </div>
      </div>
      <div
        ref={ref}
        className=" w-full flex gap-6 pb-10 select-none px-[1rem] "
      >
        <div className=" w-[55%]">
          <div className=" w-[100%]">
            <div className="  text-[#141415] text-[1.1rem] font-Polysans font-semibold grid grid-cols-10 gap-5">
              <div className=" col-span-4 ">{t("p87")}</div>
              <div className="  col-span-2">{t("p88")} </div>
              <div className=" col-span-2">{t("p89")} </div>
              <div className=" col-span-1">{t("p90")} </div>
            </div>
            <div
              className=" grid gap-5 pt-8 "
              onClick={() => setshowerror(false)}
            >
              {items.map((item, index) => (
                <div
                  className="  grid font-Matter grid-cols-10  gap-5 "
                  key={index}
                >
                  <div className=" col-span-4 ">
                    <Input
                      className={clsx(
                        "   placeholder:text-[#AFB2B6] outline-none px-3 py-2 w-full duration-300   text-[0.95rem] border-[1px] rounded-md  ",
                        showerror && item.name.trim().length == 0
                          ? " border-[#da3232] "
                          : "border-[#DFDFDF]"
                      )}
                      type="text"
                      value={item.name}
                      onChange={(e) => {
                        handleInputChange(index, "name", e.target.value);
                      }}
                      placeholder={t("p92")}
                      required
                    />
                  </div>
                  <div className=" col-span-2  ">
                    <Input
                      className={clsx(
                        "   placeholder:text-[#AFB2B6] outline-none px-3 py-2 w-full duration-300    text-[0.95rem] border-[1px] rounded-md  ",
                        showerror && !item.price
                          ? " border-[#da3232] "
                          : "border-[#DFDFDF]"
                      )}
                      value={item.price}
                      onChange={(e) => {
                        handleInputChange(index, "price", e.target.value);
                      }}
                      required
                      type="number"
                    />
                  </div>
                  <div className=" col-span-2 flex gap-4 2xl:gap-2 border-[1px] h-full  w-[120px] px-2  rounded-lg    items-center justify-between text-[#7E7E7E] border-[#DFDFDF] ">
                    <div className="text-[#141415]  text-[0.95rem]">
                      <Input
                        type="number"
                        className="  w-[50px] outline-none"
                        onChange={(e) =>
                          handleQuantityInputChange(index, e.target.value)
                        }
                        value={item.quantity}
                      />
                    </div>
                    <div
                      className=" cursor-pointer w-max"
                      type="button"
                      onClick={() => handleQuantityChange(index, -1)}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 10H15"
                          stroke="#7E7E7E"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <div
                      className="cursor-pointer w-max"
                      type="button"
                      onClick={() => handleQuantityChange(index, 1)}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 10H15"
                          stroke="#7E7E7E"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M10 15V5"
                          stroke="#7E7E7E"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className=" col-span-1 min-h-full h-max border-[#DFDFDF]  text-[0.95rem] border-[1px] px-2 py-2 rounded-lg ">
                    <div>{item?.cost?.toFixed(2)}</div>
                  </div>
                  <div className="col-span-1">
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItemField(index)}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                            stroke="#FF5252"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                            stroke="#FF5252"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M18.8504 9.13989L18.2004 19.2099C18.0904 20.7799 18.0004 21.9999 15.2104 21.9999H8.79039C6.00039 21.9999 5.91039 20.7799 5.80039 19.2099L5.15039 9.13989"
                            stroke="#FF5252"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10.3301 16.5H13.6601"
                            stroke="#FF5252"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.5 12.5H14.5"
                            stroke="#FF5252"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className=" col-span-4  ">
                    <textarea
                      value={item.description}
                      onChange={(e) =>
                        handleInputChange(index, "description", e.target.value)
                      }
                      placeholder={t("p91")}
                      className="  placeholder:text-[#AFB2B6] outline-none px-3 py-2 w-full duration-300 text-[0.95rem] border-[1px] rounded-md "
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              className=" grid grid-cols-8 gap-5 pt-5 "
              onClick={() => setshowerror(false)}
            >
              <div
                className=" cursor-pointer font-Matter font-medium flex w-full justify-center text-[#205FFF] text-[1rem] items-center gap-2 leading-none rounded-lg px-3 py-2 col-span-3 "
                onClick={handleAddItemField}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8H13"
                    stroke="#205FFF"
                    stroke-width="1.3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 13V3"
                    stroke="#205FFF"
                    stroke-width="1.3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {t("p59")}
              </div>
            </div>
            <div
              className=" py-8 
            flex flex-col
             gap-6 items-start justify-start "
            >
              <div className=" font-Polysans font-semibold text-[#141415] text-[1rem] leading-none      ">
                Discount <span className=" font-Matter  ">(%)</span>
              </div>
              <div className=" w-fit border-1 border-[#DFDFDF] rounded-xl flex gap-6 items-center justify-center py-3 pl-2 font-Polysans font-medium text-[#141415] text-[1rem] leading-none  ">
                <div className="">
                  {discount} <span className=" font-Matter  ">%</span>
                </div>
                <div className=" flex items-center gap-3 ">
                  <div
                    className=" cursor-pointer "
                    onClick={() => {
                      if (discount > 0) {
                        setDiscount(discount - 1);
                      }
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 10H15"
                        stroke="#7E7E7E"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div
                    className=" cursor-pointer "
                    onClick={() => {
                      if (discount < 16) {
                        setDiscount(discount + 1);
                      }
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 10H15"
                        stroke="#7E7E7E"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10 15V5"
                        stroke="#7E7E7E"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>

            <div className=" flex justify-end ">
              <div
                className=" bottom-10 fixed cursor-pointer h-[50px] w-[160px] justify-center flex bg-[#205FFF] text-white font-Matter py-3 px-5 rounded-full "
                onClick={() => downloadPDF()}
              >
                {loading ? <Spinner size={"20px"} border={true} /> : t("p196")}
              </div>
            </div>
          </div>
        </div>
        <div className=" w-[45%] ">
          <div className="border-[1px] py-[1rem] border-[#F1F1F1] shadow-md ">
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
                      Polycolor Schönenwerd AG, Bahnhofstrasse 77, 5012
                      Schönenwerd
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
                    <div className=" pt-1">{billingaddress.name}</div>
                    <div>
                      {t("p99")}: +41 {billingaddress.phone}
                    </div>
                    <div>
                      {t("p98")}: {billingaddress.email}
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
                          {formatDateAndTime(deadline).formatted}
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
                {items.map((item, index) => (
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
                        CHF {item.cost?.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className=" w-full page-break-inside-avoid flex justify-end pt-20 pb-6 pr-8">
                <div className=" w-[40%] font-Matter font-semibold text-[#909099]">
                  <div className=" border-t-[1px] flex justify-between  pt-1 pb-4 border-[#C3C3C3]">
                    <div className=" text-[#1D1D1F]">{t("p97")}</div>
                    <div className=" text-[0.95rem] ">
                      CHF {calculateSubtotal()}
                    </div>
                  </div>
                  <div className=" flex justify-between pt-2 pb-5  border-[#C3C3C3] border-y-[1px]">
                    <div>GST 18%</div>
                    <div className=" text-[0.95rem]">CHF {calculateGST()}</div>
                  </div>
                </div>
              </div>
              <div className=" page-break-inside-avoid bg-[#EEEEEE] text-[#1D1D1F] px-2 pb-5 flex justify-between items-center pt-1 font-Matter font-medium pr-7 ">
                <div>{t("p96")}</div>
                <div> CHF {calculateTotal()}</div>
              </div>
              <div className="page-break-inside-avoid text-center font-Polysans    font-semibold text-[1.1rem] py-4">
                {t("p95")}
              </div>
              <div className="page-break-inside-avoid font-Polysans font-semibold flex justify-between py-10">
                {discount > 0 && (
                  <div className=" w-[40%]">
                    <div>{t("p94")} </div>
                    <div className=" font-Matter font-medium text-[0.9rem] text-[#040404]   ">
                      {(
                        Number(calculateSubtotal()) -
                        Number(calculateDiscount()) +
                        (Number(calculateSubtotal()) -
                          Number(calculateDiscount())) *
                          (18 / 100)
                      ).toFixed(2)}
                      Payable within 10 days ({discount}% Discount)
                    </div>
                    <div className=" font-Matter font-medium text-[0.9rem] text-[#040404]   ">
                      {calculateTotal()}
                      Payable (Gross Amount)
                    </div>
                    <div className=" font-Matter text-[#424242] font-normal text-[0.9rem] ">
                      If you pay within 10 days, you are eligible for a discount
                      of {discount}%.
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
                )}
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
      </div>
    </div>
  );
};

export default Editquote;
