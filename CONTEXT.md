# cds-snc/gcds-components context
> refreshed 2026-08-27 | upstream default: main @ 747d289a

## Identity & policies
- upstream: cds-snc/gcds-components, default branch main, primary language English + French (bilingual, English-first issues; labels carry `Bug | Bogue`). English-first: yes.
- CLA/DCO: none found in CONTRIBUTING.md
- AI-assisted PR policy: unstated (no AI/LLM/bot language in CONTRIBUTING or org .github)
- signed commits required: no
- PR template: none in repo; org default `cds-snc/.github/PULL_REQUEST_TEMPLATE.md` (bilingual Summary | Résumé + Test instructions | Instructions pour tester la modification) — fill verbatim
- external tracker: github
- CONTRIBUTING: no new components/patterns/features outside "next priorities"; bug fixes + tests welcome. No trivial/drive-by ban.

## Conventions (verified from merged PRs)
- branch naming: conventional-commit style PR titles (`fix(gcds-error-summary): ...`, `feat(gcds-card): ...`); branches kebab-case
- test: `npm run test:unit -w @gcds-core/components` (stencil jest spec), e2e = playwright (`test:e2e`), visual = playwright snapshots (Linux CI is source of truth)
- lint: `eslint .` in packages/web
- CI: run-tests.yml (unit + e2e + visual), build-components.yml; fork CI runs on PRs
- outside PRs merge regularly (mcman12, ken-talltree-io, opensource-joe, daine, melaniebmn within last 2 weeks)

## Maintainer picture
- active: daine, melaniebmn, ethanWallace, Charcharbinkz (triage), opensource-joe
- areas in flight: card read-aloud (#1380 merged), visual regression suite (#1302)

## Issue-area health
- #906 error-summary shadow-DOM focus: Bug-labeled, open, unassigned, no maintainer comment yet; reporter proposed recursive shadow-root search. Related merged PR #666 (2024-10) introduced current focusElement; bug persists in current main (verified 2026-08-27).
- #1374 gcds-card click on text: Bug, maintainer acked backlog; regression from 0.47. Not picked this cycle (one PR per cycle).
- #1004 properties rich text: Bug+feature mix, maintainer discussion ongoing.

## Gap ledger (dedupe — READ FIRST, never re-pick)
- 2026-08-27 issue #906 — pr-opened (fork PR olitreadwell/gcds-components#1): recursive shadow-root id lookup + null guard in focusElement; unit spec + e2e tests (7 spec tests pass, 6 e2e pass locally). Lesson: #666 merged 2024 but bug persisted — always verify against current main, never trust issue version numbers. Fork CI: Run Tests + Build components triggered after enabling fork workflows via actions/permissions PUT.

## Mined gaps (discovered, not yet attempted)
- 2026-08-27 #1374 gcds-card click not registered on card text (regression 0.47→1.4) — status: proposed (next cycle candidate)
- 2026-08-27 #1324 font size in gcds-table — status: proposed (needs thread read)

## Run note: 2026-08-27 (#1374 picked)
- #1374 gcds-card description click — pr-opened (fork PR olitreadwell/gcds-components#2): description children pointer-events: none + global light-DOM rule gcds-card abbr { pointer-events: auto } (shadow CSS cannot reach nested slotted abbr). e2e 9 pass (2 new), unit 24 pass, eslint clean, full e2e 241 pass (1 pre-existing flake). Fork CI in_progress at trace time. Failing test verified first.
- Remaining mined: #1324 gcds-table font size (needs thread read).
