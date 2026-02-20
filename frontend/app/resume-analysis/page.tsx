"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function DashboardIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>); }
function ResumeAnalysisIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>); }
function ResumeBankIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>); }
function ATSIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>); }
function InterviewIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>); }
function TrackingIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>); }
function SettingsIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>); }
function HelpIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>); }
function LogoutIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>); }
function UploadIcon() { return (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>); }
function CheckIcon() { return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>); }
function ChevronIcon() { return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>); }

const sidebarItems = [
    { label: "Dashboard", icon: DashboardIcon }, { label: "Resume Analysis", icon: ResumeAnalysisIcon },
    { label: "Resume Bank", icon: ResumeBankIcon }, { label: "ATS Simulation", icon: ATSIcon },
    { label: "Interview Prep", icon: InterviewIcon }, { label: "Application Tracking", icon: TrackingIcon },
];
const otherItems = [{ label: "Settings", icon: SettingsIcon }, { label: "Help & Support", icon: HelpIcon }];
const routeMap: Record<string, string> = {
    "Dashboard": "/dashboard", "Resume Analysis": "/resume-analysis", "Resume Bank": "/resume-bank",
    "ATS Simulation": "/ats-simulation", "Interview Prep": "/interview-prep", "Application Tracking": "/application-tracking",
    "Settings": "/settings", "Help & Support": "/help",
};

const mockResults = {
    atsScore: 87, matchScore: 82,
    sections: [
        { title: "Skills Match", score: 90, status: "strong", feedback: "Your technical skills align well with the job requirements. React, TypeScript, and Node.js are all present.", suggestions: ["Add GraphQL experience to strengthen alignment", "Mention Docker/Kubernetes if applicable"] },
        { title: "Experience Relevance", score: 85, status: "strong", feedback: "Your work experience demonstrates relevant responsibilities and leadership.", suggestions: ["Quantify achievements with metrics (e.g. 'improved performance by 40%')", "Highlight cross-functional collaboration more explicitly"] },
        { title: "Education", score: 78, status: "good", feedback: "Education section is present and relevant.", suggestions: ["Add relevant coursework or certifications if available"] },
        { title: "Keywords", score: 72, status: "needs-work", feedback: "Several important keywords from the job description are missing.", suggestions: ["Add 'microservices architecture'", "Include 'CI/CD pipelines'", "Mention 'Agile methodology'"] },
    ],
    missingKeywords: ["microservices", "CI/CD", "Agile", "GraphQL", "Kubernetes"],
    presentKeywords: ["React", "TypeScript", "Node.js", "REST API", "PostgreSQL", "AWS", "JavaScript"],
};

function Sidebar({ currentPage }: { currentPage: string }) {
    const router = useRouter();
    return (
        <div style={{ width: 220, minHeight: "100vh", background: "#fff", borderRight: "1px solid #ebebeb", display: "flex", flexDirection: "column", flexShrink: 0 }}>
            <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid #ebebeb" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, background: "#0a0a0a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8" fill="none" stroke="white" strokeWidth="2"/></svg>
                    </div>
                    <div><div style={{ fontWeight: 700, fontSize: 15, color: "#0a0a0a", letterSpacing: "-0.02em" }}>HireHelp</div><div style={{ fontSize: 11, color: "#aaa", marginTop: 1 }}>Resume & Career Tool</div></div>
                </div>
            </div>
            <nav style={{ padding: "16px 12px", flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#bbb", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 8px", marginBottom: 8 }}>Main Features</div>
                {sidebarItems.map(({ label, icon: Icon }) => {
                    const isActive = currentPage === label;
                    return (<button key={label} onClick={() => router.push(routeMap[label])} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 10px", borderRadius: 8, background: isActive ? "#0a0a0a" : "transparent", color: isActive ? "#fff" : "#555", border: "none", cursor: "pointer", fontSize: 13.5, fontWeight: isActive ? 600 : 400, marginBottom: 2, textAlign: "left", transition: "all 0.15s ease" }}><Icon />{label}</button>);
                })}
                <div style={{ fontSize: 11, fontWeight: 600, color: "#bbb", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 8px", marginTop: 20, marginBottom: 8 }}>Other</div>
                {otherItems.map(({ label, icon: Icon }) => (<button key={label} onClick={() => router.push(routeMap[label])} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 10px", borderRadius: 8, background: "transparent", color: "#888", border: "none", cursor: "pointer", fontSize: 13.5, marginBottom: 2, textAlign: "left" }}><Icon />{label}</button>))}
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

function ScoreRing({ score, size = 100, label }: { score: number; size?: number; label: string }) {
    const r = (size - 12) / 2; const circ = 2 * Math.PI * r; const fill = (score / 100) * circ;
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ position: "relative", width: size, height: size }}>
                <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
                    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f0f0f0" strokeWidth="8"/>
                    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#0a0a0a" strokeWidth="8" strokeDasharray={`${fill} ${circ}`} strokeLinecap="round"/>
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 22, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif" }}>{score}%</span>
                </div>
            </div>
            <span style={{ fontSize: 12, color: "#888", fontWeight: 500 }}>{label}</span>
        </div>
    );
}

function SectionCard({ section }: { section: typeof mockResults.sections[0] }) {
    const [expanded, setExpanded] = useState(false);
    const statusColors: Record<string, string> = { strong: "#16a34a", good: "#ca8a04", "needs-work": "#dc2626" };
    const statusLabels: Record<string, string> = { strong: "Strong", good: "Good", "needs-work": "Needs Work" };
    return (
        <div style={{ border: "1px solid #e8e8e8", borderRadius: 10, overflow: "hidden", marginBottom: 10 }}>
            <button onClick={() => setExpanded(!expanded)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "#fff", border: "none", cursor: "pointer", textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 6, borderRadius: 3, background: "#f0f0f0", overflow: "hidden" }}><div style={{ width: `${section.score}%`, height: "100%", background: "#0a0a0a", borderRadius: 3 }}/></div>
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: "#0a0a0a" }}>{section.title}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: statusColors[section.status], background: `${statusColors[section.status]}15`, padding: "2px 8px", borderRadius: 20 }}>{statusLabels[section.status]}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#0a0a0a" }}>{section.score}%</span>
                    <span style={{ color: "#aaa", transform: expanded ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}><ChevronIcon /></span>
                </div>
            </button>
            {expanded && (
                <div style={{ padding: "0 16px 16px", background: "#fafafa", borderTop: "1px solid #f0f0f0" }}>
                    <p style={{ fontSize: 13, color: "#555", margin: "12px 0 10px" }}>{section.feedback}</p>
                    {section.suggestions.map((s, i) => (<div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}><span style={{ color: "#0a0a0a", marginTop: 1, flexShrink: 0 }}>→</span><span style={{ fontSize: 12.5, color: "#666" }}>{s}</span></div>))}
                </div>
            )}
        </div>
    );
}

type Tab = "upload" | "results";

export default function ResumeAnalysis() {
    const [tab, setTab] = useState<Tab>("upload");
    const [fileName, setFileName] = useState<string | null>(null);
    const [jobDesc, setJobDesc] = useState(`Senior Software Engineer – Tech Innovation Team\n\nWe are seeking a talented Senior Software Engineer to join our growing team.\n\nRequired Skills:\n• 5+ years of experience with React and JavaScript\n• Strong experience with TypeScript and modern web frameworks\n• Proficiency in Node.js and REST API development\n• Experience with cloud platforms (AWS preferred)\n• Knowledge of containerization (Docker, Kubernetes)\n• Familiarity with CI/CD pipelines and DevOps practices\n• Experience with databases (PostgreSQL, MongoDB, Redis)\n• Understanding of microservices architecture\n• Strong knowledge of GraphQL`);
    const [analyzing, setAnalyzing] = useState(false);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) { if (e.target.files?.[0]) setFileName(e.target.files[0].name); }
    function handleAnalyze() { setAnalyzing(true); setTimeout(() => { setAnalyzing(false); setTab("results"); }, 2000); }

    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#fafafa", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } textarea { resize: none; outline: none; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <Sidebar currentPage="Resume Analysis" />
            <main style={{ flex: 1, padding: "36px 40px", overflowY: "auto" }}>
                <div style={{ marginBottom: 28 }}>
                    <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif" }}>Resume Analysis & Optimization</h1>
                    <p style={{ fontSize: 14, color: "#888", marginTop: 5 }}>Upload your resume and job description for AI-powered insights and optimization</p>
                </div>
                <div style={{ display: "flex", borderBottom: "1px solid #e8e8e8", marginBottom: 28 }}>
                    {(["upload", "results"] as Tab[]).map(t => (
                        <button key={t} onClick={() => setTab(t)} style={{ padding: "10px 20px", fontSize: 13.5, fontWeight: tab === t ? 600 : 400, color: tab === t ? "#0a0a0a" : "#888", background: "none", border: "none", cursor: "pointer", borderBottom: tab === t ? "2px solid #0a0a0a" : "2px solid transparent", marginBottom: -1 }}>
                            {t === "upload" ? "Upload & Analyze" : "Analysis Results"}
                        </button>
                    ))}
                </div>
                {tab === "upload" && (
                    <>
                        <div style={{ display: "flex", gap: 20 }}>
                            <div style={{ flex: 1, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}><ResumeAnalysisIcon /><h2 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a" }}>Your Resume</h2></div>
                                <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed #e0e0e0", borderRadius: 10, padding: "48px 24px", cursor: "pointer", background: fileName ? "#fafafa" : "#fff" }}>
                                    <input type="file" accept=".pdf" onChange={handleFileChange} style={{ display: "none" }} />
                                    <div style={{ color: fileName ? "#0a0a0a" : "#ccc", marginBottom: 12 }}><UploadIcon /></div>
                                    {fileName ? (<><div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}><span style={{ color: "#16a34a" }}><CheckIcon /></span><span style={{ fontSize: 13.5, fontWeight: 600, color: "#0a0a0a" }}>{fileName}</span></div><span style={{ fontSize: 12, color: "#aaa" }}>Click to replace</span></>) : (<><span style={{ fontSize: 14, fontWeight: 500, color: "#555", marginBottom: 4 }}>Upload your resume</span><span style={{ fontSize: 12, color: "#aaa" }}>Supported format: PDF</span><button style={{ marginTop: 16, padding: "8px 20px", border: "1px solid #d0d0d0", borderRadius: 7, background: "#fff", fontSize: 13, color: "#555", cursor: "pointer", fontWeight: 500, pointerEvents: "none" }}>Choose File</button></>)}
                                </label>
                            </div>
                            <div style={{ flex: 1, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}><TrackingIcon /><h2 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a" }}>Job Description</h2></div>
                                <textarea value={jobDesc} onChange={e => setJobDesc(e.target.value)} placeholder="Paste the job description here..." style={{ width: "100%", height: 320, padding: 14, border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 12.5, color: "#333", lineHeight: 1.6, fontFamily: "'DM Sans', system-ui, sans-serif", background: "#fafafa" }} />
                            </div>
                        </div>
                        <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
                            <button onClick={handleAnalyze} disabled={!fileName || analyzing} style={{ padding: "12px 32px", background: fileName ? "#0a0a0a" : "#d0d0d0", color: "#fff", border: "none", borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: fileName ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 8 }}>
                                {analyzing ? (<><span style={{ width: 14, height: 14, border: "2px solid #ffffff44", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }}/>Analyzing...</>) : "Analyze Resume →"}
                            </button>
                        </div>
                    </>
                )}
                {tab === "results" && (
                    <div>
                        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "28px 32px", marginBottom: 20, display: "flex", alignItems: "center", gap: 48 }}>
                            <div><h2 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 4 }}>Analysis Complete</h2><p style={{ fontSize: 13, color: "#888" }}>Based on your resume vs. the job description</p></div>
                            <div style={{ display: "flex", gap: 40, marginLeft: "auto" }}>
                                <ScoreRing score={mockResults.atsScore} label="ATS Score" />
                                <ScoreRing score={mockResults.matchScore} label="Match Score" />
                            </div>
                        </div>
                        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24, marginBottom: 20, display: "flex", gap: 32 }}>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: 13.5, fontWeight: 600, color: "#0a0a0a", marginBottom: 12 }}>✓ Keywords Found</h3>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{mockResults.presentKeywords.map(k => (<span key={k} style={{ padding: "4px 10px", background: "#f0fdf4", color: "#16a34a", borderRadius: 20, fontSize: 12, fontWeight: 500, border: "1px solid #bbf7d0" }}>{k}</span>))}</div>
                            </div>
                            <div style={{ width: 1, background: "#f0f0f0" }} />
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: 13.5, fontWeight: 600, color: "#0a0a0a", marginBottom: 12 }}>✗ Missing Keywords</h3>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{mockResults.missingKeywords.map(k => (<span key={k} style={{ padding: "4px 10px", background: "#fef2f2", color: "#dc2626", borderRadius: 20, fontSize: 12, fontWeight: 500, border: "1px solid #fecaca" }}>{k}</span>))}</div>
                            </div>
                        </div>
                        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24 }}>
                            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 16 }}>Section Breakdown</h2>
                            {mockResults.sections.map((s, i) => <SectionCard key={i} section={s} />)}
                        </div>
                        <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
                            <button onClick={() => setTab("upload")} style={{ padding: "11px 24px", background: "#fff", color: "#0a0a0a", border: "1px solid #d0d0d0", borderRadius: 9, fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>← Analyze Another</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}