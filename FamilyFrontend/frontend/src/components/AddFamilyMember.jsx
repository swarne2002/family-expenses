import React, { useState } from 'react';
import { addFamilyMember } from '../utils/api';

const AddFamilyMember = ({ onSuccess }) => {
    const [formData, setFormData] = useState({ name: '', email: '', spending: 0 });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addFamilyMember(formData);
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
            <h3>Add Family Member</h3>
            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
                type="number"
                placeholder="Spending"
                value={formData.spending}
                onChange={(e) => setFormData({ ...formData, spending: e.target.value })}
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddFamilyMember;
