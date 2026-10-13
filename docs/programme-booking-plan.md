# CGC programme-based booking implementation

## Confirmed programme rules
- Open, age-restricted: Recreational Gymnastics 4–7 (£57/month), 6–8 (£35/month), 6–12 (£35/month), 7–12 (£35/month). One chosen weekly slot; all its occurrences are covered.
- Invitation-only, one chosen weekly slot: Recreational Plus (£57.50/month).
- Invitation-only, all scheduled days included: Development WAG (£105/month; Tuesday and Thursday); Novice WAG Junior (£105/month; Tuesday and Thursday, 6:30–8:30pm); Novice WAG Senior (£105/month; Tuesday and Thursday); WAG 1 and WAG 2 (£160/month; Wednesday, Friday and Saturday).
- Per-session: Stay and Play (£6.50), Adult Child Structured (£7.50), Home Education (£10).
- Monthly fees are for the programme, not per scheduled occurrence. Existing website FAQ states 46 training weeks are spread over 12 monthly payments. Confirm renewal/payment collection mechanics before implementing Stripe billing.

## Implemented safely
Migration `add_staff_class_invitations_secure_foundation` creates `public.portal_class_invitations` with child/programme approval, staff identity, timestamps and revocation. RLS enabled, no anon/authenticated table access. The table stores eligibility only, not bookings or payment.

## Next implementation steps (not yet live)
1. Add staff API endpoints to view a child and grant/revoke programme eligibility, authenticating staff via Supabase JWT and checking active staff role server-side. Audit every change.
2. Add parent API endpoint to read approvals for their own child, verifying parent-child relationship server-side.
3. Implement canonical programme and session catalogue in server-side checkout. Never trust client-provided price, class eligibility or age.
4. Add monthly programme enrolment and linked weekly occurrences; enforce capacity for each included session and prevent duplicate active enrolments. Preserve existing booking rows and Sessions input; plan migration/backfill carefully.
5. Charge a single programme monthly amount and persist enrolment only upon verified Stripe payment/webhook; retain test mode until reviewed. Handle cancellation, renewals and schedule changes.
6. Build staff invitation controls and parent booking UI, then test with sample accounts before publishing.
7. Confirm how new monthly payments renew; Novice WAG Junior is confirmed for Tuesday and Thursday, 6:30–8:30pm.

Do not treat the existing per-session checkout as safe for new monthly bookings until all checks are in place.
