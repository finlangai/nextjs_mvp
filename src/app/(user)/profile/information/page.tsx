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
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const loading = useSelector((state: RootState) => state.auth.loading);
    const [avatar, setAvatar] = useState<File | null>(null);

    // Formik configuration
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullname: user?.fullname || "",
            email: user?.email || "",
            phone: user?.phone || "",
            password: "Kim!2911Phuong",
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required("Tên hiển thị là bắt buộc"),
            email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
            phone: Yup.string().required("Số điện thoại là bắt buộc"),
            password: Yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
        }),
        onSubmit: async (values) => {
            try {
                const resultAction = await dispatch(updateUserInformation(values)).unwrap();
                if (resultAction) {
                    toast.success("Cập nhật thông tin thành công!");
                    dispatch(fetchUserProfile());
                }
            } catch (error) {
                toast.error("Cập nhật thông tin không thành công, vui lòng thử lại.");
            }
        },
    });

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAvatar(e.target.files[0]);
        }
    };

    useEffect(() => {
        if (avatar) {
            dispatch(updateUserAvatar(avatar)).then(() => {
                toast.success("Cập nhật avatar thành công!");
                dispatch(fetchUserProfile());
            }).catch(() => {
                toast.error("Cập nhật avatar không thành công, vui lòng thử lại.");
            });
        }
    }, [avatar, dispatch]);

    return (
        <div className="w-3/4 p-8">
            {/* Toast container to display notifications */}
            <ToastContainer />

            <div className="flex justify-between items-center mb-8">
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
                        <h1 className="text-2xl font-bold text-fintown-txt-1">{user?.email || "Tên người dùng"}</h1>
                        <div className="flex items-center space-x-2">
                            <span className="text-fintown-txt-1 text-sm rounded-md bg-fintown-pr9 px-[19px] py-[6px]">BASIC</span>
                            <span className="text-red-500">• Chưa tích hợp</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-fintown-txt-1">0</span>
                    <i className="bx bx-coin text-yellow-500 text-2xl"></i>
                    <span className="text-fintown-txt-1">Credit của bạn</span>
                    <Link href="#" className="text-blue-500">
                        Xem chi tiết
                    </Link>
                </div>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2 text-fintown-txt-1">Tên hiển thị</label>
                    <div className="flex items-center bg-gray-800 p-2 rounded">
                        <i className="bx bx-user text-gray-500 text-2xl"></i>
                        <input
                            type="text"
                            name="fullname"
                            value={formik.values.fullname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="bg-transparent border-none focus:outline-none ml-2 w-full text-fintown-txt-1"
                        />
                    </div>
                    {formik.touched.fullname && formik.errors.fullname ? (
                        <div className="text-red-500">{formik.errors.fullname}</div>
                    ) : null}
                </div>

                <div>
                    <label className="block mb-2 text-fintown-txt-1">Email</label>
                    <div className="flex items-center bg-gray-800 p-2 rounded">
                        <i className="bx bx-envelope text-gray-500 text-2xl"></i>
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="bg-transparent border-none focus:outline-none ml-2 w-full text-fintown-txt-1"
                        />
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500">{formik.errors.email}</div>
                    ) : null}
                </div>

                <div>
                    <label className="block mb-2 text-fintown-txt-1">Số điện thoại</label>
                    <div className="flex items-center bg-gray-800 p-2 rounded">
                        <i className="bx bx-phone text-gray-500 text-2xl"></i>
                        <input
                            type="text"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="bg-transparent border-none focus:outline-none ml-2 w-full text-fintown-txt-1"
                        />
                    </div>
                    {formik.touched.phone && formik.errors.phone ? (
                        <div className="text-red-500">{formik.errors.phone}</div>
                    ) : null}
                </div>

                <div>
                    <label className="block mb-2 text-fintown-txt-1">Mật khẩu</label>
                    <div className="flex items-center bg-gray-800 p-2 rounded">
                        <i className="bx bx-lock text-gray-500 text-2xl"></i>
                        <input
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="bg-transparent border-none focus:outline-none ml-2 w-full text-fintown-txt-1"
                        />
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500">{formik.errors.password}</div>
                    ) : null}
                </div>

                <button
                    type="submit"
                    className="text-fintown-txt-1 text-sm rounded-md bg-fintown-pr9 px-[19px] py-[6px]"
                >
                    Cập nhật thông tin
                </button>

       
            </form>
        </div>
    );
}
