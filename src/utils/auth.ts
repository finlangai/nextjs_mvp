import Cookies from 'js-cookie';

// Lấy token từ cookie
export const getToken = () => {
  return Cookies.get("token");
};

// Xóa token khi đăng xuất
export const removeToken = () => {
  Cookies.remove("token");
};
