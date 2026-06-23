import styles from './Nav.module.css';

const TABS = [
  { id: 'draw',    label: 'Quest' },
  { id: 'ledger',  label: 'Ledger' },
  { id: 'rewards', label: 'Titles' },
];

export default function Nav({ active, onChange }) {
  return (
    <nav className={styles.nav}>
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={styles.tab + (active === tab.id ? ' ' + styles.active : '')}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
