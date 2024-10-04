import LineChart from "../charts/LineChart";

const CardStock = () => {
    return (
        <div className="rounded-xl bg-fintown-bg-card max-w-[380px] max-h-[240px] min-w-[380px] min-h-[240px]">
            <div className="flex px-6 pt-[24px]">
                <div className="overflow-hidden w-[40px] h-[40px] rounded-full bg-white mr-[10px]">
                    <img className="w-full h-full" src="/imgs/logo_cty/vcb.png" alt="VCB" />
                </div>

                <div>
                    <div className="flex">
                        <p className="text-fintown-txt-1 font-bold mr-[5px]">VCB</p>
                        <p className="text-fintown-txt-1">(HOSE)</p>
                    </div>
                    <p className="text-fintown-txt-1 text-sm">Ngân hàng TMCP Ngoại thương Việt Nam</p>
                </div>
            </div>
            <div className="flex items-center mt-[16px]">
                <p className="text-fintown-txt-1 font-bold text-xl ml-[69px]">26,562</p>
                <div className="bg-fintown-stt-sell rounded text-xs text-fintown-txt-1 font-bold flex items-center px-[8px] py-[5px] ml-[12px]">
                    <i className='bx bx-caret-down text-sm'></i>
                    <span>5.62</span>
                    <span>%</span>
                </div>
            </div>
            <div>
                <LineChart />
            </div>
        </div>
    );
};

export default CardStock;
