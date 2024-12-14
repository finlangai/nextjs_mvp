import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
export default function Password({information , setInformation ,setTienTrinh} :any) {
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInformation((prevInfo: any) => ({
        ...prevInfo, 
        [name]: value, 
      }));
    };
    function containsNumber(str: string): boolean {
      return /\d/.test(str);
    }
    function containsUpperCase(str: string): boolean { 
      return /[A-Z]/.test(str);
    }
    const [nguoimoi, setnguoimoi] = useState(false);
    
    const [passCheck , setpassCheck] = useState('');
    const handleChangePassCheck = (e: React.ChangeEvent<HTMLInputElement>)=>{
      setpassCheck(e.target.value);
    }
    const ontabsetFullName = ()=>{
      if(information.password.length  < 8 || !containsUpperCase(information.password) || !containsNumber(information.password)){
         setnguoimoi(true)
         return false;
      }
      if(information.password !== passCheck ){
         toast.error('Mật khẩu Không trùng khớp !');
         return false;
      }
      setTienTrinh('loading');
     setTimeout(()=>{
      setTienTrinh('fullname');
     },1000)
    }
    const [mat , setmat] = useState(false);
    const [mat2 , setmat2] = useState(false);

  return (
    <div className="flex flex-col">
       <h2 className="font-semibold text-4xl text-gray-300">Tạo mật khẩu</h2>
       <label htmlFor="password" className="mt-8 text-gray-200  text-sm">Mật khẩu</label>
       <div className="relative">
         <input
            type={mat ? ('text') : ('password')}
            id="password"
            value={information.password} 
            name="password"
            onChange={handleChange} 
            className="bg-transparent border-gray-600 text-sm border pl-4 focus:outline-none p-3 rounded-lg mt-3 text-white w-full pr-10"
            placeholder=""
         />
         {!mat ? (<svg onClick={() => setmat(!mat)}xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye absolute right-3 top-[35px] transform -translate-y-1/2 cursor-pointer" > <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /> <circle cx={12} cy={12} r={3} /> </svg>) : 
         ( 
            <svg onClick={() => setmat(!mat)} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ stroke: "white" }} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye absolute right-3 top-[35px] transform -translate-y-1/2 cursor-pointer" > <path d="m15 18-.722-3.25" /> <path d="M2 8a10.645 10.645 0 0 0 20 0" /> <path d="m20 15-1.726-2.05" /> <path d="m4 15 1.726-2.05" /> <path d="m9 18 .722-3.25" /> </svg>
         )}
            
              
 
         <div className="relative group">
            {nguoimoi  &&(
               <>
                     {information.password.length  < 8 && (
                        <>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-alert absolute right-[-40px] top-[-23px] transform -translate-y-1/2 cursor-pointer text-[#F8DB01]" > <circle cx={12} cy={12} r={10} /> <line x1={12} x2={12} y1={8} y2={12} /> <line x1={12} x2="12.01" y1={16} y2={16} /> </svg>
                        <div className="absolute hidden group-hover:block bg-black text-white text-xs p-2 rounded-lg opacity-100 transition-opacity duration-100 max-w-xs top-[-50px] right-0">
                              <p>
                              Mật khẩu Không được dưới 8 kí tự
                              </p>
                              </div>
                        </>
                     )}
                     {!containsNumber(information.password) && (
                          <>
                        
                          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-alert absolute right-[-40px] top-[-23px] transform -translate-y-1/2 cursor-pointer text-[#F8DB01]" > <circle cx={12} cy={12} r={10} /> <line x1={12} x2={12} y1={8} y2={12} /> <line x1={12} x2="12.01" y1={16} y2={16} /> </svg>
                          <div className="absolute hidden group-hover:block bg-black text-white text-xs p-2 rounded-lg opacity-100 transition-opacity duration-100 max-w-xs top-[-50px] right-0">
                                <p>
                                Mật khẩu phải có 1 số
                                </p>
                                </div>
                          </>
                     )}
                     {!containsUpperCase(information.password) && (
                          <>
                        
                          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-alert absolute right-[-40px] top-[-23px] transform -translate-y-1/2 cursor-pointer text-[#F8DB01]" > <circle cx={12} cy={12} r={10} /> <line x1={12} x2={12} y1={8} y2={12} /> <line x1={12} x2="12.01" y1={16} y2={16} /> </svg>
                          <div className="absolute hidden group-hover:block bg-black text-white text-xs p-2 rounded-lg opacity-100 transition-opacity duration-100 max-w-xs top-[-50px] right-0">
                                <p>
                                Mật khẩu có ít nhất 1 kí tự in Hoa
                                </p>
                                </div>
                          </>
                     )}

                  
               </>

            )}
         
         </div>
      </div>
       <label htmlFor="password2" className="mt-8 text-gray-200 text-sm">Xác nhận mật khẩu</label>
       <div className="relative">
      <input
         type={mat2 ? ('text') : ('password')}
         id="password2"
         value={passCheck}
         onChange={handleChangePassCheck}
         name="password2"
         className="bg-transparent border-gray-600 text-sm border pl-4 focus:outline-none p-3 rounded-lg mt-3 text-white w-full pr-10"
         placeholder=""
      />

          {!mat2 ? (
            <svg onClick={() => setmat2(!mat2)} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye absolute right-3 top-[35px] transform -translate-y-1/2 cursor-pointer" > <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /> <circle cx={12} cy={12} r={3} /> </svg>) : 
            ( 
            <svg onClick={() => setmat2(!mat2)} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ stroke: "white" }} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye absolute right-3 top-[35px] transform -translate-y-1/2 cursor-pointer" > <path d="m15 18-.722-3.25" /> <path d="M2 8a10.645 10.645 0 0 0 20 0" /> <path d="m20 15-1.726-2.05" /> <path d="m4 15 1.726-2.05" /> <path d="m9 18 .722-3.25" /> </svg>
            )}
        
        
        <div className="relative group">
         {passCheck !== information.password  && passCheck.length >= 8 && (
            <>
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-alert absolute right-[-40px] top-[-23px] transform -translate-y-1/2 cursor-pointer text-[#F8DB01]" > <circle cx={12} cy={12} r={10} /> <line x1={12} x2={12} y1={8} y2={12} /> <line x1={12} x2="12.01" y1={16} y2={16} /> </svg>
         {/* Tooltip hiển thị ngay lập tức khi hover */}
         <div className="absolute hidden group-hover:block bg-black text-white text-xs p-2 rounded-lg opacity-100 transition-opacity duration-100 max-w-xs top-[-50px] right-0">
            Mật khẩu không Khớp !
         </div>
            </>
         ) }
         </div>
      </div>
         <div className="w-[402px] h-[90px] flex-col justify-center items-start gap-[15px] inline-flex mt-8">
            <div className="Frame427321947 w-[221px] grow shrink basis-0 pr-[110px] justify-start items-start gap-2 inline-flex">
               <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" style={{ fill: "rgba(255, 255, 255, 1)", transform: "",  }} > <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" /> </svg>
               <div className={`text-sm font-normal leading-tight mt-1 ${information.password.length >=9 ? ('text-[#25B770]') : ('text-[#848e9c]')} `}>8 - 100 ký tự</div>
            </div>
            <div className="Frame25270 w-[283px] justify-start items-start gap-2 inline-flex">
               <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" style={{ fill: "rgba(255, 255, 255, 1)", transform: "",  }} > <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" /> </svg>
               <div className={`text-sm font-normal leading-tight mt-1 ${containsNumber(information.password) ? ('text-[#25B770]') : ('text-[#848e9c]')} `}>Tối thiểu 1 chữ số</div>
            </div>
            <div className="Frame25271 self-stretch grow shrink basis-0 pr-[200px] justify-start items-start gap-2 inline-flex">
               <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" style={{ fill: "rgba(255, 255, 255, 1)", transform: "",  }} > <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" /> </svg>
               <div className={`text-sm font-normal leading-tight mt-1 ${containsUpperCase(information.password) ? ('text-[#25B770]') : ('text-[#848e9c]')} `}>Tối thiểu 1 chữ cái viết hoa</div>
            </div>
         </div>
         <button onClick={ontabsetFullName} className="Frame427321879 w-[401px] h-12 pt-4 pb-[15px] bg-[#25b770] rounded-[10px] justify-center items-center inline-flex mt-10">
            <div className="NgNhP text-center text-[#eaecef] text-sm font-medium ">Bước tiếp theo</div>
         </button>
         <ToastContainer
        position="top-right" 
        autoClose={5000}
        hideProgressBar={false} 
        newestOnTop={true}
        closeOnClick={true}
        rtl={false} 
      />
    </div>
  )
}
