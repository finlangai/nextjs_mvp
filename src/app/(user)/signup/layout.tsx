"use client";
import { ReactNode } from 'react';
import { ReportColumnChartCard, ForeCastingCard, PeCard, ROACard } from "@/src/components/organisms/CardSignup";
import Link from "next/link";

export default function SignupLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className='overflow-hidden bg-[#181A20]'>
        <div className="flex">

          <div className="h-screen flex items-center justify-center relative">
            <img src="/imgs/signupfintown.png" alt="Login Image" className="h-screen w-auto object-cover" />
            <img src="/imgs/logofintown.png" alt="logo fintown" className='absolute top-[60px]' />
            <div className='absolute top-[200px] text-center text-[#181A20] font-bold'> 
              <p>Phân tích kỹ, đầu tư thông,</p>
              <p>Muôn sự thành công, xứng ý toại lòng.</p>
            </div>
          </div>

          <div className=" ml-[80px] w-full max-w-[626px]">
              {children}       
          </div>
        </div>
      </main>
    </>
  );
}