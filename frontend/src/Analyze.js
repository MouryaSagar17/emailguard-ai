import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Analyze() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const storedHistory = localStorage.getItem('emailAnalysisHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const saveToHistory = (emailText, result) => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      email: emailText.substring(0, 50) + (emailText.length > 50 ? '...' : ''),
      result: result
    };
    const updatedHistory = [newEntry, ...history].slice(0, 10); // Keep only last 10
    setHistory(updatedHistory);
    localStorage.setItem('emailAnalysisHistory', JSON.stringify(updatedHistory));
  };

  const analyzeEmail = async () => {
    if (!email.trim()) {
      alert("Please paste an email");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("https://emailguard-backend.onrender.com/predict", {
        email_text: email,
      });
      setResult(res.data);
      saveToHistory(email, res.data);
    } catch {
      alert("Backend not running");
    }
    setLoading(false);
  };

  return (
    <>
      <nav className="navbar">
        <h2>EmailGuard AI</h2>
        <Link to="/" className="btn">Home</Link>
      </nav>

      <div className="analyze">
        <h2>Email Analysis</h2>

      <textarea
        rows="10"
        placeholder="Paste email content here..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></textarea>

      <button onClick={analyzeEmail} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Email"}
      </button>

      <button onClick={() => setShowHistory(!showHistory)} style={{ marginLeft: '10px' }}>
        {showHistory ? "Hide History" : "View History"}
      </button>

      {showHistory && (
        <div className="history">
          <h3>Analysis History</h3>
          {history.length === 0 ? (
            <p>No analysis history yet.</p>
          ) : (
            <ul>
              {history.map((entry) => (
                <li key={entry.id}>
                  <strong>{entry.timestamp}</strong> - {entry.email} - 
                  <span className={entry.result.prediction === "Phishing" ? "danger" : "safe"}>
                    {entry.result.prediction}
                  </span> ({entry.result.confidence}%)
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {result && (
        <div className="result">
          <h3>
            Result:
            <span className={result.prediction === "Phishing" ? "danger" : "safe"}>
              {" "}{result.prediction}
            </span>
          </h3>

          <p>Confidence: {result.confidence}%</p>

          <h4>Detected Indicators</h4>
          {result.indicators.length ? (
            <ul>
              {result.indicators.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          ) : (
            <p>No suspicious indicators found</p>
          )}

          {result.explanations && result.explanations.length > 0 && (
            <>
              <h4>Why this email looks suspicious</h4>
              <ul>
                {result.explanations.map((exp, idx) => (
                  <li key={idx}>
                    <strong>{exp.reason}</strong>
                    <br />
                    Detected terms: {exp.matched_words.join(", ")}
                  </li>
                ))}
              </ul>
            </>
          )}

          {result.prediction === "Phishing" ? (
            <p className="danger-text">
              ⚠ Do NOT click links or share sensitive information.
            </p>
          ) : (
            <p className="safe-text">
              ✅ Email appears safe, but always verify the sender.
            </p>
          )}
        </div>
      )}
    </div>
  </>
);
}
