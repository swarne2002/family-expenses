import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    income: '',
    savings: '',
    MonthlyExpenses: '',
    LoanPayment: '',
    CreditCardPayment: '',
    FinancialGoalsMet: ''
  });
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert fields to numbers where needed
    const updatedFormData = {
      ...formData,
      income: parseFloat(formData.income),
      savings: parseFloat(formData.savings),
      MonthlyExpenses: parseFloat(formData.MonthlyExpenses),
      LoanPayment: parseFloat(formData.LoanPayment),
      CreditCardPayment: parseFloat(formData.CreditCardPayment),
      FinancialGoalsMet: parseFloat(formData.FinancialGoalsMet),
    };
  
    try {
      const response = await fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        navigate('/signin'); // Redirect to signin after successful signup
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('An error occurred while signing up.');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
      {/* Navbar */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: '#2D4263',
          color: '#fff',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '24px' }}>FamilyFinanceHub</h1>
        <div>
          <button
            style={{
              marginRight: '10px',
              padding: '8px 16px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#1E90FF',
              color: '#fff',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/signin')}
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Signup Form */}
      <section
        style={{
          textAlign: 'center',
          padding: '50px 20px',
          backgroundColor: '#EEF2F3',
        }}
      >
        <h2 style={{ fontSize: '36px', color: '#2D4263' }}>
          Create an Account
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '500px',
            margin: '20px auto',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First Name"
            required
            style={{
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            required
            style={{
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            style={{
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            style={{
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="number"
            name="income"
            value={formData.income}
            onChange={handleChange}
            placeholder="Income"
            required
            style={{
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="number"
            name="savings"
            value={formData.savings}
            onChange={handleChange}
            placeholder="Savings"
            required
            style={{
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="number"
            name="MonthlyExpenses"
            value={formData.MonthlyExpenses}
            onChange={handleChange}
            placeholder="Monthly Expenses"
            required
            style={{
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="number"
            name="LoanPayment"
            value={formData.LoanPayment}
            onChange={handleChange}
            placeholder="Loan Payment"
            required
            style={{
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="number"
            name="CreditCardPayment"
            value={formData.CreditCardPayment}
            onChange={handleChange}
            placeholder="Credit Card Payment"
            required
            style={{
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="number"
            name="FinancialGoalsMet"
            value={formData.FinancialGoalsMet}
            onChange={handleChange}
            placeholder="Financial Goals Met"
            required
            style={{
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          {error && (
            <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              fontSize: '18px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#1E90FF',
              color: '#fff',
              cursor: 'pointer',
              marginTop: '20px',
            }}
          >
            Sign Up
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: 'center',
          padding: '10px 20px',
          backgroundColor: '#2D4263',
          color: '#fff',
        }}
      >
        <p style={{ margin: 0 }}>© 2024 FamilyFinanceHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Signup;
