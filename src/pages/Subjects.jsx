import { useNavigate } from "react-router-dom";

function Subjects() {
  const navigate = useNavigate();

  const subjects = [
    {
      name: "Java",
      code: "CS101",
      faculty: "Badri",
      credits: 4,
      progress: 85,
      icon: "☕",
    },
    {
      name: "React.js",
      code: "CS102",
      faculty: "Vani",
      credits: 4,
      progress: 80,
      icon: "⚛️",
    },
    {
      name: "JavaScript",
      code: "CS103",
      faculty: "Vani",
      credits: 3,
      progress: 88,
      icon: "🟨",
    },
    {
      name: "SQL",
      code: "CS104",
      faculty: "Yuvraj",
      credits: 3,
      progress: 90,
      icon: "🗄️",
    },
    {
      name: "Spring Boot",
      code: "CS105",
      faculty: "Badri",
      credits: 4,
      progress: 75,
      icon: "🌱",
    },
    {
      name: "Data Structures & Algorithms",
      code: "CS106",
      faculty: "Badri",
      credits: 4,
      progress: 78,
      icon: "🧩",
    },
  ];

  const totalCredits = subjects.reduce(
    (total, subject) => total + subject.credits,
    0
  );

  const averageProgress = Math.round(
    subjects.reduce(
      (total, subject) => total + subject.progress,
      0
    ) / subjects.length
  );

  return (
    <div className="dashboard">

      {/* Navbar */}
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

          {/* Sidebar */}
          <div className="col-md-2 sidebar">

            <h5>Menu</h5>

            <div
              className="menu-item"
              onClick={() => navigate("/dashboard")}
            >
              🏠 Dashboard
            </div>

            <div
              className="menu-item"
              onClick={() => navigate("/chatbot")}
            >
              🤖 AI Chat
            </div>

            <div className="menu-item active">
              📚 Subjects
            </div>

            <div
              className="menu-item"
              onClick={() => navigate("/attendance")}
            >
              📊 Attendance
            </div>

            <div
              className="menu-item"
              onClick={() => navigate("/exams")}
            >
              📝 Exams
            </div>

            <div
              className="menu-item"
              onClick={() => navigate("/study-planner")}
            >
              📅 Study Planner
            </div>

            <div
              className="menu-item"
              onClick={() => navigate("/profile")}
            >
              👤 Profile
            </div>

          </div>

          {/* Main Content */}
          <div className="col-md-10 dashboard-content">

            <div className="d-flex justify-content-between align-items-center">

              <div>
                <h2>📚 My Subjects</h2>

                <p className="text-muted">
                  Current semester subjects and learning progress.
                </p>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/dashboard")}
              >
                ← Dashboard
              </button>

            </div>

            {/* Summary */}
            <div className="row mt-4">

              <div className="col-md-4 mb-3">
                <div className="info-card">
                  <h6>Total Subjects</h6>
                  <h2>{subjects.length}</h2>
                  <span>Current Semester</span>
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div className="info-card">
                  <h6>Total Credits</h6>
                  <h2>{totalCredits}</h2>
                  <span>Academic Credits</span>
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div className="info-card">
                  <h6>Average Progress</h6>
                  <h2>{averageProgress}%</h2>
                  <span>Overall Learning Progress</span>
                </div>
              </div>

            </div>

            {/* Subject Cards */}
            <div className="row mt-3">

              {subjects.map((subject) => (
                <div
                  className="col-md-6 col-lg-4 mb-4"
                  key={subject.code}
                >
                  <div className="subject-card">

                    <div className="subject-icon">
                      {subject.icon}
                    </div>

                    <h4>{subject.name}</h4>

                    <p className="text-muted">
                      {subject.code}
                    </p>

                    <p>
                      <strong>Faculty:</strong>{" "}
                      {subject.faculty}
                    </p>

                    <p>
                      <strong>Credits:</strong>{" "}
                      {subject.credits}
                    </p>

                    <div className="d-flex justify-content-between">
                      <span>Progress</span>

                      <strong>
                        {subject.progress}%
                      </strong>
                    </div>

                    <div className="progress mt-2">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{
                          width: `${subject.progress}%`,
                        }}
                      >
                        {subject.progress}%
                      </div>
                    </div>

                  </div>
                </div>
              ))}

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Subjects;