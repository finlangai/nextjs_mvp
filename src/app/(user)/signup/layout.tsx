"use client";
import { ReactNode } from 'react';
import { ReportColumnChartCard, ForeCastingCard, PeCard, ROACard } from "@/src/components/organisms/CardSignup";
import Link from "next/link";

export default function SignupLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className='overflow-hidden flex gap-20'>
        <div className="flex items-center justify-center h-screen">
            <img 
                src="/imgs/login/LoginImage.png" 
                alt="Login Image" 
                className="h-full max-h-screen object-cover w-auto"
            />
        </div>
            <div className="w-full max-w-[626px]">
                {children}       
            </div>
      </main>
    </>
  );
}