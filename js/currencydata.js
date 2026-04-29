/* ═══════════════════════════════════════════
   currencydata.js — Currency metadata, rates & utilities
═══════════════════════════════════════════ */
const CURRENCY_META = {
  USD: { flag: '🇺🇸', symbol: '$' },
  EUR: { flag: '🇪🇺', symbol: '€' },
  MAD: { flag: '🇲🇦', symbol: 'د.م.' },
  GBP: { flag: '🇬🇧', symbol: '£' },
  JPY: { flag: '🇯🇵', symbol: '¥' },
  CHF: { flag: '🇨🇭', symbol: 'Fr' },
  CNY: { flag: '🇨🇳', symbol: '¥' },
  CAD: { flag: '🇨🇦', symbol: 'CA$' },
  AUD: { flag: '🇦🇺', symbol: 'A$' },
  INR: { flag: '🇮🇳', symbol: '₹' },
  BRL: { flag: '🇧🇷', symbol: 'R$' },
  MXN: { flag: '🇲🇽', symbol: '$' },
  SGD: { flag: '🇸🇬', symbol: 'S$' },
  HKD: { flag: '🇭🇰', symbol: 'HK$' },
  NOK: { flag: '🇳🇴', symbol: 'kr' },
  SEK: { flag: '🇸🇪', symbol: 'kr' },
  TRY: { flag: '🇹🇷', symbol: '₺' },
  ZAR: { flag: '🇿🇦', symbol: 'R' },
  KWD: { flag: '🇰🇼', symbol: 'KD' },
  AED: { flag: '🇦🇪', symbol: 'د.إ' }
};

const BASE_RATES = {
  USD: 1, EUR: .921, MAD: 10.05, GBP: .789, JPY: 154.8, CHF: .909, CNY: 7.24,
  CAD: 1.362, AUD: 1.527, INR: 83.4, BRL: 5.06, MXN: 17.15, SGD: 1.342,
  HKD: 7.82, NOK: 10.55, SEK: 10.41, TRY: 32.1, ZAR: 18.65, KWD: .308, AED: 3.673
};

let liveRates = { ...BASE_RATES };
let changeData = {};

function simulateChanges() {
  const c = {};
  Object.keys(BASE_RATES).forEach(k => c[k] = (Math.random() * 4 - 2));
  c.USD = 0;
  return c;
}
changeData = simulateChanges();

async function fetchRates() {
  try {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    Object.keys(CURRENCY_META).forEach(c => {
      if (data.rates[c]) liveRates[c] = data.rates[c];
    });
    changeData = simulateChanges();
    return true;
  } catch (e) {
    Object.keys(liveRates).forEach(c => {
      if (c === 'USD') return;
      liveRates[c] = +(liveRates[c] * (1 + (Math.random() - .5) * .002)).toFixed(6);
    });
    changeData = simulateChanges();
    return false;
  }
}

function convert(amount, from, to) {
  if (from === to) return amount;
  const inUSD = amount / (liveRates[from] || 1);
  return inUSD * (liveRates[to] || 1);
}

function buildTicker(itemClass = 'ticker-item', codeClass = 'code', upClass = 'up', dnClass = 'dn') {
  const codes = Object.keys(CURRENCY_META).filter(c => c !== 'USD');
  const html = codes.map(c => {
    const r = liveRates[c] || 1;
    const ch = changeData[c] || 0;
    const cls = ch > 0 ? upClass : ch < 0 ? dnClass : '';
    return `<span class="${itemClass}"><span class="${codeClass}">${CURRENCY_META[c].flag} ${c}/USD</span><span>${r.toFixed(4)}</span><span class="${cls}">${ch > 0 ? '+' : ''}${ch.toFixed(2)}%</span></span>`;
  }).join('');
  const track = document.getElementById('ticker-track');
  if (track) track.innerHTML = html + html;
}

/* Backward-compat alias used by converter page */
const CURRENCIES = Object.keys(CURRENCY_META).map(code => ({
  code,
  flag: CURRENCY_META[code].flag,
  symbol: CURRENCY_META[code].symbol
}));
