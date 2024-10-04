import Link from "next/link";

const LoginForm = () => {
    return (
        <>
            <form className="w-[452px] py-[28px] px-[26px] bg-fintown-bg-stn rounded-[20px]">
                <div className="font-bold text-fintown-txt-1 text-[24px] mb-[28px]">
                    Đăng nhập với tài khoản
                </div>

                <div className="mb-[30px]">
                    <div className="font-medium text-fintown-txt-1 text-sm mb-[16px]">Email</div>

                    <div className="px-[20px] h-[48px] border border-fintown-br-input rounded-[10px] flex items-center hover:border-fintown-pr9">
                        <input className="text-fintown-txt-1 bg-transparent outline-none text-sm" type="text" placeholder="username@gmail.com" />
                    </div>
                </div>

                <div className="mb-[30px]">
                    <div className="font-medium text-fintown-txt-1 text-sm mb-[16px]">Mật khẩu</div>

                    <div className="px-[20px] h-[48px] border border-fintown-br-input rounded-[10px] flex items-center hover:border-fintown-pr9">
                        <input className="text-fintown-txt-1 bg-transparent outline-none text-sm" type="password" placeholder="Password" />
                    </div>
                </div>

                <button className="h-[48px] w-full bg-fintown-pr9 rounded-[10px] mb-[30px]">
                    <span className="text-fintown-txt-1 text-sm">Đăng nhập</span>
                </button>

                <div className="flex justify-between mb-[27px]">
                    <Link href="/" className="text-sm">
                        Quên mật khẩu?
                    </Link>

                    <div className="flex items-center">
                        <div className="border border-fintown-pr9 cursor-pointer rounded-[2px] h-[20px] w-[20px] mr-[10px] flex items-center justify-center">
                            <i className='bx bx-check text-fintown-txt-1 w-full h-full'></i>
                        </div>

                        <div className="text-fintown-txt-1 text-sm">Ghi nhớ</div>
                    </div>
                </div>

                <div className="flex items-center gap-x-[12px] mb-[40px]">
                    <hr className="flex-1 border-fintown-lnr-1" />
                    <div className="text-fintown-txt-1 text-sm">
                        hoặc
                    </div>
                    <hr className="flex-1 border-fintown-lnr-1" />
                </div>

                <button className="h-[48px] w-full border border-fintown-br-btn rounded-[10px]">
                    <span className="text-fintown-txt-1 text-sm">Đăng ký</span>
                </button>
            </form>
        </>
    )

}

export default LoginForm;