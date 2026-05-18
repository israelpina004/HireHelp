import type { ReactNode } from "react";
import Link from "next/link";
import PageLayout from "../../components/PageLayout";
import { TrackingIcon, ATSIcon, ResumeAnalysisIcon, InterviewIcon } from "../../components/Icons";
import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";

type DashboardDatum = { label: string; value: number };
type ActivityItem = { action: string; detail: string; time: string; createdAt: string };
type ProfileRow = { first_name: string | null; last_name: string | null };
type ResumeRow = { created_at: string | null; file_path: string | null; resume_type: string | null };
type AtsAnalysisRow = { created_at: string | null; ats_score: number | string | null; job_description: string | null };
type InterviewPrepRow = { created_at: string | null };

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function startOfDay(date: Date) {
    const next = new Date(date);
    next.setHours(0, 0, 0, 0);
    return next;
}

function addDays(date: Date, days: number) {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
}

function getStartOfWeek(date: Date) {
    const next = startOfDay(date);
    const diff = (next.getDay() + 6) % 7;
    next.setDate(next.getDate() - diff);
    return next;
}

function toNumber(value: number | string | null | undefined) {
    if (typeof value === "number") {
        return Number.isFinite(value) ? value : 0;
    }

    if (typeof value === "string") {
        const parsed = Number.parseFloat(value);
        return Number.isFinite(parsed) ? parsed : 0;
    }

    return 0;
}

function average(values: Array<number | string | null | undefined>) {
    const numbers = values.map(toNumber).filter((value) => value > 0);
    if (numbers.length === 0) {
        return 0;
    }

    return numbers.reduce((sum, value) => sum + value, 0) / numbers.length;
}

function formatRelativeTime(dateString: string) {
    const timestamp = new Date(dateString).getTime();
    if (Number.isNaN(timestamp)) {
        return "Recently";
    }

    const diffMs = timestamp - Date.now();
    const diffMinutes = Math.round(diffMs / (1000 * 60));
    const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    if (Math.abs(diffMinutes) < 60) {
        return formatter.format(diffMinutes, "minute");
    }

    const diffHours = Math.round(diffMinutes / 60);
    if (Math.abs(diffHours) < 24) {
        return formatter.format(diffHours, "hour");
    }

    const diffDays = Math.round(diffHours / 24);
    if (Math.abs(diffDays) < 7) {
        return formatter.format(diffDays, "day");
    }

    const diffWeeks = Math.round(diffDays / 7);
    if (Math.abs(diffWeeks) < 5) {
        return formatter.format(diffWeeks, "week");
    }

    const diffMonths = Math.round(diffDays / 30);
    if (Math.abs(diffMonths) < 12) {
        return formatter.format(diffMonths, "month");
    }

    const diffYears = Math.round(diffDays / 365);
    return formatter.format(diffYears, "year");
}

function truncateText(value: string | null | undefined, maxLength: number) {
    if (!value) {
        return "";
    }

    const trimmed = value.replace(/\s+/g, " ").trim();
    if (trimmed.length <= maxLength) {
        return trimmed;
    }

    return `${trimmed.slice(0, maxLength - 1).trimEnd()}…`;
}

function getResumeDisplayName(filePath: string | null | undefined) {
    if (!filePath) {
        return "";
    }

    const trimmed = filePath.trim();
    if (!trimmed) {
        return "";
    }

    return trimmed.split("/").pop()?.trim() || trimmed;
}

function buildResumeUploadActivity(resumes: ResumeRow[], weekStart: Date): DashboardDatum[] {
    const counts = new Array(7).fill(0);
    const weekEnd = addDays(weekStart, 7);

    for (const resume of resumes) {
        if (resume.resume_type !== "uploaded" || !resume.created_at) {
            continue;
        }

        const createdAt = new Date(resume.created_at);
        if (Number.isNaN(createdAt.getTime()) || createdAt < weekStart || createdAt >= weekEnd) {
            continue;
        }

        const dayIndex = (createdAt.getDay() + 6) % 7;
        counts[dayIndex] += 1;
    }

    return WEEKDAY_LABELS.map((label, index) => ({ label, value: counts[index] }));
}

function buildAtsTrend(atsAnalyses: AtsAnalysisRow[], now: Date): Array<DashboardDatum & { hasData: boolean }> {
    const firstBucketStart = startOfDay(addDays(now, -27));

    return Array.from({ length: 4 }, (_, index) => {
        const bucketStart = addDays(firstBucketStart, index * 7);
        const bucketEnd = addDays(bucketStart, 7);
        const bucketValues = atsAnalyses
            .filter((analysis) => {
                if (!analysis.created_at) {
                    return false;
                }

                const createdAt = new Date(analysis.created_at);
                return !Number.isNaN(createdAt.getTime()) && createdAt >= bucketStart && createdAt < bucketEnd;
            })
            .map((analysis) => analysis.ats_score);

        return {
            label: `Week ${index + 1}`,
            value: Math.round(average(bucketValues)),
            hasData: bucketValues.length > 0,
        };
    });
}

function buildRecentActivity(
    resumes: ResumeRow[],
    atsAnalyses: AtsAnalysisRow[],
    interviewSessions: InterviewPrepRow[]
) {
    const resumeActivities: ActivityItem[] = resumes
        .filter((resume) => Boolean(resume.created_at))
        .map((resume) => ({
            action: resume.resume_type === "uploaded" ? "Resume uploaded for optimization" : "Resume saved",
            detail: resume.file_path ? truncateText(getResumeDisplayName(resume.file_path), 72) : "Resume added to your workspace",
            time: formatRelativeTime(resume.created_at!),
            createdAt: resume.created_at!,
        }));

    const analysisActivities: ActivityItem[] = atsAnalyses
        .filter((analysis) => Boolean(analysis.created_at))
        .map((analysis) => {
            const score = Math.round(toNumber(analysis.ats_score));
            const jobSummary = truncateText(analysis.job_description, 52);
            const detail = jobSummary
                ? `Score: ${score}% - ${jobSummary}`
                : `Score: ${score}%`;

            return {
                action: "ATS analysis completed",
                detail,
                time: formatRelativeTime(analysis.created_at!),
                createdAt: analysis.created_at!,
            };
        });

    const interviewActivities: ActivityItem[] = interviewSessions
        .filter((session) => Boolean(session.created_at))
        .map((session) => ({
            action: "Interview session generated",
            detail: "AI-generated practice session ready",
            time: formatRelativeTime(session.created_at!),
            createdAt: session.created_at!,
        }));

    return [...resumeActivities, ...analysisActivities, ...interviewActivities]
        .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
        .slice(0, 5);
}

type BarChartDatum = { label: string; value: number; hasData?: boolean };

function BarChart({
    data,
    maxValue,
    yAxisFormat = (value: number) => String(value),
    valueFormat = (value: number) => String(value),
    emptyMessage,
}: {
    data: BarChartDatum[];
    maxValue?: number;
    yAxisFormat?: (value: number) => string;
    valueFormat?: (value: number) => string;
    emptyMessage: string;
}) {
    const allEmpty = data.every((d) => (d.hasData === undefined ? d.value === 0 : !d.hasData));
    const computedMax = maxValue ?? (Math.max(...data.map((datum) => datum.value)) || 1);
    const niceMax = computedMax <= 4 ? Math.max(computedMax, 4) : computedMax;
    const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(niceMax * t));

    if (allEmpty) {
        return (
            <div
                style={{
                    height: 160,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px dashed #e8e8e8",
                    borderRadius: 8,
                    color: "#888",
                    fontSize: 13,
                    padding: 16,
                    textAlign: "center",
                }}
            >
                {emptyMessage}
            </div>
        );
    }

    return (
        <div style={{ display: "flex", gap: 8, height: 160, paddingTop: 4 }}>
            {/* Y-axis */}
            <div
                style={{
                    width: 36,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    fontSize: 10,
                    color: "#999",
                    textAlign: "right",
                    paddingBottom: 22,
                }}
            >
                {[...ticks].reverse().map((tick, i) => (
                    <span key={i}>{yAxisFormat(tick)}</span>
                ))}
            </div>

            {/* Chart area */}
            <div style={{ flex: 1, position: "relative", display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative", flex: 1 }}>
                    {/* Gridlines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
                        <div
                            key={i}
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                bottom: `${t * 100}%`,
                                borderTop: "1px solid #f3f3f3",
                            }}
                        />
                    ))}
                    {/* Bars */}
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", gap: 10 }}>
                        {data.map((datum, i) => {
                            const hasData = datum.hasData === undefined ? datum.value > 0 : datum.hasData;
                            const heightPct = hasData ? Math.max((datum.value / niceMax) * 100, 4) : 0;
                            return (
                                <div
                                    key={i}
                                    style={{
                                        flex: 1,
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-end",
                                        position: "relative",
                                    }}
                                    title={hasData ? `${datum.label}: ${valueFormat(datum.value)}` : `${datum.label}: no data`}
                                >
                                    {hasData ? (
                                        <>
                                            <div
                                                style={{
                                                    width: "100%",
                                                    background: "#0a0a0a",
                                                    borderRadius: "4px 4px 0 0",
                                                    height: `${heightPct}%`,
                                                    position: "relative",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        position: "absolute",
                                                        top: -16,
                                                        left: 0,
                                                        right: 0,
                                                        textAlign: "center",
                                                        fontSize: 10.5,
                                                        fontWeight: 600,
                                                        color: "#555",
                                                    }}
                                                >
                                                    {valueFormat(datum.value)}
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <div
                                            style={{
                                                width: "100%",
                                                height: 4,
                                                background: "#ececec",
                                                borderRadius: 2,
                                            }}
                                            aria-label={`${datum.label}: no data`}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* X-axis labels */}
                <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                    {data.map((datum, i) => (
                        <span key={i} style={{ flex: 1, textAlign: "center", fontSize: 11, color: "#777" }}>
                            {datum.label}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StatCard({
    label,
    value,
    icon,
    tooltip,
    cta,
}: {
    label: string;
    value: string;
    icon: ReactNode;
    tooltip: string;
    cta?: { href: string; label: string };
}) {
    return (
        <div
            title={tooltip}
            style={{
                background: "#fff",
                border: "1px solid #e8e8e8",
                borderRadius: 12,
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                flex: 1,
                minWidth: 0,
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontSize: 13, color: "#555", fontWeight: 500 }}>{label}</span>
                <span style={{ width: 36, height: 36, background: "#f5f5f5", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#444" }}>{icon}</span>
            </div>
            <span style={{ fontSize: 32, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif" }}>{value}</span>
            {cta && value === "0" && (
                <Link
                    href={cta.href}
                    style={{
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: "#2563eb",
                        textDecoration: "none",
                    }}
                >
                    {cta.label} →
                </Link>
            )}
        </div>
    );
}

function GettingStarted() {
    const steps = [
        {
            number: 1,
            title: "Upload your resume",
            body: "Run an ATS simulation against a target job to see your baseline score.",
            cta: "Run ATS analysis",
            href: "/resume-analysis",
        },
        {
            number: 2,
            title: "Practice interview questions",
            body: "Generate behavioral questions tailored to a specific role.",
            cta: "Generate questions",
            href: "/interview-prep",
        },
        {
            number: 3,
            title: "Track your applications",
            body: "Log every application so nothing slips through the cracks.",
            cta: "Add an application",
            href: "/application-tracking",
        },
    ];

    return (
        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ marginBottom: 16 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.01em" }}>Get started in 3 steps</h2>
                <p style={{ fontSize: 12.5, color: "#666", marginTop: 4 }}>
                    Welcome to HireHelp — here&apos;s the fastest path to seeing value from the tool.
                </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
                {steps.map((step) => (
                    <div key={step.number} style={{ background: "#fafafa", borderRadius: 10, padding: 16, border: "1px solid #f0f0f0", display: "flex", flexDirection: "column", gap: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#0a0a0a", color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{step.number}</span>
                            <span style={{ fontSize: 13.5, fontWeight: 600, color: "#0a0a0a" }}>{step.title}</span>
                        </div>
                        <p style={{ fontSize: 12.5, color: "#555", lineHeight: 1.55 }}>{step.body}</p>
                        <Link href={step.href} style={{ fontSize: 12.5, fontWeight: 600, color: "#2563eb", textDecoration: "none", marginTop: "auto" }}>
                            {step.cta} →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default async function Dashboard() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/auth/login");
    }

    const now = new Date();
    const currentWeekStart = getStartOfWeek(now);

    const [
        { data: profile },
        { data: resumes },
        { data: atsAnalyses },
        { data: interviewSessions },
    ] = await Promise.all([
        supabase.from("profiles").select("first_name,last_name").eq("id", user.id).maybeSingle<ProfileRow>(),
        supabase.from("resumes").select("created_at,file_path,resume_type").eq("user_id", user.id).order("created_at", { ascending: false }).returns<ResumeRow[]>(),
        supabase.from("ats_analyses").select("created_at,ats_score,job_description").eq("user_id", user.id).order("created_at", { ascending: false }).returns<AtsAnalysisRow[]>(),
        supabase.from("interview_prep").select("created_at").eq("user_id", user.id).order("created_at", { ascending: false }).returns<InterviewPrepRow[]>(),
    ]);

    const safeProfile = profile ?? null;
    const firstName = safeProfile?.first_name?.trim() ?? "";
    const lastName = safeProfile?.last_name?.trim() ?? "";
    const fallbackName = user.email?.split("@")[0] ?? "User";
    const userName = `${firstName} ${lastName}`.trim() || fallbackName;
    const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || fallbackName.slice(0, 1).toUpperCase() || "U";

    const uploadedResumes = (resumes ?? []).filter((resume) => resume.resume_type === "uploaded");
    const resumeUploadActivity = buildResumeUploadActivity(uploadedResumes, currentWeekStart);
    const atsTrend = buildAtsTrend(atsAnalyses ?? [], now);
    const recentActivity = buildRecentActivity(uploadedResumes, atsAnalyses ?? [], interviewSessions ?? []);

    const totalResumes = uploadedResumes.length;
    const totalAtsAnalyses = (atsAnalyses ?? []).length;
    const totalInterviewSessions = (interviewSessions ?? []).length;
    const isFirstTimeUser =
        totalResumes === 0 &&
        totalAtsAnalyses === 0 &&
        totalInterviewSessions === 0;

    const uploadedResumeCount = String(totalResumes);
    const atsAnalysisCount = String(totalAtsAnalyses);
    const hasAnyAtsScore = (atsAnalyses ?? []).some((a) => toNumber(a.ats_score) > 0);
    const avgAtsScore = hasAnyAtsScore
        ? `${Math.round(average((atsAnalyses ?? []).map((analysis) => analysis.ats_score)))}%`
        : "—";
    const interviewSessionsCount = String(totalInterviewSessions);

    const greeting = isFirstTimeUser
        ? `Welcome to HireHelp, ${firstName || fallbackName}!`
        : "Dashboard";
    const subtitle = isFirstTimeUser
        ? "Let's get your job search organized in a few minutes."
        : "Here's a snapshot of your job search activity.";

    return (
        <PageLayout currentPage="Dashboard" title={greeting} subtitle={subtitle} name={userName} initials={initials} email={user.email!}>
                {isFirstTimeUser && <GettingStarted />}
                <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
                    <StatCard
                        label="ATS analyses"
                        value={atsAnalysisCount}
                        icon={<ATSIcon />}
                        tooltip="Total ATS simulations you've run on the Resume Analysis page."
                        cta={{ href: "/resume-analysis", label: "Run your first analysis" }}
                    />
                    <StatCard
                        label="Average ATS score"
                        value={avgAtsScore}
                        icon={<TrackingIcon />}
                        tooltip="Average score across every ATS analysis you've completed. Shows '—' until you've run at least one."
                    />
                    <StatCard
                        label="Resumes uploaded"
                        value={uploadedResumeCount}
                        icon={<ResumeAnalysisIcon />}
                        tooltip="Unique resume PDFs you've uploaded for analysis. Each upload is stored in your Resume Bank."
                        cta={{ href: "/resume-analysis", label: "Upload a resume" }}
                    />
                    <StatCard
                        label="Interview sessions"
                        value={interviewSessionsCount}
                        icon={<InterviewIcon />}
                        tooltip="AI-generated interview practice sessions you've created."
                        cta={{ href: "/interview-prep", label: "Generate a session" }}
                    />
                </div>
                <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: 320, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "24px" }}>
                        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 4 }}>Resume upload activity</h2>
                        <p style={{ fontSize: 12, color: "#666", marginBottom: 16 }}>Resumes uploaded this week (Mon–Sun)</p>
                        <BarChart
                            data={resumeUploadActivity}
                            emptyMessage="No uploads this week yet. Upload a resume on the Resume Analysis page to see activity here."
                        />
                    </div>
                    <div style={{ flex: 1, minWidth: 320, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "24px" }}>
                        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 4 }}>ATS score trend</h2>
                        <p style={{ fontSize: 12, color: "#666", marginBottom: 16 }}>Average score across the last 4 weeks</p>
                        <BarChart
                            data={atsTrend}
                            maxValue={100}
                            yAxisFormat={(value) => `${value}%`}
                            valueFormat={(value) => `${value}%`}
                            emptyMessage="No ATS analyses in the last 4 weeks. Run an analysis to start tracking your score."
                        />
                    </div>
                </div>
                <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "24px" }}>
                    <h2 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 4 }}>Recent activity</h2>
                    <p style={{ fontSize: 12, color: "#666", marginBottom: 16 }}>Your latest 5 saved actions across HireHelp</p>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {recentActivity.length === 0 ? (
                            <div style={{ padding: "12px 0", fontSize: 13, color: "#555" }}>No saved activity yet. Upload a resume, run an ATS analysis, or generate an interview session to populate this feed.</div>
                        ) : recentActivity.map((item, i) => (
                            <div key={`${item.createdAt}-${item.action}-${i}`} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 0", borderBottom: i < recentActivity.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                                <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#000", flexShrink: 0, marginTop: 6 }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13.5, fontWeight: 500, color: "#0a0a0a" }}>{item.action}</div>
                                    <div style={{ fontSize: 12.5, color: "#666", marginTop: 2 }}>{item.detail}</div>
                                </div>
                                <span style={{ fontSize: 12, color: "#888", whiteSpace: "nowrap", paddingTop: 2 }}>{item.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
        </PageLayout>
    );
}
