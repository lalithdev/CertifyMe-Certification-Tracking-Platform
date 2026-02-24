import { AlertTriangle, Calendar, Bell, CheckCircle } from "lucide-react";

const Reminders = () => {
  return (
    <div className="alerts-page">

      {/* Header */}
      <div className="alerts-header">
        <h1>Expiration Alerts</h1>
        <p>Monitor renewal deadlines and take action</p>
      </div>

      {/* Summary Cards */}
      <div className="alerts-summary-grid">

        <div className="alert-card expired">
          <div className="alert-icon red">
            <AlertTriangle size={22} />
          </div>
          <h2>0</h2>
          <p>Expired</p>
        </div>

        <div className="alert-card thirty">
          <div className="alert-icon yellow">
            <Calendar size={22} />
          </div>
          <h2>0</h2>
          <p>Expiring in 30 Days</p>
        </div>

        <div className="alert-card ninety">
          <div className="alert-icon blue">
            <Bell size={22} />
          </div>
          <h2>0</h2>
          <p>Expiring in 90 Days</p>
        </div>

      </div>

      {/* Expired Section */}
      <div className="alert-section red-bg">
        <div className="alert-section-header">
          <AlertTriangle size={20} />
          <div>
            <h3>Expired Certifications</h3>
            <p>These certifications have already expired and need immediate attention</p>
          </div>
        </div>
        <div className="alert-empty">
          <CheckCircle size={18} />
          <span>No certifications in this category</span>
        </div>
      </div>

      {/* 30 Days */}
      <div className="alert-section yellow-bg">
        <div className="alert-section-header">
          <Calendar size={20} />
          <div>
            <h3>Expiring Within 30 Days</h3>
            <p>Take action soon to renew these certifications</p>
          </div>
        </div>
        <div className="alert-empty">
          <CheckCircle size={18} />
          <span>No certifications in this category</span>
        </div>
      </div>

      {/* 90 Days */}
      <div className="alert-section blue-bg">
        <div className="alert-section-header">
          <Bell size={20} />
          <div>
            <h3>Expiring Within 90 Days</h3>
            <p>Plan ahead for these upcoming renewals</p>
          </div>
        </div>
        <div className="alert-empty">
          <CheckCircle size={18} />
          <span>No certifications in this category</span>
        </div>
      </div>

    </div>
  );
};

export default Reminders;