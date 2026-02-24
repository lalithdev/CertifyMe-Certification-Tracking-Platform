import { Search } from "lucide-react";
import { useState } from "react";
import "./AdminAllCertifications.css";

function AdminAllCertifications() {
  const [search, setSearch] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [selectedCert, setSelectedCert] = useState(null);

  const [certifications, setCertifications] = useState([
    {
      id: 1,
      student: "Rahul Sharma",
      title: "AWS Solutions Architect Associate",
      issuer: "Amazon Web Services",
      issued: "January 15, 2024",
      expires: "January 15, 2027",
      credential: "AWS-12345-ABCDE",
      status: "Active"
    },
    {
      id: 2,
      student: "Anita Verma",
      title: "PMP Certification",
      issuer: "PMI",
      issued: "February 01, 2024",
      expires: "March 10, 2026",
      credential: "PMP-77821",
      status: "Active"
    },
    {
      id: 3,
      student: "Arjun Patel",
      title: "Google Cloud Professional",
      issuer: "Google",
      issued: "May 05, 2023",
      expires: "August 20, 2024",
      credential: "GCP-88992",
      status: "Expiring"
    }
  ]);

  const handleView = (cert) => {
    setSelectedCert(cert);
  };

  const handleRenew = (id) => {
    setCertifications(prev =>
      prev.map(cert =>
        cert.id === id
          ? { ...cert, status: "Active" }
          : cert
      )
    );

    setToastMessage("Renewal requested successfully!");

    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const handleRemove = (id) => {
    setCertifications(prev =>
      prev.filter(cert => cert.id !== id)
    );

    if (selectedCert?.id === id) {
      setSelectedCert(null);
    }
  };

  return (
    <>
      {/* Toast */}
      {toastMessage && (
        <div className="admin-toast">
          {toastMessage}
        </div>
      )}

      <div className="admin-certifications-page">
        <h2>All Certifications</h2>
        <p className="sub-text">
          Manage and monitor all student certifications.
        </p>

        {/* Search */}
        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by student or certification..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Cards */}
        <div className="cert-grid">
          {certifications.map((cert) => (
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
          ))}
        </div>
      </div>

      {/* Modal OUTSIDE map */}
      {selectedCert && (
        <div className="admin-modal-overlay">
          <div className="admin-modern-modal">

            <div className="modal-header">
              <div className="modal-icon">🏅</div>

              <div>
                <h3>{selectedCert.title}</h3>
                <span className={`status ${selectedCert.status.toLowerCase()}`}>
                  {selectedCert.status}
                </span>
              </div>

              <button
                className="close-btn"
                onClick={() => setSelectedCert(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-grid">
              <div>
                <label>Student</label>
                <p>{selectedCert.student}</p>
              </div>

              <div>
                <label>Issuer</label>
                <p>{selectedCert.issuer}</p>
              </div>

              <div>
                <label>Issue Date</label>
                <p>{selectedCert.issued}</p>
              </div>

              <div>
                <label>Expiration Date</label>
                <p>{selectedCert.expires}</p>
              </div>
            </div>

            <div className="time-remaining-box">
              Time Remaining: 325 days
            </div>

            <div className="credential-section">
              <label>Credential ID</label>
              <p>{selectedCert.credential}</p>
            </div>

            <div className="modal-actions">
              <button
                className="admin-renew-btn"
                onClick={() => handleRenew(selectedCert.id)}
              >
                Mark for Renewal
              </button>

              <button
                className="admin-delete-btn"
                onClick={() => handleRemove(selectedCert.id)}
              >
                Remove
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default AdminAllCertifications;