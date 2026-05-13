"use client";

import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout";
import { FileIcon, SearchIcon, TrashIcon, UploadIcon, XIcon } from "../../components/Icons";

const RESUME_PDF_BUCKET = "resume_pdfs";

export type ResumeBankItem = {
    id: number;
    filePath: string;
    fileText: string;
    storagePath: string | null;
    pdfUrl: string | null;
    createdAt: string | null;
    atsScore: number | null;
    jobDescription: string;
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

function truncateText(value: string, maxLength: number) {
    const trimmed = value.replace(/\s+/g, " ").trim();
    if (!trimmed) {
        return "No job description saved for this analysis.";
    }

    if (trimmed.length <= maxLength) {
        return trimmed;
    }

    return `${trimmed.slice(0, maxLength - 1).trimEnd()}…`;
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
                        <div style={{ fontSize: 12, color: "#888", marginTop: 3 }}>Uploaded {formatDate(resume.createdAt)}</div>
                    </div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: roundedScore !== null ? "#0a0a0a" : "#f5f5f5", color: roundedScore !== null ? "#fff" : "#666", whiteSpace: "nowrap" }}>{roundedScore !== null ? "Scored" : "Pending"}</span>
            </div>

            <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: "#888" }}>Latest ATS Score</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#0a0a0a" }}>{roundedScore !== null ? `${roundedScore}%` : "Not scored yet"}</span>
                </div>
                <div style={{ height: 5, background: "#f0f0f0", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ width: `${roundedScore ?? 0}%`, height: "100%", background: "#0a0a0a", borderRadius: 999 }} />
                </div>
            </div>

            <div style={{ fontSize: 12.5, color: "#666", lineHeight: 1.5 }}>
                {truncateText(resume.jobDescription, 110)}
            </div>
        </button>
    );
}

function ResumePreviewModal({
    resume,
    onClose,
    onDelete,
    isDeleting,
}: {
    resume: ResumeBankItem;
    onClose: () => void;
    onDelete: (resume: ResumeBankItem) => void;
    isDeleting: boolean;
}) {
    const roundedScore = resume.atsScore !== null ? Math.round(resume.atsScore) : null;

    return (
        <div
            style={{ position: "fixed", inset: 0, background: "rgba(10,10,10,0.42)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 24, overflowY: "auto", zIndex: 100 }}
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div style={{ width: "min(1040px, 100%)", maxHeight: "calc(100vh - 48px)", margin: "0 auto", display: "flex", flexDirection: "column", overflow: "hidden", background: "#fff", borderRadius: 18, boxShadow: "0 30px 80px rgba(0,0,0,0.18)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, padding: "24px 28px", borderBottom: "1px solid #f0f0f0" }}>
                    <div>
                        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif" }}>{resume.filePath}</h2>
                        <p style={{ fontSize: 13, color: "#888", marginTop: 6 }}>Uploaded {formatDate(resume.createdAt)}{resume.analysisCreatedAt ? ` · Last scored ${formatDate(resume.analysisCreatedAt)}` : ""}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <button
                            type="button"
                            onClick={() => onDelete(resume)}
                            disabled={isDeleting}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "9px 14px",
                                borderRadius: 10,
                                border: "1px solid #f3d0d0",
                                background: isDeleting ? "#faf5f5" : "#fff5f5",
                                color: isDeleting ? "#b17d7d" : "#c24141",
                                cursor: isDeleting ? "not-allowed" : "pointer",
                                fontSize: 13,
                                fontWeight: 600,
                            }}
                        >
                            <TrashIcon />
                            {isDeleting ? "Deleting..." : "Delete Resume"}
                        </button>
                        <button type="button" onClick={onClose} style={{ background: "none", border: "none", color: "#777", cursor: "pointer", padding: 4 }}><XIcon /></button>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 0, flex: 1, minHeight: 0, overflow: "hidden" }}>
                    <aside style={{ borderRight: "1px solid #f0f0f0", padding: 24, minHeight: 0, overflowY: "auto", background: "#fcfcfc" }}>
                        <div style={{ background: "#fff", border: "1px solid #ececec", borderRadius: 14, padding: 18, marginBottom: 16 }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 8 }}>ATS Score</div>
                            <div style={{ fontSize: 34, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif" }}>{roundedScore !== null ? `${roundedScore}%` : "--"}</div>
                            <div style={{ marginTop: 10, height: 6, background: "#f0f0f0", borderRadius: 999, overflow: "hidden" }}><div style={{ width: `${roundedScore ?? 0}%`, height: "100%", background: "#0a0a0a", borderRadius: 999 }} /></div>
                        </div>

                        <div style={{ background: "#fff", border: "1px solid #ececec", borderRadius: 14, padding: 18 }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 10 }}>Job Description Used for Scoring</div>
                            <div style={{ fontSize: 13, color: "#444", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>
                                {resume.jobDescription.trim() || "No ATS analysis is linked to this resume yet."}
                            </div>
                        </div>
                    </aside>

                    <section style={{ padding: 24, minHeight: 0, overflowY: "auto" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: "#888" }}>Resume Preview</div>
                            {resume.pdfUrl && (
                                <a
                                    href={resume.pdfUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ fontSize: 12, fontWeight: 600, color: "#0a0a0a", textDecoration: "none" }}
                                >
                                    Open PDF
                                </a>
                            )}
                        </div>
                        {resume.pdfUrl ? (
                            <div style={{ border: "1px solid #ececec", borderRadius: 14, background: "#f7f7f7", overflow: "hidden", minHeight: 560 }}>
                                <iframe
                                    title={`${resume.filePath} PDF preview`}
                                    src={resume.pdfUrl}
                                    style={{ width: "100%", height: "min(72vh, 860px)", border: "none", display: "block", background: "#f7f7f7" }}
                                />
                            </div>
                        ) : (
                            <div style={{ border: "1px solid #ececec", borderRadius: 14, background: "#fff", padding: 20, minHeight: 420, fontSize: 13.5, color: "#333", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                                {resume.fileText.trim() || "This resume was uploaded before PDF storage was enabled, so only the extracted text is available here."}
                            </div>
                        )}
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
    const [deletingResumeId, setDeletingResumeId] = useState<number | null>(null);
    const [deleteNotice, setDeleteNotice] = useState<string | null>(null);

    useEffect(() => {
        setResumeItems(resumes);
    }, [resumes]);

    const scoredResumes = resumeItems.filter((resume) => resume.atsScore !== null);
    const avgScore = scoredResumes.length > 0
        ? `${Math.round(scoredResumes.reduce((sum, resume) => sum + (resume.atsScore ?? 0), 0) / scoredResumes.length)}%`
        : "--";

    async function handleDeleteResume(resume: ResumeBankItem) {
        if (deletingResumeId !== null) {
            return;
        }

        const confirmed = window.confirm(`Delete ${resume.filePath}? This will also remove linked ATS analyses for this upload.`);
        if (!confirmed) {
            return;
        }

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
                || resume.jobDescription.toLowerCase().includes(searchNeedle);

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
        <PageLayout currentPage="Resume Bank" title="Resume Bank" subtitle="Browse every uploaded resume and inspect the latest ATS result tied to each one" name={userName} initials={initials} email={email}>
                <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                    {[
                        { label: "Total Resumes", value: String(resumeItems.length), icon: "📄" },
                        { label: "Scored", value: String(scoredResumes.length), icon: "⚡" },
                        { label: "Avg ATS Score", value: avgScore, icon: "⭐" },
                    ].map(({ label, value, icon }) => (
                        <div key={label} style={{ flex: 1, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "18px 22px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                <span style={{ fontSize: 12.5, color: "#888", fontWeight: 500 }}>{label}</span>
                                <span style={{ fontSize: 20 }}>{icon}</span>
                            </div>
                            <span style={{ fontSize: 30, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif" }}>{value}</span>
                        </div>
                    ))}
                </div>

                {deleteNotice && (
                    <div style={{ marginBottom: 18, padding: "14px 16px", borderRadius: 12, border: "1px solid #f0d9b5", background: "#fffaf1", color: "#8a5a14", fontSize: 13.5, lineHeight: 1.5 }}>
                        {deleteNotice}
                    </div>
                )}

                <div style={{ display: "flex", gap: 10, marginBottom: 24, alignItems: "center", flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: 240, position: "relative" }}>
                        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}><SearchIcon /></span>
                        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by file name or job description..." style={{ width: "100%", padding: "10px 12px 10px 36px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, color: "#333", background: "#fff", outline: "none", fontFamily: "'DM Sans', system-ui, sans-serif" }} />
                    </div>
                    {(["All Resumes", "Scored", "Pending Score"] as Filter[]).map((option) => (
                        <button key={option} type="button" onClick={() => setFilter(option)} style={{ padding: "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, border: "1px solid #e8e8e8", cursor: "pointer", background: filter === option ? "#0a0a0a" : "#fff", color: filter === option ? "#fff" : "#555" }}>{option}</button>
                    ))}
                    <select value={sort} onChange={(event) => setSort(event.target.value as Sort)} style={{ padding: "10px 14px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13, color: "#555", background: "#fff", cursor: "pointer", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
                        <option>Sort by Date</option>
                        <option>Sort by Score</option>
                        <option>Sort by Name</option>
                    </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, marginBottom: 32 }}>
                    <div style={{ background: "#fff", border: "2px dashed #e0e0e0", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, minHeight: 200 }}>
                        <div style={{ color: "#ccc" }}><UploadIcon /></div>
                        <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#555", marginBottom: 4 }}>Upload New Resume</div>
                            <div style={{ fontSize: 12, color: "#aaa" }}>Analyze another resume and it will appear here automatically</div>
                        </div>
                        <button type="button" onClick={() => router.push("/resume-analysis")} style={{ padding: "9px 20px", background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Upload Resume</button>
                    </div>

                    {filteredResumes.map((resume) => (
                        <ResumeCard key={resume.id} resume={resume} onOpen={setSelectedResume} />
                    ))}
                </div>

                {filteredResumes.length === 0 && (
                    <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "28px 24px", fontSize: 13.5, color: "#666" }}>
                        {resumeItems.length === 0
                            ? "You have no saved resumes in the bank right now. Upload a new resume to add one."
                            : "No resumes matched the current filters. Try clearing the search or upload a new resume for analysis."}
                    </div>
                )}

                {selectedResume && (
                    <ResumePreviewModal
                        resume={selectedResume}
                        onClose={() => setSelectedResume(null)}
                        onDelete={handleDeleteResume}
                        isDeleting={deletingResumeId === selectedResume.id}
                    />
                )}
        </PageLayout>
    );
}