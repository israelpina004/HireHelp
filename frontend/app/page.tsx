import { redirect } from "next/navigation";
import { createClient } from "./lib/supabase/client";

export default async function Page() {
  const supabase = await createClient();
  const { data: {user} } = await supabase.auth.getUser();
  if (!user) {
    redirect("/auth/login");
  } 
  
  else {
    redirect("/dashboard");
  }
}