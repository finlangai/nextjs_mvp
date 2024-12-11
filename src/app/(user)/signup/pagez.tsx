// "use client";
// import { useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import Link from "next/link";

// // Validation schema using Yup
// const validationSchema = Yup.object({
//     email: Yup.string()
//         .required("Email is required")
//         .email("Invalid email format"),
//     phone: Yup.string()
//         .required("Phone number is required")
//         .matches(/^\d{10,11}$/, "Phone number must be 10 to 11 digits"),
// });

// const SignUpPage = () => {
//     const [success, setSuccess] = useState("");

//     return (
//         <Formik
//             initialValues={{ email: "", phone: "" }}
//             validationSchema={validationSchema}
//             onSubmit={(values) => {
//                 // Save email and phone in localStorage
//                 localStorage.setItem("email", values.email);
//                 localStorage.setItem("phone", values.phone);
//                 setSuccess("Data saved! Proceeding to the next step...");
//                 setTimeout(() => {
//                     window.location.href = "/signup/set-password"; // Redirect to password page
//                 }, 2000);
//             }}
//         >
//             {({ errors, touched }) => (
//                 <Form className="w-[452px] py-[28px] px-[26px] ml-auto mr-auto mt-[80px]">
//                     <div className="font-bold text-fintown-txt-1 text-[24px] mb-[28px]">
//                         Tạo tài khoản
//                     </div>
//                     <div className="mb-[30px]">
//                         <label
//                             className="font-medium text-fintown-txt-1 text-sm mb-[16px] block" // Sử dụng block để label nằm trên một dòng riêng
//                             htmlFor="email"
//                         >
//                             Email
//                         </label>
//                         <div className={`px-[20px] h-[48px] border rounded-[10px] flex items-center w-full ${errors.email && touched.email ? "border-red-500" : "border-fintown-br-input"} hover:border-fintown-pr9`}>
//                             <Field
//                                 id="email"
//                                 name="email"
//                                 placeholder="username@gmail.com"
//                                 className="text-fintown-txt-1 bg-transparent outline-none text-sm w-full"
//                             />
//                         </div>
//                         <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
//                     </div>


//                     <div className="mb-[30px]">
//                         <label
//                             className="font-medium text-fintown-txt-1 text-sm mb-[16px] block"
//                             htmlFor="phone"
//                         >
//                             Số điện thoại
//                         </label>
//                         <div className={`px-[20px] h-[48px] border rounded-[10px] flex items-center w-full ${errors.phone && touched.phone ? "border-red-500" : "border-fintown-br-input"} hover:border-fintown-pr9`}>
//                             <Field
//                                 id="phone"
//                                 name="phone"
//                                 placeholder="Nhập số điện thoại"
//                                 className="text-fintown-txt-1 bg-transparent outline-none text-sm w-full"
//                             />
//                         </div>
//                         <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
//                     </div>


//                     {success && <div className="text-green-500 mb-4">{success}</div>}

//                     <button type="submit" className="h-[48px] w-full bg-fintown-pr9 rounded-[10px] mb-[30px]">
//                         <span className="text-fintown-txt-1 text-sm">Bước tiếp theo</span>
//                     </button>

//                     <Link href="/">
//                         <button className="h-[48px] w-full border border-fintown-br-btn rounded-[10px]">
//                             <span className="text-fintown-txt-1 text-sm">Đăng nhập</span>
//                         </button>
//                     </Link>
//                 </Form>
//             )}
//         </Formik>
//     );
// };

// export default SignUpPage;



"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "@/src/redux/auth/authSlice";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  email: Yup.string().required("Email bắt buộc").email("Email không hợp lệ"),
  phone: Yup.string().required("Phone number bắt buộc").matches(/^\d{10,11}$/, "Số điện thoại phải có từ 10 đến 11 chữ số"),
});

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { loading, error: authError, emailVerified } = useSelector((state: any) => state.auth);
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  interface FormValues {
    email: string;
    phone: string;
  }

  const handleSubmit = async (values: FormValues) => {
    const result = await dispatch(verifyEmail(values.email) as any);
    console.log(result);
    console.log(verifyEmail.fulfilled.match(result));
    // if (verifyEmail.fulfilled.match(result)) {
        localStorage.setItem("email", values.email);
        localStorage.setItem("phone", values.phone);
        setSuccess("Email hợp lệ! Đang chuyển đến bước tiếp theo...");
        setTimeout(() => {
          router.push("/signup/set-password");
        }, 1000);
    // } else {
    //     setErrorMessage("Email không hợp lệ hoặc đã được sử dụng!");
    // }
};


  return (
    <Formik
      initialValues={{ email: "", phone: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="w-[452px] py-[28px] px-[26px] ml-auto mr-auto mt-[80px]">
          <div className="font-bold text-fintown-txt-1 text-[24px] mb-[28px]">Tạo tài khoản</div>

          {/* Email Field */}
          <div className="mb-[30px]">
            <label className="font-medium text-fintown-txt-1 text-sm mb-[16px] block" htmlFor="email">
              Email
            </label>
            <div className={`px-[20px] h-[48px] border rounded-[10px] flex items-center w-full ${errors.email && touched.email ? "border-red-500" : "border-fintown-br-input"} hover:border-fintown-pr9`}>
              <Field id="email" name="email" placeholder="username@gmail.com" className="text-fintown-txt-1 bg-transparent outline-none text-sm w-full" />
            </div>
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Phone Field */}
          <div className="mb-[30px]">
            <label className="font-medium text-fintown-txt-1 text-sm mb-[16px] block" htmlFor="phone">Số điện thoại</label>
            <div className={`px-[20px] h-[48px] border rounded-[10px] flex items-center w-full ${errors.phone && touched.phone ? "border-red-500" : "border-fintown-br-input"} hover:border-fintown-pr9`}>
              <Field id="phone" name="phone" placeholder="Nhập số điện thoại" className="text-fintown-txt-1 bg-transparent outline-none text-sm w-full" />
            </div>
            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}

          <button type="submit" className="h-[48px] w-full bg-fintown-pr9 rounded-[10px] mb-[30px]" disabled={loading}>
            <span className="text-fintown-txt-1 text-sm">{loading ? "Đang xác thực..." : "Bước tiếp theo"}</span>
          </button>

          <Link href="/">
            <button className="h-[48px] w-full border border-fintown-br-btn rounded-[10px]" >
              <span className="text-fintown-txt-1 text-sm">Đăng nhập</span>
            </button>
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpPage;
