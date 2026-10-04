# SDD ledger — plan: docs/implementation-plan.md

Pre-flight: Tasks 1/2 share readRoute, routeUrl, filterFoods and pagePaths; imports match. Tasks 2/3 share static output, manifest and independent site identity; old identity is excluded.

Task 1: routes tests RED 0/6 before implementation, GREEN 6/6 afterwards. New project registered once and manifest persisted atomically: appgprj_6ac25d222520819184c84cf958ec2f72. Original project unchanged.

Ruling: Use a separate site-horizontal checkout instead of a worktree — the workspace root is not a Git repo and this creates a new Sites identity — cost if wrong: directory relocation only.

Task 2: page tests RED on missing components before implementation, GREEN 11/11 including route tests after implementation. Rendered 24 static HTML addresses.

Ruling: Reuse standalone original agricultural photography per approved spec, rather than slicing reference UI images — images remain editable independently and no fictional company claims are introduced — cost if wrong: replace individual photographs later.

Task 2: Removed extra hero/intro/base eyebrow copy and bilingual logo text after above-fold comparison. Added physical links and desktop/mobile secondary menus required by the specification.
Task 1: complete (commits cd4fc87..cd4fc87, tests: node --test --test-isolation=none tests/routes.test.mjs → ℹ duration_ms 13.1553)
Task 2: complete (commits cd4fc87..35b8f1f, tests: node --test --test-isolation=none tests/pages.test.mjs tests/routes.test.mjs → ℹ duration_ms 46.5074)
Final: Ruling: Regrade desktop submenu overflow as Important — a normal user opening the last menu at 761px gets horizontal scrolling/clipping; the builder visual gate requires fixing it — cost if wrong: a harmless right alignment of the last dropdown.
Final: minor (deferred): Invalid or empty category/base query values can show All selects with zero matching results; Reset restores the normal list. Normal generated links contain valid values.
Final: Ruling: Live Sites path/404 behavior was declined by reviewer because not yet deployed — verify representative published deep links and unknown page before handoff — cost if wrong: static host fallback could need a routing change.
Final: fixed query hydration and narrow-desktop dropdown — browser regressions RED→GREEN (three failures to zero), full unit suite 13/13.
Task 3: complete (commits 35b8f1f..61c0a8f, tests: node --test --test-isolation=none tests/pages.test.mjs tests/routes.test.mjs → ℹ duration_ms 45.9072)

Publication: Sites version1, source61c0a8f1ec16b61eb90f54476ba112786c1d7e78, succeeded. GitHub remote HEAD9288280. User requested no initial login; native access changed to public revision2. Anonymous Chromium: home, foods query, feed, base200; unknown food404 with readable recovery page. Original site version2 public unchanged. Local preview stopped.
