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
function ChevronIcon() { return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>); }
function CheckIcon() { return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>); }
function SparkleIcon() { return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>); }

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

// ---- Types matching the backend API response ----
interface ApiQuestion {
    id: string;
    question: string;
    why_asked: string;
    difficulty: "easy" | "medium" | "hard";
}
interface ApiCompetency {
    name: string;
    description: string;
    questions: ApiQuestion[];
}
interface ApiResponse {
    job_title: string;
    competencies: ApiCompetency[];
}

// ---- Flatten competencies into a renderable list ----
interface FlatQuestion {
    uid: string;
    category: string;
    question: string;
    why_asked: string;
    difficulty: "easy" | "medium" | "hard";
}

function flattenResponse(data: ApiResponse): FlatQuestion[] {
    const result: FlatQuestion[] = [];
    for (const comp of data.competencies) {
        for (const q of comp.questions) {
            result.push({
                uid: q.id,
                category: comp.name,
                question: q.question,
                why_asked: q.why_asked,
                difficulty: q.difficulty,
            });
        }
    }
    return result;
}

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

const difficultyConfig = {
    easy: { label: "Easy", bg: "#dcfce7", color: "#15803d" },
    medium: { label: "Medium", bg: "#fef9c3", color: "#a16207" },
    hard: { label: "Hard", bg: "#fee2e2", color: "#b91c1c" },
};

const categoryColors: Record<string, string> = {
    "Leadership": "#7c3aed",
    "Problem Solving": "#0369a1",
    "Collaboration": "#0d9488",
    "Teamwork & Collaboration": "#0d9488",
    "Technical": "#b45309",
    "Technical Skills": "#b45309",
    "Communication": "#be185d",
    "Adaptability": "#0891b2",
    "Time Management & Prioritization": "#9333ea",
};
function getCategoryColor(cat: string): string {
    return categoryColors[cat] ?? "#555";
}

function QuestionCard({ q, index, completed, onComplete }: { q: FlatQuestion; index: number; completed: boolean; onComplete: (uid: string) => void; }) {
    const [expanded, setExpanded] = useState(false);
    const [answer, setAnswer] = useState("");
    const diff = difficultyConfig[q.difficulty] ?? difficultyConfig.medium;
    const catColor = getCategoryColor(q.category);

    return (
        <div style={{ background: "#fff", border: `1px solid ${completed ? "#bbf7d0" : "#e8e8e8"}`, borderRadius: 12, overflow: "hidden" }}>
            <button onClick={() => setExpanded(!expanded)} style={{ width: "100%", padding: "18px 20px", display: "flex", alignItems: "flex-start", gap: 14, background: completed ? "#f0fdf4" : "#fff", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ width: 28, height: 28, borderRadius: "50%", background: completed ? "#16a34a" : "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: completed ? "#fff" : "#aaa", fontSize: 12, fontWeight: 700, marginTop: 1 }}>{completed ? <CheckIcon /> : index + 1}</span>
                <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20, background: `${catColor}18`, color: catColor }}>{q.category}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20, background: diff.bg, color: diff.color }}>{diff.label}</span>
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: "#0a0a0a", lineHeight: 1.5 }}>{q.question}</p>
                </div>
                <span style={{ color: "#ccc", transform: expanded ? "rotate(90deg)" : "none", transition: "transform 0.2s", marginTop: 4, flexShrink: 0 }}><ChevronIcon /></span>
            </button>
            {expanded && (
                <div style={{ padding: "0 20px 20px", borderTop: "1px solid #f0f0f0" }}>
                    <div style={{ background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 8, padding: "10px 14px", margin: "16px 0" }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#888" }}>🎯 What they&apos;re evaluating: </span>
                        <span style={{ fontSize: 12.5, color: "#555" }}>{q.why_asked}</span>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                        <label style={{ fontSize: 12.5, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>Your Answer <span style={{ color: "#aaa", fontWeight: 400 }}>(use the STAR method)</span></label>
                        <textarea value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Situation → Task → Action → Result..." rows={5} style={{ width: "100%", padding: 12, border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13, color: "#333", lineHeight: 1.6, fontFamily: "'DM Sans', system-ui, sans-serif", resize: "vertical", outline: "none", background: "#fafafa" }} />
                    </div>
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                        <button onClick={() => { if (answer.trim()) onComplete(q.uid); }} disabled={!answer.trim()} style={{ padding: "8px 18px", background: answer.trim() ? "#0a0a0a" : "#d0d0d0", color: "#fff", border: "none", borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: answer.trim() ? "pointer" : "not-allowed" }}>Mark Complete ✓</button>
                    </div>
                </div>
            )}
        </div>
    );
}

type View = "setup" | "practice";

export default function InterviewPrep() {
    const [view, setView] = useState<View>("setup");
    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [questions, setQuestions] = useState<FlatQuestion[]>([]);
    const [jobTitle, setJobTitle] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [completed, setCompleted] = useState<string[]>([]);

    const categories = ["All", ...Array.from(new Set(questions.map(q => q.category)))];
    const filtered = questions.filter(q => selectedCategory === "All" || q.category === selectedCategory);
    const progress = questions.length > 0 ? Math.round((completed.length / questions.length) * 100) : 0;

    async function handleGenerate() {
        if (jobDescription.trim().length < 50) {
            setError("Please enter at least 50 characters for the job description.");
            return;
        }
        setError(null);
        setLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
            const res = await fetch(`${apiUrl}/api/interview/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ job_description: jobDescription.trim() }),
            });
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.error ?? `Server error: ${res.status}`);
            }
            const data: ApiResponse = await res.json();
            const flat = flattenResponse(data);
            if (flat.length === 0) throw new Error("No questions were generated. Try a more detailed job description.");
            setQuestions(flat);
            setJobTitle(data.job_title);
            setCompleted([]);
            setSelectedCategory("All");
            setView("practice");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#fafafa", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } textarea { resize: vertical; outline: none; } @keyframes spin { to { transform: rotate(360deg); } } @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            <Sidebar currentPage="Interview Prep" />
            <main style={{ flex: 1, padding: "36px 40px", overflowY: "auto" }}>
                <div style={{ marginBottom: 28 }}>
                    <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif" }}>Interview Preparation</h1>
                    <p style={{ fontSize: 14, color: "#888", marginTop: 5 }}>Practice with AI-generated behavioral questions tailored to the job</p>
                </div>

                {/* ── SETUP VIEW ── */}
                {view === "setup" && (
                    <div style={{ animation: "fadeIn 0.3s ease" }}>
                        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 32, maxWidth: 640 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                                <div style={{ width: 40, height: 40, background: "#f5f5f5", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}><InterviewIcon /></div>
                                <div>
                                    <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0a0a0a" }}>Paste the Job Description</h2>
                                    <p style={{ fontSize: 12.5, color: "#aaa", marginTop: 2 }}>The AI will generate behavioral questions tailored to this specific role.</p>
                                </div>
                            </div>

                            <div style={{ marginBottom: 20 }}>
                                <label style={{ fontSize: 12.5, color: "#888", fontWeight: 500, display: "block", marginBottom: 6 }}>
                                    Job description <span style={{ color: "#d00" }}>*</span>
                                    <span style={{ marginLeft: 8, color: jobDescription.length >= 50 ? "#16a34a" : "#aaa" }}>({jobDescription.length} chars, min 50)</span>
                                </label>
                                <textarea
                                    value={jobDescription}
                                    onChange={e => { setJobDescription(e.target.value); setError(null); }}
                                    placeholder="Paste the full job description here — the more detail you provide, the more tailored the questions will be..."
                                    rows={10}
                                    style={{ width: "100%", padding: "12px 14px", border: `1px solid ${error ? "#fca5a5" : "#e8e8e8"}`, borderRadius: 8, fontSize: 13.5, color: "#333", lineHeight: 1.6, fontFamily: "'DM Sans', system-ui, sans-serif", outline: "none", background: "#fafafa" }}
                                />
                            </div>

                            {error && (
                                <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#b91c1c" }}>
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handleGenerate}
                                disabled={loading || jobDescription.trim().length < 50}
                                style={{ width: "100%", padding: "13px", background: loading || jobDescription.trim().length < 50 ? "#d0d0d0" : "#0a0a0a", color: "#fff", border: "none", borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: loading || jobDescription.trim().length < 50 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }}
                            >
                                {loading
                                    ? (<><span style={{ width: 14, height: 14, border: "2px solid #ffffff44", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />Generating Questions...</>)
                                    : (<><SparkleIcon />Generate Interview Questions</>)
                                }
                            </button>
                        </div>
                    </div>
                )}

                {/* ── PRACTICE VIEW ── */}
                {view === "practice" && (
                    <div style={{ animation: "fadeIn 0.3s ease" }}>
                        {/* Header bar */}
                        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "20px 24px", marginBottom: 20 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                                <div style={{ flex: 1 }}>
                                    {jobTitle && (
                                        <div style={{ fontSize: 12, color: "#aaa", marginBottom: 4 }}>Role: <span style={{ color: "#555", fontWeight: 600 }}>{jobTitle}</span></div>
                                    )}
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                        <span style={{ fontSize: 13.5, fontWeight: 600, color: "#0a0a0a" }}>Session Progress</span>
                                        <span style={{ fontSize: 13, color: "#888" }}>{completed.length} of {questions.length} completed</span>
                                    </div>
                                    <div style={{ height: 6, background: "#f0f0f0", borderRadius: 3, overflow: "hidden" }}>
                                        <div style={{ width: `${progress}%`, height: "100%", background: "#0a0a0a", borderRadius: 3, transition: "width 0.4s ease" }} />
                                    </div>
                                </div>
                                <div style={{ textAlign: "right", flexShrink: 0 }}>
                                    <div style={{ fontSize: 24, fontWeight: 700, color: "#0a0a0a", fontFamily: "'DM Serif Display', Georgia, serif", letterSpacing: "-0.03em" }}>{progress}%</div>
                                    <div style={{ fontSize: 11, color: "#aaa" }}>complete</div>
                                </div>
                                <button onClick={() => { setView("setup"); setCompleted([]); setQuestions([]); }} style={{ padding: "8px 16px", background: "#fff", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#555", cursor: "pointer", whiteSpace: "nowrap" }}>← New Session</button>
                            </div>
                        </div>

                        {/* Category filter pills */}
                        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                            {categories.map(cat => (
                                <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding: "7px 14px", borderRadius: 20, fontSize: 12.5, fontWeight: 500, border: "1px solid #e8e8e8", cursor: "pointer", background: selectedCategory === cat ? "#0a0a0a" : "#fff", color: selectedCategory === cat ? "#fff" : "#555" }}>{cat}</button>
                            ))}
                        </div>

                        {/* Question cards */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {filtered.map((q, i) => (
                                <QuestionCard key={q.uid} q={q} index={i} completed={completed.includes(q.uid)} onComplete={uid => setCompleted(prev => prev.includes(uid) ? prev : [...prev, uid])} />
                            ))}
                        </div>

                        {/* Completion banner */}
                        {completed.length === questions.length && questions.length > 0 && (
                            <div style={{ marginTop: 20, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: "20px 24px", textAlign: "center" }}>
                                <div style={{ fontSize: 24, marginBottom: 8 }}>🎉</div>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#16a34a", marginBottom: 4 }}>Session Complete!</h3>
                                <p style={{ fontSize: 13.5, color: "#555" }}>You&apos;ve answered all {questions.length} questions. Great practice session!</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}