"use client";

import React from "react";

interface ScoreRingProps {
    score: number;
    size?: number;
    label: string;
}

export default function ScoreRing({ score, size = 100, label }: ScoreRingProps) {
    const r = (size - 12) / 2;
    const circ = 2 * Math.PI * r;
    const fill = (score / 100) * circ;
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ position: "relative", width: size, height: size }}>
                <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
                    <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f0f0f0" strokeWidth="8" />
                    <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#0a0a0a" strokeWidth="8" strokeDasharray={`${fill} ${circ}`} strokeLinecap="round" />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 22, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif" }}>{score}%</span>
                </div>
            </div>
            <span style={{ fontSize: 12, color: "#888", fontWeight: 500 }}>{label}</span>
        </div>
    );
}
