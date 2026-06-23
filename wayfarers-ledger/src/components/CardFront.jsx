import { HOUSES } from '../data/quests';
import styles from './Card.module.css';

export default function CardFront({ quest }) {
  const house = HOUSES[quest.house];

  return (
    <div
      className={styles.face + ' ' + styles.front}
      style={{ '--house-accent': house.accent }}
    >
      <div className={styles.frontInner}>
        <p className={styles.houseName + ' small-caps'}>{house.label}</p>

        <div className={styles.sealWrap}>
          <img
            src={house.seal}
            alt={`${house.label} wax seal`}
            className={styles.seal}
          />
        </div>

        <div className={styles.dividerRow}>
          <span className={styles.rule} />
          <span className={styles.diamond}>◆</span>
          <span className={styles.rule} />
        </div>

        <h2 className={styles.questTitle}>{quest.title}</h2>
      </div>
    </div>
  );
}
