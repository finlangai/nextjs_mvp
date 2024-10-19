"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Validation schema using Yup
const validationSchema = Yup.object({
    password: Yup.string()
        .required("Password là bắt buộc")
        .min(8, "Password phải có ít nhất 8 ký tự")
        .matches(/[0-9]/, "Password phải chứa ít nhất một chữ số")
        .matches(/[A-Z]/, " Password phải chứa ít nhất một chữ cái viết hoa"),
    confirmPassword: Yup.string()
        .required("Xác nhận mật khẩu là bắt buộc")
        .oneOf([Yup.ref('password'), ""], "Xác nhận mật khẩu không khớp với mật khẩu"),
});

// Function to generate a random password suggestion
const generatePasswordSuggestion = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < 10; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
};

const SetPassword = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [suggestedPassword, setSuggestedPassword] = useState("");
    const router = useRouter();
    return (
        <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                // Save password in localStorage
                localStorage.setItem("password", values.password);
                setSuccess("Password saved! Proceeding to set your display name...");
                setTimeout(() => {
                    router.push("/signup/set-display-name"); // Redirect to display name page
                }, 2000);
            }}
        >
            {({ errors, touched, values, setFieldValue }) => (
                <Form className="w-[452px] py-[28px] px-[26px] ml-auto mr-auto mt-[80px]">
                    <h2 className="font-bold text-fintown-txt-1 text-[24px] mb-[28px]">Tạo mật khẩu</h2>

                    {/* Trường Mật khẩu */}
                    <div className="mb-[30px]">
                        <div className="font-medium text-fintown-txt-1 text-sm mb-[16px]">Mật khẩu</div>
                        <div className={`px-[20px] h-[48px] border rounded-[10px] flex items-center w-full ${errors.password && touched.password ? "border-red-500" : "border-fintown-br-input"} hover:border-fintown-pr9`}>
                            <Field
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Nhập mật khẩu"
                                className="text-fintown-txt-1 bg-transparent outline-none text-sm w-full"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="ml-2 text-sm text-blue-500"
                            >
                                {showPassword ? "Ẩn" : "Hiện"}
                            </button>
                        </div>
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    {/* Trường Xác nhận mật khẩu */}
                    <div className="mb-[30px]">
                        <div className="font-medium text-fintown-txt-1 text-sm mb-[16px]">Xác nhận mật khẩu</div>
                        <div className={`px-[20px] h-[48px] border rounded-[10px] flex items-center w-full ${errors.confirmPassword && touched.confirmPassword ? "border-red-500" : "border-fintown-br-input"} hover:border-fintown-pr9`}>
                            <Field
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showPassword ? "text" : "password"} // Sync with the show/hide logic
                                placeholder="Nhập lại mật khẩu"
                                className="text-fintown-txt-1 bg-transparent outline-none text-sm w-full"
                            />
                        </div>
                        <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    {/* Password Suggestion */}
                    <div className="mb-[20px]">
                        <button
                            type="button"
                            onClick={() => {
                                const suggestion = generatePasswordSuggestion();
                                setSuggestedPassword(suggestion);
                                setFieldValue("password", suggestion);
                            }}
                            className="text-sm text-blue-500"
                        >
                            Gợi ý mật khẩu
                        </button>
                        {suggestedPassword && (
                            <div className="text-sm mt-1 text-green-500">
                                Mật khẩu gợi ý: {suggestedPassword}
                            </div>
                        )}
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
