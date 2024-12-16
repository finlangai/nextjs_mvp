"use client";
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/src/redux/hooks/useAppStore';
import { selectToken } from "@/src/redux/auth";

export default function MainLayout({ children }: { children: ReactNode }) {
  const token = useAppSelector(selectToken);
  const router = useRouter();
  useEffect(() => {
      if (!token) {
        router.push(`/`);
      }
  }, [router]);

  return (
    <div>
      {children}      
    </div>
  );
}