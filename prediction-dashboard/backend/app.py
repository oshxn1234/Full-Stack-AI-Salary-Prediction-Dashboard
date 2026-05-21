from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# Model path
MODEL_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "model",
    "salary_model.pkl"
)

# Load model
model = joblib.load(MODEL_PATH)

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Salary Prediction API is running"
    })

@app.route("/predict", methods=["POST"])
def predict_salary():
    try:
        data = request.json

        input_data = pd.DataFrame([{
            "Job Title": data["jobTitle"],
            "Experience": float(data["experience"]),
            "Company Type": data["companyType"],
            "Industry": data["industry"],
            "Skills": data["skills"],
            "City": data["city"],
            "Work Mode": data["workMode"],
            "Education": data["education"]
        }])

        prediction = model.predict(input_data)[0]

        return jsonify({
            "predicted_salary": round(float(prediction), 2)
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 400

if __name__ == "__main__":
    app.run(debug=True)