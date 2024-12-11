'use client'
import React, { useEffect, useState } from 'react'
import './signup.css';
import Password from './set-password';
import Setfullname from './set-fullname';
import Link from 'next/link';
export default function page() {
   const [information , setInformation] = useState({fullname: "", email : "" , phone :"123456789",address : "123 Main St, Anytown, USA",  password: ""})
   const [Check, setCheck] = useState<boolean>(false);
   const [nguoimoi , setNguoimoi] = useState<boolean>(false);
   const [tienTrinh , setTienTrinh] = useState('email') 
   function isValidEmail(email:string) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return !emailPattern.test(email);
   }
   const handleEmailChange = (
      e: React.ChangeEvent<HTMLInputElement>
   ) => {
      const { name, value } = e.target;
      setInformation((prevData) => ({
         ...prevData,
         [name]: value,
      }));
    };
    const onTabSetPassword = ()=>{
      if(information.email.length <= 11 ){
          alert('email Không xác định!')
         return false;
      }
      if(isValidEmail(information.email)){
         alert('email không đúng định dạng ')
         return false;
      }
      if(!Check){
         setNguoimoi(true);
         return false;
      }
      setTienTrinh('loading');
     setTimeout(()=>{
      setTienTrinh('password');
     },1000)


   }
  return (
    <div>
     <div>
         <ul className="flex text-white gap-10 pt-8">
            <li>
               <button className="p-3 rounded-2xl border border-transparent hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 bg-transparent">
               Đăng kí gói
               </button>
            </li>
            <li>
               <button className="p-3 rounded-2xl border border-transparent hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 bg-transparent">
               Về chúng tôi
               </button>
            </li>
            <li>
               <button className="p-3 rounded-2xl border border-transparent hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 bg-transparent">
               Pháp lý
               </button>
            </li>
            <li>
               <button className="p-3 rounded-2xl border border-transparent hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 bg-transparent">
               Liên hệ
               </button>
            </li>
         </ul>
      </div>

      <div className="mt-12 p-3 max-w-[420px]">
         {tienTrinh == 'loading' && (
         <div className="flex justify-center items-center mt-40">
           <div className="spinner"></div> {/* Hiển thị spinner */}
         </div>
         )}
         {tienTrinh == 'email' &&( 
            <>
         <div  className="flex flex-col">
            <h2 className="font-semibold text-4xl text-gray-300">Tạo tài khoản</h2>
               <label htmlFor="email" className="mt-8 text-gray-200 ">Email</label>
               <div className="relative w-full">
                  <input
                     type="text"
                     id="email"
                     name="email"
                     value={information.email}
                     onChange={handleEmailChange}
                     className="bg-transparent border-gray-600 text-sm border pl-4 focus:outline-none p-3 rounded-lg mt-3 text-white w-full"
                     placeholder="example@gmail.com"
                  />
                  {information.email.length !== 0 &&
                  information.email.length > 6 &&
                  isValidEmail(information.email) ? (
                     <div className="relative group">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width={24}
                           height={24}
                           viewBox="0 0 24 24"
                           className="absolute top-[-20px] right-[-35px] transform -translate-y-1/2 cursor-pointer"
                           style={{ fill: "#C81636" }}
                        >
                        <path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM12 20c-4.411 0-8-3.589-8-8s3.567-8 7.953-8C16.391 4 20 7.589 20 12s-3.589 8-8 8z" />
                        <path d="M11 7h2v7h-2zm0 8h2v2h-2z" />
                        </svg>
                        {/* Tooltip */}
                        <div className="absolute bg-black text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 top-[-70px] right-[-40px] w-max">
                           Vui lòng nhập email đúng định dạng (ví dụ: example@gmail.com).
                        </div>
                     </div>
                  ) : (
                     ""
                  )}
                  {information.email.length > 6 &&
                  !isValidEmail(information.email) ? <div className="relative group">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                         className="absolute top-[-20px] right-[-35px] transform -translate-y-1/2 cursor-pointer"
                        style={{ fill: "#349C1F", transform: "",}}
                        >
                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                        <path d="M9.999 13.587 7.7 11.292l-1.412 1.416 3.713 3.705 6.706-6.706-1.414-1.414z" />
                        </svg>
                     </div>:""}

               </div>


               <div className="mt-5 flex gap-3 items-center">
                  <div className="checkbox-wrapper-31 mt-1 relative">
                  <input 
                        type="checkbox" 
                        className="w-3 h-3" 
                        checked={Check} 
                        onChange={(e) => setCheck(e.target.checked)} 
                        />
                     <svg viewBox="0 0 35.6 35.6" className="w-5 h-5">
                        <circle className="background" cx="17.8" cy="17.8" r="17.8" />
                        <circle className="stroke" cx="17.8" cy="17.8" r="14.37" />
                        <polyline
                        className="check"
                        points="11.78 18.12 15.55 22.23 25.17 12.87"
                        />
                     </svg>

                     {/* Tooltip thông báo */}
                     <div className="tooltip absolute hidden bg-black text-white text-xs p-2 rounded-lg opacity-0 group-hover:opacity-100 group-hover:block transition-opacity whitespace-nowrap max-w-xs top-[-40px] left-0">
                        đồng ý với Điều khoản dịch vụ trước khi tiếp tục.
                     </div>
                  </div>
                  <span className="text-gray-400 text-xs pb-3 pl-[-10px]">
                    đồng ý với{" "}
                     <a href="#" className="text-blue-500 underline">
                        Điều khoản dịch vụ
                     </a>{" "}
                     của chúng tôi.
                  </span>
                  {!Check && nguoimoi && (
                         <div className="relative group right-[-105px] top-[-10px]">
                         <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            style={{ fill: "#C81636", transform: "" }}
                         >
                            <path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM12 20c-4.411 0-8-3.589-8-8s3.567-8 7.953-8C16.391 4 20 7.589 20 12s-3.589 8-8 8z" />
                            <path d="M11 7h2v7h-2zm0 8h2v2h-2z" />
                         </svg>
    
                         {/* Tooltip hiện thị khi hover */}
                         <div className="absolute hidden bg-black text-white text-xs p-2 rounded-lg opacity-0 group-hover:opacity-100 group-hover:block transition-opacity whitespace-nowrap max-w-xs top-[-40px] left-0">
                            đồng ý với điều khoản dịch vụ trước khi tiếp tục
                         </div>
                      </div>
                  ) }
                  </div>
            <button onClick={onTabSetPassword} className="w-[401px] h-10 pt-4 pb-[15px] bg-[#25b770] rounded-[10px] justify-center items-center inline-flex mt-5 hover:bg-[#1a9e59] transition-all duration-300">
               <div className="text-center text-[#eaecef] text-sm font-medium">Bước tiếp theo</div>
            </button>
            <div className="Frame25266 w-[400px] h-5 justify-center items-center gap-8 inline-flex mt-10">
               <div className="Line8 w-[100px] h-[0px] border border-[#2b3139]"></div>
               <div className="BNCTIKhoN text-[#eaecef] text-sm font-normal  leading-tight">Bạn đã có tài khoản?</div>
               <div className="Line9 w-[100px] h-[0px] border border-[#2b3139]"></div>
            </div>
         </div>
         <Link href="/">
            <div className="mt-10 Frame427321903 w-[401px] h-12 pt-4 pb-[15px] rounded-[10px] border border-[#2b3139] justify-center items-center inline-flex">
               <div className="NgK text-center text-[#eaecef] text-sm font-medium font-['Inter']">Đăng nhập</div>
            </div>
         </Link>
            </>
         
         )}
          {tienTrinh == 'password' &&(
            <Password information={information} setInformation={setInformation} setTienTrinh={setTienTrinh}/>
           )}
          {tienTrinh == 'fullname' &&(
            <Setfullname  information={information} setInformation={setInformation} setTienTrinh={setTienTrinh}/>
           )}
           
      </div>
    </div>
  )
}
