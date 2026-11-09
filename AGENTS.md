# Working in this repo

Workflow decisions agreed with the repo owner (same rules as the other
SoundGuyAI app repos):

- One focused change per PR. New work goes on a new branch and PR, not
  straight to main.
- PR titles and descriptions are written by the agent; merging waits for the
  owner's explicit go-ahead for that specific PR. Docs-only PRs are exempt.
- Request Codex review on app PRs by commenting `@codex review`.
- Update TODO.md after each PR: mark done items, add new ones, keep the
  numbering stable.
- CI/Pages deploys skip docs-only changes (`paths-ignore: '**.md'`).
- Content rules for this app: all characters are fictional adults, no real
  people or companies are named, and nothing the user types may leave the
  browser (no analytics, no beacons, no form posts).
