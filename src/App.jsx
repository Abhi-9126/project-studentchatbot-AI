import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";
import Subjects from "./pages/Subjects";
import Attendance from "./pages/Attendance";
import Exams from "./pages/Exams";
import StudyPlanner from "./pages/StudyPlanner";
import Profile from "./pages/Profile";
function App() {
  return (
    <Routes>

      {/* Login */}
      <Route
        path="/"
        element={<Login />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      {/* AI Chat */}
      <Route
        path="/chatbot"
        element={<Chatbot />}
      />

      {/* Subjects */}
      <Route
        path="/subjects"
        element={<Subjects />}
      />

      {/* Attendance */}
      <Route
        path="/attendance"
        element={<Attendance />}
      />

      {/* Exams */}
      <Route
        path="/exams"
        element={<Exams />}
      /> 

      {/* Study Planner */}
      <Route
      path="/study-planner"
      element={<StudyPlanner />}
      />

      {/* Profile */}
      <Route
      path="/profile"
      element={<Profile />}
    />

    </Routes>
  );
}

export default App;