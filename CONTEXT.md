# aegisequity.ca: what this workspace is

Static website for Aegis Equity Corp. Served live at https://aegisequity.ca via GitHub Pages.

## Inputs

- **Reference (stable):** the files listed in `CLAUDE.md`
- **Working:** whatever the current task touches

## Process

Read `CLAUDE.md` first: it routes and holds no content. Change the source, not generated output.

## Outputs

| What | Where |
|---|---|
| the site | `index.html styles.css` |
| the live domain binding — do not remove | `CNAME` |
| brand assets | `logo*.png shield-mark.svg` |

## Human check

This repo serves a live customer-facing domain. Deleting the GitHub remote takes the site offline.
