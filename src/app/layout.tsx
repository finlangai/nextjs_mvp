'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import '@/src/styles/globals.css';
import store from '@/src/redux/store';
import TopLoader from 'nextjs-toploader';

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="vi">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
        <link rel="icon" type="image/png" href="/imgs/logo.png" />
        <title>Fintown</title>
      </head>
      <body className="font-inter custom-scrollbar">
        {/* Thanh trạng thái chuyển trang */}
        <TopLoader color="#25B770" height={4} showSpinner={false} />

        <Provider store={store}>

          {children}
        </Provider>
      </body>
    </html>
  );
}
