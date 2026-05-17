import "./ExpiringCerts.css";
import { AlertCircle, Eye, Bell, RefreshCw } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { adminApi } from "../../api/adminApi";
import { getUserName } from "../../utils/userUtils";
import { toast } from "sonner";

function ExpiringCerts() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [expiringCerts, setExpiringCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ LOAD DATA
  const loadExpiringCerts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminApi.getAllCertifications();
      console.log("Admin Expiring Certs - Raw Data:", data);

      const today = new Date();

      const certsList = Array.isArray(data) ? data : (data?.content || []);

      const filtered = certsList
        .map((c) => {
          const expiry = new Date(c.expiryDate);
          const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

          return {
            id: c.id,
            user: getUserName(c),
            email: c.user?.email || "N/A",
            title: c.title,
            issuer: c.issuer,
            expiry: c.expiryDate,
            daysLeft: diff,
          };
        })
        .filter((c) => c.daysLeft > 0 && c.daysLeft <= 30);

      setExpiringCerts(filtered);
    } catch (err) {
      console.error("Error fetching expiring certs", err);
      if (err.response?.status !== 401) {
        toast.error("Failed to load expiring certifications");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExpiringCerts();
  }, [loadExpiringCerts]);

  const handleReminder = async (cert) => {
    try {
      await adminApi.sendReminder(cert.id);
      toast.success(`Reminder sent to ${cert.user}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send reminder");
    }
  };

  return (
    <div className="expiring-page">

      <h2>Expiring Certifications</h2>
      <p className="sub-text">
        Certifications expiring within 30 days
      </p>

      <div className="alert-banner">
        <AlertCircle size={18} />
        <span>
          {expiringCerts.length} certifications require attention – expiring soon
        </span>
      </div>

      <div className="expiring-table">

        <div className="table-header">
          <span>User</span>
          <span>Certification</span>
          <span>Issuer</span>
          <span>Expiry Date</span>
          <span>Days Left</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {loading ? (
          <div className="global-loader" style={{ padding: "40px" }}>
            <div className="spinner-wrapper">
              <RefreshCw className="spinner" />
            </div>
            <span>Loading expiring certifications...</span>
          </div>
        ) : expiringCerts.length === 0 ? (
          <div className="empty-state" style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
            No expiring certifications found.
          </div>
        ) : (
          expiringCerts.map((cert) => (
          <div key={cert.id} className="table-row">
            <span>{cert.user}</span>
            <span>{cert.title}</span>
            <span>{cert.issuer}</span>
            <span>{cert.expiry}</span>
            <span className="days-left">{cert.daysLeft} days</span>
            <span className="status-pill">EXPIRING SOON</span>

            <span className="action-buttons">
              <button
                className="view-btn"
                onClick={() => setSelectedCert(cert)}
              >
                <Eye size={16} /> View
              </button>

              <button
                className="remind-btn"
                onClick={() => handleReminder(cert)}
              >
                <Bell size={16} /> Remind
              </button>
            </span>
          </div>
        ))
        )}
      </div>

      {/* Modal */}
      {selectedCert && (
        <div className="global-modal-overlay">
          <div className="global-modal">
            <h3>{selectedCert.title}</h3>
            <p><strong>User:</strong> {selectedCert.user}</p>
            <p><strong>Email:</strong> {selectedCert.email}</p>
            
            <hr style={{ margin: "15px 0", border: "none", borderTop: "1px solid #f1f5f9" }} />
            
            <h4>Details</h4>
            <p><strong>Issuer:</strong> {selectedCert.issuer}</p>
            <p><strong>Expiry Date:</strong> {selectedCert.expiry}</p>
            <p><strong>Days Left:</strong> {selectedCert.daysLeft} days</p>

            <div className="modal-actions" style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <button
                className="remind-btn"
                style={{ flex: 1, padding: "14px", borderRadius: "14px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", textTransform: "uppercase", fontWeight: "700", letterSpacing: "0.05em" }}
                onClick={() => handleReminder(selectedCert)}
              >
                <Bell size={16} /> Send Reminder
              </button>

              <button
                className="global-close-btn"
                style={{ flex: 1, marginTop: "0" }}
                onClick={() => setSelectedCert(null)}
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

export default ExpiringCerts;