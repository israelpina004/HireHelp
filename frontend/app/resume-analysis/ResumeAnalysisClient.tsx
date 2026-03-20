"use client";

import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import ScoreRing from "../../components/ScoreRing";
import { ResumeAnalysisIcon, TrackingIcon, UploadIcon, CheckIcon, ChevronIcon, ATSIcon } from "../../components/Icons";
import { createClient } from "@/app/lib/supabase/client";

/* ── Shared Types ── */

type Category = { name: string; matched: string[]; missing: string[]; score: number; };
type Suggestion = { priority: "high" | "medium" | "low"; category: string; title: string; detail: string; };

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

type ParsedResume = {
    contact_info: { name?: string; email?: string; phone?: string; linkedin?: string; location?: string; };
    education: { institution: string; degree: string; start_year: string; end_year: string; }[];
    experience: { company: string; title: string; start_date: string; end_date: string; description: string; }[];
    projects: { name: string; description: string; url?: string; }[];
    skills: string[];
};

type AnalysisMode = "parse" | "ats";
type Results = { mode: AnalysisMode; parsed?: ParsedResume; ats?: ATSResult; };

/* ── UI Sub-components (from ATS page) ── */

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

function CategoryCard({ category }: { category: Category }) {
    const [open, setOpen] = useState(true);
    const icons: Record<string, string> = {
        "Technical Skills": "⚙️", "Soft Skills & Culture": "🤝",
        "Experience & Seniority": "📈", "Domain Knowledge": "🧠",
    };
    return (
        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, overflow: "hidden" }}>
            <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{icons[category.name] || "📋"}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#0a0a0a" }}>{category.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: category.score >= 75 ? "#16a34a" : category.score >= 50 ? "#ca8a04" : "#dc2626" }}>{category.score}%</span>
                    <ChevronIcon down={open} />
                </div>
            </button>
            {open && (
                <div style={{ padding: "0 20px 18px", borderTop: "1px solid #f0f0f0" }}>
                    <div style={{ marginTop: 14 }}><MiniScoreBar score={category.score} label="Coverage" /></div>
                    {category.matched.length > 0 && (
                        <div style={{ marginBottom: 12 }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: "#16a34a", marginBottom: 8 }}>✓ Matched ({category.matched.length})</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{category.matched.map(k => <Pill key={k} text={k} variant="match" />)}</div>
                        </div>
                    )}
                    {category.missing.length > 0 && (
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: "#dc2626", marginBottom: 8 }}>✗ Missing ({category.missing.length})</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{category.missing.map(k => <Pill key={k} text={k} variant="miss" />)}</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ── Parsed Resume Results View ── */

function ParsedResumeResults({ parsed }: { parsed: ParsedResume }) {
    const ci = parsed.contact_info;
    return (
        <div>
            {/* Contact Info */}
            <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "24px 28px", marginBottom: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 16 }}>📇 Contact Information</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[
                        { label: "Name", value: ci.name },
                        { label: "Email", value: ci.email },
                        { label: "Phone", value: ci.phone },
                        { label: "LinkedIn", value: ci.linkedin },
                        { label: "Location", value: ci.location },
                    ].filter(f => f.value).map(f => (
                        <div key={f.label}>
                            <div style={{ fontSize: 11, fontWeight: 600, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>{f.label}</div>
                            <div style={{ fontSize: 13.5, color: "#0a0a0a", fontWeight: 500 }}>{f.value}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Skills */}
            {parsed.skills.length > 0 && (
                <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24, marginBottom: 20 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 14 }}>🛠 Skills ({parsed.skills.length})</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {parsed.skills.map(s => (
                            <span key={s} style={{ padding: "5px 12px", background: "#f5f5f5", borderRadius: 20, fontSize: 12.5, fontWeight: 500, color: "#333", border: "1px solid #e8e8e8" }}>{s}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* Experience */}
            {parsed.experience.length > 0 && (
                <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24, marginBottom: 20 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 16 }}>💼 Experience ({parsed.experience.length})</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {parsed.experience.map((exp, i) => (
                            <div key={i} style={{ padding: "14px 16px", background: "#fafafa", borderRadius: 10, borderLeft: "4px solid #0a0a0a" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: "#0a0a0a" }}>{exp.title}</div>
                                        <div style={{ fontSize: 13, color: "#555" }}>{exp.company}</div>
                                    </div>
                                    <span style={{ fontSize: 12, color: "#aaa", whiteSpace: "nowrap" }}>{exp.start_date} — {exp.end_date}</span>
                                </div>
                                {exp.description && <p style={{ fontSize: 12.5, color: "#666", lineHeight: 1.6, marginTop: 8 }}>{exp.description}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {parsed.education.length > 0 && (
                <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24, marginBottom: 20 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 16 }}>🎓 Education ({parsed.education.length})</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {parsed.education.map((edu, i) => (
                            <div key={i} style={{ padding: "12px 16px", background: "#fafafa", borderRadius: 10, borderLeft: "4px solid #555" }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#0a0a0a" }}>{edu.degree}</div>
                                <div style={{ fontSize: 13, color: "#555" }}>{edu.institution}</div>
                                <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>{edu.start_year} — {edu.end_year}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {parsed.projects.length > 0 && (
                <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 16 }}>🚀 Projects ({parsed.projects.length})</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {parsed.projects.map((proj, i) => (
                            <div key={i} style={{ padding: "12px 16px", background: "#fafafa", borderRadius: 10, borderLeft: "4px solid #ca8a04" }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#0a0a0a" }}>{proj.name}</div>
                                {proj.description && <p style={{ fontSize: 12.5, color: "#666", lineHeight: 1.6, marginTop: 4 }}>{proj.description}</p>}
                                {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#1d4ed8", marginTop: 4, display: "inline-block" }}>{proj.url}</a>}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ── Main Client Component ── */

type View = "input" | "results";

interface ResumeAnalysisClientProps {
    userId: string;
    userName: string;
    initials: string;
    email: string;
}

export default function ResumeAnalysisClient({ userId, userName, initials, email }: ResumeAnalysisClientProps) {
    const [view, setView] = useState<View>("input");
    const [file, setFile] = useState<File | null>(null);
    const [jd, setJd] = useState("");
    const [running, setRunning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<Results | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(true);

    const hasJD = jd.trim().length > 0;
    const canRun = file != null;

    async function handleAnalyze() {
        if (!file) return;
        setRunning(true);
        setError(null);

        try {
            // Step 1: Upload and parse the PDF
            const formData = new FormData();
            formData.append("file", file);

            const uploadRes = await fetch("http://127.0.0.1:5001/api/resume_parser/upload", {
                method: "POST",
                body: formData,
            });

            if (!uploadRes.ok) throw new Error("Failed to parse resume. Make sure the backend is running.");
            const uploadData = await uploadRes.json();

            // Save the uploaded resume to Supabase
            const resumeText = uploadData.raw_text || uploadData.text || "";
            const { raw_text: _rawText, text: _text, ...parsedFields } = uploadData;
            const supabase = createClient();
            await supabase.from("resumes").insert({
                user_id: userId,
                file_path: file.name,
                file_text: resumeText,
                parsed_data: parsedFields,
                resume_type: "uploaded",
            });

            if (hasJD) {
                // ATS mode: parse + ATS analysis
                if (!resumeText) throw new Error("Could not extract text from the PDF.");

                const atsRes = await fetch("http://127.0.0.1:5001/api/ats/optimize", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ resume_text: resumeText, job_description: jd }),
                });

                if (!atsRes.ok) throw new Error("Failed to run ATS simulation.");
                const atsData: ATSResult = await atsRes.json();

                setResults({ mode: "ats", ats: atsData });
            } else {
                // Parse-only mode: show extracted resume data
                setResults({ mode: "parse", parsed: parsedFields as ParsedResume });
            }

            setView("results");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong. Is the Flask backend running?";
            setError(message);
        } finally {
            setRunning(false);
        }
    }

    function handleReset() {
        setView("input");
        setResults(null);
        setError(null);
    }

    return (
        <PageLayout currentPage="Resume Analysis" title="Resume Analysis" subtitle="Upload your resume for AI-powered parsing, or add a job description for a full ATS simulation" name={userName} initials={initials} email={email}>

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
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}><ResumeAnalysisIcon /><h2 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a" }}>Your Resume</h2></div>
                                <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed #e0e0e0", borderRadius: 10, padding: "40px 24px", cursor: "pointer", background: file ? "#fafafa" : "#fff" }}
                                    onMouseEnter={e => (e.currentTarget.style.borderColor = "#aaa")}
                                    onMouseLeave={e => (e.currentTarget.style.borderColor = "#e0e0e0")}
                                >
                                    <input type="file" accept=".pdf" onChange={e => { if (e.target.files?.[0]) setFile(e.target.files[0]); }} style={{ display: "none" }} />
                                    <div style={{ color: file ? "#16a34a" : "#ccc", marginBottom: 10 }}><UploadIcon /></div>
                                    {file ? (
                                        <><div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}><span style={{ color: "#16a34a" }}><CheckIcon /></span><span style={{ fontSize: 13.5, fontWeight: 600, color: "#0a0a0a" }}>{file.name}</span></div><span style={{ fontSize: 12, color: "#aaa" }}>Click to replace</span></>
                                    ) : (
                                        <><span style={{ fontSize: 14, fontWeight: 500, color: "#555", marginBottom: 4 }}>Upload your resume</span><span style={{ fontSize: 12, color: "#aaa" }}>Supported format: PDF</span><button style={{ marginTop: 16, padding: "8px 20px", border: "1px solid #d0d0d0", borderRadius: 7, background: "#fff", fontSize: 13, color: "#555", cursor: "pointer", fontWeight: 500, pointerEvents: "none" }}>Choose File</button></>
                                    )}
                                </label>
                            </div>

                            {/* Job description */}
                            <div style={{ flex: 1, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                    <TrackingIcon />
                                    <h2 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a" }}>Job Description</h2>
                                    <span style={{ fontSize: 12, color: "#aaa", fontWeight: 500 }}>(Optional)</span>
                                </div>
                                <p style={{ fontSize: 12, color: "#888", marginBottom: 16 }}>
                                    {hasJD ? "✓ ATS Simulation mode — your resume will be scored against this job description" : "Leave empty to get a general resume analysis, or paste a JD for a full ATS simulation"}
                                </p>
                                <textarea value={jd} onChange={e => setJd(e.target.value)} placeholder="Paste the job description here for an ATS simulation..." style={{ width: "100%", height: 298, padding: 14, border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 12.5, color: "#333", lineHeight: 1.6, fontFamily: "'DM Sans', system-ui, sans-serif", background: "#fafafa" }} />
                            </div>
                        </div>

                        <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ width: 8, height: 8, borderRadius: "50%", background: hasJD ? "#16a34a" : "#ca8a04" }} />
                                <span style={{ fontSize: 13, color: "#888" }}>
                                    {hasJD ? "ATS Simulation — resume will be scored against the job description" : "Resume Analysis — general resume parsing and extraction"}
                                </span>
                            </div>
                            <button onClick={handleAnalyze} disabled={!canRun || running} style={{ padding: "12px 32px", background: canRun ? "#0a0a0a" : "#d0d0d0", color: "#fff", border: "none", borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: canRun ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 8 }}>
                                {running ? (<><span style={{ width: 14, height: 14, border: "2px solid #ffffff44", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />{hasJD ? "Running ATS Simulation..." : "Analyzing Resume..."}</>) : (hasJD ? "Run ATS Simulation →" : "Analyze Resume →")}
                            </button>
                        </div>
                    </div>
                )}

                {/* ═══ PARSE-ONLY RESULTS ═══ */}
                {view === "results" && results?.mode === "parse" && results.parsed && (
                    <div style={{ animation: "fadeIn 0.3s ease" }}>
                        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "20px 28px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div>
                                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.02em" }}>Resume Parsed Successfully</h2>
                                <p style={{ fontSize: 13, color: "#888", marginTop: 4 }}>Here&apos;s what we extracted from your resume. Add a job description to run a full ATS simulation.</p>
                            </div>
                            <button onClick={handleReset} style={{ padding: "10px 20px", background: "#fff", border: "1px solid #d0d0d0", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#555", whiteSpace: "nowrap", flexShrink: 0 }}>← Analyze Another</button>
                        </div>
                        <ParsedResumeResults parsed={results.parsed} />
                    </div>
                )}

                {/* ═══ ATS RESULTS ═══ */}
                {view === "results" && results?.mode === "ats" && results.ats && (() => {
                    const ats = results.ats;
                    return (
                        <div style={{ animation: "fadeIn 0.3s ease" }}>
                            {/* Score hero + summary */}
                            <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "28px 32px", marginBottom: 20, display: "flex", alignItems: "center", gap: 36 }}>
                                <ScoreRing score={Math.round(ats.ats_score)} label="ATS Score" />
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                                        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.02em" }}>ATS Score: {Math.round(ats.ats_score)}%</h2>
                                        <span style={{ fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: ats.ats_score >= 75 ? "#f0fdf4" : ats.ats_score >= 50 ? "#fffbeb" : "#fef2f2", color: ats.ats_score >= 75 ? "#16a34a" : ats.ats_score >= 50 ? "#ca8a04" : "#dc2626", border: `1px solid ${ats.ats_score >= 75 ? "#bbf7d0" : ats.ats_score >= 50 ? "#fde68a" : "#fecaca"}` }}>
                                            {ats.ats_score >= 75 ? "✓ Strong Match" : ats.ats_score >= 50 ? "⚡ Moderate Match" : "✗ Needs Work"}
                                        </span>
                                    </div>
                                    {ats.summary && <p style={{ fontSize: 13.5, color: "#555", lineHeight: 1.65, maxWidth: 560 }}>{ats.summary}</p>}
                                </div>
                                <button onClick={handleReset} style={{ padding: "10px 20px", background: "#fff", border: "1px solid #d0d0d0", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#555", whiteSpace: "nowrap", flexShrink: 0 }}>← Run Again</button>
                            </div>

                            {/* Score breakdown */}
                            <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24, marginBottom: 20 }}>
                                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 18 }}>Score Breakdown</h3>
                                <MiniScoreBar score={Math.round(ats.ats_score)} label="Overall ATS Score" />
                                <MiniScoreBar score={Math.round(ats.semantic_score)} label="Semantic Similarity — How closely your resume matches the JD in meaning" />
                                <MiniScoreBar score={Math.round(ats.keyword_match_score)} label="Skill & Keyword Coverage — Average across all categories" />
                            </div>

                            {/* Categories */}
                            {ats.categories && ats.categories.length > 0 && (
                                <div style={{ marginBottom: 20 }}>
                                    <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 14 }}>Category Analysis</h3>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                                        {ats.categories.map(cat => <CategoryCard key={cat.name} category={cat} />)}
                                    </div>
                                </div>
                            )}

                            {/* Suggestions */}
                            {ats.suggestions && ats.suggestions.length > 0 && (
                                <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
                                    <button onClick={() => setShowSuggestions(!showSuggestions)} style={{ width: "100%", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                                        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a" }}>💡 Actionable Suggestions ({ats.suggestions.length})</h3>
                                        <span style={{ color: "#aaa" }}><ChevronIcon down={showSuggestions} /></span>
                                    </button>
                                    {showSuggestions && (
                                        <div style={{ padding: "0 24px 24px", borderTop: "1px solid #f0f0f0" }}>
                                            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
                                                {ats.suggestions.map((s, i) => (
                                                    <div key={i} style={{ padding: "16px 18px", background: "#fafafa", borderRadius: 10, borderLeft: `4px solid ${s.priority === "high" ? "#dc2626" : s.priority === "medium" ? "#ca8a04" : "#16a34a"}` }}>
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

                            {/* Keywords */}
                            <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24, display: "flex", gap: 32 }}>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: 13.5, fontWeight: 600, color: "#0a0a0a", marginBottom: 12 }}>✓ All Matched ({ats.matching_keywords.length})</h3>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                        {ats.matching_keywords.length > 0 ? ats.matching_keywords.map(k => <Pill key={k} text={k} variant="match" />) : <span style={{ fontSize: 13, color: "#aaa" }}>No matching keywords found</span>}
                                    </div>
                                </div>
                                <div style={{ width: 1, background: "#f0f0f0" }} />
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: 13.5, fontWeight: 600, color: "#0a0a0a", marginBottom: 12 }}>✗ All Missing ({ats.missing_keywords.length})</h3>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                        {ats.missing_keywords.length > 0 ? ats.missing_keywords.map(k => <Pill key={k} text={k} variant="miss" />) : <span style={{ fontSize: 13, color: "#aaa" }}>No missing keywords — great match!</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })()}
        </PageLayout>
    );
}
