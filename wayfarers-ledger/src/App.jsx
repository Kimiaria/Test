import { useState } from 'react';
import { useLedger } from './hooks/useLedger';
import Card from './components/Card';
import QuestDetail from './components/QuestDetail';
import Ledger from './components/Ledger';
import Rewards from './components/Rewards';
import Nav from './components/Nav';
import SyncDrawer from './components/SyncDrawer';
import './App.css';

export default function App() {
  const { completed, xp, activeQuest, hasDrawnThisWeek, draw, completeQuest } = useLedger();
  const [tab, setTab] = useState('draw');
  const [inQuestView, setInQuestView] = useState(false);
  const [showSync, setShowSync] = useState(false);

  function handleDraw() {
    if (!hasDrawnThisWeek) draw();
  }

  function handleTabChange(next) {
    setTab(next);
    setInQuestView(false);
  }

  function handleComplete(questId, photo) {
    completeQuest(questId, photo);
    setInQuestView(false);
    setTab('ledger');
  }

  return (
    <>
      <div className="app-shell">
        <header className="app-header">
          <h1 className="app-title">The Wayfarers' Ledger</h1>
          <button className="sync-btn" onClick={() => setShowSync(true)} aria-label="Sync data">
            ⇄
          </button>
        </header>

        <main className="app-main">
          {tab === 'draw' && !inQuestView && !hasDrawnThisWeek && (
            <div className="draw-prompt">
              <p className="draw-prompt-text">A new week. A new quest awaits.</p>
              <button className="draw-btn" onClick={handleDraw}>
                Draw this week's card
              </button>
            </div>
          )}

          {tab === 'draw' && !inQuestView && activeQuest && (
            <Card quest={activeQuest} onEnterQuest={() => setInQuestView(true)} />
          )}

          {tab === 'draw' && inQuestView && activeQuest && (
            <QuestDetail quest={activeQuest} onComplete={handleComplete} />
          )}

          {tab === 'ledger' && <Ledger completed={completed} />}
          {tab === 'rewards' && <Rewards xp={xp} completed={completed} />}
        </main>

        <Nav active={tab} onChange={handleTabChange} />
      </div>

      {showSync && (
        <SyncDrawer
          onClose={() => setShowSync(false)}
          onImport={() => window.location.reload()}
        />
      )}
    </>
  );
}
