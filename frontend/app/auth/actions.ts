"use server"

import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

export type AuthState =
    | { ok: true }
    | { ok: false; error: string };

export async function signUpAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "").trim();
    
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
        throw new Error(error.message);
    }
    
    redirect("/home");
}

export async function signInAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
        throw new Error(error.message);
    }
    
    redirect("/home");
}

export async function logoutAction() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    
    redirect("/auth/login");
}