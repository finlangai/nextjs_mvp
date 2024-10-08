import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { 
    fetchSearchVn30Stock, 
    fetchSearchStockByQuery,
    selectSearchVn30StockData,
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
    const [hasSearched, setHasSearched] = useState(false);
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

    const handleSearch = () => {
        if (stocks.length > 0) {
            const firstStock = stocks[0];
            const route = getRouteForStock(firstStock.symbol);
            window.location.href = route;
            setShowDropdown(false);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        if (query.length === 0) {
            setHasSearched(false);
            setStocks(vn30StockData as StockList || []);
            return;
        }

        setHasSearched(true);
    
        if (!vn30StockData) {
            dispatch(fetchSearchVn30Stock())
                .catch(() => setStocks([]));  
            setShowDropdown(true); 
            return;
        }
    
        if (vn30StockData && vn30StockData.length > 0) {
            const filteredVn30Stocks = filterVn30Stocks(vn30StockData as StockList, query);
    
            if (filteredVn30Stocks.length > 0) {
                setStocks(filteredVn30Stocks);
            } else {
                dispatch(fetchSearchStockByQuery(query))
                    .then((action) => {
                        const result = action.payload;
                        setStocks(result.length > 0 ? result : []);
                    })
                    .catch(() => setStocks([]));
            }
        } else {
            dispatch(fetchSearchStockByQuery(query))
                .then((action) => {
                    const result = action.payload;
                    setStocks(result.length > 0 ? result : []);
                })
                .catch(() => setStocks([]));
        }
    }, [query, vn30StockData, dispatch]);

    const handleInputFocus = () => {
        if (!showDropdown) {
            setShowDropdown(true);
            if (query.length === 0) {
                setHasSearched(false);
            }
        }
    };

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

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };

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
                    onKeyPress={handleKeyPress}
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
                        <div className="text-center text-sm text-fintown-txt-1 py-[10px]">
                            {!hasSearched ? "Vui lòng nhập mã cổ phiếu hoặc tên công ty" : "Không tìm thấy cổ phiếu"}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}