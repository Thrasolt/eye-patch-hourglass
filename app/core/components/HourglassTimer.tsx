'use client';
import { useState, useEffect, useRef } from 'react';
import HourglassSVG from './HourglassSVG';

type HourglassTimerProps = {
    name: string;
    totalSeconds: number;
    onReset: () => void;
};

export default function HourglassTimer({ name, totalSeconds, onReset }: HourglassTimerProps) {
    const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
    const [duration] = useState(totalSeconds);
    const startTimeRef = useRef<number | null>(null);
    const requestRef = useRef<number | null>(null);

    // Accurate time tracking
    const updateTimer = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;

        const elapsedMs = timestamp - startTimeRef.current;
        const elapsedSeconds = Math.floor(elapsedMs / 1000);
        const remaining = Math.max(duration - elapsedSeconds, 0);

        setSecondsLeft(remaining);

        if (remaining > 0) {
            requestRef.current = requestAnimationFrame(updateTimer);
        } else {
            playBeep();
        }
    };

    // Start the animation loop
    useEffect(() => {
        requestRef.current = requestAnimationFrame(updateTimer);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    useEffect(() => {
        let wakeLock: any = null;
        if ('wakeLock' in navigator) {
            navigator.wakeLock.request('screen').then((lock) => {
                wakeLock = lock;
            });
        }
        return () => {
            if (wakeLock) wakeLock.release();
        };
    }, []);

    const playBeep = () => {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const audioCtx = new AudioContext();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.5);
    };

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
