import Link from 'next/link';
import { createClient } from '../../src/lib/supabase/server';
import JoinCodeCard from '../../src/components/JoinCodeCard';

const style = {
  bg: `min-h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  empty: `text-sm text-gray-600 text-center`,
  back: `inline-block mt-6 text-sm text-blue-700 underline`,
};

export default async function ClassPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className={style.bg}>
        <div className={style.container}>
          <h1 className={style.heading}>Meine Klasse</h1>
          <p className="text-center p-2">Bitte melde dich an, um deine Klasse zu sehen.</p>
          <Link href="/" className={style.back}>Zurück zu schlau.app</Link>
        </div>
      </div>
    );
  }

  const { data: classes } = await supabase
    .from('classes')
    .select('id, name, join_code')
    .eq('teacher_id', user.id)
    .order('created_at');

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h1 className={style.heading}>Meine Klasse</h1>
        {!classes || classes.length === 0 ? (
          <p className={style.empty}>Du hast noch keine Klasse.</p>
        ) : (
          classes.map((c) => (
            <JoinCodeCard key={c.id} classId={c.id} name={c.name} initialCode={c.join_code} />
          ))
        )}
      </div>
    </div>
  );
}
