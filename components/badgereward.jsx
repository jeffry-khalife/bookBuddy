import React from 'react';

const BadgeReward = ({ label, icon }) => {
  return (
    <div className="badge" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem', background: '#ffd700', borderRadius: '20px', margin: '0.5rem' }}>
      {icon && <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>{icon}</span>}
      <strong>{label}</strong>
    </div>
  );
};

export default BadgeReward;
