# Chinder

A dating-app mockup where executives meet admirers who are very, very interested
in their companies.

All characters are fictional adults. All photos are AI-generated. No real people,
real executives, or real companies are depicted or referenced.

## Flow

1. **Screening** - "Are you a CEO?" Yes takes you straight in. No leads to a
   short ladder of follow-up questions (other C-suite? VP? senior engineer?
   observant intern?). Any yes lets you in; all no gets you "Oh well, you can
   still try it."
2. **Swipe deck** - 40 profiles. Swipe right (or tap the heart) and it's an
   instant match, every time. They always like you back. They're motivated.
3. **Chat** - your match opens by asking whether your company makes GPUs
   (everyone asks; everyone phrases it differently), then keeps digging with
   her own questions. Some are Yes/No, others give you a few answers to pick
   from. After a while she starts ghosting you - typing dots that die, read
   receipts, "last seen". A free-text box unlocks as the ghosting begins, for
   maximum humiliation. Every match has her own questions, tone and ghosting
   style.
4. **Matches inbox** - the chat icon on the deck opens your match list. Each
   match keeps her own conversation where you left it, so you can hop between
   chats and the deck and experience them all.

## Privacy

Everything runs locally in the browser. No answers, messages, or swipes are
sent anywhere; there are no network calls, no analytics, no storage beyond the
page session.

## Tech

Plain HTML/CSS/JS, no build step. Deployed to GitHub Pages via
`.github/workflows/deploy-pages.yml` (static artifact from the repo root).

Run locally: `python3 -m http.server` in this directory, then open
http://localhost:8000/.
