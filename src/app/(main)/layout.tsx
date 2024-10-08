"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  useEffect(() => {
      const token = Cookies.get('token'); // Lấy token từ cookies
      if (token) {
        // Nếu có token, điều hướng người dùng đến dashboard
        router.push('/dashboard');
      }
  }, [router]);


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
