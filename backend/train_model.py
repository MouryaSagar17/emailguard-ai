import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report

# Load dataset
df = pd.read_csv("phishing_dataset.csv")

X = df["text_combined"]
y = df["label"]  # 0 = Legitimate, 1 = Phishing

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Vectorization
vectorizer = TfidfVectorizer(
    stop_words="english",
    max_features=5000
)

X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# Model
model = LogisticRegression(max_iter=1000)
model.fit(X_train_vec, y_train)

# Evaluation
preds = model.predict(X_test_vec)
acc = accuracy_score(y_test, preds)
precision = precision_score(y_test, preds, pos_label=1)
recall = recall_score(y_test, preds, pos_label=1)
f1 = f1_score(y_test, preds, pos_label=1)
report = classification_report(y_test, preds)

print(f"✅ Model Accuracy: {acc * 100:.2f}%")
print("--- Performance Summary ---")
print(f"Precision: {precision:.4f}")
print(f"Recall:    {recall:.4f}")
print(f"F1 Score:  {f1:.4f}")
print("\n--- Full Classification Report ---")
print(report)

# Save model
joblib.dump(model, "model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")
print("✅ Phishing detection model trained and saved")
