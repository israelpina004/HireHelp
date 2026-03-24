'use client';

import { useActionState } from "react";
import { signUpAction, type AuthState } from "@/app/auth/actions";

export default function SignupBox() {
    const initialState: AuthState = { ok: true };
    const [state, formAction] = useActionState(signUpAction, initialState);

    return (
        <div style={{ minHeight: "100vh", background: "#fafafa", display: "flex", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input { outline: none; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes subtlePulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.7; } }
        .hh-input:focus { border-color: #0a0a0a !important; }
        .hh-btn:hover { background: #222 !important; }
        .hh-link:hover { color: #0a0a0a !important; }
      `}</style>

            {/* Left branding panel */}
            <div style={{ width: "45%", background: "#0a0a0a", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "48px 52px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", border: "1px solid #ffffff08", animation: "subtlePulse 4s ease infinite" }} />
                <div style={{ position: "absolute", top: 60, right: 20, width: 180, height: 180, borderRadius: "50%", border: "1px solid #ffffff06", animation: "subtlePulse 4s ease infinite 1s" }} />
                <div style={{ position: "absolute", bottom: -60, left: -60, width: 280, height: 280, borderRadius: "50%", border: "1px solid #ffffff06", animation: "subtlePulse 4s ease infinite 2s" }} />

                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, animation: "fadeUp 0.5s ease both" }}>
                    <div style={{ width: 36, height: 36, background: "#fff", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#0a0a0a">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8" fill="none" stroke="#0a0a0a" strokeWidth="2"/>
                        </svg>
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>HireHelp</span>
                </div>

                {/* Headline */}
                <div style={{ animation: "fadeUp 0.5s ease 0.1s both" }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#ffffff55", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>AI-Powered Career Platform</div>
                    <h1 style={{ fontSize: 42, fontWeight: 700, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif", marginBottom: 20 }}>
                        Your career<br /><em style={{ fontStyle: "italic", color: "#ffffff99" }}>starts</em><br />here.
                    </h1>
                    <p style={{ fontSize: 14.5, color: "#ffffff66", lineHeight: 1.7, maxWidth: 340 }}>
                        Join HireHelp and get AI-powered tools to optimize your resume, ace the ATS, and prepare for interviews.
                    </p>
                </div>

                {/* Features */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12, animation: "fadeUp 0.5s ease 0.2s both" }}>
                    {[
                        { icon: "◈", label: "Resume Analysis & ATS Scoring" },
                        { icon: "◉", label: "Keyword Optimization Engine" },
                        { icon: "◎", label: "Behavioral Interview Practice" },
                        { icon: "◍", label: "Application Tracking Dashboard" },
                    ].map(({ icon, label }) => (
                        <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 14, color: "#ffffff44" }}>{icon}</span>
                            <span style={{ fontSize: 13, color: "#ffffff66", fontWeight: 500 }}>{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right form panel */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 40px" }}>
                <div style={{ width: "100%", maxWidth: 400, animation: "fadeUp 0.5s ease 0.15s both" }}>
                    <div style={{ marginBottom: 36 }}>
                        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif", marginBottom: 8 }}>Create account</h2>
                        <p style={{ fontSize: 14, color: "#aaa" }}>Get started with HireHelp for free</p>
                    </div>

                    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        <div style={{ display: "flex", gap: 12 }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ fontSize: 12.5, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>First Name</label>
                                <input
                                    className="hh-input"
                                    type="text"
                                    name="first_name"
                                    placeholder="John"
                                    required
                                    style={{ width: "100%", padding: "11px 14px", border: "1px solid #e8e8e8", borderRadius: 9, fontSize: 14, color: "#0a0a0a", background: "#fff", fontFamily: "'DM Sans', system-ui, sans-serif", transition: "border-color 0.15s" }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ fontSize: 12.5, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>Last Name</label>
                                <input
                                    className="hh-input"
                                    type="text"
                                    name="last_name"
                                    placeholder="Doe"
                                    required
                                    style={{ width: "100%", padding: "11px 14px", border: "1px solid #e8e8e8", borderRadius: 9, fontSize: 14, color: "#0a0a0a", background: "#fff", fontFamily: "'DM Sans', system-ui, sans-serif", transition: "border-color 0.15s" }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ fontSize: 12.5, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>Email</label>
                            <input
                                className="hh-input"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                required
                                style={{ width: "100%", padding: "11px 14px", border: "1px solid #e8e8e8", borderRadius: 9, fontSize: 14, color: "#0a0a0a", background: "#fff", fontFamily: "'DM Sans', system-ui, sans-serif", transition: "border-color 0.15s" }}
                            />
                        </div>

                        <div>
                            <label style={{ fontSize: 12.5, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>Password</label>
                            <input
                                className="hh-input"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                required
                                style={{ width: "100%", padding: "11px 14px", border: "1px solid #e8e8e8", borderRadius: 9, fontSize: 14, color: "#0a0a0a", background: "#fff", fontFamily: "'DM Sans', system-ui, sans-serif", transition: "border-color 0.15s" }}
                            />
                        </div>

                        {!state?.ok && (
                            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", fontSize: 13.5, color: "#dc2626" }}>
                                ⚠️ {state.error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="hh-btn"
                            style={{ width: "100%", marginTop: 8, padding: "13px", background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "background 0.15s" }}
                        >
                            Create Account →
                        </button>

                        <p style={{ textAlign: "center", fontSize: 13.5, color: "#aaa", marginTop: 6 }}>
                            Already have an account?{" "}
                            <a href="/auth/login" className="hh-link" style={{ fontWeight: 600, color: "#888", textDecoration: "none", transition: "color 0.15s" }}>
                                Sign in
                            </a>
                        </p>
                    </form>

                    <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid #f0f0f0", textAlign: "center" }}>
                        <span style={{ fontSize: 12, color: "#ccc" }}>Built by Team HireHelp · CSCI Masters 2026</span>
                    </div>
                </div>
            </div>
        </div>
    );
}