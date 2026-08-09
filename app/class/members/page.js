import Link from 'next/link';
import { createClient } from '../../../src/lib/supabase/server';
import RemoveMemberButton from '../../../src/components/RemoveMemberButton';

const style = {
  bg: `min-h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  empty: `text-sm text-gray-600 text-center`,
  back: `inline-block mt-6 text-sm text-blue-700 underline`,
  row: `mt-3 flex items-center justify-between gap-2 rounded-md bg-white p-3 shadow`,
  email: `truncate text-sm text-gray-800`,
};

// Not linked from the main nav - reached only via the Members link on a
// specific class's card on /class, so "back" goes to /class (where you
// came from) rather than the usual "Back to Tasks" home link.
export default async function ClassMembersPage({ searchParams }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className={style.bg}>
        <div className={style.container}>
          <h1 className={style.heading}>Members</h1>
          <p className="text-center p-2">Bitte melde dich an.</p>
          <Link href="/" className={style.back}>Back to Tasks</Link>
        </div>
      </div>
    );
  }

  const { class: classId } = await searchParams;

  const { data: classInfo } = await supabase
    .from('classes')
    .select('id, name')
    .eq('id', classId ?? '')
    .eq('teacher_id', user.id)
    .single();

  if (!classInfo) {
    return (
      <div className={style.bg}>
        <div className={style.container}>
          <h1 className={style.heading}>Members</h1>
          <p className={style.empty}>Klasse nicht gefunden.</p>
          <Link href="/class" className={style.back}>Back to My Class</Link>
        </div>
      </div>
    );
  }

  const { data: members } = await supabase.rpc('get_class_members', { p_class_id: classId });

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h1 className={style.heading}>{classInfo.name}</h1>
        {!members || members.length === 0 ? (
          <p className={style.empty}>Noch keine Mitglieder in dieser Klasse.</p>
        ) : (
          members.map((member) => (
            <div key={member.id} className={style.row}>
              <span className={style.email}>{member.email}</span>
              <RemoveMemberButton studentId={member.id} />
            </div>
          ))
        )}
        <Link href="/class" className={style.back}>Back to My Class</Link>
      </div>
    </div>
  );
}
