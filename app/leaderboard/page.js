import Link from 'next/link';
import { createClient } from '../../src/lib/supabase/server';
import Leaderboard from '../../src/components/Leaderboard';

const style = {
  bg: `min-h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]`,
  container: `bg-slate-100 max-w-[600px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  empty: `text-sm text-gray-600 text-center`,
  back: `inline-block mt-6 text-sm text-blue-700 underline`,
};

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className={style.bg}>
        <div className={style.container}>
          <h1 className={style.heading}>Bestenliste</h1>
          <p className="text-center p-2">Bitte melde dich an, um die Bestenliste zu sehen.</p>
          <Link href="/" className={style.back}>Zurück zu schlau.app</Link>
        </div>
      </div>
    );
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, class_id')
    .eq('id', user.id)
    .single();

  let classes = [];
  if (profile?.role === 'teacher') {
    const { data } = await supabase
      .from('classes')
      .select('id, name')
      .eq('teacher_id', user.id)
      .order('created_at');
    classes = data ?? [];
  } else if (profile?.class_id) {
    const { data } = await supabase
      .from('classes')
      .select('id, name')
      .eq('id', profile.class_id)
      .single();
    if (data) classes = [data];
  }

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h1 className={style.heading}>Bestenliste</h1>
        {classes.length === 0 ? (
          <p className={style.empty}>
            {profile?.role === 'teacher'
              ? 'Du hast noch keine Klasse.'
              : 'Du bist noch keiner Klasse zugeordnet.'}
          </p>
        ) : (
          <Leaderboard classes={classes} />
        )}
      </div>
    </div>
  );
}
