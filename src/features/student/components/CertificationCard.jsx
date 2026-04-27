import { Award, Eye, RefreshCw, Edit2, Trash2 } from "lucide-react";
import "./CertificationCard.css";

const CertificationCard = ({ cert, onView, onRenew, onEdit, onDelete }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "Active": return "cert-status-active";
      case "Expiring Soon": return "cert-status-expiring";
      case "Expired": return "cert-status-expired";
      default: return "cert-status-active";
    }
  };

  return (
    <div className="cert-card">
      {/* Top Section */}
      <div className="cert-card-header">
        <div className="cert-card-icon">
          <Award size={24} />
        </div>

        <span className={`cert-status-badge ${getStatusClass(cert.status)}`}>
          {cert.status}
        </span>
      </div>

      {/* Title */}
      <h3 className="cert-card-title">{cert.title}</h3>

      <p className="cert-card-issuer">{cert.issuer}</p>

      {/* Dates */}
      <div className="cert-card-dates">
        <div className="cert-date-item">
          <span className="cert-date-label">Issued</span>
          <span className="cert-date-value">{cert.issued}</span>
        </div>
        <div className="cert-date-item">
          <span className="cert-date-label">Expires</span>
          <span className="cert-date-value">{cert.expires}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="cert-card-actions">
        <button onClick={onView} className="cert-btn cert-btn-secondary">
          <Eye size={16} /> View Details
        </button>

        <button onClick={() => onRenew(cert)} className="cert-btn cert-btn-primary">
          <RefreshCw size={16} /> Request Renewal
        </button>
      </div>

      <div className="cert-card-actions-row2">
        <button onClick={() => onEdit(cert)} className="cert-btn cert-btn-secondary">
          <Edit2 size={16} /> Edit
        </button>

        <button onClick={() => onDelete(cert.id)} className="cert-btn cert-btn-danger">
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
};

export default CertificationCard;