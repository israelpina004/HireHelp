"use client";

import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import ScoreRing from "../../components/ScoreRing";
import { ResumeAnalysisIcon, TrackingIcon, UploadIcon, CheckIcon } from "../../components/Icons";

// --- API response type ---
type AnalysisResult = {
    ats_score: number;
    semantic_score: number;
    keyword_match_score: number;
    matching_keywords: string[];
    missing_keywords: string[];
};

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

            const uploadRes = await fetch("http://127.0.0.1:5001/api/resume_parser/upload", {
                method: "POST",
                body: formData,
            });

            if (!uploadRes.ok) throw new Error("Failed to parse resume. Make sure the backend is running.");
            const uploadData = await uploadRes.json();

            // Use the raw_text the backend now returns alongside the parsed structure
            const resumeText = uploadData.raw_text || uploadData.text;
            if (!resumeText) throw new Error("Could not extract text from the PDF. Make sure it's a readable (non-scanned) PDF.");

            // Step 2: Run ATS analysis
            const atsRes = await fetch("http://127.0.0.1:5001/api/ats/optimize", {
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
        <PageLayout currentPage="Resume Analysis" title="Resume Analysis & Optimization" subtitle="Upload your resume and job description for AI-powered insights">

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
                                {analyzing ? (<><span style={{ width: 14, height: 14, border: "2px solid #ffffff44", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />Analyzing...</>) : "Analyze Resume →"}
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
        </PageLayout>
    );
}