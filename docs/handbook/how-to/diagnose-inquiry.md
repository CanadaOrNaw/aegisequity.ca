---
title: Diagnose an inquiry safely
description: Interpret observed states without duplicate sending, invented delivery
  proof or unsafe key changes.
kind: how-to
source_ref:
- inquiry.js#L21-L79
- README.md#L22-L26
- thank-you.html#L27-L32
- tests/activate-inquiry.py#L28-L63
- index.html#L247-L291
---

# Diagnose an inquiry safely

Start with what the visitor actually observed. Do not send another test or rotate the public routing identifier as a guess. A host-side POST was rejected with HTTP403 on 2026-09-22; that is dated history, not a diagnosis of today's provider (`README.md:26`).

## Interpret the state

| Observed state | What current code establishes | Safe next step |
| --- | --- | --- |
| Required-field error | Browser/controller validity failed; no enhanced request started | Correct the visible fields; preserve context |
| Honeypot error | Checked bot box blocked enhanced request | Use email/phone fallback; do not claim all spam is blocked |
| Sending/disabled button | One enhanced request is in progress; twenty-second abort timer exists | Wait for its visible outcome, do not force duplicate submits |
| Too many requests | HTTP429 was received and response JSON parsed successfully | Follow retry-later/email text, not an automatic loop |
| Generic send failure | After response JSON parsed, HTTP failed or JSON success was not literally true | Entries remain; check receipt before any live retry |
| Could not confirm delivery | Network, abort or JSON parsing threw, including a non-JSON HTTP429 response | Ambiguous result: ask whether it arrived before retrying |
| Accepted-for-delivery text | HTTP OK plus JSON success true; form reset and in-page repeat lock | Owner must confirm mailbox receipt separately |
| Thank-you page | May be native provider redirect, or a direct page visit | Direct visit confirms nothing; use owner receipt evidence |
| No enhanced status behavior | Enhancement guard may not have installed, or JS failed/was absent | Inspect active/native mode and script/DOM wiring offline first |

The controller does not show raw provider messages to users, store a persistent submission record or query the mailbox. A page reload also loses its in-memory repeat guard.

## Investigate locally first

Follow [offline verification](../tutorials/offline-verification.md). Read the [field and provider contract](../reference/inquiry-fields-and-provider.md) and compare the actual source without copying its routing value into logs/chat/screenshots. A local pass narrows markup/controller errors but cannot prove delivery.

`tests/activate-inquiry.py` is for one exact initial dormant-to-active migration. Current active markup causes it to exit before prompts. It is not a key-rotation, health-check or troubleshooting command. Any provider/key procedure belongs to the owner.

## When a live check is genuinely needed

Obtain explicit owner approval for one clearly labeled browser submission. Confirm the intended test in the destination inbox before making a receipt claim or retrying an ambiguous result. No such submission, account or mailbox check ran in this authoring pass.

Do not include photos, credentials, serial numbers or precise locations in the first-contact form. Email and phone remain contact alternatives; they are not proof the online path succeeded.

Related: [inquiry lifecycle](../architecture/inquiry-lifecycle.md), [current evidence limits](../status.md).
