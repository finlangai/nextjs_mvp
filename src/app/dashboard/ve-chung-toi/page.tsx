import React from 'react';

const About = () => {
    return (
        <div className="text-white mx-[70px]">
            <section className="py-16 text-center">
                <h2 className="text-4xl text-[#25B770] uppercase mb-5">Chúng tôi là ai?</h2>
                <p className="text-lg text-fintown-txt-1 dark:text-fintown-txt-1-light">
                    FINTOWN là đơn vị tiên phong trong việc cung cấp công cụ hỗ trợ đầu tư, dữ liệu tài chính cho nhà đầu tư cá nhân và tổ chức.
                </p>
                <div className="relative mt-8">
                    <img src={'/imgs/banner/banner1.png'} alt="Banner of Fintown" className="w-full object-cover brightness-50 rounded-lg" />
                    <div className="absolute top-40 left-1/2 transform -translate-x-1/2 text-center bg-black/50 p-5 rounded-lg">
                        <h2 className="text-xl text-[#25B770]">Chúng tôi giúp bạn đầu tư thông minh</h2>
                        <p>FINTOWN cung cấp công cụ và dữ liệu tài chính mạnh mẽ để bạn ra quyết định đầu tư chính xác.</p>
                        <button className="bg-[#25B770] hover:bg-[#1E9A60] text-white py-2 px-4 mt-3 rounded transition">Tìm hiểu thêm</button>
                    </div>
                </div>
            </section>

            <section className="py-16 text-left">
                <h2 className="text-3xl text-[#25B770] uppercase mb-10 text-center">Tại sao bạn nên sử dụng FINTOWN</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {[
                        { icon: "📊", title: "Dữ liệu chuẩn xác", desc: "Dữ liệu đa dạng về tài chính, chứng khoán, kinh tế vĩ mô…" },
                        { icon: "💼", title: "Dịch vụ chuyên nghiệp", desc: "FINTOWN cung cấp dịch vụ chuyên nghiệp nhất." },
                        { icon: "⚙️", title: "Công nghệ cải tiến", desc: "FINTOWN luôn cải tiến, áp dụng công nghệ mới để khách hàng có trải nghiệm tốt nhất." },
                    ].map((feature, idx) => (
                        <div key={idx} className="flex items-start bg-gray-800 p-5 rounded-lg shadow-md transition-transform">
                            <div className="flex-shrink-0 w-14 h-14 flex justify-center items-center bg-[#25B770] text-white rounded-lg text-2xl mr-4">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-[#25B770] text-lg font-bold">{feature.title}</h3>
                                <p>{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* <section className="py-16 text-center">
                <h2 className="text-3xl text-[#25B770] uppercase mb-8">Những con số ấn tượng</h2>
                <div className="flex flex-wrap justify-center gap-8 max-w-100xl">
                    {[
                        { number: "2 triệu +", desc: "Lượt tải trên các ứng dụng" },
                        { number: "95%", desc: "Điểm đánh giá mức độ hài lòng trên các chợ ứng dụng." },
                        { number: "Số 1", desc: "Website & App chứng khoán tại Việt Nam" },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-gray-800 text-white p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                            <p>{stat.desc}</p>
                        </div>
                    ))}
                </div>
            </section> */}

            <section className="py-16 text-center">
                <h2 className="text-2xl text-[#25B770] uppercase mb-10">Đội ngũ phát triển</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[{
                        name: "Nguyễn Kim Hùng (TL)",
                        role: "Developer và Designer",
                        description: "Quản lý và điều phối dự án.",
                        image: "/imgs/nguyenkimhung.jpg" 
                    }, 
                    {
                        name: "Trần Gia Bảo", 
                        role: "Developer và Designer", 
                        description: "Chịu trách nhiệm phát triển các tính năng của website.", 
                        image: "/imgs/trangiabao.jpg"
                    },
                    {
                        name: "Phạm Văn Tân", 
                        role: "Developer và Designer", 
                        description: "Chịu trách nhiệm phát triển các tính năng của website.", 
                        image: "/imgs/phamvantan.jpg"
                    },
                    {
                        name: "Trần Thái Vinh", 
                        role: "Developer và Designer", 
                        description: "Chịu trách nhiệm phát triển các tính năng của website.", 
                        image: "/imgs/tranthaivinh.jpg"
                    },
                    {
                        name: "Võ Tấn Phước", 
                        role: "Developer và Designer", 
                        description: "Chịu trách nhiệm phát triển các tính năng của website.", 
                        image: "/imgs/votanphuoc.jpg"
                    },
                    {
                        name: "Trần Tiến Phát", 
                        role: "Developer và Designer", 
                        description: "Phân tích và tối ưu hóa dữ liệu tài chính.", 
                        image: "/imgs/trantienphat.jpg"
                    }].map((teamMember, idx) => (
                        <div key={idx} className="bg-gray-800 p-5 rounded-lg shadow-md transition-transform">
                            <img src={teamMember.image} alt={teamMember.name} className="w-40 h-auto object-cover rounded-lg mb-3 mx-auto" />
                            <h3 className="text-lg text-[#25B770] font-bold">{teamMember.name}</h3>
                            <p className="text-sm text-gray-300">{teamMember.role}</p>
                            <p>{teamMember.description}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default About;
