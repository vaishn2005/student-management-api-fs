import { useState } from "react";

function StudentForm({ onStudentAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    javascript: "",
    python: "",
    java: "",
    DSA: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const studentData = {
        name: formData.name,
        course: formData.course,
        marks: {
          javascript: Number(formData.javascript),
          python: Number(formData.python),
          java: Number(formData.java),
          DSA: Number(formData.DSA),
        },
      };

      const response = await fetch("http://localhost:5000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add student");
      }

      setMessage("Student added successfully!");

      setFormData({
        name: "",
        course: "",
        javascript: "",
        python: "",
        java: "",
        DSA: "",
      });

      if (onStudentAdded) {
        onStudentAdded(data);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-form">
      <h2>Add Student</h2>

      <form onSubmit={handleSubmit}>
        <label>Student Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter student name"
          required
        />

        <label>Course</label>
        <input
          type="text"
          name="course"
          value={formData.course}
          onChange={handleChange}
          placeholder="Enter course"
          required
        />

        <h3>Marks</h3>

        <label>JavaScript</label>
        <input
          type="number"
          name="javascript"
          value={formData.javascript}
          onChange={handleChange}
          min="0"
          max="100"
          required
        />

        <label>Python</label>
        <input
          type="number"
          name="python"
          value={formData.python}
          onChange={handleChange}
          min="0"
          max="100"
          required
        />

        <label>Java</label>
        <input
          type="number"
          name="java"
          value={formData.java}
          onChange={handleChange}
          min="0"
          max="100"
          required
        />

        <label>DSA</label>
        <input
          type="number"
          name="DSA"
          value={formData.DSA}
          onChange={handleChange}
          min="0"
          max="100"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Student"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default StudentForm;
