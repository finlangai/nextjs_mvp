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
interface FormValues {
    fullname: string;
    email: string;
    phone: string;
    password: string;
  }
  export default function InformationPage() {
      const dispatch: AppDispatch = useDispatch();
      const user = useSelector((state: RootState) => state.auth.user);
      const loading = useSelector((state: RootState) => state.auth.loading);
      const [avatar, setAvatar] = useState<File | null>(null);
  
      // Formik configuration with TypeScript type for initialValues
      const formik = useFormik<FormValues>({
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
  
      // Check if the form values have changed
      const isFormChanged = Object.keys(formik.values).some(
          (key) => formik.values[key as keyof FormValues] !== formik.initialValues[key as keyof FormValues]
      );
  
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
        <div className="w-3/4 pl-10 pt-16 h-[614px]">
            <ToastContainer />
            <div className="w-[626px] h-[524px] relative">
                {/* Header section */}
                <div className="pr-[37px] pt-0.5 pb-[22px] flex justify-start items-center">
                    <div className="text-white text-xl font-bold">Thông tin tài khoản</div>
                </div>

                {/* Avatar section */}
                <div className="w-[626px] h-[105px] flex pt-[19px] items-center justify-between">
                    <div className="flex items-center">
                        <img
                            className="w-20 h-20 rounded-full"
                            src={user?.avatar || "https://via.placeholder.com/80x80"}
                        />
                        <div className="ml-5">
                            <div className="text-white text-sm font-bold mb-3">Ảnh đại diện</div>
                            <div className="w-[227px] text-[#848e9c] text-xs font-normal mt-2">
                                Bạn có thể tải ảnh của mình lên tại đây.
                            </div>
                        </div>
                    </div>

                    {/* Nút tải ảnh */}
                    <div className="flex items-end">
                        <label className="pl-[17px] pr-[18px] py-[9px] bg-[#2b3139] rounded-lg cursor-pointer">
                            <div className="text-white text-xs font-normal">Tải ảnh mới lên</div>
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />
                        </label>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-b border-[#2b3139] w-[626px] mt-5 mb-10"></div>

                {/* User information section */}
                <div className="w-[626px] pb-[26px] mt-6">
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div className="flex gap-6">
                            <div className="grow flex-col gap-[13px]">
                                <div className="text-white text-sm font-bold mb-3">Tên hiển thị</div>
                                <input
                                    type="text"
                                    name="fullname"
                                    value={formik.values.fullname}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="h-[52px] pl-7 rounded-lg border border-[#2b3139] bg-transparent text-white w-full"
                                />
                                {formik.touched.fullname && formik.errors.fullname && (
                                    <div className="text-red-500">{formik.errors.fullname}</div>
                                )}
                            </div>

                            <div className="grow flex-col gap-[13px]">
                                <div className="text-white text-sm font-bold mb-3">Email</div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="h-[52px] pl-7 rounded-lg border border-[#2b3139] bg-transparent text-white w-full"
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="text-red-500">{formik.errors.email}</div>
                                )}
                            </div>
                        </div>

                        <div className="border-b border-[#2b3139] w-[626px]" style={{marginTop: "35px", marginBottom: "35px"}}></div>

                        <div className="flex gap-6 w-[626px] justify-end">
                            <div className="flex-col gap-[13px] w-full max-w-[calc(50%-6px)]">
                                <div className="text-white text-sm font-bold mb-3">Số điện thoại</div>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="h-[52px] pl-7 rounded-lg border border-[#2b3139] bg-transparent text-white w-full"
                                />
                                {formik.touched.phone && formik.errors.phone && (
                                    <div className="text-red-500">{formik.errors.phone}</div>
                                )}
                            </div>

                            <div className="flex-col gap-[13px] w-full max-w-[calc(50%-6px)]">
                                <div className="text-white text-sm font-bold mb-3">Mật khẩu</div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="h-[52px] pl-7 rounded-lg border border-[#2b3139] bg-transparent text-white w-full"
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <div className="text-red-500">{formik.errors.password}</div>
                                )}
                            </div>
                        </div>
                        <div className="border-b border-[#2b3139] w-[626px]" style={{marginTop: "35px", marginBottom: "35px"}}></div>
                        <div className="pl-12 pr-[47px]  pb-3.5 flex justify-center items-center">
                            <button
                                type="submit"
                                disabled={!isFormChanged}
                                className="text-white text-xs font-normal bg-[#0ecb81] rounded-lg pl-12 pr-[47px] pt-[13px] pb-3.5"
                            >
                                Lưu thông tin
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
