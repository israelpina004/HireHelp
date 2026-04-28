import type { ReactNode } from "react";
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

function buildAtsTrend(atsAnalyses: AtsAnalysisRow[], now: Date): DashboardDatum[] {
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
            detail: resume.file_path ? truncateText(resume.file_path, 72) : "Resume added to your workspace",
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

function BarChart({ data, valueKey, labelKey, maxValue }: { data: Array<Record<string, string | number>>; valueKey: string; labelKey: string; maxValue?: number }) {
    const max = maxValue || Math.max(...data.map((datum) => Number(datum[valueKey]) || 0)) || 1;
    return (
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 120, paddingTop: 8 }}>
            {data.map((datum, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, gap: 6, height: "100%" }}>
                    <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                        <div style={{ width: "100%", background: "#000", borderRadius: 3, height: `${((Number(datum[valueKey]) || 0) / max) * 100}%`, minHeight: (Number(datum[valueKey]) || 0) > 0 ? 6 : 0 }} />
                    </div>
                    <span style={{ fontSize: 11, color: "#999", whiteSpace: "nowrap" }}>{datum[labelKey]}</span>
                </div>
            ))}
        </div>
    );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
    return (
        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12, flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontSize: 13, color: "#888", fontWeight: 500 }}>{label}</span>
                <span style={{ width: 36, height: 36, background: "#f5f5f5", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#555" }}>{icon}</span>
            </div>
            <span style={{ fontSize: 32, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'DM Serif Display', Georgia, serif" }}>{value}</span>
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

    const uploadedResumeCount = String(uploadedResumes.length);
    const atsAnalysisCount = String((atsAnalyses ?? []).length);
    const avgAtsScore = `${Math.round(average((atsAnalyses ?? []).map((analysis) => analysis.ats_score)))}%`;
    const interviewSessionsCount = String((interviewSessions ?? []).length);

    return (
        <PageLayout currentPage="Dashboard" title="Dashboard" subtitle="Welcome back! Here's your job application overview." name={userName} initials={initials} email={user.email!}>
                <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                    <StatCard label="ATS Analyses Run" value={atsAnalysisCount} icon={<TrackingIcon />} />
                    <StatCard label="Avg ATS Score" value={avgAtsScore} icon={<ATSIcon />} />
                    <StatCard label="Resumes Uploaded for Optimization" value={uploadedResumeCount} icon={<ResumeAnalysisIcon />} />
                    <StatCard label="Interview Sessions Generated" value={interviewSessionsCount} icon={<InterviewIcon />} />
                </div>
                <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                    <div style={{ flex: 1, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "24px" }}>
                        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 4 }}>Resume Upload Activity</h2>
                        <p style={{ fontSize: 12, color: "#aaa", marginBottom: 16 }}>Resumes uploaded this week</p>
                        <BarChart data={resumeUploadActivity} valueKey="value" labelKey="label" />
                    </div>
                    <div style={{ flex: 1, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "24px" }}>
                        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 4 }}>ATS Score Improvement</h2>
                        <p style={{ fontSize: 12, color: "#aaa", marginBottom: 16 }}>Average score trend over the last 4 weeks</p>
                        <BarChart data={atsTrend} valueKey="value" labelKey="label" maxValue={100} />
                    </div>
                </div>
                <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "24px" }}>
                    <h2 style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 4 }}>Recent Activity</h2>
                    <p style={{ fontSize: 12, color: "#aaa", marginBottom: 16 }}>Your latest 5 saved actions across HireHelp</p>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {recentActivity.length === 0 ? (
                            <div style={{ padding: "12px 0", fontSize: 13, color: "#888" }}>No saved activity yet. Upload a resume, run an ATS analysis, or generate an interview session to populate this feed.</div>
                        ) : recentActivity.map((item, i) => (
                            <div key={`${item.createdAt}-${item.action}-${i}`} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 0", borderBottom: i < recentActivity.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                                <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#000", flexShrink: 0, marginTop: 6 }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13.5, fontWeight: 500, color: "#0a0a0a" }}>{item.action}</div>
                                    <div style={{ fontSize: 12.5, color: "#888", marginTop: 2 }}>{item.detail}</div>
                                </div>
                                <span style={{ fontSize: 12, color: "#bbb", whiteSpace: "nowrap", paddingTop: 2 }}>{item.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
        </PageLayout>
    );
}