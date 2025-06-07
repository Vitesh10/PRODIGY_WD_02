import React from 'react';

interface LapTimeProps {
  lapNumber: number;
  time: number;
  formatTime: (milliseconds: number) => string;
  isLatest: boolean;
}

const LapTime: React.FC<LapTimeProps> = ({ lapNumber, time, formatTime, isLatest }) => {
  return (
    <div 
      className={`flex justify-between items-center p-3 rounded-lg transition-all duration-300 animate-fade-in ${
        isLatest 
          ? 'bg-blue-500/30 border border-blue-400/50' 
          : 'bg-white/5 hover:bg-white/10'
      }`}
    >
      <span className="text-slate-300 font-medium">
        Lap {lapNumber}
      </span>
      <span className="font-mono text-lg text-white font-semibold">
        {formatTime(time)}
      </span>
    </div>
  );
};

export default LapTime;
