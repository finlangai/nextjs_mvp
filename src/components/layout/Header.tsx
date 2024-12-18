import Link from "next/link";

export default function Header() {
    return (
        <header
            className="
            w-full h-[70px] 
            border-b border-fintown-br 
            px-[40px] 
            flex items-center justify-between bg-fintown-bg fixed top-0 z-50 
            ">

            <div className="flex items-center">
                <img className="h-[42px] w-[42px]" src="/imgs/logo.png" alt="fintown-logo" />
                <div className="font-bold text-fintown-txt-1 text-[24px]">fintown</div>
            </div>

            <div className="flex">
                <div className='flex items-center gap-x-[50px] mr-[46px]'>
                    <Link href="/dashboard/dang-ky-goi" className='text-base text-fintown-txt-2 hover:text-fintown-pr9'>Đăng ký gói</Link>
                    <Link href="/dashboard/ve-chung-toi" className='text-base text-fintown-txt-2 hover:text-fintown-pr9'>Về chúng tôi</Link>
                    <Link href="/dashboard/phap-ly" className='text-base text-fintown-txt-2 hover:text-fintown-pr9'>Pháp lý</Link>
                    <Link href="/dashboard/lien-he" className='text-base text-fintown-txt-2 hover:text-fintown-pr9'>Liên hệ</Link>
                </div>

                <div className="flex items-center gap-x-2.5">
                    <Link href="/">
                        <button className="text-fintown-txt-1 text-sm rounded-md bg-fintown-btn-2 px-[19px] py-[6px]">
                            Đăng nhập
                        </button>
                    </Link>
                    <Link href="/signup">
                        <button className="text-fintown-txt-1 text-sm rounded-md bg-fintown-pr9 px-[19px] py-[6px]" >
                            Đăng ký
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
}


