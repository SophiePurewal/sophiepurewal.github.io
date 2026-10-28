> Deployment update: Datemate is being added to the existing SophiePurewal/sophiepurewal.github.io Pages site under /datemate/. The original standalone repository and workflow instructions below are retained as historical build notes. Use ../README.md for maintaining this deployment.

# Datemate

**Dating, without the drama.** Less anxiety. More dating.

A mobile-first React 19 and TypeScript prototype for structured date planning and ongoing mutual connections. Built from the supplied nine-screen specification. All participants and plans are fictional.

## Run locally

Requires Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open the printed Vite URL. Use the top **Testing as** control to view each fictional participant independently.

```sh
npm test       # Business-rule tests, including the complete 3 × 3 payment matrix
npm run build # Strict TypeScript checks and production bundle
npm run preview
```

## Nine screens

1. Welcome: benefits and a concise how-it-works explanation.
2. My Dates: upcoming, needs you, awaiting response, completed and archived plans.
3. Create: editable six-step invitation flow with date type, up to three availability options, public venue, budget, payment preference and review.
4. Respond: independent payment preferences, acceptance, structured time/location/arrangement alternatives, neutral decline, revocation and expiry.
5. Confirmed date: directions, downloadable calendar event, copyable trusted-person details, preset late updates, reschedule and cancel.
6. Reflection: independent private choices, waiting, mutual interest and neutral closure.
7. Connections: active mutual connections, upcoming and pending plans, repeat dates and ended connections.
8. Connection details: previous dates, current plans, repeat-date invitations, optional simulated contact-exchange consent and ending/blocking.
9. Profile: fictional alias, local preferences, expiry default, accurate privacy information, blocking, local demo reports, export and deletion.

Routing uses URL hashes so direct routes work on GitHub Pages without server rewrites. Vite's relative asset base supports the `/datemate/` project path.

## Suggested review journeys

- **Emma / Alex:** confirmed coffee → running late / reschedule → simulate completion → each independently answers yes → connection → repeat invitation.
- **James / Sophie:** open the awaiting-agreement walk. Sophie accepts with 50/50; it stays unresolved. Switch to James and revise to 50/50. The plan confirms.
- **Priya / Daniel:** existing mutual connection and completed drinks → pending repeat dinner → accept, counter-propose or suggest another date.
- **Emma / Rowan:** incoming coffee invitation → decline or simulate expiry. Expired plans appear in Archived.
- Use **Profile → Restore sample journeys** to restore the fictional data.

`qa/responsive.html` is a development-only frame for 320, 360, 390, 430 and 768 px browser checks. It is not included in the production bundle. See `qa/VERIFICATION.md` for actual test scope and known limitations.

## Honest privacy boundaries

This is a **client-only fictional prototype**, not a real dating service:

- No server, authentication, real account, identity verification or secure invitation tokens.
- All fictional participants, including private choices, exist in shared browser local storage. The UI hides individual answers from the other participant, but browser data is inspectable.
- Links identify local demo plans only. They do not transfer plans to another device or provide secure access. Expiry and revocation are local state transitions.
- Browser screenshots, recording and external photography cannot be prevented. Native protections are documented future requirements only.
- Blocking, reports, notifications and contact consent are local demonstrations. No messages, push notifications or moderation reports are sent. No phone numbers or contact details are collected.
- Calendar export downloads an ICS file. Trusted-person sharing copies text after review; it does not message anyone. Directions open Google Maps with the fictional public venue.
- No analytics or tracking SDK. Fonts use Google Fonts with system fallbacks.
- Do not enter real dating information. Clear data in Profile when finished.

A production version would need authenticated server-side authorization for every resource, revocable scoped invitation tokens, server-enforced expiry, a properly isolated persistence model, abuse handling and moderation, deletion/export infrastructure, security testing and accessibility testing with assistive technology.

## GitHub and Pages: approval required

The repository and site have **not been published**. Source includes a manual-only deployment workflow; there is deliberately no deploy-on-push trigger.

After Sophie reviews and explicitly approves:

1. Create a new repository named `datemate` in the chosen GitHub account, initially private. Do not initialise it with a README.
2. Push the prepared source and commit. Review visibility separately before making the repository public.
3. In repository Settings → Pages, select **GitHub Actions** as the source. Repository visibility and Pages availability depend on the account plan.
4. Only after publishing approval, run **Publish approved prototype to GitHub Pages** manually from Actions. The workflow tests, builds and deploys `dist/`.
5. Review the returned Pages URL and test navigation and simulated links at the actual `/datemate/` URL.

Do not put credentials, personal data or local test state into the repository.
