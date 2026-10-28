# Datemate MVP verification

Reviewed 28 October 2026 in the available Chrome browser, with fictional data only. Nothing has been published.

## Automated checks

- `npm test`: 14 passing business-rule tests.
- All nine payment combinations checked; exactly three compatible pairings.
- Independent acceptance, disagreement resolution and fresh agreement after a time change.
- Expiry protects confirmed/completed history and closes only open invitations.
- Expired, revoked, declined, cancelled and past-time proposals cannot confirm.
- Unrelated participants cannot accept a plan through the state model.
- Two independent yes responses create one connection; one response alone does not.
- Non-mutual interest creates no connection; on repeat dates it ends the connection and cancels open plans.
- Reflections require completed dates and cannot be overwritten.
- Ended/blocked connections close current plans, preserve history and prevent blocked mutual reactivation.
- `npm run build`: strict TypeScript checks and Vite production build pass.

## Browser journeys exercised

- Welcome → Get started → Dashboard.
- Six-step creation → generated simulated invitation link → recipient view.
- Missing venue, past availability, missing payment and short alias error states.
- Compatible payment acceptance → confirmed plan.
- James/Sophie incompatible preferences stay unconfirmed; independent revision to 50/50 resolves them.
- Running-late preset updates the shared fictional plan.
- Reschedule removes confirmation; the other participant must accept again.
- Simulated completion → first private yes → waiting state. Switching participants does not expose the first answer. Second yes → mutual state → ongoing connection.
- Existing Priya/Daniel connection, history and pending repeat invitation.
- Repeat-date creation preserves the connection recipient and marks the invitation as a repeat date.
- Simulated invitation expiry shows neutral closure and removes response actions.
- Politely declining an invitation and cancelling a confirmed date both show neutral closure without requiring an explanation.
- Optional contact consent collects no contact details.
- Ending a connection removes it from active connections.
- Local reporting and blocking, blocked entry shown in Profile.
- Alias/expiry changes persist after browser reload.
- Delete local demo data → welcome → working empty dashboard.
- Restore sample journeys restores the initial fictional dates and connections.
- Desktop and mobile navigation, profile privacy explanation and native-only future requirements reviewed.

## Responsive and interaction checks

A same-origin iframe supplies a real narrow CSS viewport in `qa/responsive.html`. This is a browser layout check, not a claim of physical-device testing.

- 390 px frame: dashboard, date actions, invitation, repeat creation, connection and profile reviewed.
- 320 px frame: confirmed-date details, reschedule dialog and payment controls exercised.
- Document scroll width matched client width on the tested narrow date screen and desktop dashboard. Tabs intentionally scroll within their own strip on mobile.
- Native modal dialogs constrain keyboard focus and support Escape; close returns focus to the opening control.
- Forms use labels and fieldsets; errors use live alerts; toasts use polite announcements.
- Visible focus outlines, touch-sized controls and reduced-motion styles are present.
- Supporting text colours were darkened during visual QA.

## Limits and follow-up

- No claim of complete WCAG conformance: full screen-reader, contrast and assistive-technology audits remain necessary. No iOS Safari, Android device or cross-browser suite was available.
- Directions, clipboard sharing and calendar/data downloads are implemented. The full external Maps journey, native sharing, calendar imports and notification delivery were not verified. Notifications are explicitly a local preference only.
- Storage fallback, unknown-link states and revocation are implemented. Business-model protections are tested; not every browser/storage denial was forced.
- No real authentication, server authorization, encrypted storage, moderation service, real invitation delivery or screenshot prevention is implemented. All UI explicitly describes these demo limits.
- All test participants share local storage; this is not a multi-user production privacy boundary.
- Date/time controls use the browser’s local timezone, described in the UI. Production scheduling should store an explicit IANA timezone and test DST transitions.
- Font loading falls back to system fonts if Google Fonts is unavailable.
- GitHub Pages workflow is prepared but manual-only and has not been run. The final public deployment and its `/datemate/` base path must be verified after publishing approval.
