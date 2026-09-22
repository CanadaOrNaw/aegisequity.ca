// Exercise inquiry.js without network access or a browser dependency.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const script = readFileSync(new URL('../inquiry.js', import.meta.url), 'utf8');
const placeholder = 'AEGIS_WEB3FORMS_ACCESS_KEY_REQUIRED';
const endpoint = 'https://api.web3forms.com/submit';

function harness({ activated = true, valid = true, bot = false, fetchImpl } = {}) {
  const handlers = {};
  const status = { textContent: '', dataset: {}, focusCount: 0, focus() { this.focusCount++; } };
  const button = { disabled: false };
  const key = { disabled: !activated, value: activated ? 'TEST_AEGIS_ONLY_NOT_A_KEY' : placeholder };
  const form = {
    attributes: {},
    elements: { namedItem: name => ({ access_key: key, botcheck: { checked: bot } })[name] },
    getAttribute: name => name === 'action' ? (activated ? endpoint : 'mailto:admin@aegisequity.ca') : undefined,
    addEventListener: (event, handler) => { handlers[event] = handler; },
    querySelector: () => button,
    checkValidity: () => valid,
    reportValidityCount: 0,
    reportValidity() { this.reportValidityCount++; },
    resetCount: 0,
    reset() { this.resetCount++; },
    setAttribute(name, value) { this.attributes[name] = value; },
    removeAttribute(name) { delete this.attributes[name]; }
  };
  const calls = [];
  const context = {
    document: { getElementById: id => id === 'project-inquiry' ? form : status },
    FormData: class { constructor() { return [['access_key', key.value], ['name', 'Tester'], ['message', 'A small example project'], ['redirect', 'https://aegisequity.ca/thank-you.html']]; } },
    fetch: (...args) => { calls.push(args); return fetchImpl(...args); },
    AbortController,
    setTimeout,
    clearTimeout
  };
  vm.runInNewContext(script, context);
  return { handlers, status, button, form, calls, submit: () => {
    assert.ok(handlers.submit, 'Activated form registers a submit listener');
    let prevented = false;
    const done = handlers.submit({ preventDefault() { prevented = true; } });
    assert.ok(prevented, 'Activated form prevents native navigation');
    return done;
  } };
}

const dormant = harness({ activated: false, fetchImpl: () => { throw Error('must not fetch'); } });
assert.equal(dormant.handlers.submit, undefined, 'No-key form remains a native mailto draft');
assert.equal(dormant.calls.length, 0);

const pending = [];
const success = harness({ fetchImpl: () => new Promise(resolve => pending.push(resolve)) });
const first = success.submit();
assert.equal(success.button.disabled, true);
assert.equal(success.form.attributes['aria-busy'], 'true');
await success.submit();
assert.equal(success.calls.length, 1, 'Rapid duplicate submit starts only one request');
const [url, options] = success.calls[0];
assert.equal(url, endpoint);
assert.equal(options.method, 'POST');
assert.equal(options.headers['Content-Type'], 'application/json');
assert.equal(JSON.parse(options.body).redirect, undefined, 'No redirect sent with JSON fetch');
pending[0]({ ok: true, json: async () => ({ success: true }) });
await first;
assert.equal(success.form.resetCount, 1);
assert.equal(success.status.dataset.state, 'success');
assert.equal(success.form.attributes['aria-busy'], undefined);
assert.equal(success.button.disabled, true, 'Successful submission cannot be repeated');
await success.submit();
assert.equal(success.calls.length, 1);

for (const [label, response] of [
  ['HTTP failure', { ok: false, status: 400, json: async () => ({ success: false, body: { message: 'invalid key' } }) }],
  ['rate limit', { ok: false, status: 429, json: async () => ({ success: false, message: 'Too many requests' }) }],
  ['false success', { ok: true, status: 200, json: async () => ({ success: false }) }],
  ['invalid JSON', { ok: true, status: 200, json: async () => { throw Error('bad JSON'); } }]
]) {
  const h = harness({ fetchImpl: async () => response });
  await h.submit();
  assert.equal(h.form.resetCount, 0, `${label} must retain entries`);
  assert.equal(h.button.disabled, false, `${label} must permit retry`);
  assert.equal(h.status.dataset.state, 'error', `${label} must report error`);
  assert.ok(h.status.focusCount, `${label} must focus status`);
}
const offline = harness({ fetchImpl: async () => { throw Error('network down'); } });
await offline.submit();
assert.equal(offline.status.dataset.state, 'error');
assert.equal(offline.form.resetCount, 0);
assert.match(offline.status.textContent, /could not confirm delivery/);

const bot = harness({ bot: true, fetchImpl: () => { throw Error('must not fetch'); } });
await bot.submit();
assert.equal(bot.calls.length, 0);
assert.equal(bot.status.dataset.state, 'error');

const invalid = harness({ valid: false, fetchImpl: () => { throw Error('must not fetch'); } });
await invalid.submit();
assert.equal(invalid.form.reportValidityCount, 1);
assert.equal(invalid.calls.length, 0);

console.log('PASS: dormant fallback, validation, honeypot, duplicate guard, success and error responses.');
