/* ═══════════════════════════════════════════
   app.js — Shared: theme toggle, mobile menu
═══════════════════════════════════════════ */
(function () {
  const themeBtn = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('ft_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  if (themeBtn) {
    themeBtn.querySelector('i').className = saved === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    themeBtn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('ft_theme', next);
      themeBtn.querySelector('i').className = next === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });
  }

  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  }
})();
