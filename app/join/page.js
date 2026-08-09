import Link from 'next/link';
import { createClient } from '../../src/lib/supabase/server';
import JoinClassForm from '../../src/components/JoinClassForm';
import LeaveClassButton from '../../src/components/LeaveClassButton';

const style = {
  bg: `min-h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  welcome: `mb-4 rounded-md border border-green-200 bg-green-50 p-3 text-center text-sm text-green-800`,
  currentClass: `text-sm text-gray-700 text-center mb-4`,
  back: `inline-block mt-6 text-sm text-blue-700 underline`,
};

export default async function JoinPage({ searchParams }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className={style.bg}>
        <div className={style.container}>
          <h1 className={style.heading}>Join Class</h1>
          <p className="text-center p-2">Bitte melde dich an, um einer Klasse beizutreten.</p>
          <Link href="/" className={style.back}>Zurück zu schlau.app</Link>
        </div>
      </div>
    );
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('class_id')
    .eq('id', user.id)
    .single();

  let currentClassName = null;
  if (profile?.class_id) {
    const { data } = await supabase
      .from('classes')
      .select('name')
      .eq('id', profile.class_id)
      .single();
    currentClassName = data?.name ?? null;
  }

  const { joined } = await searchParams;

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h1 className={style.heading}>Join Class</h1>
        {joined ? (
          <p className={style.welcome}>You&apos;re now a member of {joined}!</p>
        ) : (
          currentClassName && (
            <p className={style.currentClass}>You&apos;re currently in: {currentClassName}</p>
          )
        )}
        {currentClassName && <LeaveClassButton className={currentClassName} />}
        <JoinClassForm alreadyInClass={!!currentClassName} />
      </div>
    </div>
  );
}
