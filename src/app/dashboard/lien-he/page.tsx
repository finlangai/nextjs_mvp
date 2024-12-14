"use client";
import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setErrorMessage('Tất cả các trường đều bắt buộc.');
            return;
        }

        setIsLoading(true);

        emailjs.sendForm(
            'service_xsykr2x',
            'template_7sc0ecm',
            e.target as HTMLFormElement,
            'v5NuO4ipWGiCevhEG'
        )
        .then((result) => {
            console.log('Success:', result.text);
            alert('Tin nhắn đã được gửi thành công!');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
            });
        })
        .catch((error) => {
            console.error('Error:', error.text);
            alert('Có lỗi xảy ra khi gửi tin nhắn.');
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <div className="min-h-screen bg-[#181A20] text-white py-10 px-5 flex flex-col items-center">
            <div className="flex flex-col md:flex-row w-full">
                <div className="flex-1 p-10">
                    <h1 className="text-4xl font-bold mb-5">
                        Liên hệ với <span className="text-[#25B770]">FINTOWN</span> Team
                    </h1>
                    <p className="text-lg leading-7 mb-6">
                        FINTOWN luôn sẵn sàng hỗ trợ và giải đáp vấn đề của bạn bất cứ lúc nào. Bạn có thể liên hệ với FINTOWN thông qua biểu mẫu bên cạnh...
                        <br />
                        ...hoặc liên hệ trực tiếp với FINTOWN ngay tại đây:
                    </p>
                    <div className="flex flex-col gap-4">
                        <a
                            href="tel:+84388408668"
                            className="flex items-center text-[#25B770] hover:text-[#1E8C5A] transition text-lg"
                        >
                            <i className="bx bx-phone text-2xl mr-2"></i> Gọi điện thoại
                        </a>
                        <a
                            href="mailto:support@fintown.vn"
                            className="flex items-center text-[#25B770] hover:text-[#1E8C5A] transition text-lg"
                        >
                            <i className="bx bx-envelope text-2xl mr-2"></i> Gửi email
                        </a>
                    </div>
                    <p className="mt-6 text-lg font-semibold">Hotline: (+84) 94 75 23169</p>
                </div>
                <div className="flex-1 p-10 bg-[#20232A] rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-5">Bạn cần hỗ trợ? Để lại lời nhắn tại đây!</h2>
                    <form
                        className="flex flex-col gap-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="name" className="block mb-2 font-semibold">
                                    Họ và tên
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Vui lòng nhập tên của bạn..."
                                    className="w-full p-3 rounded-lg bg-[#2B2E33] text-white border border-gray-600 hover:border-[#25B770] focus:ring-2 focus:ring-[#25B770] outline-none"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="email" className="block mb-2 font-semibold">
                                    Địa chỉ email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Vui lòng nhập email của bạn..."
                                    className="w-full p-3 rounded-lg bg-[#2B2E33] text-white border border-gray-600 hover:border-[#25B770] focus:ring-2 focus:ring-[#25B770] outline-none"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block mb-2 font-semibold">
                                Chủ đề
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Bạn cần hỗ trợ vấn đề gì?"
                                className="w-full p-3 rounded-lg bg-[#2B2E33] text-white border border-gray-600 hover:border-[#25B770] focus:ring-2 focus:ring-[#25B770] outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block mb-2 font-semibold">
                                Lời nhắn của bạn
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Hãy nhắn cụ thể vấn đề bạn cần hỗ trợ..."
                                className="w-full p-3 rounded-lg bg-[#2B2E33] text-white border border-gray-600 hover:border-[#25B770] focus:ring-2 focus:ring-[#25B770] outline-none resize-none"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#25B770] text-white py-3 rounded-lg font-semibold hover:bg-[#1E8C5A] transition transform hover:scale-105"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Đang gửi...' : 'Gửi tin nhắn'}
                        </button>
                        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
