import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analyze from "./Analyze";
import Navbar from "./components/Navbar";
import "./App.css";

function Home() {
  return (
    <>
      <Navbar />

      {/* ABOUT */}
      <section className="section">
        <h2 className="fade-in" style={{ animationDelay: '0.4s' }}>About the Project</h2>
        <p className="fade-in" style={{ animationDelay: '0.6s' }}>
          Phishing emails are one of the most common cyber threats today.
          Attackers trick users into revealing sensitive information
          such as passwords, bank details, and OTPs.
        </p>
        <p className="fade-in" style={{ animationDelay: '0.8s' }}>
          This project uses a trained machine learning model to analyze
          the content of an email and predict whether it is phishing or legitimate.
        </p>
      </section>

      {/* WORKING */}
      <section className="section gray">
        <h2 className="fade-in" style={{ animationDelay: '1s' }}>How It Works</h2>
        <ol className="fade-in" style={{ animationDelay: '1.2s' }}>
          <li>User pastes an email into the system</li>
          <li>Email text is converted into numerical vectors</li>
          <li>ML model predicts phishing or legitimate</li>
          <li>Confidence score and indicators are displayed</li>
        </ol>
      </section>

      {/* FEATURES */}
      <section className="section">
        <h2>Key Features</h2>
        <ul>
          <li>✔ Fast phishing detection</li>
          <li>✔ Confidence percentage</li>
          <li>✔ Keyword-based indicators</li>
          <li>✔ FastAPI backend</li>
          <li>✔ Simple & user-friendly UI</li>
        </ul>
      </section>

{/* MODEL DETAILS */}
<section className="section gray">
  <h2 className="fade-in" style={{ animationDelay: '1.8s' }}>Machine Learning Model</h2>
  <p className="fade-in" style={{ animationDelay: '2s' }}>
    This project uses <strong>Logistic Regression</strong>, a supervised
    machine learning algorithm commonly used for binary classification problems.
    In this system, the model classifies emails into two categories:
    <strong> Phishing </strong> or <strong> Legitimate</strong>.
  </p>

  <p className="fade-in" style={{ animationDelay: '2.2s' }}>
    Logistic Regression works by estimating the probability that a given input
    belongs to a particular class using a sigmoid function. Based on this
    probability, the model makes a final classification decision.
  </p>
</section>

{/* DATASET & PREPROCESSING */}
<section className="section">
  <h2 className="fade-in" style={{ animationDelay: '2.4s' }}>Dataset & Preprocessing</h2>
  <p className="fade-in" style={{ animationDelay: '2.6s' }}>
    The model was trained on a labeled email dataset containing both phishing
    and legitimate emails. Before training, the email text data was cleaned
    and preprocessed using Natural Language Processing (NLP) techniques.
  </p>

  <ul className="fade-in" style={{ animationDelay: '2.8s' }}>
    <li>Removal of special characters and stopwords</li>
    <li>Text normalization and lowercasing</li>
    <li>Feature extraction using TF-IDF Vectorization</li>
    <li>Splitting data into training and testing sets</li>
  </ul>
</section>

{/* WHY LOGISTIC REGRESSION */}
<section className="section gray">
  <h2>Why Logistic Regression?</h2>
  <p>
    Logistic Regression was chosen for this project because it is efficient,
    interpretable, and well-suited for text classification tasks.
  </p>

  <ul>
    <li>Fast training and prediction</li>
    <li>Works well with high-dimensional text data</li>
    <li>Provides probability-based confidence scores</li>
    <li>Easy to deploy in real-time applications</li>
  </ul>
</section>

{/* BACKEND ARCHITECTURE */}
<section className="section">
  <h2 className="fade-in" style={{ animationDelay: '3.6s' }}>Backend Architecture</h2>
  <p className="fade-in" style={{ animationDelay: '3.8s' }}>
    The backend is built using <strong>FastAPI</strong>, a high-performance Python
    web framework. The trained machine learning model and vectorizer are loaded
    at runtime and exposed through a REST API endpoint.
  </p>

  <p className="fade-in" style={{ animationDelay: '4s' }}>
    When a user submits an email, the frontend sends the data to the FastAPI
    server, where it is processed and passed to the machine learning model
    for prediction.
  </p>
</section>

{/* USE CASES */}
<section className="section gray">
  <h2>Real-World Applications</h2>
  <ul>
    <li>Email security systems for individuals and organizations</li>
    <li>Spam and phishing filtering in email clients</li>
    <li>Cybersecurity awareness tools</li>
    <li>Educational demonstrations of ML-based security solutions</li>
  </ul>
</section>

{/* LIMITATIONS & FUTURE WORK */}
<section className="section">
  <h2 className="fade-in" style={{ animationDelay: '5s' }}>Limitations & Future Enhancements</h2>
  <p className="fade-in" style={{ animationDelay: '5.2s' }}>
    While the system performs well on known phishing patterns, it may struggle
    with newly evolving phishing techniques. Future improvements can enhance
    accuracy and robustness.
  </p>

  <ul className="fade-in" style={{ animationDelay: '5.4s' }}>
    <li>Training with larger and more diverse datasets</li>
    <li>Using advanced models such as Random Forest or Neural Networks</li>
    <li>URL and attachment analysis</li>
    <li>Multi-language phishing detection</li>
  </ul>
</section>


      {/* FOOTER */}
      <footer className="footer">
        <p className="fade-in" style={{ animationDelay: '5.6s' }}>© 2025 EmailGuard AI | ML + FastAPI + React</p>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<Analyze />} />
      </Routes>
    </BrowserRouter>
  );
}
