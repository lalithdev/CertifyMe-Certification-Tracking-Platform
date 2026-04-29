import { Search, RefreshCw, Download } from "lucide-react";
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

  // ✅ SEARCH
  const filteredCerts = useMemo(() => {
    return certifications.filter(
      (cert) =>
        cert.student.toLowerCase().includes(search.toLowerCase()) ||
        cert.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, certifications]);

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
        <button className="export-btn" onClick={exportToCSV}>
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="cert-grid">
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

      {/* ✅ VIEW CERTIFICATION MODAL (FUNCTIONAL BUG FIX) */}
      {selectedCert && (
        <div className="admin-modal-overlay">
          <div className="admin-modal cert-detail-modal">
            <div className="modal-header-flex" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0 }}>Certification Details</h3>
              <span className={`status ${selectedCert.status.toLowerCase()}`}>
                {selectedCert.status}
              </span>
            </div>

            <div className="detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div className="detail-item">
                <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Student</label>
                <strong style={{ display: "block", color: "#0f172a" }}>{selectedCert.student}</strong>
              </div>
              <div className="detail-item">
                <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Certification</label>
                <strong style={{ display: "block", color: "#0f172a" }}>{selectedCert.title}</strong>
              </div>
              <div className="detail-item">
                <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Issuer</label>
                <strong style={{ display: "block", color: "#0f172a" }}>{selectedCert.issuer}</strong>
              </div>
              <div className="detail-item">
                <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Credential ID</label>
                <strong style={{ display: "block", color: "#0f172a" }}>{selectedCert.credential}</strong>
              </div>
              <div className="detail-item">
                <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Issue Date</label>
                <strong style={{ display: "block", color: "#0f172a" }}>{selectedCert.issued}</strong>
              </div>
              <div className="detail-item">
                <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Expiry Date</label>
                <strong style={{ display: "block", color: "#0f172a" }}>{selectedCert.expires}</strong>
              </div>
            </div>

            {selectedCert.remarks && (
              <div className="remarks-box-highlight" style={{ marginTop: "20px", padding: "16px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Admin Remarks</label>
                <p style={{ margin: 0, fontSize: "14px", color: "#475569", lineHeight: "1.6" }}>{selectedCert.remarks}</p>
              </div>
            )}

            <div className="modal-actions" style={{ marginTop: "30px" }}>
              <button
                onClick={() => setSelectedCert(null)}
                className="admin-view-btn"
                style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "#f1f5f9", color: "#475569", border: "none" }}
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