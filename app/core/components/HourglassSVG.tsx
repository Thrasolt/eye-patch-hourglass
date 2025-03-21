'use client';
import React from 'react';

type HourglassSVGProps = {
    progress: number; // 0: top full & bottom empty, 1: top empty & bottom full
};

export default function HourglassSVG({ progress }: HourglassSVGProps) {
    // Define the inner boundaries for the sand compartments based on the new glass design.
    // Top bowl: ellipse centered at (100,70) with radiusY=20 -> chamber from y=50 to y=90
    // Bottom bowl: ellipse centered at (100,230) with radiusY=20 -> chamber from y=210 to y=250
    // Neck: connects y=90 (top) to y=210 (bottom) and is 40px wide (x from 80 to 120)
    const topChamberTop = 50;
    const topChamberBottom = 90;
    const bottomChamberTop = 210;
    const bottomChamberBottom = 250;

    const fullTopHeight = topChamberBottom - topChamberTop;       // 40
    const fullBottomHeight = bottomChamberBottom - bottomChamberTop; // 40

    const currentTopSandHeight = fullTopHeight * (1 - progress);
    const currentBottomSandHeight = fullBottomHeight * progress;

    // Drip is visible while there is still sand falling
    const dripVisible = progress < 1;

    return (
        <svg viewBox="0 0 200 300" className="w-48 sm:w-60 md:w-72 lg:w-80 mx-auto">
            <defs>
                <linearGradient id="glassGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f0abfc" />
                    <stop offset="100%" stopColor="#d8b4fe" />
                </linearGradient>
                <linearGradient id="sandGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f472b6" />
                    <stop offset="100%" stopColor="#facc15" />
                </linearGradient>
            </defs>

            {/* Optional Frame */}
            <rect x="20" y="20" width="160" height="260" rx="20" fill="none" stroke="#e879f9" strokeWidth="4" />

            {/* Glass Outline */}
            <path
                d="
          M30,70
          A70,20 0 0,1 170,70
          L120,90
          L120,210
          L170,230
          A70,20 0 0,1 30,230
          L80,210
          L80,90
          Z
        "
                fill="url(#glassGradient)"
                stroke="#c084fc"
                strokeWidth="4"
            />

            {/* Top Sand Pile (built from the neck upward to the top of the top chamber) */}
            {currentTopSandHeight > 0 && (
                <path
                    d={`
            M80,90
            L80,${90 - currentTopSandHeight}
            Q100,${90 - currentTopSandHeight - 5} 120,${90 - currentTopSandHeight}
            L120,90
            Z
          `}
                    fill="url(#sandGradient)"
                />
            )}

            {/* Dripping Sand (falls from the neck top to neck bottom) */}
            {dripVisible && (
                <circle cx="100" cy="90" r="3" fill="url(#sandGradient)">
                    <animate
                        attributeName="cy"
                        from="90"
                        to="210"
                        dur="1s"
                        repeatCount="indefinite"
                    />
                </circle>
            )}

            {/* Bottom Sand Pile (builds from the bottom upward to the top of the bottom chamber) */}
            {currentBottomSandHeight > 0 && (
                <path
                    d={`
            M80,250
            L80,${250 - currentBottomSandHeight}
            Q100,${250 - currentBottomSandHeight + 5} 120,${250 - currentBottomSandHeight}
            L120,250
            Z
          `}
                    fill="url(#sandGradient)"
                />
            )}
        </svg>
    );
}
