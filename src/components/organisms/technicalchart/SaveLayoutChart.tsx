import React, { useEffect, useState } from 'react';

export default function SaveLayoutChart() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [annotations, setAnnotations] = useState([]);
  const [layoutName, setLayoutName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Lấy dữ liệu bố cục từ sessionStorage khi component được mở
    if (isPopupOpen) {
      const savedAnnotations = sessionStorage.getItem('chartAnnotations');
      if (savedAnnotations) {
        setAnnotations(JSON.parse(savedAnnotations));
      }
    }
  }, [isPopupOpen]);

  const handleSaveLayout = () => {
    if (!layoutName.trim()) {
      setError("Tên bố cục không được để trống.");
      return;
    }
  
    setError(""); // Xóa lỗi nếu nhập tên hợp lệ
  
    // Lấy thời gian hiện tại và định dạng
    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes()
      .toString()
      .padStart(2, '0')}`;
  
    const newLayout = {
      name: layoutName.trim(), // Lưu tên bố cục
      layout: annotations,     // Lưu dữ liệu biểu đồ
      createdAt: formattedDate, // Thêm ngày tháng và giờ phút
    };
  
    // Lấy danh sách bố cục đã lưu từ localStorage
    const existingLayouts = localStorage.getItem("chartLayouts");
    const layoutsArray = existingLayouts ? JSON.parse(existingLayouts) : [];
  
    // Thêm bố cục mới vào danh sách
    layoutsArray.push(newLayout);
  
    // Lưu lại vào localStorage
    localStorage.setItem("chartLayouts", JSON.stringify(layoutsArray));
  
    // Đóng popup và reset
    setLayoutName("");
    setIsPopupOpen(false);
  };  

  return (
    <>
      <i
          onClick={() => setIsPopupOpen(true)}
          className='bx bx-cloud-download text-fintown-txt-2 text-[24px] mr-[20px] cursor-pointer hover:text-fintown-pr9'>
      </i>

      {isPopupOpen && (
        <div
          className={`fixed w-full h-full top-0 left-0 z-[999999] flex justify-center items-start 
          bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out 
          ${isPopupOpen ? 'opacity-100' : 'opacity-0'}`}
        >
          <div
            className={`w-[600px] bg-fintown-bg-stn rounded-[8px] py-[32px] px-[32px] max-h-max
              transform transition-all duration-500 ease-out
              ${isPopupOpen ? 'mt-[200px] translate-y-0 opacity-100' : 'mt-0 -translate-y-12 opacity-0'}`}
          >
            <div className="text-[16px] text-fintown-txt-1 font-[600] mb-[24px]">
              Lưu bố cục biểu đồ mới
            </div>

            <div className="mb-[10px] text-[14px] text-fintown-txt-1 font-[600]">
              Nhập tên cho bố cục:
            </div>

            <div
              className={`py-[13px] px-[16px] rounded mb-[8px] border ${
                error ? 'border-red-500' : 'border-fintown-br'
              }`}
            >
              <input
                className="text-[14px] text-fintown-txt-1 block w-full placeholder:text-fintown-txt-2 bg-transparent outline-none"
                placeholder="Ví dụ: Phân tích kỹ thuật ngày 27/10"
                value={layoutName}
                onChange={(e) => {
                  setLayoutName(e.target.value);
                  setError(''); // Xóa lỗi khi người dùng nhập
                }}
              />
            </div>

            {error && (
              <div className="text-[12px] text-red-500 mt-[-4px] mb-[16px]">
                {error}
              </div>
            )}

            <div className="flex justify-end mt-[20px]">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="py-[10px] text-fintown-txt-1 text-[14px] px-[23px] border border-fintown-br rounded mr-[10px]"
              >
                Để sau vậy
              </button>
              <button
                onClick={handleSaveLayout}
                className="py-[10px] text-fintown-txt-1 text-[14px] px-[23px] bg-fintown-pr9 rounded hover:bg-[#34A36A]"
              >
                Lưu bố cục
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
