import React, { useState } from 'react';
import { addTransaction } from '../utils/api';

const AddTransaction = ({ onSuccess }) => {
    const [formData, setFormData] = useState({ date: '', category: '', amount: 0 });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addTransaction(formData);
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
            <h3>Add Transaction</h3>
            <input
                type="text"
                placeholder="Date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
            <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
            <input
                type="number"
                placeholder="Amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddTransaction;
