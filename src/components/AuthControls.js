'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineBarChart, AiOutlineHome, AiOutlineTeam, AiOutlineTrophy, AiOutlineUser } from 'react-icons/ai';
import { createClient } from '../lib/supabase/client';
import MobileTabBar from './MobileTabBar';

const style = {
  bar: `flex items-center justify-end gap-2 px-3 py-1 text-sm text-neutral-600 relative`,
  button: `rounded-md px-3 py-1 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900`,
  input: `rounded-md border border-gray-300 px-2 py-1 text-sm text-neutral-800`,
  accountButton: `flex items-center justify-center w-11 h-11 rounded-full text-gray-700 hover:bg-gray-100`,
  accountMenu: `absolute right-0 top-12 z-50 min-w-[200px] rounded-md border border-gray-200 bg-white p-3 text-sm shadow-lg`,
  accountMenuEmail: `mb-2 block truncate text-neutral-600`,
  textLink: `text-xs underline text-neutral-600 hover:text-neutral-800 disabled:no-underline disabled:text-neutral-400`,
  codeStatus: `text-xs text-neutral-600`,
  codeError: `text-xs text-red-600`,
};

// Avoids hammering signInWithOtp if a student mashes "Resend Code".
const RESEND_COOLDOWN_MS = 30000;

// Same {href, label} pairs the desktop nav has always used, built once and
// shared with the mobile bottom tab bar so both surfaces agree on
// destinations and labels instead of listing them twice. Teachers don't
// get a Leaderboard entry here - same reasoning as the desktop nav: it's
// ambiguous once a teacher owns more than one class, so they reach a
// specific class's leaderboard from that class's card on /class instead.
function buildNavItems(role, hasClass) {
  const items = [{ href: '/badges', label: 'My Badges', icon: AiOutlineTrophy }];
  if (role === 'teacher') {
    items.push({ href: '/class', label: 'My Class', icon: AiOutlineTeam });
  } else {
    items.push({ href: '/join', label: hasClass ? 'Change Class' : 'Join Class', icon: AiOutlineTeam });
    items.push({ href: '/leaderboard', label: 'Leaderboard', icon: AiOutlineBarChart });
  }
  return items;
}

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

export default function AuthControls({ initialUser, initialRole, initialHasClass }) {
  const [user, setUser] = useState(initialUser ?? null);
  const [role] = useState(initialRole ?? null);
  const [hasClass] = useState(initialHasClass ?? false);
  const [supabase] = useState(() => createClient());
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState(null);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [lastPathname, setLastPathname] = useState(pathname);
  const resendTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (resendTimeoutRef.current) clearTimeout(resendTimeoutRef.current);
    };
  }, []);

  // Close the account menu on navigation instead of leaving it open over
  // whatever page the user just tapped through to. Derived during render
  // (React's recommended pattern for "reset state when a value changes")
  // rather than in an effect, which would call setState synchronously on
  // every navigation and trigger an extra cascading render.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setAccountMenuOpen(false);
  }

  useEffect(() => {
    // AuthControls lives in the root layout and stays mounted across
    // client-side navigation, so its state outlives whatever page a sign-
    // out happens to be triggered from. Without resetting this here,
    // requesting a code once and later signing out - from any page -
    // would keep showing the stale code-entry step forever instead of
    // the plain sign-in form.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === 'SIGNED_OUT') {
        setCodeSent(false);
        setEmail('');
        setCode('');
        setVerifyError(null);
        setResendCooldown(false);
        if (resendTimeoutRef.current) {
          clearTimeout(resendTimeoutRef.current);
          resendTimeoutRef.current = null;
        }
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

  const sendCode = (event) => {
    event.preventDefault();
    // Omitting emailRedirectTo makes signInWithOtp send a 6-to-8-digit
    // numeric code instead of a clickable magic link.
    supabase.auth.signInWithOtp({ email });
    setCodeSent(true);
  };

  const verifyCode = async (event) => {
    event.preventDefault();
    setVerifying(true);
    setVerifyError(null);
    const { error } = await supabase.auth.verifyOtp({ email, token: code, type: 'email' });
    if (error) {
      setVerifying(false);
      // Any failure here is essentially always a wrong/expired/already-used
      // code from the student's point of view - not worth trying to
      // string-match Supabase's exact error text for a more specific
      // message.
      setVerifyError('Code ungültig oder abgelaufen, bitte versuche es erneut.');
      return;
    }
    // AuthControls' role/hasClass are captured once from server-rendered
    // props at mount - onAuthStateChange updates `user` reactively, but
    // not those - so a reload is needed for the nav to show the correct
    // role-driven links, same reasoning as every other sign-in-adjacent
    // flow in this app (join_class, redeem_teacher_code). Reloading the
    // current page (rather than redirecting anywhere) since sign-in was
    // never about "going somewhere new" - just continuing where the
    // student already was, signed in.
    window.location.reload();
  };

  const resendCode = async () => {
    if (resendCooldown || resending) return;
    setResending(true);
    setVerifyError(null);
    await supabase.auth.signInWithOtp({ email });
    setResending(false);
    setCode('');
    setResendCooldown(true);
    if (resendTimeoutRef.current) clearTimeout(resendTimeoutRef.current);
    resendTimeoutRef.current = setTimeout(() => {
      setResendCooldown(false);
      resendTimeoutRef.current = null;
    }, RESEND_COOLDOWN_MS);
  };

  const goBackToEmail = () => {
    setCodeSent(false);
    setCode('');
    setVerifyError(null);
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
    const navItems = buildNavItems(role, hasClass);
    const mobileTabs = [{ href: '/', label: 'Tasks', icon: AiOutlineHome, isHome: true }, ...navItems];

    return (
      <div className={style.bar}>
        {/* Desktop/tablet: unchanged from before - email, full nav links,
            inline Sign Out button. Hidden below md. */}
        <div className="hidden items-center gap-2 md:flex">
          <span>{user.email}</span>
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} pathname={pathname} />
          ))}
          <button type="button" className={style.button} onClick={signOut}>Sign Out</button>
        </div>

        {/* Mobile: email + Sign Out collapse into a small account menu,
            since they're infrequent actions rather than primary
            destinations - those live in the bottom tab bar instead. */}
        <div className="flex md:hidden">
          <button
            type="button"
            className={style.accountButton}
            onClick={() => setAccountMenuOpen((open) => !open)}
            aria-label="Account menu"
            aria-expanded={accountMenuOpen}
          >
            <AiOutlineUser className="h-6 w-6" />
          </button>
          {accountMenuOpen && (
            <div className={style.accountMenu}>
              <span className={style.accountMenuEmail}>{user.email}</span>
              <button
                type="button"
                className={style.button}
                onClick={() => {
                  setAccountMenuOpen(false);
                  signOut();
                }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        <MobileTabBar tabs={mobileTabs} pathname={pathname} />
      </div>
    );
  }

  if (codeSent) {
    return (
      <div className={style.bar}>
        <span className={style.codeStatus}>Code an {email} gesendet.</span>
        <form className="flex items-center gap-2" onSubmit={verifyCode}>
          <input
            type="text"
            inputMode="numeric"
            required
            placeholder="Code"
            className={style.input}
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 8))}
          />
          <button type="submit" className={style.button} disabled={verifying || code.length < 6}>
            {verifying ? 'Wird geprüft…' : 'Verify Code'}
          </button>
        </form>
        <button
          type="button"
          className={style.textLink}
          onClick={resendCode}
          disabled={resendCooldown || resending}
        >
          {resending ? 'Wird gesendet…' : resendCooldown ? 'Code gesendet' : 'Resend Code'}
        </button>
        {/* Otherwise a mistyped email is a dead end short of a full page
            reload - this steps back to the email input, keeping what was
            typed so a typo can be fixed instead of retyped from scratch. */}
        <button type="button" className={style.textLink} onClick={goBackToEmail}>
          Wrong email? Go back
        </button>
        {verifyError && <p className={style.codeError}>{verifyError}</p>}
      </div>
    );
  }

  return (
    <div className={style.bar}>
      <form className="flex items-center gap-2" onSubmit={sendCode}>
        <input
          type="email"
          required
          placeholder="Email"
          className={style.input}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit" className={style.button}>Request Code</button>
      </form>
      <button type="button" className={style.button} onClick={() => signIn('google')}>
        Sign in with Google
      </button>
    </div>
  );
}
