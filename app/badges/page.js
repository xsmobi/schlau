import Link from 'next/link';
import { createClient } from '../../src/lib/supabase/server';

const A_TIERS = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9'];
const B_TIERS = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'];

const style = {
  bg: `min-h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  section: `mt-6`,
  sectionTitle: `text-xl font-bold text-gray-800 mb-2`,
  grid: `grid grid-cols-4 gap-3`,
  tile: `flex flex-col items-center text-center`,
  icon: `w-16 h-16 rounded-md shadow`,
  count: `text-xs text-gray-600 mt-1`,
  empty: `text-sm text-gray-600`,
  back: `inline-block mt-6 text-sm text-blue-700 underline`,
};

function Section({ title, entries }) {
  return (
    <div className={style.section}>
      <h2 className={style.sectionTitle}>{title}</h2>
      {entries.length === 0 ? (
        <p className={style.empty}>Noch keine Abzeichen in dieser Kategorie.</p>
      ) : (
        <div className={style.grid}>
          {entries.map(([code, count]) => (
            <div key={code} className={style.tile}>
              <img src={`/icons/${code}.png`} alt={code} title={code} className={style.icon} />
              <span className={style.count}>{count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default async function BadgesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className={style.bg}>
        <div className={style.container}>
          <h1 className={style.heading}>Abzeichen</h1>
          <p className="text-center p-2">Bitte melde dich an, um deine Abzeichen zu sehen.</p>
          <Link href="/" className={style.back}>Zurück zu schlau.app</Link>
        </div>
      </div>
    );
  }

  const { data, error } = await supabase
    .from('daily_progress')
    .select('category, count')
    .eq('user_id', user.id);

  const totals = {};
  if (!error) {
    for (const row of data) {
      totals[row.category] = (totals[row.category] || 0) + row.count;
    }
  }

  const activity = A_TIERS.filter((code) => totals[code] > 0).map((code) => [code, totals[code]]);
  const bonus = B_TIERS.filter((code) => totals[code] > 0).map((code) => [code, totals[code]]);
  const topics = Object.keys(totals)
    .filter((code) => !A_TIERS.includes(code) && !B_TIERS.includes(code) && totals[code] > 0)
    .sort()
    .map((code) => [code, totals[code]]);

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h1 className={style.heading}>Deine Abzeichen</h1>
        <Section title="Aktivität" entries={activity} />
        <Section title="Themen" entries={topics} />
        <Section title="Bonus" entries={bonus} />
        <Link href="/" className={style.back}>Zurück zu schlau.app</Link>
      </div>
    </div>
  );
}
