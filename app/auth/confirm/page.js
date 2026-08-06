'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '../../../src/lib/supabase/client';

export default function ConfirmPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmForm />
    </Suspense>
  );
}

function ConfirmForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, setPending] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type');

  useEffect(() => {
    if (!tokenHash || !type) {
      router.replace('/auth/auth-code-error');
    }
  }, [tokenHash, type, router]);

  const confirm = async () => {
    setPending(true);
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    setPending(false);
    if (error) {
      window.location.href = '/auth/auth-code-error';
      return;
    }
    setConfirmed(true);
  };

  if (!tokenHash || !type) {
    return null;
  }

  // Magic links open in a new tab/window, and there's no reliable way to
  // close it and hand control back to the original one across browsers -
  // so instead of auto-redirecting, tell the user to return there
  // manually. Mobile browsers don't expose a visible multi-window
  // taskbar the way desktop does, and a link tapped from a mail app
  // often opens in a fresh tab (or the mail app's own in-app browser)
  // rather than anywhere "back" would reach - so the mobile hint points
  // at the browser's tab switcher and offers reopening the app as a
  // fallback, rather than assuming "go back" gets them anywhere useful.
  if (confirmed) {
    const isMobile = typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Signed In!</h1>
        {isMobile ? (
          <p>
            Use your browser&apos;s tab switcher to go back to the tab where you started, or just
            reopen schlau.app.
          </p>
        ) : (
          <p>You can close this tab now and return to your original tab or window.</p>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Confirm Sign-In</h1>
      <p>Click the button below to finish signing in.</p>
      <button type="button" onClick={confirm} disabled={pending}>
        {pending ? 'Signing in…' : 'Sign In'}
      </button>
    </div>
  );
}
