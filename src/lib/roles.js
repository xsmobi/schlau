// Roles that get the teacher view (own classes, create class, class
// leaderboard). Mirrors the database: create_class() and the classes INSERT
// policy both allow role in ('teacher', 'admin').
export function hasTeacherView(role) {
  return role === 'teacher' || role === 'admin';
}
