'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import '@/src/styles/globals.css';
import store from '@/src/redux/store';
import TopLoader from 'nextjs-toploader';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true); // Mặc định là dark mode

  useEffect(() => {
    // Kiểm tra nếu có sẵn thông tin dark mode trong localStorage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setIsDarkMode(savedMode === 'true');
    } else {
      // Mặc định chế độ tối nếu không có trong localStorage
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Cập nhật class 'dark' trên body khi chế độ dark thay đổi
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  // const toggleDarkMode = () => {
  //   setIsDarkMode(prevMode => !prevMode);
  // };

  return (
    <html lang="vi">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
        <title>Fintown</title>
      </head>
      <body className="bg-fintown-bg dark:bg-fintown-bg-dark font-inter custom-scrollbar">
        {/* Thanh trạng thái chuyển trang */}
        <TopLoader color="#25B770" height={4} showSpinner={false} />

        <Provider store={store}>
          {/* Nút chuyển chế độ sáng/tối */}
          {/* <button
            className="fixed top-4 right-4 p-2 rounded-full bg-gray-800 text-white"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? 'Chuyển sang sáng' : 'Chuyển sang tối'}
          </button> */}

          {children}
        </Provider>
      </body>
    </html>
  );
}
