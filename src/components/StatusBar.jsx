import React, { useState, useEffect } from 'react';
import { Signal, Wifi, Battery } from 'lucide-react';

const StatusBar = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="status-bar" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 24px',
      height: '44px',
      fontSize: '15px',
      fontWeight: '600',
      background: 'white'
    }}>
      <div className="left">{time}</div>
      <div className="right" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <Signal size={18} fill="currentColor" strokeWidth={2.5} />
        <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '-0.5px' }}>5G</span>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Battery size={24} strokeWidth={1.5} />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '3px',
            transform: 'translateY(-50%)',
            width: '14px',
            height: '7px',
            background: '#000',
            borderRadius: '1px'
          }} />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
