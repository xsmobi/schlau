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
    window.location.href = error ? '/auth/auth-code-error' : '/';
  };

  if (!tokenHash || !type) {
    return null;
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Anmeldung bestätigen</h1>
      <p>Klicke auf den Button, um die Anmeldung abzuschließen.</p>
      <button type="button" onClick={confirm} disabled={pending}>
        {pending ? 'Anmelden…' : 'Anmelden'}
      </button>
    </div>
  );
}
