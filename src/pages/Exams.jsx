import { useNavigate } from "react-router-dom";

function Exams() {
  const navigate = useNavigate();

  const exams = [
    {
      subject: "Java",
      code: "CS101",
      date: "10 October 2026",
      time: "10:00 AM - 12:00 PM",
      room: "Block A - Room 101",
      type: "Theory",
      status: "Upcoming",
    },
    {
      subject: "React.js",
      code: "CS102",
      date: "14 October 2026",
      time: "10:00 AM - 12:00 PM",
      room: "Block B - Room 202",
      type: "Practical",
      status: "Upcoming",
    },
    {
      subject: "JavaScript",
      code: "CS103",
      date: "18 October 2026",
      time: "2:00 PM - 4:00 PM",
      room: "Block A - Room 105",
      type: "Theory",
      status: "Upcoming",
    },
    {
      subject: "SQL",
      code: "CS104",
      date: "22 October 2026",
      time: "10:00 AM - 12:00 PM",
      room: "Block C - Room 301",
      type: "Practical",
      status: "Upcoming",
    },
    {
      subject: "Spring Boot",
      code: "CS105",
      date: "26 October 2026",
      time: "10:00 AM - 12:00 PM",
      room: "Block B - Room 205",
      type: "Theory",
      status: "Upcoming",
    },
    {
      subject: "Data Structures & Algorithms",
      code: "CS106",
      date: "30 October 2026",
      time: "2:00 PM - 4:00 PM",
      room: "Block A - Room 110",
      type: "Theory",
      status: "Upcoming",
    },
  ];

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

            <div
              className="menu-item"
              onClick={() => navigate("/attendance")}
            >
              📊 Attendance
            </div>

            <div className="menu-item active">
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
                  📝 Exam Schedule
                </h2>

                <p className="text-muted">
                  View your upcoming examinations and schedule.
                </p>

              </div>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/dashboard")}
              >
                ← Dashboard
              </button>

            </div>

            {/* ================= SUMMARY ================= */}

            <div className="row mt-4">

              <div className="col-md-4 mb-3">

                <div className="info-card">

                  <h6>
                    Upcoming Exams
                  </h6>

                  <h2>
                    {exams.length}
                  </h2>

                  <span>
                    This Semester
                  </span>

                </div>

              </div>

              <div className="col-md-4 mb-3">

                <div className="info-card">

                  <h6>
                    Theory Exams
                  </h6>

                  <h2>
                    {
                      exams.filter(
                        (exam) =>
                          exam.type === "Theory"
                      ).length
                    }
                  </h2>

                  <span>
                    Written Examinations
                  </span>

                </div>

              </div>

              <div className="col-md-4 mb-3">

                <div className="info-card">

                  <h6>
                    Practical Exams
                  </h6>

                  <h2>
                    {
                      exams.filter(
                        (exam) =>
                          exam.type === "Practical"
                      ).length
                    }
                  </h2>

                  <span>
                    Laboratory Examinations
                  </span>

                </div>

              </div>

            </div>

            {/* ================= EXAM CARDS ================= */}

            <div className="row mt-3">

              {exams.map((exam, index) => (

                <div
                  className="col-md-6 col-lg-4 mb-4"
                  key={index}
                >

                  <div className="exam-card">

                    {/* Exam Header */}

                    <div className="d-flex justify-content-between align-items-start">

                      <div className="exam-icon">
                        📝
                      </div>

                      <span className="exam-status">
                        {exam.status}
                      </span>

                    </div>

                    {/* Subject */}

                    <h4 className="mt-3">
                      {exam.subject}
                    </h4>

                    <p className="text-muted">
                      {exam.code}
                    </p>

                    {/* Details */}

                    <div className="exam-detail">
                      📅 <strong>Date:</strong>{" "}
                      {exam.date}
                    </div>

                    <div className="exam-detail">
                      ⏰ <strong>Time:</strong>{" "}
                      {exam.time}
                    </div>

                    <div className="exam-detail">
                      🏫 <strong>Room:</strong>{" "}
                      {exam.room}
                    </div>

                    <div className="exam-detail">
                      📚 <strong>Type:</strong>{" "}
                      {exam.type}
                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* ================= EXAM NOTE ================= */}

            <div className="exam-note mt-3">

              <strong>
                📌 Exam Preparation
              </strong>

              <p className="mb-0 mt-2">
                Use the Study Planner to organize your
                preparation schedule for upcoming exams.
              </p>

              <button
                className="btn btn-primary mt-3"
                onClick={() =>
                  navigate("/study-planner")
                }
              >
                Open Study Planner
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Exams;