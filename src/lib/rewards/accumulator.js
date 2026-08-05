import { createClient } from '../supabase/client';
import { signalActivity, resetChannel } from './leaderboardChannel';
import { A_TIERS, B_HELP_TIERS, B_SOLUTION_TIERS } from './tiers';

const ALL_TIER_CODES = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6'];

const FLUSH_INTERVAL_MS = 20000;
const FLUSH_ACTION_THRESHOLD = 10;

function tierFor(count, tiers) {
  for (const [code, threshold] of tiers) {
    if (count >= threshold) return code;
  }
  return null;
}

function todayLocalDate() {
  // Local calendar date, not UTC, so day boundaries match the user's clock.
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

let supabase = null;
let userId = null;
let classId = null;
let lifetime = { units: 0, help: 0, explainer: 0, solution: 0 };
let pending = {}; // { [date]: { [category]: amount } }
let actionsSinceFlush = 0;
let initialized = false;

async function fetchClassId() {
  const { data, error } = await supabase
    .from('profiles')
    .select('class_id')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('rewards: failed to fetch class_id', error);
    return;
  }
  classId = data?.class_id ?? null;
}

async function seedFromServer() {
  const { data, error } = await supabase
    .from('daily_progress')
    .select('category, count')
    .eq('user_id', userId)
    .in('category', ALL_TIER_CODES);

  if (error) {
    console.error('rewards: failed to seed lifetime totals', error);
    return;
  }

  const totals = {};
  for (const row of data) {
    totals[row.category] = (totals[row.category] || 0) + row.count;
  }
  lifetime = {
    units: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9']
      .reduce((sum, code) => sum + (totals[code] || 0), 0),
    help: (totals.b1 || 0) + (totals.b2 || 0),
    explainer: totals.b3 || 0,
    solution: (totals.b4 || 0) + (totals.b5 || 0) + (totals.b6 || 0),
  };
}

function resetForUser(nextUserId) {
  userId = nextUserId;
  classId = null;
  lifetime = { units: 0, help: 0, explainer: 0, solution: 0 };
  pending = {};
  actionsSinceFlush = 0;
  resetChannel();
  if (userId) {
    seedFromServer();
    fetchClassId();
  }
}

function bump(category) {
  const date = todayLocalDate();
  if (!pending[date]) pending[date] = {};
  pending[date][category] = (pending[date][category] || 0) + 1;
  actionsSinceFlush += 1;
  if (actionsSinceFlush >= FLUSH_ACTION_THRESHOLD) flush();
}

export function flush() {
  if (!userId) return;
  const dates = Object.keys(pending);
  if (dates.length === 0) return;

  const batch = pending;
  pending = {};
  actionsSinceFlush = 0;

  const results = dates.map((date) => {
    const deltas = batch[date];
    return supabase.rpc('increment_daily_progress', { p_date: date, p_deltas: deltas })
      .then(({ error }) => {
        if (error) {
          console.error('rewards: flush failed, will retry next flush', error);
          if (!pending[date]) pending[date] = {};
          for (const [category, amount] of Object.entries(deltas)) {
            pending[date][category] = (pending[date][category] || 0) + amount;
          }
          return false;
        }
        return true;
      });
  });

  Promise.all(results).then((succeeded) => {
    if (succeeded.some(Boolean)) signalActivity(classId);
  });
}

export function init() {
  if (initialized) return;
  initialized = true;
  supabase = createClient();

  supabase.auth.onAuthStateChange((_event, session) => {
    const nextUserId = session?.user?.id ?? null;
    if (nextUserId !== userId) {
      flush();
      resetForUser(nextUserId);
    }
  });

  supabase.auth.getUser().then(({ data }) => {
    const nextUserId = data?.user?.id ?? null;
    if (nextUserId !== userId) resetForUser(nextUserId);
  });

  setInterval(flush, FLUSH_INTERVAL_MS);

  if (typeof window !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flush();
    });
    window.addEventListener('pagehide', flush);
  }
}

export function recordPlusClick(topicCode) {
  if (!userId) return;
  lifetime.units += 1;
  const tier = tierFor(lifetime.units, A_TIERS);
  if (tier) bump(tier);
  bump(topicCode);
}

export function recordHelp() {
  if (!userId) return;
  lifetime.help += 1;
  const tier = tierFor(lifetime.help, B_HELP_TIERS);
  if (tier) bump(tier);
}

export function recordExplainer() {
  if (!userId) return;
  lifetime.explainer += 1;
  bump('b3');
}

export function recordSolution() {
  if (!userId) return;
  lifetime.solution += 1;
  const tier = tierFor(lifetime.solution, B_SOLUTION_TIERS);
  if (tier) bump(tier);
}
