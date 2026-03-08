# Strength School Malta — Youth Onboarding App (Expo / React Native)

Production-focused MVP for cross-platform youth client onboarding with structured intake, validation, local record storage, and branded PDF generation.

## Assumptions made for this implementation
1. Official Strength School Malta logo and brand pack were not yet supplied; this repo keeps text-only branding placeholders to avoid binary-file PR failures in constrained tooling environments.
2. This MVP uses local device storage (`AsyncStorage`) for speed of implementation; production should move to secured backend storage and account-based access control.
3. Intake data fields are designed for internal coach planning and safeguarding, not direct clinical diagnosis.

## Stack
- React Native + Expo SDK 51
- TypeScript
- Zod validation
- Expo Print + Sharing for PDF generation
- AsyncStorage for local persistence
- Vitest for unit tests

## Features delivered
- Cross-platform intake app structure for Android/iOS/web.
- Safety-critical youth onboarding form sections:
  - Participant details
  - Guardian details
  - Emergency contacts
  - Medical flags/contraindications
  - Goals and sport history
  - Maturation/readiness notes
  - Movement competency scoring (squat/hinge/push/pull/lunge/brace/landing)
  - Attendance/confidence/readiness notes
  - Coach notes
- Strong field validation and visible input errors.
- Records view for saved onboardings.
- Branded PDF summary generation (with timestamp, staff member, section headings, defensive HTML escaping).

## Getting started

### 1) Install dependencies
```bash
npm install
```

### 2) Run app locally
```bash
npm run start
```

### 3) Open platforms
- Android: `npm run android`
- iOS: `npm run ios`
- Web: `npm run web`

## Build path (APK / iOS)
Use EAS for reliable production builds:

```bash
npm install -g eas-cli

eas build:configure

eas build --platform android

eas build --platform ios
```

For Android APK specifically (internal distribution profile), configure `eas.json` with `buildType: "apk"`.

## Quality scripts
```bash
npm run lint
npm run typecheck
npm run test
```

## Quick test (manual smoke path)
1. Open Intake tab.
2. Fill all required fields.
3. Intentionally clear `Medical flags / contraindications` and press save (should fail validation).
4. Refill medical flags and save again (record appears in Records tab).
5. In Records, press **Generate PDF summary** and verify the file shares/downloads.

## Evidence and governance docs
- Research evidence log: `docs/Research_Evidence_Log.md`
- GDPR and production hardening notes: `docs/GDPR_and_Production_Hardening.md`

## Branding integration notes
Add official brand image files under `assets/` (see `assets/branding/README.md`) and map them in `app.json` before release builds.
