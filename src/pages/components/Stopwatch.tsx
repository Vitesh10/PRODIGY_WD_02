import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import LapTime from './LapTime';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState<number[]>([]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const formatTime = useCallback((milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  }, []);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setLapTimes([]);
  };

  const handleLap = () => {
    if (isRunning && time > 0) {
      setLapTimes(prev => [...prev, time]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
          Stopwatch
        </h1>
        <p className="text-slate-300 animate-fade-in">
          Precision timing at your fingertips
        </p>
      </div>

      {/* Main Stopwatch Display */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8 animate-scale-in">
        <div className="text-center">
          <div className="text-6xl md:text-7xl font-mono font-bold text-white mb-8 tracking-wider">
            {formatTime(time)}
          </div>
          
          {/* Control Buttons */}
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              onClick={handleStartStop}
              size="lg"
              className={`px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 ${
                isRunning
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-6 h-6 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-6 h-6 mr-2" />
                  Start
                </>
              )}
            </Button>

            <Button
              onClick={handleReset}
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg font-semibold bg-white/10 border-white/30 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <RotateCcw className="w-6 h-6 mr-2" />
              Reset
            </Button>
          </div>

          {/* Lap Button */}
          <Button
            onClick={handleLap}
            disabled={!isRunning || time === 0}
            variant="outline"
            className="px-6 py-3 bg-blue-500/20 border-blue-400/50 text-blue-200 hover:bg-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
          >
            <Flag className="w-5 h-5 mr-2" />
            Lap
          </Button>
        </div>
      </Card>

      {/* Lap Times */}
      {lapTimes.length > 0 && (
        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 animate-fade-in">
          <h3 className="text-xl font-semibold text-white mb-4 text-center">
            Lap Times
          </h3>
          <div className="max-h-64 overflow-y-auto space-y-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
            {lapTimes.map((lapTime, index) => (
              <LapTime
                key={index}
                lapNumber={index + 1}
                time={lapTime}
                formatTime={formatTime}
                isLatest={index === lapTimes.length - 1}
              />
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Stopwatch;
