import { Link } from "react-router-dom";
import { useState } from "react";
import { BadgeCheck, Globe, Search, Linkedin, Instagram, Youtube, Facebook, Phone, Mail, MapPin } from "lucide-react";
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
      <div className="top-links">
        <span>About us</span>
        <span>Contact</span>
        <span>Support</span>
      </div>
      <div className="top-icons">
        <Globe size={18} className="top-icon" />
        <Search size={18} className="top-icon" />
    </div>
    </div>
          
        </div>
      </div>
    
      {/* MAIN HEADER */}
      <header className="main-header">
      <div className="header-content">

        <div className="header-inner">

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

        </div>

        <div className="auth-links">
            <Link to="/login" className="login-btn">Log in</Link>
            <Link to="/signup" className="signup-btn">Sign up</Link>
          </div>

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
        <h2>Why Use Our CertifyMe?</h2>
        <p>
          Our platform helps professionals stay up-to-date with certification
          renewals, track expiry deadlines, and securely store certificates
          for easy access and verification. Designed for students, working
          professionals and administrators, the system ensures that no
          certification ever expires unnoticed.
        </p>
      </section>

      {/* FOOTER */}
 {/* FOOTER */}
<footer className="footer">
  <div className="footer-inner">

    <div className="footer-grid">

      {/* BRAND */}
      <div className="footer-brand">

        <h3 className="footer-logo">
          <BadgeCheck size={26} />
          CertifyMe
        </h3>

        <p>
          Track, manage and renew your certifications effortlessly.
          Stay future-ready with structured credential monitoring.
        </p>

        {/* SOCIAL ICONS */}
        <div className="footer-social">
          <p className="social-label">Learn more on</p>
          <div className="social-box"><Instagram size={14} /></div>
          <div className="social-box"><Facebook size={14} /></div>
          <div className="social-box"><Youtube size={14} /></div>
          <div className="social-box"><Linkedin size={14} /></div>
        </div>
      </div>

      {/* PLATFORM */}
      <div className="footer-column">
        <h4>Platform</h4>
        <a>Features</a>
        <a>Integrations</a>
        <a>Pricing</a>
        <a>Roadmap</a>
      </div>

      {/* RESOURCES */}
      <div className="footer-column">
        <h4>Resources</h4>
        <a>Documentation</a>
        <a>Help Center</a>
        <a>Community</a>
        <a>Tutorials</a>
      </div>

      {/* CONTACT */}
      <div className="footer-column">
        <h4>Contact</h4>

        <div className="footer-contact-item">
          <Phone size={16} /> +91 8341647137
        </div>

        <div className="footer-contact-item">
          <Mail size={16} /> 2400031810cse4@gmail.com
        </div>

        <div className="footer-contact-item">
          <MapPin size={16} /> India
        </div>
      </div>

      {/* SUPPORT */}
      <div className="footer-column">
        <h4>Support</h4>
        <a>Privacy</a>
        <a>Terms</a>
        <a>Security</a>
        <a>Cookies</a>
      </div>

    </div>

    {/* FOOTER DIVIDER */}
    <div className="footer-divider"></div>

    {/* FOOTER BOTTOM */}
    <div className="footer-bottom">
      © 2026 CertifyMe — All Rights Reserved
    </div>

  </div>
</footer>

    </div>
  );
}

export default PublicLayout;