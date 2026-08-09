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

const BONUS_COL_START = ['col-start-2', 'col-start-3', 'col-start-4'];

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
  // one "quality of work" unit - grouped in a shared card, distinct from
  // Themen below (which can grow to ~40 icons and stays a plain,
  // uncarded section). Same 4-col grid as Themen's, split into a 1-icon
  // Aktivität column and a 3-icon Bonus column.
  qualityCard: `mt-6 rounded-md bg-white p-4 shadow`,
  qualityGrid: `grid grid-cols-4 gap-3`,
  // Smaller than sectionTitle: these sit above a single narrow column
  // (Aktivität) or a 3-icon-wide one (Bonus), not the full row width, so
  // sectionTitle's larger text-xl weight would wrap or overflow its column.
  qualityLabel: `col-start-1 row-start-1 mb-2 text-center text-sm font-semibold text-gray-700`,
  qualityLabelBonus: `col-start-2 col-span-3 row-start-1 mb-2 text-center text-sm font-semibold text-gray-700`,
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

// Aktivität (max 1 icon) and Bonus (max 3 icons) render as two centered
// labels over their own icon columns within one shared grid, instead of
// Section's single full-width heading - explicit col-start placement
// (rather than relying on grid auto-flow) keeps each icon under its
// label regardless of which specific badges are/aren't earned yet.
function QualityOfWorkSection({ activity, bonus }) {
  if (activity.length === 0 && bonus.length === 0) {
    return (
      <div className={style.qualityCard}>
        <p className={style.empty}>Noch keine Abzeichen in dieser Kategorie.</p>
      </div>
    );
  }

  return (
    <div className={style.qualityCard}>
      <div className={style.qualityGrid}>
        <h2 className={style.qualityLabel}>Aktivität</h2>
        <h2 className={style.qualityLabelBonus}>Bonus</h2>
        {activity.map(([code, count]) => (
          <div key={code} className={`${style.tile} col-start-1 row-start-2`}>
            <img src={`/icons/${code}.png`} alt={code} title={code} className={style.icon} />
            <span className={style.count}>{count}</span>
          </div>
        ))}
        {bonus.map(([code, count], i) => (
          <div key={code} className={`${style.tile} ${BONUS_COL_START[i]} row-start-2`}>
            <img src={`/icons/${code}.png`} alt={code} title={code} className={style.icon} />
            <span className={style.count}>{count}</span>
          </div>
        ))}
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
