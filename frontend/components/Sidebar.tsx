"use client";

import { useRouter } from "next/navigation";
import {
    DashboardIcon, ResumeAnalysisIcon, ResumeBankIcon, ATSIcon,
    InterviewIcon, TrackingIcon, SettingsIcon, HelpIcon, LogoutIcon
} from "./Icons";
import { logoutAction } from "@/app/auth/actions";

export const sidebarItems = [
    { label: "Dashboard", icon: DashboardIcon },
    { label: "Resume Analysis", icon: ResumeAnalysisIcon },
    { label: "Resume Bank", icon: ResumeBankIcon },
    { label: "Interview Prep", icon: InterviewIcon },
    { label: "Application Tracking", icon: TrackingIcon },
];

export const otherItems = [
    { label: "Settings", icon: SettingsIcon },
    { label: "Help & Support", icon: HelpIcon },
];

export const routeMap: Record<string, string> = {
    "Dashboard": "/dashboard",
    "Resume Analysis": "/resume-analysis",
    "Resume Bank": "/resume-bank",
    "Interview Prep": "/interview-prep",
    "Application Tracking": "/application-tracking",
    "Settings": "/settings",
    "Help & Support": "/help",
};

interface SidebarProps {
    currentPage: string;
    name: string;
    initials: string;
    email: string;
}

export default function Sidebar({ currentPage, name, initials, email }: SidebarProps) {
    const router = useRouter();
    return (
        <div style={{ width: 220, minHeight: "100vh", background: "#fff", borderRight: "1px solid #ebebeb", display: "flex", flexDirection: "column", flexShrink: 0 }}>
            <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid #ebebeb" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, background: "#0a0a0a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" fill="none" stroke="white" strokeWidth="2" /></svg>
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: "#0a0a0a", letterSpacing: "-0.02em" }}>HireHelp</div>
                        <div style={{ fontSize: 11, color: "#aaa", marginTop: 1 }}>Resume & Career Tool</div>
                    </div>
                </div>
            </div>
            <nav style={{ padding: "16px 12px", flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#bbb", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 8px", marginBottom: 8 }}>Main Features</div>
                {sidebarItems.map(({ label, icon: Icon }) => {
                    const isActive = currentPage === label;
                    return (
                        <button key={label} onClick={() => router.push(routeMap[label])} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 10px", borderRadius: 8, background: isActive ? "#0a0a0a" : "transparent", color: isActive ? "#fff" : "#555", border: "none", cursor: "pointer", fontSize: 13.5, fontWeight: isActive ? 600 : 400, marginBottom: 2, textAlign: "left", transition: "all 0.15s ease" }}>
                            <Icon />{label}
                        </button>
                    );
                })}
                <div style={{ fontSize: 11, fontWeight: 600, color: "#bbb", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 8px", marginTop: 20, marginBottom: 8 }}>Other</div>
                {otherItems.map(({ label, icon: Icon }) => (
                    <button key={label} onClick={() => router.push(routeMap[label])} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 10px", borderRadius: 8, background: "transparent", color: "#888", border: "none", cursor: "pointer", fontSize: 13.5, marginBottom: 2, textAlign: "left" }}>
                        <Icon />{label}
                    </button>
                ))}
            </nav>
            <div style={{ padding: "16px 20px", borderTop: "1px solid #ebebeb", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>{initials}</div>
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#0a0a0a" }}>{name}</div>
                        <div style={{ fontSize: 11, color: "#aaa" }}>{email}</div>
                    </div>
                </div>
                <button onClick={logoutAction} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", padding: 4 }}><LogoutIcon /></button>
            </div>
        </div>
    );
}
