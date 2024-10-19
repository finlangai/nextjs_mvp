"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// Validation schema using Yup
const validationSchema = Yup.object({
    displayName: Yup.string()
        .required("Tên hiển thị là bắt buộc")
        .min(3, "Tên hiển thị phải có ít nhất 3 ký tự"),
});

const SetDisplayName = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();
    return (
        <Formik
            initialValues={{ displayName: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                const email = localStorage.getItem("email");
                const password = localStorage.getItem("password");
                const phone = localStorage.getItem("phone");

                try {
                    const response = await axios.post(`${apiUrl}/auth/register`, {
                        email,
                        phone,
                        password,
                        fullname: values.displayName,
                    });

                    setSuccess("Registration successful!");
                    setTimeout(() => {
                         router.push("/"); // Redirect to home or appropriate page
                    }, 1000);
                } catch (err: any) {
                    setError(err.response?.data?.message || "Failed to set display name");
                    setTimeout(() => {
                         router.push("/signup");
                    }, 1000);
                }
            }}
        >
            {({ errors, touched }) => (
                <Form className="w-[452px] py-[28px] px-[26px] ml-auto mr-auto mt-[80px]">
                    <h2 className="font-bold text-fintown-txt-1 text-[24px] mb-[28px]">Tên hiển thị</h2>

                    <div className="mb-[30px]">
                        <label
                            className="font-medium text-fintown-txt-1 text-sm mb-[16px] block"
                            htmlFor="display-name"
                        >
                            Nhập tên
                        </label>
                        <div className={`px-[20px] h-[48px] border rounded-[10px] flex items-center w-full ${errors.displayName && touched.displayName ? "border-red-500" : "border-fintown-br-input"} hover:border-fintown-pr9`}>
                            <Field
                                id="display-name"
                                name="displayName"
                                placeholder="Bạn muốn chúng tôi gọi bạn là gì?"
                                className="text-fintown-txt-1 bg-transparent outline-none text-sm w-full"
                            />
                        </div>
                        <ErrorMessage name="displayName" component="div" className="text-red-500 text-sm mt-1" />
                    </div>


                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    {success && <div className="text-green-500 mb-4">{success}</div>}

                    <button type="submit" className="h-[48px] w-full bg-fintown-pr9 rounded-[10px] mb-[30px]">
                        <span className="text-fintown-txt-1 text-sm">Hoàn tất</span>
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default SetDisplayName;
