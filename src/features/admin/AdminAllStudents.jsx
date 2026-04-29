import { useEffect, useState, useMemo } from "react";
import { Search, Users, RefreshCw, Download, LayoutGrid, List } from "lucide-react";
import "./AdminAllStudents.css";
import { adminApi } from "../../api/adminApi";
import { reportApi } from "../../api/reportApi";

function AdminAllStudents() {

  const [selectedUser, setSelectedUser] = useState(null);
  const [userCerts, setUserCerts] = useState([]);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");
  const [viewMode, setViewMode] = useState("grid");

  // ✅ FETCH USERS
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getAllUsers();
      console.log("Admin All Students - Raw Data:", data);

      const usersList = Array.isArray(data) ? data : (data?.content || []);

      const formatted = usersList
        .filter((u) => u.role === "STUDENT")
        .map((u) => ({
          id: u.id,
          name: u.firstName
            ? `${u.firstName}${u.middleName ? ' ' + u.middleName : ''} ${u.lastName}`
            : (u.name || "Unknown"),
          email: u.email,
          studentId: u.studentId,
          certCount: u.certificationCount || 0,
        }));

      setUsers(formatted);
    } catch (err) {
      console.error("Error fetching students", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ EFFECT
  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ SEARCH, FILTER & SORT
  const filteredUsers = useMemo(() => {
    let result = users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    // Filter
    if (filter === "With Certs") {
      result = result.filter((u) => u.certCount > 0);
    } else if (filter === "No Certs") {
      result = result.filter((u) => u.certCount === 0);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      } else if (sortBy === "certs-high") {
        return b.certCount - a.certCount;
      } else if (sortBy === "certs-low") {
        return a.certCount - b.certCount;
      }
      return 0;
    });

    return result;
  }, [users, search, filter, sortBy]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Student ID", "Certifications Count"];
    const rows = filteredUsers.map(u => [
      `"${u.name}"`,
      `"${u.email}"`,
      `"${u.studentId || "N/A"}"`,
      u.certCount
    ]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CSV exported successfully");
  };

  const handleRemove = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    showToast("Student removed");
  };

  const handleViewProfile = async (user) => {
    try {
      const data = await reportApi.getUserReports(user.id);

      setUserCerts(data);
      setSelectedUser(user);
    } catch (err) {
      console.error("Error fetching user certifications", err);
      if (err.response?.status !== 401) {
        showToast("Could not load user profile");
      }
    }
  };

  return (
    <>
      <div className="admin-students-page">

        {toast && <div className="admin-toast">{toast}</div>}

        <h2>All Students</h2>
        <p className="sub-text">
          Manage and monitor all registered students.
        </p>

        <div className="controls-row">
          {/* SEARCH */}
          <div className="search-bar">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* FILTER */}
          <select className="filter-dropdown" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All Students</option>
            <option value="With Certs">With Certs</option>
            <option value="No Certs">No Certs</option>
          </select>

          {/* SORT */}
          <select className="filter-dropdown" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="certs-high">Certs (High-Low)</option>
            <option value="certs-low">Certs (Low-High)</option>
          </select>

          {/* VIEW TOGGLE */}
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`} 
              onClick={() => setViewMode("grid")}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              className={`toggle-btn ${viewMode === "list" ? "active" : ""}`} 
              onClick={() => setViewMode("list")}
              title="List View"
            >
              <List size={18} />
            </button>
          </div>

          {/* EXPORT CSV */}
          <button className="export-btn" onClick={exportToCSV}>
            <Download size={16} /> Export CSV
          </button>
        </div>

        {/* GRID */}
        <div className={`students-container ${viewMode}-view`}>
          {loading ? (
            <div className="global-loader" style={{ gridColumn: "1 / -1" }}>
              <div className="spinner-wrapper">
                <RefreshCw className="spinner" />
              </div>
              <span>Loading students...</span>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="empty-state" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
              No students found.
            </div>
          ) : (
            filteredUsers.map((user) => (
            <div key={user.id} className="student-card">

              <div className="card-top">
                <div>
                  <h3>{user.name}</h3>
                  <p className="email">{user.email}</p>
                  <p className="student-id">
                    Student ID: <strong>{user.studentId || "N/A"}</strong>
                  </p>
                </div>

                <span className="status active">Student</span>
              </div>

              <div className="card-details">
                <strong>Certifications:</strong> {user.certCount}
              </div>

              <div className="card-actions">
                <button
                  className="view-btn"
                  onClick={() => handleViewProfile(user)}
                >
                  View Profile
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleRemove(user.id)}
                >
                  Remove
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>

      {/* ✅ MODAL INSIDE SAME RETURN */}
      {selectedUser && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">

            <h3>{selectedUser.name}</h3>

            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Student ID:</strong> {selectedUser.studentId}</p>

            <hr style={{ margin: "15px 0" }} />

            <h4>Certifications</h4>

            {userCerts.length === 0 ? (
              <p>No certifications found</p>
            ) : (
              userCerts.map((cert) => (
                <div key={cert.id} style={{ marginBottom: "10px" }}>
                  <strong>{cert.title}</strong>
                  <p style={{ fontSize: "13px", color: "#6b7280" }}>
                    {cert.issuer} | Expires: {cert.expiryDate}
                  </p>
                </div>
              ))
            )}

            <div className="modal-actions">
              <button
                className="close-btn"
                onClick={() => setSelectedUser(null)}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default AdminAllStudents;