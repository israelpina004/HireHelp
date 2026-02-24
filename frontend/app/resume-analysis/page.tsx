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

// --- API response type ---
type AnalysisResult = {
    ats_score: number;
    semantic_score: number;
    keyword_match_score: number;
    matching_keywords: string[];
    missing_keywords: string[];
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

type Tab = "upload" | "results";

export default function ResumeAnalysis() {
    const [tab, setTab] = useState<Tab>("upload");
    const [file, setFile] = useState<File | null>(null);
    const [jobDesc, setJobDesc] = useState("");
    const [analyzing, setAnalyzing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<AnalysisResult | null>(null);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files?.[0]) setFile(e.target.files[0]);
    }

    async function handleAnalyze() {
        if (!file || !jobDesc.trim()) return;
        setAnalyzing(true);
        setError(null);

        try {
            // Step 1: Upload PDF and parse it
            const formData = new FormData();
            formData.append("file", file);

            const uploadRes = await fetch("http://127.0.0.1:5000/api/resume_parser/upload", {
                method: "POST",
                body: formData,
            });

            if (!uploadRes.ok) throw new Error("Failed to parse resume. Make sure the backend is running.");
            const uploadData = await uploadRes.json();

            // The parser returns the full parsed object — we need the raw text
            // It may be in uploadData.text, uploadData.raw_text, or we stringify the whole thing
            const resumeText = uploadData.text || uploadData.raw_text || JSON.stringify(uploadData);

            // Step 2: Run ATS analysis
            const atsRes = await fetch("http://127.0.0.1:5000/api/ats/optimize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    resume_text: resumeText,
                    job_description: jobDesc,
                }),
            });

            if (!atsRes.ok) throw new Error("Failed to run ATS analysis.");
            const atsData: AnalysisResult = await atsRes.json();

            setResults(atsData);
            setTab("results");
        } catch (err: any) {
            setError(err.message || "Something went wrong. Is the Flask backend running?");
        } finally {
            setAnalyzing(false);
        }
    }

    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#fafafa", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } textarea { resize: none; outline: none; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <Sidebar currentPage="Resume Analysis" />
            <main style={{ flex: 1, padding: "36px 40px", overflowY: "auto" }}>
                <div style={{ marginBottom: 28 }}>
                    <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif" }}>Resume Analysis & Optimization</h1>
                    <p style={{ fontSize: 14, color: "#888", marginTop: 5 }}>Upload your resume and job description for AI-powered insights</p>
                </div>

                {/* Tabs */}
                <div style={{ display: "flex", borderBottom: "1px solid #e8e8e8", marginBottom: 28 }}>
                    {(["upload", "results"] as Tab[]).map(t => (
                        <button key={t} onClick={() => setTab(t)} style={{ padding: "10px 20px", fontSize: 13.5, fontWeight: tab === t ? 600 : 400, color: tab === t ? "#0a0a0a" : "#888", background: "none", border: "none", cursor: "pointer", borderBottom: tab === t ? "2px solid #0a0a0a" : "2px solid transparent", marginBottom: -1 }}>
                            {t === "upload" ? "Upload & Analyze" : "Analysis Results"}
                        </button>
                    ))}
                </div>

                {/* Error banner */}
                {error && (
                    <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 13.5, color: "#dc2626" }}>
                        ⚠️ {error}
                    </div>
                )}

                {/* UPLOAD TAB */}
                {tab === "upload" && (
                    <>
                        <div style={{ display: "flex", gap: 20 }}>
                            {/* Resume upload */}
                            <div style={{ flex: 1, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}><ResumeAnalysisIcon /><h2 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a" }}>Your Resume</h2></div>
                                <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed #e0e0e0", borderRadius: 10, padding: "48px 24px", cursor: "pointer", background: file ? "#fafafa" : "#fff" }}
                                       onMouseEnter={e => (e.currentTarget.style.borderColor = "#aaa")}
                                       onMouseLeave={e => (e.currentTarget.style.borderColor = "#e0e0e0")}
                                >
                                    <input type="file" accept=".pdf" onChange={handleFileChange} style={{ display: "none" }} />
                                    <div style={{ color: file ? "#0a0a0a" : "#ccc", marginBottom: 12 }}><UploadIcon /></div>
                                    {file ? (
                                        <><div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}><span style={{ color: "#16a34a" }}><CheckIcon /></span><span style={{ fontSize: 13.5, fontWeight: 600, color: "#0a0a0a" }}>{file.name}</span></div><span style={{ fontSize: 12, color: "#aaa" }}>Click to replace</span></>
                                    ) : (
                                        <><span style={{ fontSize: 14, fontWeight: 500, color: "#555", marginBottom: 4 }}>Upload your resume</span><span style={{ fontSize: 12, color: "#aaa" }}>Supported format: PDF</span><button style={{ marginTop: 16, padding: "8px 20px", border: "1px solid #d0d0d0", borderRadius: 7, background: "#fff", fontSize: 13, color: "#555", cursor: "pointer", fontWeight: 500, pointerEvents: "none" }}>Choose File</button></>
                                    )}
                                </label>
                            </div>

                            {/* Job description */}
                            <div style={{ flex: 1, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}><TrackingIcon /><h2 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a" }}>Job Description</h2></div>
                                <textarea
                                    value={jobDesc}
                                    onChange={e => setJobDesc(e.target.value)}
                                    placeholder="Paste the job description here..."
                                    style={{ width: "100%", height: 320, padding: 14, border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 12.5, color: "#333", lineHeight: 1.6, fontFamily: "'DM Sans', system-ui, sans-serif", background: "#fafafa" }}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
                            <button onClick={handleAnalyze} disabled={!file || !jobDesc.trim() || analyzing} style={{ padding: "12px 32px", background: file && jobDesc.trim() ? "#0a0a0a" : "#d0d0d0", color: "#fff", border: "none", borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: file && jobDesc.trim() ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 8 }}>
                                {analyzing ? (<><span style={{ width: 14, height: 14, border: "2px solid #ffffff44", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }}/>Analyzing...</>) : "Analyze Resume →"}
                            </button>
                        </div>
                    </>
                )}

                {/* RESULTS TAB */}
                {tab === "results" && results && (
                    <div>
                        {/* Score overview */}
                        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "28px 32px", marginBottom: 20, display: "flex", alignItems: "center", gap: 48 }}>
                            <div>
                                <h2 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 4 }}>Analysis Complete</h2>
                                <p style={{ fontSize: 13, color: "#888" }}>Based on your resume vs. the job description</p>
                            </div>
                            <div style={{ display: "flex", gap: 40, marginLeft: "auto" }}>
                                <ScoreRing score={Math.round(results.ats_score)} label="ATS Score" />
                                <ScoreRing score={Math.round(results.semantic_score)} label="Semantic Match" />
                                <ScoreRing score={Math.round(results.keyword_match_score)} label="Keyword Match" />
                            </div>
                        </div>

                        {/* Keywords */}
                        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24, marginBottom: 20, display: "flex", gap: 32 }}>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: 13.5, fontWeight: 600, color: "#0a0a0a", marginBottom: 12 }}>✓ Keywords Found ({results.matching_keywords.length})</h3>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                    {results.matching_keywords.length > 0
                                        ? results.matching_keywords.map(k => (<span key={k} style={{ padding: "4px 10px", background: "#f0fdf4", color: "#16a34a", borderRadius: 20, fontSize: 12, fontWeight: 500, border: "1px solid #bbf7d0" }}>{k}</span>))
                                        : <span style={{ fontSize: 13, color: "#aaa" }}>No matching keywords found</span>
                                    }
                                </div>
                            </div>
                            <div style={{ width: 1, background: "#f0f0f0" }} />
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: 13.5, fontWeight: 600, color: "#0a0a0a", marginBottom: 12 }}>✗ Missing Keywords ({results.missing_keywords.length})</h3>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                    {results.missing_keywords.length > 0
                                        ? results.missing_keywords.map(k => (<span key={k} style={{ padding: "4px 10px", background: "#fef2f2", color: "#dc2626", borderRadius: 20, fontSize: 12, fontWeight: 500, border: "1px solid #fecaca" }}>{k}</span>))
                                        : <span style={{ fontSize: 13, color: "#aaa" }}>No missing keywords!</span>
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Score breakdown bars */}
                        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24, marginBottom: 20 }}>
                            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 18 }}>Score Breakdown</h3>
                            {[
                                { label: "Overall ATS Score", score: Math.round(results.ats_score), desc: "Weighted combination of keyword and semantic scores" },
                                { label: "Semantic Similarity", score: Math.round(results.semantic_score), desc: "How closely your resume matches the job description in meaning" },
                                { label: "Keyword Match", score: Math.round(results.keyword_match_score), desc: "Percentage of job keywords found in your resume" },
                            ].map((item, i) => (
                                <div key={i} style={{ marginBottom: i < 2 ? 18 : 0 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                        <div><span style={{ fontSize: 13.5, fontWeight: 600, color: "#0a0a0a" }}>{item.label}</span><span style={{ fontSize: 12, color: "#aaa", marginLeft: 10 }}>{item.desc}</span></div>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: "#0a0a0a" }}>{item.score}%</span>
                                    </div>
                                    <div style={{ height: 6, background: "#f0f0f0", borderRadius: 3, overflow: "hidden" }}>
                                        <div style={{ width: `${item.score}%`, height: "100%", borderRadius: 3, background: item.score >= 75 ? "#0a0a0a" : item.score >= 50 ? "#888" : "#dc2626", transition: "width 0.6s ease" }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <button onClick={() => { setTab("upload"); setResults(null); setError(null); }} style={{ padding: "11px 24px", background: "#fff", color: "#0a0a0a", border: "1px solid #d0d0d0", borderRadius: 9, fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>← Analyze Another</button>
                        </div>
                    </div>
                )}

                {/* Results tab but no results yet */}
                {tab === "results" && !results && (
                    <div style={{ textAlign: "center", padding: "60px 20px", color: "#aaa" }}>
                        <p style={{ fontSize: 14 }}>No results yet. Go to Upload & Analyze first.</p>
                        <button onClick={() => setTab("upload")} style={{ marginTop: 16, padding: "10px 24px", background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>← Go to Upload</button>
                    </div>
                )}
            </main>
        </div>
    );
}