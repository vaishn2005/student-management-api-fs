import StudentCard from "./StudentCard";

function StudentList({
  students,
  onSelectStudent,
  onDeleteStudent,
}) {
  if (students.length === 0) {
    return <p>No students found.</p>;
  }

  return (
    <div className="student-grid">
      {students.map((student) => (
        <StudentCard
          key={student._id}
          student={student}
          onSelect={onSelectStudent}
          onDelete={onDeleteStudent}
        />
      ))}
    </div>
  );
}

export default StudentList;
