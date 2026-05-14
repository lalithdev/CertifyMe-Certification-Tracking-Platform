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

  // ✅ RESEND OTP → BACKEND (Admin login flow)
  resendOtp: async (email) => {
    const res = await axiosInstance.post("/auth/resend-otp", { email });
    return res.data;
  },

  // ✅ FORGOT PASSWORD → Sends OTP to email (Student + Admin)
  forgotPassword: async (email) => {
    const res = await axiosInstance.post("/auth/forgot-password", { email });
    return res.data;
  },

  // ✅ VERIFY OTP → Validates the reset OTP (Student + Admin)
  verifyOtp: async (email, otp) => {
    const res = await axiosInstance.post("/auth/verify-otp", { email, otp });
    return res.data;
  },

  // ✅ VERIFY RESET OTP → Alias endpoint for password reset flow
  verifyResetOtp: async (email, otp) => {
    const res = await axiosInstance.post("/auth/verify-reset-otp", { email, otp });
    return res.data;
  },

  // ✅ RESET PASSWORD → Sets new password after OTP verification
  resetPassword: async (email, otp, newPassword) => {
    const res = await axiosInstance.post("/auth/reset-password", { email, otp, newPassword });
    return res.data;
  },

  // ✅ CHANGE PASSWORD → Authenticated password change
  changePassword: async (currentPassword, newPassword) => {
    const res = await axiosInstance.post("/auth/change-password", { currentPassword, newPassword });
    return res.data;
  },
};