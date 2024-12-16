"use client";
import React, { useEffect, useState } from "react";

const About = () => {
    const [teamMembers, setTeamMembers] = useState<any[]>([]);
    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const response = await fetch("https://portal.fintown.software/api/general/members");
                if (!response.ok) {
                    throw new Error("Failed to fetch members");
                }
                const data = await response.json();
                setTeamMembers(data);
            } catch (error) {
                console.error("There was an error fetching the team members:", error);
            }
        };

        fetchTeamMembers();
    }, []);

    return (
        <div className="text-white mx-[70px]">
            <section className="py-16 text-center">
                <h2 className="text-4xl text-[#25B770] uppercase mb-5 font-bold">Chúng tôi là ai?</h2>
                <p className="text-lg text-fintown-txt-1 dark:text-fintown-txt-1-light">
                    FINTOWN là đơn vị tiên phong trong việc cung cấp công cụ hỗ trợ đầu tư, dữ liệu tài chính cho nhà đầu tư cá nhân và tổ chức.
                </p>
                <div className="relative mt-8">
                    <img src="/imgs/banner/banner1.png" alt="Banner of Fintown" className="w-full object-cover brightness-50 rounded-lg" />
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
                        { icon: "💼", title: "Dịch vụ chuyên nghiệp", desc: "Với hơn 3 năm kinh nghiệm, FINTOWN cung cấp dịch vụ chuyên nghiệp nhất." },
                        { icon: "⚙️", title: "Công nghệ cải tiến", desc: "FINTOWN luôn cải tiến, áp dụng công nghệ mới để khách hàng có trải nghiệm tốt nhất." }
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

            <section className="py-16 text-center">
                <h2 className="text-3xl text-[#25B770] uppercase mb-8">Những con số ấn tượng</h2>
                <div className="flex flex-wrap justify-center gap-8 max-w-100xl">
                    {[ 
                        { number: "2 triệu +", desc: "Lượt tải trên các ứng dụng" },
                        { number: "95%", desc: "Điểm đánh giá mức độ hài lòng trên các chợ ứng dụng." },
                        { number: "Số 1", desc: "Website & App chứng khoán tại Việt Nam" }
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-gray-800 text-white p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                            <p>{stat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-16 text-center">
                <h2 className="text-2xl text-[#25B770] uppercase mb-10">Đội ngũ phát triển</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamMembers.length === 0 ? (
                        <p>Đang tải thông tin đội ngũ...</p> 
                    ) : (
                        teamMembers.map((member: any, idx: number) => (
                            <div key={idx} className="bg-gray-800 p-5 rounded-lg shadow-md transition-transform">
                                <img
                                    src={member.avatar || '/imgs/default-avatar.jpg'}
                                    alt={member.name}
                                    className="w-40 h-auto object-cover rounded-lg mb-3 mx-auto"
                                />
                                <h3 className="text-lg text-[#25B770] font-bold">{member.name}</h3>
                                <p className="text-sm text-gray-300 mb-[10px]">{member.roles}</p>
                                <p>{member.description}</p>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default About;
