'use client';

import { useState, useEffect } from 'react';

export default function HourglassPage() {
    const [name, setName] = useState('');
    const [timeInput, setTimeInput] = useState(1); // in hours
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [duration, setDuration] = useState(0); // in seconds

    useEffect(() => {
        if (!isRunning || secondsLeft <= 0) return;

        const timer = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning, secondsLeft]);

    const startTimer = () => {
        if (timeInput > 0) {
            const totalSeconds = timeInput * 60 * 60; // hours to seconds
            setDuration(totalSeconds);
            setSecondsLeft(totalSeconds);
            setIsRunning(true);
        }
    };

    const formatTime = (secs: number) => {
        const hrs = Math.floor(secs / 3600).toString().padStart(2, '0');
        const min = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
        const sec = (secs % 60).toString().padStart(2, '0');
        return `${hrs}:${min}:${sec}`;
    };

    const AnimatedHourglass = ({ progress }: { progress: number }) => {
        const sandTopHeight = 40 * (1 - progress);
        const sandBottomHeight = 40 * progress;
        const sandFlowHeight = 10 * (1 - progress);

        return (
            <svg width="100" height="150" viewBox="0 0 100 150" className="mx-auto">
                <defs>
                    <linearGradient id="sandGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f472b6" />
                        <stop offset="100%" stopColor="#facc15" />
                    </linearGradient>
                </defs>
                <rect x="40" y="20" width="20" height="110" rx="10" fill="#f0abfc" />
                <rect
                    x="45"
                    y={25 + (40 - sandTopHeight)}
                    width="10"
                    height={sandTopHeight}
                    fill="url(#sandGradient)"
                />
                {progress < 1 && sandFlowHeight > 0 && (
                    <rect
                        x="49"
                        y="65"
                        width="2"
                        height={sandFlowHeight}
                        fill="url(#sandGradient)"
                    />
                )}
                <rect
                    x="45"
                    y={95 - sandBottomHeight}
                    width="10"
                    height={sandBottomHeight}
                    fill="url(#sandGradient)"
                />
            </svg>
        );
    };

    const progress = duration > 0 ? (1 - secondsLeft / duration) : 0;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-purple-100 p-4 text-center">
            <h1 className="text-4xl font-bold text-pink-500 mb-6">⏳ Magic Hourglass</h1>

            {!isRunning && (
                <div className="space-y-4 mb-6 w-full max-w-xs">
                    <input
                        type="text"
                        placeholder="What's your name?"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="px-4 py-2 rounded-full border border-pink-300 w-full text-center text-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />

                    <input
                        type="number"
                        step="0.1"
                        placeholder="Hours"
                        min={0.1}
                        value={timeInput}
                        onChange={(e) => setTimeInput(parseFloat(e.target.value))}
                        className="px-4 py-2 rounded-full border border-purple-300 w-full text-center text-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />

                    <button
                        onClick={startTimer}
                        className="bg-pink-400 hover:bg-pink-500 text-white font-semibold px-6 py-2 rounded-full w-full transition duration-200"
                    >
                        Start Hourglass
                    </button>
                </div>
            )}

            {isRunning && secondsLeft > 0 && (
                <div className="flex flex-col items-center space-y-6">
                    <AnimatedHourglass progress={progress} />
                    <p className="text-xl text-purple-600 font-semibold">
                        Time left: {formatTime(secondsLeft)}
                    </p>
                    <p className="text-lg text-pink-500">Hang in there, {name}!</p>
                </div>
            )}

            {isRunning && secondsLeft === 0 && (
                <div className="space-y-4">
                    <div className="text-5xl animate-bounce">🎉</div>
                    <p className="text-2xl font-bold text-pink-600">
                        Yay, {name}! You can take off your eye patch now!
                    </p>
                    <button
                        onClick={() => {
                            setIsRunning(false);
                            setName('');
                            setTimeInput(1);
                            setDuration(0);
                        }}
                        className="mt-4 bg-purple-400 hover:bg-purple-500 text-white font-semibold px-6 py-2 rounded-full transition duration-200"
                    >
                        Start Again
                    </button>
                </div>
            )}
        </div>
    );
}
