"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { UploadIcon, StarIcon, DotsIcon, FileIcon, SearchIcon } from "../../components/Icons";

type Resume = { id: number; name: string; role: string; company: string; score: number; type: "optimized" | "original"; date: string; favorited: boolean; };

const initialResumes: Resume[] = [
    { id: 1, name: "Software Engineer", role: "Software Engineer", company: "Google", score: 92, type: "optimized", date: "Oct 20, 2025", favorited: true },
    { id: 2, name: "Frontend Developer", role: "Frontend Developer", company: "Meta", score: 88, type: "optimized", date: "Oct 18, 2025", favorited: true },
    { id: 3, name: "Full Stack Developer", role: "Full Stack Developer", company: "StartupXYZ", score: 85, type: "optimized", date: "Oct 15, 2025", favorited: false },
    { id: 4, name: "ML Engineer", role: "Machine Learning Engineer", company: "AI Labs", score: 95, type: "optimized", date: "Oct 12, 2025", favorited: false },
    { id: 5, name: "Backend Engineer", role: "Backend Engineer", company: "DataSystems", score: 80, type: "original", date: "Oct 10, 2025", favorited: false },
    { id: 6, name: "Product Engineer", role: "Product Engineer", company: "TechCorp", score: 77, type: "original", date: "Oct 5, 2025", favorited: false },
];

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
        <PageLayout currentPage="Resume Bank" title="Resume Bank" subtitle="Manage all your saved resumes in one place">
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
        </PageLayout>
    );
}