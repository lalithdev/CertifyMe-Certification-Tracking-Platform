import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // ✅ added
import "./Overview.css";
import { BadgeCheck, Globe, Search, Users, GraduationCap, ClipboardList, Compass, Plus, TriangleAlert, RefreshCw} from "lucide-react";
import StatCard from "./components/StatCard";
import CertificationCard from "./components/CertificationCard";
import { certificationApi } from "../../api/certificationApi";
import { formatDate } from "../../utils/dateformatter";
import { useAuth } from "../../context";
import { toast } from "sonner";

const Overview = () => {

  const navigate = useNavigate(); // ✅ added
  const { user } = useAuth(); // 🔥 get logged-in user

  const [search, setSearch] = useState("");
  const [selectedCert, setSelectedCert] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCerts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await certificationApi.getAll(user.id);

      const formatted = data.map((c) => {
        const today = new Date();
        const expiry = new Date(c.expiryDate);
        const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

        return {
          id: c.id,
          title: c.title,
          holder: `${user.firstName}${user.middleName ? ' ' + user.middleName : ''} ${user.lastName}`,
          issuer: c.issuer,
          issued: formatDate(c.issueDate),
          expires: formatDate(c.expiryDate),
          issueDateRaw: c.issueDate,
          expiryDateRaw: c.expiryDate,
          credentialId: c.credentialId || "N/A",
          description: "Certification from " + c.issuer,
          status:
            diff <= 0
              ? "Expired"
              : diff <= 30
              ? "Expiring Soon"
              : "Active",
        };
      });

      setCertifications(formatted);

    } catch (error) {
      console.error("Error fetching certifications", error);
    } finally {
      setLoading(false);
    }
  }, [user]);
  useEffect(() => {
    if (!user?.id) return;

    const loadCerts = async () => {
      await fetchCerts();
    };

    loadCerts();
  }, [fetchCerts, user?.id]);

  // 🔥 STATS (DYNAMIC)
  const stats = {
    total: certifications.length,
    active: certifications.filter(c => c.status === "Active").length,
    expiring: certifications.filter(c => c.status === "Expiring Soon").length,
    expired: certifications.filter(c => c.status === "Expired").length,
  };

  const filtered = certifications.filter(
    (cert) =>
      cert.title.toLowerCase().includes(search.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(search.toLowerCase())
  );

  const calculateDaysRemaining = (rawDate) => {
    if (!rawDate) return 0;
    const expiry = new Date(rawDate);
    const today = new Date();
    const diff = expiry - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const handleDelete = async (id) => {
    try {
      await certificationApi.delete(id);
      setCertifications((prev) => prev.filter((cert) => cert.id !== id));
      alert("Deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Unable to delete certification.");
    }
  };

  const handleEdit = async (cert) => {
    const newTitle = prompt("Enter new title", cert.title);
    if (!newTitle) return;

    const updatedCert = {
      title: newTitle,
      issuer: cert.issuer,
      issueDate: cert.issueDateRaw || cert.issued,
      expiryDate: cert.expiryDateRaw || cert.expires,
      credentialId: cert.credentialId,
      url: null,
    };

    try {
      await certificationApi.update(cert.id, updatedCert);

      setCertifications((prev) =>
        prev.map((item) =>
          item.id === cert.id ? { ...item, title: newTitle } : item
        )
      );

      alert("Updated successfully");
    } catch (error) {
      console.error(error);
      alert("Unable to update certification.");
    }
  };
  
  const handleRenewal = async (cert) => {
    if (cert.status !== "Expired") {
      toast.info("Certification is Active — No Renewal Needed");
      return;
    }

    try {
      await fetch(
        `https://certifyme-backend.onrender.com/api/certifications/${cert.id}/renewal?status=PENDING`,
        { method: "PUT" }
      );

      toast.success("Renewal Requested Successfully");
      fetchCerts();
    } catch (err) {
      console.error(err);
      toast.error("Renewal failed");
    }
  };

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" :
      hour < 18 ? "Good Afternoon" :
        "Good Evening";

  return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Overview</h1>
          <p className="page-subtitle">
            Manage and track your certifications professionally.
          </p>
        </div>

        <button className="add-btn" onClick={() => navigate("/student/register")}> {/* ✅ added */}
          <Plus size={18} />
          <span>Add Certification</span>
        </button>
      </div>

      {/* User Profile Brief - Simplified layout */}
      <div className="simplified-user-brief">
        <h2>Welcome back, {user.firstName}{user.middleName ? ' ' + user.middleName : ''} {user.lastName}!</h2>
        <p>
          {greeting}, here's your certification performance overview. 
          {user.studentId && <span> | Student ID: <strong>{user.studentId}</strong></span>}
        </p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard label="Total" value={stats.total} color="blue" isLoading={loading} />
        <StatCard label="Active" value={stats.active} color="green" isLoading={loading} />
        <StatCard label="Expiring Soon" value={stats.expiring} color="yellow" isLoading={loading} />
        <StatCard label="Expired" value={stats.expired} color="red" isLoading={loading} />
      </div>

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
      {loading ? (
        <div className="cards-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="cert-card skeleton-card" style={{ minHeight: '320px' }}>
              <div className="cert-card-header">
                <div className="skeleton-text" style={{ width: '40px', height: '40px', borderRadius: '12px' }}></div>
                <div className="skeleton-text" style={{ width: '80px', height: '24px', borderRadius: '999px' }}></div>
              </div>
              <div className="skeleton-text" style={{ width: '70%', height: '24px', marginTop: '16px' }}></div>
              <div className="skeleton-text" style={{ width: '40%', height: '16px', marginTop: '8px' }}></div>
              <div className="cert-card-dates" style={{ marginTop: '24px', background: 'var(--bg-main)', padding: '16px', borderRadius: '12px' }}>
                <div className="skeleton-text" style={{ width: '60%', height: '32px' }}></div>
                <div className="skeleton-text" style={{ width: '60%', height: '32px' }}></div>
              </div>
              <div className="cert-card-actions" style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
                <div className="skeleton-text" style={{ flex: 1, height: '38px', borderRadius: 'var(--radius-btn)' }}></div>
                <div className="skeleton-text" style={{ flex: 1, height: '38px', borderRadius: 'var(--radius-btn)' }}></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="cards-grid">
          {filtered.map((cert) => (
            <CertificationCard
              key={cert.id}
              cert={cert}
              onView={() => setSelectedCert(cert)}
              onRenew={() => handleRenewal(cert)}
              onEdit={() => handleEdit(cert)}
              onDelete={() => handleDelete(cert.id)}
            />
          ))}
        </div>
      )}


      {/* Modal */}
      {selectedCert && (
        <div className="global-modal-overlay">
          <div className="global-modal">

            <h3>{selectedCert.title}</h3>
            <p style={{ display: "inline-block", padding: "4px 12px", background: "#dcfce7", color: "#15803d", borderRadius: "999px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
              {selectedCert.status}
            </p>

            <hr style={{ margin: "15px 0", border: "none", borderTop: "1px solid #f1f5f9" }} />

            <h4>Details</h4>
            <p><strong>Holder:</strong> {selectedCert.holder}</p>
            <p><strong>Issuing Organization:</strong> {selectedCert.issuer}</p>
            <p><strong>Issue Date:</strong> {selectedCert.issued}</p>
            <p><strong>Expiration Date:</strong> {selectedCert.expires}</p>
            <p><strong>Time Remaining:</strong> {calculateDaysRemaining(selectedCert.expiryDateRaw)} days</p>
            <p><strong>Credential ID:</strong> {selectedCert.credentialId}</p>
            <p><strong>Description:</strong> {selectedCert.description}</p>

            <div className="modal-actions">
              <button
                className="global-close-btn"
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
};

export default Overview;