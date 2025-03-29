import { useState } from "react";
import { useHistoryStore } from '../store/useHistoryStore';
import { useAuthStore } from '../store/useAuthStore';

function HomePage() {
  const { authUser } = useAuthStore();
  const { addHistory } = useHistoryStore();
  const [formData, setFormData] = useState({
    UPDRS: "",
    Tremor: "",
    FunctionalAssessment: "",
    MoCA: "",
    Rigidity: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to determine Parkinson’s stage
  function determineParkinsonStage(probability) {
    const probPercentage = probability * 100;
    if (probPercentage >= 35 && probPercentage < 45) {
      return "Stage 1: Mild symptoms, typically affecting one side of the body with minimal impact on daily life.";
    } else if (probPercentage >= 45 && probPercentage < 55) {
      return "Stage 2: Moderate symptoms affecting both sides of the body, balance is generally not affected.";
    } else if (probPercentage >= 55 && probPercentage < 65) {
      return "Stage 3: Significant symptoms with balance problems, difficulty in movement, and risk of falls.";
    } else if (probPercentage >= 65 && probPercentage < 85) {
      return "Stage 4: Severe symptoms, requiring assistance with daily activities and limited ability to walk.";
    } else if (probPercentage >= 85) {
      return "Stage 5: Advanced stage, full-time assistance needed, may be bedridden or wheelchair-bound.";
    } else {
      return "No significant symptoms detected.";
    }
  }
  
  


  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const requestData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, parseFloat(value)])
      );

      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      const stage = determineParkinsonStage(data.probability);

      setResult({
        prediction: data.prediction,
        probability: data.probability,
        stage: stage,
      });

      // Save to history
      await addHistory(authUser.token, formData, data.prediction, data.probability, stage);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-10 bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-md lg:text-2xl font-bold mt-2 mb-4 text-center text-gray-800">
          Parkinson’s Diagnosis Prediction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-gray-700 text-sm lg:text-lg font-medium">{key}</label>
              <input
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
                step="any"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 flex justify-center"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {error && (
          <div className="mt-4 text-center p-3 bg-red-100 text-red-800 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <div
            className={`mt-4 text-center p-3 rounded ${result.prediction === 1 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
              }`}
          >
            <strong>Diagnosis: </strong>
            <span className={result.prediction === 1 ? "text-red-600 font-bold" : "text-green-700 font-bold"}>
              {result.prediction === 1 ? "Affected" : "Not Affected"}
            </span>
            <br />

            {/* Show Probability and Stage only if the patient is affected */}
            {result.prediction === 1 && (
              <>
                <strong>Probability:</strong> {(result.probability * 100).toFixed(2)}%
                <br />
                <strong>Stage:</strong> {result.stage}
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default HomePage;
