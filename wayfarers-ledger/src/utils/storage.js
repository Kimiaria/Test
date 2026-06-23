const NS = 'wl_';

export const store = {
  get: (key, fallback = null) => {
    try {
      const raw = localStorage.getItem(NS + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch { return fallback; }
  },
  set: (key, value) => {
    try { localStorage.setItem(NS + key, JSON.stringify(value)); } catch {}
  },
  remove: (key) => localStorage.removeItem(NS + key),
};

export function exportState() {
  const state = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k.startsWith(NS)) state[k] = localStorage.getItem(k);
  }
  return JSON.stringify(state);
}

export function importState(json) {
  const state = JSON.parse(json);
  Object.entries(state).forEach(([k, v]) => {
    if (k.startsWith(NS)) localStorage.setItem(k, v);
  });
}
