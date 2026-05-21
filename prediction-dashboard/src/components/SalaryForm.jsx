import { useState } from "react";
import axios from "axios";

function SalaryForm() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    experience: "",
    companyType: "",
    industry: "",
    skills: "",
    city: "",
    workMode: "",
    education: ""
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setPrediction(null);
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData
      );

      setPrediction(response.data.predicted_salary);
    } catch (err) {
      setError("Prediction failed. Check backend or model.");
    }
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>

        {/* Job Title */}
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={formData.jobTitle}
          onChange={handleChange}
          required
        />

        {/* Experience */}
        <input
          type="number"
          name="experience"
          placeholder="Years of Experience"
          value={formData.experience}
          onChange={handleChange}
          required
        />

        {/* Company Type */}
        <select
          name="companyType"
          value={formData.companyType}
          onChange={handleChange}
          required
        >
          <option value="">Select Company Type</option>
          <option value="Start Up">Start Up</option>
          <option value="Indian Unicorn">Indian Unicorn</option>
          <option value="MNC">MNC</option>
          <option value="PSU/Govt">PSU/Govt</option>
        </select>

        {/* Industry */}
        <select
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          required
        >
          <option value="">Select Industry</option>
          <option value="Information Technology">
            Information Technology
          </option>
          <option value="E-Commerce">E-Commerce</option>
          <option value="Banking & Finance">
            Banking & Finance
          </option>
          <option value="EdTech">EdTech</option>
          <option value="HealthTech">HealthTech</option>
        </select>

        {/* Skills */}
        <input
          type="text"
          name="skills"
          placeholder="Skills"
          value={formData.skills}
          onChange={handleChange}
          required
        />

        {/* City */}
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        >
          <option value="">Select City</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Chennai">Chennai</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Jaipur">Jaipur</option>
        </select>

        {/* Work Mode */}
        <select
          name="workMode"
          value={formData.workMode}
          onChange={handleChange}
          required
        >
          <option value="">Select Work Mode</option>
          <option value="Remote">Remote</option>
          <option value="On-site">On-site</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        {/* Education */}
        <input
          type="text"
          name="education"
          placeholder="Education"
          value={formData.education}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Predict Salary
        </button>
      </form>

      {prediction && (
        <div className="result">
          Predicted Salary: ₹ {prediction}
        </div>
      )}

      {error && (
        <div className="error">
          {error}
        </div>
      )}
    </div>
  );
}

export default SalaryForm;