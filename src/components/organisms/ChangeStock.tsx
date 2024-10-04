import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { 
    fetchSearchVn30Stock,
    fetchSearchStockByQuery, 
    selectSearchVn30StockData,
    selectSearchStockError, 
    selectSearchStockLoading,
} from '@/src/redux/SearchAndChangeStock';
import { SpinerLoader } from '../common/Loader';
import { ChangeStockatReportPage } from '@/src/interfaces/SearchStock';

const ChangeStockInput = ({symbol} : {symbol: string}) => {
    const dispatch = useAppDispatch();
    const containerRef = useRef<HTMLDivElement>(null);

    const [selectedStock, setSelectedStock] = useState<string>(symbol);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [stockList, setStockList] = useState<ChangeStockatReportPage[]>([]);
    const [hasInitialized, setHasInitialized] = useState(false);

    const vn30StockData = useAppSelector(selectSearchVn30StockData);
    const isLoading = useAppSelector(selectSearchStockLoading);
    const error = useAppSelector(selectSearchStockError);

    const filterVn30Stocks = (stocksData: ChangeStockatReportPage[] | null, searchQuery: string): ChangeStockatReportPage[] => {
        if (!stocksData) return [];
        return stocksData.filter(stock => 
            stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
            stock.company_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    // Xử lý click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Xử lý khởi tạo và cập nhật dữ liệu VN30
    useEffect(() => {
        if (vn30StockData && vn30StockData.length > 0) {
            setStockList(vn30StockData);
            setHasInitialized(true);
        }
    }, [vn30StockData]);

    // Xử lý khi mở dropdown
    const handleDropdownToggle = () => {
        const newDropdownState = !isDropdownOpen;
        setDropdownOpen(newDropdownState);
        
        if (newDropdownState && !hasInitialized) {
            // Nếu mở dropdown và chưa có dữ liệu VN30, gọi API
            if (!vn30StockData || vn30StockData.length === 0) {
                dispatch(fetchSearchVn30Stock());
            } else {
                // Nếu đã có dữ liệu VN30, sử dụng ngay
                setStockList(vn30StockData);
                setHasInitialized(true);
            }
        }
    };

    // Xử lý tìm kiếm
    useEffect(() => {
        if (!isDropdownOpen) return;

        // Nếu searchTerm trống và đã có dữ liệu VN30, hiển thị lại VN30
        if (searchTerm.length === 0) {
            if (vn30StockData && vn30StockData.length > 0) {
                setStockList(vn30StockData);
            }
            return;
        }
    
        // Nếu có dữ liệu VN30, thử lọc local trước
        if (vn30StockData && vn30StockData.length > 0) {
            const filteredVn30Stocks = filterVn30Stocks(vn30StockData, searchTerm);
    
            // Nếu tìm thấy kết quả trong VN30, sử dụng kết quả đó
            if (filteredVn30Stocks.length > 0) {
                setStockList(filteredVn30Stocks);
                return;
            }
        }
        
        // Nếu không tìm thấy trong VN30, gọi API tìm kiếm
        dispatch(fetchSearchStockByQuery(searchTerm))
            .then((action) => {
                const result = action.payload;
                setStockList(result.length > 0 ? result : []);
            })
            .catch(() => setStockList([]));
    }, [searchTerm, isDropdownOpen, vn30StockData, dispatch]);

    const handleStockSelect = (stock: ChangeStockatReportPage) => {
        setSelectedStock(stock.symbol);
        setDropdownOpen(false);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className='flex relative' ref={containerRef}>
            <div className='text-fintown-txt-2 text-sm mr-[16px]'>Đổi cổ phiếu</div>
            <div 
                className='flex items-center h-[48px] rounded-[8px] border border-fintown-btn-disable w-[183px] max-w-[183px] hover:border-fintown-btn-active-1'
                onClick={handleDropdownToggle}
            >
                <input 
                    type="text" 
                    className='w-full text-fintown-txt-1 bg-transparent outline-none px-[12px] cursor-pointer' 
                    value={selectedStock} 
                    readOnly 
                />
                <i className={`bx ${isDropdownOpen ? 'bx-caret-up' : 'bx-caret-down'} text-fintown-txt-1 pr-[12px]`}></i>
            </div>

            {isDropdownOpen && (
                <div className='absolute w-full top-[50px] z-40'>
                    <div className='bg-fintown-bg-stn rounded pb-[10px]'>
                        <div className='flex justify-between px-[12px] py-[8px]'>
                            <div className='flex justify-between border border-fintown-btn-2 rounded w-full h-[40px] hover:border-fintown-pr9 items-center'>
                                <i className='bx bx-search text-fintown-txt-1 text-[20px] pl-[10px]'></i>
                                <input 
                                    className='bg-transparent outline-none text-fintown-txt-1 text-sm w-full px-[10px]' 
                                    type="text" 
                                    placeholder='Tìm mã cổ phiếu' 
                                    value={searchTerm} 
                                    onChange={handleSearchChange}
                                />
                                {searchTerm && (
                                    <i 
                                        className='bx bxs-x-circle text-fintown-txt-1 cursor-pointer pr-[10px]' 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSearchTerm('');
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        <div className='py-[4px] overflow-y-scroll max-h-[228px] custom-scrollbarmini'>
                            {isLoading ? (
                                <div className='text-center py-4 w-full flex justify-center'>
                                    <SpinerLoader/>
                                </div>
                            ) : stockList.length === 0 ? (
                                <div className='text-center py-4 text-fintown-txt-2 px-[12px]'>Không tìm thấy kết quả</div>
                            ) : (
                                stockList.map(stock => (
                                    <Link href={`/dashboard/co-phieu/${stock.symbol}`} key={stock.symbol}>
                                        <li 
                                            className='py-[10px] list-none flex items-center cursor-pointer hover:bg-fintown-hvr-btn-2'
                                            onClick={() => handleStockSelect(stock)}
                                        >
                                            <div className='px-[14px] text-fintown-txt-1 text-sm'>{stock.symbol}</div>
                                            <div className='px-[14px] text-fintown-txt-1 text-sm truncate max-w-[200px] overflow-hidden whitespace-nowrap'>
                                                {stock.company_name}
                                            </div>
                                            <div className='px-[14px] text-fintown-txt-1 text-sm'>{stock.exchange}</div>
                                        </li>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChangeStockInput;