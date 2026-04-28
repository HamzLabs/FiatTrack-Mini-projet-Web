let prevRates = { ...BASE_RATES };
let favs = JSON.parse(localStorage.getItem('ft_favs') || '[]');
let favFilter = false;
let currentSort = 'code_asc';
let searchQ = '';
let countdown = 30;
let modalChart = null;
let modalCurrency = null;
let modalPeriod = 30;


function buildSparklineData(code, days = 14) {
  const base = liveRates[code] || 1;
  const pts = [];
  for (let i = days; i >= 0; i--) {
    const noise = (Math.random() - .5) * base * .03;
    pts.push(+(base + noise).toFixed(5));
  }
  pts[pts.length - 1] = liveRates[code];
  return pts;
}

function drawSparkline(canvas, code) {
  const pts = buildSparklineData(code);
  const isUp = pts[pts.length - 1] >= pts[0];
  const color = isUp ? '#00e5a0' : '#ff4466';
  const W = canvas.width = 80, H = canvas.height = 36;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  const min = Math.min(...pts), max = Math.max(...pts), range = max - min || 1;
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * W);
  const ys = pts.map(p => H - ((p - min) / range) * (H - 6) - 3);
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, isUp ? 'rgba(0,229,160,.35)' : 'rgba(255,68,102,.35)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.beginPath(); ctx.moveTo(xs[0], H);
  xs.forEach((x, i) => ctx.lineTo(x, ys[i]));
  ctx.lineTo(xs[xs.length - 1], H); ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();
  ctx.beginPath(); ctx.moveTo(xs[0], ys[0]);
  xs.forEach((x, i) => ctx.lineTo(x, ys[i]));
  ctx.strokeStyle = color; ctx.lineWidth = 1.8; ctx.stroke();
}


function buildHistory(code, days) {
  const base = liveRates[code] || 1;
  const pts = [], labels = [];
  const now = Date.now(), step = (days * 86400000) / (days < 2 ? 48 : days);
  for (let i = days < 2 ? 48 : days; i >= 0; i--) {
    const t = new Date(now - i * step);
    const noise = (Math.random() - .45) * base * .015 * (days > 7 ? 2.5 : 1);
    pts.push(+(base + (pts.length ? pts[pts.length - 1] - base : 0) + noise).toFixed(6));
    if (days <= 1) labels.push(t.getHours() + ':' + String(t.getMinutes()).padStart(2, '0'));
    else if (days <= 7) labels.push(['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][t.getDay()]);
    else labels.push(t.getDate() + '/' + (t.getMonth() + 1));
  }
  pts[pts.length - 1] = liveRates[code];
  const smooth = pts.map((p, i) => { const sl = pts.slice(Math.max(0, i - 2), i + 3); return sl.reduce((a, b) => a + b, 0) / sl.length; });
  return { pts: smooth, labels };
}


function getRows() {
  const lang = getLang(), d = I18N[lang];
  let rows = Object.keys(CURRENCY_META).map(code => ({
    code,
    rate: liveRates[code] || 1,
    change: changeData[code] || 0,
    flag: CURRENCY_META[code].flag,
    symbol: CURRENCY_META[code].symbol,
    name: d.currencyNames[code] || code,
    isFav: favs.includes(code)
  }));
  if (searchQ) {
    const q = searchQ.toLowerCase();
    rows = rows.filter(r => r.code.toLowerCase().includes(q) || r.name.toLowerCase().includes(q) || r.symbol.includes(q));
  }
  if (favFilter) rows = rows.filter(r => r.isFav);
  switch (currentSort) {
    case 'code_asc':  rows.sort((a, b) => a.code.localeCompare(b.code)); break;
    case 'code_desc': rows.sort((a, b) => b.code.localeCompare(a.code)); break;
    case 'rate_asc':  rows.sort((a, b) => a.rate - b.rate); break;
    case 'rate_desc': rows.sort((a, b) => b.rate - a.rate); break;
    case 'change_desc': rows.sort((a, b) => b.change - a.change); break;
    case 'change_asc':  rows.sort((a, b) => a.change - b.change); break;
  }
  return rows;
}

function renderTable() {
  const tbody = document.getElementById('market-tbody');
  if (!tbody) return;
  const rows = getRows();
  const lang = getLang(), d = I18N[lang];
  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="8" style="padding:40px;text-align:center;color:var(--text-muted)">${d.market.noResults}</td></tr>`;
    return;
  }
  tbody.innerHTML = rows.map(r => {
    const chSign = r.change > 0 ? '+' : '';
    const chClass = r.change > 0 ? 'up' : r.change < 0 ? 'down' : 'flat';
    const chIcon  = r.change > 0 ? 'fa-caret-up' : r.change < 0 ? 'fa-caret-down' : 'fa-minus';
    const flash = prevRates[r.code] && prevRates[r.code] < liveRates[r.code] ? 'flash-up' :
                  prevRates[r.code] && prevRates[r.code] > liveRates[r.code] ? 'flash-down' : '';
    return `<tr class="${flash}" data-code="${r.code}" style="cursor:pointer">
      <td onclick="event.stopPropagation()">
        <button class="fav-btn ${r.isFav ? 'active' : ''}" data-fav="${r.code}"><i class="fa-${r.isFav ? 'solid' : 'regular'} fa-star"></i></button>
      </td>
      <td class="currency-flag">${r.flag}</td>
      <td><div class="currency-info"><span class="code">${r.code}</span><span class="name">${r.name}</span></div></td>
      <td style="font-family:var(--font-mono);font-size:1rem">${r.symbol}</td>
      <td class="rate-val">${r.code === 'USD' ? '1.0000' : r.rate < .01 ? r.rate.toFixed(6) : r.rate.toFixed(4)}</td>
      <td><span class="change-badge ${chClass}"><i class="fa-solid ${chIcon}"></i>${chSign}${r.change.toFixed(2)}%</span></td>
      <td><canvas class="sparkline" data-sparkcode="${r.code}"></canvas></td>
      <td onclick="event.stopPropagation()"><button class="chart-btn" data-chartcode="${r.code}"><i class="fa-solid fa-chart-area"></i> Vue</button></td>
    </tr>`;
  }).join('');

  document.querySelectorAll('.sparkline[data-sparkcode]').forEach(c => drawSparkline(c, c.dataset.sparkcode));

  const all = Object.keys(CURRENCY_META);
  const st = document.getElementById('s-total'); if (st) st.textContent = all.length;
  const su = document.getElementById('s-up'); if (su) su.textContent = all.filter(c => (changeData[c] || 0) > 0).length;
  const sd = document.getElementById('s-down'); if (sd) sd.textContent = all.filter(c => (changeData[c] || 0) < 0).length;
  const stime = document.getElementById('s-time'); if (stime) stime.textContent = new Date().toLocaleTimeString();

  buildTicker('ticker-item', 't-code', 't-up', 't-down');
}

/* ── MODAL CHART ── */
function openModal(code) {
  modalCurrency = code;
  const meta = CURRENCY_META[code];
  const lang = getLang(), d = I18N[lang];
  document.getElementById('modal-flag').textContent = meta.flag;
  document.getElementById('modal-name').textContent = code;
  document.getElementById('modal-fullname').textContent = d.currencyNames[code] || code;
  const rate = liveRates[code] || 1;
  document.getElementById('modal-price').textContent = rate < .01 ? rate.toFixed(6) : rate.toFixed(4);
  const ch = changeData[code] || 0;
  const chEl = document.getElementById('modal-change');
  chEl.textContent = (ch >= 0 ? '+' : '') + ch.toFixed(2) + '%';
  chEl.className = 'change ' + (ch >= 0 ? 'up' : 'down');
  document.getElementById('chart-modal-overlay').classList.add('open');
  renderModalChart(code, modalPeriod);
}

function renderModalChart(code, days) {
  const { pts, labels } = buildHistory(code, days);
  const isUp = pts[pts.length - 1] >= pts[0]; const color = isUp ? '#00e5a0' : '#ff4466';
  const canvas = document.getElementById('modal-chart'); if (!canvas) return;
  if (modalChart) { modalChart.destroy(); modalChart = null; }
  const gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, 260);
  gradient.addColorStop(0, isUp ? 'rgba(0,229,160,.3)' : 'rgba(255,68,102,.3)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  const refVal = pts[0];
  modalChart = new Chart(canvas, { type: 'line', data: { labels, datasets: [{ data: pts, borderColor: color, borderWidth: 2, backgroundColor: gradient, fill: true, tension: .35, pointRadius: 0, pointHoverRadius: 5, pointHoverBackgroundColor: color }] }, options: { responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false }, plugins: { legend: { display: false }, tooltip: { backgroundColor: '#161820', borderColor: 'rgba(255,255,255,.12)', borderWidth: 1, titleColor: '#8b90a8', bodyColor: '#f0f2f8', bodyFont: { family: 'Space Mono', size: 13 }, callbacks: { label: ctx => ` ${ctx.parsed.y < .01 ? ctx.parsed.y.toFixed(6) : ctx.parsed.y.toFixed(4)} ${code}/USD` } } }, scales: { x: { grid: { color: 'rgba(255,255,255,.04)', drawBorder: false }, ticks: { color: '#4a4f6a', font: { family: 'Space Mono', size: 10 }, maxTicksLimit: 8 } }, y: { position: 'right', grid: { color: 'rgba(255,255,255,.04)', drawBorder: false }, ticks: { color: '#4a4f6a', font: { family: 'Space Mono', size: 10 }, callback: v => v < .01 ? v.toFixed(6) : v.toFixed(4) } } } } });
}

/* ── EVENTS ── */
document.getElementById('chart-close').addEventListener('click', () => {
  document.getElementById('chart-modal-overlay').classList.remove('open');
});
document.getElementById('chart-modal-overlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
});
document.querySelectorAll('.chart-period-tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.chart-period-tabs button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    modalPeriod = +btn.dataset.period;
    if (modalCurrency) renderModalChart(modalCurrency, modalPeriod);
  });
});
document.getElementById('market-tbody').addEventListener('click', e => {
  const favBtn = e.target.closest('[data-fav]');
  const chartBtn = e.target.closest('[data-chartcode]');
  const row = e.target.closest('tr[data-code]');
  if (favBtn) {
    const c = favBtn.dataset.fav;
    favs = favs.includes(c) ? favs.filter(x => x !== c) : [...favs, c];
    localStorage.setItem('ft_favs', JSON.stringify(favs));
    renderTable(); return;
  }
  if (chartBtn) { openModal(chartBtn.dataset.chartcode); return; }
  if (row) openModal(row.dataset.code);
});
document.getElementById('market-search').addEventListener('input', e => { searchQ = e.target.value.trim(); renderTable(); });
document.getElementById('market-sort').addEventListener('change', e => { currentSort = e.target.value; renderTable(); });
document.getElementById('fav-filter').addEventListener('click', function () { favFilter = !favFilter; this.classList.toggle('active', favFilter); renderTable(); });
document.querySelectorAll('.market-table th.sortable').forEach(th => {
  th.addEventListener('click', () => { currentSort = th.dataset.sort; document.getElementById('market-sort').value = currentSort; renderTable(); });
});

document.addEventListener('langchange', () => renderTable());

/* ── AUTO-REFRESH ── */
async function tick() {
  const icon = document.getElementById('refresh-icon');
  if (icon) icon.classList.add('fa-spin');
  prevRates = { ...liveRates };
  const live = await fetchRates();
  const src = document.getElementById('api-source');
  if (src) src.textContent = live ? 'exchangerate-api.com · Live' : 'Données simulées (fallback)';
  renderTable();
  if (icon) icon.classList.remove('fa-spin');
  countdown = 30;
}
setInterval(() => {
  countdown--;
  const el = document.getElementById('refresh-countdown');
  if (el) el.textContent = countdown;
  if (countdown <= 0) tick();
}, 1000);

tick();
initLang();