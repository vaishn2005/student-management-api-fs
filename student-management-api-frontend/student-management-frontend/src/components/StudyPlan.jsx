import { useState } from "react";

const API_URL = "http://localhost:3000";

function StudyPlan({ student }) {
  const [hours, setHours] = useState(2);
  const [studyPlan, setStudyPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/students/${student._id}/study-plan`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hoursPerDay: Number(hours),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate study plan");
      }

      const data = await response.json();

      setStudyPlan(data);
    } catch (error) {
      console.error(error);
      alert("Unable to generate study plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ai-section">
      <h2>7-Day AI Study Plan</h2>

      <div className="study-controls">
        <label>Study hours per day:</label>

        <input
          type="number"
          min="1"
          max="12"
          value={hours}
          onChange={(event) => setHours(event.target.value)}
        />

        <button onClick={generatePlan} disabled={loading}>
          {loading ? "Generating..." : "Generate Study Plan"}
        </button>
      </div>

      {studyPlan && (
        <div className="study-plan">
          <h3>Focus Areas</h3>

          <ul>
            {studyPlan.focusAreas?.map((subject, index) => (
              <li key={index}>{subject}</li>
            ))}
          </ul>

          <h3>7-Day Plan</h3>

          {studyPlan.studyPlan?.map((day) => (
            <div className="day-card" key={day.day}>
              <h4>Day {day.day}</h4>

              <p>
                <strong>Focus:</strong> {day.focusSubject}
              </p>

              <p>
                <strong>Hours:</strong> {day.estimatedHours}
              </p>

              <strong>Topics:</strong>

              <ul>
                {day.topicsToCover?.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default StudyPlan;
