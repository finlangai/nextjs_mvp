import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const LoginForm = () => {
 
  function isValidEmail(email:string) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return !emailPattern.test(email);
 }
 function containsNumber(str: string): boolean {
  return /\d/.test(str);
}
function containsUpperCase(str: string): boolean {
  
  return /[A-Z]/.test(str);
}
  const [loginForm , setLoginForm] = useState({email: "" , password : ""})
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const [buttonCheck , setButtonCheck] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setButtonCheck(true);
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, loginForm);
      if (response.data && response.data.token) {
        const { token, expiresIn , type } = response.data;
        Cookies.set('token', token, {
          expires: expiresIn / (24 * 60 * 60),
          secure: true,
          sameSite: 'strict',
          path: '/',
        });        
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      } else {
        throw new Error('Không nhận được token');
      }
    } catch (error) {
      toast.error('Tài khoản hoặc mật khẩu không chính xác');
      console.error(error);
    }
    
  };
  return (
    
    <form onSubmit={handleSubmit} className="w-[452px] py-[28px] px-[26px] bg-fintown-bg-stn rounded-[20px]">
      <ToastContainer />
    <div className="font-bold text-fintown-txt-1 text-[24px] mb-[28px]">
      Đăng nhập với tài khoản
    </div>
    <div className="mb-[30px]">
      <div className="font-medium text-fintown-txt-1 text-sm mb-[16px]">Email</div>
      <div className="px-[20px] h-[48px] border border-fintown-br-input rounded-[10px] flex items-center hover:border-fintown-pr9">
          <input
            name="email"
            type="text"
            value={loginForm.email}
            placeholder="username@gmail.com"
            className="text-fintown-txt-1 bg-transparent outline-none text-sm w-full"
            onChange={handleInputChange}
          />
          {loginForm.email.length > 3  &&(
           <>
            {isValidEmail(loginForm.email) &&  (
              <div className="relative group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="#F56565"
              stroke="currentColor"strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-alert cursor-pointer"
            >
              <circle cx={12} cy={12} r={10} />
              <line x1={12} x2={12} y1={8} y2={12} />
              <line x1={12} x2="12.01" y1={16} y2={16} />
            </svg>
            <span className="absolute top-1 right-5 transform -translate-y-1/2 text-white text-xs bg-black p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap min-w-[120px] text-center">
               Nhập đúng định dạng email
            </span>
          </div>
            )}
           </>
          )}
        </div>
    </div>
    <div className="mb-[30px]">
      <div className="font-medium text-fintown-txt-1 text-sm mb-[16px]">Mật khẩu</div>
      <div className="px-[20px] h-[48px] border border-fintown-br-input rounded-[10px] flex items-center hover:border-fintown-pr9">
        <input
          name="password"
          type="password"
          value={loginForm.password}
          placeholder="Password"
          className="text-fintown-txt-1 bg-transparent outline-none text-sm w-full"
          onChange={handleInputChange}
        />
    {loginForm.password.length > 0 && (
  (loginForm.password.length < 8 || !containsNumber(loginForm.password) || !containsUpperCase(loginForm.password)) && (
    <div className="relative group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="#F56565"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-alert cursor-pointer"
      >
        <circle cx={12} cy={12} r={10} />
        <line x1={12} x2={12} y1={8} y2={12} />
        <line x1={12} x2="12.01" y1={16} y2={16} />
      </svg>
      <span className="absolute top-1 right-5 transform -translate-y-1/2 text-white text-xs bg-black p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap min-w-[120px] text-center">
        {loginForm.password.length < 8 && (
          <p>Mật khẩu không đủ 8 ký tự</p>
        )}
        {!containsNumber(loginForm.password) && (
          <p>Mật khẩu phải chứa ít nhất một số</p>
        )}
        {!containsUpperCase(loginForm.password) && (
          <p>Mật khẩu phải có ít nhất một ký tự in hoa</p>
        )}
      </span>
    </div>
  )
)}
      </div>
    </div>
    {/* Submit Button */}
    {buttonCheck ? (
    <button  type="submit" className="h-[48px] w-full bg-fintown-pr9 rounded-[10px] mb-[30px]">
      <span className="text-fintown-txt-1 text-sm">Đăng nhập</span>
    </button>
    ) : 
    <button  type="submit" className="h-[48px] w-full bg-fintown-pr9 rounded-[10px] mb-[30px]">
      <span className="text-fintown-txt-1 text-sm">Đăng nhập</span>
    </button>
    }<div className="flex justify-between mb-[27px]">
    <Link href="/" className="text-sm text-fintown-txt-2">
      Quên mật khẩu?
    </Link>
    <div className="flex items-center">
      <div className="border border-fintown-pr9 cursor-pointer rounded-[2px] h-[20px] w-[20px] mr-[10px] flex items-center justify-center">
        <i className="bx bx-check text-fintown-txt-1 w-full h-full"></i>
      </div>
      <div className="text-fintown-txt-2 text-sm">Ghi nhớ</div>
    </div>
  </div>

  <div className="flex items-center gap-x-[12px] mb-[40px]">
    <hr className="flex-1 border-fintown-lnr-1" />
    <div className="text-fintown-txt-1 text-sm">hoặc</div>
    <hr className="flex-1 border-fintown-lnr-1" />
  </div>
  <Link href="/signup" className="h-[48px] w-full border border-fintown-br-btn rounded-[10px] flex items-center justify-center">
    <span className="text-fintown-txt-1 text-sm">Đăng ký</span>
  </Link>
</form>
);
};

export default LoginForm;