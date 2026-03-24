import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";
import ApplicationTrackingClient from "./ApplicationTrackingClient";

export default async function ApplicationTracking() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/auth/login");
    }

    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

    const userName = profile
        ? `${profile.first_name} ${profile.last_name}`
        : "User";
    const initials = profile
        ? `${profile.first_name[0]}${profile.last_name[0]}`
        : "U";

    return (
        <ApplicationTrackingClient
            userName={userName}
            initials={initials}
            email={user.email!}
        />
    );
}