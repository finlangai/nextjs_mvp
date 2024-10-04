import Link from "next/link";

const SetPassword = () => {
    return (
        <>  
        <form className="w-[452px] py-[28px] px-[26px] ml-auto mr-auto mt-[80px]">
            <div className="font-bold text-fintown-txt-1 text-[24px] mb-[28px]">
                Tạo mật khẩu
            </div>

            <div className="mb-[30px]">
                <div className="font-medium text-fintown-txt-1 text-sm mb-[16px]">Mật khẩu</div>
                <div className="px-[20px] h-[48px] border border-fintown-br-input rounded-[10px] flex items-center hover:border-fintown-pr9">
                    <input className="w-full text-fintown-txt-1 bg-transparent outline-none text-sm" type="password" placeholder="Nhập mật khẩu"/>
                    <button className="pl-[10px]">
                        <i className='bx bxs-show text-fintown-txt-2' ></i>
                    </button>
                </div>
            </div>

            <div className="mb-[30px]">
                <div className="font-medium text-fintown-txt-1 text-sm mb-[16px]">Xác nhận mật khẩu</div>
                <div className="px-[20px] h-[48px] border border-fintown-br-input rounded-[10px] flex items-center hover:border-fintown-pr9">
                    <input className="w-full text-fintown-txt-1 bg-transparent outline-none text-sm" type="password" placeholder="Nhập lại mật khẩu"/>
                    <button className="pl-[10px]">
                        <i className='bx bxs-show text-fintown-txt-2' ></i>
                    </button>
                </div>
            </div>

            <div className="mb-[30px] flex flex-col gap-y-[15px]">
                <div className="flex items-center">
                    <i className='bx bx-check text-fintown-txt-2 mr-[8px] text-[20px]'></i>
                    <div className="text-fintown-txt-2 text-sm">8 - 100 ký tự</div>
                </div>

                <div className="flex items-center">
                    <i className='bx bx-check text-fintown-txt-2 mr-[8px] text-[20px]'></i>
                    <div className="text-fintown-txt-2 text-sm">Tối thiểu 1 chữ số</div>
                </div>

                <div className="flex items-center">
                    <i className='bx bx-check text-fintown-txt-2 mr-[8px] text-[20px]'></i>
                    <div className="text-fintown-txt-2 text-sm">Tối thiểu 1 chữ cái viết hoa</div>
                </div>
            </div>
            
            <Link href="/signup/set-display-name">
                <button className="h-[48px] w-full bg-fintown-pr9 rounded-[10px] mb-[30px]">
                    <span className="text-fintown-txt-1 text-sm">Bước tiếp theo</span>
                </button>
            </Link>
        </form>       
        </>
    )
}

export default SetPassword;