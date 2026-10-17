---
title: "Handbook ownership"
description: "Define this project’s reader pages, private evidence and maintained source boundaries."
kind: "overview"
source_ref: ["CONTEXT.md", "docs/CONTEXT.md#L1-L5", "AGENTS.md"]
---

# Handbook ownership

This handbook explains the website's actual interfaces and safe maintainer tasks. It is private operational documentation, not source for the public business site.

## Inputs and authority

Implementation and tests determine behavior. Root instructions route ownership and approvals. Business/domain records keep their existing owner; no customer, financial, credential or private queue rows belong here. [Collaboration](collaboration.md) explains how those authorities work together.

## Maintained outputs

The canonical reader input is this topic tree, its `sidebar.json` and any explicitly approved assets. The [landing page](index.md) and sidebar expose every reader page. Private verification manifests, hashes, example observations and review receipts live outside the handbook in `docs/verification/`.

Existing `_generated/` products are legacy script-owned views, not authored reader input. Do not hand-edit them or infer that they reflect this replacement topic tree. Shared website assembly and publication remain parent-owned.

## Review boundary

An author records exact source/page/navigation bytes and leaves their review decision **changes-required**. Independent review must test claim-to-source correctness and reader tasks before acceptance. A matching hash or passing site build detects integrity; it does not approve prose or live behavior.

Use [the maintenance map](maintenance/change-impact-and-owner-links.md) after a relevant source change and [status](status.md) for observed evidence limits. No example should be executed merely to render a page.
