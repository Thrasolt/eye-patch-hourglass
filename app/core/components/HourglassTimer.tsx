'use client';
import { useState, useEffect } from 'react';
import HourglassSVG from './HourglassSVG';

type HourglassTimerProps = {
    name: string;
    totalSeconds: number;
    onReset: () => void;
};

export default function HourglassTimer({ name, totalSeconds, onReset }: HourglassTimerProps) {
    const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
    const [duration] = useState(totalSeconds);

    useEffect(() => {
        if (secondsLeft <= 0) {
            // Erzeuge einen kurzen Piepton mit der Web Audio API
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            const audioCtx = new AudioContext();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.type = 'sine'; // Du kannst auch 'square' oder 'triangle' verwenden
            oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A4 (440 Hz)
            oscillator.start();

            // Stoppe den Ton nach 0,5 Sekunden
            oscillator.stop(audioCtx.currentTime + 0.5);
            return;
        }

        const timer = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [secondsLeft]);

    const formatTime = (secs: number) => {
        const hrs = Math.floor(secs / 3600).toString().padStart(2, '0');
        const min = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
        const sec = (secs % 60).toString().padStart(2, '0');
        return `${hrs}:${min}:${sec}`;
    };

    const progress = duration > 0 ? 1 - secondsLeft / duration : 0;

    return secondsLeft > 0 ? (
        <div className="flex flex-col items-center space-y-6">
            <HourglassSVG progress={progress} />
            <p className="text-xl text-purple-600 font-semibold">
                Verbleibende Zeit: {formatTime(secondsLeft)}
            </p>
            <p className="text-lg text-pink-500">Halte durch, {name}!</p>
        </div>
    ) : (
        <div className="space-y-4">
            <div className="text-5xl animate-bounce">🎉</div>
            <p className="text-2xl font-bold text-pink-600">
                Hurra, {name}! Du kannst jetzt deine Augenklappe abnehmen!
            </p>
            <button
                onClick={onReset}
                className="mt-4 bg-purple-400 hover:bg-purple-500 text-white font-semibold px-6 py-2 rounded-full transition duration-200"
            >
                Nochmal starten
            </button>
        </div>
    );
}
