import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: 0, padding: 0 }}>
      {/* Navbar */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#2D4263",
          color: "#fff",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "24px" }}>FamilyFinanceHub</h1>
        <div>
          <button
            onClick={() => navigate("/signup")}
            style={{
              marginRight: "10px",
              padding: "8px 16px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#1E90FF",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/signin")}
            style={{
              padding: "8px 16px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#FFD700",
              color: "#000",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          padding: "50px 20px",
          backgroundColor: "#EEF2F3",
        }}
      >
        <h2 style={{ fontSize: "36px", color: "#2D4263" }}>
          Simplify Your Family Finances
        </h2>
        <p
          style={{
            fontSize: "18px",
            color: "#555",
            maxWidth: "600px",
            margin: "20px auto",
          }}
        >
          Track expenses, manage budgets, and achieve your financial goals with
          ease. FamilyFinanceHub helps you stay in control of your family's
          financial well-being.
        </p>
        <button
          onClick={() => navigate("/signup")}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            fontSize: "18px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#1E90FF",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "10px 20px",
          backgroundColor: "#2D4263",
          color: "#fff",
        }}
      >
        <p style={{ margin: 0 }}>© 2024 FamilyFinanceHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
