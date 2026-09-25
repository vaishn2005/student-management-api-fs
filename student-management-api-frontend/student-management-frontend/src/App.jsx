import { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import PerformanceAnalysis from "./components/PerformanceAnalysis";
import StudyPlan from "./components/StudyPlan";
import "./App.css";

const API_URL = "http://localhost:5000";

function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get all students
  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/students`);

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();

      setStudents(data);
    } catch (error) {
      console.error("Error loading students:", error);
      alert("Unable to load students");
    } finally {
      setLoading(false);
    }
  };

  // Load students when page opens
  useEffect(() => {
    fetchStudents();
  }, []);

  // Delete student
  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/students/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      alert("Student deleted successfully");

      // Clear selected student if deleted
      if (selectedStudent?._id === id) {
        setSelectedStudent(null);
      }

      // Refresh student list
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Unable to delete student");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Student Management System</h1>

        <p>
          Manage students and analyze their performance using AI
        </p>
      </header>

      <main className="container">

        {/* Add Student Form */}
        <StudentForm onStudentAdded={fetchStudents} />

        {/* Student List */}
        <section className="students-section">
          <h2>Students</h2>

          {loading ? (
            <p>Loading students...</p>
          ) : (
            <StudentList
              students={students}
              onSelectStudent={setSelectedStudent}
              onDeleteStudent={deleteStudent}
            />
          )}
        </section>

        {/* AI Features */}
        {selectedStudent && (
          <>
            <PerformanceAnalysis
              student={selectedStudent}
            />

            <StudyPlan
              student={selectedStudent}
            />
          </>
        )}

      </main>
    </div>
  );
}

export default App;