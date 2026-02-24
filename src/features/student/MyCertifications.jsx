import { useState } from "react";
import { Search, Eye, RefreshCw } from "lucide-react";
import { X, Image as ImageIcon } from "lucide-react";

const MyCertifications = () => {
  const [search, setSearch] = useState("");
  const [selectedCert, setSelectedCert] = useState(null);

  const certifications = [
    {
    id: 1,
    title: "IBM Data Science Professional Certificate",
    issuer: "IBM",
    issued: "August 05, 2022",
    expires: "August 05, 2025",
    credentialId: "IBM-DS-5521",
    status: "Active",
  },
  {
    id: 2,
    title: "Cisco Certified Network Associate (CCNA)",
    issuer: "Cisco",
    issued: "March 20, 2023",
    expires: "March 20, 2026",
    credentialId: "CCNA-77821",
    status: "Active",
  },
  
  {
    id: 3,
    title: "Microsoft Azure Administrator",
    issuer: "Microsoft",
    issued: "May 10, 2023",
    expires: "May 10, 2026",
    credentialId: "AZ-104-556",
    status: "Active",
  },
  {
    id: 4,
    title: "AWS Solutions Architect Associate",
    issuer: "Amazon Web Services",
    issued: "January 15, 2024",
    expires: "January 15, 2027",
    credentialId: "AWS-SA-2024-001",
    status: "Active",
  },

  
];

  const filtered = certifications.filter(
    (cert) =>
      cert.title.toLowerCase().includes(search.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mycert-page">

      {/* Header */}
      <div className="mycert-header">
        <h1>My Certifications</h1>
      </div>

      {/* Search */}
      <div className="mycert-search">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search certifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Cards */}
      <div className="mycert-list">
        {filtered.map((cert) => (
          <div key={cert.id} className="mycert-card">

            <div className="mycert-top">
              <div>
                <h3>{cert.title}</h3>
                <p className="issuer">{cert.issuer}</p>
              </div>

              <span className="status-badge">{cert.status}</span>
            </div>

            <div className="mycert-details">
              <div>
                <strong>Issued:</strong> {cert.issued}
              </div>
              <div>
                <strong>Expires:</strong> {cert.expires}
              </div>
              <div>
                <strong>Credential ID:</strong> {cert.credentialId}
              </div>
            </div>

            <div className="mycert-actions">
                <button
  className="btn-outline"
  onClick={() => setSelectedCert(cert)}
>
  <Eye size={16} /> View Certificate
</button>
                <button className="btn-primary">
                <RefreshCw size={16} /> Request Renewal
                </button>
            </div>

          </div>
        ))}
      </div>
        {selectedCert && (
  <div className="certificate-overlay">
    <div className="certificate-modal">
      
      <div className="certificate-header">
        <h3>{selectedCert.title}</h3>
        <button
          className="certificate-close"
          onClick={() => setSelectedCert(null)}
        >
          <X size={18} />
        </button>
      </div>

      <div className="certificate-image-box">
        <ImageIcon size={60} className="certificate-placeholder-icon" />
        <p>Certificate Image Not Available</p>
      </div>

    </div>
  </div>
)}
    </div>
  );
};

export default MyCertifications;