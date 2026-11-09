import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Dashboard() {
  const navigate = useNavigate();

  const subjects = [
    "Java",
    "React.js",
    "JavaScript",
    "SQL",
    "Spring Boot",
    "Data Structures & Algorithms",
  ];

  const attendanceData = [
    { present: 42, total: 48 },
    { present: 38, total: 45 },
    { present: 40, total: 44 },
    { present: 43, total: 48 },
    { present: 34, total: 42 },
    { present: 36, total: 45 },
  ];

  const exams = [
    { subject: "Java", date: "10 October 2026" },
    { subject: "React.js", date: "14 October 2026" },
    { subject: "JavaScript", date: "18 October 2026" },
    { subject: "SQL", date: "22 October 2026" },
    { subject: "Spring Boot", date: "26 October 2026" },
    { subject: "DSA", date: "30 October 2026" },
  ];

  const [pendingTasks, setPendingTasks] = useState(0);

  useEffect(() => {
    const updateTasks = () => {
      const savedTasks = localStorage.getItem("studyTasks");

      if (savedTasks) {
        const tasks = JSON.parse(savedTasks);

        setPendingTasks(
          tasks.filter((task) => !task.completed).length
        );
      } else {
        setPendingTasks(0);
      }
    };

    updateTasks();

    window.addEventListener("storage", updateTasks);

    return () => {
      window.removeEventListener("storage", updateTasks);
    };
  }, []);

  const totalPresent = attendanceData.reduce(
    (sum, item) => sum + item.present,
    0
  );

  const totalClasses = attendanceData.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const overallAttendance = Math.round(
    (totalPresent / totalClasses) * 100
  );

  return (
    <div className="modern-dashboard">

      {/* TOP NAVBAR */}
      <nav className="dashboard-navbar">

        <div className="brand-area">
          <div className="brand-logo">🎓</div>

          <div>
            <h5>Student AI Assistant</h5>
            <small>Smart Learning Portal</small>
          </div>
        </div>

        <div className="navbar-right">

          <div className="welcome-text">
            Welcome, Abhishek 👋
          </div>

          <button
            className="logout-btn"
            onClick={() => navigate("/")}
          >
            Logout
          </button>

        </div>
      </nav>

      <div className="dashboard-layout">

        {/* SIDEBAR */}
        <aside className="dashboard-sidebar">

          <div className="sidebar-title">
            <span>MENU</span>
          </div>

          <div
            className="dashboard-menu-item active"
            onClick={() => navigate("/dashboard")}
          >
            <span>🏠</span>
            <span>Dashboard</span>
          </div>

          <div
            className="dashboard-menu-item"
            onClick={() => navigate("/chatbot")}
          >
            <span>🤖</span>
            <span>AI Chat</span>
          </div>

          <div
            className="dashboard-menu-item"
            onClick={() => navigate("/subjects")}
          >
            <span>📚</span>
            <span>Subjects</span>
          </div>

          <div
            className="dashboard-menu-item"
            onClick={() => navigate("/attendance")}
          >
            <span>📊</span>
            <span>Attendance</span>
          </div>

          <div
            className="dashboard-menu-item"
            onClick={() => navigate("/exams")}
          >
            <span>📝</span>
            <span>Exams</span>
          </div>

          <div
            className="dashboard-menu-item"
            onClick={() => navigate("/study-planner")}
          >
            <span>📅</span>
            <span>Study Planner</span>
          </div>

          <div
            className="dashboard-menu-item"
            onClick={() => navigate("/profile")}
          >
            <span>👤</span>
            <span>Profile</span>
          </div>

          <div className="sidebar-bottom">

            <div className="ai-mini-card">

              <div className="ai-mini-icon">
                🤖
              </div>

              <h6>Need Help?</h6>

              <p>
                Ask your AI study assistant.
              </p>

              <button
                onClick={() => navigate("/chatbot")}
              >
                Ask AI →
              </button>

            </div>

          </div>

        </aside>

        {/* MAIN CONTENT */}
        <main className="dashboard-main">

          {/* HEADER */}
          <div className="dashboard-heading">

            <div>
              <span className="dashboard-label">
                STUDENT DASHBOARD
              </span>

              <h1>
                Good afternoon, Abhishek!
              </h1>

              <p>
                Here's an overview of your academic progress.
              </p>
            </div>

            <div className="date-card">
              <span>📅</span>

              <div>
                <small>Academic Year</small>
                <strong>2026</strong>
              </div>
            </div>

          </div>

          {/* STAT CARDS */}
          <div className="dashboard-stats">

            <div
              className="modern-stat-card subjects-stat"
              onClick={() => navigate("/subjects")}
            >
              <div className="stat-top">
                <div className="stat-icon">
                  📚
                </div>

                <span className="stat-arrow">
                  →
                </span>
              </div>

              <p>Subjects</p>

              <h2>
                {subjects.length}
              </h2>

              <small>
                Active subjects
              </small>
            </div>

            <div
              className="modern-stat-card attendance-stat"
              onClick={() => navigate("/attendance")}
            >
              <div className="stat-top">
                <div className="stat-icon">
                  📊
                </div>

                <span className="stat-arrow">
                  →
                </span>
              </div>

              <p>Attendance</p>

              <h2>
                {overallAttendance}%
              </h2>

              <div className="mini-progress">
                <div
                  style={{
                    width: `${overallAttendance}%`,
                  }}
                ></div>
              </div>

              <small>
                Overall attendance
              </small>
            </div>

            <div
              className="modern-stat-card tasks-stat"
              onClick={() => navigate("/study-planner")}
            >
              <div className="stat-top">
                <div className="stat-icon">
                  📝
                </div>

                <span className="stat-arrow">
                  →
                </span>
              </div>

              <p>Pending Tasks</p>

              <h2>
                {pendingTasks}
              </h2>

              <small>
                Study planner tasks
              </small>
            </div>

            <div
              className="modern-stat-card exams-stat"
              onClick={() => navigate("/exams")}
            >
              <div className="stat-top">
                <div className="stat-icon">
                  📝
                </div>

                <span className="stat-arrow">
                  →
                </span>
              </div>

              <p>Upcoming Exams</p>

              <h2>
                {exams.length}
              </h2>

              <small>
                Scheduled exams
              </small>
            </div>

          </div>

          {/* AI HERO CARD */}
          <div className="ai-hero-card">

            <div className="ai-hero-content">

              <span className="ai-badge">
                ✨ AI POWERED
              </span>

              <h2>
                Your Personal AI Study Assistant
              </h2>

              <p>
                Get instant help with Java, React, JavaScript,
                SQL, Spring Boot, DSA and interview preparation.
              </p>

              <button
                className="start-chat-btn"
                onClick={() => navigate("/chatbot")}
              >
                Start AI Chat
                <span>→</span>
              </button>

            </div>

            <div className="ai-hero-visual">

              <div className="ai-circle">
                🤖
              </div>

              <div className="floating-card floating-one">
                💡 Ask Questions
              </div>

              <div className="floating-card floating-two">
                💻 Learn Coding
              </div>

            </div>

          </div>

          {/* BOTTOM SECTION */}
          <div className="dashboard-bottom">

            {/* QUICK ACTIONS */}
            <div className="quick-actions-section">

              <div className="section-heading">
                <div>
                  <h3>Quick Actions</h3>
                  <p>Access your frequently used tools</p>
                </div>
              </div>

              <div className="quick-actions-grid">

                <div
                  className="quick-action-card"
                  onClick={() => navigate("/subjects")}
                >
                  <div className="quick-action-icon">
                    📚
                  </div>

                  <div>
                    <h5>Subjects</h5>
                    <p>View all subjects</p>
                  </div>

                  <span>→</span>
                </div>

                <div
                  className="quick-action-card"
                  onClick={() => navigate("/attendance")}
                >
                  <div className="quick-action-icon">
                    📊
                  </div>

                  <div>
                    <h5>Attendance</h5>
                    <p>Track attendance</p>
                  </div>

                  <span>→</span>
                </div>

                <div
                  className="quick-action-card"
                  onClick={() => navigate("/exams")}
                >
                  <div className="quick-action-icon">
                    📝
                  </div>

                  <div>
                    <h5>Exams</h5>
                    <p>Check exam schedule</p>
                  </div>

                  <span>→</span>
                </div>

                <div
                  className="quick-action-card"
                  onClick={() => navigate("/study-planner")}
                >
                  <div className="quick-action-icon">
                    📅
                  </div>

                  <div>
                    <h5>Study Planner</h5>
                    <p>Plan your studies</p>
                  </div>

                  <span>→</span>
                </div>

              </div>

            </div>

            {/* UPCOMING EXAM */}
            <div className="upcoming-section">

              <div className="section-heading">
                <div>
                  <h3>Next Exam</h3>
                  <p>Your upcoming examination</p>
                </div>
              </div>

              <div className="next-exam-card">

                <div className="exam-small-icon">
                  📝
                </div>

                <div className="exam-small-content">

                  <span>UPCOMING</span>

                  <h4>
                    {exams[0].subject}
                  </h4>

                  <p>
                    📅 {exams[0].date}
                  </p>

                </div>

                <button
                  onClick={() => navigate("/exams")}
                >
                  View
                </button>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Dashboard;