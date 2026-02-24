import "./Progress.css";

function Progress() {
  const certifications = [
    { name: "AWS Cloud Practitioner", progress: 80 },
    { name: "Cisco CCNA", progress: 60 },
    { name: "IBM Data Fundamentals", progress: 45 },
  ];

  return (
    <div className="progress-container">

      <h2>Certification Progress</h2>

      <div className="progress-cards">
        {certifications.map((cert, index) => (
          <div className="progress-card" key={index}>
            <div className="progress-info">
              <span>{cert.name}</span>
              <strong>{cert.progress}%</strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${cert.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Progress;