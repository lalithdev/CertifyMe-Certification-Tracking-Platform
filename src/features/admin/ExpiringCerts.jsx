import "./ExpiringCerts.css";
import { AlertCircle, Eye, Bell } from "lucide-react";
import { useState } from "react";

function ExpiringCerts() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [toast, setToast] = useState("");

  const expiringCerts = [
    {
      id: 1,
      user: "Sarah Smith",
      email: "sarah@example.com",
      title: "Google Cloud Professional",
      issuer: "Google",
      expiry: "2026-03-10",
      daysLeft: 15,
    },
    {
      id: 2,
      user: "Lisa Anderson",
      email: "lisa@example.com",
      title: "PMP Certification",
      issuer: "PMI",
      expiry: "2026-08-15",
      daysLeft: 25,
    },
  ];

  const handleReminder = (cert) => {
    setToast(`Reminder sent to ${cert.user}`);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="expiring-page">

      {toast && <div className="toast">{toast}</div>}

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

        {expiringCerts.map((cert) => (
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
        ))}
      </div>

      {/* Modal */}
      {selectedCert && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{selectedCert.title}</h3>
            <p><strong>User:</strong> {selectedCert.user}</p>
            <p><strong>Email:</strong> {selectedCert.email}</p>
            <p><strong>Issuer:</strong> {selectedCert.issuer}</p>
            <p><strong>Expiry Date:</strong> {selectedCert.expiry}</p>
            <p><strong>Days Left:</strong> {selectedCert.daysLeft} days</p>

            <div className="modal-actions">
              <button
                className="remind-btn"
                onClick={() => handleReminder(selectedCert)}
              >
                <Bell size={16} /> Send Reminder
              </button>

              <button
                className="close-btn"
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