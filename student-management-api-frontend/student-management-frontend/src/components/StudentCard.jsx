function StudentCard({ student, onSelect, onDelete }) {
  const average =
    (
      (student.marks.javascript +
        student.marks.python +
        student.marks.java +
        student.marks.DSA) /
      4
    ).toFixed(1);

  return (
    <div className="student-card">
      <h3>{student.name}</h3>

      <p>
        <strong>Course:</strong> {student.course}
      </p>

      <div className="marks">
        <p>JavaScript: {student.marks.javascript}</p>
        <p>Python: {student.marks.python}</p>
        <p>Java: {student.marks.java}</p>
        <p>DSA: {student.marks.DSA}</p>
      </div>

      <p className="average">
        Average: <strong>{average}/100</strong>
      </p>

      <div className="card-buttons">
        <button onClick={() => onSelect(student)}>
          AI Analysis
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(student._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default StudentCard;
