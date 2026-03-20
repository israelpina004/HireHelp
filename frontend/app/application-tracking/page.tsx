"use client";

import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { PlusIcon, ExportIcon, EditIcon, TrashIcon, XIcon, SearchIcon } from "../../components/Icons";
import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";

type Status = "Applied" | "Interviewing" | "Offered" | "Rejected";
type Application = { id: number; company: string; position: string; status: Status; atsScore: number; matchScore: number; appliedDate: string; lastUpdate: string; };

const initialApplications: Application[] = [
    { id: 1, company: "TechCorp", position: "Senior Software Engineer", status: "Interviewing", atsScore: 92, matchScore: 88, appliedDate: "2025-10-15", lastUpdate: "2025-10-20" },
    { id: 2, company: "StartupXYZ", position: "Full Stack Developer", status: "Applied", atsScore: 85, matchScore: 82, appliedDate: "2025-10-18", lastUpdate: "2025-10-18" },
    { id: 3, company: "AI Labs", position: "Machine Learning Engineer", status: "Offered", atsScore: 95, matchScore: 91, appliedDate: "2025-10-10", lastUpdate: "2025-10-21" },
    { id: 4, company: "Design Co", position: "Frontend Developer", status: "Rejected", atsScore: 78, matchScore: 75, appliedDate: "2025-10-12", lastUpdate: "2025-10-19" },
    { id: 5, company: "DataSystems", position: "Backend Engineer", status: "Applied", atsScore: 88, matchScore: 84, appliedDate: "2025-10-19", lastUpdate: "2025-10-19" },
];

const statusConfig: Record<Status, { bg: string; color: string; border: string }> = {
    Applied:      { bg: "#f5f5f5", color: "#555",    border: "#e0e0e0" },
    Interviewing: { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
    Offered:      { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
    Rejected:     { bg: "#fef2f2", color: "#dc2626", border: "#fecaca" },
};

const emptyForm = { company: "", position: "", status: "Applied" as Status, atsScore: "", matchScore: "", appliedDate: "" };

export default async function ApplicationTracking() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if(!user || user === null){
        return redirect("/auth/login");
    }

    let userName = "John Doe"    
    const {data : profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

    if (profile) {
        userName = profile.first_name + " " + profile.last_name;
    }

    const initials = profile.first_name[0] + profile.last_name[0];

    const [apps, setApps] = useState<Application[]>(initialApplications);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState(emptyForm);

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
    const avgMatch = apps.length ? Math.round(apps.reduce((s, a) => s + a.matchScore, 0) / apps.length) : 0;

    function openAdd() { setForm(emptyForm); setEditingId(null); setShowModal(true); }
    function openEdit(app: Application) { setForm({ company: app.company, position: app.position, status: app.status, atsScore: String(app.atsScore), matchScore: String(app.matchScore), appliedDate: app.appliedDate }); setEditingId(app.id); setShowModal(true); }
    function handleSave() {
        if (!form.company || !form.position) return;
        const today = new Date().toISOString().split("T")[0];
        if (editingId !== null) {
            setApps(prev => prev.map(a => a.id === editingId ? { ...a, company: form.company, position: form.position, status: form.status, atsScore: Number(form.atsScore) || a.atsScore, matchScore: Number(form.matchScore) || a.matchScore, appliedDate: form.appliedDate || a.appliedDate, lastUpdate: today } : a));
        } else {
            setApps(prev => [{ id: Date.now(), company: form.company, position: form.position, status: form.status, atsScore: Number(form.atsScore) || 0, matchScore: Number(form.matchScore) || 0, appliedDate: form.appliedDate || today, lastUpdate: today }, ...prev]);
        }
        setShowModal(false);
    }
    function formatDate(d: string) { return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }

    return (
        <PageLayout currentPage="Application Tracking" title="Application Tracking" subtitle="Manage and monitor all your job applications in one place" headerRight={
            <button onClick={openAdd} style={{ display: "flex", alignItems: "center", gap: 6, padding: "11px 18px", background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 9, fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}><PlusIcon /> Add Application</button>
        } name={userName} initials={initials} email={user.email!}>
                <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
                    {[{ label: "Total", value: total }, { label: "Applied", value: applied }, { label: "Interviewing", value: interviewing }, { label: "Offers", value: offers }, { label: "Avg ATS", value: `${avgATS}%` }, { label: "Avg Match", value: `${avgMatch}%` }].map(({ label, value }) => (
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
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 2.5fr 1.2fr 0.9fr 0.9fr 1.1fr 1.1fr 0.6fr", padding: "12px 20px", borderBottom: "1px solid #f0f0f0", background: "#fafafa" }}>
                        {["Company", "Position", "Status", "ATS Score", "Match Score", "Applied Date", "Last Update", ""].map((h, i) => (<span key={i} style={{ fontSize: 12, fontWeight: 600, color: "#aaa", letterSpacing: "0.04em", textTransform: "uppercase" }}>{h}</span>))}
                    </div>
                    {filtered.length === 0 ? (
                        <div style={{ padding: "40px 20px", textAlign: "center", color: "#aaa", fontSize: 13.5 }}>No applications found.</div>
                    ) : filtered.map((app, i) => {
                        const cfg = statusConfig[app.status];
                        return (
                            <div key={app.id} style={{ display: "grid", gridTemplateColumns: "2fr 2.5fr 1.2fr 0.9fr 0.9fr 1.1fr 1.1fr 0.6fr", padding: "15px 20px", borderBottom: i < filtered.length - 1 ? "1px solid #f5f5f5" : "none", alignItems: "center" }} onMouseEnter={e => (e.currentTarget.style.background = "#fafafa")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                                <span style={{ fontSize: 13.5, fontWeight: 600, color: "#0a0a0a" }}>{app.company}</span>
                                <span style={{ fontSize: 13, color: "#555" }}>{app.position}</span>
                                <span><span style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>{app.status}</span></span>
                                <span><span style={{ fontSize: 12.5, fontWeight: 700, padding: "4px 10px", borderRadius: 6, background: "#0a0a0a", color: "#fff" }}>{app.atsScore}%</span></span>
                                <span><span style={{ fontSize: 12.5, fontWeight: 700, padding: "4px 10px", borderRadius: 6, background: "#f5f5f5", color: "#555" }}>{app.matchScore}%</span></span>
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
                            <div style={{ display: "flex", gap: 12 }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: 12.5, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>ATS Score (%)</label>
                                    <input type="number" min="0" max="100" value={form.atsScore} onChange={e => setForm(f => ({ ...f, atsScore: e.target.value }))} placeholder="e.g. 88" style={{ width: "100%", padding: "10px 12px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, color: "#333", fontFamily: "'DM Sans', system-ui, sans-serif" }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: 12.5, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>Match Score (%)</label>
                                    <input type="number" min="0" max="100" value={form.matchScore} onChange={e => setForm(f => ({ ...f, matchScore: e.target.value }))} placeholder="e.g. 82" style={{ width: "100%", padding: "10px 12px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, color: "#333", fontFamily: "'DM Sans', system-ui, sans-serif" }} />
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: 12.5, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>Applied Date</label>
                                <input type="date" value={form.appliedDate} onChange={e => setForm(f => ({ ...f, appliedDate: e.target.value }))} style={{ width: "100%", padding: "10px 12px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, color: "#333", fontFamily: "'DM Sans', system-ui, sans-serif" }} />
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
                            <button onClick={() => setShowModal(false)} style={{ padding: "10px 20px", background: "#fff", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, fontWeight: 600, color: "#555", cursor: "pointer" }}>Cancel</button>
                            <button onClick={handleSave} disabled={!form.company || !form.position} style={{ padding: "10px 24px", background: form.company && form.position ? "#0a0a0a" : "#d0d0d0", color: "#fff", border: "none", borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: form.company && form.position ? "pointer" : "not-allowed" }}>{editingId ? "Save Changes" : "Add Application"}</button>
                        </div>
                    </div>
                </div>
            )}
        </PageLayout>
    );
}