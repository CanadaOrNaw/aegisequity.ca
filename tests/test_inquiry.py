#!/usr/bin/env python3
"""Check the inquiry's labels and offline/activated modes without network calls."""
from html.parser import HTMLParser
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PLACEHOLDER = 'AEGIS_WEB3FORMS_ACCESS_KEY_REQUIRED'
ENDPOINT = 'https://api.web3forms.com/submit'


class Inquiry(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.form = None
        self.fields = {}
        self.labels = set()
        self.in_form = False
        self.links = []
        self.scripts = []
        self.feed(html)

    def handle_starttag(self, tag, pairs):
        attrs = dict(pairs)
        if tag == 'form' and attrs.get('id') == 'project-inquiry':
            self.form = attrs
            self.in_form = True
        if tag == 'script' and attrs.get('src'):
            self.scripts.append(attrs['src'])
        if tag == 'a' and attrs.get('href'):
            self.links.append(attrs['href'])
        if not self.in_form:
            return
        if tag == 'label':
            self.labels.add(attrs.get('for'))
        if tag in ('input', 'select', 'textarea') and attrs.get('name'):
            self.fields[attrs['name']] = attrs

    def handle_endtag(self, tag):
        if tag == 'form':
            self.in_form = False


def check_markup(root=ROOT):
    html = (root / 'index.html').read_text()
    parsed = Inquiry(html)
    assert parsed.form is not None
    assert parsed.form['method'].lower() == 'post'
    online = parsed.form['action'] == ENDPOINT
    if online:
        assert 'enctype' not in parsed.form
        assert re.fullmatch(r'[0-9a-fA-F]{8}(?:-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}',
                            parsed.fields['access_key']['value'])
        assert parsed.fields['access_key']['value'] != PLACEHOLDER
        assert 'disabled' not in parsed.fields['access_key']
        assert 'disabled' not in parsed.fields['redirect']
        assert 'Submit your outline here' in html and 'Send inquiry' in html
        assert 'Email drafts go through your mail app' not in html
    else:
        assert parsed.form['enctype'] == 'text/plain'
        assert parsed.form['action'].startswith('mailto:admin@aegisequity.ca?')
        assert 'opens an email draft' in html and 'review and send it there' in html
        assert parsed.fields['access_key']['value'] == PLACEHOLDER
        assert 'disabled' in parsed.fields['access_key'] and 'disabled' in parsed.fields['redirect']
    assert 'inquiry.js' in parsed.scripts
    assert '#contact' in parsed.links and any(link.startswith('tel:') for link in parsed.links)
    assert any(link.startswith('mailto:admin@aegisequity.ca') for link in parsed.links)
    assert 'Web3Forms processes submissions' in html
    assert parsed.fields['redirect']['value'] == 'https://aegisequity.ca/thank-you.html'
    assert parsed.fields['botcheck']['type'] == 'checkbox'
    assert parsed.fields['botcheck']['tabindex'] == '-1'
    for name, required in (('name', True), ('email', True), ('phone', False),
                           ('project_type', True), ('message', True)):
        field = parsed.fields[name]
        assert field['id'] in parsed.labels, f"Missing label: {name}"
        assert ('required' in field) is required, f"Unexpected required state: {name}"
    assert parsed.fields['email']['type'] == 'email'
    assert parsed.fields['phone']['type'] == 'tel'
    assert parsed.fields['message']['maxlength'] == '1200'
    assert 'type="file"' not in html


if __name__ == '__main__':
    check_markup()
    print('PASS: inquiry form is labeled and correctly configured for its current mode.')
