"use client";

import Link from "next/link";
import {
    DashboardIcon, ResumeAnalysisIcon, ResumeBankIcon,
    InterviewIcon, TrackingIcon, HelpIcon, LogoutIcon
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
    { label: "About Us", icon: HelpIcon },
];

export const routeMap: Record<string, string> = {
    "Dashboard": "/dashboard",
    "Resume Analysis": "/resume-analysis",
    "Resume Bank": "/resume-bank",
    "Interview Prep": "/interview-prep",
    "Application Tracking": "/application-tracking",
    "About Us": "/about-us",
    "Settings": "/settings",
    "Help & Support": "/help",
};

interface SidebarProps {
    currentPage: string;
    name: string;
    initials: string;
    email: string;
}

function NavLink({
    href,
    isActive,
    children,
}: {
    href: string;
    isActive: boolean;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className="hh-nav-link"
            data-active={isActive ? "true" : "false"}
            style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "9px 10px",
                borderRadius: 8,
                background: isActive ? "#0a0a0a" : "transparent",
                color: isActive ? "#fff" : "#333",
                textDecoration: "none",
                fontSize: 13.5,
                fontWeight: isActive ? 600 : 500,
                marginBottom: 2,
                cursor: "pointer",
                transition: "background 0.15s ease, color 0.15s ease",
            }}
        >
            {children}
        </Link>
    );
}

export default function Sidebar({ currentPage, name, initials, email }: SidebarProps) {
    return (
        <div style={{ width: 220, minHeight: "100vh", background: "#fff", borderRight: "1px solid #ebebeb", display: "flex", flexDirection: "column", flexShrink: 0 }}>
            <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid #ebebeb" }}>
                <Link href="/dashboard" aria-label="HireHelp home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" }}>
                    <div style={{ width: 32, height: 32, background: "#0a0a0a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" fill="none" stroke="white" strokeWidth="2" /></svg>
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: "#0a0a0a", letterSpacing: "-0.02em" }}>HireHelp</div>
                        <div style={{ fontSize: 11, color: "#777", marginTop: 1 }}>Resume & Career Tool</div>
                    </div>
                </Link>
            </div>
            <nav aria-label="Primary" style={{ padding: "16px 12px", flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#666", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 8px", marginBottom: 8 }}>Main Features</div>
                {sidebarItems.map(({ label, icon: Icon }) => (
                    <NavLink key={label} href={routeMap[label]} isActive={currentPage === label}>
                        <Icon />
                        <span>{label}</span>
                    </NavLink>
                ))}
                <div style={{ fontSize: 11, fontWeight: 700, color: "#666", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 8px", marginTop: 20, marginBottom: 8 }}>Other</div>
                {otherItems.map(({ label, icon: Icon }) => (
                    <NavLink key={label} href={routeMap[label]} isActive={currentPage === label}>
                        <Icon />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>
            <div style={{ padding: "16px 20px", borderTop: "1px solid #ebebeb", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{initials}</div>
                    <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#0a0a0a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>
                        <div style={{ fontSize: 11, color: "#777", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{email}</div>
                    </div>
                </div>
                <form action={logoutAction}>
                    <button
                        type="submit"
                        aria-label="Log out"
                        title="Log out"
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#666", padding: 4, display: "flex" }}
                    >
                        <LogoutIcon />
                    </button>
                </form>
            </div>
        </div>
    );
}
