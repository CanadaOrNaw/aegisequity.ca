(() => {
  const form = document.getElementById('project-inquiry');
  if (!form) return;

  const endpoint = 'https://api.web3forms.com/submit';
  const key = form.elements.namedItem('access_key');
  if (form.getAttribute('action') !== endpoint || !key || key.disabled ||
      !key.value || key.value === 'AEGIS_WEB3FORMS_ACCESS_KEY_REQUIRED') return;

  const status = document.getElementById('inquiry-status');
  const button = form.querySelector('button[type="submit"]');
  const botcheck = form.elements.namedItem('botcheck');
  let sending = false;
  let sent = false;

  function updateStatus(message, state) {
    status.textContent = message;
    status.dataset.state = state;
  }

  form.addEventListener('invalid', () => {
    updateStatus('Please check the required fields and try again.', 'error');
  }, true);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending || sent) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      updateStatus('Please check the required fields and try again.', 'error');
      return;
    }

    if (botcheck.checked) {
      updateStatus('We could not send this inquiry. Please email or call us instead.', 'error');
      return;
    }

    sending = true;
    button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    updateStatus('Sending your inquiry…', 'sending');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const data = Object.fromEntries(new FormData(form));
      delete data.redirect; // Native POST uses the redirect; fetch expects JSON, not a navigation.
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: controller.signal,
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        updateStatus(response.status === 429
          ? 'Too many requests right now. Please try again later or email us directly.'
          : 'We could not send your inquiry. Your entries are still here; please try again or email us directly.', 'error');
        status.focus();
        return;
      }

      sent = true;
      form.reset();
      updateStatus('Your inquiry was accepted for delivery. We will review it and reply by email.', 'success');
      status.focus();
    } catch {
      updateStatus('We could not confirm delivery. Your entries are still here; please try again or email us directly. If you already sent it, check before retrying.', 'error');
      status.focus();
    } finally {
      clearTimeout(timeout);
      sending = false;
      form.removeAttribute('aria-busy');
      if (!sent) button.disabled = false;
    }
  });
})();
