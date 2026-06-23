import { useState } from 'react';
import CardBack from './CardBack';
import CardFront from './CardFront';
import styles from './Card.module.css';

export default function Card({ quest, onEnterQuest }) {
  const [flipped, setFlipped] = useState(false);

  function handleTap() {
    if (!flipped) {
      setFlipped(true);
    } else {
      onEnterQuest();
    }
  }

  return (
    <div className={styles.drawScreen}>
      <p className={styles.drawHint}>
        {flipped ? 'your quest awaits' : 'this week\'s quest'}
      </p>

      <div className={styles.scene} onClick={handleTap} role="button" tabIndex={0}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleTap()}
        aria-label={flipped ? `Enter quest: ${quest.title}` : 'Tap to reveal your quest'}
      >
        <div className={styles.inner + (flipped ? ' ' + styles.flipped : '')}>
          <CardBack />
          <CardFront quest={quest} />
        </div>
      </div>

      <p className={styles.tapPrompt}>
        {flipped ? 'tap again to begin' : 'tap to draw'}
      </p>
    </div>
  );
}
