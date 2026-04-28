document.addEventListener('DOMContentLoaded', () => {
  buildTicker();
  initLang();

  const form = document.getElementById('contact-form');
  if (!form) return;

  function showErr(id, show) {
    const el = document.getElementById(id);
    if (el) el.style.display = show ? 'block' : 'none';
  }
  function clearErrors() {
    ['err-name','err-email','err-subject','err-message'].forEach(id => showErr(id, false));
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();
    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value.trim();
    let valid = true;

    if (!name)                            { showErr('err-name', true);    valid = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                                          { showErr('err-email', true);   valid = false; }
    if (!subject)                         { showErr('err-subject', true);  valid = false; }
    if (message.length < 10)             { showErr('err-message', true);  valid = false; }

    if (valid) {
      const success = document.getElementById('form-success');
      if (success) { success.style.display = 'flex'; }
      form.reset();
      setTimeout(() => { if (success) success.style.display = 'none'; }, 5000);
    }
  });

  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => {
      const errMap = { 'contact-name': 'err-name', 'contact-email': 'err-email', 'contact-subject': 'err-subject', 'contact-message': 'err-message' };
      if (errMap[el.id]) showErr(errMap[el.id], false);
    });
  });
});
