import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks/useAppStore";
import { fetchFAQs, selectFAQData, selectFAQLoading } from "@/src/redux/FAQ";
import { SpinerLoader } from "../common/Loader";

const FAQ = () => {
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);
  const fAQData = useAppSelector(selectFAQData);
  const fAQLoading = useAppSelector(selectFAQLoading);

  // State lưu trạng thái mở/đóng từng FAQ
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(fetchFAQs());
      hasFetched.current = true;
    }
  }, [dispatch]);

  // Khi fAQData thay đổi, khởi tạo trạng thái mở mặc định
  useEffect(() => {
    if (fAQData.length > 0) {
      const initialState = fAQData.reduce((acc, faq) => {
        acc[faq.id] = true; // Tất cả các FAQ mặc định mở
        return acc;
      }, {} as Record<string, boolean>);
      setOpenStates(initialState);
    }
  }, [fAQData]);

  // Hàm toggle trạng thái mở/đóng
  const toggleOpen = (id: string) => {
    setOpenStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };  

  // Hiển thị trạng thái loading
  if (fAQLoading) {
    return (
      <div className="w-full flex justify-center py-[50px]">
        <SpinerLoader />
      </div>
    );
  }

  // Hiển thị thông báo nếu không có dữ liệu
  if (!fAQData || fAQData.length === 0) {
    return '';
  }

  return (
    <div>
      {fAQData.map((q) => (
        <div className="flex gap-3 mb-4" key={q.id}>
          <div className="Frame427322061 w-[30px] h-[30px] pt-2 pb-[7px] rounded border border-fintown-br dark:border-fintown-br-light justify-center items-center inline-flex">
            <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
              {q.number}
            </div>
          </div>

          <div>
            <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-base font-semibold mb-[10px]">
              {q.title}
            </div>
            {openStates[q.id] && (
              <div className="w-[730px] text-[#848e9c] text-sm font-medium">
                {q.content}
              </div>
            )}
          </div>

          <i
            className={`bx ${
              openStates[q.id] ? 'bx-minus' : 'bx-plus'
            } text-fintown-txt-1 dark:text-fintown-txt-1-light text-[30px] ml-auto cursor-pointer`}
            onClick={() => toggleOpen(q.id)}
          ></i>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
