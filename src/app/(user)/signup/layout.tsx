"use client";
import { ReactNode } from 'react';
import { ReportColumnChartCard, ForeCastingCard, PeCard, ROACard } from "@/src/components/organisms/CardSignup";
import Link from "next/link";

export default function SignupLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className='overflow-hidden bg-fintown-bg'>

        <div className="flex">
            <div className="w-full max-w-[626px]">
                <Link href="/" className="flex items-center pt-[32px] ml-[40px]">
                    <img className="w-[42px] h-[42px]" src="/imgs/logo.png" alt="logo-fintown" />
                    <div className="text-fintown-txt-1 font-bold text-[24px]">fintown</div>
                </Link>
                {children}       
            </div>
            
            <div className="w-full max-w-full h-screen bg-fintown-bg-stn relative">

                <div className="absolute right-[0px] top-[15px]">
                    <img src="/imgs/asset/line2.png" alt="lin2" />
                </div>

                <div className="absolute top-[480px] right-[0px]">
                    <img src="/imgs/asset/line1.png" alt="lin2" />
                </div>

                <div className="absolute top-[340px] left-[170px]">
                    <ReportColumnChartCard/>
                </div>

                <div className="absolute top-[80px] right-[40px]">
                    <ForeCastingCard/>
                </div>

                <div className="absolute top-[136px] left-[120px]">
                    <PeCard/>
                </div>

                <div className="absolute top-[437px] right-[40px]">
                    <ROACard/>
                </div>

                <div className="absolute top-[290px] left-[430px]">
                    <i className='bx bxs-right-top-arrow-circle text-fintown-pr9 text-[24px]'></i>
                </div>

                <div className="absolute top-[610px] left-[700px]">
                    <i className='bx bxs-left-top-arrow-circle text-fintown-pr9 text-[24px]'></i>
                </div>
            </div>
        </div>
      </main>
    </>
  );
}