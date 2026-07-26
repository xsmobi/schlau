'use client';

import { useEffect, useState } from 'react';
import { createClient } from '../lib/supabase/client';

const style = {
  bar: `flex items-center justify-end gap-2 px-3 py-1 text-sm text-neutral-600`,
  button: `rounded-md px-3 py-1 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900`,
};

export default function AuthControls({ initialUser }) {
  const [user, setUser] = useState(initialUser ?? null);
  const [supabase] = useState(() => createClient());

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

  const signOut = () => {
    supabase.auth.signOut();
  };

  if (user) {
    return (
      <div className={style.bar}>
        <span>{user.email}</span>
        <button type="button" className={style.button} onClick={signOut}>Abmelden</button>
      </div>
    );
  }

  return (
    <div className={style.bar}>
      <button type="button" className={style.button} onClick={() => signIn('google')}>
        Mit Google anmelden
      </button>
    </div>
  );
}
