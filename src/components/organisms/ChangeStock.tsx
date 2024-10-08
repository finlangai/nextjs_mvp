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
    const [hasSearched, setHasSearched] = useState(false);
    const [isEnterPressed, setIsEnterPressed] = useState(false);

    const vn30StockData = useAppSelector(selectSearchVn30StockData);
    const isLoading = useAppSelector(selectSearchStockLoading);

    const filterVn30Stocks = (stocksData: ChangeStockatReportPage[] | null, searchQuery: string): ChangeStockatReportPage[] => {
        if (!stocksData) return [];
        return stocksData.filter(stock => 
            stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
            stock.company_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const handleStockSelect = (stock: ChangeStockatReportPage) => {
        setSelectedStock(stock.symbol);
        setDropdownOpen(false);
        window.location.href = `/dashboard/co-phieu/${stock.symbol}`;
    };

    const handleSearch = async () => {
        if (searchTerm.length === 0) return;
        
        setIsEnterPressed(true);
        
        // Nếu đang có dữ liệu và không đang loading, chọn kết quả đầu tiên
        if (stockList.length > 0 && !isLoading) {
            handleStockSelect(stockList[0]);
            return;
        }

        // Nếu đang loading hoặc chưa có dữ liệu, thực hiện tìm kiếm mới
        try {
            let results: ChangeStockatReportPage[] = [];
            
            // Kiểm tra trong VN30 trước
            if (vn30StockData && vn30StockData.length > 0) {
                results = filterVn30Stocks(vn30StockData, searchTerm);
            }
            
            // Nếu không tìm thấy trong VN30, gọi API
            if (results.length === 0) {
                const action = await dispatch(fetchSearchStockByQuery(searchTerm));
                results = action.payload;
            }
            
            // Nếu có kết quả, chọn kết quả đầu tiên
            if (results.length > 0) {
                handleStockSelect(results[0]);
            }
        } catch (error) {
            console.error("Error during search:", error);
        } finally {
            setIsEnterPressed(false);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

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

    useEffect(() => {
        if (vn30StockData && vn30StockData.length > 0) {
            setStockList(vn30StockData);
            setHasInitialized(true);
        }
    }, [vn30StockData]);

    const handleDropdownToggle = () => {
        const newDropdownState = !isDropdownOpen;
        setDropdownOpen(newDropdownState);
        
        if (newDropdownState && !hasInitialized) {
            if (!vn30StockData || vn30StockData.length === 0) {
                dispatch(fetchSearchVn30Stock());
            } else {
                setStockList(vn30StockData);
                setHasInitialized(true);
            }
        }
    };

    useEffect(() => {
        if (!isDropdownOpen) return;

        if (searchTerm.length === 0) {
            setHasSearched(false);
            if (vn30StockData && vn30StockData.length > 0) {
                setStockList(vn30StockData);
            }
            return;
        }

        setHasSearched(true);
    
        if (vn30StockData && vn30StockData.length > 0) {
            const filteredVn30Stocks = filterVn30Stocks(vn30StockData, searchTerm);
    
            if (filteredVn30Stocks.length > 0) {
                setStockList(filteredVn30Stocks);
                return;
            }
        }
        
        dispatch(fetchSearchStockByQuery(searchTerm))
            .then((action) => {
                const result = action.payload;
                setStockList(result.length > 0 ? result : []);
            })
            .catch(() => setStockList([]));
    }, [searchTerm, isDropdownOpen, vn30StockData, dispatch]);

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
                                    onKeyPress={handleKeyPress}
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
                            {isLoading || isEnterPressed ? (
                                <div className='text-center py-4 w-full flex justify-center'>
                                    <SpinerLoader/>
                                </div>
                            ) : stockList.length === 0 ? (
                                <div className='text-center py-4 text-fintown-txt-2 px-[12px]'>
                                    {!hasSearched ? "Vui lòng nhập mã cổ phiếu hoặc tên công ty" : "Không tìm thấy kết quả"}
                                </div>
                            ) : (
                                stockList.map(stock => (
                                    <li 
                                        key={stock.symbol}
                                        className='py-[10px] list-none flex items-center cursor-pointer hover:bg-fintown-hvr-btn-2'
                                        onClick={() => handleStockSelect(stock)}
                                    >
                                        <div className='px-[14px] text-fintown-txt-1 text-sm'>{stock.symbol}</div>
                                        <div className='px-[14px] text-fintown-txt-1 text-sm truncate max-w-[200px] overflow-hidden whitespace-nowrap'>
                                            {stock.company_name}
                                        </div>
                                        <div className='px-[14px] text-fintown-txt-1 text-sm'>{stock.exchange}</div>
                                    </li>
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