# Figma Make Prompt — Datemate

## Product Overview

**Product name:** Datemate  
**Tagline:** Dating, without the drama.  
**Supporting proposition:** Less anxiety. More dating.

Design and build **Datemate**, a polished, mobile-first digital product that helps people arrange dates, protect their privacy and reduce the anxiety associated with modern dating.

Datemate is designed for people who have already matched or connected through platforms such as Hinge, Bumble or Tinder.

It provides a private, structured space to arrange real-world dates without exchanging phone numbers, sharing social media accounts or engaging in endless messaging.

Unlike traditional dating apps, Datemate does not offer matchmaking, swiping, unrestricted chat or public dating profiles.

**Its primary purpose is to reduce the uncertainty, communication pressure and emotional exhaustion associated with dating.**

Datemate supports both first dates and ongoing dating connections, allowing people to continue arranging dates through the product for as long as they both wish.

Build a high-fidelity, functional, responsive prototype with realistic UK sample data, reusable components, meaningful interactions and accessible layouts.

## 1. The Problem

Modern dating can create unnecessary anxiety.

People match on dating apps but often spend days or weeks messaging without making plans. They may feel pressured to move conversations to WhatsApp or Instagram before establishing trust.

Once personal contact details have been shared, it becomes harder to maintain boundaries.

Ghosting, unanswered messages, read receipts and online activity indicators can encourage repeated checking and overthinking.

People also encounter uncertainty about practical arrangements, including availability, locations, budgets and payment expectations.

Even after a successful first date, there is often pressure to exchange phone numbers or begin constant messaging.

**How might Datemate make arranging and continuing dates feel calmer, clearer and more private, while giving both people control over their boundaries?**

## 2. Target Users

### Emma — The Cautious Romantic

**38, Brighton, Marketing Manager**

Emma wants to meet someone meaningful but finds early dating emotionally exhausting.

She dislikes repeatedly checking WhatsApp to see whether someone has replied.

She wants to arrange dates without bringing strangers into her personal messaging space.

**Needs**

- Clear arrangements.
- Fewer ambiguous interactions.
- No read receipts or online status.
- Neutral invitation expiry.
- Control over ongoing connections.
- The option to continue dating without exchanging numbers.

### Priya — The Privacy-Conscious Professional

**32, London, Financial Analyst**

Priya wants to meet people while maintaining control over her personal information.

She is cautious about sharing contact details and wants to feel safe when declining invitations.

**Needs**

- Private aliases.
- No unnecessary personal information.
- Restricted access to date details.
- Expiring and revocable invitations.
- Blocking and reporting.
- Screenshot protection where supported.
- Control over whether and when to exchange contact information.

### James — The Intentional Dater

**41, Manchester, Project Manager**

James prefers meeting people in person rather than messaging endlessly.

He wants to arrange dates efficiently and understand expectations beforehand.

**Needs**

- Simple scheduling.
- Clear confirmation.
- Practical information in one place.
- Transparent budget and payment expectations.
- Easy repeat-date invitations.
- No unnecessary back-and-forth.

## 3. Core Design Principles

### 1. Emotional Wellbeing First

Every interaction should minimise avoidable uncertainty and communication pressure.

- No read receipts.
- No online status.
- No typing indicators.
- No engagement streaks.
- No popularity scores.
- No pressure to respond immediately.
- No emotionally manipulative notifications.
- No public rejection indicators.
- No endless scrolling or social feeds.

Use calm, neutral and reassuring language.

### 2. Privacy by Design

Protect users by collecting and exposing as little personal information as possible.

- Use display names or aliases.
- Do not require exchanging phone numbers.
- Do not display email addresses to other users.
- Do not expose surnames by default.
- Do not expose home addresses or live locations.
- Allow invitations and connections to be revoked.
- Restrict access to private date information.
- Allow users to block and report.
- Provide clear account deletion controls.

### 3. Purposeful Communication

Datemate is not a messaging app.

Use structured interactions that help people make, change or conclude plans.

### 4. Mutual Control

Both people should independently agree to dates, expectations and ongoing connections.

### 5. Support Real-World Relationships

Encourage people to spend less time managing digital conversations and more time meeting in person.

### 6. Honest Privacy Promises

Never claim that content is completely private, impossible to capture or guaranteed secure.

Communicate the actual protections provided.

## 4. Screenshot and Screen Recording Protection

Design Datemate with screenshot and screen recording protection as an important privacy consideration.

### Native Android

For a future native Android implementation, use `FLAG_SECURE` on sensitive screens to prevent standard screenshots and screen recordings where supported.

### Native iOS

For a future native iOS implementation, detect active screen capture where supported and obscure sensitive content during recording or screen sharing.

Do not claim that ordinary iOS screenshots can be reliably blocked.

### Web Application

The Figma Make prototype is web-based.

Web browsers cannot reliably prevent screenshots, screen recordings or external photography.

Do not implement fake screenshot-blocking functionality or misleading protection indicators.

Instead, design effective privacy controls:

- Minimise sensitive content.
- Hide personal contact details.
- Restrict access to private invitations.
- Use expiring invitation links.
- Allow users to revoke access.
- Avoid displaying unnecessary identifying information.
- Provide privacy notices that accurately describe limitations.

### Sensitive Screen Behaviour

Explore a reusable privacy overlay component for native implementation.

Include an informational explanation:

"Datemate limits access to your personal information and supports screen capture protection where available. No app can prevent every form of recording."

For the prototype, label native-only functionality as a future implementation requirement rather than a working web security feature.

## 5. Core Features

### Private Date Invitations

Users can:

- Create a private date invitation.
- Select a date type.
- Propose dates and times.
- Choose a public meeting location.
- Set an approximate budget.
- Specify a payment preference.
- Generate a shareable invitation link.
- Copy the link into an existing dating app.
- Revoke an invitation.
- Set invitation expiry.

Default expiry: **48 hours**.

Recipients should be able to open invitations in their mobile browser without downloading an app.

### Structured Responses

Offer:

- Accept Invitation.
- Suggest Another Time.
- Suggest Another Location.
- Suggest Another Arrangement.
- Politely Decline.

For confirmed dates:

- I'm Running Late.
- Reschedule.
- Cancel Date.

Avoid unrestricted free-text chat.

### Payment Expectations

Include exactly three options:

**Treat me**  
I'd prefer my date to pay.

**My treat**  
I'm happy to pay for both of us.

**50/50**  
Let's split the bill.

Both participants select independently.

Compatibility rules:

- Treat me + My treat: compatible.
- My treat + Treat me: compatible.
- 50/50 + 50/50: compatible.
- All other combinations: requires resolution.

If preferences differ, show:

"You've selected different payment preferences. Would you like to find an arrangement that works for you both?"

Allow either person to revise their selection.

Do not confirm the arrangement until both agree.

Treat payment expectations as a secondary feature, not the main product proposition.

### Invitation Expiry and Closure

- Invitations expire automatically.
- Expired invitations are archived.
- Do not use anxiety-inducing countdowns.
- Do not reveal whether an invitation was read.
- Do not repeatedly prompt users to chase unanswered invitations.
- Use neutral closure messages.

Example:

"This invitation has expired. No further action is needed."

### Ongoing Dating Connections

This is a core Datemate feature.

After a first date, both participants can privately indicate whether they would like to meet again.

If both select Yes, create an ongoing private connection.

Within that connection, either participant can:

- Suggest another date.
- Review upcoming plans.
- Review previous dates.
- Accept or counter-propose invitations.
- Manage privacy preferences.
- Continue using Datemate without exchanging phone numbers.
- Mutually agree to exchange contact details.
- End the connection.

Do not automatically share contact information when a connection becomes ongoing.

A successful date should never force users to move to WhatsApp or Instagram.

### Post-Date Mutual Interest

Ask each person privately:

"Would you like to see them again?"

Options:

- Yes, I'd Like To.
- Not This Time.

Only reveal mutual interest when both choose Yes.

If both choose Yes:

"It's mutual! You'd both like to meet again."

Offer:

- Suggest Another Date.
- View Connection.

If interest is not mutual, close the connection respectfully.

Never reveal an individual's private rejection decision.

### Safety

- Encourage public meeting places.
- Allow users to share date details with a trusted person.
- Provide block and report controls.
- Allow cancellation without explanation.
- Do not expose live locations.
- Avoid implying that users are identity verified unless actual verification exists.

## 6. Information Architecture

Create four main navigation destinations:

1. **My Dates** — Upcoming, pending and completed dates.
2. **Connections** — People with whom mutual ongoing dating has been established.
3. **Create** — Create a new invitation.
4. **Profile** — Privacy, preferences and account settings.

Keep navigation minimal and consistent.

## 7. Design Nine Connected Screens

### Screen 1 — Welcome / Onboarding

Prominent Datemate wordmark.

**Headline:** Dating, without the drama.

**Supporting copy:** Make plans, protect your privacy and keep dating without the pressure of endless messaging.

Three benefits:

- Keep your number private.
- Make plans without endless chat.
- Date at your own pace.

Actions:

- Get Started.
- How It Works.

### Screen 2 — My Dates Dashboard

Show:

- Upcoming Dates.
- Invitations Requiring Action.
- Awaiting Response.
- Completed Dates.

Each card includes:

- Alias.
- Date type.
- Date and time.
- General location.
- Status.
- Next relevant action.

Primary CTA: Create Invitation.

No messaging inbox.

### Screen 3 — Create Date Invitation

Guided flow:

1. Choose date type: Coffee, Drinks, Dinner, Walk or Activity.
2. Select availability.
3. Choose public meeting area or venue.
4. Set approximate budget.
5. Choose payment preference.
6. Review details.
7. Generate private link.

Include validation, editable steps, progress indication and a copy-link confirmation.

### Screen 4 — Respond to Invitation

Display:

- Sender's alias.
- Date proposal.
- Available times.
- Location.
- Budget.
- Sender's payment preference.
- Invitation expiry.

Actions:

- Accept.
- Suggest Alternative.
- Politely Decline.

Require mutual agreement on payment and other essential arrangements before confirmation.

### Screen 5 — Confirmed Date

Display:

- Alias.
- Date and time.
- Agreed public venue.
- Date type.
- Budget.
- Agreed payment preference.
- Confirmation status.

Actions:

- Directions.
- Add to Calendar.
- Share Date Details.
- Running Late.
- Reschedule.
- Cancel.

### Screen 6 — Post-Date Reflection

Ask:

"Would you like to see them again?"

Actions:

- Yes, I'd Like To.
- Not This Time.

Include mutual interest, waiting and neutral closure states.

Never expose private rejection decisions.

### Screen 7 — Connections

Display ongoing mutual connections.

Each connection card includes:

- Alias.
- Last date.
- Upcoming date, if any.
- Pending invitation status.
- Suggest Another Date action.

Include empty state:

"When you both want to meet again, your connection will appear here."

No social feed, typing indicators or read receipts.

### Screen 8 — Connection Details

Show:

- Person's alias.
- Upcoming date.
- Previous dates.
- Pending invitations.
- Suggest Another Date.
- Privacy and connection settings.
- End Connection.

Allow repeated dates to be arranged using the same structured invitation flow.

Do not require contact detail exchange.

### Screen 9 — Profile / Privacy Settings

Include:

- Alias.
- Notifications.
- Invitation expiry.
- Privacy information.
- Screenshot protection explanation.
- Blocked connections.
- Reporting.
- Data management.
- Delete account.

Explain that screenshot blocking is limited by platform capabilities.

## 8. Visual Identity

**Brand:** Datemate  
**Tagline:** Dating, without the drama.

Brand personality:

- Warm.
- Friendly.
- Playful.
- Contemporary.
- Calm.
- Trustworthy.
- Inclusive.
- Emotionally considerate.

Visual style:

- Premium mobile-first interface.
- Warm neutral backgrounds.
- A distinctive but restrained accent colour.
- Contemporary typography.
- Generous whitespace.
- Rounded cards and controls.
- Clear hierarchy.
- Subtle motion.
- Accessible contrast.

Explore a Datemate wordmark with a simple abstract icon suggesting connection, reassurance or a confirmed plan.

Avoid conventional dating-app clichés such as swiping interfaces, excessive hearts, bright pink gradients and gamified engagement.

Design for calm confidence rather than excitement-driven engagement.

## 9. Reusable Components

Create reusable components for:

- Navigation.
- Date cards.
- Connection cards.
- Invitation cards.
- Status indicators.
- Date/time selection.
- Location selection.
- Budget selection.
- Payment preference cards.
- Preset responses.
- Privacy notices.
- Confirmation states.
- Empty states.
- Modal dialogs.
- Toast notifications.
- Privacy overlays for future native implementation.

## 10. Functional Prototype

Build a genuinely interactive prototype using local mock data and client-side state.

Support:

1. Completing onboarding.
2. Creating invitations.
3. Selecting dates and locations.
4. Choosing payment preferences.
5. Generating simulated shareable links.
6. Switching between sender and recipient views.
7. Accepting, declining and counter-proposing.
8. Resolving payment disagreements.
9. Confirming dates.
10. Rescheduling and cancelling.
11. Simulating invitation expiry.
12. Completing a date.
13. Recording private post-date interest.
14. Simulating mutual interest.
15. Creating an ongoing connection.
16. Suggesting repeat dates.
17. Viewing date history.
18. Ending a connection.
19. Managing privacy settings.

Provide a clearly labelled prototype testing control to switch between participants.

Persist local state where practical.

Do not present simulated access controls or screenshot protections as real production security.

## 11. Sample Data

**Emma and Alex — Brighton**

First date: Coffee, Saturday at 2:00 PM.  
Budget: £10–£20.  
Emma: Treat me.  
Alex: My treat.  
Status: Confirmed.

**Priya and Daniel — London**

First date: Drinks, Thursday at 7:00 PM.  
Budget: £20–£40.  
Both: 50/50.  
Status: Completed.  
Post-date outcome: Mutual interest.  
Connection: Active.

**James and Sophie — Manchester**

First date: Walk and coffee, Sunday at 11:00 AM.  
Budget: Under £10.  
James: My treat.  
Sophie: 50/50.  
Status: Awaiting agreement.

Include additional examples of expired invitations, pending responses, repeat dates and ended connections.

## 12. Accessibility

Follow WCAG 2.2 AA principles.

Support:

- Keyboard navigation.
- Visible focus indicators.
- Accessible contrast.
- Proper form labels.
- Screen reader announcements.
- Clear error messages.
- Accessible date and time selectors.
- Reduced motion.
- Large touch targets.
- Non-colour status indicators.

## 13. Success Measures

Datemate should help people:

- Arrange dates with less unnecessary communication.
- Maintain privacy before trust is established.
- Reduce repeated checking and ambiguity.
- Agree on practical expectations.
- Decline invitations comfortably.
- Continue dating without exchanging personal contact information.
- Feel more in control of their dating experience.

Potential research and product metrics:

- Time to confirmed date.
- Invitation-to-confirmation conversion.
- Number of messages avoided compared with existing methods.
- Percentage of dates arranged without exchanging contact information.
- Repeat-date invitation rate.
- User-reported confidence and perceived anxiety.
- Perceived control over personal boundaries.

## Final Build Instructions

Create a cohesive, polished, responsive Datemate prototype with nine connected screens.

**Emotional wellbeing and privacy are the primary product priorities.**

Support the complete journey from private first-date invitation to ongoing repeat dates.

Use structured communication instead of unrestricted messaging.

Keep payment expectations secondary.

Implement screenshot protection honestly, recognising that a web prototype cannot prevent screenshots and that native platforms have different limitations.

Make the prototype functional, realistic, accessible and visually consistent.

**Datemate — Dating, without the drama.**
