# GDPR-Conscious Design Notes & Production Hardening Checklist

## GDPR-conscious design notes

### 1) Lawful basis
- Primary lawful basis: **legitimate interests** for coaching service operations and safeguarding; **explicit consent** where sensitive health data processing is required.
- Keep lawful basis documented in onboarding policy and surfaced in staff SOP.

### 2) Consent handling
- Add explicit guardian acknowledgement checkbox for medical and emergency data use.
- Store consent timestamp, collector identity (staff member), and policy version.

### 3) Data minimization and purpose limitation
- Intake captures only data needed for safe youth program planning.
- Avoid free-text over-collection by clear prompts and staff training.

### 4) Retention policy
- Define retention periods by category (e.g., active client + fixed archive period).
- Add purge/anonymization workflow for expired records.

### 5) Access controls
- Production deployment must enforce role-based access (coach/admin).
- Device-level protection (PIN/biometric), backend token expiration, and least privilege.

### 6) Auditability
- Log create/update/export PDF actions with user ID and timestamp.
- Keep immutable audit trail for safeguarding incidents and data-access requests.

### 7) Security controls
- Encrypt data in transit (TLS) and at rest.
- If offline cache is used, encrypt local store and define wipe policy for lost devices.

## Production hardening checklist
- [ ] Replace local AsyncStorage with secure backend (PostgreSQL + API) and authenticated accounts.
- [ ] Add end-to-end encryption for sensitive data where feasible.
- [ ] Add consent capture fields and policy versioning to the data model.
- [ ] Add structured audit log service and alerting.
- [ ] Implement role-based authorization checks server-side.
- [ ] Add automated backups and restore drills.
- [ ] Add Sentry/crash reporting and error boundaries.
- [ ] Add CI pipeline (lint, typecheck, tests, build checks).
- [ ] Add mobile release signing and environment secret management (EAS secrets).
- [ ] Add DPIA (Data Protection Impact Assessment) before production go-live.
