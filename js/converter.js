/* ═══════════════════════════════════════════
   converter.js — Currency converter page
═══════════════════════════════════════════ */
let converterChart = null;

function populateSelects() {
  const fromSel = document.getElementById('convert-from');
  const toSel   = document.getElementById('convert-to');
  if (!fromSel || !toSel) return;
  const codes = Object.keys(CURRENCY_META);
  fromSel.innerHTML = codes.map(c => `<option value="${c}" ${c === 'USD' ? 'selected' : ''}>${CURRENCY_META[c].flag} ${c}</option>`).join('');
  toSel.innerHTML   = codes.map(c => `<option value="${c}" ${c === 'MAD' ? 'selected' : ''}>${CURRENCY_META[c].flag} ${c}</option>`).join('');
}

function doConvert() {
  const from   = document.getElementById('convert-from').value;
  const to     = document.getElementById('convert-to').value;
  const amtEl  = document.getElementById('convert-amount-from');
  const resEl  = document.getElementById('convert-amount-to');
  const valEl  = document.getElementById('result-value');
  const rateEl = document.getElementById('result-rate');
  const amount = parseFloat(amtEl.value) || 0;
  const result = convert(amount, from, to);
  const rate   = convert(1, from, to);
  if (resEl) resEl.value = result.toFixed(4);
  if (valEl) valEl.textContent = `${amount.toFixed(2)} ${from} = ${result.toFixed(4)} ${to}`;
  if (rateEl) rateEl.textContent = `1 ${from} = ${rate.toFixed(6)} ${to}`;
  renderConverterChart(from, to);
}

function renderConverterChart(from, to) {
  const canvas = document.getElementById('converter-chart');
  if (!canvas) return;
  const days = 30;
  const baseRate = convert(1, from, to);
  const pts = [], labels = [];
  for (let i = days; i >= 0; i--) {
    const noise = (Math.random() - .48) * baseRate * .015;
    pts.push(+(baseRate + (pts.length ? pts[pts.length - 1] - baseRate : 0) + noise).toFixed(6));
    const d = new Date(Date.now() - i * 86400000);
    labels.push(d.getDate() + '/' + (d.getMonth() + 1));
  }
  pts[pts.length - 1] = baseRate;
  const isUp = pts[pts.length - 1] >= pts[0]; const color = isUp ? '#00e5a0' : '#ff4466';
  if (converterChart) { converterChart.destroy(); converterChart = null; }
  const grad = canvas.getContext('2d').createLinearGradient(0, 0, 0, 220);
  grad.addColorStop(0, isUp ? 'rgba(0,229,160,.28)' : 'rgba(255,68,102,.28)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  converterChart = new Chart(canvas, { type: 'line', data: { labels, datasets: [{ data: pts, borderColor: color, borderWidth: 2, backgroundColor: grad, fill: true, tension: .35, pointRadius: 0, pointHoverRadius: 4, pointHoverBackgroundColor: color }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { backgroundColor: '#161820', borderColor: 'rgba(255,255,255,.1)', borderWidth: 1, titleColor: '#8b90a8', bodyColor: '#f0f2f8', bodyFont: { family: 'Space Mono', size: 12 }, callbacks: { label: ctx => ` ${ctx.parsed.y.toFixed(6)} ${from}/${to}` } } }, scales: { x: { grid: { color: 'rgba(255,255,255,.04)', drawBorder: false }, ticks: { color: '#4a4f6a', font: { family: 'Space Mono', size: 10 }, maxTicksLimit: 8 } }, y: { position: 'right', grid: { color: 'rgba(255,255,255,.04)', drawBorder: false }, ticks: { color: '#4a4f6a', font: { family: 'Space Mono', size: 10 }, callback: v => v.toFixed(4) } } } } });
}

function renderQuickPairs() {
  const pairs = [['USD','EUR'],['USD','MAD'],['USD','GBP'],['EUR','MAD'],['GBP','EUR'],['USD','JPY']];
  const grid = document.getElementById('quick-pairs');
  if (!grid) return;
  grid.innerHTML = pairs.map(([from, to]) => {
    const f = CURRENCY_META[from]; const t = CURRENCY_META[to];
    if (!f || !t) return '';
    const rate = convert(1, from, to);
    return `<div class="currency-card" style="cursor:default">
      <div class="card-top"><span style="font-size:.75rem;font-weight:700;color:var(--text-muted);letter-spacing:.08em;text-transform:uppercase">${from} / ${to}</span></div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="font-size:1.5rem">${f.flag}</span>
        <i class="fa-solid fa-right-left" style="color:var(--text-muted);font-size:.75rem"></i>
        <span style="font-size:1.5rem">${t.flag}</span>
      </div>
      <div class="card-rate">${rate.toFixed(4)}</div>
      <div style="font-size:.78rem;color:var(--text-secondary)">1 ${from} = ${rate.toFixed(4)} ${to}</div>
    </div>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  populateSelects();
  doConvert();
  renderQuickPairs();

  document.getElementById('convert-from').addEventListener('change', doConvert);
  document.getElementById('convert-to').addEventListener('change', doConvert);
  document.getElementById('convert-amount-from').addEventListener('input', doConvert);

  document.getElementById('swap-btn').addEventListener('click', () => {
    const fromSel = document.getElementById('convert-from');
    const toSel   = document.getElementById('convert-to');
    const tmp = fromSel.value;
    fromSel.value = toSel.value;
    toSel.value = tmp;
    doConvert();
  });

  buildTicker();
  initLang();
});

async function initConverter() {
  await fetchRates();
  doConvert();
  renderQuickPairs();
}
initConverter();
