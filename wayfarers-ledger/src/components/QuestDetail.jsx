import { useState, useRef } from 'react';
import { HOUSES } from '../data/quests';
import styles from './QuestDetail.module.css';

export default function QuestDetail({ quest, onComplete }) {
  const [photo, setPhoto] = useState(null);
  const [completing, setCompleting] = useState(false);
  const inputRef = useRef(null);
  const house = HOUSES[quest.house];

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  }

  function handleComplete() {
    setCompleting(true);
    setTimeout(() => onComplete(quest.id, photo), 600);
  }

  return (
    <div className={styles.wrap} style={{ '--house-accent': house.accent }}>
      <header className={styles.header}>
        <img src={house.seal} alt="" className={styles.sealSmall} />
        <p className={styles.houseName + ' small-caps'}>{house.label}</p>
      </header>

      <h1 className={styles.title}>{quest.title}</h1>

      <div className={styles.dividerRow}>
        <span className={styles.rule} />
        <span className={styles.diamond}>◆</span>
        <span className={styles.rule} />
      </div>

      <p className={styles.body}>{quest.body}</p>

      <section className={styles.proof}>
        <p className={styles.proofLabel + ' small-caps'}>Proof of the Quest</p>
        <p className={styles.proofHint}>
          A photograph, private to the two of you. Stored only on this device.
        </p>

        {photo ? (
          <div className={styles.photoWrap}>
            <img src={photo} alt="Quest proof" className={styles.photo} />
            <button className={styles.clearBtn} onClick={() => setPhoto(null)}>
              remove
            </button>
          </div>
        ) : (
          <button className={styles.uploadBtn} onClick={() => inputRef.current?.click()}>
            Add photograph
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="sr-only"
        />
      </section>

      <button
        className={styles.completeBtn + (completing ? ' ' + styles.completing : '')}
        onClick={handleComplete}
        disabled={completing}
      >
        {completing ? 'sealing the ledger…' : 'Mark Quest Complete'}
      </button>
    </div>
  );
}
