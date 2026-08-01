import { createClient } from '../supabase/client';

// Sender side of the per-class leaderboard broadcast. Channel/topic
// convention: 'leaderboard:{class_id}' - see supabase/migrations/
// 0006_leaderboard_broadcast.sql for the RLS policies that scope who can
// send/receive on a given class's channel. Payloads are content-free (no
// student data): this only tells subscribed clients "something changed,
// refetch the leaderboard aggregate yourself."
//
// The receive/subscribe side belongs to the leaderboard page itself (not
// yet built), not here.

let supabase = null;
let channel = null;
let channelClassId = null;

function ensureChannel(classId) {
  if (!supabase) supabase = createClient();
  if (channel && channelClassId !== classId) {
    supabase.removeChannel(channel);
    channel = null;
  }
  if (!channel) {
    channel = supabase.channel(`leaderboard:${classId}`, { config: { private: true } });
    channelClassId = classId;
  }
  return channel;
}

export function signalActivity(classId) {
  if (!classId) return;
  const ch = ensureChannel(classId);
  ch.httpSend('activity', {}).catch((error) => {
    console.error('rewards: leaderboard broadcast failed', error);
  });
}

export function resetChannel() {
  if (channel && supabase) {
    supabase.removeChannel(channel);
  }
  channel = null;
  channelClassId = null;
}
