"use client";

import { useActionState } from "react";
import { signInAction, type AuthState } from "@/app/auth/actions";

export default function LoginBox() {
    const initialState: AuthState = { ok: true };
    const [state, formAction] = useActionState(signInAction, initialState);

    return (
        <>
            <div className="flex flex-col items-center pt-5 pb-5">
                <form action={formAction} className="flex items-center flex-col space-y-4 border border-gray-300 rounded-md shadow-md pb-15 pl-15 pr-15 pt-10">
                    <h1 className="text-3xl font-bold text-center pb-5">Login 🔐</h1>
                    <input className="text-black text-md" type="email" name="email" placeholder="Email" required />
                    <input className="text-black text-md" type="password" name="password" placeholder="Password" required />

                    {state?.ok === false && (
                        <p className="text-md p-5 text-red-500">{state.error}</p>
                    )}

                    <button type="submit">Login</button>

                    <p className="text-md p-5 text-black">Don't have an account? <a href="/auth/signup" className="text-blue-500">Sign Up</a></p>
                </form>
            </div>
        </>
    )
}