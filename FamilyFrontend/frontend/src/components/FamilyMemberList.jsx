import React from 'react';

const FamilyMemberList = ({ members }) => {
    return (
        <div style={{ border: '1px solid gray', padding: '10px', marginBottom: '20px' }}>
            <h2>Family Members</h2>
            {members.map((member) => (
                <div key={member.id}>
                    <p><strong>Name:</strong> {member.name}</p>
                    <p><strong>Spending:</strong> {member.spending}</p>
                    <p><strong>Percentage:</strong> {member.percentage}%</p>
                </div>
            ))}
        </div>
    );
};

export default FamilyMemberList;
