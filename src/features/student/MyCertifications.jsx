import { useState, useEffect, useMemo } from "react";
import { Search, Eye, RefreshCw, X, Image as ImageIcon, Grid, List } from "lucide-react";
import { certificationApi } from "../../api/certificationApi";
import "./MyCertifications.css";

const MyCertifications = () => {
  const [search, setSearch] = useState("");
  const [selectedCert, setSelectedCert] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [filterOption, setFilterOption] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString();
  };

  // ✅ FETCH DATA
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first ❌");
      setLoading(false);
      return;
    }

    certificationApi.getAll(user.id).then((data) => {
      setCertifications(data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  // ✅ CERTIFICATE STATUS (ONLY EXPIRY)
  const getCertStatus = (expiryDate) => {
    if (!expiryDate) return "active";

    const today = new Date();
    const expiry = new Date(expiryDate);

    const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    if (diff < 0) return "expired";
    if (diff <= 30) return "expiring_soon";
    return "active";
  };

  // ✅ TOAST
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  // ✅ REQUEST RENEWAL
  const requestRenewal = async (certId) => {
    try {
      await fetch(
        `https://certifyme-backend.onrender.com/api/certifications/${certId}/renewal?status=PENDING`,
        { method: "PUT" }
      );

      showToast("Renewal request submitted ✅");

      const user = JSON.parse(localStorage.getItem("user"));
      const updated = await certificationApi.getAll(user.id);
      setCertifications(updated);
    } catch (err) {
      console.error("Renewal failed", err);
      showToast("Renewal failed ❌");
    }
  };

  // 🔍 FILTER & SORT
  const filtered = useMemo(() => {
    let result = certifications.filter(
      (cert) =>
        cert.title?.toLowerCase().includes(search.toLowerCase()) ||
        cert.issuer?.toLowerCase().includes(search.toLowerCase())
    );

    if (filterOption !== "all") {
      result = result.filter((cert) => {
        const status = getCertStatus(cert.expiryDate);
        return status === filterOption;
      });
    }

    result.sort((a, b) => {
      if (sortBy === "name") {
        return (a.title || "").localeCompare(b.title || "");
      } else if (sortBy === "date_issued") {
        return new Date(a.issueDate) - new Date(b.issueDate);
      } else if (sortBy === "date_expiring") {
        return new Date(a.expiryDate) - new Date(b.expiryDate);
      }
      return 0;
    });

    return result;
  }, [certifications, search, filterOption, sortBy]);

  return (
    <div className="mycert-page">
      {/* Toast */}
      {toast && <div className="premium-toast">{toast}</div>}

      {/* Header */}
      <div className="mycert-header">
        <h1>My Certifications</h1>
      </div>

      {/* Search and Controls Row */}
      <div className="mycert-controls-row">
        <div className="mycert-search full-width">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search certifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="mycert-actions-row">
          <select 
            value={filterOption} 
            onChange={(e) => setFilterOption(e.target.value)}
            className="premium-select"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="expiring_soon">Expiring Soon</option>
            <option value="expired">Expired</option>
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="premium-select"
          >
            <option value="name">Sort by Name</option>
            <option value="date_issued">Sort by Issue Date</option>
            <option value="date_expiring">Sort by Expiry Date</option>
          </select>

          <div className="view-mode-toggle">
            <button 
              className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              title="Grid View"
            >
              <Grid size={18} />
            </button>
            <button 
              className={`toggle-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
              title="List View"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Cards or Loader */}
      {loading ? (
        <div className="global-loader">
          <div className="spinner-wrapper">
            <RefreshCw className="spinner" />
          </div>
          <span>Loading certifications...</span>
        </div>
      ) : (
        <div className={`mycert-list ${viewMode}`}>
          {filtered.map((cert) => {
          const certStatus = getCertStatus(cert.expiryDate);
          const isExpired = certStatus === "expired"; // ✅ FIXED
          const renewalStatus = isExpired
            ? (cert.renewalStatus || "").toUpperCase()
            : "";

          return (
            <div key={cert.id} className="mycert-card">
              {/* TOP */}
              <div className="mycert-top">
                <div>
                  <h3>{cert.title}</h3>
                  <p className="issuer">{cert.issuer}</p>
                </div>

                {/* RIGHT STATUS */}
                <span className={`status-badge ${certStatus}`}>
                  {certStatus === "expired"
                    ? "Expired"
                    : certStatus === "expiring_soon"
                    ? "Expiring Soon"
                    : "Active"}
                </span>
              </div>

              {/* DETAILS */}
              <div className="mycert-details">
                <div>
                  <strong>Issued:</strong> {formatDate(cert.issueDate)}
                </div>

                <div>
                  <strong>Expires:</strong> {formatDate(cert.expiryDate)}
                </div>

                <div>
                  <strong>Credential ID:</strong> {cert.credentialId}
                </div>

                {/* ✅ RENEWAL LOGIC FIXED */}
                <div>
                  <strong>Renewal:</strong>{" "}

                  {!isExpired && (
                    <span className="status-badge not_required">
                      Not Required
                    </span>
                  )}

                  {isExpired && renewalStatus === "APPROVED" && (
                    <span className="status-badge approved">Approved</span>
                  )}

                  {isExpired && renewalStatus === "PENDING" && (
                    <span className="status-badge pending">Pending</span>
                  )}

                  {isExpired && renewalStatus === "REJECTED" && (
                    <span className="status-badge rejected">Rejected</span>
                  )}

                  {isExpired && !renewalStatus && (
                    <span className="status-badge renewal_required">
                      Renewal Required
                    </span>
                  )}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mycert-actions">
                <button
                  className="btn-outline"
                  onClick={() => setSelectedCert(cert)}
                >
                  <Eye size={16} /> View Certificate
                </button>

                {/* ✅ ONLY SHOW FOR EXPIRED */}
                {isExpired && !renewalStatus && (
                  <button
                    className="btn-primary"
                    onClick={() => requestRenewal(cert.id)}
                  >
                    <RefreshCw size={16} /> Request Renewal
                  </button>
                )}

                {isExpired && renewalStatus === "PENDING" && (
                  <button className="btn-disabled">
                    Pending Approval
                  </button>
                )}

                {isExpired && renewalStatus === "APPROVED" && (
                  <button className="btn-success">
                    Approved ✓
                  </button>
                )}

                {isExpired && renewalStatus === "REJECTED" && (
                  <button className="btn-danger">
                    Rejected ✕
                  </button>
                )}
              </div>
            </div>
          );
        })}
        </div>
      )}

      {/* MODAL */}
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
              <ImageIcon size={60} />
              <p>Certificate Image Not Available</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCertifications;