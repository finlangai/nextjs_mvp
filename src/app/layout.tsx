"use client";

import '@/src/styles/globals.css';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '@/src/redux/store';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css" />
        <title>Fintown</title>
      </head> 
      <body className='bg-fintown-bg font-inter custom-scrollbar'>
        <Provider store={store}>
        {children}
        </Provider>
      </body>
    </html>
  );
}