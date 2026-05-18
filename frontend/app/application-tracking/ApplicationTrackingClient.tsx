"use client";

import { useState, useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import { PlusIcon, ExportIcon, EditIcon, TrashIcon, XIcon, SearchIcon } from "../../components/Icons";
import { createClient } from "@/app/lib/supabase/client";

type Status = "Applied" | "Interviewing" | "Offered" | "Rejected" | "Withdrawn" | "Ghosted";
type Application = { id: number; company: string; position: string; status: Status; atsScore: number; summary: string; appliedDate: string; lastUpdate: string; };

const statusOptions: Status[] = ["Applied", "Interviewing", "Offered", "Rejected", "Withdrawn", "Ghosted"];

const statusConfig: Record<Status, { bg: string; color: string; border: string }> = {
    Applied:      { bg: "#f5f5f5", color: "#444",    border: "#e0e0e0" },
    Interviewing: { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
    Offered:      { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
    Rejected:     { bg: "#fef2f2", color: "#b91c1c", border: "#fecaca" },
    Withdrawn:    { bg: "#f5f3ff", color: "#6d28d9", border: "#ddd6fe" },
    Ghosted:      { bg: "#fff7ed", color: "#9a3412", border: "#fed7aa" },
};

type ResumeOption = { id: number; label: string; text: string };

const emptyForm = { company: "", position: "", status: "Applied" as Status, summary: "", atsScore: "", appliedDate: "", resumeId: "" };

interface ApplicationTrackingClientProps {
    userId: string;
    userName: string;
    initials: string;
    email: string;
}

export default function ApplicationTrackingClient({ userId, userName, initials, email }: ApplicationTrackingClientProps) {
    const [apps, setApps] = useState<Application[]>([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [resumes, setResumes] = useState<ResumeOption[]>([]);
    const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

    useEffect(() => {
        async function fetchApps() {
            const supabase = createClient();
            const { data } = await supabase.from("application_tracking_sys").select("*").eq("user_id", userId).order("created_at", { ascending: false });
            if (data) {
                setApps(data.map(d => ({
                    id: d.id,
                    company: d.company,
                    position: d.position,
                    status: d.status as Status,
                    atsScore: d.ats_score,
                    summary: d.summary || "",
                    appliedDate: new Date(d.created_at).toISOString().split("T")[0],
                    lastUpdate: new Date(d.created_at).toISOString().split("T")[0]
                })));
            }
        }
        async function fetchResumes() {
            const supabase = createClient();
            const { data } = await supabase
                .from("resumes")
                .select("id,file_path,file_text,created_at")
                .eq("user_id", userId)
                .eq("resume_type", "uploaded")
                .order("created_at", { ascending: false });
            if (data) {
                setResumes(
                    data.map((d) => ({
                        id: d.id,
                        label: (d.file_path?.split("/").pop() ?? `Resume #${d.id}`) || `Resume #${d.id}`,
                        text: d.file_text ?? "",
                    }))
                );
            }
        }
        fetchApps();
        fetchResumes();
    }, [userId]);

    const filtered = apps.filter(a => {
        const matchSearch = a.company.toLowerCase().includes(search.toLowerCase()) || a.position.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "All Status" || a.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const total = apps.length;
    const applied = apps.filter(a => a.status === "Applied").length;
    const interviewing = apps.filter(a => a.status === "Interviewing").length;
    const offers = apps.filter(a => a.status === "Offered").length;
    const scoredApps = apps.filter((a) => a.atsScore > 0);
    const avgATS = scoredApps.length
        ? `${Math.round(scoredApps.reduce((s, a) => s + a.atsScore, 0) / scoredApps.length)}%`
        : "—";

    function openAdd() {
        setForm(emptyForm);
        setEditingId(null);
        setShowAdvanced(false);
        setShowModal(true);
    }
    function openEdit(app: Application) {
        setForm({ company: app.company, position: app.position, status: app.status, summary: app.summary, atsScore: String(app.atsScore), appliedDate: app.appliedDate, resumeId: "" });
        setEditingId(app.id);
        setShowAdvanced(Boolean(app.atsScore));
        setShowModal(true);
    }

    async function handleSave() {
        if (!form.company || !form.position) return;
        setSaving(true);
        const today = new Date().toISOString().split("T")[0];
        const supabase = createClient();

        try {
            let finalAtsScore = Number(form.atsScore) || 0;

            // Generate ATS score automatically if adding new and have a summary, and the user didn't override.
            if (editingId === null && form.summary && !form.atsScore) {
                const { data: recentAnalyses } = await supabase
                    .from("ats_analyses")
                    .select("ats_score, job_description, resume_id")
                    .eq("user_id", userId)
                    .order("created_at", { ascending: false })
                    .limit(50);

                const normalizedInput = form.summary.trim().toLowerCase().replace(/\s+/g, " ");
                const matchedAnalysis = recentAnalyses?.find(a =>
                    a.job_description && a.job_description.trim().toLowerCase().replace(/\s+/g, " ") === normalizedInput
                );

                if (matchedAnalysis?.ats_score != null) {
                    finalAtsScore = matchedAnalysis.ats_score;
                } else {
                    // Pick the resume the user selected, or fall back to the latest.
                    let resumeText: string | undefined;
                    if (form.resumeId) {
                        resumeText = resumes.find((r) => r.id === Number(form.resumeId))?.text;
                    }
                    if (!resumeText) {
                        const { data: latestResume } = await supabase
                            .from("resumes")
                            .select("file_text")
                            .eq("user_id", userId)
                            .order("created_at", { ascending: false })
                            .limit(1)
                            .maybeSingle();
                        resumeText = latestResume?.file_text ?? undefined;
                    }

                    if (resumeText) {
                        try {
                            const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5001").replace(/\/$/, "");
                            const atsRes = await fetch(`${API_URL}/api/ats/optimize`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ resume_text: resumeText, job_description: form.summary }),
                            });

                            if (atsRes.ok) {
                                const atsData = await atsRes.json();
                                if (atsData.ats_score != null) {
                                    finalAtsScore = atsData.ats_score;
                                } else {
                                    throw new Error("No ATS score returned from API");
                                }
                            } else {
                                throw new Error(`ATS API failed with status ${atsRes.status}`);
                            }
                        } catch (error) {
                            console.warn("ATS optimization failed, falling back to latest stored ATS score:", error);
                            const { data: latestAts } = await supabase
                                .from("ats_analyses")
                                .select("ats_score")
                                .eq("user_id", userId)
                                .order("created_at", { ascending: false })
                                .limit(1)
                                .maybeSingle();

                            if (latestAts?.ats_score != null) {
                                finalAtsScore = latestAts.ats_score;
                            }
                        }
                    }
                }
            }

            if (editingId !== null) {
                const { error: updateError } = await supabase.from("application_tracking_sys").update({
                    company: form.company,
                    position: form.position,
                    status: form.status,
                    summary: form.summary,
                    ats_score: Math.round(finalAtsScore),
                }).eq("id", editingId);

                if (updateError) throw new Error(updateError.message);

                setApps(prev => prev.map(a => a.id === editingId ? { ...a, company: form.company, position: form.position, status: form.status, summary: form.summary, atsScore: Math.round(finalAtsScore), lastUpdate: today } : a));
            } else {
                const { data, error: insertError } = await supabase.from("application_tracking_sys").insert({
                    user_id: userId,
                    company: form.company,
                    position: form.position,
                    status: form.status,
                    summary: form.summary,
                    ats_score: Math.round(finalAtsScore),
                }).select("id, created_at").single();

                if (insertError) throw new Error(insertError.message);

                if (data) {
                    setApps(prev => [{ id: data.id, company: form.company, position: form.position, status: form.status, summary: form.summary, atsScore: Math.round(finalAtsScore), appliedDate: new Date(data.created_at).toISOString().split("T")[0], lastUpdate: new Date(data.created_at).toISOString().split("T")[0] }, ...prev]);
                }
            }
            setShowModal(false);
        } catch (error: unknown) {
            console.error("Failed to save application:", error);
            const message = error instanceof Error ? error.message : "Unknown error";
            alert("Failed to save: " + message);
        } finally {
            setSaving(false);
        }
    }

    async function handleConfirmDelete() {
        if (pendingDeleteId === null) return;
        const supabase = createClient();
        const id = pendingDeleteId;
        setPendingDeleteId(null);
        const { error } = await supabase.from("application_tracking_sys").delete().eq("id", id);
        if (!error) {
            setApps((prev) => prev.filter((a) => a.id !== id));
        } else {
            alert("Failed to delete: " + error.message);
        }
    }

    function formatDate(d: string) { return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }

    return (
        <PageLayout currentPage="Application Tracking" title="Application Tracking" subtitle="Manage and monitor all your job applications in one place" headerRight={
            <button onClick={openAdd} style={{ display: "flex", alignItems: "center", gap: 6, padding: "11px 18px", background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 9, fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}><PlusIcon /> Add Application</button>
        } name={userName} initials={initials} email={email}>
                <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
                    {[
                        { label: "Total applications", value: total, tooltip: "All applications in your tracker." },
                        { label: "Applied", value: applied, tooltip: "Applications in the 'Applied' state — submitted but no response yet." },
                        { label: "Interviewing", value: interviewing, tooltip: "Applications currently in interview rounds." },
                        { label: "Offers", value: offers, tooltip: "Offers you've received." },
                        { label: "Average ATS score", value: avgATS, tooltip: "Mean ATS score across applications with a score. Shows '—' if none have been scored." },
                    ].map(({ label, value, tooltip }) => (
                        <div key={label} title={tooltip} style={{ flex: 1, minWidth: 140, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "16px 18px" }}>
                            <div style={{ fontSize: 12, color: "#666", fontWeight: 500, marginBottom: 8 }}>{label}</div>
                            <div style={{ fontSize: 26, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif" }}>{value}</div>
                        </div>
                    ))}
                </div>
                <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
                    <div style={{ flex: 1, position: "relative", minWidth: 240 }}>
                        <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}><SearchIcon /></span>
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by company or position..." aria-label="Search applications" style={{ width: "100%", padding: "9px 12px 9px 34px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, color: "#333", background: "#fff", fontFamily: "'DM Sans', system-ui, sans-serif" }} />
                    </div>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} aria-label="Filter by status" style={{ padding: "9px 14px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13, color: "#333", background: "#fff", fontFamily: "'DM Sans', system-ui, sans-serif", cursor: "pointer" }}>
                        <option>All Status</option>
                        {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", border: "1px solid #e8e8e8", borderRadius: 8, background: "#fff", fontSize: 13, color: "#333", cursor: "pointer", fontWeight: 500 }}><ExportIcon /> Export</button>
                </div>
                <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, overflow: "hidden" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 2.5fr 1.2fr 0.9fr 1.1fr 1.1fr 0.6fr", padding: "12px 20px", borderBottom: "1px solid #f0f0f0", background: "#fafafa" }}>
                        {["Company", "Position", "Status", "ATS Score", "Applied Date", "Last Update", ""].map((h, i) => (<span key={i} style={{ fontSize: 12, fontWeight: 600, color: "#666", letterSpacing: "0.04em", textTransform: "uppercase" }}>{h}</span>))}
                    </div>
                    {filtered.length === 0 ? (
                        <div style={{ padding: "44px 20px", textAlign: "center", color: "#444", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                            <div style={{ width: 56, height: 56, borderRadius: 14, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <rect x="3" y="4" width="18" height="16" rx="2" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>
                            <div>
                                <div style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 4 }}>
                                    {apps.length === 0 ? "No applications yet" : "No applications match your filters"}
                                </div>
                                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.55, maxWidth: 380 }}>
                                    {apps.length === 0
                                        ? "Start by logging the first job you applied for. We'll track status, dates, and ATS score in one place."
                                        : "Try clearing the search or status filter to see all applications."}
                                </div>
                            </div>
                            {apps.length === 0 && (
                                <button
                                    onClick={openAdd}
                                    style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 18px", background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 9, fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}
                                >
                                    <PlusIcon /> Add your first application
                                </button>
                            )}
                        </div>
                    ) : filtered.map((app, i) => {
                        const cfg = statusConfig[app.status] ?? statusConfig.Applied;
                        return (
                            <div key={app.id} style={{ display: "grid", gridTemplateColumns: "2fr 2.5fr 1.2fr 0.9fr 1.1fr 1.1fr 0.6fr", padding: "15px 20px", borderBottom: i < filtered.length - 1 ? "1px solid #f5f5f5" : "none", alignItems: "center" }} onMouseEnter={e => (e.currentTarget.style.background = "#fafafa")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                                <span style={{ fontSize: 13.5, fontWeight: 600, color: "#0a0a0a" }}>{app.company}</span>
                                <span style={{ fontSize: 13, color: "#444" }}>{app.position}</span>
                                <span>
                                    <select
                                        value={app.status}
                                        aria-label={`Status for ${app.company}`}
                                        onChange={async (e) => {
                                            const newStatus = e.target.value as Status;
                                            setApps(prev => prev.map(a => a.id === app.id ? { ...a, status: newStatus } : a));
                                            const supabase = createClient();
                                            await supabase.from("application_tracking_sys").update({ status: newStatus }).eq("id", app.id);
                                        }}
                                        style={{ fontSize: 12, fontWeight: 600, padding: "4px 8px", borderRadius: 20, background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`, cursor: "pointer", outline: "none", fontFamily: "inherit" }}
                                    >
                                        {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </span>
                                <span>
                                    {app.atsScore > 0 ? (
                                        <span style={{ fontSize: 12.5, fontWeight: 700, padding: "4px 10px", borderRadius: 6, background: "#0a0a0a", color: "#fff" }}>{app.atsScore}%</span>
                                    ) : (
                                        <span style={{ fontSize: 12.5, color: "#888" }}>—</span>
                                    )}
                                </span>
                                <span style={{ fontSize: 12.5, color: "#666" }}>{formatDate(app.appliedDate)}</span>
                                <span style={{ fontSize: 12.5, color: "#666" }}>{formatDate(app.lastUpdate)}</span>
                                <span style={{ display: "flex", gap: 6 }}>
                                    <button onClick={() => openEdit(app)} aria-label={`Edit ${app.company}`} style={{ background: "none", border: "none", cursor: "pointer", color: "#666", padding: 4 }} onMouseEnter={e => (e.currentTarget.style.color = "#0a0a0a")} onMouseLeave={e => (e.currentTarget.style.color = "#666")}><EditIcon /></button>
                                    <button onClick={() => setPendingDeleteId(app.id)} aria-label={`Delete ${app.company}`} style={{ background: "none", border: "none", cursor: "pointer", color: "#666", padding: 4 }} onMouseEnter={e => (e.currentTarget.style.color = "#dc2626")} onMouseLeave={e => (e.currentTarget.style.color = "#666")}><TrashIcon /></button>
                                </span>
                            </div>
                        );
                    })}
                </div>
            {showModal && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }} onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
                    <div style={{ background: "#fff", borderRadius: 14, padding: 32, width: "min(520px, 100%)", maxHeight: "calc(100vh - 32px)", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.15)", animation: "modalIn 0.2s ease" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.02em" }}>{editingId ? "Edit Application" : "Add Application"}</h2>
                            <button onClick={() => setShowModal(false)} aria-label="Close" style={{ background: "none", border: "none", cursor: "pointer", color: "#666" }}><XIcon /></button>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            {[{ label: "Company", key: "company", placeholder: "e.g. Google" }, { label: "Position", key: "position", placeholder: "e.g. Software Engineer" }].map(({ label, key, placeholder }) => (
                                <div key={key}>
                                    <label style={{ fontSize: 12.5, fontWeight: 600, color: "#333", display: "block", marginBottom: 5 }}>{label}</label>
                                    <input
                                        value={(form as unknown as Record<string, string>)[key]}
                                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                                        placeholder={placeholder}
                                        style={{ width: "100%", padding: "10px 12px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, color: "#333", fontFamily: "'DM Sans', system-ui, sans-serif" }}
                                    />
                                </div>
                            ))}
                            <div>
                                <label style={{ fontSize: 12.5, fontWeight: 600, color: "#333", display: "block", marginBottom: 5 }}>Status</label>
                                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Status }))} style={{ width: "100%", padding: "10px 12px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, color: "#333", fontFamily: "'DM Sans', system-ui, sans-serif", background: "#fff" }}>
                                    {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={{ fontSize: 12.5, fontWeight: 600, color: "#333", display: "block", marginBottom: 5 }}>Job description</label>
                                <textarea value={form.summary} onChange={e => setForm(f => ({ ...f, summary: e.target.value }))} placeholder="Paste the job description here. If you don't override below, we'll calculate an ATS score automatically." style={{ width: "100%", height: 100, padding: "10px 12px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, color: "#333", fontFamily: "'DM Sans', system-ui, sans-serif", resize: "vertical" }} />
                            </div>
                            <div>
                                <label style={{ fontSize: 12.5, fontWeight: 600, color: "#333", display: "block", marginBottom: 5 }}>Applied date</label>
                                <input type="date" value={form.appliedDate} onChange={e => setForm(f => ({ ...f, appliedDate: e.target.value }))} style={{ width: "100%", padding: "10px 12px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, color: "#333", fontFamily: "'DM Sans', system-ui, sans-serif" }} />
                            </div>

                            {/* Advanced section — hidden by default */}
                            <button
                                type="button"
                                onClick={() => setShowAdvanced((v) => !v)}
                                aria-expanded={showAdvanced}
                                style={{ alignSelf: "flex-start", background: "none", border: "none", color: "#2563eb", fontSize: 12.5, fontWeight: 600, cursor: "pointer", padding: 0 }}
                            >
                                {showAdvanced ? "Hide" : "Show"} advanced options
                            </button>

                            {showAdvanced && (
                                <div style={{ background: "#fafafa", border: "1px solid #ececec", borderRadius: 10, padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                                    <div>
                                        <label style={{ fontSize: 12.5, fontWeight: 600, color: "#333", display: "block", marginBottom: 5 }}>
                                            Resume to score against <span style={{ color: "#666", fontWeight: 400 }}>(optional)</span>
                                        </label>
                                        <select
                                            value={form.resumeId}
                                            onChange={(e) => setForm((f) => ({ ...f, resumeId: e.target.value }))}
                                            style={{ width: "100%", padding: "10px 12px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, color: "#333", background: "#fff", fontFamily: "'DM Sans', system-ui, sans-serif" }}
                                        >
                                            <option value="">Use my latest resume</option>
                                            {resumes.map((r) => (
                                                <option key={r.id} value={r.id}>{r.label}</option>
                                            ))}
                                        </select>
                                        <p style={{ fontSize: 11.5, color: "#666", marginTop: 4 }}>
                                            Pick a specific resume from your Resume Bank, or leave as default to use your most recent upload.
                                        </p>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 12.5, fontWeight: 600, color: "#333", display: "block", marginBottom: 5 }}>
                                            ATS score override <span style={{ color: "#666", fontWeight: 400 }}>(optional)</span>
                                        </label>
                                        <input type="number" min="0" max="100" value={form.atsScore} onChange={e => setForm(f => ({ ...f, atsScore: e.target.value }))} placeholder="Leave blank to auto-calculate" style={{ width: "100%", padding: "10px 12px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, color: "#333", fontFamily: "'DM Sans', system-ui, sans-serif" }} />
                                        <p style={{ fontSize: 11.5, color: "#666", marginTop: 4 }}>
                                            Useful if you already know a recruiter-supplied score or want to record one from an external tool.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
                            <button onClick={() => setShowModal(false)} style={{ padding: "10px 20px", background: "#fff", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, fontWeight: 600, color: "#333", cursor: "pointer" }}>Cancel</button>
                            <button onClick={handleSave} disabled={!form.company || !form.position || saving} aria-disabled={!form.company || !form.position || saving} style={{ padding: "10px 24px", background: form.company && form.position ? "#0a0a0a" : "#d0d0d0", color: "#fff", border: "none", borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: form.company && form.position ? "pointer" : "not-allowed" }}>
                                {saving ? "Saving..." : (editingId ? "Save Changes" : "Add Application")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {pendingDeleteId !== null && (
                <div
                    style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16 }}
                    onClick={(e) => { if (e.target === e.currentTarget) setPendingDeleteId(null); }}
                >
                    <div style={{ background: "#fff", borderRadius: 14, padding: 26, width: "min(420px, 100%)", boxShadow: "0 30px 80px rgba(0,0,0,0.2)" }}>
                        <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0a0a0a", marginBottom: 8 }}>Delete this application?</h3>
                        <p style={{ fontSize: 13.5, color: "#444", lineHeight: 1.6, marginBottom: 22 }}>
                            This will permanently remove the application from your tracker. This action can&apos;t be undone.
                        </p>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                            <button onClick={() => setPendingDeleteId(null)} style={{ padding: "9px 16px", borderRadius: 8, border: "1px solid #d0d0d0", background: "#fff", color: "#333", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                            <button onClick={handleConfirmDelete} style={{ padding: "9px 16px", borderRadius: 8, border: "none", background: "#dc2626", color: "#fff", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </PageLayout>
    );
}
