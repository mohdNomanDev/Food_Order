import * as Yup from "yup";

export const registerSchema = Yup.object({
  fullName: Yup.string().required("Please enter a valid name"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Invalid Phone Number")
    .required("Phone Number is required"),
  terms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions",
  ),
});

export const loginSchema = Yup.object({
  identifier: Yup.string().required("Phone Number or Email is required"),
});

export const otpSchema = Yup.object({
  otp: Yup.string()
    .length(6, "OTP must be exactly 6 digits")
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("OTP is required"),
});
