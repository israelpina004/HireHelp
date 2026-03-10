"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function DashboardIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>); }
function ResumeAnalysisIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>); }
function ResumeBankIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>); }
function ATSIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>); }
function InterviewIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>); }
function TrackingIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>); }
function SettingsIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>); }
function HelpIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>); }
function LogoutIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>); }
function UploadIcon() { return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>); }
function ChevronIcon({ down }: { down?: boolean }) { return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: down ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}><polyline points="9 18 15 12 9 6" /></svg>); }

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

/* ── Types ── */

type Category = {
    name: string;
    matched: string[];
    missing: string[];
    score: number;
};

type Suggestion = {
    priority: "high" | "medium" | "low";
    category: string;
    title: string;
    detail: string;
};

type ATSResult = {
    ats_score: number;
    semantic_score: number;
    keyword_match_score: number;
    matching_keywords: string[];
    missing_keywords: string[];
    categories: Category[];
    suggestions: Suggestion[];
    summary: string;
};

/* ── Sidebar ── */

function Sidebar({ currentPage }: { currentPage: string }) {
    const router = useRouter();
    return (
        <div style={{ width: 220, minHeight: "100vh", background: "#fff", borderRight: "1px solid #ebebeb", display: "flex", flexDirection: "column", flexShrink: 0 }}>
            <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid #ebebeb" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, background: "#0a0a0a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" fill="none" stroke="white" strokeWidth="2" /></svg></div>
                    <div><div style={{ fontWeight: 700, fontSize: 15, color: "#0a0a0a", letterSpacing: "-0.02em" }}>HireHelp</div><div style={{ fontSize: 11, color: "#aaa", marginTop: 1 }}>Resume & Career Tool</div></div>
                </div>
            </div>
            <nav style={{ padding: "16px 12px", flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#bbb", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 8px", marginBottom: 8 }}>Main Features</div>
                {sidebarItems.map(({ label, icon: Icon }) => { const isActive = currentPage === label; return (<button key={label} onClick={() => router.push(routeMap[label])} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 10px", borderRadius: 8, background: isActive ? "#0a0a0a" : "transparent", color: isActive ? "#fff" : "#555", border: "none", cursor: "pointer", fontSize: 13.5, fontWeight: isActive ? 600 : 400, marginBottom: 2, textAlign: "left", transition: "all 0.15s ease" }}><Icon />{label}</button>); })}
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

/* ── Score Ring ── */

function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
    const r = (size - 14) / 2; const circ = 2 * Math.PI * r; const fill = (score / 100) * circ;
    const color = score >= 75 ? "#16a34a" : score >= 50 ? "#ca8a04" : "#dc2626";
    return (
        <div style={{ position: "relative", width: size, height: size }}>
            <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f0f0f0" strokeWidth="10" />
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="10" strokeDasharray={`${fill} ${circ}`} strokeLinecap="round" />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 26, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif" }}>{score}%</span>
            </div>
        </div>
    );
}

/* ── Mini Score Bar ── */

function MiniScoreBar({ score, label }: { score: number; label: string }) {
    const color = score >= 75 ? "#16a34a" : score >= 50 ? "#ca8a04" : "#dc2626";
    return (
        <div style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#0a0a0a" }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color }}>{score}%</span>
            </div>
            <div style={{ height: 6, background: "#f0f0f0", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${score}%`, height: "100%", borderRadius: 3, background: color, transition: "width 0.6s ease" }} />
            </div>
        </div>
    );
}

/* ── Keyword Pill ── */

function Pill({ text, variant }: { text: string; variant: "match" | "miss" }) {
    const isMatch = variant === "match";
    return (
        <span style={{
            padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500,
            background: isMatch ? "#f0fdf4" : "#fef2f2",
            color: isMatch ? "#16a34a" : "#dc2626",
            border: `1px solid ${isMatch ? "#bbf7d0" : "#fecaca"}`,
        }}>{text}</span>
    );
}

/* ── Priority Tag ── */

function PriorityTag({ priority }: { priority: string }) {
    const colors: Record<string, { bg: string; fg: string; border: string }> = {
        high: { bg: "#fef2f2", fg: "#dc2626", border: "#fecaca" },
        medium: { bg: "#fffbeb", fg: "#ca8a04", border: "#fde68a" },
        low: { bg: "#f0fdf4", fg: "#16a34a", border: "#bbf7d0" },
    };
    const c = colors[priority] || colors.medium;
    return (
        <span style={{
            padding: "2px 8px", borderRadius: 12, fontSize: 11, fontWeight: 700,
            background: c.bg, color: c.fg, border: `1px solid ${c.border}`,
            textTransform: "uppercase", letterSpacing: "0.04em",
        }}>{priority}</span>
    );
}

/* ── Category Card ── */

function CategoryCard({ category }: { category: Category }) {
    const [open, setOpen] = useState(true);
    const icons: Record<string, string> = {
        "Technical Skills": "⚙️",
        "Soft Skills & Culture": "🤝",
        "Experience & Seniority": "📈",
        "Domain Knowledge": "🧠",
    };
    return (
        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, overflow: "hidden" }}>
            <button onClick={() => setOpen(!open)} style={{
                width: "100%", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "none", border: "none", cursor: "pointer", textAlign: "left",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{icons[category.name] || "📋"}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#0a0a0a" }}>{category.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{
                        fontSize: 13, fontWeight: 700,
                        color: category.score >= 75 ? "#16a34a" : category.score >= 50 ? "#ca8a04" : "#dc2626",
                    }}>{category.score}%</span>
                    <ChevronIcon down={open} />
                </div>
            </button>
            {open && (
                <div style={{ padding: "0 20px 18px", borderTop: "1px solid #f0f0f0" }}>
                    <div style={{ marginTop: 14 }}>
                        <MiniScoreBar score={category.score} label="Coverage" />
                    </div>
                    {category.matched.length > 0 && (
                        <div style={{ marginBottom: 12 }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: "#16a34a", marginBottom: 8 }}>✓ Matched ({category.matched.length})</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {category.matched.map(k => <Pill key={k} text={k} variant="match" />)}
                            </div>
                        </div>
                    )}
                    {category.missing.length > 0 && (
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: "#dc2626", marginBottom: 8 }}>✗ Missing ({category.missing.length})</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {category.missing.map(k => <Pill key={k} text={k} variant="miss" />)}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ── Main Page ── */

type View = "input" | "results";

export default function ATSSimulation() {
    const [view, setView] = useState<View>("input");
    const [jd, setJd] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [running, setRunning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<ATSResult | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(true);

    const canRun = file && jd.trim().length > 20;

    async function handleRun() {
        if (!file || !jd.trim()) return;
        setRunning(true);
        setError(null);

        try {
            // Step 1: Upload and parse the PDF
            const formData = new FormData();
            formData.append("file", file);

            const uploadRes = await fetch("http://localhost:5000/api/resume_parser/upload", {
                method: "POST",
                body: formData,
            });

            if (!uploadRes.ok) throw new Error("Failed to parse resume. Is the Flask backend running?");
            const uploadData = await uploadRes.json();
            const resumeText = uploadData.text || uploadData.raw_text || JSON.stringify(uploadData);

            // Step 2: Run ATS simulation
            const atsRes = await fetch("http://localhost:5000/api/ats/optimize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resume_text: resumeText, job_description: jd }),
            });

            if (!atsRes.ok) throw new Error("Failed to run ATS simulation.");
            const atsData: ATSResult = await atsRes.json();

            setResults(atsData);
            setView("results");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong.";
            setError(message);
        } finally {
            setRunning(false);
        }
    }

    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#fafafa", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } textarea { resize: none; outline: none; } @keyframes spin { to { transform: rotate(360deg); } } @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            <Sidebar currentPage="ATS Simulation" />
            <main style={{ flex: 1, padding: "36px 40px", overflowY: "auto" }}>
                <div style={{ marginBottom: 28 }}>
                    <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif" }}>ATS Simulation</h1>
                    <p style={{ fontSize: 14, color: "#888", marginTop: 5 }}>Test how well your resume performs with Applicant Tracking Systems</p>
                </div>

                {/* Error banner */}
                {error && (
                    <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 13.5, color: "#dc2626" }}>
                        ⚠️ {error}
                    </div>
                )}

                {/* ═══ INPUT VIEW ═══ */}
                {view === "input" && (
                    <div style={{ animation: "fadeIn 0.3s ease" }}>
                        <div style={{ display: "flex", gap: 20 }}>
                            {/* Resume upload */}
                            <div style={{ flex: 1, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}><ATSIcon /><h2 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a" }}>Your Resume</h2></div>
                                <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed #e0e0e0", borderRadius: 10, padding: "32px 24px", cursor: "pointer", background: file ? "#fafafa" : "#fff" }}
                                    onMouseEnter={e => (e.currentTarget.style.borderColor = "#aaa")}
                                    onMouseLeave={e => (e.currentTarget.style.borderColor = "#e0e0e0")}
                                >
                                    <input type="file" accept=".pdf" onChange={e => { if (e.target.files?.[0]) setFile(e.target.files[0]); }} style={{ display: "none" }} />
                                    <div style={{ color: file ? "#16a34a" : "#ccc", marginBottom: 10 }}><UploadIcon /></div>
                                    {file ? (
                                        <><span style={{ fontSize: 13.5, fontWeight: 600, color: "#0a0a0a", marginBottom: 2 }}>{file.name}</span><span style={{ fontSize: 12, color: "#aaa" }}>Click to replace</span></>
                                    ) : (
                                        <><span style={{ fontSize: 13.5, fontWeight: 500, color: "#555", marginBottom: 4 }}>Upload Resume File</span><span style={{ fontSize: 12, color: "#aaa" }}>PDF only</span></>
                                    )}
                                </label>
                            </div>

                            {/* Job description */}
                            <div style={{ flex: 1, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}><TrackingIcon /><h2 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a" }}>Job Description</h2></div>
                                <textarea value={jd} onChange={e => setJd(e.target.value)} placeholder="Paste the job description here..." style={{ width: "100%", height: 340, padding: 14, border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 12.5, color: "#333", lineHeight: 1.6, fontFamily: "'DM Sans', system-ui, sans-serif", background: "#fafafa" }} />
                            </div>
                        </div>

                        <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
                            <button onClick={handleRun} disabled={!canRun || running} style={{ padding: "12px 32px", background: canRun ? "#0a0a0a" : "#d0d0d0", color: "#fff", border: "none", borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: canRun ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 8 }}>
                                {running ? (<><span style={{ width: 14, height: 14, border: "2px solid #ffffff44", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />Analyzing with AI...</>) : "Run ATS Simulation →"}
                            </button>
                        </div>
                    </div>
                )}

                {/* ═══ RESULTS VIEW ═══ */}
                {view === "results" && results && (
                    <div style={{ animation: "fadeIn 0.3s ease" }}>

                        {/* ── Score hero + summary ── */}
                        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "28px 32px", marginBottom: 20, display: "flex", alignItems: "center", gap: 36 }}>
                            <ScoreRing score={Math.round(results.ats_score)} />
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                                    <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.02em" }}>ATS Score: {Math.round(results.ats_score)}%</h2>
                                    <span style={{ fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: results.ats_score >= 75 ? "#f0fdf4" : results.ats_score >= 50 ? "#fffbeb" : "#fef2f2", color: results.ats_score >= 75 ? "#16a34a" : results.ats_score >= 50 ? "#ca8a04" : "#dc2626", border: `1px solid ${results.ats_score >= 75 ? "#bbf7d0" : results.ats_score >= 50 ? "#fde68a" : "#fecaca"}` }}>
                                        {results.ats_score >= 75 ? "✓ Strong Match" : results.ats_score >= 50 ? "⚡ Moderate Match" : "✗ Needs Work"}
                                    </span>
                                </div>
                                {results.summary && (
                                    <p style={{ fontSize: 13.5, color: "#555", lineHeight: 1.65, maxWidth: 560 }}>{results.summary}</p>
                                )}
                            </div>
                            <button onClick={() => { setView("input"); setResults(null); setError(null); }} style={{ padding: "10px 20px", background: "#fff", border: "1px solid #d0d0d0", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#555", whiteSpace: "nowrap", flexShrink: 0 }}>← Run Again</button>
                        </div>

                        {/* ── Score breakdown bars ── */}
                        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24, marginBottom: 20 }}>
                            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 18 }}>Score Breakdown</h3>
                            <MiniScoreBar score={Math.round(results.ats_score)} label="Overall ATS Score" />
                            <MiniScoreBar score={Math.round(results.semantic_score)} label="Semantic Similarity — How closely your resume matches the JD in meaning" />
                            <MiniScoreBar score={Math.round(results.keyword_match_score)} label="Skill & Keyword Coverage — Average across all categories" />
                        </div>

                        {/* ── Category breakdown ── */}
                        {results.categories && results.categories.length > 0 && (
                            <div style={{ marginBottom: 20 }}>
                                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 14 }}>Category Analysis</h3>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                                    {results.categories.map((cat) => (
                                        <CategoryCard key={cat.name} category={cat} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── Actionable Suggestions ── */}
                        {results.suggestions && results.suggestions.length > 0 && (
                            <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
                                <button onClick={() => setShowSuggestions(!showSuggestions)} style={{ width: "100%", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                                    <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a" }}>💡 Actionable Suggestions ({results.suggestions.length})</h3>
                                    <span style={{ color: "#aaa" }}><ChevronIcon down={showSuggestions} /></span>
                                </button>
                                {showSuggestions && (
                                    <div style={{ padding: "0 24px 24px", borderTop: "1px solid #f0f0f0" }}>
                                        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
                                            {results.suggestions.map((s, i) => (
                                                <div key={i} style={{
                                                    padding: "16px 18px", background: "#fafafa", borderRadius: 10,
                                                    borderLeft: `4px solid ${s.priority === "high" ? "#dc2626" : s.priority === "medium" ? "#ca8a04" : "#16a34a"}`,
                                                }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                                                        <PriorityTag priority={s.priority} />
                                                        <span style={{ fontSize: 12, color: "#888" }}>{s.category}</span>
                                                    </div>
                                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#0a0a0a", marginBottom: 6 }}>{s.title}</div>
                                                    <div style={{ fontSize: 13, color: "#555", lineHeight: 1.65 }}>{s.detail}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ── All keywords summary ── */}
                        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24, display: "flex", gap: 32 }}>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: 13.5, fontWeight: 600, color: "#0a0a0a", marginBottom: 12 }}>✓ All Matched ({results.matching_keywords.length})</h3>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                    {results.matching_keywords.length > 0
                                        ? results.matching_keywords.map(k => <Pill key={k} text={k} variant="match" />)
                                        : <span style={{ fontSize: 13, color: "#aaa" }}>No matching keywords found</span>
                                    }
                                </div>
                            </div>
                            <div style={{ width: 1, background: "#f0f0f0" }} />
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: 13.5, fontWeight: 600, color: "#0a0a0a", marginBottom: 12 }}>✗ All Missing ({results.missing_keywords.length})</h3>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                    {results.missing_keywords.length > 0
                                        ? results.missing_keywords.map(k => <Pill key={k} text={k} variant="miss" />)
                                        : <span style={{ fontSize: 13, color: "#aaa" }}>No missing keywords — great match!</span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}