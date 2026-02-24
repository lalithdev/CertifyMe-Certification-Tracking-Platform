import { useState } from "react";
import { RefreshCw, CheckCircle, Clock, XCircle } from "lucide-react";

const Renewals = () => {
  const [filter, setFilter] = useState("All");

  const renewals = [
    {
      id: 1,
      certificate: "IBM Data Science Professional Certificate",
      expiry: "August 05, 2025",
      requestedOn: "June 01, 2025",
      status: "Pending",
    },
    {
      id: 2,
      certificate: "Cisco Certified Network Associate (CCNA)",
      expiry: "March 20, 2026",
      requestedOn: "May 12, 2025",
      status: "Approved",
    },
    {
      id: 3,
      certificate: "Microsoft Azure Administrator",
      expiry: "May 10, 2026",
      requestedOn: "April 25, 2025",
      status: "Completed",
    },
  ];

  const filteredRenewals =
    filter === "All"
      ? renewals
      : renewals.filter((r) => r.status === filter);

  const summary = {
    total: renewals.length,
    pending: renewals.filter((r) => r.status === "Pending").length,
    approved: renewals.filter((r) => r.status === "Approved").length,
    completed: renewals.filter((r) => r.status === "Completed").length,
  };

  return (
    <div className="renewals-page">

      {/* Header */}
      <div className="renewals-header">
        <h1>Renewals</h1>
        <p>Manage and track certificate renewal requests</p>
      </div>

      {/* Summary Cards */}
      <div className="renewals-summary-grid">

        <div className="renewal-card">
          <RefreshCw size={22} />
          <h2>{summary.total}</h2>
          <p>Total Requests</p>
        </div>

        <div className="renewal-card pending">
          <Clock size={22} />
          <h2>{summary.pending}</h2>
          <p>Pending</p>
        </div>

        <div className="renewal-card approved">
          <CheckCircle size={22} />
          <h2>{summary.approved}</h2>
          <p>Approved</p>
        </div>

        <div className="renewal-card completed">
          <CheckCircle size={22} />
          <h2>{summary.completed}</h2>
          <p>Completed</p>
        </div>

      </div>

      {/* Filter Buttons */}
      <div className="renewal-filters">
        {["All", "Pending", "Approved", "Completed"].map((status) => (
          <button
            key={status}
            className={filter === status ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Renewal List */}
      <div className="renewal-list">
        {filteredRenewals.map((r) => (
          <div key={r.id} className="renewal-item">
            <div>
              <h3>{r.certificate}</h3>
              <p><strong>Expiry:</strong> {r.expiry}</p>
              <p><strong>Requested On:</strong> {r.requestedOn}</p>
            </div>

            <span className={`status-badge ${r.status.toLowerCase()}`}>
              {r.status}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Renewals;