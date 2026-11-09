import { useNavigate } from "react-router-dom";

function Attendance() {
  const navigate = useNavigate();

  const attendanceData = [
    {
      subject: "Java",
      code: "CS101",
      present: 42,
      total: 48,
      percentage: 88,
    },
    {
      subject: "React.js",
      code: "CS102",
      present: 38,
      total: 45,
      percentage: 84,
    },
    {
      subject: "JavaScript",
      code: "CS103",
      present: 40,
      total: 44,
      percentage: 91,
    },
    {
      subject: "SQL",
      code: "CS104",
      present: 43,
      total: 48,
      percentage: 90,
    },
    {
      subject: "Spring Boot",
      code: "CS105",
      present: 34,
      total: 42,
      percentage: 81,
    },
    {
      subject: "Data Structures & Algorithms",
      code: "CS106",
      present: 36,
      total: 45,
      percentage: 80,
    },
  ];

  const totalPresent = attendanceData.reduce(
    (total, subject) => total + subject.present,
    0
  );

  const totalClasses = attendanceData.reduce(
    (total, subject) => total + subject.total,
    0
  );

  const overallPercentage = Math.round(
    (totalPresent / totalClasses) * 100
  );

  const getStatus = (percentage) => {
    if (percentage >= 85) {
      return {
        text: "Good",
        className: "attendance-good",
      };
    }

    if (percentage >= 75) {
      return {
        text: "Average",
        className: "attendance-average",
      };
    }

    return {
      text: "Low",
      className: "attendance-low",
    };
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

            <div
              className="menu-item"
              onClick={() => navigate("/subjects")}
            >
              📚 Subjects
            </div>

            <div className="menu-item active">
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

          {/* ================= MAIN CONTENT ================= */}

          <div className="col-md-10 dashboard-content">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center">

              <div>

                <h2>
                  📊 Attendance
                </h2>

                <p className="text-muted">
                  View your subject-wise attendance.
                </p>

              </div>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/dashboard")}
              >
                ← Dashboard
              </button>

            </div>

            {/* ================= SUMMARY CARDS ================= */}

            <div className="row mt-4">

              {/* Overall Attendance */}

              <div className="col-md-4 mb-3">

                <div className="info-card">

                  <h6>
                    Overall Attendance
                  </h6>

                  <h2>
                    {overallPercentage}%
                  </h2>

                  <span>
                    Current Semester
                  </span>

                </div>

              </div>

              {/* Present Classes */}

              <div className="col-md-4 mb-3">

                <div className="info-card">

                  <h6>
                    Classes Attended
                  </h6>

                  <h2>
                    {totalPresent}
                  </h2>

                  <span>
                    Total Present
                  </span>

                </div>

              </div>

              {/* Total Classes */}

              <div className="col-md-4 mb-3">

                <div className="info-card">

                  <h6>
                    Total Classes
                  </h6>

                  <h2>
                    {totalClasses}
                  </h2>

                  <span>
                    Conducted
                  </span>

                </div>

              </div>

            </div>

            {/* ================= ATTENDANCE TABLE ================= */}

            <div className="attendance-card mt-4">

              <h4>
                Subject-wise Attendance
              </h4>

              <div className="table-responsive mt-3">

                <table className="table table-hover align-middle">

                  <thead>

                    <tr>
                      <th>Subject</th>
                      <th>Code</th>
                      <th>Present</th>
                      <th>Total</th>
                      <th>Attendance</th>
                      <th>Status</th>
                    </tr>

                  </thead>

                  <tbody>

                    {attendanceData.map((subject) => {

                      const status = getStatus(
                        subject.percentage
                      );

                      return (
                        <tr key={subject.code}>

                          <td>
                            <strong>
                              {subject.subject}
                            </strong>
                          </td>

                          <td>
                            {subject.code}
                          </td>

                          <td>
                            {subject.present}
                          </td>

                          <td>
                            {subject.total}
                          </td>

                          <td style={{ minWidth: "180px" }}>

                            <div className="d-flex justify-content-between">

                              <span>
                                {subject.percentage}%
                              </span>

                            </div>

                            <div className="progress mt-1">

                              <div
                                className="progress-bar bg-primary"
                                role="progressbar"
                                style={{
                                  width: `${subject.percentage}%`,
                                }}
                              >
                                {subject.percentage}%
                              </div>

                            </div>

                          </td>

                          <td>

                            <span
                              className={`attendance-status ${status.className}`}
                            >
                              {status.text}
                            </span>

                          </td>

                        </tr>
                      );

                    })}

                  </tbody>

                </table>

              </div>

            </div>

            {/* ================= ATTENDANCE NOTE ================= */}

            <div className="attendance-note mt-4">

              <strong>
                📌 Attendance Requirement
              </strong>

              <p className="mb-0 mt-2">
                Maintain at least 75% attendance to
                meet the minimum academic requirement.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Attendance;