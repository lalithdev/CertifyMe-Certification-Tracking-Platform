import { Link } from "react-router-dom";
import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import "./PublicLayout.css";

function PublicLayout() {
    const [activeTab, setActiveTab] = useState("Global Certifications");
    const [hoveredTab, setHoveredTab] = useState(null);
    
  return (
    <div className="public-container">
        
      {/* TOP STRIP */}
      <div className="top-strip">
        <div className="top-content">
          <div className="top-left">
  {[
    "Global Certifications",
    "For certified professionals",
    "For eligibilty criteria",
    "Explore skilling solutions"
  ].map((item) => (
    <span
      key={item}
      className={
        (hoveredTab === item || (!hoveredTab && activeTab === item))
          ? "tab active"
          : "tab"
      }
      onMouseEnter={() => setHoveredTab(item)}
      onMouseLeave={() => setHoveredTab(null)}
      onClick={() => setActiveTab(item)}
    >
      {item}
    </span>
  ))}
</div>
          <div className="top-right">
  <span>About us</span>
  <span>Contact</span>
  <span>Support</span>   {/* new */}
</div>


          
        </div>
      </div>
    {/* MAIN FOOTER */}
    
      {/* MAIN HEADER */}
      <header className="main-header">
        <div className="header-content">

          <div className="landing-logo">
  <BadgeCheck size={20} className="logo-icon" />
  <div className="logo-text">
    <h2>CertifyMe</h2>
    <span>Track. Manage. Renew.</span>
  </div>
</div>
          

          <nav className="main-nav">
            <span>Resources and FAQs</span>
            <span>Certification Library</span>
            <span>Online testing</span>
            <span>Certification Providers</span>
            <span>Reports & Analytics</span>
          </nav>

          <Link to="/login" className="login-btn">
            Log in
          </Link>

        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section">
        <h1>
          Track, manage and monitor your professional certifications with ease.
        </h1>

        <div className="stats">
            <div className="stat-item">
            <h2 className="hero-number">1000+</h2>
            <p>Certified Students</p>
            </div>

            <div className="stat-item">
            <h2 className="hero-number">800+</h2>
            <p>Global Certifications</p>
            </div>

            <div className="stat-item">
            <h2 className="hero-number">120+</h2>
            <p>Certification Providers</p>
            </div>
        </div>
      </section>

      {/* WHY SECTION */}
      <section className="why-section">
        <h2>Why Use Our Platform?</h2>
        <p>
          Our platform helps professionals stay up-to-date with certification
          renewals, track expiry deadlines, and securely store certificates
          for easy access and verification. Designed for students, working
          professionals and administrators, the system ensures that no
          certification ever expires unnoticed.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="footer">
  <div className="footer-inner">

    <div className="footer-grid">

      <div className="footer-brand">
        <h3>Certification Tracking Platform</h3>
        <p>
          Track and manage your certifications efficiently and never miss a renewal deadline.
        </p>

        <div className="footer-social">
          <span>Instagram</span>
          <span>LinkedIn</span>
          <span>Twitter</span>
        </div>
      </div>

      <div className="footer-column">
        <h4>Features</h4>
        <a>Core features</a>
        <a>Pro experience</a>
        <a>Integrations</a>
      </div>

      <div className="footer-column">
        <h4>Learn More</h4>
        <a>Blog</a>
        <a>Case studies</a>
        <a>Customer stories</a>
        <a>Best practices</a>
      </div>

      <div className="footer-column">
        <h4>Support</h4>
        <a>Contact</a>
        <a>Support</a>
        <a>Legal</a>
      </div>

    </div>

    <div className="footer-bottom">
      <div className="footer-pill">
        <span>Work</span>
        <span>About</span>
        <span>Contact</span>
      </div>

      <p>© 2026 Certification Tracking Platform. All rights reserved.</p>
    </div>

  </div>
  
</footer>

    </div>
  );
}

export default PublicLayout;