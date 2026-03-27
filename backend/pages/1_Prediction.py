import os
import streamlit as st
import joblib

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

model = joblib.load(os.path.join(BASE_DIR, "model.pkl"))
vectorizer = joblib.load(os.path.join(BASE_DIR, "vectorizer.pkl"))

st.set_page_config(page_title="Email Analysis", page_icon="🔐")

st.title("🔐 Email Phishing Analysis")

email_text = st.text_area(
    "📨 Paste Email Content Here",
    height=220,
    placeholder="Paste the full email message..."
)

def detect_indicators(text):
    keywords = [
        "urgent", "verify", "account", "password",
        "click", "login", "bank", "invoice", "suspended"
    ]
    return [k for k in keywords if k in text.lower()]

if st.button("Analyze Email"):
    if email_text.strip() == "":
        st.warning("Please paste an email message")
    else:
        vec_data = vectorizer.transform([email_text])
        prediction = model.predict(vec_data)[0]
        confidence = model.predict_proba(vec_data).max() * 100
        indicators = detect_indicators(email_text)

        if prediction > 50:
            st.success(f"✅ Legitimate Email ({confidence:.2f}%)")
            st.write("This email does not show common phishing characteristics.")
        else:
            st.error(f"🚨 Possibel Phishing Email({confidence:.2f}%)")
            st.write("This email strongly matches known phishing patterns.")
            st.warning("⚠️ Be cautious! Do not click any links or provide sensitive information.")
            st.info("🔃Model can sometimes misclassify emails. Always verify the sender.")

        st.markdown("### 🔍 Detected Indicators")
        if indicators:
            st.write(", ".join(indicators))
        else:
            st.write("No obvious phishing keywords detected")

        st.markdown("### 🛡 Recommended Action")
        if prediction == 1:
            st.write("- Do NOT click links\n- Do NOT reply\n- Report as phishing")
        else:
            st.write("- Safe to read\n- Still verify sender")

if st.button("⬅ Back to Home"):
    st.switch_page("app.py")
