'use client';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/src/redux/store";
import { fetchUserProfile } from "@/src/redux/auth/authSlice";
import axios from "axios";
import getCookie from "@/src/components/common/getCookie";
import { useAppSelector } from "@/src/redux/hooks/useAppStore";
import { selectToken } from "@/src/redux/auth"; // Hàm selector để lấy token
type codePromotion = {
  initialPrice: number;
  discountAmount: number;
  afterDiscount: number;
  discountPercent: number;
};
const Payment = ({ params }: { params: { id: string } }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const { id } = params;

  const [pricingData, setPricingData] = useState<PricingData | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PricingMONTHLY | PricingYEARLY>();
  const [paymentData, setPaymentData] = useState<PaymentData>({
    programId: id,
    paymentMethod: "momo",
    callbackUrl: "",
    promotionCode : ""
  });

  useEffect(() => {
    // Set callbackUrl khi chạy trên client
    if (typeof window !== "undefined") {
      setPaymentData((prevState) => ({
        ...prevState,
        callbackUrl: `${window.location.origin}/payment/thanhtoan`,
      }));

      // Lắng nghe sự kiện message
      const handleMessage = (event: MessageEvent) => {
        if (event.origin === window.location.origin) {
          if (event.data === "success") {
            window.location.href = `${window.location.origin}/payment/camonquykhach`;
          } else if (event.data === "failure") {
          } else if (event.data === "tabClosed") {
          }
        } else {
          console.warn("Thông điệp không đến từ nguồn gốc hợp lệ!");
        }
      };

      window.addEventListener("message", handleMessage);

      // Cleanup event listener
      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }
  }, []);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [user, dispatch]);

  useEffect(() => {
    fetch(`${apiUrl}/general/pricing`)
      .then((response) => response.json())
      .then((data) => {
        setPricingData(data);
      })
      .catch((error) => {
        console.error("Error fetching pricing data:", error);
      });
  }, []);

  useEffect(() => {
    if (pricingData) {
      if (id === pricingData.MONTHLY.programId) {
        setSelectedPlan(pricingData.MONTHLY);
      } else if (id === pricingData.YEARLY.programId) {
        setSelectedPlan(pricingData.YEARLY);
      } else {
        console.error("Program ID không hợp lệ");
      }
    }
  }, [id, pricingData]);

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPaymentData((prevState) => ({
      ...prevState,
      paymentMethod: value,
    }));
  };

  const token = getCookie("token");
  const handlePayment = () => {
    if (!paymentData.programId || !paymentData.paymentMethod) {
      alert("Vui lòng chọn gói hội viên và phương thức thanh toán!");
      return;
    }


    axios
      .post(`${apiUrl}/general/payment/initiate`, paymentData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const paymentUrl = response.data.paymentUrl;
        const popupWidth = 800;
        const popupHeight = 800;
        const left = (window.innerWidth - popupWidth) / 2;
        const top = (window.innerHeight - popupHeight) / 2;
        const popup = window.open(
          paymentUrl,
          "PaymentPopup",
          `width=${popupWidth},height=${popupHeight},top=${top},left=${left}`
        );

        if (popup) {
          popup.focus();
        } else {
          alert("Vui lòng bật cửa sổ popup trong trình duyệt.");
        }
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi thanh toán: ", error);
      });
  }
  // code mã giảm giá
  const tokenBearer = useAppSelector(selectToken); // Lấy token từ Redux state
  const [codePromotion, setCodePromotion] = useState<codePromotion>(); // State lưu khuyến mãi
  const [promotionInput, setPromotionInput] = useState(''); // State lưu input mã giảm giá
  const [errPromotion, setErrPromotion] = useState<boolean | null>(null);
  const addPromotion = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/general/payment/check-promotion`,
        {
          code: promotionInput, // Sử dụng giá trị từ input
          programId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenBearer}`, // Gửi token Bearer
          },
        }
      );
      setCodePromotion(response.data); 
      setPaymentData((prevData) => ({
        ...prevData, // Giữ nguyên dữ liệu cũ
        promotionCode: "PY1Giamgia", 
      }));
      console.log('Promotion data:', response.data); // Log kết quả
      setErrPromotion(true)
    } catch (error) {
      console.error('Error during fetching promotion:', error);
      setErrPromotion(false)
    }
  };
  const calculateDiscountedPrice = (originalPrice: any, discountPercent : any) => {
    if (!originalPrice || !discountPercent) return originalPrice;
    return originalPrice - (originalPrice * discountPercent / 100);
  };
  return (
    <div className="px-10 pt-5 bg-white h-screen">
      <a href="/dashboard">
      <img src="/imgs/logo.png" alt="Logo" className="" />
      </a>
      <h1 className="text-5xl font-bold text-center">Xác nhận gói hội viên</h1>
      <p className="text-xl font-extralight text-center mt-7">
        Bạn hãy kiểm tra lại thông tin và đăng nhập trước khi chuyển qua cổng thanh toán.
      </p>
      <div className="flex justify-between items-start mx-auto mt-10 gap-10 w-[1050px]">
        {/* Box bên trái */}
        <div className="flex-1 max-w-[48%]">
          <div className="border-2 border-[#25B770] rounded-lg">
            <div className="p-5">
              <div className="flex border-b-[#333] items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#25B770]">
                  <circle cx={12} cy={12} r={10} />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <div>
                  <h3 className="flex items-center font-bold">Xác nhận gói Hội viên</h3>
                  <div className="mt-1 text-[#25B770] font-semibold">
                      {selectedPlan ? (
                        `FinTown ${selectedPlan.name}`
                      ) : (
                        <div className="flex items-center">
                          <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#25B770] mr-2"></span>
                          Đang tải...
                        </div>
                      )}
                    </div>
                </div>
              </div>
              <hr className="my-3" />
              <div className="flex border-b-[#333] items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#25B770]">
                  <circle cx={12} cy={12} r={10} />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <div>
      <h3 className="flex items-center font-bold">Chọn phương thức thanh toán</h3>
      <div className="mt-5">
        <label className="flex items-center cursor-pointer">
          <input 
            type="radio" 
            name="payment" 
            value="vnpay" 
            className="mr-2" 
            onChange={handlePaymentMethodChange} 
            checked={paymentData.paymentMethod === "vnpay"} 
          />
          <span className="font-normal flex items-center">
            <img src="/imgs/payment_logo/vnpay.png" alt="VN Pay" className="h-3 mr-2" />
            Thanh toán với VNPAY
          </span>
        </label>
        <p className="mt-1 ml-5 text-xs">(ATM/QR Pay/Ví VNPay trên Mobile Banking)</p>
      </div>
      <div className="mt-5">
        <label className="flex items-center">
          <input 
            type="radio" 
            name="payment" 
            value="momo" 
            className="mr-2" 
            onChange={handlePaymentMethodChange} 
            checked={paymentData.paymentMethod === "momo"} 
          />
          <span className="font-normal flex items-center">
            <img src="/imgs/payment_logo/momo_payment.jpg" alt="Momo Pay" className="w-8 h-8 mr-2" />
            Thanh toán với Momo
          </span>
        </label>
        <p className="mt-1 ml-5 text-xs">(Momo/QR Pay/Ví Momo trên Mobile Banking)</p>
      </div>
    </div>
              </div>
              <hr className="my-3" />
              <div className="flex border-b-[#333] items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#25B770]">
                  <circle cx={12} cy={12} r={10} />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <div>
                  <h3 className="flex items-center font-bold">Bạn đã đăng nhập</h3>
                  {/* Hiển thị tên người dùng */}
                  <div className="mt-1 text-[#25B770] font-semibold">
                     {user ? (
                        user.email
                     ) : (
                        <div className="flex items-center">
                           <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#25B770] mr-2"></span>
                           Đang tải...
                        </div>
                     )}
                     </div>

                </div>
              </div>
            </div>
          </div>
         <div className="mt-3 flex justify-between">
         <input
        className="border-2 border-[#25B770] rounded-lg p-3 w-3/4"
        placeholder="Nhập mã giảm giá ..."
        value={promotionInput}
        onChange={(e) => setPromotionInput(e.target.value)}
      />
      <button
        className="border-[#25B770] border rounded-xl text-[#25B770] font-bold p-3"
        onClick={addPromotion}>
        Áp dụng
      </button>
         </div>
         <p   className="h-5 mt-3"
        style={{
          color: errPromotion === null ? 'transparent' : errPromotion ? 'green' : 'red', 
          visibility: errPromotion === null ? 'hidden' : 'visible' 
        }}
      >
        {
          errPromotion === null ? '' : // Nếu là null thì không hiển thị gì
          errPromotion ? 'Áp dụng mã thành công' : 'Mã giảm giá không tồn tại'
        }
      </p>
         <p className="mt-5 font-sans text-sm"> 
         Lưu ý: Nếu bạn áp dụng mã giảm giá, sau khi bấm nút thanh toán vui lòng không đóng trang thanh toán khi chưa hoàn thành việc thanh toán để tránh mã giảm giá bị khóa.
         </p>
        </div>

        {/* Box bên phải */}
        <div className="flex-1 max-w-[48%] border-2 border-[#25B770] rounded-lg">
         <div className="p-5">
            <h3 className="font-medium">Gói Hội viên</h3>
            <hr className="my-3" />
            <div className="flex justify-between">
               <div>
               <h5 className="text-sm font-semibold text-[#25B770]">
                  {selectedPlan ? (
                    `fintown - ${selectedPlan.name}`
                  ) : (
                    <div className="flex items-center">
                      <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#25B770] mr-2"></span>
                      Đang tải...
                    </div>
                  )}
                </h5>

                <div className="text-xs flex">
                 <div>
                 tiết kiệm
                 </div>
                    {selectedPlan ? (
                      <div>
                        {selectedPlan.programId === "PM1" ? (
                          <span> 0%</span>  
                        ) : (
                          'discountPercentage' in selectedPlan ? (
                            <span> {selectedPlan.discountPercentage}%</span> 
                          ) : (
                            <span> 0%</span>  
                          )
                        )}
                      </div>
                    ) : (
                      <p>Đang tải dữ liệu...</p>
                    )}
                  </div>

               </div>
               <div>

               <h5 className="text-sm font-semibold">
                  {selectedPlan ? (
                    selectedPlan.programId === "PM1" ? (
                      'price' in selectedPlan ? (
                        // Định dạng tiền theo kiểu Việt Nam
                        `${selectedPlan.price.toLocaleString('vi-VN')} VND`
                      ) : (
                        "N/A"
                      )
                    ) : (
                      'discountedPrice' in selectedPlan ? (
                        `${(selectedPlan.discountedPrice / 12).toLocaleString('vi-VN')} VND / tháng`
                      ) : (
                        "N/A"
                      )
                    )
                  ) : (
                    "Đang tải dữ liệu..."
                  )}
                </h5>



                 <h5 className="text-sm font-semibold">
                    {selectedPlan ? (
                      'price' in selectedPlan ? (
                        <div className="text-sm font-light mt-1 text-gray-400 line-through">
                          
                        </div>
                      ) : (
                        'originalPrice' in selectedPlan ? (
                          <div className="text-sm font-light mt-1 text-gray-400 line-through">
                            {(selectedPlan.originalPrice / 12).toLocaleString('vi-VN')} VND/tháng
                          </div>
                        ) : (
                          "N/A"
                        )
                      )
                    ) : (
                      "Đang tải dữ liệu..."
                    )}
                  </h5>


               </div>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between">
               <div>
               <h5 className="text-sm font-semibold text-[#25B770]"></h5>
               <p className="text-xs font-light mt-1"></p>
               </div>
               <div>
               <h5 className="text-sm font-semibold">
                    {selectedPlan ? (
                      'price' in selectedPlan ? (
                        <div className="text-sm font-medium mt-1">
                          x1 Tháng
                        </div>
                      ) : (
                        'originalPrice' in selectedPlan ? (
                          <div className="text-sm font-medium mt-1">
                            x12 Tháng
                          </div>
                        ) : (
                          "N/A"
                        )
                      )
                    ) : (
                      "Đang tải dữ liệu..."
                    )}    
               </h5>
               </div>
            </div>
            <hr className="my-3" />
           
            <hr className="my-3" />
            <div className="flex justify-between">
               <div>
               <h5 className="text-sm font-semibold text-[#25B770]">Tổng cộng</h5>
               {/* <h5 className="text-sm font-semibold">
              {selectedPlan ? (
                "price" in selectedPlan ? (
                  <p className="text-xs font-light mt-1 text-[red]">
                    Tiết kiệm {selectedPlan.price - selectedPlan.price} VNĐ
                    (0%)
                  </p>
                ) : (
                  "originalPrice" in selectedPlan && "discountedPrice" in selectedPlan ? (
                    <p className="text-xs font-light mt-1 text-[red]">
                      Tiết kiệm {(selectedPlan.originalPrice - selectedPlan.discountedPrice).toLocaleString()} VNĐ
                      ({((selectedPlan.originalPrice - selectedPlan.discountedPrice) / selectedPlan.originalPrice * 100).toFixed(0)}%)
                    </p>
                  ) : (
                    "N/A"
                  )
                )
              ) : (
                "Đang tải dữ liệu..."
              )}
            </h5> */}
               </div>
               <div>
               <h5 className="text-sm font-semibold">
                {selectedPlan ? (
                  "price" in selectedPlan ? (
                    <span>
                      {(selectedPlan.price).toLocaleString()} VNĐ
                    </span>
                  ) : (
                    "discountedPrice" in selectedPlan ? (
                      <span>
                        {codePromotion ? codePromotion.afterDiscount.toLocaleString()  : selectedPlan.discountedPrice.toLocaleString()}
                          VNĐ
                      </span>
                    ) : (
                      "N/A"
                    )
                  )
                ) : (
                  "Đang tải dữ liệu..."
                )}
              </h5>
              <h5 className="text-sm font-semibold">
              {selectedPlan ? (
                "price" in selectedPlan ? (
                  <p className="text-xs font-light mt-1 text-gray-400 line-through">
                    {selectedPlan.price - selectedPlan.price} VNĐ
                    (0%)
                  </p>
                ) : (
                  "originalPrice" in selectedPlan && "discountedPrice" in selectedPlan ? (
                    <p className={`text-sm font-light mt-1 text-gray-400 ${codePromotion ? "text-red" : "line-through"} `}>
                      {
                        codePromotion
                          ? `Đã áp dụng mã giảm giá ${codePromotion.discountPercent}%`
                          : `${(selectedPlan.originalPrice - selectedPlan.discountedPrice).toLocaleString()} VNĐ
                            (${((selectedPlan.originalPrice - selectedPlan.discountedPrice) / selectedPlan.originalPrice * 100).toFixed(0)}%)`
                      }

                     
                    </p>
                  ) : (
                    "N/A"
                  )
                )
              ) : (
                "Đang tải dữ liệu..."
              )}
            </h5>
               </div>
            </div>
            <hr className="my-3" />
            <div>
               <p className="font-extralight text-sm">Với việc thanh toán gói hội viên, tôi xác nhận đã đọc và đồng ý với các Điều khoản thanh toán, Chính sách bảo mật và Chính sách nội dung của Fintown.</p>
            </div>
            <div className="flex justify-center mt-5">
              <button className="bg-blue-500 px-10 py-2 text-white rounded-md hover:bg-blue-700 hover:scale-105 transition-all duration-200" onClick={handlePayment}  >
                Thanh toán
              </button>
            </div>
         </div>
         </div>
      </div>
    </div>
  );
};

export default Payment;
