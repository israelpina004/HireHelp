import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";
import ResumeBankClient, { type ResumeBankItem } from "./ResumeBankClient";

type ProfileRow = { first_name: string | null; last_name: string | null };
type ResumeRow = {
    id: number;
    file_path: string | null;
    file_text: string | null;
    resume_type: string | null;
    created_at: string | null;
};
type AtsAnalysisRow = {
    id: string;
    resume_id: number | null;
    ats_score: number | string | null;
    job_description: string | null;
    created_at: string | null;
};

const RESUME_PDF_BUCKET = "resume_pdfs";

function getResumeStoragePath(filePath: string | null) {
    if (!filePath || !filePath.includes("/")) {
        return null;
    }

    return filePath;
}

function toNumber(value: number | string | null | undefined) {
    if (typeof value === "number") {
        return Number.isFinite(value) ? value : null;
    }

    if (typeof value === "string") {
        const parsed = Number.parseFloat(value);
        return Number.isFinite(parsed) ? parsed : null;
    }

    return null;
}

function getResumeDisplayName(filePath: string | null) {
    if (!filePath) {
        return "Untitled resume";
    }

    const trimmed = filePath.trim();
    if (!trimmed) {
        return "Untitled resume";
    }

    return trimmed.split("/").pop()?.trim() || trimmed;
}

function getResumePdfUrl(supabase: Awaited<ReturnType<typeof createClient>>, filePath: string | null) {
    const storagePath = getResumeStoragePath(filePath);
    if (!storagePath) {
        return null;
    }

    return supabase.storage.from(RESUME_PDF_BUCKET).getPublicUrl(storagePath).data.publicUrl;
}

export default async function ResumeBank() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/auth/login");
    }

    const [
        { data: profile },
        { data: resumes },
        { data: analyses },
    ] = await Promise.all([
        supabase.from("profiles").select("first_name,last_name").eq("id", user.id).maybeSingle<ProfileRow>(),
        supabase.from("resumes").select("id,file_path,file_text,resume_type,created_at").eq("user_id", user.id).eq("resume_type", "uploaded").order("created_at", { ascending: false }).returns<ResumeRow[]>(),
        supabase.from("ats_analyses").select("id,resume_id,ats_score,job_description,created_at").eq("user_id", user.id).not("resume_id", "is", null).order("created_at", { ascending: false }).returns<AtsAnalysisRow[]>(),
    ]);

    const safeProfile = profile ?? null;
    const firstName = safeProfile?.first_name?.trim() ?? "";
    const lastName = safeProfile?.last_name?.trim() ?? "";
    const fallbackName = user.email?.split("@")[0] ?? "User";
    const userName = `${firstName} ${lastName}`.trim() || fallbackName;
    const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || fallbackName.slice(0, 1).toUpperCase() || "U";

    const latestAnalysisByResumeId = new Map<number, AtsAnalysisRow>();
    for (const analysis of analyses ?? []) {
        if (!analysis.resume_id || latestAnalysisByResumeId.has(analysis.resume_id)) {
            continue;
        }

        latestAnalysisByResumeId.set(analysis.resume_id, analysis);
    }

    const resumeItems: ResumeBankItem[] = (resumes ?? []).map((resume) => {
        const latestAnalysis = latestAnalysisByResumeId.get(resume.id) ?? null;

        return {
            id: resume.id,
            filePath: getResumeDisplayName(resume.file_path),
            fileText: resume.file_text ?? "",
            storagePath: getResumeStoragePath(resume.file_path),
            pdfUrl: getResumePdfUrl(supabase, resume.file_path),
            createdAt: resume.created_at,
            atsScore: toNumber(latestAnalysis?.ats_score),
            jobDescription: latestAnalysis?.job_description ?? "",
            analysisCreatedAt: latestAnalysis?.created_at ?? null,
        };
    });

    return (
        <ResumeBankClient
            userName={userName}
            initials={initials}
            email={user.email!}
            resumes={resumeItems}
        />
    );
}