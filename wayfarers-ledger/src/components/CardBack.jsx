import styles from './Card.module.css';

export default function CardBack() {
  return (
    <div className={styles.face + ' ' + styles.back}>
      {/* Outer border */}
      <div className={styles.backOuter}>
        {/* Inner border */}
        <div className={styles.backInner}>
          {/* Diamond lattice field */}
          <div className={styles.lattice}>
            {/* Central medallion */}
            <div className={styles.medallion}>
              <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                {/* Moon arc */}
                <path
                  d="M40 60 A22 22 0 0 0 80 60 A28 28 0 0 1 40 60Z"
                  fill="var(--bronze)" opacity="0.7"
                />
                {/* Sun rays */}
                {Array.from({ length: 12 }, (_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x1 = 60 + Math.cos(angle) * 34;
                  const y1 = 60 + Math.sin(angle) * 34;
                  const x2 = 60 + Math.cos(angle) * 44;
                  const y2 = 60 + Math.sin(angle) * 44;
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--bronze)" strokeWidth="1.5" opacity="0.8" />;
                })}
                {/* Central circle */}
                <circle cx="60" cy="60" r="18" stroke="var(--bronze)" strokeWidth="1.2" fill="none" opacity="0.9" />
                <circle cx="60" cy="60" r="6" fill="var(--bronze)" opacity="0.6" />
                {/* Outer ring */}
                <circle cx="60" cy="60" r="46" stroke="var(--bronze)" strokeWidth="0.8" fill="none" opacity="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.backFooter}>the unseen</p>
    </div>
  );
}
