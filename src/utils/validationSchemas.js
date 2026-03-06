import * as Yup from "yup";

/**
 * Validation schema for the Registration form.
 * Ensures the name is present, phone number has at least 10 digits, and terms are accepted.
 */
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

/**
 * Dynamic validation schema for the Login form.
 * Adjusts validation rules based on the login mode ('phone' or 'email').
 */
export const loginSchema = (mode) =>
  Yup.object({
    identifier:
      mode === "phone"
        ? Yup.string()
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(10, "Invalid Phone Number")
            .required("Phone Number is required")
        : Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
  });

/**
 * Validation schema for the OTP form.
 * Requires exactly 6 digits.
 */
export const otpSchema = Yup.object({
  otp: Yup.string()
    .length(6, "OTP must be exactly 6 digits")
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("OTP is required"),
});
