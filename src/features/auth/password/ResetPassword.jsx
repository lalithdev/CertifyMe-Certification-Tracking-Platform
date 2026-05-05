import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Lock, Loader2, Eye, EyeOff, BadgeCheck } from "lucide-react";
import { authApi } from "../../../api/authApi";
import { toast } from "sonner";
import "../Login.css"; // Reuse Login styles

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const otp = location.state?.otp;

  useEffect(() => {
    if (!email || !otp) {
      toast.error("Invalid session. Please start again.");
      navigate("/login/forgotpassword");
    }
  }, [email, otp, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }
    setLoading(true);
    try {
      await authApi.resetPassword(email, otp, newPassword);
      toast.success("Password reset successfully ✅");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-top-bar">
        <div className="login-brand-flat">
          <BadgeCheck size={24} color="white" />
          <div className="brand-text-stack">
            <span className="brand-name-top">CertifyMe</span>
            <span className="brand-tag-top">Track. Manage. Renew.</span>
          </div>
        </div>
        <div className="back-home-link" onClick={() => navigate("/")}>
          ← Back to Home
        </div>
      </div>

      <div className="login-left">
        <div className="login-hero-content">
          <h1>Security First.</h1>
          <p>
            You're almost there! Create a new, strong password for your 
            account. Make sure it's something you haven't used before 
            to keep your certifications safe.
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-auth-card">
          <h2 className="login-main-title">Set New Password</h2>
          <p className="login-main-subtitle">Choose a secure password for your account</p>

          <form onSubmit={handleSubmit} className="login-form">
            <label>New Password</label>
            <div className="input-field-wrapper">
              <Lock size={18} className="field-icon-left" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <div className="eye-btn-right" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            <label>Confirm Password</label>
            <div className="input-field-wrapper">
              <Lock size={18} className="field-icon-left" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="primary-login-btn" disabled={loading}>
              {loading ? <Loader2 className="spinner" size={20} /> : "Update Password"}
            </button>
            
            <div className="login-footer">
              Already have an account? <Link to="/login">Login here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
