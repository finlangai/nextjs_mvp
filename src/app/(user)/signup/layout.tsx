"use client";
import { ReactNode } from 'react';
import { ReportColumnChartCard, ForeCastingCard, PeCard, ROACard } from "@/src/components/organisms/CardSignup";
import Link from "next/link";

export default function SignupLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className='overflow-hidden'>
        <div className="flex">
            <div className="w-full max-w-[626px]">
                {children}       
            </div>
          </div>
      </main>
    </>
  );
}