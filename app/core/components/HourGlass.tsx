'use client';

import { useState } from 'react';
import StartForm from './StartForm';
import HourglassTimer from './HourglassTimer';

export default function HourglassPage() {
    const [name, setName] = useState('');
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(1);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [start, setStart] = useState(false);

    const handleStart = () => {
        const total = hours * 3600 + minutes * 60;
        if (total > 0) {
            setTotalSeconds(total);
            setStart(true);
        }
    };

    const handleReset = () => {
        setName('');
        setHours(0);
        setMinutes(1);
        setStart(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-purple-100 p-4 text-center">
            <h1 className="text-4xl font-bold text-pink-500 mb-6">⏳ Magische Sanduhr ⏳</h1>

            {!start ? (
                <StartForm
                    name={name}
                    setName={setName}
                    hours={hours}
                    setHours={setHours}
                    minutes={minutes}
                    setMinutes={setMinutes}
                    onStart={handleStart}
                />
            ) : (
                <HourglassTimer
                    name={name}
                    totalSeconds={totalSeconds}
                    onReset={handleReset}
                />
            )}
        </div>
    );
}
