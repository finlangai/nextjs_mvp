import Link from "next/link";

const SetDisplayName = () => {
    return (
        <>  
        <form className="w-[452px] py-[28px] px-[26px] ml-auto mr-auto mt-[80px]">
            <div className="font-bold text-fintown-txt-1 text-[24px] mb-[28px]">
                Tên hiển thị
            </div>

            <div className="mb-[30px]">
                <div className="font-medium text-fintown-txt-1 text-sm mb-[16px]">Nhập tên</div>
                <div className="px-[20px] h-[48px] border border-fintown-br-input rounded-[10px] flex items-center hover:border-fintown-pr9">
                    <input className="w-full text-fintown-txt-1 bg-transparent outline-none text-sm" type="text" placeholder="Bạn muốn chúng tôi gọi bạn là gì?"/>
                </div>
            </div>
            
            <Link href="/signup/set-display-name">
                <button className="h-[48px] w-full bg-fintown-pr9 rounded-[10px] mb-[30px]">
                    <span className="text-fintown-txt-1 text-sm">Hoàn tất</span>
                </button>
            </Link>
        </form>       
        </>
    )
}

export default SetDisplayName;