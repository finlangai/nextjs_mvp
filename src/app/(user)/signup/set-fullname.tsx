import axios from 'axios';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function SetFullname({ information, setInformation, setTienTrinh }: any) {

  const handleChangeFullname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInformation((prevInfo: any) => ({
      ...prevInfo,
      [name]: value,
    }));
    console.log(information);
  };

  const submitRegister = async () => {
    if (information.fullname.length <= 3) {
      toast.error('Tên quá ngắn, vui lòng nhập tên dài hơn 3 ký tự.');
      return false;
    }
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, information);
      toast.success('Đăng ký thành công!');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);

    } catch (err: any) {
      console.log('Lỗi:', err);
      toast.error('Đăng ký thất bại Email đã tồn tại, vui lòng thử lại.');
    }
  };
  const quaylaitientrinh = ()=>{
    setTienTrinh('loading')
    setTimeout(()=>{
      setTienTrinh('email')
    },2000)
  }
  return (
    <div>
      <div className="flex flex-col">
        <h2 className="font-semibold text-4xl text-gray-300">Tên hiển thị</h2>
        <label htmlFor="fullname" className="mt-8 text-gray-200 text-sm">
          Họ và tên
        </label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={information.fullname}
          onChange={handleChangeFullname}
          className="bg-transparent border-gray-600 text-sm border pl-4 focus:outline-none p-3 rounded-lg mt-3 text-white w-full pr-10"
          placeholder="Chúng tôi có thể gọi bạn là gì ..."
        />
        <button
          onClick={submitRegister}
          className="Frame427321879 w-[401px] h-12 pt-4 pb-[15px] bg-[#25b770] rounded-[10px] justify-center items-center inline-flex mt-10"
        >
          <div className="NgNhP text-center text-[#eaecef] text-sm font-medium">
            Bước tiếp theo
          </div>
        </button>
          <button onClick={quaylaitientrinh}className="mt-10 text-white hover:text-[#25B770]">quay lại</button>
      </div>

      <ToastContainer
        position="top-right" 
        autoClose={5000}
        hideProgressBar={false} 
        newestOnTop={true}
        closeOnClick={true}
        rtl={false} 
      />
    </div>
  );
}
