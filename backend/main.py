import os
import joblib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model = joblib.load(os.path.join(BASE_DIR, "model.pkl"))
vectorizer = joblib.load(os.path.join(BASE_DIR, "vectorizer.pkl"))

app = FastAPI(title="Email Phishing Detector API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://emailguard-ai.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EmailRequest(BaseModel):
    email_text: str

def detect_indicators(text):
    keywords = [
        "urgent", "verify", "account", "password",
        "click", "login", "bank", "invoice", "suspended"
    ]
    return [k for k in keywords if k in text.lower()]

def explain_suspicion(text):
    reasons = []

    patterns = {
        "Urgency language detected": ["urgent", "immediately", "act now"],
        "Account-related threat": ["account", "suspended", "locked"],
        "Credential request": ["password", "verify", "login", "otp"],
        "Financial lure": ["bank", "invoice", "payment"],
        "Suspicious action request": ["click", "link", "download"]
    }

    lower_text = text.lower()

    for reason, words in patterns.items():
        matched = [w for w in words if w in lower_text]
        if matched:
            reasons.append({
                "reason": reason,
                "matched_words": matched
            })

    return reasons

@app.post("/predict")
def predict_email(data: EmailRequest):
    vec = vectorizer.transform([data.email_text])
    prediction = model.predict(vec)[0]
    confidence = model.predict_proba(vec).max() * 100

    return {
        "prediction": "Phishing" if prediction == 1 else "Legitimate",
        "confidence": round(confidence, 2),
        "indicators": detect_indicators(data.email_text),
        "explanations": explain_suspicion(data.email_text)
    }
