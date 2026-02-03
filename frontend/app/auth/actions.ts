"use server"

import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

export type AuthState =
    | { ok: true }
    | { ok: false; error: string };

export async function signUpAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
    const firstName = String(formData.get("first_name") ?? "").trim();
    const lastName = String(formData.get("last_name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({ 
        email, 
        password, 
        options: { 
            data: { 
                first_name: firstName, 
                last_name: lastName 
            } 
        } 
    });
    
    if (error) {
        return { ok: false, error: error.message };
    }
    
    console.log(Object.fromEntries(formData.entries()));

    redirect("/dashboard");
}

export async function signInAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
        return { ok: false, error: error.message };
    }
    
    redirect("/dashboard");
}

export async function logoutAction() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    
    redirect("/auth/login");
}