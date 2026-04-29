"use client";

import { useState, useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import { PlusIcon, ExportIcon, EditIcon, TrashIcon, XIcon, SearchIcon } from "../../components/Icons";
import { createClient } from "@/app/lib/supabase/client";

type Status = "Applied" | "Interviewing" | "Offered" | "Rejected";
type Application = { id: number; company: string; position: string; status: Status; atsScore: number; summary: string; appliedDate: string; lastUpdate: string; };

const initialApplications: Application[] = [];

const statusConfig: Record<Status, { bg: string; color: string; border: string }> = {
    Applied:      { bg: "#f5f5f5", color: "#555",    border: "#e0e0e0" },
    Interviewing: { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
    Offered:      { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
    Rejected:     { bg: "#fef2f2", color: "#dc2626", border: "#fecaca" },
};

const emptyForm = { company: "", position: "", status: "Applied" as Status, summary: "", atsScore: "", appliedDate: "" };

interface ApplicationTrackingClientProps {
    userId: string;
    userName: string;
    initials: string;
    email: string;
}

export default function ApplicationTrackingClient({ userId, userName, initials, email }: ApplicationTrackingClientProps) {
    const [apps, setApps] = useState<Application[]>(initialApplications);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

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
        fetchApps();
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
    const avgATS = apps.length ? Math.round(apps.reduce((s, a) => s + a.atsScore, 0) / apps.length) : 0;
    function openAdd() { setForm(emptyForm); setEditingId(null); setShowModal(true); }
    function openEdit(app: Application) {
        setForm({ company: app.company, position: app.position, status: app.status, summary: app.summary, atsScore: String(app.atsScore), appliedDate: app.appliedDate });
        setEditingId(app.id); setShowModal(true);
    }
    
    async function handleSave() {
        if (!form.company || !form.position) return;
        setSaving(true);
        const today = new Date().toISOString().split("T")[0];
        const supabase = createClient();
        
        try {
            let finalAtsScore = Number(form.atsScore) || 0;
            
            // Generate ATS score automatically if adding new and have a summary
            if (editingId === null && form.summary && !form.atsScore) {
                // 1. Check if this exact Job Description was already analyzed
                const { data: existingAnalysis } = await supabase
                    .from("ats_analyses")
                    .select("ats_score")
                    .eq("user_id", userId)
                    .eq("job_description", form.summary)
                    .order("created_at", { ascending: false })
                    .limit(1)
                    .maybeSingle();

                if (existingAnalysis?.ats_score != null) {
                    // Perfect! They already analyzed this on the Resume Analysis page.
                    finalAtsScore = existingAnalysis.ats_score;
                } else {
                    // 2. Not found, let's fetch the latest resume and calculate it fresh
                    const { data: latestResume } = await supabase
                        .from("resumes")
                        .select("file_text")
                        .eq("user_id", userId)
                        .order("created_at", { ascending: false })
                        .limit(1)
                        .maybeSingle();

                    if (latestResume?.file_text) {
                        try {
                            const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5001").replace(/\/$/, "");
                            const atsRes = await fetch(`${API_URL}/api/ats/optimize`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ resume_text: latestResume.file_text, job_description: form.summary }),
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
        } catch (error: any) {
            console.error("Failed to save application:", error);
            alert("Failed to save: " + (error?.message || "Unknown error"));
        } finally {
            setSaving(false);
        }
    }
    function formatDate(d: string) { return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }

    return (
        <PageLayout currentPage="Application Tracking" title="Application Tracking" subtitle="Manage and monitor all your job applications in one place" headerRight={
            <button onClick={openAdd} style={{ display: "flex", alignItems: "center", gap: 6, padding: "11px 18px", background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 9, fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}><PlusIcon /> Add Application</button>
        } name={userName} initials={initials} email={email}>
                <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
                    {[{ label: "Total", value: total }, { label: "Applied", value: applied }, { label: "Interviewing", value: interviewing }, { label: "Offers", value: offers }, { label: "Avg ATS", value: `${avgATS}%` }].map(({ label, value }) => (
                        <div key={label} style={{ flex: 1, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "16px 18px" }}>
                            <div style={{ fontSize: 12, color: "#aaa", fontWeight: 500, marginBottom: 8 }}>{label}</div>
                            <div style={{ fontSize: 26, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif" }}>{value}</div>
                        </div>
                    ))}
                </div>
                <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center" }}>
                    <div style={{ flex: 1, position: "relative" }}>
                        <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}><SearchIcon /></span>
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by company or position..." style={{ width: "100%", padding: "9px 12px 9px 34px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, color: "#333", background: "#fff", fontFamily: "'DM Sans', system-ui, sans-serif" }} />
                    </div>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: "9px 14px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13, color: "#555", background: "#fff", fontFamily: "'DM Sans', system-ui, sans-serif", cursor: "pointer" }}>
                        <option>All Status</option><option>Applied</option><option>Interviewing</option><option>Offered</option><option>Rejected</option>
                    </select>
                    <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", border: "1px solid #e8e8e8", borderRadius: 8, background: "#fff", fontSize: 13, color: "#555", cursor: "pointer", fontWeight: 500 }}><ExportIcon /> Export</button>
                </div>
                <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, overflow: "hidden" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 2.5fr 1.2fr 0.9fr 1.1fr 1.1fr 0.6fr", padding: "12px 20px", borderBottom: "1px solid #f0f0f0", background: "#fafafa" }}>
                        {["Company", "Position", "Status", "ATS Score", "Applied Date", "Last Update", ""].map((h, i) => (<span key={i} style={{ fontSize: 12, fontWeight: 600, color: "#aaa", letterSpacing: "0.04em", textTransform: "uppercase" }}>{h}</span>))}
                    </div>
                    {filtered.length === 0 ? (
                        <div style={{ padding: "40px 20px", textAlign: "center", color: "#aaa", fontSize: 13.5 }}>No applications found.</div>
                    ) : filtered.map((app, i) => {
                        const cfg = statusConfig[app.status];
                        return (
                            <div key={app.id} style={{ display: "grid", gridTemplateColumns: "2fr 2.5fr 1.2fr 0.9fr 1.1fr 1.1fr 0.6fr", padding: "15px 20px", borderBottom: i < filtered.length - 1 ? "1px solid #f5f5f5" : "none", alignItems: "center" }} onMouseEnter={e => (e.currentTarget.style.background = "#fafafa")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                                <span style={{ fontSize: 13.5, fontWeight: 600, color: "#0a0a0a" }}>{app.company}</span>
                                <span style={{ fontSize: 13, color: "#555" }}>{app.position}</span>
                                <span>
                                    <select 
                                        value={app.status} 
                                        onChange={async (e) => {
                                            const newStatus = e.target.value as Status;
                                            setApps(prev => prev.map(a => a.id === app.id ? { ...a, status: newStatus } : a));
                                            const supabase = createClient();
                                            await supabase.from("application_tracking_sys").update({ status: newStatus }).eq("id", app.id);
                                        }}
                                        style={{ fontSize: 12, fontWeight: 600, padding: "4px 8px", borderRadius: 20, background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`, cursor: "pointer", outline: "none", fontFamily: "inherit" }}
                                    >
                                        <option value="Applied">Applied</option>
                                        <option value="Interviewing">Interviewing</option>
                                        <option value="Offered">Offered</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </span>
                                <span><span style={{ fontSize: 12.5, fontWeight: 700, padding: "4px 10px", borderRadius: 6, background: "#0a0a0a", color: "#fff" }}>{app.atsScore}%</span></span>
                                <span style={{ fontSize: 12.5, color: "#888" }}>{formatDate(app.appliedDate)}</span>
                                <span style={{ fontSize: 12.5, color: "#888" }}>{formatDate(app.lastUpdate)}</span>
                                <span style={{ display: "flex", gap: 6 }}>
                                    <button onClick={() => openEdit(app)} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", padding: 4 }} onMouseEnter={e => (e.currentTarget.style.color = "#0a0a0a")} onMouseLeave={e => (e.currentTarget.style.color = "#aaa")}><EditIcon /></button>
                                    <button onClick={() => setApps(prev => prev.filter(a => a.id !== app.id))} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", padding: 4 }} onMouseEnter={e => (e.currentTarget.style.color = "#dc2626")} onMouseLeave={e => (e.currentTarget.style.color = "#aaa")}><TrashIcon /></button>
                                </span>
                            </div>
                        );
                    })}
                </div>
            {showModal && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }} onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
                    <div style={{ background: "#fff", borderRadius: 14, padding: 32, width: 480, boxShadow: "0 20px 60px rgba(0,0,0,0.15)", animation: "modalIn 0.2s ease" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.02em" }}>{editingId ? "Edit Application" : "Add Application"}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa" }}><XIcon /></button>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            {[{ label: "Company", key: "company", placeholder: "e.g. Google" }, { label: "Position", key: "position", placeholder: "e.g. Software Engineer" }].map(({ label, key, placeholder }) => (
                                <div key={key}>
                                    <label style={{ fontSize: 12.5, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>{label}</label>
                                    <input value={(form as any)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={placeholder} style={{ width: "100%", padding: "10px 12px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, color: "#333", fontFamily: "'DM Sans', system-ui, sans-serif" }} />
                                </div>
                            ))}
                            <div>
                                <label style={{ fontSize: 12.5, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>Status</label>
                                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Status }))} style={{ width: "100%", padding: "10px 12px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, color: "#333", fontFamily: "'DM Sans', system-ui, sans-serif", background: "#fff" }}>
                                    <option>Applied</option><option>Interviewing</option><option>Offered</option><option>Rejected</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ fontSize: 12.5, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>Job Summary / Description</label>
                                <textarea value={form.summary} onChange={e => setForm(f => ({ ...f, summary: e.target.value }))} placeholder="Paste job summary here. If new, ATS score will be auto-generated." style={{ width: "100%", height: 100, padding: "10px 12px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, color: "#333", fontFamily: "'DM Sans', system-ui, sans-serif", resize: "vertical" }} />
                            </div>
                            <div>
                                <label style={{ fontSize: 12.5, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>ATS Score (%) (Optional Override)</label>
                                <input type="number" min="0" max="100" value={form.atsScore} onChange={e => setForm(f => ({ ...f, atsScore: e.target.value }))} placeholder="Leave blank to auto-generate" style={{ width: "100%", padding: "10px 12px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, color: "#333", fontFamily: "'DM Sans', system-ui, sans-serif" }} />
                            </div>
                            <div>
                                <label style={{ fontSize: 12.5, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>Applied Date</label>
                                <input type="date" value={form.appliedDate} onChange={e => setForm(f => ({ ...f, appliedDate: e.target.value }))} style={{ width: "100%", padding: "10px 12px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, color: "#333", fontFamily: "'DM Sans', system-ui, sans-serif" }} />
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
                            <button onClick={() => setShowModal(false)} style={{ padding: "10px 20px", background: "#fff", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, fontWeight: 600, color: "#555", cursor: "pointer" }}>Cancel</button>
                            <button onClick={handleSave} disabled={!form.company || !form.position || saving} style={{ padding: "10px 24px", background: form.company && form.position ? "#0a0a0a" : "#d0d0d0", color: "#fff", border: "none", borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: form.company && form.position ? "pointer" : "not-allowed" }}>
                                {saving ? "Saving..." : (editingId ? "Save Changes" : "Add Application")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </PageLayout>
    );
}
