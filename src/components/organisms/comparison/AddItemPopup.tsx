import React, { useRef, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { 
    fetchSearchStockComparison, 
    selectSearchStockComparisonData, 
    selectSearchStockComparisonLoading 
} from '@/src/redux/SearchStockComparison';
import { fetchPostComparison, selectCompanySymbols } from '@/src/redux/Comparison';

export default function AddItemPopup({ 
    isPopupOpen, 
    setIsPopupOpen 
}: { 
    isPopupOpen: boolean; 
    setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>> 
}) {
    const dispatch = useAppDispatch();
    const formRef = useRef<HTMLDivElement>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
    const searchResults = useAppSelector(selectSearchStockComparisonData);
    const isLoading = useAppSelector(selectSearchStockComparisonLoading);

    const selectSymbols = useAppSelector(selectCompanySymbols);

    // Mở modal khi isPopupOpen thay đổi
    useEffect(() => {
        if (isPopupOpen) {
            const timer = setTimeout(() => setIsModalVisible(true), 0);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => setIsModalVisible(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isPopupOpen]);

    // Xử lý search khi searchTerm thay đổi
    useEffect(() => {
        if (searchTerm.trim() !== '') {
            dispatch(fetchSearchStockComparison({ query: searchTerm }));
        }
    }, [searchTerm, dispatch]);

    // Xử lý thay đổi input search
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Xóa search term
    const handleClearSearch = () => {
        setSearchTerm('');
    };

    // Xử lý chọn/bỏ chọn stock
    const handleToggleStock = (symbol: string) => {
        setSelectedStocks(prev => 
            prev.includes(symbol) 
                ? prev.filter(s => s !== symbol)
                : [...prev, symbol]
        );
    };

    // Xử lý thêm vào danh sách
    const handleAddToList = () => {
        console.log('Selected Stocks:', selectedStocks);
        dispatch(fetchPostComparison({ symbols: selectedStocks })); 
        setIsPopupOpen(false);
    };

    return(
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={() => setIsPopupOpen(false)}>
                <div
                    ref={formRef}
                    onClick={(e) => e.stopPropagation()}
                    className={`
                        bg-fintown-bg-stn
                        mt-[50px]
                        rounded-[8px]
                        py-[32px]
                        w-[400px]
                        max-h-max
                        transform
                        transition-all
                        duration-500
                        ease-in-out
                        ease-out
                        ${isModalVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
                    `}
                    style={{
                        transform: isModalVisible ? 'translateY(0)' : 'translateY(-50px)',
                        opacity: isModalVisible ? 1 : 0,
                    }}
                >  
                    <div className='flex items-center mb-[32px] px-[32px]'>
                        <div className='py-[13px] px-[16px] rounded-[6px] border border-fintown-br flex items-center mr-[12px] w-full'>
                            <i className='bx bx-search text-fintown-txt-2 text-[20px] mr-[14px]'></i>
                            <input
                                className='text-[14px] text-fintown-txt-1 block w-full placeholder:text-fintown-txt-2 bg-transparent outline-none'
                                placeholder='Tìm mã cổ phiếu'
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>

                        <div 
                            className='text-fintown-pr9 text-[12px] font-[600] cursor-pointer'
                            onClick={handleClearSearch}
                        >
                            Xóa
                        </div>
                    </div>

                    <div className='flex items-center mb-[24px] px-[32px]'>
                        <div className='text-fintown-txt-2 mr-[5px] text-[12px]'>
                            Còn trống:
                        </div>
                        <div className='text-fintown-txt-1 text-[12px]'>
                            {5 - selectSymbols.length}
                        </div>
                    </div>

                    <div className="mb-[50px] h-[219px] overflow-y-auto custom-scrollbarmini2 pl-[32px] pr-[28px]">
                    {isLoading ? (
                        <div className="text-center text-fintown-txt-2">Đang tải...</div>
                    ) : (
                        searchResults?.map((stock, index) => {
                        // Kiểm tra xem symbol có nằm trong danh sách đã chọn không
                            const isAdded = selectSymbols.includes(stock?.symbol);

                            return (
                                <div
                                key={stock?.symbol}
                                className="py-[12px] border-b border-b-fintown-br flex items-center justify-between"
                                >
                                <div className="flex items-center">
                                    <div className="h-[30px] w-[30px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white mr-[14px]">
                                    <img
                                        className="w-full h-full object-contain"
                                        src={stock?.logo || "/imgs/logo_cty/vcb.png"}
                                        alt={stock?.symbol}
                                    />
                                    </div>
                                    <div className="text-fintown-txt-1 text-[14px]">{stock?.symbol}</div>
                                </div>

                                <div className="text-fintown-txt-1 text-[12px]">
                                    Kỳ báo cáo hiện có Q{stock?.quarter} - {stock?.year}
                                </div>

                                {/* Hiển thị "Đã thêm" nếu symbol đã có */}
                                {isAdded ? (
                                    <div
                                    className={`
                                        w-[20px] h-[20px] 
                                        rounded border 
                                        cursor-pointer 
                                        flex items-center 
                                        justify-center
                                        bg-fintown-txt-2 
                                        border-fintown-txt-2 
                                        cursor-no-drop
                                        }
                                    `}
                                    >
                                    <i className="bx bx-check text-white"></i>
                                    </div>
                                ) : (
                                    <div
                                    onClick={() => handleToggleStock(stock?.symbol)}
                                    className={`
                                        w-[20px] h-[20px] 
                                        rounded border 
                                        cursor-pointer 
                                        flex items-center 
                                        justify-center
                                        ${selectedStocks.includes(stock?.symbol) 
                                        ? 'bg-fintown-pr9 border-fintown-pr9' 
                                        : 'border-fintown-pr9'}
                                    `}
                                    >
                                    {selectedStocks.includes(stock?.symbol) && (
                                        <i className="bx bx-check text-white"></i>
                                    )}
                                    </div>
                                )}
                                </div>
                            );
                        })
                    )}
                    </div>


                    <div className='flex justify-end pr-[28px]'>
                        <button
                            onClick={() => setIsPopupOpen(false)}
                            className='py-[10px] text-fintown-txt-1 text-[12px] px-[23px] border border-fintown-br rounded mr-[10px]'>
                            Để sau vậy
                        </button>
                        <button
                            onClick={handleAddToList}
                            disabled={selectedStocks.length === 0}
                            className={`
                                py-[10px] 
                                text-fintown-txt-1 
                                text-[12px] 
                                px-[23px] 
                                rounded 
                                ${selectedStocks.length > 0 
                                    ? 'bg-fintown-pr9 hover:bg-[#34A36A]' 
                                    : 'bg-gray-300 cursor-not-allowed'}
                            `}
                        >
                            Thêm vào danh sách
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}