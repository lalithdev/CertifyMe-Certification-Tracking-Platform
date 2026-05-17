import { useState, useEffect, useRef } from "react";
import {
  Home, BadgeCheck, Menu, Bell, Award, Calendar, FileText, LogOut, LayoutDashboard, TriangleAlert, UserCircle, Search, MessageSquare, Activity, FilePlus  
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
  const [searchTerm, setSearchTerm] = useState("");

  console.log("Current User:", user);

  const roleString = user?.role?.toString().toLowerCase() || "";
  const isAdmin = roleString === "admin";
  const userRoleDisplay = roleString
    ? roleString.charAt(0).toUpperCase() + roleString.slice(1)
    : "";

  const studentSearchItems = [
    { label: "Overview", path: "/student/dashboard", desc: "Student performance overview and stats" },
    { label: "Reminders", path: "/student/reminders", desc: "Check all certification deadline alerts" },
    { label: "Alerts", path: "/student/alerts", desc: "View high priority certification expiration notices" },
    { label: "My Certifications", path: "/student/certifications", desc: "Track all uploaded credentials" },
    { label: "Reports", path: "/student/reports", desc: "Inspect charts and compliance aggregates" },
    { label: "Remarks", path: "/student/remarks", desc: "Read verification feedback" },
    { label: "Profile", path: "/student/profile", desc: "Update password or review profile meta" },
    { label: "Add Certification", path: "/student/register", desc: "Upload new qualification details" }
  ];

  const adminSearchItems = [
    { label: "Admin Dashboard", path: "/admin/overview", desc: "High level administrator console" },
    { label: "All Certifications", path: "/admin/all-certifications", desc: "Browse database for all user credentials" },
    { label: "All Students", path: "/admin/all-students", desc: "Manage and track academic user entries" },
    { label: "Expiring Certs", path: "/admin/expiring", desc: "Quick overview of decaying certifications" },
    { label: "Renewal Management", path: "/admin/renewals", desc: "Approve or reject ongoing renewals" },
    { label: "Admin Profile", path: "/admin/profile", desc: "Access developer preferences" }
  ];

  const currentSearchItems = isAdmin ? adminSearchItems : studentSearchItems;

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
                onClick={() => setMobileOpen(false)}
              >
                <Home size={18} />
                <span>Overview</span>
              </NavLink>

              <NavLink
                to="/admin/mystudents"
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
                onClick={() => setMobileOpen(false)}
              >
                <FileText size={18} />
                <span>My Students</span>
              </NavLink>

              <NavLink
                to="/admin/certifications"
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
                onClick={() => setMobileOpen(false)}
              >
                <Award size={18} />
                <span>All Certifications</span>
              </NavLink>

              <NavLink
                to="/admin/expiring"
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
                onClick={() => setMobileOpen(false)}
              >
                <Calendar size={18} />
                <span>Expiring Certs</span>
              </NavLink>

              <NavLink
                to="/admin/renewals"
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
                onClick={() => setMobileOpen(false)}
              >
                <FileText size={18} />
                <span>Renewal Management</span>
              </NavLink>

              <NavLink
                to="/admin/profile"
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
                onClick={() => setMobileOpen(false)}
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
                onClick={() => setMobileOpen(false)}
              >
                <Home size={18} />
                <span>Overview</span>
              </NavLink>

              <NavLink to="/student/register" className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              } onClick={() => setMobileOpen(false)}>
                <FilePlus size={18} />
                <span>Register</span>
              </NavLink>

              <NavLink to="/student/progress" className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              } onClick={() => setMobileOpen(false)}>
                <Activity size={18} />
                <span>Progress</span>
              </NavLink>

              <NavLink to="/student/renewals" className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              } onClick={() => setMobileOpen(false)}>
                <Calendar size={18} />
                <span>Renewals</span>
              </NavLink>

              <NavLink to="/student/reminders" className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              } onClick={() => setMobileOpen(false)}>
                <Bell size={18} />
                <span>Reminders</span>
              </NavLink>
              <NavLink to="/student/alerts" className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              } onClick={() => setMobileOpen(false)}>
                <TriangleAlert size={18} />
                <span>Alerts</span>
              </NavLink>
              <NavLink to="/student/certifications" className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              } onClick={() => setMobileOpen(false)}>
                <Award size={18} />
                <span>My Certifications</span>
              </NavLink>

              <NavLink to="/student/reports" className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              } onClick={() => setMobileOpen(false)}>
                <FileText size={18} />
                <span>Reports</span>
              </NavLink>

              <NavLink to="/student/remarks" className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              } onClick={() => setMobileOpen(false)}>
                <MessageSquare size={18} />
                <span>Remarks</span>
              </NavLink>

              <NavLink to="/student/profile" className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              } onClick={() => setMobileOpen(false)}>
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

          <div className="header-center-search">
            <input
              type="text"
              placeholder="Search..."
              className="header-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={18} className="header-search-icon" />

            {searchTerm && (
              <div className="header-search-dropdown">
                {currentSearchItems
                  .filter(item =>
                    item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.desc.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item, index) => (
                    <div
                      key={index}
                      className="header-search-item"
                      onClick={() => {
                        navigate(item.path);
                        setSearchTerm("");
                      }}
                    >
                      <div className="search-item-title">{item.label}</div>
                      <div className="search-item-desc">{item.desc}</div>
                    </div>
                  ))
                }
              </div>
            )}
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