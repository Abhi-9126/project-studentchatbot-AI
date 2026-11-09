import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const defaultProfile = {
    name: "Abhishek",
    email: "abhishek@example.com",
    phone: "+91 9566224339",
    degree: "B.E. Computer Science and Engineering",
    college: "Sathyabama University",
    year: "2025",
    department: "Computer Science and Engineering",
    location: "Chennai, Tamil Nadu",
  };

  const [profile, setProfile] = useState(() => {
    const savedProfile =
      localStorage.getItem("studentProfile");

    return savedProfile
      ? JSON.parse(savedProfile)
      : defaultProfile;
  });

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    localStorage.setItem(
      "studentProfile",
      JSON.stringify(profile)
    );
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    setProfile(formData);
    setEditMode(false);

    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setFormData(profile);
    setEditMode(false);
  };

  return (
    <div className="dashboard">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar navbar-dark bg-primary px-4">

        <span className="navbar-brand">
          🤖 Student AI Assistant
        </span>

        <button
          className="btn btn-light"
          onClick={() => navigate("/")}
        >
          Logout
        </button>

      </nav>

      <div className="container-fluid">

        <div className="row">

          {/* ================= SIDEBAR ================= */}

          <div className="col-md-2 sidebar">

            <h5>Menu</h5>

            <div
              className="menu-item"
              onClick={() =>
                navigate("/dashboard")
              }
            >
              🏠 Dashboard
            </div>

            <div
              className="menu-item"
              onClick={() =>
                navigate("/chatbot")
              }
            >
              🤖 AI Chat
            </div>

            <div
              className="menu-item"
              onClick={() =>
                navigate("/subjects")
              }
            >
              📚 Subjects
            </div>

            <div
              className="menu-item"
              onClick={() =>
                navigate("/attendance")
              }
            >
              📊 Attendance
            </div>

            <div
              className="menu-item"
              onClick={() =>
                navigate("/exams")
              }
            >
              📝 Exams
            </div>

            <div
              className="menu-item"
              onClick={() =>
                navigate("/study-planner")
              }
            >
              📅 Study Planner
            </div>

            <div className="menu-item active">
              👤 Profile
            </div>

          </div>

          {/* ================= MAIN CONTENT ================= */}

          <div className="col-md-10 dashboard-content">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center">

              <div>

                <h2>
                  👤 My Profile
                </h2>

                <p className="text-muted">
                  View and manage your student information.
                </p>

              </div>

              <button
                className="btn btn-primary"
                onClick={() =>
                  navigate("/dashboard")
                }
              >
                ← Dashboard
              </button>

            </div>

            {/* ================= PROFILE ================= */}

            <div className="profile-container mt-4">

              {/* PROFILE HEADER */}

              <div className="profile-header">

                <div className="profile-avatar">
                  👨‍🎓
                </div>

                <div>

                  <h3>
                    {profile.name}
                  </h3>

                  <p>
                    {profile.degree}
                  </p>

                </div>

              </div>

              {/* PROFILE DETAILS */}

              {!editMode ? (

                <div className="profile-details">

                  <div className="row">

                    <div className="col-md-6 mb-4">

                      <div className="profile-field">

                        <span>
                          👤 Full Name
                        </span>

                        <strong>
                          {profile.name}
                        </strong>

                      </div>

                    </div>

                    <div className="col-md-6 mb-4">

                      <div className="profile-field">

                        <span>
                          📧 Email
                        </span>

                        <strong>
                          {profile.email}
                        </strong>

                      </div>

                    </div>

                    <div className="col-md-6 mb-4">

                      <div className="profile-field">

                        <span>
                          📱 Phone
                        </span>

                        <strong>
                          {profile.phone}
                        </strong>

                      </div>

                    </div>

                    <div className="col-md-6 mb-4">

                      <div className="profile-field">

                        <span>
                          🎓 Degree
                        </span>

                        <strong>
                          {profile.degree}
                        </strong>

                      </div>

                    </div>

                    <div className="col-md-6 mb-4">

                      <div className="profile-field">

                        <span>
                          🏫 College
                        </span>

                        <strong>
                          {profile.college}
                        </strong>

                      </div>

                    </div>

                    <div className="col-md-6 mb-4">

                      <div className="profile-field">

                        <span>
                          📅 Passed Out
                        </span>

                        <strong>
                          {profile.year}
                        </strong>

                      </div>

                    </div>

                    <div className="col-md-6 mb-4">

                      <div className="profile-field">

                        <span>
                          💻 Department
                        </span>

                        <strong>
                          {profile.department}
                        </strong>

                      </div>

                    </div>

                    <div className="col-md-6 mb-4">

                      <div className="profile-field">

                        <span>
                          📍 Location
                        </span>

                        <strong>
                          {profile.location}
                        </strong>

                      </div>

                    </div>

                  </div>

                  {/* EDIT BUTTON */}

                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setFormData(profile);
                      setEditMode(true);
                    }}
                  >
                    ✏️ Edit Profile
                  </button>

                </div>

              ) : (

                /* ================= EDIT FORM ================= */

                <form
                  className="profile-edit-form"
                  onSubmit={handleSave}
                >

                  <div className="row">

                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                      />

                    </div>

                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        Email
                      </label>

                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                      />

                    </div>

                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        Phone
                      </label>

                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                      />

                    </div>

                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        Degree
                      </label>

                      <input
                        type="text"
                        name="degree"
                        className="form-control"
                        value={formData.degree}
                        onChange={handleChange}
                      />

                    </div>

                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        College
                      </label>

                      <input
                        type="text"
                        name="college"
                        className="form-control"
                        value={formData.college}
                        onChange={handleChange}
                      />

                    </div>

                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        Passed Out Year
                      </label>

                      <input
                        type="text"
                        name="year"
                        className="form-control"
                        value={formData.year}
                        onChange={handleChange}
                      />

                    </div>

                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        Department
                      </label>

                      <input
                        type="text"
                        name="department"
                        className="form-control"
                        value={formData.department}
                        onChange={handleChange}
                      />

                    </div>

                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        Location
                      </label>

                      <input
                        type="text"
                        name="location"
                        className="form-control"
                        value={formData.location}
                        onChange={handleChange}
                      />

                    </div>

                  </div>

                  {/* BUTTONS */}

                  <div className="mt-3">

                    <button
                      type="submit"
                      className="btn btn-primary me-2"
                    >
                      💾 Save Changes
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>

                  </div>

                </form>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;