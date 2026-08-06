'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '../lib/supabase/client';

const style = {
  bar: `flex items-center justify-end gap-2 px-3 py-1 text-sm text-neutral-600`,
  button: `rounded-md px-3 py-1 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900`,
  input: `rounded-md border border-gray-300 px-2 py-1 text-sm text-neutral-800`,
};

// Renders the link to `href` normally, unless we're already on that page -
// then it becomes a "back to tasks" link instead of a redundant active
// link. Centralized here so any page added to the nav bar later gets this
// behavior automatically instead of needing its own patch.
function NavLink({ href, label, pathname }) {
  if (pathname === href) {
    return <Link href="/" className={style.button}>Back to Tasks</Link>;
  }
  return <Link href={href} className={style.button}>{label}</Link>;
}

export default function AuthControls({ initialUser, initialRole }) {
  const [user, setUser] = useState(initialUser ?? null);
  const [role] = useState(initialRole ?? null);
  const [supabase] = useState(() => createClient());
  const [email, setEmail] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // AuthControls lives in the root layout and stays mounted across
    // client-side navigation, so its state outlives whatever page a sign-
    // out happens to be triggered from. Without resetting magicLinkSent/
    // email here, requesting a link once and later signing out - from any
    // page - would keep showing the stale "link sent" message forever
    // instead of the plain sign-in form.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === 'SIGNED_OUT') {
        setMagicLinkSent(false);
        setEmail('');
      }
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  // The magic-link confirmation page is a standalone flow step, not part
  // of the app's regular navigation - it must show only the confirm
  // button, no nav bar in any auth state.
  if (pathname === '/auth/confirm') {
    return null;
  }

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

  // Pages like /badges, /class, /join, /leaderboard fetch user-specific
  // data server-side (gated by `if (!user) return <signed-out view>`) and
  // hand some of it to client components with their own local state
  // (Leaderboard's fetched rows, JoinClassForm's step, etc). Signing out
  // only updates AuthControls' own `user` state via onAuthStateChange -
  // nothing tells those server components to re-fetch, so their stale
  // authenticated output (and any client state under it) stays on screen.
  // router.refresh() re-runs every server component on the current route
  // once the session cookie is actually cleared, which flips each page to
  // its signed-out branch and - since that's a structurally different
  // tree - unmounts any stale client children along with it. One fix
  // here covers every current and future page with this shape, instead
  // of each page needing its own auth listener.
  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (user) {
    return (
      <div className={style.bar}>
        <span>{user.email}</span>
        <NavLink href="/badges" label="My Badges" pathname={pathname} />
        {role === 'teacher' ? (
          // Teachers reach a given class's leaderboard from that class's
          // card on /class instead - a top-level link here would be
          // ambiguous once a teacher owns more than one class.
          <NavLink href="/class" label="My Class" pathname={pathname} />
        ) : (
          <>
            <NavLink href="/join" label="Join Class" pathname={pathname} />
            <NavLink href="/leaderboard" label="Leaderboard" pathname={pathname} />
          </>
        )}
        <button type="button" className={style.button} onClick={signOut}>Sign Out</button>
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
          placeholder="Email"
          className={style.input}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit" className={style.button}>Request Link</button>
      </form>
      <button type="button" className={style.button} onClick={() => signIn('google')}>
        Sign in with Google
      </button>
    </div>
  );
}
