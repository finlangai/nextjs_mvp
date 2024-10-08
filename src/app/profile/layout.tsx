"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className='mt-[70px]'>
        {children}
      </main>
      <Footer backgroundColor="" />
    </>
  );
}