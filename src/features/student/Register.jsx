import "./Register.css";

function Register() {
  return (
    <div className="register-page">

      <div className="register-header">
        <h2>Register New Certification</h2>
        <p>Add and track your new certification journey.</p>
      </div>

      <div className="register-card">

        <form className="register-form">

          <div className="form-grid">

            <div className="form-group">
              <label>Certification Name</label>
              <input type="text" placeholder="e.g. AWS Solutions Architect" />
            </div>

            <div className="form-group">
              <label>Provider</label>
              <input type="text" placeholder="e.g. Amazon Web Services" />
            </div>

            <div className="form-group">
              <label>Start Date</label>
              <input type="date" />
            </div>

            <div className="form-group">
              <label>Expected Exam Date</label>
              <input type="date" />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea rows="4" placeholder="Add short notes about this certification..."></textarea>
            </div>

          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn">Cancel</button>
            <button type="submit" className="primary-btn">
              Register Certification
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}

export default Register;