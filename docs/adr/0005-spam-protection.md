# 5. Spam protection for the contact form: honeypot first

- Status: accepted
- Date: 2026-11-17

## Context

The contact form is the site's only write endpoint. It works without JavaScript (progressive enhancement), and an E2E test enforces that. Vercel BotID was planned as invisible bot protection. But BotID's signal comes from a client-side script, so a visitor without JavaScript would be classified as a bot and their message rejected.

## Decision

Use a honeypot field only. Submissions that fill it get a fake success and are dropped. Don't add BotID, CAPTCHAs or rate limiting until real spam shows up.

## Consequences

- No extra dependency, no client script, and the form keeps working without JavaScript.
- Sophisticated bots that skip hidden fields can get through. If that happens, the next step is BotID enforced only for JS-enhanced submissions, with no-JS posts still covered by the honeypot.
