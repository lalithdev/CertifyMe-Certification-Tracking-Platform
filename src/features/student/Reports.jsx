import { useState } from "react";
import { FileText, Download } from "lucide-react";

const Reports = () => {
  const [statusFilter, setStatusFilter] = useState("All");

  const certifications = [
    {
      id: 1,
      name: "IBM Data Science Professional Certificate",
      status: "Active",
      issued: "August 05, 2022",
      expires: "August 05, 2025",
    },
    {
      id: 2,
      name: "Cisco Certified Network Associate (CCNA)",
      status: "Active",
      issued: "March 20, 2023",
      expires: "March 20, 2026",
    },
    {
      id: 3,
      name: "AWS Solutions Architect Associate",
      status: "Active",
      issued: "January 15, 2024",
      expires: "January 15, 2027",
    },
  ];

  // Dynamic filtering
  const filteredData =
    statusFilter === "All"
      ? certifications
      : certifications.filter((c) => c.status === statusFilter);

  // Dynamic summary
  const summary = {
    total: certifications.length,
    active: certifications.filter((c) => c.status === "Active").length,
    expired: certifications.filter((c) => c.status === "Expired").length,
    renewals: 1,
  };

  return (
    <div className="reports-page">

      {/* Header */}
      <div className="reports-header">
        <h1>Reports</h1>
        <p>Track certification analytics and generate downloadable reports</p>
      </div>

      {/* Summary Cards */}
      <div className="reports-summary-grid">
        <div className="report-card">
          <FileText size={22} />
          <h2>{summary.total}</h2>
          <p>Total Certifications</p>
        </div>

        <div className="report-card">
          <h2>{summary.active}</h2>
          <p>Active</p>
        </div>

        <div className="report-card">
          <h2>{summary.expired}</h2>
          <p>Expired</p>
        </div>

        <div className="report-card">
          <h2>{summary.renewals}</h2>
          <p>Renewals Requested</p>
        </div>
      </div>

      {/* Filters */}
      <div className="reports-filters">
        <input type="date" />
        <input type="date" />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
        </select>

        <button className="export-btn">
          <Download size={16} />
          Export
        </button>
      </div>

      {/* Table */}
      <div className="reports-table">
        <table>
          <thead>
            <tr>
              <th>Certificate</th>
              <th>Status</th>
              <th>Issued</th>
              <th>Expires</th>
            </tr>
          </thead>

          <tbody>
  {filteredData.length > 0 ? (
    filteredData.map((cert) => (
      <tr key={cert.id}>
        <td>{cert.name}</td>
        <td>
          <span className={`status-badge ${cert.status.toLowerCase()}`}>
            {cert.status}
          </span>
        </td>
        <td>{cert.issued}</td>
        <td>{cert.expires}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" className="empty-state">
        No certifications found for this category.
      </td>
    </tr>
  )}
</tbody>
        </table>
      </div>

    </div>
  );
};

export default Reports;