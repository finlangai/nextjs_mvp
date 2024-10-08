"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";

// Validation schema using Yup
const validationSchema = Yup.object({
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(/[0-9]/, "Password must contain at least one digit")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter"),
    confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref('password'), ""], "Passwords must match"),
});

const SetPassword = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    return (
        <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                // Save password in localStorage
                localStorage.setItem("password", values.password);
                setSuccess("Password saved! Proceeding to set your display name...");
                setTimeout(() => {
                    window.location.href = "/signup/set-display-name"; // Redirect to display name page
                }, 2000);
            }}
        >
            {({ errors, touched, values }) => (
                <Form className="w-[452px] py-[28px] px-[26px] ml-auto mr-auto mt-[80px]">
                    <h2 className="font-bold text-fintown-txt-1 text-[24px] mb-[28px]">Tạo mật khẩu</h2>

                    <div className="mb-[30px]">
                        <div className="font-medium text-fintown-txt-1 text-sm mb-[16px]">Mật khẩu</div>
                        <Field
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            className={`px-[20px] h-[48px] border rounded-[10px] w-full text-fintown-txt-1 bg-transparent outline-none text-sm ${errors.password && touched.password ? "border-red-500" : "border-fintown-br-input"}`}
                        />
                        <ErrorMessage name="password" component="div" className="text-red-500" />

                    </div>

                    <div className="mb-[30px]">
                        <div className="font-medium text-fintown-txt-1 text-sm mb-[16px]">Xác nhận mật khẩu</div>
                        {/* <label className="font-medium text-fintown-txt-1 text-sm mb-[26px]" htmlFor="confirmPassword">Xác nhận mật khẩu</label> */}
                        <Field
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            className={`px-[20px] h-[48px] border rounded-[10px] w-full text-fintown-txt-1 bg-transparent outline-none text-sm ${errors.confirmPassword && touched.confirmPassword ? "border-red-500" : "border-fintown-br-input"}`}
                        />
                        <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                    </div>
                    <div className="mb-[30px] flex flex-col gap-y-[15px]">
                        <div className="flex items-center">
                            <i className={`bx bx-check mr-[8px] text-[20px] ${errors.password && touched.password ? "text-red-500" : "text-fintown-txt-2"}`}></i>
                            <div className={`text-sm ${errors.password && touched.password ? "text-red-500" : "text-fintown-txt-2"}`}>8 - 100 ký tự</div>
                        </div>
                        <div className="flex items-center">
                            <i className={`bx bx-check mr-[8px] text-[20px] ${errors.password && touched.password && !/.*[0-9].*/.test(values.password) ? "text-red-500" : "text-fintown-txt-2"}`}></i>
                            <div className={`text-sm ${errors.password && touched.password && !/.*[0-9].*/.test(values.password) ? "text-red-500" : "text-fintown-txt-2"}`}>Tối thiểu 1 chữ số</div>
                        </div>
                        <div className="flex items-center">
                            <i className={`bx bx-check mr-[8px] text-[20px] ${errors.password && touched.password && !/.*[A-Z].*/.test(values.password) ? "text-red-500" : "text-fintown-txt-2"}`}></i>
                            <div className={`text-sm ${errors.password && touched.password && !/.*[A-Z].*/.test(values.password) ? "text-red-500" : "text-fintown-txt-2"}`}>Tối thiểu 1 chữ cái viết hoa</div>
                        </div>
                    </div>


                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    {success && <div className="text-green-500 mb-4">{success}</div>}

                    <button type="submit" className="h-[48px] w-full bg-fintown-pr9 rounded-[10px] mb-[30px]">
                        <span className="text-fintown-txt-1 text-sm">Bước tiếp theo</span>
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default SetPassword;
