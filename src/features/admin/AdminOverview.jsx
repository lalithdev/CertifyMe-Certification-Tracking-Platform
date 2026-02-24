import { useState, useMemo } from "react";
import { Users, Award, CheckCircle, Clock, Eye, Search } from "lucide-react";
import "./AdminOverview.css";

function AdminOverview() {

    const certifications = [
  {
    id: 1,
    user: "Rahul Sharma",
    name: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
    issueDate: "2024-01-15",
    expiryDate: "2027-01-15",
    daysLeft: 365,
    status: "Active"
  },
  {
    id: 2,
    user: "Anita Verma",
    name: "PMP Certification",
    issuer: "PMI",
    issueDate: "2024-02-01",
    expiryDate: "2026-03-10",
    daysLeft: 15,
    status: "Expiring"
  },
  {
    id: 3,
    user: "Vikram Reddy",
    name: "CISSP",
    issuer: "ISC2",
    issueDate: "2023-06-20",
    expiryDate: "2025-06-20",
    daysLeft: 120,
    status: "Active"
  },
  {
    id: 4,
    user: "Sneha Iyer",
    name: "SCRUM Master",
    issuer: "Scrum Alliance",
    issueDate: "2023-09-10",
    expiryDate: "2025-09-10",
    daysLeft: 90,
    status: "Active"
  },
  {
    id: 5,
    user: "Arjun Patel",
    name: "Google Cloud Professional",
    issuer: "Google",
    issueDate: "2023-05-05",
    expiryDate: "2024-08-20",
    daysLeft: 10,
    status: "Expiring"
  }
];
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [selectedCert, setSelectedCert] = useState(null);
    const [selected, setSelected] = useState(null);

    const filteredCerts = useMemo(() => {
  return certifications.filter((cert) => {
    const matchesSearch =
      cert.user.toLowerCase().includes(search.toLowerCase()) ||
      cert.name.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || cert.status === filter;

    return matchesSearch && matchesFilter;
  });
}, [search, filter]);

    const openModal = (id) => {
        setSelected(id);
    };

    const closeModal = () => {
  setSelected(null);
    };
  return (
    <div className="admin-overview">

      {/* Header */}
      <div className="overview-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage and monitor all certifications professionally.</p>
        </div>

        <button className="primary-btn">+ Add Student</button>
      </div>

      {/* ===== Stats Section (Student Style) ===== */}
      <div className="stats-row">

        <div className="stat-card">
          <div>
            <p>Total Users</p>
            <h2>128</h2>
          </div>
          <div className="stat-icon blue">
            <Users size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <p>Total Certifications</p>
            <h2>542</h2>
          </div>
          <div className="stat-icon green">
            <Award size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <p>Active Certifications</p>
            <h2>520</h2>
          </div>
          <div className="stat-icon emerald">
            <CheckCircle size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <p>Expiring Soon</p>
            <h2>22</h2>
          </div>
          <div className="stat-icon yellow">
            <Clock size={22} />
          </div>
        </div>

      </div>

      {/* ===== Expiring + Recent Section ===== */}
      <div className="overview-grid">

        {/* Expiring Certifications */}
        <div className="overview-card">
          <h3>Expiring Certifications (Next 30 Days)</h3>

          <div className="list-row">
            <div>
              <strong>AWS Solutions Architect</strong>
              <p>Rahul Sharma — Expires: 25 Aug 2025</p>
            </div>
            <span className="badge warning">Expiring</span>
          </div>

          <div className="list-row">
            <div>
              <strong>PMP Certification</strong>
              <p>Anita Verma — Expires: 30 Aug 2025</p>
            </div>
            <span className="badge warning">Expiring</span>
          </div>

        </div>

        {/* Recent Certifications */}
        <div className="overview-card">
          <h3>Recent Certifications</h3>

          <div className="list-row">
            <div>
              <strong>SCRUM Master</strong>
              <p>Sneha Iyer — Registered Today</p>
            </div>
            <span className="badge success">New</span>
          </div>

          <div className="list-row">
            <div>
              <strong>CISSP</strong>
              <p>Arun kumar — Registered 1 week Ago</p>
            </div>
            <span className="badge success">New</span>
          </div>

          <div className="list-row">
            <div>
              <strong>CISSP</strong>
              <p>Vikram Reddy — Registered 2 Days Ago</p>
            </div>
            <span className="badge success">New</span>
          </div>

        </div>

      </div>
        <div className="table-top-bar">
  <div className="search-bar">
    <Search size={18} />
    <input
      type="text"
      placeholder="Search by user or certification..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  <select
    className="filter-dropdown"
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
  >
    <option value="All">All</option>
    <option value="Active">Active</option>
    <option value="Expiring">Expiring</option>
  </select>
</div>
      {/* ===== Full Activity Table (Complete Version) ===== */}
      <div className="overview-card">
        <h3>Recent Activity</h3>

        <table className="clean-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Certification</th>
              <th>Issuer</th>
              <th>Issue Date</th>
              <th>Expiry Date</th>
              <th>Days Left</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredCerts.map((cert) => (
              <tr key={cert.id}>
                <td>{cert.user}</td>
                <td>{cert.name}</td>
                <td>{cert.issuer}</td>
                <td>{cert.issueDate}</td>
                <td>{cert.expiryDate}</td>
                <td className={cert.status === "Expiring" ? "orange-text" : ""}>
                  {cert.daysLeft}
                </td>
                <td>
                  <span className={`badge ${cert.status === "Active" ? "success" : "warning"}`}>
                    {cert.status}
                  </span>
                </td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => setSelectedCert(cert)}
                  >
                    <Eye size={16} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedCert && (
  <div className="modal-overlay" onClick={() => setSelectedCert(null)}>
    <div
      className="cert-modal"
      onClick={(e) => e.stopPropagation()}
    >

      <div className="modal-header">
        <div className="modal-icon">
          <Award size={28} />
        </div>

        <div>
          <h2>{selectedCert.name}</h2>
          <p className="credential-id">
            Credential ID: CERT-{selectedCert.id}234
          </p>
        </div>

        <span className={`badge ${selectedCert.status === "Active" ? "success" : "warning"}`}>
          {selectedCert.status.toUpperCase()}
        </span>
      </div>

      <div className="modal-grid">
        <div className="info-card">
          <p>Issuer</p>
          <strong>{selectedCert.issuer}</strong>
        </div>

        <div className="info-card">
          <p>Issue Date</p>
          <strong>{selectedCert.issueDate}</strong>
        </div>

        <div className="info-card">
          <p>Expiry Date</p>
          <strong>{selectedCert.expiryDate}</strong>
        </div>

        <div className="info-card">
          <p>Days Remaining</p>
          <strong className={selectedCert.status === "Expiring" ? "orange-text" : ""}>
            {selectedCert.daysLeft} days
          </strong>
        </div>
      </div>

      <div className="modal-actions">
        <button className="primary-btn">Download Certificate</button>
        <button className="secondary-btn">Share</button>
        <button className="close-btn" onClick={() => setSelectedCert(null)}>Close</button>
      </div>

    </div>
  </div>
)}
    </div>
  );
}

export default AdminOverview;