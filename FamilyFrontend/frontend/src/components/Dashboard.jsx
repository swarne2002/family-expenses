import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [familyDetails, setFamilyDetails] = useState({});
  const [familyMembers, setFamilyMembers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [highestSpender, setHighestSpender] = useState(null);
  const [newMember, setNewMember] = useState({ email: "", firstname: "", lastname: "" });
  const [newTransaction, setNewTransaction] = useState({
    TransactionDate: "",
    Catagory: "",
    Amount: "",
  });

  const authHeader = { Authorization: `Bearer ${localStorage.getItem("authToken")}` };

  const fetchFamilyDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/family-details", {
        headers: authHeader,
      });
      setFamilyDetails(response.data.familyDetails);
    } catch (error) {
      console.error("Error fetching family details:", error);
    }
  };

  const fetchFamilyMembers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/member-contribution", {
        headers: authHeader,
      });
      setFamilyMembers(response.data.contributions);
    } catch (error) {
      console.error("Error fetching family members:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/transactions", {
        headers: authHeader,
      });
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchHighestSpender = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/highest-spender", {
        headers: authHeader,
      });
      setHighestSpender(response.data.highestSpender);
    } catch (error) {
      console.error("Error fetching highest spender:", error);
    }
  };

  useEffect(() => {
    fetchFamilyDetails();
    fetchFamilyMembers();
    fetchTransactions();
    fetchHighestSpender();
  }, []);

  const handleAddMember = async () => {
    try {
      await axios.post("http://localhost:3000/user/add", newMember, { headers: authHeader });
      alert("New family member added successfully!");
      setNewMember({ email: "", firstname: "", lastname: "" });
      fetchFamilyMembers();
      fetchFamilyDetails();
    } catch (error) {
      console.error("Error adding new family member:", error);
    }
  };

  const handleAddTransaction = async () => {
    try {
      await axios.post("http://localhost:3000/transaction/addtransaction", newTransaction, {
        headers: authHeader,
      });
      alert("Transaction added successfully!");
      setNewTransaction({ TransactionDate: "", Catagory: "", Amount: "" });
      fetchTransactions();
      fetchFamilyDetails();
      fetchFamilyMembers();
      fetchHighestSpender();
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Family Details */}
      <div>
        <h1>Family Dashboard</h1>
        <div style={{ background: "#f9f9f9", padding: "15px", borderRadius: "5px", marginBottom: "20px" }}>
          <p><strong>Family ID:</strong> {familyDetails.id}</p>
          <p><strong>Income:</strong> ₹{familyDetails.income}</p>
          <p><strong>Savings:</strong> ₹{familyDetails.savings}</p>
          <p><strong>Total Expenses:</strong> ₹{familyDetails.totalExpenses}</p>
          <p><strong>Total Spending:</strong> ₹{familyDetails.TotalSpending}</p>
          <p><strong>Number of Dependents:</strong> {familyDetails.Dependent}</p>
        </div>
      </div>

      {/* Family Members */}
      <div>
        <h2>Family Members</h2>
        <ul>
          {familyMembers.map((member) => (
            <li key={member.memberId}>
              {member.firstname} {member.lastname} - ₹{member.amount} ({member.percentage}%)
            </li>
          ))}
        </ul>
        <div>
          <h3>Add New Member</h3>
          <input
            type="text"
            placeholder="Email"
            value={newMember.email}
            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="First Name"
            value={newMember.firstname}
            onChange={(e) => setNewMember({ ...newMember, firstname: e.target.value })}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newMember.lastname}
            onChange={(e) => setNewMember({ ...newMember, lastname: e.target.value })}
          />
          <button onClick={handleAddMember}>Add Member</button>
        </div>
      </div>

      {/* Transactions */}
      <div>
        <h2>Transactions</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.TransactionDate} - {transaction.Catagory} - ₹{transaction.Amount}
            </li>
          ))}
        </ul>
        <div>
          <h3>Add New Transaction</h3>
          <input
            type="date"
            value={newTransaction.TransactionDate}
            onChange={(e) => setNewTransaction({ ...newTransaction, TransactionDate: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={newTransaction.Catagory}
            onChange={(e) => setNewTransaction({ ...newTransaction, Catagory: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            value={newTransaction.Amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, Amount: parseInt(e.target.value) })}
          />
          <button onClick={handleAddTransaction}>Add Transaction</button>
        </div>
      </div>

      {/* Highest Spender */}
      <div>
        <h2>Highest Spender</h2>
        {highestSpender ? (
          <p>
            {highestSpender.firstname} {highestSpender.lastname} - ₹{highestSpender.totalSpending}
          </p>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
