#!/usr/bin/env python3
"""Owner-operated, masked activation of the PUBLIC Web3Forms routing key.

The routing key intentionally becomes visible in website HTML after activation.
Never pass it on a command line or paste it in chat.
"""
from getpass import getpass
from pathlib import Path
import os
import re
import tempfile

ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / 'index.html'
UUID = re.compile(r'[0-9a-fA-F]{8}(?:-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}\Z')
REPLACEMENTS = (
    ('action="mailto:admin@aegisequity.ca?subject=Custom%20Build%20Inquiry" method="post" enctype="text/plain"',
     'action="https://api.web3forms.com/submit" method="post"'),
    ('Online sending is not active yet. Completing this form opens an email draft in your mail app; review and send it there. You can also email or call us directly.',
     'Submit your outline here. We will review it and reply by email. You can also email or call us directly.'),
    ('name="redirect" value="https://aegisequity.ca/thank-you.html" disabled',
     'name="redirect" value="https://aegisequity.ca/thank-you.html"'),
    ('Email drafts go through your mail app; when online sending is activated, Web3Forms processes submissions for delivery to Aegis at admin@aegisequity.ca.',
     'Web3Forms processes submissions for delivery to Aegis at admin@aegisequity.ca.'),
    ('>Prepare email draft</button>', '>Send inquiry</button>'),
)

def activate(source: str, key: str) -> str:
    if not UUID.fullmatch(key):
        raise ValueError('Expected a Web3Forms UUID-style access key; no file changed.')
    result = source
    for old, new in REPLACEMENTS:
        if result.count(old) != 1:
            raise ValueError('The form changed since this installer was written; no file changed.')
        result = result.replace(old, new, 1)
    old_key = 'name="access_key" value="AEGIS_WEB3FORMS_ACCESS_KEY_REQUIRED" disabled'
    if result.count(old_key) != 1:
        raise ValueError('Missing or already active access-key field; no file changed.')
    return result.replace(old_key, f'name="access_key" value="{key}"', 1)

if __name__ == '__main__':
    source = PAGE.read_text()
    if 'action="https://api.web3forms.com/submit"' in source:
        raise SystemExit('Form already active. No file changed.')
    print('This installs a PUBLIC routing key in the Aegis website HTML. It will be visible to site visitors after publication.')
    if input('Is this Aegis key verified for admin@aegisequity.ca? Type yes: ').strip().lower() != 'yes':
        raise SystemExit('Cancelled. No file changed.')
    key = getpass('Paste Aegis Web3Forms key (input hidden): ').strip()
    try:
        updated = activate(source, key)
    except ValueError as exc:
        raise SystemExit(str(exc)) from None
    # Check all expected elements before writing. Never echo the key.
    with tempfile.NamedTemporaryFile('w', encoding='utf-8', dir=ROOT, prefix='.inquiry-', delete=False) as tmp:
        tmp.write(updated)
        name = tmp.name
    try:
        os.chmod(name, PAGE.stat().st_mode & 0o777)
        os.replace(name, PAGE)
    finally:
        if os.path.exists(name):
            os.unlink(name)
    print('Installed locally. Not deployed; ask Aegis to test, publish, and verify inbox delivery.')
