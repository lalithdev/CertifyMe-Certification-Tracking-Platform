import { useAuth } from "../../context/AuthContext";
import { User, Mail, Calendar, MapPin, Hash, UserCircle, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { authApi } from "../../api/authApi";
import { toast } from "sonner";
import "./Profile.css";

function Profile() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await authApi.changePassword(currentPassword, newPassword);
      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Header Hero */}
        <div className="profile-hero">
          <div className="profile-avatar">
            {user.firstName ? user.firstName[0] : user.name ? user.name[0] : "U"}
          </div>
          <div className="hero-info">
            <h1>{user.firstName} {user.lastName}</h1>
            <p className="role-tag">{user.role}</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="profile-content">
          
          <div className="info-section">
            <h3>Personal Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="icon-box"><User size={18} /></div>
                <div>
                  <label>Full Name</label>
                  <p>{user.firstName} {user.middleName ? user.middleName + ' ' : ''}{user.lastName}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-box"><Mail size={18} /></div>
                <div>
                  <label>Email Address</label>
                  <p>{user.email}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-box"><Calendar size={18} /></div>
                <div>
                  <label>Age</label>
                  <p>{user.age || "Not Provided"}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-box"><UserCircle size={18} /></div>
                <div>
                  <label>Gender</label>
                  <p>{user.gender || "Not Provided"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3>Account Details</h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="icon-box"><Hash size={18} /></div>
                <div>
                  <label>Student ID</label>
                  <p>{user.studentId || "Admin Account"}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-box"><MapPin size={18} /></div>
                <div>
                  <label>Country</label>
                  <p>{user.country || "Not Provided"}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-box"><Calendar size={18} /></div>
                <div>
                  <label>Member Since</label>
                  <p>{formatDate(user.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="info-section password-section">
            <h3>Security & Password</h3>
            <form onSubmit={handlePasswordChange} className="password-change-form">
              <div className="form-grid">
                <div className="input-group">
                  <label>Current Password</label>
                  <div className="input-wrapper">
                    <Lock size={16} className="field-icon" />
                    <input
                      type={showPasswords ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>New Password</label>
                  <div className="input-wrapper">
                    <Lock size={16} className="field-icon" />
                    <input
                      type={showPasswords ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Confirm New Password</label>
                  <div className="input-wrapper">
                    <Lock size={16} className="field-icon" />
                    <input
                      type={showPasswords ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="show-password-toggle"
                      onClick={() => setShowPasswords(!showPasswords)}
                    >
                      {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <button type="submit" className="update-password-btn" disabled={loading}>
                {loading ? <Loader2 size={18} className="spinner" /> : "Update Password"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
