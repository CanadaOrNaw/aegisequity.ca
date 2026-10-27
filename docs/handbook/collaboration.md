---
title: "Collaboration and working state"
description: "Understand purpose, ownership, evidence, decisions and the contribution path without duplicating a work tracker."
kind: "overview"
source_ref: ["README.md#L14-L39", "CLAUDE.md", "AGENTS.md", "CONTEXT.md", "docs/CONTEXT.md#L1-L5", "index.html#L147-L166", ".githooks/docs-pre-commit#L1-L4", "build-blog.py#L92-L155"]
---

# Collaboration and working state

## Intended outcome

Maintain a small public face for Aegis: clear service scope, useful planning articles and a reliable way to start a conversation. The website describes a listen → map → build → handoff process. It does not implement those customer projects (`index.html:147-166`).

The repository owns website behavior. The business owner owns public claims, publication approval and inquiry receipt. Domain/DNS/hosting evidence stays with fleet-index; business queues, approvals and records stay with their existing owners. `README.md:37-39` and `CLAUDE.md:27-36` are the routing records, not permission to copy those records here.

## Current working state and demonstrations

- [Status and evidence](status.md) separates tested local behavior, dated provider rejection history and live unknowns. It is the reader-facing summary, not a new business work queue.
- [Offline verification](tutorials/offline-verification.md) demonstrates the shipped local files and stubbed browser controller without making a request.
- [Article trace](tutorials/trace-existing-article.md) demonstrates one real source pair's path into the existing site, preview, feed and sitemap without rebuilding.
- There is no new live browser/inbox demonstration in this documentation pass. No current hosted artifact or current delivery claim has been accepted.

For active work, consult the owning website/business instructions and existing business queue through the owner. This manual does not assign new business work or repeat private queue rows.

## Important decisions and their consequences

| Existing choice | Why it matters to a contributor | Authority |
| --- | --- | --- |
| Plain static website served through Pages | No backend install or application server to debug | `README.md:14-18`, `CONTEXT.md:3` |
| Article JSON/body pairs and one generator | Source plus products change together; generation is a write operation | `CLAUDE.md:12-14`, `CONTEXT.md:21` |
| Progressive enhancement over a native form | Both paths matter; a passing JavaScript fixture is not a browser delivery test | `README.md:22-26` |
| Provider acceptance distinct from inbox receipt | Success text cannot certify receipt | `README.md:26` |
| One home per fact, no secret values in Git | Link owner evidence; never paste the public routing identifier into examples | `AGENTS.md:17-22`, `README.md:24` |
| Private operational handbook | Shared documentation is not a second public business-site publication source | `docs/CONTEXT.md:1-5` |

These are explanations of current sources, not a retrospective claim that a formal decision record exists for every implementation detail.

## Human and agent contribution path

1. Read root `AGENTS.md`, `CLAUDE.md`, `CONTEXT.md`, `README.md` and [status](status.md). Root instructions name the source owner and approval boundaries.
2. Use the [source map](development/source-map-and-requirements.md) to find the actual owner. Inspect implementation, not only this manual.
3. Agree on the public claim or change with the owner. Keep customer, money and private operational records outside this handbook.
4. Change the source and affected documentation together. For a blog/layout change, review the generator's complete write set before running it. Use the applicable [change-impact map](maintenance/change-impact-and-owner-links.md).
5. Run the source-reviewed offline checks. Record what was not exercised. An owner must separately approve any live request or publication.
6. Obtain independent source/claim and reader-task review for the exact changed documentation, navigation and evidence. An author-written receipt is not acceptance.

No branch naming rule, PR template or in-repository CI workflow is defined here. Do not invent one as an existing requirement. The documentation hook wrapper delegates elsewhere; its presence alone does not prove it is active.

## Blockers and authority limits

Supported runtime/browser versions are not pinned. Actual Pages exclusions and current inbox delivery remain unverified. Removing or renaming a published article needs an owner-approved plan because the generator leaves obsolete directories behind. [Status](status.md) and [generation concepts](architecture/publication-dataflow.md) explain these concrete limits.

Older root routes still mention OpenClaw/Agrippa. They are not authority to restart retired systems. Reconcile stale routes with the owning maintainer rather than guessing a replacement automation implementation. This manual deliberately does not copy private automation records.

Next: [working guide](guide.md), [testing](development/test-strategy.md), [command reference](reference/commands.md).
