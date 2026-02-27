import "./Login.css";
import { BadgeCheck, Eye, EyeOff, User, Shield } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const result = login(email, password);

    if (!result.success) {
      alert(result.message);
      return;
    }

    if (result.user.role !== role) {
      alert(
        `This account is registered as ${result.user.role}. Please select correct login type.`
      );
      return;
    }

    if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/student/dashboard");
    }
  };

  return (
    <div className="login-wrapper">

      {/* LEFT PANEL */}
      <div className="login-left">
          <div className="back-home" onClick={() => navigate("/")}>
            ← Back to Website
          </div>

          <img 
            src="/signup-illustration.png"   // 👈 use same signup image or your image
            className="login-illus"
            alt="illustration"
          />

          <div className="login-overlay-center">
            <h1>Certification Tracker</h1>
            <p>
              Securely access your certification dashboard and
              manage renewals professionally.
            </p>
          </div>

        </div>

      {/* RIGHT PANEL */}
      <div className="login-right">
        <div className="login-card">

          <div className="login-brand">

          <div className="brand-circle">
            <BadgeCheck size={30} />
          </div>

          <div className="brand-text">
            <h2 className="brand-name">CertifyMe</h2>
            <p className="brand-tagline">Track. Manage. Renew.</p>
          </div>

        </div>

          {/* ROLE TOGGLE */}
          <div className="role-toggle">
            <button
              type="button"
              className={role === "student" ? "active" : ""}
              onClick={() => setRole("student")}
            >
              <User size={16} />
              Student
            </button>

            <button
              type="button"
              className={role === "admin" ? "active" : ""}
              onClick={() => setRole("admin")}
            >
              <Shield size={16} />
              Admin
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="login-form">

            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {/* REMEMBER + FORGOT */}
            <div className="login-options">

  <label className="remember">
    <input type="checkbox" />
    Remember me
  </label>

  <span className="forgot">Forgot Password?</span>

</div>

            {role === "admin" && (
              <>
                <label>Verification Code</label>
                <input
                  type="text"
                  placeholder="Enter verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </>
            )}

            <button type="submit">Log in</button>

          </form>

          <div className="login-footer">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;