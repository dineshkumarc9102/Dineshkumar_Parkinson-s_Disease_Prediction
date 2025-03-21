from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import logging

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Configure logging
logging.basicConfig(level=logging.INFO)

# Load trained model and scaler
try:
    model = joblib.load("./model.pkl")  # Update filename if needed
    scaler = joblib.load("./scaler.pkl")  # Load the scaler if features are normalized
    logging.info("Model and scaler loaded successfully.")
except Exception as e:
    logging.error(f"Error loading model/scaler: {e}")
    model, scaler = None, None

@app.route("/predict", methods=["POST"])
def predict():
    """Predicts Parkinson's diagnosis based on user input."""
    try:
        data = request.json  # Receive JSON data from frontend
        logging.info(f"Received data: {data}")

        # Ensure required fields exist
        required_fields = ["UPDRS", "Tremor", "FunctionalAssessment", "MoCA", "Rigidity"]
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing one or more required input fields."}), 400

        # Convert input to NumPy array
        features = np.array([[data["UPDRS"], data["Tremor"], data["FunctionalAssessment"], data["MoCA"], data["Rigidity"]]])
        
        # Apply feature scaling (if needed)
        if scaler:
            features = scaler.transform(features)

        # Predict diagnosis
        prediction_prob = model.predict_proba(features)[:, 1]  # Get probability of class 1
        threshold = 0.4  # Adjust threshold if needed
        prediction = int(prediction_prob >= threshold)  # Apply threshold

        logging.info(f"Prediction: {prediction}, Probability: {prediction_prob}")

        return jsonify({"prediction": prediction, "probability": round(float(prediction_prob[0]), 4)})

    except Exception as e:
        logging.error(f"Prediction error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
