import { Search, RefreshCw, Download, LayoutGrid, List } from "lucide-react";
import { useState, useEffect, useMemo, useCallback } from "react";
import "./AdminAllCertifications.css";
import { certificationApi } from "../../api/certificationApi";
import { adminApi } from "../../api/adminApi";
import { getUserName } from "../../utils/userUtils";
import { toast } from "sonner";

function AdminAllCertifications() {
  const [search, setSearch] = useState("");
  const [selectedCert, setSelectedCert] = useState(null);
  const [certifications, setCertifications] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [remarksInput, setRemarksInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("title-asc");
  const [viewMode, setViewMode] = useState("grid");

  // ✅ LOAD DATA
  const loadCertifications = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminApi.getAllCertifications();
      console.log("RAW JSON RESPONSE (ADMIN ALL CERTS):", data);

      const today = new Date();
      const certsList = Array.isArray(data) ? data : (data?.content || []);

      const formatted = certsList.map((c) => {
        const expiry = new Date(c.expiryDate);
        const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

        let status = "Active";
        if (diff <= 0) status = "Expired";
        else if (diff <= 30) status = "Expiring";

        return {
          id: c.id,
          student: getUserName(c),
          title: c.title,
          issuer: c.issuer,
          issued: c.issueDate,
          expires: c.expiryDate,
          credential: c.credentialId,
          status,
          remarks: c.remarks
        };
      });

      setCertifications(formatted);
    } catch (err) {
      console.error("Error fetching admin certifications", err);
      if (err.response?.status !== 401) {
        toast.error("Failed to load certifications");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCertifications();
  }, [loadCertifications]);

  // ✅ SAVE REMARKS
  const handleSaveRemarks = async (cert) => {
    try {
      const updated = {
        ...cert,
        remarks: remarksInput
      };

      await certificationApi.update(cert.id, updated);
      toast.success("Remarks saved successfully");
      setEditingId(null);
      loadCertifications();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save remarks");
    }
  };

  // ✅ SEARCH, FILTER & SORT
  const filteredCerts = useMemo(() => {
    let result = certifications.filter(
      (cert) =>
        cert.student.toLowerCase().includes(search.toLowerCase()) ||
        cert.title.toLowerCase().includes(search.toLowerCase())
    );

    // Filter
    if (filter !== "All") {
      result = result.filter((c) => c.status.toLowerCase() === filter.toLowerCase());
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "title-desc") {
        return b.title.localeCompare(a.title);
      } else if (sortBy === "issuer-asc") {
        return a.issuer.localeCompare(b.issuer);
      } else if (sortBy === "expiry-date") {
        return new Date(a.expires) - new Date(b.expires);
      }
      return 0;
    });

    return result;
  }, [search, certifications, filter, sortBy]);

  const handleView = (cert) => setSelectedCert(cert);

  const handleRenew = (id) => {
    setCertifications((prev) =>
      prev.map((cert) =>
        cert.id === id ? { ...cert, status: "Active" } : cert
      )
    );
    toast.success("Renewal requested successfully!");
  };

  const handleRemove = (id) => {
    setCertifications((prev) => prev.filter((cert) => cert.id !== id));
    if (selectedCert?.id === id) setSelectedCert(null);
    toast.success("Certification removed");
  };

  const exportToCSV = () => {
    const headers = ["Student", "Title", "Issuer", "Issued", "Expires", "Credential ID", "Status", "Remarks"];
    const rows = filteredCerts.map(c => [
      `"${c.student}"`,
      `"${c.title}"`,
      `"${c.issuer}"`,
      `"${c.issued}"`,
      `"${c.expires}"`,
      `"${c.credential}"`,
      `"${c.status}"`,
      `"${c.remarks || ""}"`
    ]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "certifications_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV exported successfully");
  };

  return (
    <div className="admin-certifications-page">
      <h2>All Certifications</h2>
      <p className="sub-text">
        Manage and monitor all student certifications.
      </p>

      <div className="controls-row">
        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by student or certification..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* FILTER */}
        <select className="filter-dropdown" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Expiring">Expiring</option>
          <option value="Expired">Expired</option>
        </select>

        {/* SORT */}
        <select className="filter-dropdown" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
          <option value="issuer-asc">Issuer (A-Z)</option>
          <option value="expiry-date">Expiry Date</option>
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

        <button className="export-btn" onClick={exportToCSV}>
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className={`cert-container ${viewMode}-view`}>
        {loading ? (
          <div className="global-loader" style={{ gridColumn: "1 / -1" }}>
            <div className="spinner-wrapper">
              <RefreshCw className="spinner" />
            </div>
            <span>Loading certifications...</span>
          </div>
        ) : filteredCerts.length === 0 ? (
          <div className="empty-state" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
            No certifications found.
          </div>
        ) : (
          filteredCerts.map((cert) => (
          <div key={cert.id} className="cert-card">
            <div className="card-top">
              <div>
                <h3>{cert.title}</h3>
                <p className="issuer">{cert.issuer}</p>
                <p className="student-name">
                  Student: <strong>{cert.student}</strong>
                </p>
              </div>
              <span className={`status ${cert.status.toLowerCase()}`}>
                {cert.status}
              </span>
            </div>

            <div className="card-details">
              <div><strong>Issued:</strong> {cert.issued}</div>
              <div><strong>Expires:</strong> {cert.expires}</div>
              <div><strong>Credential ID:</strong> {cert.credential}</div>
            </div>

            {/* ✅ REMARKS UI */}
            {editingId === cert.id ? (
              <div style={{ marginTop: "10px" }}>
                <textarea
                  value={remarksInput}
                  onChange={(e) => setRemarksInput(e.target.value)}
                  placeholder="Enter remarks..."
                  style={{ width: "100%", padding: "8px" }}
                />
                <button
                  className="admin-renew-btn"
                  onClick={() => handleSaveRemarks(cert)}
                  style={{ marginTop: "5px" }}
                >
                  Save Remarks
                </button>
              </div>
            ) : (
              <div style={{ marginTop: "10px" }}>
                <strong>Remarks:</strong> {cert.remarks || "No remarks"}
                <button
                  className="admin-view-btn"
                  onClick={() => {
                    setEditingId(cert.id);
                    setRemarksInput(cert.remarks || "");
                  }}
                  style={{ marginLeft: "10px" }}
                >
                  Edit
                </button>
              </div>
            )}

            <div className="card-actions-admin">
              <button
                className="admin-view-btn"
                onClick={() => handleView(cert)}
              >
                View Details
              </button>
              <button
                className="admin-renew-btn"
                onClick={() => handleRenew(cert.id)}
              >
                Mark for Renewal
              </button>
              <button
                className="admin-delete-btn"
                onClick={() => handleRemove(cert.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
        )}
      </div>

      {/* ✅ VIEW CERTIFICATION MODAL */}
      {selectedCert && (
        <div className="global-modal-overlay">
          <div className="global-modal">

            <h3>{selectedCert.student}</h3>
            <p><strong>Email:</strong> {selectedCert.email || "N/A"}</p>
            <p><strong>Certification:</strong> {selectedCert.title}</p>
            
            <hr style={{ margin: "15px 0", border: "none", borderTop: "1px solid #f1f5f9" }} />
            
            <h4>Details</h4>
            <p><strong>Issuer:</strong> {selectedCert.issuer}</p>
            <p><strong>Credential ID:</strong> {selectedCert.credential}</p>
            <p><strong>Issue Date:</strong> {selectedCert.issued}</p>
            <p><strong>Expiry Date:</strong> {selectedCert.expires}</p>
            <p><strong>Status:</strong> <span className={`status ${selectedCert.status.toLowerCase()}`}>{selectedCert.status}</span></p>
            
            {selectedCert.remarks && (
              <>
                <hr style={{ margin: "15px 0", border: "none", borderTop: "1px solid #f1f5f9" }} />
                <h4>Admin Remarks</h4>
                <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6" }}>{selectedCert.remarks}</p>
              </>
            )}

            <div className="modal-actions">
              <button
                onClick={() => setSelectedCert(null)}
                className="global-close-btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAllCertifications;