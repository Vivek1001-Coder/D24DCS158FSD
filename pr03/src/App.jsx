import { useState, useEffect } from 'react';
import './App.css';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="bg-black bg-opacity-20 backdrop-blur-md  rounded-2xl shadow-[0_0_30px_rgba(0,0,255,0.6)] p-6 text-center w-[320px]">
      <h2 className="text-4xl font-mono text-blue-400 mb-2 animate-pulse drop-shadow-[0_0_10px_rgba(0,0,255,0.8)]">
        {time.toLocaleTimeString()}
      </h2>
      <h2 className="text-lg text-blue-300 font-light drop-shadow-[0_0_5px_rgba(0,0,255,0.6)]">
        {time.toLocaleDateString()}
      </h2>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-black-900 flex items-center justify-center text-center px-4">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-5xl font-extrabold text-white-500 drop-shadow-[0px_0px_39px_rgba(255,0,123,0.9)]">
          Welcome to Charusat!
        </h1>
        <Clock />
      </div>
    </div>
  );
}

export default App;
