"use client";

import React from "react";
import Sidebar from "./Sidebar";

interface PageLayoutProps {
    currentPage: string;
    title: string;
    subtitle: string;
    headerRight?: React.ReactNode;
    children: React.ReactNode;
}

export default function PageLayout({ currentPage, title, subtitle, headerRight, children }: PageLayoutProps) {
    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#fafafa", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
            <Sidebar currentPage={currentPage} />
            <main style={{ flex: 1, padding: "36px 40px", overflowY: "auto" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
                    <div>
                        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif" }}>{title}</h1>
                        <p style={{ fontSize: 14, color: "#888", marginTop: 5 }}>{subtitle}</p>
                    </div>
                    {headerRight}
                </div>
                {children}
            </main>
        </div>
    );
}
