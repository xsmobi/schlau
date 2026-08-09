import Link from 'next/link';
import { createClient } from '../../src/lib/supabase/server';
import { A_TIERS, B_HELP_TIERS, B_SOLUTION_TIERS } from '../../src/lib/rewards/tiers';

const ALL_TIER_CODES = [...A_TIERS, ...B_HELP_TIERS, ...B_SOLUTION_TIERS].map(([code]) => code).concat('b3');

// Each bump() call in accumulator.js writes to whichever tier is current
// at that moment, so lower tiers a user has since passed freeze with
// whatever count they'd reached (e.g. b4 stuck at 99) while the current
// tier keeps growing (b5 at 11) - totals per individual code are not the
// lifetime count. Highest-first order means the first code with a nonzero
// total is the highest tier reached; summing the whole group recovers the
// true lifetime count (99 + 11 = 110).
function highestTierEntry(totals, tierGroup) {
  const total = tierGroup.reduce((sum, [code]) => sum + (totals[code] || 0), 0);
  if (total === 0) return null;
  const [code] = tierGroup.find(([c]) => (totals[c] || 0) > 0);
  return [code, total];
}

const style = {
  bg: `min-h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  section: `mt-6`,
  // Centered - left-alignment read oddly for a heading sitting directly
  // above a centered icon grid. Themen picks this up too via Section
  // below, for visual consistency with the quality-of-work pair above it.
  sectionTitle: `text-xl font-bold text-gray-800 mb-2 text-center`,
  grid: `grid grid-cols-4 gap-3`,
  tile: `flex flex-col items-center text-center`,
  icon: `w-16 h-16 rounded-md shadow`,
  count: `text-xs text-gray-600 mt-1`,
  empty: `text-sm text-gray-600`,
  back: `inline-block mt-6 text-sm text-blue-700 underline`,
  // Aktivität + Bonus are two performance criteria that together read as
  // one "quality of work" pair, but each needs to read as its own
  // distinct group - two separate bordered boxes side by side (not one
  // shared card) sitting directly on the page background, same as
  // Themen below does. Reuses sectionTitle for the labels so they match
  // Themen's heading size exactly.
  qualityBox: `rounded-2xl border border-gray-300 bg-white p-3`,
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

// Aktivität (max 1 icon) and Bonus (max 3 icons) each get their own
// bordered box with a centered label, side by side in a 4-col outer grid
// (Aktivität takes 1 column's width, Bonus takes the other 3) so the pair
// reads as two distinct groups rather than one merged section.
function QualityOfWorkSection({ activity, bonus }) {
  return (
    <div className="mt-6 grid grid-cols-4 gap-3">
      <div className={style.qualityBox}>
        <h2 className={style.sectionTitle}>Aktivität</h2>
        {activity.length === 0 ? (
          <p className={style.empty}>Noch keine Abzeichen in dieser Kategorie.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {activity.map(([code, count]) => (
              <div key={code} className={style.tile}>
                <img src={`/icons/${code}.png`} alt={code} title={code} className={style.icon} />
                <span className={style.count}>{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={`${style.qualityBox} col-span-3`}>
        <h2 className={style.sectionTitle}>Bonus</h2>
        {bonus.length === 0 ? (
          <p className={style.empty}>Noch keine Abzeichen in dieser Kategorie.</p>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {bonus.map(([code, count]) => (
              <div key={code} className={style.tile}>
                <img src={`/icons/${code}.png`} alt={code} title={code} className={style.icon} />
                <span className={style.count}>{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
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
          <h1 className={style.heading}>Badges</h1>
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

  const activityEntry = highestTierEntry(totals, A_TIERS);
  const activity = activityEntry ? [activityEntry] : [];

  const helpEntry = highestTierEntry(totals, B_HELP_TIERS);
  const explainerCount = totals.b3 || 0;
  const explainerEntry = explainerCount > 0 ? ['b3', explainerCount] : null;
  const solutionEntry = highestTierEntry(totals, B_SOLUTION_TIERS);
  const bonus = [helpEntry, explainerEntry, solutionEntry].filter(Boolean);

  const topics = Object.keys(totals)
    .filter((code) => !ALL_TIER_CODES.includes(code) && totals[code] > 0)
    .sort()
    .map((code) => [code, totals[code]]);

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h1 className={style.heading}>My Badges</h1>
        <QualityOfWorkSection activity={activity} bonus={bonus} />
        <Section title="Themen" entries={topics} />
      </div>
    </div>
  );
}
