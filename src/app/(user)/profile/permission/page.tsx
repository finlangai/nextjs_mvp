"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pricing from "@/src/components/organisms/Pricing";

export default function Permission() {
    return (
      <div className="w-3/4 pl-10 pt-16 h-[614px]">
      <ToastContainer />
      <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-xl font-bold">Quyền hạn sử dụng</div>
      < Pricing />
    </div>
   
    );
}
