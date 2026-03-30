import SignupBox from "@/components/SignupBox";
import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

export default async function Signup() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) redirect("/dashboard");

    return <SignupBox />;
}