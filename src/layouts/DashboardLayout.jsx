import { useState, useEffect, useRef } from "react";
import {
  BadgeCheck, Menu, Bell, Award, Calendar, FileText, LogOut, LayoutDashboard, TriangleAlert, UserCircle
} from "lucide-react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context";
import { toast } from "sonner";
import { notificationApi } from "../api/notificationApi";
import "./DashboardLayout.css";

function DashboardLayout() {



  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 768);
  const [mobileOpen, setMobileOpen] = useState(false);
  console.log("Current User:", user);

  const roleString = user?.role?.toString().toLowerCase() || "";
  const isAdmin = roleString === "admin";
  const userRoleDisplay = roleString
    ? roleString.charAt(0).toUpperCase() + roleString.slice(1)
    : "";

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" :
      hour < 18 ? "Good Afternoon" :
        "Good Evening";

  const prevCountRef = useRef(0);

  // ✅ REAL-TIME POLLING FOR STUDENT REMINDERS
  useEffect(() => {
    // Only poll for students
    if (isAdmin || !user?.id) return;

    const [checkNotifications] = [async () => {
      try {
        const count = await notificationApi.getUnreadCount();

        // COMPARISON LOGIC: Only toast if unread count increases
        if (count > prevCountRef.current) {
          toast("You have a new reminder from the Admin!", {
            description: "Check your reminders for more details.",
            duration: 5000,
            style: {
              background: "#6366f1", // INDIGO THEME
              color: "#ffffff",
              border: "1px solid #4f46e5",
              borderRadius: "12px",
              padding: "16px"
            },
            icon: <Bell size={20} color="#ffffff" />,
          });
        }

        // SYNC STATE: Only update ref if count changed
        prevCountRef.current = count;
      } catch (err) {
        console.warn("Notification polling error:", err);
      }
    }];

    // Initial check
    checkNotifications();

    // POLLLING INTERVAL: 10 Seconds
    const intervalId = setInterval(checkNotifications, 10000);

    // OPTIMIZATION: Clear interval on unmount
    return () => {
      clearInterval(intervalId);
      console.log("Polling interval cleared");
    };
  }, [isAdmin, user?.id]);

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
          {isAdmin ? (
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
                to="/admin/mystudents"
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
              >
                <FileText size={18} />
                <span>My Students</span>
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

              <NavLink
                to="/admin/profile"
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
              >
                <UserCircle size={18} />
                <span>Profile</span>
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
              <NavLink to="/student/alerts" className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }>
                <TriangleAlert size={18} />
                <span>Alerts</span>
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

              <NavLink to="/student/profile" className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }>
                <UserCircle size={18} />
                <span>Profile</span>
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

            <img 
              src="/CertifyMeFavicon1.png" 
              alt="CertifyMe Logo" 
              style={{ height: '40px', width: 'auto', objectFit: 'contain', marginLeft: '12px' }} 
            />
          </div>

          <div className="header-right">
            <button
              className="icon-btn"
              onClick={() => {
                if (!isAdmin) navigate("/student/reminders");
              }}
            >
              <Bell size={18} />
              <span className="notification-dot"></span>
            </button>

            <div className="user-block" onClick={() => navigate(isAdmin ? "/admin/profile" : "/student/profile")} style={{ cursor: "pointer" }}>
              <div className="avatar">
                {`${user?.firstName || ""}${user?.middleName ? " " + user.middleName : ""} ${user?.lastName || ""}`
                  .trim()
                  .split(" ")
                  .map(n => n[0])
                  .join("")
                  .toUpperCase()
                }
              </div>
              <div className="user-info">
                <span className="user-name">
                  {user?.firstName}{user?.middleName ? ' ' + user.middleName : ''} {user?.lastName}
                </span>

                <small className="user-role">
                  {userRoleDisplay}
                </small>
              </div>
            </div>

            <button
              className="logout-btn"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>

        </div>

        {/* Page Content */}
        <div className="dashboard-content">
          <Outlet />
        </div>

        {/* Backdrop for mobile */}
        {mobileOpen && (
          <div 
            className="sidebar-backdrop" 
            onClick={() => setMobileOpen(false)}
          ></div>
        )}

      </div>
    </div>
  );
}

export default DashboardLayout;