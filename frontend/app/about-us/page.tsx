import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";
import PageLayout from "../../components/PageLayout";

type ProfileRow = { first_name: string | null; last_name: string | null };

export default async function AboutUsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/auth/login");
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("first_name,last_name")
        .eq("id", user.id)
        .maybeSingle<ProfileRow>();

    const safeProfile = profile ?? null;
    const firstName = safeProfile?.first_name?.trim() ?? "";
    const lastName = safeProfile?.last_name?.trim() ?? "";
    const fallbackName = user.email?.split("@")[0] ?? "User";
    const userName = `${firstName} ${lastName}`.trim() || fallbackName;
    const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || fallbackName.slice(0, 1).toUpperCase() || "U";

    return (
        <PageLayout
            currentPage="About Us"
            title="About Us"
            subtitle="What HireHelp is built to do and how to reach the team"
            name={userName}
            initials={initials}
            email={user.email!}
        >
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.5fr) minmax(280px, 0.9fr)", gap: 20, marginBottom: 20 }}>
                <section style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 14, padding: 28 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#666", marginBottom: 12 }}>Our Mission</div>
                    <h2 style={{ fontSize: 28, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", lineHeight: 1.15, fontFamily: "'DM Serif Display', Georgia, serif", marginBottom: 14 }}>
                        Run your entire job search from one place.
                    </h2>
                    <p style={{ fontSize: 14.5, color: "#444", lineHeight: 1.8, maxWidth: 720 }}>
                        HireHelp pulls resume optimization, interview prep, and application tracking into a single workspace,
                        so you can spend less time juggling tools and more time landing the role.
                    </p>
                </section>

                <aside style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 14, padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 18 }}>
                    <div>
                        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#666", marginBottom: 12 }}>Contact</div>
                        <div style={{ fontSize: 22, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif", marginBottom: 8 }}>
                            thehirehelpteam@gmail.com
                        </div>
                        <p style={{ fontSize: 14, color: "#444", lineHeight: 1.7 }}>
                            Reach out for support, feedback, or product questions.
                        </p>
                    </div>
                    <a
                        href="mailto:thehirehelpteam@gmail.com"
                        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "12px 16px", borderRadius: 10, background: "#0a0a0a", color: "#fff", textDecoration: "none", fontSize: 13.5, fontWeight: 600, width: "fit-content" }}
                    >
                        Email the HireHelp Team
                    </a>
                </aside>
            </div>

            <section style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 14, padding: 28 }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#666", marginBottom: 18 }}>What HireHelp Covers</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}>
                    {[
                        {
                            title: "ATS Analysis",
                            body: "Review resumes against a target job description and surface feedback that helps users understand how well their resume aligns.",
                        },
                        {
                            title: "Tailored Mock Interview Prep",
                            body: "Generate mock interview questions that are specific to the job a user is applying for, so preparation is more relevant and practical.",
                        },
                        {
                            title: "Application Tracking",
                            body: "Keep track of jobs already applied to and manage the search process without losing visibility across applications.",
                        },
                    ].map((item) => (
                        <div key={item.title} style={{ background: "#fcfcfc", border: "1px solid #efefef", borderRadius: 12, padding: 20 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0a0a0a", marginBottom: 10 }}>{item.title}</h3>
                            <p style={{ fontSize: 13.5, color: "#444", lineHeight: 1.75 }}>{item.body}</p>
                        </div>
                    ))}
                </div>
            </section>
        </PageLayout>
    );
}