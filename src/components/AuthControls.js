'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '../lib/supabase/client';

const style = {
  bar: `flex items-center justify-end gap-2 px-3 py-1 text-sm text-neutral-600`,
  button: `rounded-md px-3 py-1 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900`,
  input: `rounded-md border border-gray-300 px-2 py-1 text-sm text-neutral-800`,
};

export default function AuthControls({ initialUser }) {
  const [user, setUser] = useState(initialUser ?? null);
  const [supabase] = useState(() => createClient());
  const [email, setEmail] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  const signIn = (provider) => {
    supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const sendMagicLink = (event) => {
    event.preventDefault();
    supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/confirm` },
    });
    setMagicLinkSent(true);
  };

  const signOut = () => {
    supabase.auth.signOut();
  };

  if (user) {
    return (
      <div className={style.bar}>
        <span>{user.email}</span>
        <Link href="/badges" className={style.button}>Meine Abzeichen</Link>
        <button type="button" className={style.button} onClick={signOut}>Abmelden</button>
      </div>
    );
  }

  if (magicLinkSent) {
    return (
      <div className={style.bar}>
        <span>Link an {email} gesendet, bitte E-Mails prüfen.</span>
      </div>
    );
  }

  return (
    <div className={style.bar}>
      <form className="flex items-center gap-2" onSubmit={sendMagicLink}>
        <input
          type="email"
          required
          placeholder="E-Mail"
          className={style.input}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit" className={style.button}>Link anfordern</button>
      </form>
      <button type="button" className={style.button} onClick={() => signIn('google')}>
        Mit Google anmelden
      </button>
    </div>
  );
}
