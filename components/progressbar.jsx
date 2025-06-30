import React from 'react';

const ProgressBar = ({ currentPage, totalPages }) => {
  const percent = Math.round((currentPage / totalPages) * 100);

  return (
    <div style={{ marginTop: '0.5rem' }}>
      <div style={{ backgroundColor: '#eee', height: '10px', borderRadius: '5px' }}>
        <div style={{ width: `${percent}%`, backgroundColor: '#3f51b5', height: '100%', borderRadius: '5px' }} />
      </div>
      <p>{percent}%</p>
    </div>
  );
};

export default ProgressBar;
