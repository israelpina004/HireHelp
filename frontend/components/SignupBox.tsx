'use client';

import { useActionState } from "react";
import { signUpAction, type AuthState } from "@/app/auth/actions";

export default function SignupBox() {
    const initialState: AuthState = { ok: true };
    const [state, formAction] = useActionState(signUpAction, initialState);
    
    return (
        <div className="flex flex-col items-center pt-5 pb-5">
            <form action={formAction} className="flex flex-col items-center space-y-4 border border-gray-300 rounded-md shadow-md pb-15 pl-15 pr-15 pt-10">
                <h1 className="text-3xl font-bold text-center pb-5">Sign Up 👥</h1>
                <input className="text-black text-md" type="text" name="first_name" placeholder="First Name" required />
                <input className="text-black text-md" type="text" name="last_name" placeholder="Last Name" required />
                <input className="text-black text-md" type="email" name="email" placeholder="Email" required />
                <input className="text-black text-md" type="password" name="password" placeholder="Password" required />

                {!state?.ok && (
                    <p className="text-md p-5 text-red-500">{state.error}</p>
                )}

                <button type="submit">Sign Up</button>

                <p className="text-md p-5 text-black">Already have an account? <a href="/auth/login" className="text-blue-500">Log In</a></p>
            </form>
        </div>
    )
}