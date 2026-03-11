"use client";

import PageLayout from "../../components/PageLayout";
import { TrackingIcon, ATSIcon, ResumeAnalysisIcon, InterviewIcon } from "../../components/Icons";

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
        <PageLayout currentPage="Dashboard" title="Dashboard" subtitle="Welcome back! Here's your job application overview.">
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
        </PageLayout>
    );
}