'use client';

import { useState } from 'react';
import { createClient } from '../lib/supabase/client';

const style = {
  input: `w-full text-center font-mono text-3xl tracking-[0.3em] rounded-md border border-gray-300 px-2 py-3 text-neutral-800`,
  button: `mt-4 w-full rounded-md px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 disabled:opacity-50`,
  secondaryButton: `mt-2 w-full rounded-md px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300`,
  error: `mt-2 text-sm text-red-600 text-center`,
  confirm: `mt-4 text-center text-lg text-gray-800`,
  success: `mt-4 text-center text-lg text-green-700`,
};

function messageFor(error) {
  if (error?.message === 'code not found') {
    return 'Code nicht gefunden, frage deine Lehrkraft nach dem aktuellen Code.';
  }
  return 'Etwas ist schiefgelaufen, bitte versuche es erneut.';
}

export default function JoinClassForm() {
  const [supabase] = useState(() => createClient());
  const [code, setCode] = useState('');
  const [step, setStep] = useState('input'); // 'input' | 'confirm' | 'success'
  const [preview, setPreview] = useState(null); // { class_id, class_name }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const lookup = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.rpc('lookup_class_by_code', { p_code: code });
    setLoading(false);
    if (error) {
      setError(messageFor(error));
      return;
    }
    setPreview(data?.[0] ?? null);
    setStep('confirm');
  };

  const confirmJoin = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.rpc('join_class', { p_code: code });
    setLoading(false);
    if (error) {
      setError(messageFor(error));
      setStep('input');
      return;
    }
    setPreview(data?.[0] ?? preview);
    setStep('success');
  };

  const cancel = () => {
    setStep('input');
    setPreview(null);
  };

  if (step === 'success') {
    return <p className={style.success}>Du bist jetzt Mitglied von {preview?.class_name}!</p>;
  }

  if (step === 'confirm') {
    return (
      <div>
        <p className={style.confirm}>Klasse „{preview?.class_name}“ beitreten?</p>
        <button type="button" className={style.button} onClick={confirmJoin} disabled={loading}>
          {loading ? 'Wird beigetreten...' : 'Beitreten'}
        </button>
        <button type="button" className={style.secondaryButton} onClick={cancel} disabled={loading}>
          Abbrechen
        </button>
        {error && <p className={style.error}>{error}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={lookup}>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={6}
        required
        placeholder="000000"
        className={style.input}
        value={code}
        onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
      />
      <button type="submit" className={style.button} disabled={loading || code.length !== 6}>
        {loading ? 'Wird gesucht...' : 'Weiter'}
      </button>
      {error && <p className={style.error}>{error}</p>}
    </form>
  );
}
