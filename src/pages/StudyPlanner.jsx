import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudyPlanner() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("studyTasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : [];
  });

  const [task, setTask] = useState("");
  const [subject, setSubject] = useState("Java");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("Medium");

  const subjects = [
    "Java",
    "React.js",
    "JavaScript",
    "SQL",
    "Spring Boot",
    "Data Structures & Algorithms",
  ];

  // =========================================
  // SAVE TASKS
  // =========================================

  useEffect(() => {
    localStorage.setItem(
      "studyTasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  // =========================================
  // ADD TASK
  // =========================================

  const addTask = (e) => {
    e.preventDefault();

    if (!task.trim()) {
      alert("Please enter a study task.");
      return;
    }

    if (!date) {
      alert("Please select a date.");
      return;
    }

    if (!time) {
      alert("Please select a study time.");
      return;
    }

    const newTask = {
      id: Date.now(),
      task: task.trim(),
      subject,
      date,
      time,
      priority,
      completed: false,
    };

    setTasks((previousTasks) => [
      ...previousTasks,
      newTask,
    ]);

    // Clear form
    setTask("");
    setSubject("Java");
    setDate("");
    setTime("");
    setPriority("Medium");
  };

  // =========================================
  // TOGGLE TASK
  // =========================================

  const toggleTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    );
  };

  // =========================================
  // DELETE TASK
  // =========================================

  const deleteTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.filter(
        (item) => item.id !== id
      )
    );
  };

  // =========================================
  // CLEAR COMPLETED
  // =========================================

  const clearCompleted = () => {
    setTasks((previousTasks) =>
      previousTasks.filter(
        (item) => !item.completed
      )
    );
  };

  // =========================================
  // TASK COUNTS
  // =========================================

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;

  const pendingTasks =
    totalTasks - completedTasks;

  const getPriorityClass = (priority) => {
    if (priority === "High") {
      return "priority-high";
    }

    if (priority === "Low") {
      return "priority-low";
    }

    return "priority-medium";
  };

  return (
    <div className="dashboard">

      {/* =====================================
          NAVBAR
      ===================================== */}

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

          {/* ===================================
              SIDEBAR
          =================================== */}

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

            <div className="menu-item active">
              📅 Study Planner
            </div>

            <div
              className="menu-item"
              onClick={() =>
                navigate("/profile")
              }
            >
              👤 Profile
            </div>

          </div>

          {/* ===================================
              MAIN CONTENT
          =================================== */}

          <div className="col-md-10 dashboard-content">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center">

              <div>

                <h2>
                  📅 Study Planner
                </h2>

                <p className="text-muted">
                  Plan your study schedule and track
                  your progress.
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

            {/* =================================
                SUMMARY
            ================================= */}

            <div className="row mt-4">

              <div className="col-md-4 mb-3">

                <div className="info-card">

                  <h6>
                    Total Tasks
                  </h6>

                  <h2>
                    {totalTasks}
                  </h2>

                  <span>
                    Study Tasks
                  </span>

                </div>

              </div>

              <div className="col-md-4 mb-3">

                <div className="info-card">

                  <h6>
                    Completed
                  </h6>

                  <h2>
                    {completedTasks}
                  </h2>

                  <span>
                    Finished Tasks
                  </span>

                </div>

              </div>

              <div className="col-md-4 mb-3">

                <div className="info-card">

                  <h6>
                    Pending
                  </h6>

                  <h2>
                    {pendingTasks}
                  </h2>

                  <span>
                    Remaining Tasks
                  </span>

                </div>

              </div>

            </div>

            {/* =================================
                ADD TASK
            ================================= */}

            <div className="planner-form-card mt-4">

              <h4>
                ➕ Add Study Task
              </h4>

              <form
                onSubmit={addTask}
                className="mt-3"
              >

                <div className="row">

                  {/* Task */}

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Study Task
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Example: Practice Java OOP"
                      value={task}
                      onChange={(e) =>
                        setTask(e.target.value)
                      }
                    />

                  </div>

                  {/* Subject */}

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Subject
                    </label>

                    <select
                      className="form-select"
                      value={subject}
                      onChange={(e) =>
                        setSubject(e.target.value)
                      }
                    >

                      {subjects.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  {/* Date */}

                  <div className="col-md-4 mb-3">

                    <label className="form-label">
                      Date
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      value={date}
                      onChange={(e) =>
                        setDate(e.target.value)
                      }
                    />

                  </div>

                  {/* Time */}

                  <div className="col-md-4 mb-3">

                    <label className="form-label">
                      Time
                    </label>

                    <input
                      type="time"
                      className="form-control"
                      value={time}
                      onChange={(e) =>
                        setTime(e.target.value)
                      }
                    />

                  </div>

                  {/* Priority */}

                  <div className="col-md-4 mb-3">

                    <label className="form-label">
                      Priority
                    </label>

                    <select
                      className="form-select"
                      value={priority}
                      onChange={(e) =>
                        setPriority(e.target.value)
                      }
                    >

                      <option value="High">
                        🔴 High
                      </option>

                      <option value="Medium">
                        🟡 Medium
                      </option>

                      <option value="Low">
                        🟢 Low
                      </option>

                    </select>

                  </div>

                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  ➕ Add Task
                </button>

              </form>

            </div>

            {/* =================================
                TASK LIST
            ================================= */}

            <div className="planner-list-card mt-4">

              <div className="d-flex justify-content-between align-items-center">

                <h4>
                  📋 My Study Tasks
                </h4>

                {completedTasks > 0 && (

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={clearCompleted}
                  >
                    Clear Completed
                  </button>

                )}

              </div>

              {/* No Tasks */}

              {tasks.length === 0 ? (

                <div className="empty-planner">

                  <div className="empty-icon">
                    📚
                  </div>

                  <h5>
                    No study tasks yet
                  </h5>

                  <p>
                    Add your first study task above.
                  </p>

                </div>

              ) : (

                <div className="study-task-list mt-3">

                  {tasks.map((item) => (

                    <div
                      key={item.id}
                      className={`study-task ${
                        item.completed
                          ? "completed-task"
                          : ""
                      }`}
                    >

                      {/* Checkbox */}

                      <div className="task-check">

                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() =>
                            toggleTask(item.id)
                          }
                        />

                      </div>

                      {/* Task Content */}

                      <div className="task-content">

                        <h5>
                          {item.task}
                        </h5>

                        <div className="task-details">

                          <span>
                            📚 {item.subject}
                          </span>

                          <span>
                            📅 {item.date}
                          </span>

                          <span>
                            ⏰ {item.time}
                          </span>

                          <span
                            className={`task-priority ${getPriorityClass(
                              item.priority
                            )}`}
                          >
                            {item.priority}
                          </span>

                        </div>

                      </div>

                      {/* Delete */}

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          deleteTask(item.id)
                        }
                      >
                        🗑️
                      </button>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StudyPlanner;