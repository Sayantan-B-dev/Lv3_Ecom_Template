"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/lib/store-context";

export default function SignInPage() {
  const { signIn } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("demo@meridian.example");
  const [error, setError] = useState("");

  return (
    <div className="container">
      <div className="auth-wrap card card-pad">
        <h1>Sign in (mock)</h1>
        <p style={{ color: "var(--color-subtle)" }}>Any email and password signs you in locally. No real authentication.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email.includes("@")) {
              setError("Enter a valid email address.");
              return;
            }
            signIn({ name: email.split("@")[0], email });
            router.push("/account");
          }}
        >
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" className="input" type="password" defaultValue="demo-password" required minLength={4} />
          </div>
          {error && <p role="alert" style={{ color: "var(--color-danger)" }}>{error}</p>}
          <button type="submit" className="btn btn-primary btn-block">Sign in</button>
        </form>
        <p style={{ marginTop: "1rem" }}>
          No account? <Link href="/auth/sign-up">Create a mock account</Link>
        </p>
      </div>
    </div>
  );
}
