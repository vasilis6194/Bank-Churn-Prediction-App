import React, { useState } from 'react';
import './App.css';

// Files for the Presentation page
const files = [
  { name: '1', path: '/sources/grafima_pelates.html' },
  { name: '2', path: '/sources/grafima_pelates_pososto.html' },
  { name: '3', path: '/sources/grafima_gender_pososto.html' },
  { name: '4', path: '/sources/grafima_gender_exited.html' },
  { name: '5', path: '/sources/correlation_matrix_plotly.html' },
  { name: '6', path: '/sources/grafima_pelates_anaxwra.html' },
  { name: '7', path: '/sources/grafima_ypoloipo_ana_xwra_exited.html' },
  { name: '8', path: '/sources/grafima_misthos_exited.html' },
  { name: '9', path: '/sources/grafima_hlikia_efygan.html' },
  { name: '10', path: '/sources/grafima_hlikia_emeinan.html' },
  { name: '11', path: '/sources/grafima_pososto_ana_arithmo_proiontvn_exited.html' }
];

function Presentation() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % files.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? files.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="content">
      <h2>Analytics Presentation</h2>
      <div className="viewer">
        <iframe
          title="HTML Viewer"
          src={`${window.location.origin}${files[currentIndex].path}`}
          className="iframe-viewer"
        />
      </div>
      <div className="controls">
        <button className="control-button" onClick={handlePrev}>
          Previous
        </button>
        <div className="file-info">
          <span className="file-name">{files[currentIndex].name}</span>
          <span className="file-index">
            ({currentIndex + 1} of {files.length})
          </span>
        </div>
        <button className="control-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="content about-container">
      <h2>About Churnflix</h2>
      
      <div className="hero-section">
        <img
          src="/images/bank-churn-hero.jpg"
          alt="Bank Churn Hero"
          className="hero-image"
        />
        <div className="hero-overlay">
          <p>
            Churnflix is a bank churn prediction app that uses advanced machine
            learning algorithms to help identify which customers are likely to
            leave your bank. With Churnflix, you can stay ahead of customer
            churn, optimize your retention strategy, and enhance customer
            satisfaction.
          </p>
        </div>
      </div>
      
      <div className="info-cards">
        <div className="card">
          <h3>What is Churn?</h3>
          <p>
            Churn is the phenomenon where customers end their relationship with
            a company. In the banking sector, churn often means customers
            closing their accounts or moving their deposits elsewhere.
          </p>
        </div>
        
        <div className="card">
          <h3>Why It Matters</h3>
          <p>
            Reducing churn is a top priority for banks, as acquiring new
            customers is usually more expensive than retaining existing ones. By
            understanding churn, banks can focus on loyalty programs, targeted
            marketing, and improved customer service.
          </p>
        </div>
        
        <div className="card">
          <h3>How Churnflix Helps</h3>
          <p>
            Churnflix leverages machine learning models to analyze key customer
            data like credit scores, transaction patterns, and demographics.
            This allows you to predict churn in real-time, giving you the
            insights needed to act before customers decide to leave.
          </p>
        </div>
      </div>
    </div>
  );
}

function Predictions() {
  const [formData, setFormData] = useState({
    creditScore: '',
    geography: 'France',
    gender: 'Female',
    age: '',
    tenure: '',
    balance: '',
    numOfProducts: '',
    hasCrCard: false,
    isActiveMember: false,
    estimatedSalary: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPrediction(null);

    // Convert numeric fields and adjust boolean fields
    const payload = {
      CreditScore: Number(formData.creditScore),
      Geography: formData.geography,
      Gender: formData.gender,
      Age: Number(formData.age),
      Tenure: Number(formData.tenure),
      Balance: Number(formData.balance),
      NumOfProducts: Number(formData.numOfProducts),
      HasCrCard: formData.hasCrCard ? 1 : 0,
      IsActiveMember: formData.isActiveMember ? 1 : 0,
      EstimatedSalary: Number(formData.estimatedSalary)
    };

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }
      const result = await response.json();
      setPrediction(result);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="content">
      <h2>Customer Churn Prediction</h2>
      
      {/* Container to style the form nicely */}
      <div className="prediction-form-container">
        <form className="prediction-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Credit Score</label>
            <input
              type="number"
              name="creditScore"
              value={formData.creditScore}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Geography</label>
            <select
              name="geography"
              value={formData.geography}
              onChange={handleChange}
            >
              <option value="France">France</option>
              <option value="Spain">Spain</option>
              <option value="Germany">Germany</option>
            </select>
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Tenure (years)</label>
            <input
              type="number"
              name="tenure"
              value={formData.tenure}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Balance</label>
            <input
              type="number"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Number of Products</label>
            <input
              type="number"
              name="numOfProducts"
              value={formData.numOfProducts}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Estimated Salary</label>
            <input
              type="number"
              name="estimatedSalary"
              value={formData.estimatedSalary}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="hasCrCard"
                checked={formData.hasCrCard}
                onChange={handleChange}
              />
              Has Credit Card
            </label>
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isActiveMember"
                checked={formData.isActiveMember}
                onChange={handleChange}
              />
              Is Active Member
            </label>
          </div>
          {/* This div spans across both columns to center the button */}
          <div className="form-actions">
            <button type="submit" className="control-button" disabled={loading}>
              {loading ? 'Predicting...' : 'Predict'}
            </button>
          </div>
        </form>
      </div>
      

      {error && <p className="error-message">{error}</p>}
      {prediction && (
        <div className="prediction-result">
          <h3>Prediction Result:</h3>
          <p>
            {prediction.will_exit
              ? 'The customer is likely to exit.'
              : 'The customer is unlikely to exit.'}
          </p>
        </div>
      )}
    </div>
  );
}


function App() {
  const [activePage, setActivePage] = useState('presentation'); 

  const renderPage = () => {
    if (activePage === 'presentation') return <Presentation />;
    if (activePage === 'predictions') return <Predictions />;
    if (activePage === 'about') return <About />;
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo">
          <h1>Churnflix</h1>
        </div>
        <nav className="menu">
          <ul>
          <li
              className={activePage === 'about' ? 'active' : ''}
              onClick={() => setActivePage('about')}
            >
              Home
            </li>
            <li
              className={activePage === 'presentation' ? 'active' : ''}
              onClick={() => setActivePage('presentation')}
            >
              Analytics
            </li>
            <li
              className={activePage === 'predictions' ? 'active' : ''}
              onClick={() => setActivePage('predictions')}
            >
              Predictions
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">{renderPage()}</main>
    </div>
  );
}

export default App;
