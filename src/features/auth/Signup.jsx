import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BadgeCheck } from "lucide-react";
import "./Signup.css";
import { useAuth } from "../../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth(); // ✅ use custom hook

  const [form, setForm] = useState({
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  country: "",
  role: ""   // ✅ ADD THIS
});

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
  e.preventDefault();
  setError("");

  if (
    !form.email ||
    !form.password ||
    !form.firstName ||
    !form.lastName ||
    !form.country ||
    !form.role
  ) {
    setError("Please fill all required fields.");
    return;
  }

  const result = signup(
    `${form.firstName} ${form.lastName}`,
    form.email,
    form.password,
    form.role
  );

  if (!result.success) {
    setError(result.message);
    return;
  }

  alert("Account created successfully!");
  navigate("/login");
};

  return (
    <div className="signup-wrapper">
      {/* LEFT SIDE */}
      <div className="signup-left">
        <div className="brand-content">
          <h1>Certification Tracker</h1>
          <p>
            Manage, track and renew your certifications
            in one professional dashboard.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="signup-right">
        <div className="signup-card">

          {/* LOGO BLOCK */}
          <div className="signup-brand">
            <div className="brand-circle">
              <BadgeCheck size={30} />
            </div>

            <h2 className="brand-name">CertifyMe</h2>
            <p className="brand-tagline">Track. Manage. Renew.</p>
          </div>

          <h2 className="signup-title">Create an Account</h2>

          {error && <div className="signup-error">{error}</div>}

          <form className="signup-form" onSubmit={handleSubmit}>
            <label>Email *</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label>Password *</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <label>First Name *</label>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
              required
            />

            <label>Last Name *</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
              required
            />

            <label>Country *</label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              required
            >
              <option value="">Select country</option>
              <option>India</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Germany</option>
            </select>

            <label>Role *</label>
<select
  name="role"
  value={form.role}
  onChange={handleChange}
  required
>
  <option value="">Select role</option>
  <option value="student">Student</option>
  <option value="admin">Admin</option>
</select>

            <button type="submit">Register</button>
          </form>

          <div className="signup-footer">
            Already have an account? <Link to="/login">Log in</Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Signup;