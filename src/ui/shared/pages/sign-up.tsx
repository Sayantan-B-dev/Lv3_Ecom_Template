"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/lib/store-context";

export function SignUpPage() {
  const { signIn } = useStore();
  const router = useRouter();
  const [name, setName] = useState("Demo Shopper");
  const [email, setEmail] = useState("demo@meridian.example");

  return (
    <div className="container">
      <div className="auth-wrap card card-pad">
        <h1>Create account (mock)</h1>
        <p style={{ color: "var(--color-text-secondary)" }}>Stored only in your browser. No email is sent.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn({ name, email });
            router.push("/account");
          }}
        >
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" className="input" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" className="input" type="password" defaultValue="demo-password" required minLength={4} />
            <span className="form-hint">Mock only — do not reuse a real password.</span>
          </div>
          <button type="submit" className="btn btn-primary btn-block">Create mock account</button>
        </form>
        <p style={{ marginTop: "1rem" }}>
          Already have one? <Link href="/auth/sign-in">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
