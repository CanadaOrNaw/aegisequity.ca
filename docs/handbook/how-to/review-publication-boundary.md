---
title: Review the publication boundary
description: Preserve custom-domain binding and check intended exclusions without
  assuming hosted privacy.
kind: how-to
source_ref:
- _config.yml#L1-L13
- CNAME#L1
- README.md#L14-L18
- tests/check-site.py#L102-L104
- docs/CONTEXT.md#L1-L5
- README.md#L24-L39
---

# Review the publication boundary

This repository has public business content and private operational documentation. Source-tree presence does not mean a file is safe to serve. `CNAME` owns the declared Pages custom domain; preserve it.

## Review the intended exclusions

Current `_config.yml:3-13` excludes:

- Root `README.md`, `CLAUDE.md`, `AGENTS.md`, `CONTEXT.md`.
- Article sources `content/`, generator `build-blog.py`, tests.
- `docs/`, `.docs-check/` and `.githooks/`.

This is Jekyll configuration, not universal access control. A raw Python file server serves its working directory without applying these rules. Private unified documentation must not be published through the public business site's artifact.

## What the local checker proves

`tests/check-site.py:102-104` asserts the text entries for `content`, `build-blog.py` and `tests`. It does **not** build Jekyll, inspect hosted files or assert every documentation exclusion. The current file contains the additional private-doc exclusions, but the actual Pages artifact was not examined.

The source tree has no checked-in deploy workflow or locked Jekyll toolchain. Do not invent a build command, install Jekyll, query live hosting or publish to prove this page while doing documentation work.

## Owner review before any publication

1. Identify the actual approved Pages source and build process with the hosting owner.
2. Review its generated publish artifact, not just `_config.yml`, for source/tools/private docs exclusion.
3. Preserve the custom-domain binding and crawler/feed/sitemap paths. Do not delete remotes or change DNS as troubleshooting shortcuts.
4. Keep private customer, financial, account and routing-identifier values out of documentation/public extras. Public visibility of a routing identifier does not permit duplicating it.
5. Obtain approval for the intended publication diff. Record artifact evidence and unresolved limits separately from local structural tests.

These later steps were not performed here. Domain/DNS authority and business records stay with their owners; [collaboration](../collaboration.md) explains the route without copying those records.

Related: [configuration/discovery](../reference/configuration-and-discovery.md), [status](../status.md), [working guide](../guide.md).
