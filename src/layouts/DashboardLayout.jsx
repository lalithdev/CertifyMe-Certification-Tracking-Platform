import { useState } from "react";
import { BadgeCheck, Menu } from "lucide-react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Award,
  Calendar,
  FileText,
  Bell,
  LogOut,
  LayoutDashboard
} from "lucide-react";
import "./DashboardLayout.css";

function DashboardLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  console.log("Current User:", user);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" :
    hour < 18 ? "Good Afternoon" :
    "Good Evening";

  const handleLogout = () => {
  logout();
  navigate("/");
};

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-top">
        <div className="sidebar-brand">
      <BadgeCheck size={28} strokeWidth={2.5} color="#ffffff" />

  {!collapsed && (

     <div className="brand-text">
      
        <div className="brand-name">CertifyMe</div>
        <div className="brand-tagline">
          Track. Manage. Renew.
        </div>
      </div>
  )}
</div>

        </div>
    
        <nav>
  {user?.role === "admin" ? (
    <>
      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <LayoutDashboard size={18} />
        <span>Dashboard</span>
      </NavLink>

      <NavLink
        to="/admin/certifications"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <Award size={18} />
        <span>All Certifications</span>
      </NavLink>

      <NavLink
        to="/admin/expiring"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <Calendar size={18} />
        <span>Expiring Certs</span>
      </NavLink>

      <NavLink
        to="/admin/renewals"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <FileText size={18} />
        <span>Renewal Management</span>
      </NavLink>
    </>
  ) : (
    <>
      <NavLink
        to="/student/dashboard"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <LayoutDashboard size={18} />
        <span>Overview</span>
      </NavLink>

      <NavLink to="/student/register" className={({ isActive }) =>
        isActive ? "nav-item active" : "nav-item"
      }>
        <Award size={18} />
        <span>Register</span>
      </NavLink>

      <NavLink to="/student/progress" className={({ isActive }) =>
        isActive ? "nav-item active" : "nav-item"
      }>
        <FileText size={18} />
        <span>Progress</span>
      </NavLink>

      <NavLink to="/student/renewals" className={({ isActive }) =>
        isActive ? "nav-item active" : "nav-item"
      }>
        <Calendar size={18} />
        <span>Renewals</span>
      </NavLink>

      <NavLink to="/student/reminders" className={({ isActive }) =>
        isActive ? "nav-item active" : "nav-item"
      }>
        <Bell size={18} />
        <span>Reminders</span>
      </NavLink>

      <NavLink to="/student/certifications" className={({ isActive }) =>
        isActive ? "nav-item active" : "nav-item"
      }>
        <Award size={18} />
        <span>My Certifications</span>
      </NavLink>

      <NavLink to="/student/reports" className={({ isActive }) =>
        isActive ? "nav-item active" : "nav-item"
      }>
        <FileText size={18} />
        <span>Reports</span>
      </NavLink>

      <NavLink to="/student/remarks" className={({ isActive }) =>
        isActive ? "nav-item active" : "nav-item"
      }>
        <FileText size={18} />
        <span>Remarks</span>
      </NavLink>
    </>
  )}
</nav>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main">
        

        {/* Header */}
        <div className="dashboard-header">

 <div className="header-left">
  <button
    className="header-menu-btn"
    onClick={() => {
      if (window.innerWidth <= 768) {
        setMobileOpen(!mobileOpen);
      } else {
        setCollapsed(!collapsed);
      }
    }}
  >
    <Menu size={20} />
  </button>

    <div className="header-text">
      <h2>Welcome back, {user?.name}</h2>
      <span className="subtle-text">
        Here’s your certification performance overview.
      </span>
    </div>
  </div>

  <div className="header-right">
  <button className="icon-btn">
    <Bell size={18} />
    <span className="notification-dot"></span>
  </button>

  <div className="user-block">
    <div className="avatar">
      {user?.name
        ?.split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
      }
    </div>
    <div className="user-info">
  <span className="user-name">
    {user?.name}
  </span>

  <small className="user-role">
    {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
  </small>
</div>
  </div>

  <button className="logout-btn" onClick={logout}>Logout</button>
</div>

</div>

        {/* Page Content */}
        <div className="dashboard-content">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default DashboardLayout;