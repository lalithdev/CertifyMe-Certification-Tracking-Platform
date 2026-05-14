import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, ArrowLeft, Loader2, BadgeCheck } from "lucide-react";
import { authApi } from "../../../api/authApi";
import { toast } from "sonner";
import "../Login.css"; // Reuse Login styles

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const trimmedEmail = email.trim();
      await authApi.forgotPassword(trimmedEmail);
      toast.success("OTP sent to your email ✅");
      navigate("/login/verify-otp", { state: { email: trimmedEmail } });
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;
      
      if (status === 503) {
        toast.error("Email service is temporarily unavailable. Please try again in a moment.");
      } else if (status === 404) {
        toast.error(message || "No account found with this email address.");
      } else {
        toast.error(message || "Failed to send OTP. Please try again.");
      }
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
          <h1>Recover Your Account.</h1>
          <p>
            Don't worry, it happens to the best of us. Enter your registered 
            email address and we'll send you a verification code to reset 
            your password.
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-auth-card">
          <h2 className="login-main-title">Forgot Password?</h2>
          <p className="login-main-subtitle">Enter your email to receive an OTP</p>

          <form onSubmit={handleSubmit} className="login-form">
            <label>Email Address</label>
            <div className="input-field-wrapper">
              <Mail size={18} className="field-icon-left" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="primary-login-btn" disabled={loading}>
              {loading ? <Loader2 className="spinner" size={20} /> : "Send OTP"}
            </button>
            
            <div className="login-footer">
              Remembered your password? <Link to="/login">Login here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
