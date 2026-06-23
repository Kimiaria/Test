import { HOUSES, QUESTS } from '../data/quests';
import styles from './Ledger.module.css';

function formatDate(ts) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(ts));
}

export default function Ledger({ completed }) {
  if (completed.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No quests yet sealed in the ledger.</p>
        <p>Draw your first card to begin.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <h2 className={styles.heading + ' small-caps'}>The Ledger</h2>
      <ul className={styles.list}>
        {[...completed].reverse().map(entry => {
          const quest = QUESTS.find(q => q.id === entry.id);
          if (!quest) return null;
          const house = HOUSES[quest.house];
          return (
            <li key={entry.completedAt} className={styles.entry} style={{ '--house-accent': house.accent }}>
              <div className={styles.entryHeader}>
                <img src={house.seal} alt="" className={styles.seal} />
                <div>
                  <p className={styles.entryHouse + ' small-caps'}>{house.label}</p>
                  <p className={styles.entryTitle}>{quest.title}</p>
                  <p className={styles.entryDate}>{formatDate(entry.completedAt)}</p>
                </div>
              </div>
              {entry.photo && (
                <img src={entry.photo} alt="Quest proof" className={styles.proof} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
