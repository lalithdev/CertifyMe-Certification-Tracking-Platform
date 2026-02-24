import { useState } from "react";
import "./Overview.css";
import { Search, Plus } from "lucide-react";
import StatCard from "./components/StatCard";
import CertificationCard from "./components/CertificationCard";

const Overview = () => {
  const [search, setSearch] = useState("");
  const [selectedCert, setSelectedCert] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const certifications = [
    {
      id: 1,
      title: "AWS Solutions Architect Associate",
      holder: "John Doe",
      issuer: "Amazon Web Services",
      issued: "January 15, 2024",
      expires: "January 15, 2027",
      credentialId: "AWS-SA-2024-001",
      description: "Professional cloud architecture certification",
      status: "Active",
    },
    {
      id: 2,
      title: "CompTIA Security+",
      holder: "John Doe",
      issuer: "CompTIA",
      issued: "September 12, 2023",
      expires: "September 12, 2026",
      credentialId: "SEC-2023-889",
      description: "Cybersecurity foundation certification",
      status: "Active",
    },
    {
      id: 3,
      title: "Microsoft Azure Administrator",
      holder: "John Doe",
      issuer: "Microsoft",
      issued: "May 10, 2023",
      expires: "May 10, 2026",
      credentialId: "AZ-104-556",
      description: "Azure cloud infrastructure certification",
      status: "Active",
    },
    {
      id: 4,
      title: "Google Professional Data Engineer",
      holder: "John Doe",
      issuer: "Google Cloud",
      issued: "November 01, 2022",
      expires: "November 01, 2025",
      credentialId: "GCP-DE-778",
      description: "Data engineering on Google Cloud",
      status: "Active",
    },
  ];

  const stats = {
    total: certifications.length,
    active: certifications.length,
    expiring: 0,
    expired: 0,
  };

  const filtered = certifications.filter(
    (cert) =>
      cert.title.toLowerCase().includes(search.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(search.toLowerCase())
  );

  const calculateDaysRemaining = (dateString) => {
    const expiry = new Date(dateString);
    const today = new Date();
    const diff = expiry - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const handleRenewal = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="dashboard-page">

      {/* Success Toast */}
      {showToast && (
        <div className="toast-success">
          Renewal requested successfully!
        </div>
      )}

      {/* Header */}
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Overview</h1>
            <p className="page-subtitle">
              Manage and track your certifications professionally.
            </p>
      </div>

      <button className="add-btn">
        <Plus size={18} />
        <span>Add Certification</span>
      </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard label="Total" value={stats.total} color="blue" />
        <StatCard label="Active" value={stats.active} color="green" />
        <StatCard label="Expiring Soon" value={stats.expiring} color="yellow" />
        <StatCard label="Expired" value={stats.expired} color="red" />
      </div>

      {/* Search */}
      {/* Search */}
      <div className="overview-search-wrapper">
  <div className="overview-search-container">
    <Search size={18} className="overview-search-icon" />
    <input
      type="text"
      placeholder="Search certifications..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>
</div>

      {/* Cards */}
      <div className="cards-grid">
        {filtered.map((cert) => (
          <CertificationCard
            key={cert.id}
            cert={cert}
            onView={() => setSelectedCert(cert)}
            onRenew={handleRenewal}
          />
        ))}
      </div>

      {/* MODAL */}
      {selectedCert && (
        <div className="modal-overlay">
          <div className="modal">

            {/* Top Section */}
            <div className="modal-top">
              <div className="modal-icon">🏅</div>

              <div>
                <h2 className="modal-title">
                  {selectedCert.title}
                </h2>
                <span className="badge-active">Active</span>
              </div>

              <button
                className="modal-close"
                onClick={() => setSelectedCert(null)}
              >
                ✕
              </button>
            </div>

            {/* First Row */}
            <div className="modal-grid">
              <div>
                <p className="modal-label">Holder</p>
                <strong>{selectedCert.holder}</strong>
              </div>

              <div>
                <p className="modal-label">Issuing Organization</p>
                <strong>{selectedCert.issuer}</strong>
              </div>
            </div>

            <hr className="modal-divider" />

            {/* Second Row */}
            <div className="modal-grid">
              <div>
                <p className="modal-label">Issue Date</p>
                <strong>{selectedCert.issued}</strong>
              </div>

              <div>
                <p className="modal-label">Expiration Date</p>
                <strong>{selectedCert.expires}</strong>
              </div>
            </div>

            {/* Time Remaining */}
            <div className="time-remaining-box">
              Time Remaining:{" "}
              {calculateDaysRemaining(selectedCert.expires)} days
            </div>

            <hr className="modal-divider" />

            {/* Credential */}
            <div style={{ marginBottom: "18px" }}>
              <p className="modal-label">Credential ID</p>
              <strong>{selectedCert.credentialId}</strong>
            </div>

            {/* Description */}
            <div>
              <p className="modal-label">Description</p>
              <p>{selectedCert.description}</p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Overview;