import Link from "next/link";

const SignUpPage = () => {
    return (
        <>  
        <form className="w-[452px] py-[28px] px-[26px] ml-auto mr-auto mt-[80px]">
            <div className="font-bold text-fintown-txt-1 text-[24px] mb-[28px]">
                Tạo tài khoản
            </div>

            <div className="mb-[30px]">
                <div className="font-medium text-fintown-txt-1 text-sm mb-[16px]">Email</div>

                <div className="px-[20px] h-[48px] border border-fintown-br-input rounded-[10px] flex items-center hover:border-fintown-pr9">
                    <input className="text-fintown-txt-1 bg-transparent outline-none text-sm" type="text" placeholder="username@gmail.com" />
                </div>
            </div>

            <div className="flex mb-[26px]">
                <div className="border border-fintown-pr9 cursor-pointer rounded-[2px] h-[20px] min-w-[20px] mr-[10px] flex items-center justify-center">
                    <i className='bx bx-check text-fintown-txt-1 w-full h-full ml-[1px]'></i>
                </div>

                <div className="text-fintown-txt-1 text-sm">Khi đăng ký, tức là tôi đồng ý với Điều khoản dịch vụ của chúng tôi.</div>
            </div>

            <Link href="/signup/set-password">
                <button className="h-[48px] w-full bg-fintown-pr9 rounded-[10px] mb-[30px]">
                    <span className="text-fintown-txt-1 text-sm">Bước tiếp theo</span>
                </button>
            </Link>

            <div className="flex items-center gap-x-[12px] mb-[40px]">
                <hr className="flex-1 border-fintown-lnr-1" />
                <div className="text-fintown-txt-1 text-sm">
                    Bạn đã có tài khoản?
                </div>
                <hr className="flex-1 border-fintown-lnr-1" />
            </div>

            <Link href="/">
                <button className="h-[48px] w-full border border-fintown-br-btn rounded-[10px]">
                    <span className="text-fintown-txt-1 text-sm">Đăng nhập</span>
                </button> 
            </Link>

        </form>       
        </>
    )
}

export default SignUpPage;