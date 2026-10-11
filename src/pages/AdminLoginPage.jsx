import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../config/supabase.js";

function getErrorMessage(error) {
  if (error?.message === "Invalid login credentials") {
    return "The email address or password is incorrect. Please try again.";
  }

  return "We could not sign you in. Please try again.";
}

export default function AdminLoginPage({ isAuthenticated, onAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) onAuthenticated();
  }, [isAuthenticated, onAuthenticated]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!isSupabaseConfigured || !supabase) {
      setError("Admin login is not configured yet. Please contact the site administrator.");
      return;
    }

    setIsSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setIsSubmitting(false);

    if (signInError) {
      setError(getErrorMessage(signInError));
      return;
    }

    onAuthenticated();
  }

  return (
    <main className="admin-auth-page">
      <section className="admin-auth-card" aria-labelledby="admin-login-title">
        <a className="admin-auth-logo" href="/" aria-label="Thaara Sarees home">
          <img src="/images/brand/thaara-logo.png" alt="Thaara Sarees" />
        </a>
        <p className="admin-auth-eyebrow">Administration</p>
        <h1 id="admin-login-title">Welcome back</h1>
        <p className="admin-auth-intro">Sign in to access the Thaara Sarees admin area.</p>

        <form className="admin-auth-form" onSubmit={handleSubmit}>
          <label htmlFor="admin-email">Email address</label>
          <input id="admin-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required disabled={isSubmitting} />

          <label htmlFor="admin-password">Password</label>
          <input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required disabled={isSubmitting} />

          {error ? <p className="admin-auth-error" role="alert">{error}</p> : null}
          <button className="button button--wine admin-auth-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Signing in…" : "Sign in"}</button>
        </form>
      </section>
    </main>
  );
}
