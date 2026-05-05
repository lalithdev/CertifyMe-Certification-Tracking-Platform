import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ShieldCheck, Loader2, BadgeCheck, CheckCircle2, LayoutDashboard, KeyRound } from "lucide-react";
import { authApi } from "../../../api/authApi";
import { useAuth } from "../../../context";
import { toast } from "sonner";
import "../Login.css";

function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedSession, setVerifiedSession] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { setSession } = useAuth();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      toast.error("Invalid session. Please start again.");
      navigate("/login/forgotpassword");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authApi.verifyOtp(email, otp);
      toast.success("Identity verified! ✅");
      
      // Store session data but don't redirect yet
      setVerifiedSession(response);
      setIsVerified(true);
      
      // Log the user in immediately
      setSession(response.token, response.user);
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleGoToDashboard = () => {
    const role = verifiedSession?.user?.role?.toLowerCase();
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/student/dashboard");
    }
  };

  const handleResetPassword = () => {
    navigate("/login/reset-password", { state: { email, otp } });
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
          {isVerified ? (
            <>
              <h1>Verification Success!</h1>
              <p>
                Your identity has been confirmed. You can now choose to 
                update your password for better security or proceed 
                directly to your dashboard to manage your certifications.
              </p>
            </>
          ) : (
            <>
              <h1>Secure Verification.</h1>
              <p>
                We've sent a 6-digit verification code to your email. 
                Please enter it here to confirm your identity and proceed 
                with the password reset.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="login-right">
        <div className="login-auth-card">
          {!isVerified ? (
            <>
              <h2 className="login-main-title">Verify OTP</h2>
              <p className="login-main-subtitle">Code sent to <b>{email}</b></p>

              <form onSubmit={handleSubmit} className="login-form">
                <label>Verification Code</label>
                <div className="input-field-wrapper">
                  <ShieldCheck size={18} className="field-icon-left" />
                  <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="primary-login-btn" disabled={loading}>
                  {loading ? <Loader2 className="spinner" size={20} /> : "Verify Code"}
                </button>
                
                <div className="login-footer">
                  Didn't receive a code? <Link to="/login/forgotpassword">Try again</Link>
                  <br />
                  Remembered your password? <Link to="/login">Login here</Link>
                </div>
              </form>
            </>
          ) : (
            <div className="choice-stage animate-fade-in">
              <div className="success-icon-wrapper">
                <CheckCircle2 size={64} color="#10b981" />
              </div>
              <h2 className="login-main-title">What would you like to do?</h2>
              <p className="login-main-subtitle">Choose your next step</p>
              
              <div className="choice-buttons-stack">
                <button 
                  onClick={handleResetPassword} 
                  className="primary-login-btn choice-btn"
                >
                  <KeyRound size={20} />
                  Set New Password
                </button>
                
                <button 
                  onClick={handleGoToDashboard} 
                  className="secondary-login-btn choice-btn-outline"
                >
                  <LayoutDashboard size={20} />
                  Proceed to Dashboard
                </button>
              </div>

              <div className="login-footer" style={{ marginTop: '20px' }}>
                You can always change your password later from your profile settings.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
