import { useState } from 'react';
import { exportState, importState } from '../utils/storage';
import styles from './SyncDrawer.module.css';

export default function SyncDrawer({ onClose, onImport }) {
  const [tab, setTab] = useState('export');
  const [importText, setImportText] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const exported = exportState();

  function handleCopy() {
    navigator.clipboard.writeText(exported).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleImport() {
    try {
      importState(importText.trim());
      onImport();
      onClose();
    } catch {
      setError('Could not read that sync code. Copy it again from the other device.');
    }
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.drawer}>
        <div className={styles.header}>
          <p className={styles.title + ' small-caps'}>Sync Between Devices</p>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>
        <p className={styles.hint}>
          Copy your ledger data to the other device. Importing overwrites the device's current state.
        </p>

        <div className={styles.tabs}>
          <button className={styles.tabBtn + (tab === 'export' ? ' ' + styles.tabActive : '')} onClick={() => setTab('export')}>Export</button>
          <button className={styles.tabBtn + (tab === 'import' ? ' ' + styles.tabActive : '')} onClick={() => setTab('import')}>Import</button>
        </div>

        {tab === 'export' && (
          <>
            <textarea className={styles.code} readOnly value={exported} rows={6} />
            <button className={styles.action} onClick={handleCopy}>
              {copied ? 'Copied.' : 'Copy to clipboard'}
            </button>
          </>
        )}

        {tab === 'import' && (
          <>
            <textarea
              className={styles.code}
              value={importText}
              onChange={e => { setImportText(e.target.value); setError(''); }}
              placeholder="Paste sync data from the other device…"
              rows={6}
            />
            {error && <p className={styles.error}>{error}</p>}
            <button className={styles.action} onClick={handleImport} disabled={!importText.trim()}>
              Import &amp; Overwrite
            </button>
          </>
        )}
      </div>
    </div>
  );
}
