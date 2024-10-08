"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";

// Validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),
    phone: Yup.string()
        .required("Phone number is required")
        .matches(/^\d{10,11}$/, "Phone number must be 10 to 11 digits"),
});

const SignUpPage = () => {
    const [success, setSuccess] = useState("");

    return (
        <Formik
            initialValues={{ email: "", phone: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                // Save email and phone in localStorage
                localStorage.setItem("email", values.email);
                localStorage.setItem("phone", values.phone);
                setSuccess("Data saved! Proceeding to the next step...");
                setTimeout(() => {
                    window.location.href = "/signup/set-password"; // Redirect to password page
                }, 2000);
            }}
        >
            {({ errors, touched }) => (
                <Form className="w-[452px] py-[28px] px-[26px] ml-auto mr-auto mt-[80px]">
                    <h2 className="font-bold text-fintown-txt-1 text-[24px] mb-[28px]">Tạo tài khoản</h2>

                    <div className="mb-[30px]">
                        <label className="font-medium text-fintown-txt-1 text-sm mb-[16px]" htmlFor="email">Email</label>
                        <Field
                            id="email"
                            name="email"
                            placeholder="username@gmail.com"
                            className={`px-[20px] h-[48px] border rounded-[10px] w-full text-fintown-txt-1 bg-transparent outline-none text-sm ${errors.email && touched.email ? "border-red-500" : "border-fintown-br-input"}`}
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500" />
                    </div>

                    <div className="mb-[30px]">
                        <label className="font-medium text-fintown-txt-1 text-sm mb-[16px]" htmlFor="phone">Số điện thoại</label>
                        <Field
                            id="phone"
                            name="phone"
                            placeholder="Nhập số điện thoại"
                            className={`px-[20px] h-[48px] border rounded-[10px] w-full text-fintown-txt-1 bg-transparent outline-none text-sm ${errors.phone && touched.phone ? "border-red-500" : "border-fintown-br-input"}`}
                        />
                        <ErrorMessage name="phone" component="div" className="text-red-500" />
                    </div>

                    {success && <div className="text-green-500 mb-4">{success}</div>}

                    <button type="submit" className="h-[48px] w-full bg-fintown-pr9 rounded-[10px] mb-[30px]">
                        <span className="text-fintown-txt-1 text-sm">Bước tiếp theo</span>
                    </button>

                    <Link href="/">
                        <button className="h-[48px] w-full border border-fintown-br-btn rounded-[10px]">
                            <span className="text-fintown-txt-1 text-sm">Đăng nhập</span>
                        </button>
                    </Link>
                </Form>
            )}
        </Formik>
    );
};

export default SignUpPage;
