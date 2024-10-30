"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const StockValuationRedirect = ({ params }: { params: { symbol: string }}) => {
  const router = useRouter();
  const { symbol } = params;

  useEffect(() => {
    router.push(`/dashboard/dinh-gia-co-phieu/${symbol}/chiet-khau-dong-tien`);
  }, [router, symbol]);

  return null;
};

export default StockValuationRedirect;