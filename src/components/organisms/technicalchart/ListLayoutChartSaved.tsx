import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/src/redux/hooks/useAppStore';
import { setSelectedLayout } from '@/src/redux/LayoutTechChart';

export default function ListLayoutChartSaved() {
    const dispatch = useAppDispatch();

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupDelete, setIsPopupDelete] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [layoutToDelete, setLayoutToDelete] = useState<{ name: string; layout: any; createdAt: string } | null>(null);

    const [layouts, setLayouts] = useState<
        { name: string; layout: any; createdAt: string; }[]
    >([]);

    // Fetch layouts from localStorage
    useEffect(() => {
        const existingLayouts = localStorage.getItem("chartLayouts");
        if (existingLayouts) {
            setLayouts(JSON.parse(existingLayouts));
        }
    }, [isPopupOpen, isPopupDelete]);

    // Handle layout selection
    const handleSelectLayout = (layout: { name: string; layout: any; createdAt: string }) => {
        dispatch(setSelectedLayout(layout));
        setIsPopupOpen(false);
    };

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Clear search term
    const handleClearSearch = () => {
        setSearchTerm('');
    };

    // Delete layout
    const handleDeleteLayout = () => {
        if (layoutToDelete) {
            // Remove the specific layout from localStorage
            const existingLayouts = JSON.parse(localStorage.getItem("chartLayouts") || '[]');
            const updatedLayouts = existingLayouts.filter(
                (layout: { name: string; createdAt: string }) => 
                    layout.name !== layoutToDelete.name || layout.createdAt !== layoutToDelete.createdAt
            );
            
            localStorage.setItem("chartLayouts", JSON.stringify(updatedLayouts));
            
            // Reset delete popup and layout
            setIsPopupDelete(false);
            setLayoutToDelete(null);
        }
    };

    // Filter layouts based on search term
    const filteredLayouts = layouts.filter(layout => 
        layout.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <i 
                onClick={() => setIsPopupOpen(true)} 
                className='bx bx-list-check text-fintown-txt-2 text-[26px] mr-[20px] cursor-pointer hover:text-fintown-pr9'
            >
            </i>

            {isPopupOpen && (
                <div
                    className={`fixed w-full h-full top-0 left-0 z-[999999] flex justify-center items-start 
                    bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out 
                    ${isPopupOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsPopupOpen(false)}
                >
                    <div
                        className={`w-[450px] bg-fintown-bg-stn rounded-[8px] py-[32px] max-h-max
                        transform transition-all duration-500 ease-out
                        ${isPopupOpen ? 'mt-[80px] translate-y-0 opacity-100' : 'mt-0 -translate-y-12 opacity-0'}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-[16px] text-fintown-txt-1 font-[600] mb-[24px] flex justify-between items-center px-[32px]">
                            <div>Tải bố cục biểu đồ</div>
                            <i className='bx bx-x text-[24px] cursor-pointer' onClick={() => setIsPopupOpen(false)}></i>
                        </div>

                        <div className='flex items-center mb-[32px] px-[32px]'>
                            <div className='py-[13px] px-[16px] rounded-[6px] border border-fintown-br flex items-center mr-[12px] w-full'>
                                <i className='bx bx-search text-fintown-txt-2 text-[20px] mr-[14px]'></i>
                                <input
                                    className='text-[14px] text-fintown-txt-1 block w-full placeholder:text-fintown-txt-2 bg-transparent outline-none'
                                    placeholder='Tìm bố cục đã lưu'
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

                        <div className='custom-scrollbarmini2 h-[400px] overflow-y-auto px-[20px]'>
                            {filteredLayouts.length > 0 ? (
                                <>
                                {filteredLayouts.map((layout, index) => (
                                    <div 
                                        key={index} 
                                        className='flex items-center mb-[5px] hover:bg-[rgba(66,64,64,0.34)] cursor-pointer px-[16px] py-[10px] rounded-[8px]'
                                        onClick={() => handleSelectLayout(layout)}
                                    >
                                        <div className='pr-[30px]'>
                                            <div className='text-fintown-txt-1 text-[14px] mb-[5px]'>
                                                {layout?.name}
                                            </div>
                                            <div className='text-fintown-txt-2 text-[12px]'>
                                                {layout?.createdAt}
                                            </div>
                                        </div>
                                        <div className='text-fintown-txt-2 text-[20px] ml-auto'>
                                            <i 
                                                className='bx bx-trash cursor-pointer hover:text-fintown-txt-1' 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setLayoutToDelete(layout);
                                                    setIsPopupDelete(true);
                                                }}
                                            ></i>
                                        </div>
                                    </div>
                                ))}
                                </>
                            ) : (
                                <p className="text-[14px] text-fintown-txt-2 text-center mt-[100px]">
                                    Không có bố cục nào được tìm thấy.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Popup */}
            {isPopupDelete && (
                <div 
                    className="fixed w-full h-full top-0 left-0 z-[999999] flex justify-center items-center 
                    bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out opacity-100"
                    onClick={() => setIsPopupDelete(false)}
                >
                    <div 
                        className="w-[400px] bg-fintown-bg-stn rounded-[8px] py-[24px] px-[24px]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-[16px] text-fintown-txt-1 font-[600] mb-[20px]">
                            Xác nhận xóa bố cục
                        </div>
                        <p className="text-[14px] text-fintown-txt-2 mb-[24px]">
                            Bạn có chắc chắn muốn xóa bố cục "{layoutToDelete?.name}" không?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button 
                                className="px-[25px] py-[10px] rounded-[6px] text-fintown-txt-1 text-[14px] border border-fintown-br"
                                onClick={() => setIsPopupDelete(false)}
                            >
                                Hủy
                            </button>
                            <button 
                                className="px-[25px] py-[10px] rounded-[6px] bg-[#ef4444] text-fintown-txt-1 text-[14px]"
                                onClick={handleDeleteLayout}
                            >
                                Xác nhận xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}