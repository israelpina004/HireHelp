import LoginBox from "@/components/LoginBox";
import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

export default async function Login() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user || user !== null) {
        redirect("/dashboard");
    }

    return (
        <>
            <LoginBox />
        </>
    )
}