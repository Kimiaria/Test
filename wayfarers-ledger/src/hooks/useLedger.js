import { useState, useCallback } from 'react';
import { store } from '../utils/storage';
import { isoWeekKey } from '../utils/week';
import { QUESTS } from '../data/quests';

function pickQuestForWeek(week, completedIds) {
  const remaining = QUESTS.filter(q => !completedIds.includes(q.id));
  const pool = remaining.length > 0 ? remaining : QUESTS;
  // Deterministic but varied: hash the week string into an index
  let hash = 0;
  for (let i = 0; i < week.length; i++) hash = (hash * 31 + week.charCodeAt(i)) >>> 0;
  return pool[hash % pool.length];
}

export function useLedger() {
  const [completed, setCompleted]   = useState(() => store.get('completed', []));
  const [xp, setXp]                 = useState(() => store.get('xp', 0));
  const [drawnWeek, setDrawnWeek]   = useState(() => store.get('drawn_week', null));
  const [drawnId, setDrawnId]       = useState(() => store.get('drawn_id', null));

  const currentWeek = isoWeekKey();
  const activeQuest = drawnId ? QUESTS.find(q => q.id === drawnId) ?? null : null;

  function draw() {
    const week = isoWeekKey();
    const quest = pickQuestForWeek(week, completed.map(c => c.id));
    store.set('drawn_week', week);
    store.set('drawn_id', quest.id);
    setDrawnWeek(week);
    setDrawnId(quest.id);
    return quest;
  }

  const completeQuest = useCallback((questId, photoDataUrl) => {
    const entry = { id: questId, week: isoWeekKey(), photo: photoDataUrl || null, completedAt: Date.now() };
    const next = [...completed, entry];
    const nextXp = xp + 1;
    store.set('completed', next);
    store.set('xp', nextXp);
    store.set('drawn_week', null);
    store.set('drawn_id', null);
    setCompleted(next);
    setXp(nextXp);
    setDrawnWeek(null);
    setDrawnId(null);
  }, [completed, xp]);

  const hasDrawnThisWeek = drawnWeek === currentWeek;

  return { completed, xp, activeQuest, hasDrawnThisWeek, draw, completeQuest };
}
