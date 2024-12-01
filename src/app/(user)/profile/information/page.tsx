"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/src/redux/store";
import { updateUserInformation, updateUserAvatar, fetchUserProfile } from "@/src/redux/auth/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function InformationPage() {
    // const dispatch: AppDispatch = useDispatch();
    // const user = useSelector((state: RootState) => state.auth.user);
    // const loading = useSelector((state: RootState) => state.auth.loading);
    // const [avatar, setAvatar] = useState<File | null>(null);

    // // Formik configuration
    // const formik = useFormik({
    //     enableReinitialize: true,
    //     initialValues: {
    //         fullname: user?.fullname || "",
    //         email: user?.email || "",
    //         phone: user?.phone || "",
    //         password: "Kim!2911Phuong",
    //     },
    //     validationSchema: Yup.object({
    //         fullname: Yup.string().required("Tên hiển thị là bắt buộc"),
    //         email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
    //         phone: Yup.string().required("Số điện thoại là bắt buộc"),
    //         password: Yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    //     }),
    //     onSubmit: async (values) => {
    //         try {
    //             const resultAction = await dispatch(updateUserInformation(values)).unwrap();
    //             if (resultAction) {
    //                 toast.success("Cập nhật thông tin thành công!");
    //                 dispatch(fetchUserProfile());
    //             }
    //         } catch (error) {
    //             toast.error("Cập nhật thông tin không thành công, vui lòng thử lại.");
    //         }
    //     },
    // });

    // const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files) {
    //         setAvatar(e.target.files[0]);
    //     }
    // };

    // useEffect(() => {
    //     if (avatar) {
    //         dispatch(updateUserAvatar(avatar)).then(() => {
    //             toast.success("Cập nhật avatar thành công!");
    //             dispatch(fetchUserProfile());
    //         }).catch(() => {
    //             toast.error("Cập nhật avatar không thành công, vui lòng thử lại.");
    //         });
    //     }
    // }, [avatar, dispatch]);

    return (
        <div className="w-3/4 pl-10 pt-16">
        <ToastContainer />
        <div className="w-[626px] h-[524px] relative">
            <div className="pr-[37px] pt-0.5 pb-[22px] left-0 top-0 absolute justify-start items-center inline-flex">
                <div className="text-white text-xl font-bold">Thông tin tài khoản</div>
            </div>
            <div className="w-[626px] h-[105px] left-0 top-[71px] absolute border-b border-[#2b3139]">
                <div className="left-[98px] top-[19px] absolute text-white text-sm font-bold">Ảnh đại diện</div>
                <img className="w-20 h-20 left-0 top-0 absolute rounded-full" src="https://via.placeholder.com/80x80" />
                <div className="w-[227px] left-[99px] top-[42px] absolute text-[#848e9c] text-xs font-normal">Bạn có thể tải ảnh của mình lên tại đây.</div>
                <div className="w-[120px] h-[33px] left-[506px] top-[23px] absolute justify-center items-center inline-flex">
                <div className="grow shrink basis-0 self-stretch pl-[17px] pr-[18px] py-[9px] bg-[#2b3139] rounded-lg justify-center items-center inline-flex">
                    <div className="text-white text-xs font-normal">Tải ảnh mới lên</div>
                </div>
                </div>
            </div>
            <div className="w-[626px] pb-[26px] left-0 top-[206px] absolute border-b border-[#2b3139] justify-center items-start gap-6 inline-flex">
                <div className="grow shrink basis-0 self-stretch flex-col justify-center items-start gap-[13px] inline-flex">
                <div className="text-white text-sm font-bold">Tên hiển thị</div>
                <div className="self-stretch h-[52px] pl-7 pr-[59px] py-4 rounded-lg border border-[#2b3139] justify-start items-center inline-flex">
                    <div className="w-[213px] text-white text-sm font-normal leading-tight">Icebingsu</div>
                </div>
                </div>
                <div className="grow shrink basis-0 self-stretch flex-col justify-center items-start gap-[13px] inline-flex">
                <div className="text-white text-sm font-bold">Email</div>
                <div className="self-stretch h-[52px] pl-7 pr-[59px] py-4 rounded-lg border border-[#2b3139] justify-start items-center inline-flex">
                    <div className="w-[213px] text-white text-sm font-normal leading-tight">icebingsu365@gmail.com</div>
                </div>
                </div>
            </div>
            <div className="w-[625px] pb-[26px] left-0 top-[344px] absolute border-b border-[#2b3139] justify-center items-start gap-[23px] inline-flex">
                <div className="grow shrink basis-0 self-stretch flex-col justify-center items-start gap-[13px] inline-flex">
                <div className="text-white text-sm font-bold">Số điện thoại</div>
                <div className="self-stretch h-[52px] pl-7 pr-[59px] py-4 rounded-lg border border-[#2b3139] justify-start items-center inline-flex">
                    <div className="w-[213px] text-white text-sm font-normal leading-tight">0385323196</div>
                </div>
                </div>
                <div className="grow shrink basis-0 self-stretch flex-col justify-center items-start gap-[13px] inline-flex">
                <div className="text-white text-sm font-bold">Mật khẩu</div>
                <div className="self-stretch h-[52px] pl-7 pr-[59px] py-4 rounded-lg border border-[#2b3139] justify-start items-center inline-flex">
                    <div className="w-[213px] text-white text-sm font-normal leading-tight">****************</div>
                </div>
                </div>
            </div>
            <div className="pl-12 pr-[47px] pt-[13px] pb-3.5 left-[228px] top-[482px] absolute bg-[#0ecb81] rounded-lg justify-center items-center inline-flex">
                <div className="text-white text-xs font-normal">Lưu thông tin</div>
            </div>
        </div>
        {/* <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <img
                        src={user?.avatar || "/imgs/default-avatar.jpg"}
                        alt="User profile picture"
                        className="rounded-full w-[40px] h-[40px] object-cover cursor-pointer"
                        onClick={() => document.getElementById('avatarInput')?.click()}
                    />
                    <input
                        type="file"
                        id="avatarInput"
                        className="hidden"
                        onChange={handleAvatarChange}
                    />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{user?.email || "Tên người dùng"}</h1>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm rounded-md bg-fintown-pr9 px-[19px] py-[6px]">BASIC</span>
                        <span className="text-red-500">• Chưa tích hợp</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <span>0</span>
                <i className="bx bx-coin text-yellow-500 text-2xl"></i>
                <span>Credit của bạn</span>
                <Link href="#" className="text-blue-500">
                    Xem chi tiết
                </Link>
            </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
                <label>Tên hiển thị</label>
                <div className="flex items-center bg-gray-800 p-2 rounded">
                    <i className="bx bx-user text-gray-500 text-2xl"></i>
                    <input
                        type="text"
                        name="fullname"
                        value={formik.values.fullname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-transparent border-none focus:outline-none ml-2 w-full"
                    />
                </div>
                {formik.touched.fullname && formik.errors.fullname ? (
                    <div className="text-red-500">{formik.errors.fullname}</div>
                ) : null}
            </div>

            <div>
                <label>Email</label>
                <div className="flex items-center bg-gray-800 p-2 rounded">
                    <i className="bx bx-envelope text-gray-500 text-2xl"></i>
                    <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-transparent border-none focus:outline-none ml-2 w-full"
                    />
                </div>
                {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
            </div>

            <div>
                <label>Số điện thoại</label>
                <div className="flex items-center bg-gray-800 p-2 rounded">
                    <i className="bx bx-phone text-gray-500 text-2xl"></i>
                    <input
                        type="text"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-transparent border-none focus:outline-none ml-2 w-full"
                    />
                </div>
                {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-red-500">{formik.errors.phone}</div>
                ) : null}
            </div>

            <div>
                <label>Mật khẩu</label>
                <div className="flex items-center bg-gray-800 p-2 rounded">
                    <i className="bx bx-lock text-gray-500 text-2xl"></i>
                    <input
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-transparent border-none focus:outline-none ml-2 w-full"
                    />
                </div>
                {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
            </div>

            <button
                type="submit"
                className="text-sm rounded-md bg-fintown-pr9 px-[19px] py-[6px]"
            >
                Cập nhật thông tin
            </button>
        </form> */}
    </div>
    );
}
