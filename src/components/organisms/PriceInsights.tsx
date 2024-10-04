export default function PriceInsights({symbol} : {symbol: string}) {
    return(
        <>
        <div className="px-[24px] py-[28px] bg-fintown-bg-stn rounded-[16px]">
            <div className="text-[24px] font-bold mb-[28px] text-fintown-txt-1">Sự biến động</div>
            <div>

            <div className="text-[16px] font-bold text-fintown-txt-1 pb-[21px] border-b border-fintown-lnr-1">Chỉ số kỹ thuật</div>

            <div className="py-[15px] border-b border-fintown-lnr-1 flex items-center justify-between">
              <div className="text-fintown-txt-2 text-sm font-bold">
                Trung bình động 52 tuần
              </div>
              <div className="text-fintown-stt-buy text-sm font-bold">
                2.94%
              </div>
            </div>

            <div className="py-[15px] border-b border-fintown-lnr-1 flex items-center justify-between">
              <div className="text-fintown-txt-2 text-sm font-bold">
                Trung bình động 200 ngày
              </div>
              <div className="text-fintown-stt-sell text-sm font-bold">
                -2.94%
              </div>
            </div>

            <div className="py-[15px] border-b border-fintown-lnr-1 flex items-center justify-between">
              <div className="text-fintown-txt-2 text-sm font-bold">
                Trung bình động 150 ngày
              </div>
              <div className="text-fintown-txt-1 text-sm font-bold">
                0%
              </div>
            </div>

            <div className="py-[15px] border-b border-fintown-lnr-1 flex items-center justify-between">
              <div className="text-fintown-txt-2 text-sm font-bold">
                Trung bình động 24 ngày
              </div>
              <div className="text-fintown-stt-buy text-sm font-bold">
                2.94%
              </div>
            </div>

            <div className="py-[15px] border-b border-fintown-lnr-1 flex items-center justify-between">
              <div className="text-fintown-txt-2 text-sm font-bold">
                Phạm vi trong ngày
              </div>
              <div className="text-fintown-txt-1 text-sm font-bold">
                90,500 - 91,000
              </div>
            </div>

            <div className="py-[15px] border-b border-fintown-lnr-1 flex items-center justify-between">
              <div className="text-fintown-txt-2 text-sm font-bold">
                Giá mở cửa
              </div>
              <div className="text-fintown-txt-1 text-sm font-bold">
                90,254
              </div>
            </div>

            <div className="py-[15px] border-b border-fintown-lnr-1 flex items-center justify-between">
              <div className="text-fintown-txt-2 text-sm font-bold">
                Giá đóng cửa
              </div>
              <div className="text-fintown-txt-1 text-sm font-bold">
                90,800
              </div>
            </div>

            <div className="py-[15px] border-b border-fintown-lnr-1 flex items-center justify-between">
              <div className="text-fintown-txt-2 text-sm font-bold">
                Giá kết phiên trước
              </div>
              <div className="text-fintown-txt-1 text-sm font-bold">
                90,200
              </div>
            </div>

            <div className="py-[15px] flex items-center justify-between">
              <div className="text-fintown-txt-2 text-sm font-bold">
                Tổng khối lượng
              </div>
              <div className="text-fintown-txt-1 text-sm font-bold">
                301,216,991
              </div>
            </div>
          </div>
        </div>
        </>
    )
}