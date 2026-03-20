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
            <div className="flex flex-col items-center pt-10">
                <h1 className="text-6xl font-bold p-5">Welcome Back 🎉</h1>
            </div>
            <LoginBox />
        </>
    )
}