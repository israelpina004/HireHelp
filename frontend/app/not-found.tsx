import Link from "next/link";

export default function NotFound() {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#fafafa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 24,
                fontFamily: "'DM Sans', system-ui, sans-serif",
            }}
        >
            <div
                style={{
                    background: "#fff",
                    border: "1px solid #e8e8e8",
                    borderRadius: 16,
                    padding: "48px 40px",
                    maxWidth: 520,
                    width: "100%",
                    textAlign: "center",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
                }}
            >
                <div
                    style={{
                        width: 56,
                        height: 56,
                        borderRadius: 14,
                        background: "#0a0a0a",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 20px",
                    }}
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#888", marginBottom: 8 }}>
                    Error 404
                </div>
                <h1
                    style={{
                        fontSize: 32,
                        fontWeight: 700,
                        color: "#0a0a0a",
                        letterSpacing: "-0.03em",
                        fontFamily: "'DM Serif Display', Georgia, serif",
                        marginBottom: 12,
                    }}
                >
                    Page not found
                </h1>
                <p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.65, marginBottom: 28 }}>
                    The page you&apos;re looking for doesn&apos;t exist or may have moved. Try heading
                    back to your dashboard.
                </p>
                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                    <Link
                        href="/dashboard"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "11px 22px",
                            background: "#0a0a0a",
                            color: "#fff",
                            borderRadius: 9,
                            textDecoration: "none",
                            fontSize: 14,
                            fontWeight: 600,
                        }}
                    >
                        Back to dashboard
                    </Link>
                    <Link
                        href="/about-us"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "11px 22px",
                            background: "#fff",
                            color: "#333",
                            borderRadius: 9,
                            textDecoration: "none",
                            fontSize: 14,
                            fontWeight: 600,
                            border: "1px solid #e0e0e0",
                        }}
                    >
                        About HireHelp
                    </Link>
                </div>
            </div>
        </div>
    );
}
