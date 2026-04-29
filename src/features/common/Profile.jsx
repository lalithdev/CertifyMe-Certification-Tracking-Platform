import { useAuth } from "../../context/AuthContext";
import { User, Mail, Calendar, MapPin, Hash, UserCircle } from "lucide-react";
import "./Profile.css";

function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

        </div>
      </div>
    </div>
  );
}

export default Profile;
