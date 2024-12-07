import Link from 'next/link';

interface FooterProps {
    backgroundColor: string;
}

export default function Footer({ backgroundColor }: FooterProps) {
    return (
        <footer className={`${backgroundColor} p-[40px]`}>
            <div className='flex items-center mb-[26px]'>
                <div className="logo mr-[60px]">
                    <Link href="/" className="flex h-[51px] items-center">
                        <img className='w-[42px] h-[42px]' src="/imgs/logo.png" alt="logo fintown" />
                        <p className='font-bold text-2xl text-fintown-txt-1 dark:text-fintown-txt-1-light'>fintown</p>
                    </Link>
                </div>
                <div className='flex items-center gap-x-[50px]'>
                    <Link href="/dang-ky-goi" className='text-base text-fintown-txt-2 hover:text-fintown-pr9'>Đăng ký gói</Link>
                    <Link href="/dashboard/ve-chung-toi" className='text-base text-fintown-txt-2 hover:text-fintown-pr9'>Về chúng tôi</Link>
                    <Link href="/" className='text-base text-fintown-txt-2 hover:text-fintown-pr9'>Pháp lý</Link>
                    <Link href="/dashboard/lien-he" className='text-base text-fintown-txt-2 hover:text-fintown-pr9'>Liên hệ</Link>
                </div>
                <div className="flex items-center gap-x-2.5 ml-auto">
                    <button className="text-fintown-txt-1 text-sm rounded-md bg-fintown-btn-2 px-[19px] py-[6px]">
                        Đăng nhập
                    </button>

                    <Link href="/signup" className='text-sm text-fintown-txt-2 hover:text-fintown-pr9'>
                        <button className="text-fintown-txt-1 text-sm rounded-md bg-fintown-pr9 px-[19px] py-[6px]" >
                            Đăng ký
                        </button>
                    </Link>
                </div>
            </div>
            <hr className='border-fintown-br dark:border-fintown-br-light mb-[39px]' />
            <div className='flex items-center gap-x-[17px]'>
                <Link href="/" className='text-base text-fintown-txt-2 hover:text-fintown-pr9'>Tùy chọn cookie</Link>
                <div className='w-[1px] h-[25px] bg-fintown-br dark:bg-fintown-br-light'></div>
                <Link href="/" className='flex items-center text-base text-fintown-txt-2 hover:text-fintown-pr9'>
                    <p className='m-3'>Quay lại đầu trang</p> <i className='bx bx-caret-up'></i>
                </Link>
            </div>
        </footer>
    );
}
