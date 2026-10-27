---
title: Inquiry fields and provider contract
description: Form constraints, external request/response requirements and security
  limits without copying the routing value.
kind: reference
source_ref:
- index.html#L248-L292
- inquiry.js#L1-L79
- tests/test_inquiry.py#L49-L80
- thank-you.html#L27-L32
- README.md#L22-L26
---

# Inquiry fields and provider contract

This is a client contract for an external provider, not a local REST API. There is no repository server, authentication/session layer, database, file upload, payment interface or OpenAPI schema.

## Form fields

| Name | Kind / required | Implemented constraint or value |
| --- | --- | --- |
| `access_key` | Hidden public routing identifier | Enabled in active source; UUID-shaped value checked by Python markup test. Value intentionally omitted from docs |
| `redirect` | Hidden | `https://aegisequity.ca/thank-you.html`; native-only, deleted from enhanced payload |
| `subject` | Hidden | `Aegis project inquiry` |
| `botcheck` | Checkbox honeypot | Unchecked by default, hidden, `tabindex=-1`, autocomplete off; enhanced code refuses checked field |
| `name` | Text, required | `maxlength=120`, autocomplete name |
| `email` | Email, required | `maxlength=254`, autocomplete email; native email validation |
| `phone` | Tel, optional | `maxlength=30`, autocomplete tel; no custom pattern |
| `project_type` | Select, required | Disabled initial empty option; choices below |
| `message` | Textarea, required | `rows=5`, `minlength=20`, `maxlength=1200`; brief outline only |

Project type values are `Custom part or enclosure`, `Solar or battery power`, `Sensor or embedded device`, `Dashboard or software tool`, and `Other or not sure`. These are HTML choices, not evidence of a server-side enum validator.

Labels target each visible field ID. Status has `role=status`, polite/atomic live announcements and programmatic focus. The honeypot is hidden in CSS. No file input exists. The form explicitly asks for no photos, credentials, serial numbers or precise locations. Privacy text discloses external processing to respond to the inquiry.

## Enhanced request

| Item | Implemented contract |
| --- | --- |
| Method/URL | `POST https://api.web3forms.com/submit` |
| Headers | `Content-Type: application/json`; `Accept: application/json` |
| Body | `Object.fromEntries(new FormData(form))` with `redirect` deleted, then JSON stringified |
| Timeout | AbortController after 20,000 ms; timer cleared in finally |
| Success | `response.ok` and literal parsed `result.success === true` |
| Retry | No automatic retry; failed send permits a user retry; successful page/controller blocks repeat |

Successful browser controls define actual FormData. The unchecked checkbox is normally absent; optional phone may be empty. The Node fixture's small subset is not the real complete payload specification. No fabricated provider error schema is promised: code reads only success and HTTP status, not vendor message fields.

The controller awaits `response.json()` before inspecting HTTP status. HTTP429 therefore gets its specific retry-later message only after JSON parsing succeeds. Other HTTP/false-success results with parsed JSON show an error and retain entries. JSON parse/network/abort exceptions show an ambiguous-delivery message, including a non-JSON 429 response; entries remain and receipt must be checked before retry. Success resets fields, focuses accepted-for-delivery status and keeps the button disabled for that controller's lifetime. See [lifecycle](../architecture/inquiry-lifecycle.md).

## Native request and dormant history

The active HTML form has `method=post` and no custom `enctype`; a browser uses standard form POST encoding and enabled hidden redirect. Native success goes to the thank-you page according to the documented provider flow. The page itself says a direct visit proves nothing.

Dormant mailto mode is retained in initial migration strings and Python/Node tests. It is not the current source mode or a reason to rerun activation. The activation helper is not key rotation.

## Security, privacy and compatibility

The routing identifier is intentionally public HTML, not an authentication credential, but owner policy forbids copying it into docs/logs/chat or other sites. Never treat it as a sample API key. Browser field checks, a hidden bot box and a disabled button are not server validation or anti-spam guarantees.

Only Web3Forms can validate provider routing/relay; only the mailbox can establish receipt. No account, browser, live submission, mailbox or spam-resistance check ran here. Required JS/browser APIs and version unknowns are in [requirements](../development/source-map-and-requirements.md).

Related: [diagnosis](../how-to/diagnose-inquiry.md), [commands](commands.md), [status](../status.md).
