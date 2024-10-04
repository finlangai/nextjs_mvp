import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { 
    fetchSearchVn30Stock, 
    fetchSearchStockByQuery,
    selectSearchStockData, 
    selectSearchVn30StockData,
    selectSearchStockError, 
    selectSearchStockLoading,
} from '@/src/redux/SearchAndChangeStock';
import { SpinerLoader } from '../common/Loader';
import { ChangeStockatReportPage } from '@/src/interfaces/SearchStock';

type StockList = ChangeStockatReportPage[];

type TabType = {
    id: string;
    label: string;
    route: string;
    baseurl: string;
};

const TABS: TabType[] = [
    { id: 'report', label: 'Báo cáo', route: 'bao-cao-doanh-nghiep', baseurl: 'dashboard/co-phieu' },
    { id: 'forecast', label: 'Dự báo', route: 'ket-qua-du-bao', baseurl: 'dashboard/co-phieu' },
    { id: 'chart', label: 'Biểu đồ', route: 'symbol', baseurl: 'bieu-do-ky-thuat' },
    { id: 'price', label: 'Biến động giá', route: 'chi-so-ky-thuat', baseurl: 'dashboard/co-phieu' },
    { id: 'valuation', label: 'Định giá', route: 'mo-hinh-dinh-gia', baseurl: 'dashboard/co-phieu' },
    { id: 'profile', label: 'Hồ sơ', route: 'ho-so-doanh-nghiep', baseurl: 'dashboard/co-phieu' },
];

export default function InputSearch() {
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState('');
    const [stocks, setStocks] = useState<StockList>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeTab, setActiveTab] = useState<string>('report');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const vn30StockData = useAppSelector(selectSearchVn30StockData);
    const isLoading = useAppSelector(selectSearchStockLoading);

    const filterVn30Stocks = (stocksData: StockList | null, searchQuery: string): StockList => {
        if (!stocksData) return [];
        return stocksData.filter(stock => 
            stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
            stock.company_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    useEffect(() => {
        // Nếu query trống, ta hiển thị lại dữ liệu VN30
        if (query.length === 0) {
            setStocks(vn30StockData as StockList || []);
            return;
        }
    
        // Nếu chưa gọi API VN30 và người dùng bắt đầu nhập, gọi fetch VN30
        if (!vn30StockData) {
            dispatch(fetchSearchVn30Stock())
                .catch(() => setStocks([]));  
            setShowDropdown(true); 
            return;
        }
    
        // Nếu đã có dữ liệu VN30, thực hiện lọc
        if (vn30StockData && vn30StockData.length > 0) {
            const filteredVn30Stocks = filterVn30Stocks(vn30StockData as StockList, query);
    
            // Nếu tìm thấy cổ phiếu phù hợp trong danh sách VN30
            if (filteredVn30Stocks.length > 0) {
                setStocks(filteredVn30Stocks);  // Cập nhật kết quả tìm thấy vào danh sách stocks
            } else {
                // Nếu không tìm thấy, gọi API query dựa trên input người dùng
                dispatch(fetchSearchStockByQuery(query))
                    .then((action) => {
                        // Kiểm tra kết quả query từ API
                        const result = action.payload;
                        if (result.length > 0) {
                            setStocks(result);  // Nếu có kết quả, cập nhật danh sách stocks
                        } else {
                            setStocks([]);  // Nếu không có kết quả, đặt stocks rỗng
                        }
                    })
                    .catch(() => setStocks([]));  // Nếu có lỗi, đặt stocks rỗng
            }
        } else {
            // Trường hợp chưa có dữ liệu VN30, hoặc không tìm thấy trong VN30
            dispatch(fetchSearchStockByQuery(query))
                .then((action) => {
                    const result = action.payload;
                    if (result.length > 0) {
                        setStocks(result);  // Nếu có kết quả, cập nhật danh sách stocks
                    } else {
                        setStocks([]);  // Nếu không có kết quả, đặt stocks rỗng
                    }
                })
                .catch(() => setStocks([]));  // Nếu có lỗi, đặt stocks rỗng
        }
    }, [query, vn30StockData, dispatch]);

    const handleInputFocus = () => {
        if (vn30StockData) {
            setShowDropdown(true);
        }
    };

    // Effect for handling outside clicks
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Hàm xử lý khi tab được click
    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };

    // Hàm lấy route cho link dựa trên tab active
    const getRouteForStock = (symbol: string) => {
        const activeTabData = TABS.find(tab => tab.id === activeTab);
        if (activeTabData?.id === "chart") {
            return `/${activeTabData?.baseurl}?${activeTabData?.route}=${symbol}`;
        }
        return `/${activeTabData?.baseurl}/${symbol}/${activeTabData?.route}`;
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="border border-fintown-br-input rounded-[10px] h-[48px] flex items-center">
                <i className='bx bx-search text-fintown-txt-2 text-2xl h-auto px-[15px] py-[11px]'></i>
                <input
                    className="w-[434px] text-sm text-fintown-txt-1 bg-transparent outline-none py-[14px] pr-[20px]"
                    type="text"
                    placeholder="Tìm kiếm thông tin cổ phiếu"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={handleInputFocus}
                />
            </div>

            {showDropdown && (
                <div className="bg-fintown-bg-stn w-full absolute top-[50px] rounded-[10px] py-[10px] px-[10px]">
                    <div className='flex py-[10px] px-[14px] mb-[12px] gap-x-[8px] flex-wrap gap-y-[10px]'>
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                className={`text-xs text-fintown-txt-1 py-[8px] px-[10px] rounded-[10px] ${
                                    activeTab === tab.id ? 'bg-fintown-btn-active-1' : 'bg-fintown-btn-disable'
                                }`}
                                onClick={() => handleTabClick(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {isLoading ? (
                        <div className='flex justify-center py-[50px]'><SpinerLoader /></div>
                    ) : stocks.length > 0 ? (
                        <div className='overflow-y-scroll max-h-[228px] custom-scrollbarmini pb-[10px]'>
                            {stocks.map((stock, index) => (
                                <Link key={index} href={getRouteForStock(stock.symbol)}>
                                    <li
                                        className='py-[10px] list-none flex items-center cursor-pointer hover:bg-fintown-hvr-btn-2 rounded-[6px] justify-between'
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <div className='px-[14px] text-fintown-txt-1 text-sm'>{stock.symbol}</div>
                                        <div className='px-[14px] text-fintown-txt-1 text-sm truncate overflow-hidden whitespace-nowrap flex-grow'>
                                            {stock.company_name}
                                        </div>
                                        <div className='px-[14px] text-fintown-txt-1 text-sm'>{stock.exchange}</div>
                                    </li>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-sm text-fintown-txt-1 py-[10px]">Không tìm thấy cổ phiếu</div>
                    )}
                </div>
            )}
        </div>
    );
}