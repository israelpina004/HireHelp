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
function UploadIcon() { return (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>); }
function StarIcon({ filled }: { filled?: boolean }) { return (<svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "none"} stroke={filled ? "#f59e0b" : "#ccc"} strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>); }
function DotsIcon() { return (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>); }
function FileIcon() { return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>); }
function SearchIcon() { return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>); }

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

type Resume = { id: number; name: string; role: string; company: string; score: number; type: "optimized" | "original"; date: string; favorited: boolean; };

const initialResumes: Resume[] = [
    { id: 1, name: "Software Engineer", role: "Software Engineer", company: "Google", score: 92, type: "optimized", date: "Oct 20, 2025", favorited: true },
    { id: 2, name: "Frontend Developer", role: "Frontend Developer", company: "Meta", score: 88, type: "optimized", date: "Oct 18, 2025", favorited: true },
    { id: 3, name: "Full Stack Developer", role: "Full Stack Developer", company: "StartupXYZ", score: 85, type: "optimized", date: "Oct 15, 2025", favorited: false },
    { id: 4, name: "ML Engineer", role: "Machine Learning Engineer", company: "AI Labs", score: 95, type: "optimized", date: "Oct 12, 2025", favorited: false },
    { id: 5, name: "Backend Engineer", role: "Backend Engineer", company: "DataSystems", score: 80, type: "original", date: "Oct 10, 2025", favorited: false },
    { id: 6, name: "Product Engineer", role: "Product Engineer", company: "TechCorp", score: 77, type: "original", date: "Oct 5, 2025", favorited: false },
];

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

function ResumeCard({ resume, onToggleFavorite, onDelete }: { resume: Resume; onToggleFavorite: (id: number) => void; onDelete: (id: number) => void; }) {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 14, position: "relative" }} onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)")} onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 38, height: 38, background: "#f5f5f5", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#555" }}><FileIcon /></div>
                    <div><div style={{ fontSize: 13.5, fontWeight: 600, color: "#0a0a0a" }}>{resume.name}</div><div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>{resume.role}</div></div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button onClick={() => onToggleFavorite(resume.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><StarIcon filled={resume.favorited} /></button>
                    <div style={{ position: "relative" }}>
                        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "#bbb", padding: 4 }}><DotsIcon /></button>
                        {menuOpen && (
                            <div style={{ position: "absolute", right: 0, top: 28, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", zIndex: 10, minWidth: 140, overflow: "hidden" }}>
                                {["View", "Analyze", "Download"].map(action => (<button key={action} onClick={() => setMenuOpen(false)} style={{ display: "block", width: "100%", padding: "10px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: 13, color: "#333" }} onMouseEnter={e => (e.currentTarget.style.background = "#f5f5f5")} onMouseLeave={e => (e.currentTarget.style.background = "none")}>{action}</button>))}
                                <button onClick={() => { onDelete(resume.id); setMenuOpen(false); }} style={{ display: "block", width: "100%", padding: "10px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: 13, color: "#dc2626", borderTop: "1px solid #f0f0f0" }} onMouseEnter={e => (e.currentTarget.style.background = "#fef2f2")} onMouseLeave={e => (e.currentTarget.style.background = "none")}>Delete</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12.5, color: "#666" }}>{resume.company}</span>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20, background: resume.type === "optimized" ? "#0a0a0a" : "#f5f5f5", color: resume.type === "optimized" ? "#fff" : "#666" }}>{resume.type === "optimized" ? "Optimized" : "Original"}</span>
            </div>
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 12, color: "#aaa" }}>ATS Score</span><span style={{ fontSize: 12, fontWeight: 700, color: "#0a0a0a" }}>{resume.score}%</span></div>
                <div style={{ height: 5, background: "#f0f0f0", borderRadius: 3, overflow: "hidden" }}><div style={{ width: `${resume.score}%`, height: "100%", background: "#0a0a0a", borderRadius: 3 }}/></div>
            </div>
            <div style={{ fontSize: 11.5, color: "#bbb" }}>Added {resume.date}</div>
        </div>
    );
}

export default function ResumeBank() {
    const [resumes, setResumes] = useState<Resume[]>(initialResumes);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All Types");
    const [sort, setSort] = useState("Sort by Date");

    const totalResumes = resumes.length;
    const optimized = resumes.filter(r => r.type === "optimized").length;
    const original = resumes.filter(r => r.type === "original").length;
    const avgScore = Math.round(resumes.reduce((a, r) => a + r.score, 0) / resumes.length);
    const favorites = resumes.filter(r => r.favorited);

    const filtered = resumes.filter(r => {
        const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.role.toLowerCase().includes(search.toLowerCase()) || r.company.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "All Types" || r.type === filter.toLowerCase();
        return matchSearch && matchFilter;
    }).sort((a, b) => sort === "Sort by Score" ? b.score - a.score : b.id - a.id);

    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#fafafa", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } select { outline: none; }`}</style>
            <Sidebar currentPage="Resume Bank" />
            <main style={{ flex: 1, padding: "36px 40px", overflowY: "auto" }}>
                <div style={{ marginBottom: 28 }}>
                    <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif" }}>Resume Bank</h1>
                    <p style={{ fontSize: 14, color: "#888", marginTop: 5 }}>Manage all your saved resumes in one place</p>
                </div>
                <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                    {[{ label: "Total Resumes", value: totalResumes, icon: "📄" }, { label: "Optimized", value: optimized, icon: "⚡" }, { label: "Original", value: original, icon: "📋" }, { label: "Avg Score", value: `${avgScore}%`, icon: "⭐" }].map(({ label, value, icon }) => (
                        <div key={label} style={{ flex: 1, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "18px 22px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}><span style={{ fontSize: 12.5, color: "#888", fontWeight: 500 }}>{label}</span><span style={{ fontSize: 20 }}>{icon}</span></div>
                            <span style={{ fontSize: 30, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif" }}>{value}</span>
                        </div>
                    ))}
                </div>
                <div style={{ display: "flex", gap: 10, marginBottom: 24, alignItems: "center" }}>
                    <div style={{ flex: 1, position: "relative" }}>
                        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}><SearchIcon /></span>
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, role, or company..." style={{ width: "100%", padding: "10px 12px 10px 36px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, color: "#333", background: "#fff", outline: "none", fontFamily: "'DM Sans', system-ui, sans-serif" }} />
                    </div>
                    {["All Types", "Optimized", "Original"].map(opt => (<button key={opt} onClick={() => setFilter(opt)} style={{ padding: "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, border: "1px solid #e8e8e8", cursor: "pointer", background: filter === opt ? "#0a0a0a" : "#fff", color: filter === opt ? "#fff" : "#555" }}>{opt}</button>))}
                    <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: "10px 14px", border: "1px solid #e8e8e8", borderRadius: 8, fontSize: 13, color: "#555", background: "#fff", cursor: "pointer", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
                        <option>Sort by Date</option><option>Sort by Score</option>
                    </select>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
                    <div style={{ background: "#fff", border: "2px dashed #e0e0e0", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, minHeight: 200, cursor: "pointer" }} onMouseEnter={e => (e.currentTarget.style.borderColor = "#aaa")} onMouseLeave={e => (e.currentTarget.style.borderColor = "#e0e0e0")}>
                        <div style={{ color: "#ccc" }}><UploadIcon /></div>
                        <div style={{ textAlign: "center" }}><div style={{ fontSize: 13.5, fontWeight: 600, color: "#555", marginBottom: 4 }}>Upload New Resume</div><div style={{ fontSize: 12, color: "#aaa" }}>Add a new resume to your bank</div></div>
                        <button style={{ padding: "9px 20px", background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Upload Resume</button>
                    </div>
                    {filtered.map(r => (<ResumeCard key={r.id} resume={r} onToggleFavorite={id => setResumes(prev => prev.map(r => r.id === id ? { ...r, favorited: !r.favorited } : r))} onDelete={id => setResumes(prev => prev.filter(r => r.id !== id))} />))}
                </div>
                {favorites.length > 0 && (
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                            <span style={{ fontSize: 18 }}>⭐</span>
                            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a" }}>Favorites</h2>
                            <span style={{ fontSize: 11, fontWeight: 600, background: "#0a0a0a", color: "#fff", borderRadius: 20, padding: "2px 8px" }}>{favorites.length}</span>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                            {favorites.map(r => (<ResumeCard key={r.id} resume={r} onToggleFavorite={id => setResumes(prev => prev.map(r => r.id === id ? { ...r, favorited: !r.favorited } : r))} onDelete={id => setResumes(prev => prev.filter(r => r.id !== id))} />))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}