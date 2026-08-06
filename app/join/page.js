import Link from 'next/link';
import { createClient } from '../../src/lib/supabase/server';
import JoinClassForm from '../../src/components/JoinClassForm';

const style = {
  bg: `min-h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  back: `inline-block mt-6 text-sm text-blue-700 underline`,
};

export default async function JoinPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className={style.bg}>
        <div className={style.container}>
          <h1 className={style.heading}>Klasse beitreten</h1>
          <p className="text-center p-2">Bitte melde dich an, um einer Klasse beizutreten.</p>
          <Link href="/" className={style.back}>Zurück zu schlau.app</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h1 className={style.heading}>Klasse beitreten</h1>
        <JoinClassForm />
      </div>
    </div>
  );
}
