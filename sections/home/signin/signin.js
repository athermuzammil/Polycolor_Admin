"use client";
import Adminlogin from "@/api/adminlogin";
import { getToken } from "@/api/getToken";
import Eye from "@/public/icons/eye";
import src from "@/public/images/Frame.png";
import Eyeslash from "@/public/icons/eyelash";
import Logo from "@/public/icons/logo";
import { useUser } from "@/redux/userContext";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import Spinner from "@/components/spinner";
import { useCurrentLocale, useI18n } from "@/locales/client";
import { Input } from "@/components/ui/input";

const Signin = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const { dispatch, state } = useUser();
  const [pageload, setpageload] = useState(true);
  const [loading, setloading] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState({});
  const [showPassword, setshowPassword] = useState(false);
  const router = useRouter();
  const user = state.user;
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    const token = getToken();

    if (user || token) {
      setpageload(true);
      router.push("/dashboard");
    } else if (!token) {
      setpageload(false);
    }
  }, [user]);

  const validate = () => {
    const error = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      error.email = t("p263");
    } else if (!emailRegex.test(email)) {
      error.email = t("p264");
    }
    if (!password) {
      error.password = t("p265");
    }
    return error;
  };

  const signin = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      seterror(validationErrors);
    } else {
      seterror({});
      setloading(true);
      const user = await Adminlogin(email, password);
      if (user?.token) {
        dispatch({ type: "SET_USER", payload: user });
        router.push("/dashboard");
      } else if (user.error) {
        //console.log(user.error);
        setloading(false);
        toast({
          variant: "destructive",
          title: <div className=" text-[1.1rem] ">Oops!</div>,
          description: <div className=" text-[1rem] pt-1 ">{user.error}</div>,
        });
      }
      //console.log(email, password);
    }
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  if (pageload) {
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center ">
        <Spinner />
      </div>
    );
  }

  return (
    <div className=" max-h-screen w-full 2xl:h-[100vh]">
      <div className="flex min-h-full h-full w-full font-Matter">
        <div className=" w-[40%] xl:w-[35%] lg:px-10 px-5 pt-8">
          <div className="max-w-[400px] h-full flex flex-col gap-10">
            <div>
              <div>
                <Logo />
              </div>
              <div className=" text-[1.5rem] lg:text-[1.75rem] font-semibold font-Polysans pt-10 xl:pt-20">
                {t("p254")}
              </div>
              <div className="text-[0.95rem] md:text-[1rem] text-[#7E8086] font-medium pt-2 font-Matter">
                {t("p255")}
              </div>
            </div>
            <div className=" 2xl:pb-36">
              <div className="text-[1rem] font-medium pt-0 xl:pt-16">
                {t("p84")}
                <Input
                  ref={emailRef}
                  type="text"
                  className="w-full px-3 py-4 rounded-2xl font-normal placeholder:text-[#AFB2B6] bg-[#FDFDFD] mt-2 border-[#DFDFDF] border-[1px] outline-none"
                  placeholder={t("p256")}
                  onChange={(e) => {
                    setemail(e.target.value) & (error.email = "");
                  }}
                  onKeyDown={(e) => handleKeyDown(e, passwordRef)}
                />
              </div>
              <div className="h-4 mt-1">
                {error.email && (
                  <div className="text-red-400 text-[0.9rem]">
                    {error.email}
                  </div>
                )}
              </div>
              <div className="text-[1rem] font-medium pt-4 xl:pt-10">
                {t("p257")}
                <div className="relative border-[#DFDFDF] border-[1px] mt-2 rounded-2xl">
                  <Input
                    ref={passwordRef}
                    type={showPassword ? "text" : "password"}
                    className="w-full px-3 py-4 font-normal placeholder:text-[#AFB2B6] rounded-2xl outline-none"
                    placeholder={t("p258")}
                    onChange={(e) => {
                      setpassword(e.target.value) & (error.password = "");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && signin()}
                  />
                  <div
                    onClick={() => setshowPassword(!showPassword)}
                    className="absolute top-[50%] -translate-y-[50%] right-3 cursor-pointer"
                  >
                    {showPassword ? <Eye /> : <Eyeslash />}
                  </div>
                </div>
                <div className="h-4 mt-1">
                  {error.password && (
                    <span className="text-red-400 text-[0.9rem]">
                      {error.password}
                    </span>
                  )}
                </div>
              </div>
              <div
                className="bg-[#015AF0] text-[#ffffff] text-center h-[60px] flex justify-center items-center mt-12 rounded-full cursor-pointer"
                onClick={() => signin()}
              >
                {loading ? <Spinner border={true} size={"20px"} /> : t("p259")}
              </div>
            </div>
          </div>
        </div>
        <div className=" w-[60%] xl:w-[70%] bg-black h-screen  overflow-hidden relative  ">
          <div className="flex flex-col xl:items-center xl:justify-center w-[100%] h-full relative ">
            <div className=" w-full h-[20%] flex lg:items-center lg:justify-center ">
              <div className="text-[#7E8086] text-[1.375rem] font-medium text-center w-[500px] pt-10 lg:pt-0 px-2 lg:px-0">
                {t("p262")}
              </div>
            </div>
            <div
              className=" max-[1100px]:w-[400px] max-[1600px]:w-[500px] w-[650px] absolute bottom-0 left-[50%] -translate-x-1/2 xl:-translate-x-0  xl:left-0
               xl:relative xl:top-7 1xl:top-0 1xl:bottom-6 
              h-fit xl:h-[80%] "
            >
              <Image className="  object-contain " src={src} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
