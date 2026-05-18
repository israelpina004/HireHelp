"use client";

import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout";
import { FileIcon, SearchIcon, TrashIcon, UploadIcon, XIcon } from "../../components/Icons";

const RESUME_PDF_BUCKET = "resume_pdfs";

export type AtsCategory = { name: string; matched: string[]; missing: string[]; score: number };
export type AtsSuggestion = { priority: "high" | "medium" | "low"; category: string; title: string; detail: string };

export type ResumeBankItem = {
    id: number;
    filePath: string;
    fileText: string;
    storagePath: string | null;
    pdfUrl: string | null;
    createdAt: string | null;
    atsScore: number | null;
    semanticScore: number | null;
    keywordMatchScore: number | null;
    jobDescription: string;
    jobLabel: string;
    summary: string;
    categories: AtsCategory[];
    suggestions: AtsSuggestion[];
    matchingKeywords: string[];
    missingKeywords: string[];
    analysisCreatedAt: string | null;
};

type Filter = "All Resumes" | "Scored" | "Pending Score";
type Sort = "Sort by Date" | "Sort by Score" | "Sort by Name";

interface ResumeBankClientProps {
    userName: string;
    initials: string;
    email: string;
    resumes: ResumeBankItem[];
}

function formatDate(dateString: string | null) {
    if (!dateString) {
        return "Unknown date";
    }

    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
        return "Unknown date";
    }

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function priorityColors(priority: AtsSuggestion["priority"]) {
    if (priority === "high") return { bg: "#fef2f2", fg: "#b91c1c", border: "#fecaca" };
    if (priority === "medium") return { bg: "#fffbeb", fg: "#a16207", border: "#fde68a" };
    return { bg: "#f0fdf4", fg: "#15803d", border: "#bbf7d0" };
}

function scoreColor(score: number) {
    if (score >= 75) return "#16a34a";
    if (score >= 50) return "#ca8a04";
    return "#dc2626";
}

function ResumeCard({ resume, onOpen }: { resume: ResumeBankItem; onOpen: (resume: ResumeBankItem) => void; }) {
    const roundedScore = resume.atsScore !== null ? Math.round(resume.atsScore) : null;

    return (
        <button
            type="button"
            onClick={() => onOpen(resume)}
            style={{
                background: "#fff",
                border: "1px solid #e8e8e8",
                borderRadius: 12,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                textAlign: "left",
                cursor: "pointer",
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.08)";
                e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
            }}
        >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                    <div style={{ width: 38, height: 38, background: "#f5f5f5", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#555", flexShrink: 0 }}><FileIcon /></div>
                    <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#0a0a0a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{resume.filePath}</div>
                        <div style={{ fontSize: 12, color: "#666", marginTop: 3 }}>Uploaded {formatDate(resume.createdAt)}</div>
                    </div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: roundedScore !== null ? "#0a0a0a" : "#f5f5f5", color: roundedScore !== null ? "#fff" : "#444", whiteSpace: "nowrap" }}>{roundedScore !== null ? "Scored" : "Pending"}</span>
            </div>

            <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: "#666" }}>Latest ATS Score</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#0a0a0a" }}>{roundedScore !== null ? `${roundedScore}%` : "Not scored yet"}</span>
                </div>
                <div style={{ height: 5, background: "#f0f0f0", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ width: `${roundedScore ?? 0}%`, height: "100%", background: "#0a0a0a", borderRadius: 999 }} />
                </div>
            </div>

            <div style={{ fontSize: 12.5, color: "#444", lineHeight: 1.5 }}>
                <span style={{ color: "#666", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.04em" }}>Scored against</span>
                <div style={{ marginTop: 4, color: "#0a0a0a", fontSize: 13, fontWeight: 500 }}>{resume.jobLabel}</div>
            </div>
        </button>
    );
}

function ConfirmDeleteModal({
    resume,
    onCancel,
    onConfirm,
    isDeleting,
}: {
    resume: ResumeBankItem;
    onCancel: () => void;
    onConfirm: () => void;
    isDeleting: boolean;
}) {
    return (
        <div
            style={{ position: "fixed", inset: 0, background: "rgba(10,10,10,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, zIndex: 200 }}
            onClick={(event) => { if (event.target === event.currentTarget && !isDeleting) onCancel(); }}
        >
            <div style={{ width: "min(440px, 100%)", background: "#fff", borderRadius: 14, padding: 28, boxShadow: "0 30px 80px rgba(0,0,0,0.2)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <span style={{ width: 36, height: 36, borderRadius: 10, background: "#fef2f2", color: "#b91c1c", display: "flex", alignItems: "center", justifyContent: "center" }}><TrashIcon /></span>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.01em" }}>Delete this resume?</h3>
                </div>
                <p style={{ fontSize: 13.5, color: "#444", lineHeight: 1.65, marginBottom: 22 }}>
                    This will permanently remove <strong>{resume.filePath}</strong> and any ATS analyses tied to it. This action can&apos;t be undone.
                </p>
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isDeleting}
                        style={{ padding: "10px 18px", borderRadius: 8, border: "1px solid #d0d0d0", background: "#fff", color: "#333", fontSize: 13.5, fontWeight: 600, cursor: isDeleting ? "not-allowed" : "pointer" }}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        aria-disabled={isDeleting}
                        style={{ padding: "10px 18px", borderRadius: 8, border: "none", background: isDeleting ? "#e0a5a5" : "#dc2626", color: "#fff", fontSize: 13.5, fontWeight: 600, cursor: isDeleting ? "not-allowed" : "pointer" }}
                    >
                        {isDeleting ? "Deleting..." : "Delete resume"}
                    </button>
                </div>
            </div>
        </div>
    );
}

function FeedbackPanel({ resume, onRerun }: { resume: ResumeBankItem; onRerun: () => void }) {
    if (resume.atsScore === null) {
        return (
            <div style={{ padding: 18, border: "1px dashed #e0e0e0", borderRadius: 12, background: "#fafafa", color: "#555", fontSize: 13.5, lineHeight: 1.6 }}>
                This resume hasn&apos;t been scored yet.{" "}
                <button
                    type="button"
                    onClick={onRerun}
                    style={{ background: "none", border: "none", color: "#2563eb", fontWeight: 600, cursor: "pointer", padding: 0, fontSize: 13.5 }}
                >
                    Run an ATS analysis →
                </button>
            </div>
        );
    }

    const topMissing = resume.missingKeywords.slice(0, 12);
    const topMatched = resume.matchingKeywords.slice(0, 12);
    const topSuggestions = resume.suggestions.slice(0, 5);
    const hasAnyDetail = topMissing.length + topMatched.length + topSuggestions.length + resume.categories.length > 0;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Score breakdown */}
            <div style={{ background: "#fff", border: "1px solid #ececec", borderRadius: 14, padding: 18 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>Score breakdown</div>
                <ScoreBar label="Overall ATS" value={Math.round(resume.atsScore)} />
                {resume.semanticScore !== null && <ScoreBar label="Semantic similarity" value={Math.round(resume.semanticScore)} />}
                {resume.keywordMatchScore !== null && <ScoreBar label="Skill & keyword coverage" value={Math.round(resume.keywordMatchScore)} />}
            </div>

            {/* Summary */}
            {resume.summary && (
                <div style={{ background: "#fff", border: "1px solid #ececec", borderRadius: 14, padding: 18 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>Summary</div>
                    <p style={{ fontSize: 13.5, color: "#333", lineHeight: 1.7 }}>{resume.summary}</p>
                </div>
            )}

            {/* Category section breakdown */}
            {resume.categories.length > 0 && (
                <div style={{ background: "#fff", border: "1px solid #ececec", borderRadius: 14, padding: 18 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>Section-by-section</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {resume.categories.map((category) => (
                            <div key={category.name}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: "#0a0a0a" }}>{category.name}</span>
                                    <span style={{ fontSize: 12.5, fontWeight: 700, color: scoreColor(category.score) }}>{Math.round(category.score)}%</span>
                                </div>
                                <div style={{ height: 5, background: "#f0f0f0", borderRadius: 3, overflow: "hidden" }}>
                                    <div style={{ width: `${category.score}%`, height: "100%", background: scoreColor(category.score), borderRadius: 3 }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Keyword match */}
            {(topMatched.length > 0 || topMissing.length > 0) && (
                <div style={{ background: "#fff", border: "1px solid #ececec", borderRadius: 14, padding: 18 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>Keyword match</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div>
                            <div style={{ fontSize: 12.5, fontWeight: 600, color: "#15803d", marginBottom: 8 }}>✓ Matched ({resume.matchingKeywords.length})</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {topMatched.length > 0 ? topMatched.map((k) => (
                                    <span key={k} style={{ fontSize: 11.5, padding: "3px 8px", borderRadius: 16, background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" }}>{k}</span>
                                )) : <span style={{ fontSize: 12.5, color: "#888" }}>No matched keywords recorded.</span>}
                            </div>
                            {resume.matchingKeywords.length > topMatched.length && (
                                <div style={{ fontSize: 11.5, color: "#777", marginTop: 6 }}>+ {resume.matchingKeywords.length - topMatched.length} more</div>
                            )}
                        </div>
                        <div>
                            <div style={{ fontSize: 12.5, fontWeight: 600, color: "#b91c1c", marginBottom: 8 }}>✗ Missing ({resume.missingKeywords.length})</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {topMissing.length > 0 ? topMissing.map((k) => (
                                    <span key={k} style={{ fontSize: 11.5, padding: "3px 8px", borderRadius: 16, background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}>{k}</span>
                                )) : <span style={{ fontSize: 12.5, color: "#888" }}>Nothing flagged as missing — great match.</span>}
                            </div>
                            {resume.missingKeywords.length > topMissing.length && (
                                <div style={{ fontSize: 11.5, color: "#777", marginTop: 6 }}>+ {resume.missingKeywords.length - topMissing.length} more</div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Suggestions */}
            {topSuggestions.length > 0 && (
                <div style={{ background: "#fff", border: "1px solid #ececec", borderRadius: 14, padding: 18 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>What to fix</div>
                    <ol style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                        {topSuggestions.map((suggestion, index) => {
                            const pc = priorityColors(suggestion.priority);
                            return (
                                <li key={`${suggestion.title}-${index}`} style={{ borderLeft: `3px solid ${pc.fg}`, paddingLeft: 12, paddingTop: 2, paddingBottom: 2 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                        <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 8px", borderRadius: 12, background: pc.bg, color: pc.fg, border: `1px solid ${pc.border}`, textTransform: "uppercase", letterSpacing: "0.04em" }}>{suggestion.priority}</span>
                                        <span style={{ fontSize: 11.5, color: "#666" }}>{suggestion.category}</span>
                                    </div>
                                    <div style={{ fontSize: 13.5, fontWeight: 600, color: "#0a0a0a", marginBottom: 4 }}>{suggestion.title}</div>
                                    <div style={{ fontSize: 12.5, color: "#444", lineHeight: 1.6 }}>{suggestion.detail}</div>
                                </li>
                            );
                        })}
                    </ol>
                    {resume.suggestions.length > topSuggestions.length && (
                        <div style={{ fontSize: 11.5, color: "#777", marginTop: 10 }}>+ {resume.suggestions.length - topSuggestions.length} more suggestion(s) in the full analysis</div>
                    )}
                </div>
            )}

            {/* Re-run CTA */}
            <button
                type="button"
                onClick={onRerun}
                style={{ padding: "11px 18px", borderRadius: 9, background: "#0a0a0a", color: "#fff", border: "none", fontSize: 13.5, fontWeight: 600, cursor: "pointer", alignSelf: "flex-start" }}
            >
                Re-run with updated resume →
            </button>

            {!hasAnyDetail && (
                <div style={{ padding: 14, background: "#fffaf0", border: "1px solid #f0d9b5", borderRadius: 10, fontSize: 12.5, color: "#8a5a14", lineHeight: 1.55 }}>
                    This older analysis didn&apos;t store detailed feedback. Re-run the ATS analysis above to see keyword match, section scores, and concrete suggestions.
                </div>
            )}
        </div>
    );
}

function ScoreBar({ label, value }: { label: string; value: number }) {
    const color = scoreColor(value);
    return (
        <div style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12.5, color: "#333", fontWeight: 500 }}>{label}</span>
                <span style={{ fontSize: 12.5, fontWeight: 700, color }}>{value}%</span>
            </div>
            <div style={{ height: 5, background: "#f0f0f0", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${value}%`, height: "100%", borderRadius: 3, background: color }} />
            </div>
        </div>
    );
}

function ResumePreviewModal({
    resume,
    onClose,
    onRequestDelete,
    onRerun,
}: {
    resume: ResumeBankItem;
    onClose: () => void;
    onRequestDelete: (resume: ResumeBankItem) => void;
    onRerun: () => void;
}) {
    return (
        <div
            style={{ position: "fixed", inset: 0, background: "rgba(10,10,10,0.42)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 24, overflowY: "auto", zIndex: 100 }}
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div style={{ width: "min(1100px, 100%)", maxHeight: "calc(100vh - 48px)", margin: "0 auto", display: "flex", flexDirection: "column", overflow: "hidden", background: "#fff", borderRadius: 18, boxShadow: "0 30px 80px rgba(0,0,0,0.18)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, padding: "24px 28px", borderBottom: "1px solid #f0f0f0" }}>
                    <div style={{ minWidth: 0 }}>
                        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif" }}>{resume.filePath}</h2>
                        <p style={{ fontSize: 13, color: "#666", marginTop: 6 }}>
                            Uploaded {formatDate(resume.createdAt)}
                            {resume.analysisCreatedAt ? ` · Last scored ${formatDate(resume.analysisCreatedAt)}` : ""}
                            {resume.jobLabel && resume.atsScore !== null ? ` · Scored against ${resume.jobLabel}` : ""}
                        </p>
                    </div>
                    <button type="button" onClick={onClose} aria-label="Close" style={{ background: "none", border: "none", color: "#666", cursor: "pointer", padding: 4 }}><XIcon /></button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)", gap: 0, flex: 1, minHeight: 0, overflow: "hidden" }}>
                    {/* Feedback (now primary) */}
                    <section style={{ padding: 24, minHeight: 0, overflowY: "auto", background: "#fcfcfc", borderRight: "1px solid #f0f0f0" }}>
                        <FeedbackPanel resume={resume} onRerun={onRerun} />
                    </section>

                    {/* Resume preview (secondary) */}
                    <section style={{ padding: 24, minHeight: 0, overflowY: "auto" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: "#666", textTransform: "uppercase", letterSpacing: "0.04em" }}>Resume Preview</div>
                            {resume.pdfUrl && (
                                <a
                                    href={resume.pdfUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ fontSize: 12, fontWeight: 600, color: "#0a0a0a", textDecoration: "none" }}
                                >
                                    Open PDF ↗
                                </a>
                            )}
                        </div>
                        {resume.pdfUrl ? (
                            <div style={{ border: "1px solid #ececec", borderRadius: 14, background: "#f7f7f7", overflow: "hidden", minHeight: 480 }}>
                                <iframe
                                    title={`${resume.filePath} PDF preview`}
                                    src={resume.pdfUrl}
                                    style={{ width: "100%", height: "min(68vh, 760px)", border: "none", display: "block", background: "#f7f7f7" }}
                                />
                            </div>
                        ) : (
                            <div style={{ border: "1px solid #ececec", borderRadius: 14, background: "#fff", padding: 20, minHeight: 360, fontSize: 13.5, color: "#333", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                                {resume.fileText.trim() || "This resume was uploaded before PDF storage was enabled, so only the extracted text is available here."}
                            </div>
                        )}

                        {/* Delete moved here as a low-prominence link in the secondary area */}
                        <div style={{ marginTop: 18, borderTop: "1px solid #f0f0f0", paddingTop: 14 }}>
                            <button
                                type="button"
                                onClick={() => onRequestDelete(resume)}
                                style={{ background: "none", border: "none", color: "#b91c1c", fontSize: 12.5, fontWeight: 600, cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 6 }}
                            >
                                <TrashIcon />
                                Delete this resume
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default function ResumeBankClient({ userName, initials, email, resumes }: ResumeBankClientProps) {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<Filter>("All Resumes");
    const [sort, setSort] = useState<Sort>("Sort by Date");
    const [resumeItems, setResumeItems] = useState(resumes);
    const [selectedResume, setSelectedResume] = useState<ResumeBankItem | null>(null);
    const [pendingDelete, setPendingDelete] = useState<ResumeBankItem | null>(null);
    const [deletingResumeId, setDeletingResumeId] = useState<number | null>(null);
    const [deleteNotice, setDeleteNotice] = useState<string | null>(null);

    useEffect(() => {
        setResumeItems(resumes);
    }, [resumes]);

    const scoredResumes = resumeItems.filter((resume) => resume.atsScore !== null);
    const avgScore = scoredResumes.length > 0
        ? `${Math.round(scoredResumes.reduce((sum, resume) => sum + (resume.atsScore ?? 0), 0) / scoredResumes.length)}%`
        : "—";

    async function handleConfirmDelete() {
        if (!pendingDelete || deletingResumeId !== null) {
            return;
        }
        const resume = pendingDelete;

        const supabase = createClient();
        setDeletingResumeId(resume.id);
        setDeleteNotice(null);

        try {
            const { error: analysesDeleteError } = await supabase
                .from("ats_analyses")
                .delete()
                .eq("resume_id", resume.id);

            if (analysesDeleteError) {
                throw new Error(`Failed to delete linked ATS analyses: ${analysesDeleteError.message}`);
            }

            const { error: resumeDeleteError } = await supabase
                .from("resumes")
                .delete()
                .eq("id", resume.id);

            if (resumeDeleteError) {
                throw new Error(`Failed to delete resume: ${resumeDeleteError.message}`);
            }

            let nextNotice: string | null = null;
            if (resume.storagePath) {
                const { error: storageDeleteError } = await supabase.storage
                    .from(RESUME_PDF_BUCKET)
                    .remove([resume.storagePath]);

                if (storageDeleteError) {
                    nextNotice = `Resume deleted from the bank, but the stored PDF could not be deleted: ${storageDeleteError.message}`;
                }
            }

            setResumeItems((current) => current.filter((item) => item.id !== resume.id));
            setSelectedResume((current) => (current?.id === resume.id ? null : current));
            setPendingDelete(null);
            setDeleteNotice(nextNotice);
            router.refresh();
        } catch (error) {
            setDeleteNotice(error instanceof Error ? error.message : "Failed to delete resume.");
        } finally {
            setDeletingResumeId(null);
        }
    }

    const filteredResumes = resumeItems
        .filter((resume) => {
            const searchNeedle = search.trim().toLowerCase();
            const matchesSearch = searchNeedle.length === 0
                || resume.filePath.toLowerCase().includes(searchNeedle)
                || resume.jobDescription.toLowerCase().includes(searchNeedle)
                || resume.jobLabel.toLowerCase().includes(searchNeedle);

            const matchesFilter = filter === "All Resumes"
                || (filter === "Scored" && resume.atsScore !== null)
                || (filter === "Pending Score" && resume.atsScore === null);

            return matchesSearch && matchesFilter;
        })
        .sort((left, right) => {
            if (sort === "Sort by Score") {
                return (right.atsScore ?? -1) - (left.atsScore ?? -1);
            }

            if (sort === "Sort by Name") {
                return left.filePath.localeCompare(right.filePath);
            }

            return new Date(right.createdAt ?? 0).getTime() - new Date(left.createdAt ?? 0).getTime();
        });

    return (
        <PageLayout currentPage="Resume Bank" title="Resume Bank" subtitle="Browse every uploaded resume and see the full ATS feedback tied to each one." name={userName} initials={initials} email={email}>
                <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
                    {[
                        { label: "Total resumes", value: String(resumeItems.length), tooltip: "Number of unique resume PDFs in your bank." },
                        { label: "Scored resumes", value: String(scoredResumes.length), tooltip: "Resumes with at least one ATS analysis attached." },
                        { label: "Average ATS score", value: avgScore, tooltip: "Mean score across all scored resumes." },
                    ].map(({ label, value, tooltip }) => (
                        <div key={label} title={tooltip} style={{ flex: 1, minWidth: 200, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "18px 22px" }}>
                            <span style={{ fontSize: 12.5, color: "#555", fontWeight: 500 }}>{label}</span>
                            <div style={{ fontSize: 30, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif", marginTop: 8 }}>{value}</div>
                        </div>
                    ))}
                </div>

                {deleteNotice && (
                    <div role="status" style={{ marginBottom: 18, padding: "14px 16px", borderRadius: 12, border: "1px solid #f0d9b5", background: "#fffaf1", color: "#8a5a14", fontSize: 13.5, lineHeight: 1.5 }}>
                        {deleteNotice}
                    </div>
                )}

                <div style={{ display: "flex", gap: 10, marginBottom: 24, alignItems: "center", flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: 240, position: "relative" }}>
                        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}><SearchIcon /></span>
                        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by file name, job title, or job description..." aria-label="Search resumes" style={{ width: "100%", padding: "10px 12px 10px 36px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, color: "#333", background: "#fff", outline: "none", fontFamily: "'DM Sans', system-ui, sans-serif" }} />
                    </div>
                    {(["All Resumes", "Scored", "Pending Score"] as Filter[]).map((option) => (
                        <button key={option} type="button" onClick={() => setFilter(option)} style={{ padding: "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, border: "1px solid #e8e8e8", cursor: "pointer", background: filter === option ? "#0a0a0a" : "#fff", color: filter === option ? "#fff" : "#333" }}>{option}</button>
                    ))}
                    <select value={sort} onChange={(event) => setSort(event.target.value as Sort)} aria-label="Sort resumes" style={{ padding: "10px 14px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13, color: "#333", background: "#fff", cursor: "pointer", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
                        <option>Sort by Date</option>
                        <option>Sort by Score</option>
                        <option>Sort by Name</option>
                    </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginBottom: 32 }}>
                    <div style={{ background: "#fff", border: "2px dashed #d0d0d0", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, minHeight: 200 }}>
                        <div style={{ color: "#999" }}><UploadIcon /></div>
                        <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#333", marginBottom: 4 }}>Upload New Resume</div>
                            <div style={{ fontSize: 12, color: "#666" }}>Analyze another resume and it will appear here automatically</div>
                        </div>
                        <button type="button" onClick={() => router.push("/resume-analysis")} style={{ padding: "9px 20px", background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Upload Resume</button>
                    </div>

                    {filteredResumes.map((resume) => (
                        <ResumeCard key={resume.id} resume={resume} onOpen={setSelectedResume} />
                    ))}
                </div>

                {filteredResumes.length === 0 && (
                    <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "28px 24px", fontSize: 13.5, color: "#444" }}>
                        {resumeItems.length === 0
                            ? "You have no saved resumes in the bank right now. Upload a new resume to add one."
                            : "No resumes matched the current filters. Try clearing the search or upload a new resume for analysis."}
                    </div>
                )}

                {selectedResume && (
                    <ResumePreviewModal
                        resume={selectedResume}
                        onClose={() => setSelectedResume(null)}
                        onRequestDelete={(r) => setPendingDelete(r)}
                        onRerun={() => router.push("/resume-analysis")}
                    />
                )}

                {pendingDelete && (
                    <ConfirmDeleteModal
                        resume={pendingDelete}
                        onCancel={() => setPendingDelete(null)}
                        onConfirm={handleConfirmDelete}
                        isDeleting={deletingResumeId === pendingDelete.id}
                    />
                )}
        </PageLayout>
    );
}
