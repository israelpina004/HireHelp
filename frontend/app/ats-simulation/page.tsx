"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { UploadIcon, ChevronIcon, TrackingIcon, ATSIcon } from "../../components/Icons";

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

            const uploadRes = await fetch("http://localhost:5001/api/resume_parser/upload", {
                method: "POST",
                body: formData,
            });

            if (!uploadRes.ok) throw new Error("Failed to parse resume. Is the Flask backend running?");
            const uploadData = await uploadRes.json();
            const resumeText = uploadData.text || uploadData.raw_text || JSON.stringify(uploadData);

            // Step 2: Run ATS simulation
            const atsRes = await fetch("http://localhost:5001/api/ats/optimize", {
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
        <PageLayout currentPage="ATS Simulation" title="ATS Simulation" subtitle="Test how well your resume performs with Applicant Tracking Systems">

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
        </PageLayout>
    );
}