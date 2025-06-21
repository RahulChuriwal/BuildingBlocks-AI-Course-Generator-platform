import React from 'react';

function WelcomeBanner() {
  return (
    <div
      className="rounded-2xl px-6 py-5 text-orange-900 shadow-sm"
      style={{
        background: 'linear-gradient(135deg, #FFF7ED, #FFE8CC, #FFD8A8)',
      }}
    >
      <h2 className="text-2xl font-bold mb-1">Welcome to the Online learning platform!</h2>
      <p className="text-md font-medium">
        Empower your future — start learning something new today!
      </p>
    </div>
  );
}

export default WelcomeBanner;
