import React from 'react';

const FamilyDetails = ({ details }) => {
    return (
        <div style={{ border: '1px solid gray', padding: '10px', marginBottom: '20px' }}>
            <h2>Family Details</h2>
            <p><strong>Name:</strong> {details.name}</p>
            <p><strong>Total Income:</strong> {details.income}</p>
            <p><strong>Total Savings:</strong> {details.savings}</p>
            <p><strong>Total Spending:</strong> {details.totalSpending}</p>
            <p><strong>Highest Spender:</strong> {details.highestSpender}</p>
        </div>
    );
};

export default FamilyDetails;
