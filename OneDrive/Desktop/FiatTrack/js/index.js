
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], pulses = [], time = 0;
  const VPX = 0.82, VPY = 0.48;

  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; buildCircuit(); }

  function buildCircuit() {
    nodes = []; pulses = [];
    const COLS = 22, ROWS = 14;
    const vpx = W * VPX, vpy = H * VPY;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const gx = col / (COLS - 1), gy = row / (ROWS - 1) - .5;
        const depth = .18 + gx * .82, perspective = 1 / (.4 + depth * 1.8);
        const sx = vpx - (1 - gx) * W * .9 * perspective * 1.1, sy = vpy + gy * H * 1.1 * perspective;
        if (sx < -60 || sx > W + 60 || sy < -60 || sy > H + 60) continue;
        const brightness = .15 + depth * .6, isJunction = Math.random() < .22;
        nodes.push({ sx, sy, depth, perspective, gx, gy, row, col, brightness, isJunction, glowPhase: Math.random() * Math.PI * 2, glowSpeed: .4 + Math.random() * .8, size: (1 + depth * 2.5) * (isJunction ? 2.2 : .8) });
      }
    }
    nodes.forEach((n, i) => { n.edges = []; nodes.forEach((m, j) => { if (i === j) return; const dc = Math.abs(n.col - m.col), dr = Math.abs(n.row - m.row); if ((dc === 1 && dr === 0) || (dc === 0 && dr === 1)) n.edges.push(j); }); });
    for (let i = 0; i < 18; i++) spawnPulse();
  }

  function spawnPulse() {
    if (nodes.length < 2) return;
    const left = nodes.filter(n => n.gx < .3);
    if (!left.length) return;
    const start = left[Math.floor(Math.random() * left.length)];
    const startIdx = nodes.indexOf(start);
    if (startIdx < 0 || !start.edges.length) return;
    pulses.push({ nodeIdx: startIdx, nextIdx: start.edges[Math.floor(Math.random() * start.edges.length)], t: Math.random(), speed: .008 + Math.random() * .014, color: Math.random() < .6 ? [0, 229, 160] : [0, 180, 255], size: 2 + Math.random() * 2.5, trail: [] });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H); time += .016;
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#0a0b0f'); bg.addColorStop(.4, '#0d0f18'); bg.addColorStop(1, '#0a1020');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    nodes.forEach((n, i) => { n.edges.forEach(j => { if (j <= i) return; const m = nodes[j]; const alpha = Math.min(n.brightness, m.brightness) * .35; const w = Math.min(n.depth, m.depth) * 1.2; ctx.beginPath(); ctx.moveTo(n.sx, n.sy); if (Math.random() < .5) { ctx.lineTo(m.sx, n.sy); ctx.lineTo(m.sx, m.sy); } else { ctx.lineTo(n.sx, m.sy); ctx.lineTo(m.sx, m.sy); } ctx.strokeStyle = `rgba(0,229,160,${alpha})`; ctx.lineWidth = w; ctx.stroke(); }); });
    nodes.forEach(n => { const glow = .5 + .5 * Math.sin(time * n.glowSpeed + n.glowPhase); const alpha = n.brightness * (.55 + glow * .45); const r = n.size * (1 + glow * .4); if (n.isJunction) { ctx.save(); ctx.shadowBlur = 8 + glow * 12; ctx.shadowColor = `rgba(0,229,160,${alpha})`; ctx.fillStyle = `rgba(0,${180 + Math.floor(glow * 49)},${120 + Math.floor(glow * 80)},${alpha})`; ctx.fillRect(n.sx - r, n.sy - r, r * 2, r * 2); ctx.restore(); } else { ctx.beginPath(); ctx.arc(n.sx, n.sy, r, 0, Math.PI * 2); ctx.fillStyle = `rgba(0,229,160,${alpha * .7})`; ctx.fill(); } });
    pulses = pulses.filter(p => { const from = nodes[p.nodeIdx], to = nodes[p.nextIdx]; if (!from || !to) return false; p.t += p.speed; const px = from.sx + (to.sx - from.sx) * p.t, py = from.sy + (to.sy - from.sy) * p.t; p.trail.push({ x: px, y: py, t: 1 }); if (p.trail.length > 14) p.trail.shift(); p.trail.forEach((pt, i) => { const ta = (i / p.trail.length) * pt.t, ts = (i / p.trail.length) * p.size; ctx.beginPath(); ctx.arc(pt.x, pt.y, ts * .7, 0, Math.PI * 2); ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${ta * .6})`; ctx.fill(); }); ctx.save(); ctx.shadowBlur = 14; ctx.shadowColor = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},0.9)`; ctx.beginPath(); ctx.arc(px, py, p.size, 0, Math.PI * 2); ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},0.95)`; ctx.fill(); ctx.restore(); if (p.t >= 1) { p.nodeIdx = p.nextIdx; const node = nodes[p.nodeIdx]; if (!node || !node.edges.length || node.gx > .95) return false; const rightEdges = node.edges.filter(j => nodes[j] && nodes[j].gx >= node.gx); const pool = rightEdges.length ? rightEdges : node.edges; p.nextIdx = pool[Math.floor(Math.random() * pool.length)]; p.t = 0; p.trail = []; } return true; });
    while (pulses.length < 20) spawnPulse();
    const fog = ctx.createLinearGradient(0, 0, W * .5, 0); fog.addColorStop(0, 'rgba(10,11,15,0.75)'); fog.addColorStop(.42, 'rgba(10,11,15,0.18)'); fog.addColorStop(1, 'rgba(10,11,15,0)'); ctx.fillStyle = fog; ctx.fillRect(0, 0, W, H);
    const bot = ctx.createLinearGradient(0, H * .6, 0, H); bot.addColorStop(0, 'rgba(10,11,15,0)'); bot.addColorStop(1, 'rgba(10,11,15,0.9)'); ctx.fillStyle = bot; ctx.fillRect(0, 0, W, H);
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize); resize(); draw();
})();

/* ── HERO RATES ── */
function renderHeroRates() {
  const pairs = [{ from: 'EUR', to: 'USD' }, { from: 'USD', to: 'MAD' }, { from: 'GBP', to: 'USD' }, { from: 'USD', to: 'JPY' }];
  const el = document.getElementById('hero-rates');
  if (!el) return;
  el.innerHTML = pairs.map(({ from, to }) => {
    const rate = from === 'USD' ? liveRates[to] || 1 : 1 / (liveRates[from] || 1);
    const ch = changeData[from === 'USD' ? to : from] || 0;
    return `<div class="hero-rate-card"><div class="pair">${from}/${to}</div><div class="rval">${rate.toFixed(4)}</div><div class="rchg ${ch >= 0 ? 'up' : 'down'}">${ch >= 0 ? '+' : ''}${ch.toFixed(2)}%</div></div>`;
  }).join('');
}

/* ── FEATURED CURRENCIES ── */
const FEATURED = ['EUR', 'MAD', 'GBP', 'JPY', 'CHF', 'CNY', 'CAD', 'AUD'];
function renderFeatured() {
  const lang = getLang(), d = I18N[lang];
  const el = document.getElementById('featured-grid');
  if (!el) return;
  el.innerHTML = FEATURED.map(code => {
    const meta = CURRENCY_META[code];
    const rate = liveRates[code] || 1;
    const ch = changeData[code] || 0;
    const cls = ch >= 0 ? 'up' : 'down';
    const name = d.currencyNames[code] || code;
    return `<div class="currency-card" onclick="location.href='market.html'">
      <div class="card-top"><span class="card-flag">${meta.flag}</span><span class="card-badge ${cls}">${ch >= 0 ? '+' : ''}${ch.toFixed(2)}%</span></div>
      <div class="card-code">${code}</div>
      <div class="card-name">${name}</div>
      <div class="card-rate">${rate < .01 ? rate.toFixed(6) : rate.toFixed(4)} USD</div>
    </div>`;
  }).join('');
  const upCount = Object.keys(changeData).filter(c => changeData[c] > 0).length;
  const downCount = Object.keys(changeData).filter(c => changeData[c] < 0).length;
  const statUp = document.getElementById('stat-up'); if (statUp) statUp.textContent = upCount;
  const statDown = document.getElementById('stat-down'); if (statDown) statDown.textContent = downCount;
  const lu = document.getElementById('last-updated'); if (lu) lu.textContent = new Date().toLocaleTimeString();
}

/* ── MAIN CHART ── */
let mainChart = null;
function buildChartData(days) {
  const base = liveRates['EUR'] || .921;
  const pts = [], labels = [];
  for (let i = days; i >= 0; i--) {
    const noise = (Math.random() - .48) * base * .012 * (days > 7 ? 2 : 1);
    pts.push(+(base + (pts.length ? pts[pts.length - 1] - base : 0) + noise).toFixed(5));
    const d = new Date(Date.now() - i * 86400000);
    labels.push(days <= 7 ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][d.getDay()] : d.getDate() + '/' + (d.getMonth() + 1));
  }
  pts[pts.length - 1] = liveRates['EUR'];
  return { pts, labels };
}
function renderMainChart(days = 30) {
  const { pts, labels } = buildChartData(days);
  const isUp = pts[pts.length - 1] >= pts[0]; const color = isUp ? '#00e5a0' : '#ff4466';
  const canvas = document.getElementById('main-chart'); if (!canvas) return;
  if (mainChart) { mainChart.destroy(); mainChart = null; }
  const grad = canvas.getContext('2d').createLinearGradient(0, 0, 0, 280);
  grad.addColorStop(0, isUp ? 'rgba(0,229,160,.28)' : 'rgba(255,68,102,.28)'); grad.addColorStop(1, 'rgba(0,0,0,0)');
  mainChart = new Chart(canvas, { type: 'line', data: { labels, datasets: [{ data: pts, borderColor: color, borderWidth: 2, backgroundColor: grad, fill: true, tension: .35, pointRadius: 0, pointHoverRadius: 4, pointHoverBackgroundColor: color }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { backgroundColor: '#161820', borderColor: 'rgba(255,255,255,.1)', borderWidth: 1, titleColor: '#8b90a8', bodyColor: '#f0f2f8', bodyFont: { family: 'Space Mono', size: 12 }, callbacks: { label: ctx => ` ${ctx.parsed.y.toFixed(5)} EUR/USD` } } }, scales: { x: { grid: { color: 'rgba(255,255,255,.04)', drawBorder: false }, ticks: { color: '#4a4f6a', font: { family: 'Space Mono', size: 10 }, maxTicksLimit: 8 } }, y: { position: 'right', grid: { color: 'rgba(255,255,255,.04)', drawBorder: false }, ticks: { color: '#4a4f6a', font: { family: 'Space Mono', size: 10 }, callback: v => v.toFixed(4) } } } } });
}

document.querySelectorAll('.chart-period-btns button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.chart-period-btns button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMainChart(+btn.dataset.d);
  });
});

document.addEventListener('langchange', () => {
  renderFeatured();
});

async function init() {
  await fetchRates();
  renderHeroRates();
  renderFeatured();
  buildTicker();
  renderMainChart(30);
  initLang();
}
init();
setInterval(async () => { await fetchRates(); renderHeroRates(); renderFeatured(); buildTicker(); }, 30000);