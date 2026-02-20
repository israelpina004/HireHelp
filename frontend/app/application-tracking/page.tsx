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
function SearchIcon() { return (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>); }
function EditIcon() { return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>); }
function TrashIcon() { return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>); }
function PlusIcon() { return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>); }
function ExportIcon() { return (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>); }
function XIcon() { return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>); }

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

function Sidebar({ currentPage }: { currentPage: string }) {
    const router = useRouter();
    return (
        <div style={{ width: 220, minHeight: "100vh", background: "#fff", borderRight: "1px solid #ebebeb", display: "flex", flexDirection: "column", flexShrink: 0 }}>
            <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid #ebebeb" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, background: "#0a0a0a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8" fill="none" stroke="white" strokeWidth="2"/></svg></div>
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

export default function ApplicationTracking() {
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
        <div style={{ display: "flex", minHeight: "100vh", background: "#fafafa", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } input, select { outline: none; } @keyframes modalIn { from { opacity: 0; transform: scale(0.97) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }`}</style>
            <Sidebar currentPage="Application Tracking" />
            <main style={{ flex: 1, padding: "36px 40px", overflowY: "auto" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
                    <div>
                        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif" }}>Application Tracking</h1>
                        <p style={{ fontSize: 14, color: "#888", marginTop: 5 }}>Manage and monitor all your job applications in one place</p>
                    </div>
                    <button onClick={openAdd} style={{ display: "flex", alignItems: "center", gap: 6, padding: "11px 18px", background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 9, fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}><PlusIcon /> Add Application</button>
                </div>
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
            </main>
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
        </div>
    );
}