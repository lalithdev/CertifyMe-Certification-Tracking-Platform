import "./RenewalManagement.css";
import { Check, X, Send, AlertTriangle } from "lucide-react";
import { useState } from "react";

function RenewalManagement() {
  const [toast, setToast] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  const [renewals, setRenewals] = useState([
    {
      id: 1,
      user: "Jane Smith",
      email: "jane@example.com",
      certification: "SCRUM Master",
      expiry: "2025-11-05",
      daysLeft: 0,
      status: "Pending",
    },
    {
      id: 2,
      user: "Sarah Smith",
      email: "sarah@example.com",
      certification: "Google Cloud Professional",
      expiry: "2026-03-10",
      daysLeft: 15,
      status: "Pending",
    },
  ]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const updateStatus = (id, newStatus) => {
    setRenewals((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: newStatus } : r
      )
    );
    showToast(`Renewal ${newStatus.toLowerCase()}`);
    setConfirmAction(null);
  };

  return (
    <div className="renewal-wrapper">

      {toast && <div className="premium-toast">{toast}</div>}

      <div className="page-header">
        <h2>Renewal Management</h2>
        <p>Manage certification renewals and notifications</p>
      </div>

      <div className="premium-card">

        <div className="card-title">
          <h3>Renewal Queue</h3>
        </div>

        <div className="table-head">
          <span>User</span>
          <span>Email</span>
          <span>Certification</span>
          <span>Expiry</span>
          <span>Days Left</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {renewals.map((item) => (
          <div key={item.id} className="table-row">

            <span className="user-name">{item.user}</span>
            <span className="email">{item.email}</span>
            <span>{item.certification}</span>
            <span>{item.expiry}</span>

            <span className={`days ${item.daysLeft === 0 ? "expired" : ""}`}>
              {item.daysLeft === 0 ? "Expired" : `${item.daysLeft} days`}
            </span>

            <span className={`status-pill ${item.status.toLowerCase()}`}>
              {item.status}
            </span>

            <div className="actions">

              {item.status === "Pending" && (
                <>
                  <button
                    className="approve"
                    onClick={() =>
                      setConfirmAction({
                        id: item.id,
                        type: "Approved",
                      })
                    }
                  >
                    <Check size={16} /> Approve
                  </button>

                  <button
                    className="reject"
                    onClick={() =>
                      setConfirmAction({
                        id: item.id,
                        type: "Rejected",
                      })
                    }
                  >
                    <X size={16} /> Reject
                  </button>
                </>
              )}

              <button
                className="remind"
                onClick={() => showToast(`Reminder sent to ${item.user}`)}
              >
                <Send size={16} /> Remind
              </button>

            </div>
          </div>
        ))}
      </div>

      <div className="bulk-section">
        <button
          className="bulk-remind"
          onClick={() => showToast("Reminders sent to all users")}
        >
          <Send size={18} /> Send All Reminders
        </button>

        <button className="export-btn">
          Export List
        </button>
      </div>

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="modal-overlay">
          <div className="modal-box">
            <AlertTriangle size={28} className="modal-icon" />
            <h4>
              Confirm {confirmAction.type}?
            </h4>
            <p>This action cannot be undone.</p>

            <div className="modal-actions">
              <button
                className="confirm-btn"
                onClick={() =>
                  updateStatus(
                    confirmAction.id,
                    confirmAction.type
                  )
                }
              >
                Confirm
              </button>

              <button
                className="cancel-btn"
                onClick={() => setConfirmAction(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default RenewalManagement;