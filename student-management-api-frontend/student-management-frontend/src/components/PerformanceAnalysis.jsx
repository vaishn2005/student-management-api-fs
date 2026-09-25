import { useState } from "react";

const API_URL = "http://localhost:3000";

function PerformanceAnalysis({ student }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzePerformance = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/students/${student._id}/analyze-performance`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("AI analysis failed");
      }

      const data = await response.json();

      setAnalysis(data);
    } catch (error) {
      console.error(error);
      alert("Unable to generate AI analysis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ai-section">
      <h2>AI Performance Analysis</h2>

      <button onClick={analyzePerformance} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Performance"}
      </button>

      {analysis && (
        <div className="analysis-result">
          <h3>{analysis.name}</h3>

          <h4>Overall Summary</h4>
          <p>{analysis.overallSummary}</p>

          <h4>Strengths</h4>
          <ul>
            {analysis.strengths?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h4>Areas for Improvement</h4>
          <ul>
            {analysis.areasForImprovement?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h4>Recommendations</h4>
          <ul>
            {analysis.recommendations?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default PerformanceAnalysis;