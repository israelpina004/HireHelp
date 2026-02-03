import SignupBox from "@/components/SignupBox";
import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

export default async function Signup() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        redirect("/dashboard");
    }
    
    return (
        <>
            <div className="flex flex-col items-center pt-10">
                <h1 className="text-6xl font-bold p-5">Let's Get Started 🚀</h1>
            </div>
            <SignupBox />
        </>
    )
}