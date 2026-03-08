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

## Simple GitHub preview setup (for beginners)
If your deployed link opens GitHub instead of the app, follow these exact steps:

1. Open your repository on GitHub.
2. Click **Settings** → **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Click **Actions** tab in the repository.
5. You should see a workflow named **Deploy Web Preview (GitHub Pages)**.
6. Click that workflow, then click **Run workflow**.
7. Wait until both jobs are green (**build** and **deploy**).
8. Go back to **Settings** → **Pages** and open the provided site URL.

### If the workflow does not start
1. Go to **Settings** → **Actions** → **General**.
2. In **Actions permissions**, choose **Allow all actions and reusable workflows**.
3. In **Workflow permissions**, choose **Read and write permissions**.
4. Save.
5. Re-run **Deploy Web Preview (GitHub Pages)** from the **Actions** tab.

### If the workflow fails on install
- This project depends on npm registry access. If your organization blocks npm packages, ask your admin to allow `registry.npmjs.org`.


## Why you are seeing "Choose a workflow"
That screen means GitHub cannot find a workflow file on your **default branch** yet.

### Quick fix (very simple)
1. Go to **Code** tab and check this file exists on GitHub: `.github/workflows/deploy-web-preview.yml`
2. If not there, push your latest branch to GitHub.
3. Open **Settings → Branches** and confirm your default branch (usually `main` or `work`).
4. Make sure the workflow file exists on that default branch.
5. Go to **Actions** and run **Deploy Web Preview (GitHub Pages)**.

### One-click checks
- If Actions tab still shows "Choose a workflow", the workflow file is not on default branch yet.
- If Actions runs but Pages link is blank, set **Settings → Pages → Source = GitHub Actions**.
