import InputSearch from "../common/InputSearch";
import Link from "next/link";

export default function DashboardHeader() {
    return (
        <header 
            className="
            w-full h-[70px] 
            border-b border-fintown-br 
            px-[40px] 
            flex items-center justify-between bg-fintown-bg fixed top-0 z-50 
            ml-[70px]
            "
            style={{ width: 'calc(100% - 70px)' }}
        >
            <InputSearch />

            <div className="flex items-center gap-x-2.5">
                <button 
                    className="text-fintown-txt-1 text-sm rounded-md bg-fintown-btn-2 px-[19px] py-[6px]"
                >
                    Đăng nhập
                </button>

                <Link href="/signup">
                    <button className="text-fintown-txt-1 text-sm rounded-md bg-fintown-pr9 px-[19px] py-[6px]" >
                        Đăng ký
                    </button>
                </Link>
            </div>
        </header>
    );
}
