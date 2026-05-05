import { axiosInstance } from "./axiosInstance";

export const authApi = {

  // ✅ SIGNUP → BACKEND
  signup: async (data) => {
    const res = await axiosInstance.post("/auth/register", data);
    return res.data;
  },

  // ✅ LOGIN → BACKEND
  login: async (data) => {
    const res = await axiosInstance.post("/auth/login", data);
    return res.data;
  },

  // ✅ RESEND OTP → BACKEND
  resendOtp: async (email) => {
    const res = await axiosInstance.post("/auth/resend-otp", { email });
    return res.data;
  },

  // ✅ FORGOT PASSWORD
  forgotPassword: async (email) => {
    const res = await axiosInstance.post("/auth/forgot-password", { email });
    return res.data;
  },

  // ✅ VERIFY OTP
  verifyOtp: async (email, otp) => {
    const res = await axiosInstance.post("/auth/verify-otp", { email, otp });
    return res.data;
  },

  // ✅ RESET PASSWORD
  resetPassword: async (email, otp, newPassword) => {
    const res = await axiosInstance.post("/auth/reset-password", { email, otp, newPassword });
    return res.data;
  },

  // ✅ CHANGE PASSWORD (Authenticated)
  changePassword: async (currentPassword, newPassword) => {
    const res = await axiosInstance.post("/auth/change-password", { currentPassword, newPassword });
    return res.data;
  },
};