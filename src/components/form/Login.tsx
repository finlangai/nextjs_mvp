

import { useState } from "react";
import { useRouter } from "next/navigation";  // Dành cho App Router
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks/useAppStore";
import { login } from "@/src/redux/auth/authSlice";

// Schema xác thực
const validationSchema = Yup.object({
  email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(/[0-9]/, "Mật khẩu phải chứa ít nhất một chữ số")
    .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ cái viết hoa"),
});

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (values: { email: string; password: string }) => {
    const result = await dispatch(login(values));
    if (login.fulfilled.match(result)) {
      router.push("/dashboard");
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="w-[452px] py-[28px] px-[26px] bg-fintown-bg-stn rounded-[20px]">
          <div className="font-bold text-fintown-txt-1 text-[24px] mb-[28px]">
            Đăng nhập với tài khoản
          </div>

          {/* Email Field */}
          <div className="mb-[30px]">
            <div className="font-medium text-fintown-txt-1 text-sm mb-[16px]">Email</div>
            <div className="px-[20px] h-[48px] border border-fintown-br-input rounded-[10px] flex items-center hover:border-fintown-pr9">
              <Field
                name="email"
                type="text"
                placeholder="username@gmail.com"
                className="text-fintown-txt-1 bg-transparent outline-none text-sm w-full"
              />
            </div>
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Password Field */}
          <div className="mb-[30px]">
            <div className="font-medium text-fintown-txt-1 text-sm mb-[16px]">Mật khẩu</div>
            <div className="px-[20px] h-[48px] border border-fintown-br-input rounded-[10px] flex items-center hover:border-fintown-pr9">
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="text-fintown-txt-1 bg-transparent outline-none text-sm w-full"
              />
            </div>
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Error Message */}
          {error && <div className="text-red-500 text-sm mb-[10px]">{error}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="h-[48px] w-full bg-fintown-pr9 rounded-[10px] mb-[30px]"
            disabled={loading || isSubmitting}
          >
            <span className="text-fintown-txt-1 text-sm">Đăng nhập</span>
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
