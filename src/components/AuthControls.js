'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineBarChart, AiOutlineHome, AiOutlineTeam, AiOutlineTrophy, AiOutlineUser } from 'react-icons/ai';
import { LuKey } from 'react-icons/lu';
import { createClient } from '../lib/supabase/client';
import MobileTabBar from './MobileTabBar';

// Google's official multicolor "G" mark - sign-in buttons are required to
// use this exact asset rather than an approximation. No such asset exists
// in the repo yet, so it's embedded inline here (only used in this one
// place).
function GoogleLogo() {
  return (
    <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
    </svg>
  );
}

const style = {
  bar: `flex items-center justify-end gap-2 px-3 py-1 text-sm text-neutral-600 relative`,
  button: `rounded-md px-3 py-1 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900`,
  accountButton: `flex items-center justify-center w-11 h-11 rounded-full text-gray-700 hover:bg-gray-100`,
  accountMenu: `absolute right-0 top-12 z-50 min-w-[200px] rounded-md border border-gray-200 bg-white p-3 text-sm shadow-lg`,
  accountMenuEmail: `mb-2 block truncate text-neutral-600`,
  // Not-signed-in header only: its own calm, neutral, "technical" identity
  // - deliberately distinct from the dark task-interaction buttons (the
  // "=" button is a near-black gradient) and the blue gradient page
  // background below it, since this is the first thing new users see.
  // flex-col by default, row from sm: up, so nothing has to wrap/cram at
  // ~360px widths - same "icon+label over cramped text" lesson as the
  // /badges and /class work earlier this session.
  signedOutBar: `flex flex-col items-stretch justify-end gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 shadow-sm relative sm:flex-row sm:items-center`,
  signedOutForm: `flex flex-col items-stretch gap-2 sm:flex-row sm:items-center`,
  input: `rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-800 placeholder:text-slate-400`,
  primaryButton: `flex items-center justify-center gap-1.5 rounded-md bg-slate-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50`,
  // Google's standard "light" sign-in button: white background, subtle
  // border, dark gray text - not a colored/dark button, per their brand
  // guidelines.
  googleButton: `flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50`,
  textLink: `text-xs underline text-slate-600 hover:text-slate-800 disabled:no-underline disabled:text-slate-400`,
  codeStatus: `text-xs text-slate-600`,
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
    // verifyOtp's `type` has to match which email Supabase actually sent -
    // "email" (magic link/OTP template) for a returning user, "signup"
    // (confirm signup template) for an email that's never signed in
    // before - and the client has no way to know which applies to a given
    // address ahead of time. Supabase's SDK doesn't expose a type value
    // covering both or a pre-check for this (confirmed against
    // @supabase/auth-js's own type definitions - EmailOtpType has no
    // wildcard, and there's no client-callable "does this user exist"
    // check without the service role key), so try the more common case
    // first and fall back to the other before surfacing an error.
    let { error } = await supabase.auth.verifyOtp({ email, token: code, type: 'email' });
    if (error) {
      ({ error } = await supabase.auth.verifyOtp({ email, token: code, type: 'signup' }));
    }
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
      <div className={style.signedOutBar}>
        <span className={style.codeStatus}>Code an {email} gesendet.</span>
        <form className={style.signedOutForm} onSubmit={verifyCode}>
          <input
            type="text"
            inputMode="numeric"
            required
            placeholder="Code"
            className={style.input}
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 8))}
          />
          <button type="submit" className={style.primaryButton} disabled={verifying || code.length < 6}>
            <LuKey className="h-4 w-4" />
            <span>{verifying ? 'Wird geprüft…' : 'Verify Code'}</span>
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
    <div className={style.signedOutBar}>
      <form className={style.signedOutForm} onSubmit={sendCode}>
        <input
          type="email"
          required
          placeholder="Email"
          className={style.input}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit" className={style.primaryButton}>
          <LuKey className="h-4 w-4" />
          <span>Request Code</span>
        </button>
      </form>
      <button type="button" className={style.googleButton} onClick={() => signIn('google')}>
        <GoogleLogo />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}
