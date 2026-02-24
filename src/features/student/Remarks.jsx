import "./Remarks.css";

function Remarks() {

  const remarks = [
    {
      certification: "AWS Cloud Practitioner",
      reviewer: "Admin",
      rating: 4,
      status: "Improving",
      comment: "Strong understanding of cloud fundamentals. Focus more on security concepts.",
      date: "12 Aug 2024"
    },
    {
      certification: "Cisco CCNA",
      reviewer: "Instructor",
      rating: 5,
      status: "Excellent",
      comment: "Excellent grasp of networking basics and routing concepts.",
      date: "5 Aug 2024"
    },
    {
      certification: "IBM Data Fundamentals",
      reviewer: "Admin",
      rating: 3,
      status: "Needs Attention",
      comment: "Revise data modeling and normalization topics.",
      date: "1 Aug 2024"
    }
  ];

  return (
    <div className="remarks-page">

      <div className="remarks-header">
        <h2>Performance Remarks</h2>
        <p>Track feedback and performance insights for your certifications.</p>
      </div>

      <div className="remarks-stats">

        <div className="stat-card">
          <h3>3</h3>
          <span>Total Reviews</span>
        </div>

        <div className="stat-card success">
          <h3>4.0</h3>
          <span>Average Rating</span>
        </div>

        <div className="stat-card warning">
          <h3>1</h3>
          <span>Needs Attention</span>
        </div>

      </div>

      <div className="remarks-list">

        {remarks.map((item, index) => (
          <div className="remark-card" key={index}>

            <div className="remark-top">
              <div>
                <h4>{item.certification}</h4>
                <span className="reviewer">{item.reviewer}</span>
              </div>

              <div className={`status-badge ${
                item.status === "Excellent"
                  ? "excellent"
                  : item.status === "Improving"
                  ? "improving"
                  : "attention"
              }`}>
                {item.status}
              </div>
            </div>

            <div className="remark-body">
              <p>{item.comment}</p>
            </div>

            <div className="remark-footer">
              <div className="rating">
                {"★".repeat(item.rating)}
                {"☆".repeat(5 - item.rating)}
              </div>
              <span className="date">{item.date}</span>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Remarks;