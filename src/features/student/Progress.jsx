import "./Progress.css";
import { useEffect, useState, useCallback, useMemo } from "react";
import { certificationApi } from "../../api/certificationApi";
import { useAuth } from "../../context";
import StatCard from "./components/StatCard";
import { Target, Clock, AlertTriangle, CheckCircle, Activity } from "lucide-react";

function Progress() {
  const { user } = useAuth();
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    try {
      if (!user?.id) return;
      setLoading(true);

      const data = await certificationApi.getAll(user.id);
      const today = new Date();

      const formatted = data.map((c) => {
        const issue = new Date(c.issueDate);
        const expiry = new Date(c.expiryDate);

        const totalDuration = expiry - issue;
        const elapsed = today - issue;

        let progress = Math.floor((elapsed / totalDuration) * 100);

        // ✅ EDGE CASE FIXES
        if (isNaN(progress)) progress = 0;
        if (progress < 0) progress = 0;
        if (progress > 100) progress = 100;

        // ✅ STATUS
        let status = "active";
        if (today > expiry) status = "expired";
        else if ((expiry - today) / (1000 * 60 * 60 * 24) <= 30) status = "expiring";

        return {
          id: c.id,
          name: c.title,
          issuer: c.issuer,
          progress,
          status,
          daysLeft: Math.ceil((expiry - today) / (1000 * 60 * 60 * 24)),
        };
      });

      setCertifications(formatted);
    } catch (error) {
      console.error("Error fetching progress", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProgress();

    // ✅ AUTO REFRESH LISTENER
    const refresh = () => fetchProgress();
    window.addEventListener("certificationUpdated", refresh);

    return () => window.removeEventListener("certificationUpdated", refresh);
  }, [fetchProgress]);

  const kpis = useMemo(() => {
    if (!certifications.length) return { total: 0, avg: 0, expiring: 0, expired: 0 };
    let totalProgress = 0;
    let expiringCount = 0;
    let expiredCount = 0;

    certifications.forEach((cert) => {
      totalProgress += cert.progress;
      if (cert.status === "expiring") expiringCount++;
      if (cert.status === "expired") expiredCount++;
    });

    return {
      total: certifications.length,
      avg: Math.round(totalProgress / certifications.length),
      expiring: expiringCount,
      expired: expiredCount,
    };
  }, [certifications]);

  return (
    <div className="progress-container">
      <div className="progress-header">
        <h2>Progress Dashboard</h2>
        <p>Enterprise-level insights into your certification lifecycle and readiness.</p>
      </div>

      {loading ? (
        <div className="progress-empty">
          <Activity className="spinner" size={32} />
          <span>Loading advanced analytics...</span>
        </div>
      ) : certifications.length === 0 ? (
        <div className="progress-empty">
          <Target size={48} opacity={0.5} />
          <span>No active certifications to track.</span>
        </div>
      ) : (
        <>
          {/* UNIQUE KPI DASHBOARD */}
          <div className="unique-progress-kpi-grid">
            <div className="unique-kpi-card blue">
              <div className="unique-kpi-icon"><Target size={24} /></div>
              <div className="unique-kpi-data">
                <span className="unique-kpi-label">Total Tracked</span>
                <h3 className="unique-kpi-value">{kpis.total}</h3>
              </div>
            </div>
            
            <div className="unique-kpi-card green">
              <div className="unique-kpi-icon"><CheckCircle size={24} /></div>
              <div className="unique-kpi-data">
                <span className="unique-kpi-label">Avg Completion</span>
                <h3 className="unique-kpi-value">{kpis.avg}%</h3>
              </div>
            </div>

            <div className="unique-kpi-card yellow">
              <div className="unique-kpi-icon"><Clock size={24} /></div>
              <div className="unique-kpi-data">
                <span className="unique-kpi-label">Expiring Soon</span>
                <h3 className="unique-kpi-value">{kpis.expiring}</h3>
              </div>
            </div>

            <div className="unique-kpi-card red">
              <div className="unique-kpi-icon"><AlertTriangle size={24} /></div>
              <div className="unique-kpi-data">
                <span className="unique-kpi-label">Expired</span>
                <h3 className="unique-kpi-value">{kpis.expired}</h3>
              </div>
            </div>
          </div>

          <div className="progress-section-title">
            <Activity size={20} />
            <h3>Detailed Tracking</h3>
          </div>

          {/* PROGRESS CARDS */}
          <div className="progress-cards">
            {certifications.map((cert) => (
              <div className="progress-card" key={cert.id}>
                {/* TOP HEADER */}
                <div className="progress-info">
                  <div>
                    <span className="cert-name">{cert.name}</span>
                    <p className="cert-issuer">{cert.issuer}</p>
                  </div>
                  <div className="progress-percentage">
                    <strong>{cert.progress}%</strong>
                  </div>
                </div>

                {/* ANIMATED BAR */}
                <div className="progress-track">
                  <div
                    className={`progress-fill ${cert.status}`}
                    style={{ width: `${cert.progress}%` }}
                  >
                    <div className="progress-glow"></div>
                  </div>
                </div>

                {/* STATUS FOOTER */}
                <div className="progress-meta">
                  <span className={`progress-status ${cert.status}`}>
                    {cert.status === "expired" && <AlertTriangle size={14} />}
                    {cert.status === "expiring" && <Clock size={14} />}
                    {cert.status === "active" && <CheckCircle size={14} />}
                    {cert.status === "expired"
                      ? "Expired"
                      : cert.status === "expiring"
                      ? "Expiring Soon"
                      : "Active"}
                  </span>

                  {cert.status !== "expired" && (
                    <span className="days-left">
                      <strong>{cert.daysLeft}</strong> days left
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Progress;