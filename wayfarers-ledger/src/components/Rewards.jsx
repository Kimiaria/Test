import { HOUSES, QUESTS } from '../data/quests';
import styles from './Rewards.module.css';

const LEVELS = [
  { min: 0,  title: 'Wanderer' },
  { min: 3,  title: 'Companion' },
  { min: 6,  title: 'Pathkeeper' },
  { min: 9,  title: 'Devoted' },
  { min: 12, title: 'Bound by Vow' },
  { min: 15, title: 'Keepers of the Long Road' },
];

function getLevel(xp) {
  let level = LEVELS[0];
  for (const l of LEVELS) {
    if (xp >= l.min) level = l;
  }
  return level;
}

export default function Rewards({ xp, completed }) {
  const level = getLevel(xp);
  const nextLevel = LEVELS[LEVELS.indexOf(level) + 1];
  const toNext = nextLevel ? nextLevel.min - xp : 0;

  const houseCounts = Object.fromEntries(
    Object.keys(HOUSES).map(h => [
      h,
      completed.filter(c => QUESTS.find(q => q.id === c.id)?.house === h).length,
    ])
  );

  return (
    <div className={styles.wrap}>
      <div className={styles.levelCard}>
        <p className={styles.levelLabel + ' small-caps'}>Current Title</p>
        <h2 className={styles.levelTitle}>{level.title}</h2>
        <p className={styles.xpLine}>
          {xp} {xp === 1 ? 'quest' : 'quests'} sealed
          {nextLevel && <> · {toNext} until <em>{nextLevel.title}</em></>}
        </p>
        <div className={styles.xpBar}>
          <div
            className={styles.xpFill}
            style={{
              width: nextLevel
                ? `${Math.min(100, ((xp - level.min) / (nextLevel.min - level.min)) * 100)}%`
                : '100%',
            }}
          />
        </div>
      </div>

      <p className={styles.sealsLabel + ' small-caps'}>Seals Earned</p>
      <div className={styles.sealsGrid}>
        {Object.entries(HOUSES).map(([key, house]) => {
          const count = houseCounts[key] || 0;
          return (
            <div
              key={key}
              className={styles.sealItem + (count === 0 ? ' ' + styles.unearned : '')}
              style={{ '--house-accent': house.accent }}
            >
              <img src={house.seal} alt={house.label} className={styles.seal} />
              <p className={styles.sealName + ' small-caps'}>{house.label}</p>
              <p className={styles.sealCount}>{count}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
