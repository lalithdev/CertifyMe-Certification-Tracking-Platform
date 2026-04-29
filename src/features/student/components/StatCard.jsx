import { Users, BadgeCheck, Clock, AlertCircle } from "lucide-react";

const StatCard = ({ label, value, color, isLoading }) => {

  const colorMap = {
    blue: "#2563eb", /* primary-color */
    green: "#10b981", /* status-active-bg equivalent text color */
    yellow: "#f59e0b", /* status-expiring-bg equivalent text color */
    red: "#ef4444", /* status-expired-bg equivalent text color */
  };

  const bgMap = {
    blue: "rgba(37, 99, 235, 0.1)",
    green: "#d1fae5",
    yellow: "#fef3c7",
    red: "#fee2e2",
  };

  const iconMap = {
    blue: <Users size={20} />,
    green: <BadgeCheck size={20} />,
    yellow: <Clock size={20} />,
    red: <AlertCircle size={20} />,
  };

  return (
    <div className="stat-card">
      <div className="stat-content">
        <p className="stat-label">{label}</p>
        {isLoading ? (
          <div className="skeleton-text" style={{ width: '40px', height: '32px', marginTop: '4px' }}></div>
        ) : (
          <h2 className="stat-value">{value}</h2>
        )}
      </div>


      <div
        className="stat-icon"
        style={{ backgroundColor: bgMap[color] || "rgba(0,0,0,0.05)", color: colorMap[color] }}
      >
        {iconMap[color]}
      </div>
    </div>
  );
};

export default StatCard;