import React from 'react';

const TransactionList = ({ transactions }) => {
    return (
        <div style={{ border: '1px solid gray', padding: '10px', marginBottom: '20px' }}>
            <h2>Transactions</h2>
            {transactions.map((transaction) => (
                <div key={transaction.id}>
                    <p><strong>Date:</strong> {transaction.date}</p>
                    <p><strong>Category:</strong> {transaction.category}</p>
                    <p><strong>Amount:</strong> {transaction.amount}</p>
                </div>
            ))}
        </div>
    );
};

export default TransactionList;
