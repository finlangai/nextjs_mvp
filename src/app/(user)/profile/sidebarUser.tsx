import React from 'react'
export default function SidebarUser() {
  return (
    <div>
      <div className="w-[311px] h-[804px] flex-col justify-center items-start gap-[45px] inline-flex">
      <div className="justify-center items-center inline-flex">
         <div className="text-white text-2xl font-bold">Quản Lý Tài Khoản</div>
      </div>
      <div className="w-[311px] pr-12 pb-[478px] border-r border-[#2b3139] flex-col justify-start items-start gap-[54px] inline-flex">
         <div className="self-stretch h-12 pr-[37px] justify-start items-center gap-3 inline-flex">
            <div className="w-12 h-12 px-3 py-3 bg-[#25b770] rounded-[10px] justify-center items-center inline-flex">
               <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" style={{ fill: "rgba(255, 255, 255, 1)",  }} > <path d="M12 2A10.13 10.13 0 0 0 2 12a10 10 0 0 0 4 7.92V20h.1a9.7 9.7 0 0 0 11.8 0h.1v-.08A10 10 0 0 0 22 12 10.13 10.13 0 0 0 12 2zM8.07 18.93A3 3 0 0 1 11 16.57h2a3 3 0 0 1 2.93 2.36 7.75 7.75 0 0 1-7.86 0zm9.54-1.29A5 5 0 0 0 13 14.57h-2a5 5 0 0 0-4.61 3.07A8 8 0 0 1 4 12a8.1 8.1 0 0 1 8-8 8.1 8.1 0 0 1 8 8 8 8 0 0 1-2.39 5.64z" /> <path d="M12 6a3.91 3.91 0 0 0-4 4 3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4zm0 6a1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2 1.91 1.91 0 0 1-2 2z" /> </svg>
            </div>
            <div className="w-[166px] self-stretch flex-col justify-center items-start gap-1 inline-flex">
               <div className="text-white text-sm font-semibold">Thông tin tài khoản</div>
               <div className="text-[#848e9c] text-xs font-normal">Chỉnh sửa thông tin tài khoản</div>
            </div>
         </div>
         <div className="self-stretch h-12 pr-[37px] justify-start items-center gap-3 inline-flex">
            <div className="w-12 h-12 px-3 py-3 bg-[#1e2329] rounded-[10px] justify-center items-center inline-flex">
               <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" style={{ fill: "rgba(255, 255, 255, 1)", }} > <path d="m21.88 2.15-1.2.4a13.84 13.84 0 0 1-6.41.64 11.87 11.87 0 0 0-6.68.9A7.23 7.23 0 0 0 3.3 9.5a8.65 8.65 0 0 0 1.47 6.6c-.06.21-.12.42-.17.63A22.6 22.6 0 0 0 4 22h2a30.69 30.69 0 0 1 .59-4.32 9.25 9.25 0 0 0 4.52 1.11 11 11 0 0 0 4.28-.87C23 14.67 22 3.86 22 3.41zm-7.27 13.93c-2.61 1.11-5.73.92-7.48-.45a13.79 13.79 0 0 1 1.21-2.84A10.17 10.17 0 0 1 9.73 11a9 9 0 0 1 1.81-1.42A12 12 0 0 1 16 8V7a11.43 11.43 0 0 0-5.26 1.08 10.28 10.28 0 0 0-4.12 3.65 15.07 15.07 0 0 0-1 1.87 7 7 0 0 1-.38-3.73 5.24 5.24 0 0 1 3.14-4 8.93 8.93 0 0 1 3.82-.84c.62 0 1.23.06 1.87.11a16.2 16.2 0 0 0 6-.35C20 7.55 19.5 14 14.61 16.08z" /> </svg>
            </div>
            <div className="w-[166px] self-stretch flex-col justify-center items-start gap-1 inline-flex ">
               <div className="text-white text-sm font-semibold">Quyền hạn sử dụng</div>
               <div className="text-[#848e9c] text-xs font-normal">Xem các quyền hạn và nâng cấp gói</div>
            </div>
         </div>
         <div className="self-stretch h-12 pr-[37px] justify-start items-center gap-3 inline-flex">
            <div className="w-12 h-12 px-3 py-3 bg-[#1e2329] rounded-[10px] justify-center items-center inline-flex">
               <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" style={{ fill: "rgba(255, 255, 255, 1)", }} > <path d="M12 8v5h5v-2h-3V8z" /> <path d="M21.292 8.497a8.957 8.957 0 0 0-1.928-2.862 9.004 9.004 0 0 0-4.55-2.452 9.09 9.09 0 0 0-3.626 0 8.965 8.965 0 0 0-4.552 2.453 9.048 9.048 0 0 0-1.928 2.86A8.963 8.963 0 0 0 4 12l.001.025H2L5 16l3-3.975H6.001L6 12a6.957 6.957 0 0 1 1.195-3.913 7.066 7.066 0 0 1 1.891-1.892 7.034 7.034 0 0 1 2.503-1.054 7.003 7.003 0 0 1 8.269 5.445 7.117 7.117 0 0 1 0 2.824 6.936 6.936 0 0 1-1.054 2.503c-.25.371-.537.72-.854 1.036a7.058 7.058 0 0 1-2.225 1.501 6.98 6.98 0 0 1-1.313.408 7.117 7.117 0 0 1-2.823 0 6.957 6.957 0 0 1-2.501-1.053 7.066 7.066 0 0 1-1.037-.855l-1.414 1.414A8.985 8.985 0 0 0 13 21a9.05 9.05 0 0 0 3.503-.707 9.009 9.009 0 0 0 3.959-3.26A8.968 8.968 0 0 0 22 12a8.928 8.928 0 0 0-.708-3.503z" /> </svg>
            </div>
            <div className="w-[166px] self-stretch flex-col justify-center items-start gap-1 inline-flex">
               <div className="text-white text-sm font-semibold">Lịch sử thanh toán</div>
               <div className="text-[#848e9c] text-xs font-normal">Xem lại lịch sử chi trả của bạn</div>
            </div>
         </div>
      </div>
      </div>
    </div>
  )
}
