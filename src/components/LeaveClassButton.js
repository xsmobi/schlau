'use client';

import { useState } from 'react';
import { createClient } from '../lib/supabase/client';

const style = {
  wrap: `text-center mb-4`,
  link: `text-xs text-red-600 underline hover:text-red-800`,
  confirmText: `text-sm text-gray-800`,
  button: `mt-2 rounded-md px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50`,
  secondaryButton: `mt-2 ml-2 rounded-md px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300`,
  error: `mt-2 text-sm text-red-600`,
};

// Leaving only clears profiles.class_id (via leave_class()) - all
// existing history/badges/points stay intact, so rejoining later loses
// nothing. Confirmed before acting since it changes leaderboard
// visibility immediately.
export default function LeaveClassButton({ className }) {
  const [supabase] = useState(() => createClient());
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const leave = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.rpc('leave_class');
    if (error) {
      setLoading(false);
      setError('Klasse konnte nicht verlassen werden, bitte versuche es erneut.');
      return;
    }
    // Same reason join/redeem hard-navigate: the nav bar's Class tab
    // (desktop and mobile) and this page's own alreadyInClass prop are
    // both captured once from server-rendered data and won't react to a
    // client-side change.
    window.location.href = '/join';
  };

  if (confirming) {
    return (
      <div className={style.wrap}>
        <p className={style.confirmText}>Klasse „{className}“ wirklich verlassen?</p>
        <button type="button" className={style.button} onClick={leave} disabled={loading}>
          {loading ? 'Wird verlassen…' : 'Leave Class'}
        </button>
        <button
          type="button"
          className={style.secondaryButton}
          onClick={() => setConfirming(false)}
          disabled={loading}
        >
          Cancel
        </button>
        {error && <p className={style.error}>{error}</p>}
      </div>
    );
  }

  return (
    <div className={style.wrap}>
      <button type="button" className={style.link} onClick={() => setConfirming(true)}>
        Leave Class
      </button>
    </div>
  );
}
