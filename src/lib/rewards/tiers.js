// Tier thresholds are lifetime cumulative counts at which each tier is
// reached. Ordered highest-first: accumulator.js's tierFor() picks the
// first (i.e. highest) threshold a count has crossed as the current tier
// to bump; app/badges/page.js uses the same ordering to find the highest
// tier reached so far when deciding which single icon to display.
export const A_TIERS = [
  ['a9', 1000], ['a8', 500], ['a7', 200], ['a6', 100],
  ['a5', 50], ['a4', 20], ['a3', 10], ['a2', 5], ['a1', 1],
];
export const B_HELP_TIERS = [['b2', 50], ['b1', 1]];
export const B_SOLUTION_TIERS = [['b6', 200], ['b5', 100], ['b4', 1]];
