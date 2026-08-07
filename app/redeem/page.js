import Link from 'next/link';
import { createClient } from '../../src/lib/supabase/server';
import RedeemTeacherCodeForm from '../../src/components/RedeemTeacherCodeForm';

const style = {
  bg: `min-h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  back: `inline-block mt-6 text-sm text-blue-700 underline`,
};

// Not linked from the main nav - shared directly with colleagues being
// onboarded as teachers, so it needs its own "back to tasks" link rather
// than relying on the nav bar's context-aware NavLink (which only knows
// about pages it links to).
export default async function RedeemTeacherCodePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className={style.bg}>
        <div className={style.container}>
          <h1 className={style.heading}>Teacher Code</h1>
          <p className="text-center p-2">Bitte melde dich an, um einen Lehrer-Code einzulösen.</p>
          <Link href="/" className={style.back}>Back to Tasks</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h1 className={style.heading}>Teacher Code</h1>
        <RedeemTeacherCodeForm />
        <Link href="/" className={style.back}>Back to Tasks</Link>
      </div>
    </div>
  );
}
