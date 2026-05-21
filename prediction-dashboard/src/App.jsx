import SalaryForm from "./components/SalaryForm";

function App() {
  return (
    <div className="app">
      <h1>Salary Prediction Dashboard</h1>
      <p>Enter job details to predict the salary score.</p>
      <SalaryForm />
    </div>
  );
}

export default App;