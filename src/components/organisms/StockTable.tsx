const StockTable = () => {
    return (
        <table className="table-fixed w-full">
            <colgroup>
                <col className="w-[230px]" />
                <col className="min-w-[90px]" />
                <col className="min-w-[90px]" />
                <col className="min-w-[105px]" />
                <col className="min-w-[90px]" />
                <col className="min-w-[90px]" />
                <col className="min-w-[90px]" />
                <col className="min-w-[90px]" />
                <col className="min-w-[90px]" />
                <col className="min-w-[90px]" />
                <col className="min-w-[105px]" />
            </colgroup>

            <thead>
                <tr>
                    <th className="bg-fintown-bg-stn rounded-l-[10px] p-[12px]">
                        <div className="text-left">
                            <span className="text-sm font-normal text-fintown-txt-1">Mã cổ phiếu</span>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px]">
                        <div className="flex relative justify-end">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[15px]">Vốn hóa</p>
                            <div className="flex flex-col text-[10px] gap-y-1.5 absolute right-2.5 top-0.5">
                                <i className='bx bx-caret-up w-0 h-0 text-fintown-txt-1'></i>
                                <i className='bx bx-caret-down w-0 h-0 text-fintown-txt-1'></i>
                            </div>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px]">
                        <div className="flex relative justify-end">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[15px]">Giá</p>
                            <div className="flex flex-col text-[10px] gap-y-1.5 absolute right-2.5 top-0.5">
                                <i className='bx bx-caret-up w-0 h-0 text-fintown-txt-1'></i>
                                <i className='bx bx-caret-down w-0 h-0 text-fintown-txt-1'></i>
                            </div>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px]">
                        <div className="flex relative justify-end">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[15px]">Thay đổi giá</p>
                            <div className="flex flex-col text-[10px] gap-y-1.5 absolute right-2.5 top-2.5">
                                <i className='bx bx-caret-up w-0 h-0 text-fintown-txt-1'></i>
                                <i className='bx bx-caret-down w-0 h-0 text-fintown-txt-1'></i>
                            </div>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px]">
                        <div className="flex relative justify-end">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[15px]">7 ngày</p>
                            <div className="flex flex-col text-[10px] gap-y-1.5 absolute right-2.5 top-0.5">
                                <i className='bx bx-caret-up w-0 h-0 text-fintown-txt-1'></i>
                                <i className='bx bx-caret-down w-0 h-0 text-fintown-txt-1'></i>
                            </div>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px]">
                        <div className="flex relative justify-end">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[15px]">1 năm</p>
                            <div className="flex flex-col text-[10px] gap-y-1.5 absolute right-2.5 top-0.5">
                                <i className='bx bx-caret-up w-0 h-0 text-fintown-txt-1'></i>
                                <i className='bx bx-caret-down w-0 h-0 text-fintown-txt-1'></i>
                            </div>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px]">
                        <div className="flex relative justify-end">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[15px]">P/E</p>
                            <div className="flex flex-col text-[10px] gap-y-1.5 absolute right-2.5 top-0.5">
                                <i className='bx bx-caret-up w-0 h-0 text-fintown-txt-1'></i>
                                <i className='bx bx-caret-down w-0 h-0 text-fintown-txt-1'></i>
                            </div>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px]">
                        <div className="flex relative justify-end">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[15px]">P/B</p>
                            <div className="flex flex-col text-[10px] gap-y-1.5 absolute right-2.5 top-0.5">
                                <i className='bx bx-caret-up w-0 h-0 text-fintown-txt-1'></i>
                                <i className='bx bx-caret-down w-0 h-0 text-fintown-txt-1'></i>
                            </div>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px]">
                        <div className="flex relative justify-end">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[15px]">ROE</p>
                            <div className="flex flex-col text-[10px] gap-y-1.5 absolute right-2.5 top-0.5">
                                <i className='bx bx-caret-up w-0 h-0 text-fintown-txt-1'></i>
                                <i className='bx bx-caret-down w-0 h-0 text-fintown-txt-1'></i>
                            </div>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px]">
                        <div className="flex relative justify-end">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[15px]">Sàn</p>
                            <div className="flex flex-col text-[10px] gap-y-1.5 absolute right-2.5 top-0.5">
                                <i className='bx bx-caret-up w-0 h-0 text-fintown-txt-1'></i>
                                <i className='bx bx-caret-down w-0 h-0 text-fintown-txt-1'></i>
                            </div>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn rounded-r-[10px] p-[12px]">
                        <div className="flex relative justify-end">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[15px]">Ngành</p>
                            <div className="flex flex-col text-[10px] gap-y-1.5 absolute right-2.5 top-0.5">
                                <i className='bx bx-caret-up w-0 h-0 text-fintown-txt-1'></i>
                                <i className='bx bx-caret-down w-0 h-0 text-fintown-txt-1'></i>
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr className="border-b border-fintown-lnr-1 hover:bg-fintown-hvr-btn-1">
                    <td className="py-[21px] px-[12px]">
                        <div className="flex">
                            <div className="overflow-hidden min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] rounded-[50%] bg-white mr-[10px]">
                                <img className="w-full h-full" src="/imgs/logo_cty/vcb.png" alt="vcb" />
                            </div>
                            <div>
                                <p className="text-fintown-txt-1 text-sm">VCB</p>
                                <div className="text-fintown-txt-1 text-xs overflow-hidden whitespace-nowrap text-ellipsis max-w-[100px]">
                                    Ngân hàng TMCP Ngoại thương Việt Nam
                                </div>
                            </div>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">512,519T</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">91,700</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">0.20%</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">-0.76%</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">2.92%</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">15.38</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">2.82</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">19.98%</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">HOSE</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">Tài chính</p>
                        </div>
                    </td>
                </tr>

                <tr className="border-b border-fintown-lnr-1 hover:bg-fintown-hvr-btn-1">
                    <td className="py-[21px] px-[12px]">
                        <div className="flex">
                            <div className="overflow-hidden min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] rounded-[50%] bg-white mr-[10px]">
                                <img className="w-full h-full" src="/imgs/logo_cty/vcb.png" alt="vcb" />
                            </div>
                            <div>
                                <p className="text-fintown-txt-1 text-sm">VCB</p>
                                <div className="text-fintown-txt-1 text-xs overflow-hidden whitespace-nowrap text-ellipsis max-w-[100px]">
                                    Ngân hàng TMCP Ngoại thương Việt Nam
                                </div>
                            </div>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">512,519T</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">91,700</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">0.20%</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">-0.76%</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">2.92%</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">15.38</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">2.82</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">19.98%</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">HOSE</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">Tài chính</p>
                        </div>
                    </td>
                </tr>

                <tr className="border-b border-fintown-lnr-1 hover:bg-fintown-hvr-btn-1">
                    <td className="py-[21px] px-[12px]">
                        <div className="flex">
                            <div className="overflow-hidden min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] rounded-[50%] bg-white mr-[10px]">
                                <img className="w-full h-full" src="/imgs/logo_cty/vcb.png" alt="vcb" />
                            </div>
                            <div>
                                <p className="text-fintown-txt-1 text-sm">VCB</p>
                                <div className="text-fintown-txt-1 text-xs overflow-hidden whitespace-nowrap text-ellipsis max-w-[100px]">
                                    Ngân hàng TMCP Ngoại thương Việt Nam
                                </div>
                            </div>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">512,519T</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">91,700</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">0.20%</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">-0.76%</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">2.92%</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">15.38</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">2.82</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">19.98%</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">HOSE</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">Tài chính</p>
                        </div>
                    </td>
                </tr>

                <tr className="border-b border-fintown-lnr-1 hover:bg-fintown-hvr-btn-1">
                    <td className="py-[21px] px-[12px]">
                        <div className="flex">
                            <div className="overflow-hidden min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] rounded-[50%] bg-white mr-[10px]">
                                <img className="w-full h-full" src="/imgs/logo_cty/vcb.png" alt="vcb" />
                            </div>
                            <div>
                                <p className="text-fintown-txt-1 text-sm">VCB</p>
                                <div className="text-fintown-txt-1 text-xs overflow-hidden whitespace-nowrap text-ellipsis max-w-[100px]">
                                    Ngân hàng TMCP Ngoại thương Việt Nam
                                </div>
                            </div>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">512,519T</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">91,700</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">0.20%</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">-0.76%</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">2.92%</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">15.38</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">2.82</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">19.98%</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">HOSE</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">Tài chính</p>
                        </div>
                    </td>
                </tr>

                <tr className="border-b border-fintown-lnr-1 hover:bg-fintown-hvr-btn-1">
                    <td className="py-[21px] px-[12px]">
                        <div className="flex">
                            <div className="overflow-hidden min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] rounded-[50%] bg-white mr-[10px]">
                                <img className="w-full h-full" src="/imgs/logo_cty/vcb.png" alt="vcb" />
                            </div>
                            <div>
                                <p className="text-fintown-txt-1 text-sm">VCB</p>
                                <div className="text-fintown-txt-1 text-xs overflow-hidden whitespace-nowrap text-ellipsis max-w-[100px]">
                                    Ngân hàng TMCP Ngoại thương Việt Nam
                                </div>
                            </div>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">512,519T</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">91,700</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">0.20%</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">-0.76%</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">2.92%</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">15.38</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">2.82</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">19.98%</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">HOSE</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">Tài chính</p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default StockTable