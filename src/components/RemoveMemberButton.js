'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../lib/supabase/client';

const style = {
  wrap: `flex items-center gap-2`,
  link: `text-xs text-red-600 underline hover:text-red-800`,
  confirmButton: `rounded px-2 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50`,
  cancelButton: `rounded px-2 py-1 text-xs font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:opacity-50`,
  error: `text-xs text-red-600`,
};

// Removal only clears the student's profiles.class_id (via
// remove_class_member()) - their history/badges/points stay intact, same
// as student self-leave. router.refresh() is enough here (unlike
// leave/join/redeem) since only this page's own roster list needs to
// reflect the change, not the acting teacher's own nav-bar state.
export default function RemoveMemberButton({ studentId }) {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const remove = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.rpc('remove_class_member', { p_student_id: studentId });
    if (error) {
      setLoading(false);
      setError('Fehlgeschlagen.');
      return;
    }
    router.refresh();
  };

  if (confirming) {
    return (
      <div className={style.wrap}>
        <button type="button" className={style.confirmButton} onClick={remove} disabled={loading}>
          {loading ? '…' : 'Confirm'}
        </button>
        <button
          type="button"
          className={style.cancelButton}
          onClick={() => setConfirming(false)}
          disabled={loading}
        >
          Cancel
        </button>
        {error && <span className={style.error}>{error}</span>}
      </div>
    );
  }

  return (
    <button type="button" className={style.link} onClick={() => setConfirming(true)}>
      Remove
    </button>
  );
}
