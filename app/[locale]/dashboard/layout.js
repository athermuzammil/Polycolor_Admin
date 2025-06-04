import Ipadsidebar from "@/components/ipadsidebar";
import Mobileside from "@/components/mobileside";
import Sidebar from "@/components/sidebar";
import Sidebar2 from "@/components/sidebar2";

export default function RootLayout({ children }) {
  return (
    <div className=" flex w-[100vw]  relative    ">
      <div className=" hidden lg:block w-[13rem] xl:min-w-[20rem]  xl:max-w-[20rem]   h-[100svh] sticky  top-0">
        <Sidebar />
      </div>
      {/* <div className=" lg:hidden  w-[7rem]  h-[100svh] sticky left-0 z-[100]  top-0 ">
        <Ipadsidebar />
      </div> */}
      <div className="lg:hidden bottom-5 fixed w-[100svw] z-[50] ">
        <Ipadsidebar />
      </div>
      <div className=" w-[calc(100%-0rem)] lg:w-[calc(100vw-13rem)]  xl:w-[calc(100vw-20rem)] h-full relative z-500 bg-white ">
        {children}
      </div>
    </div>
  );
}
