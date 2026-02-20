"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function DashboardIcon() {
    return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>);
}
function ResumeAnalysisIcon() {
    return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>);
}
function ResumeBankIcon() {
    return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>);
}
function ATSIcon() {
    return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
}
function InterviewIcon() {
    return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>);
}
function TrackingIcon() {
    return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>);
}
function SettingsIcon() {
    return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>);
}
function HelpIcon() {
    return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>);
}
function LogoutIcon() {
    return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>);
}

const sidebarItems = [
    { label: "Dashboard", icon: DashboardIcon },
    { label: "Resume Analysis", icon: ResumeAnalysisIcon },
    { label: "Resume Bank", icon: ResumeBankIcon },
    { label: "ATS Simulation", icon: ATSIcon },
    { label: "Interview Prep", icon: InterviewIcon },
    { label: "Application Tracking", icon: TrackingIcon },
];
const otherItems = [
    { label: "Settings", icon: SettingsIcon },
    { label: "Help & Support", icon: HelpIcon },
];
const routeMap: Record<string, string> = {
    "Dashboard": "/dashboard",
    "Resume Analysis": "/resume-analysis",
    "Resume Bank": "/resume-bank",
    "ATS Simulation": "/ats-simulation",
    "Interview Prep": "/interview-prep",
    "Application Tracking": "/application-tracking",
    "Settings": "/settings",
    "Help & Support": "/help",
};

const activityData = [
    { day: "Mon", value: 2 }, { day: "Tue", value: 3 }, { day: "Wed", value: 1 },
    { day: "Thu", value: 4 }, { day: "Fri", value: 2 }, { day: "Sat", value: 0 }, { day: "Sun", value: 1 },
];
const atsData = [
    { week: "Week 1", value: 58 }, { week: "Week 2", value: 67 },
    { week: "Week 3", value: 74 }, { week: "Week 4", value: 85 },
];
const recentActivity = [
    { action: "Resume analyzed", detail: "Software Engineer @ Google", time: "2 hours ago", type: "analysis" },
    { action: "Application added", detail: "Frontend Developer @ Meta", time: "Yesterday", type: "application" },
    { action: "ATS simulation run", detail: "Score: 92% — Senior Engineer @ TechCorp", time: "2 days ago", type: "ats" },
    { action: "Interview practice", detail: "Behavioral questions session", time: "3 days ago", type: "interview" },
    { action: "Resume optimized", detail: "Full Stack Developer version", time: "4 days ago", type: "analysis" },
];

function Sidebar({ currentPage }: { currentPage: string }) {
    const router = useRouter();
    return (
        <div style={{ width: 220, minHeight: "100vh", background: "#fff", borderRight: "1px solid #ebebeb", display: "flex", flexDirection: "column", flexShrink: 0 }}>
            <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid #ebebeb" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, background: "#0a0a0a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8" fill="none" stroke="white" strokeWidth="2"/></svg>
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: "#0a0a0a", letterSpacing: "-0.02em" }}>HireHelp</div>
                        <div style={{ fontSize: 11, color: "#aaa", marginTop: 1 }}>Resume & Career Tool</div>
                    </div>
                </div>
            </div>
            <nav style={{ padding: "16px 12px", flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#bbb", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 8px", marginBottom: 8 }}>Main Features</div>
                {sidebarItems.map(({ label, icon: Icon }) => {
                    const isActive = currentPage === label;
                    return (<button key={label} onClick={() => router.push(routeMap[label])} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 10px", borderRadius: 8, background: isActive ? "#0a0a0a" : "transparent", color: isActive ? "#fff" : "#555", border: "none", cursor: "pointer", fontSize: 13.5, fontWeight: isActive ? 600 : 400, marginBottom: 2, textAlign: "left", transition: "all 0.15s ease" }}><Icon />{label}</button>);
                })}
                <div style={{ fontSize: 11, fontWeight: 600, color: "#bbb", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 8px", marginTop: 20, marginBottom: 8 }}>Other</div>
                {otherItems.map(({ label, icon: Icon }) => (
                    <button key={label} onClick={() => router.push(routeMap[label])} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 10px", borderRadius: 8, background: "transparent", color: "#888", border: "none", cursor: "pointer", fontSize: 13.5, marginBottom: 2, textAlign: "left" }}><Icon />{label}</button>
                ))}
            </nav>
            <div style={{ padding: "16px 20px", borderTop: "1px solid #ebebeb", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>JD</div>
                    <div><div style={{ fontSize: 13, fontWeight: 600, color: "#0a0a0a" }}>John Doe</div><div style={{ fontSize: 11, color: "#aaa" }}>john@example.com</div></div>
                </div>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", padding: 4 }}><LogoutIcon /></button>
            </div>
        </div>
    );
}

function BarChart({ data, valueKey, labelKey, maxValue }: { data: any[]; valueKey: string; labelKey: string; maxValue?: number }) {
    const max = maxValue || Math.max(...data.map(d => d[valueKey])) || 1;
    return (
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 120, paddingTop: 8 }}>
            {data.map((d, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, gap: 6, height: "100%" }}>
                    <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                        <div style={{ width: "100%", background: "#000", borderRadius: 3, height: `${(d[valueKey] / max) * 100}%`, minHeight: d[valueKey] > 0 ? 6 : 0 }} />
                    </div>
                    <span style={{ fontSize: 11, color: "#999", whiteSpace: "nowrap" }}>{d[labelKey]}</span>
                </div>
            ))}
        </div>
    );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
    return (
        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12, flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontSize: 13, color: "#888", fontWeight: 500 }}>{label}</span>
                <span style={{ width: 36, height: 36, background: "#f5f5f5", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#555" }}>{icon}</span>
            </div>
            <span style={{ fontSize: 32, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif" }}>{value}</span>
        </div>
    );
}

export default function Dashboard() {
    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#fafafa", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; }`}</style>
            <Sidebar currentPage="Dashboard" />
            <main style={{ flex: 1, padding: "36px 40px", overflowY: "auto" }}>
                <div style={{ marginBottom: 32 }}>
                    <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif" }}>Dashboard</h1>
                    <p style={{ fontSize: 14, color: "#888", marginTop: 5 }}>Welcome back! Here's your job application overview.</p>
                </div>
                <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                    <StatCard label="Total Applications" value="24" icon={<TrackingIcon />} />
                    <StatCard label="Avg ATS Score" value="85%" icon={<ATSIcon />} />
                    <StatCard label="Resumes Optimized" value="8" icon={<ResumeAnalysisIcon />} />
                    <StatCard label="Interview Preps" value="12" icon={<InterviewIcon />} />
                </div>
                <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                    <div style={{ flex: 1, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "24px" }}>
                        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 4 }}>Application Activity</h2>
                        <p style={{ fontSize: 12, color: "#aaa", marginBottom: 16 }}>Applications submitted this week</p>
                        <BarChart data={activityData} valueKey="value" labelKey="day" maxValue={4} />
                    </div>
                    <div style={{ flex: 1, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "24px" }}>
                        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 4 }}>ATS Score Improvement</h2>
                        <p style={{ fontSize: 12, color: "#aaa", marginBottom: 16 }}>Average score trend over the month</p>
                        <BarChart data={atsData} valueKey="value" labelKey="week" maxValue={100} />
                    </div>
                </div>
                <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "24px" }}>
                    <h2 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 4 }}>Recent Activity</h2>
                    <p style={{ fontSize: 12, color: "#aaa", marginBottom: 16 }}>Your latest actions across HireHelp</p>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {recentActivity.map((item, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 0", borderBottom: i < recentActivity.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                                <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#000", flexShrink: 0, marginTop: 6 }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13.5, fontWeight: 500, color: "#0a0a0a" }}>{item.action}</div>
                                    <div style={{ fontSize: 12.5, color: "#888", marginTop: 2 }}>{item.detail}</div>
                                </div>
                                <span style={{ fontSize: 12, color: "#bbb", whiteSpace: "nowrap", paddingTop: 2 }}>{item.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}