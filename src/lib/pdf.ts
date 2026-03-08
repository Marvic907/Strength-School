import { OnboardingRecord } from '../types/onboarding';

export const escapeHtml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const section = (title: string, body: string) => `
<section>
  <h2>${title}</h2>
  ${body}
</section>
`;

const row = (label: string, value: string | number) =>
  `<p><strong>${label}:</strong> ${escapeHtml(String(value || 'N/A'))}</p>`;

export const buildOnboardingPdfHtml = (record: OnboardingRecord): string => `
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
body { font-family: Arial, sans-serif; color: #1A1A1A; font-size: 12px; margin: 28px; }
h1 { color: #0B1F3A; margin-bottom: 4px; }
h2 { color: #0B1F3A; margin: 12px 0 6px; border-bottom: 1px solid #ddd; padding-bottom: 4px; }
header { border-bottom: 3px solid #F58220; margin-bottom: 12px; padding-bottom: 8px; }
.meta { color: #5D6470; font-size: 11px; }
section { margin-bottom: 8px; }
</style>
</head>
<body>
  <header>
    <h1>Strength School Malta - Youth Onboarding Summary</h1>
    <p class="meta">Generated: ${escapeHtml(record.createdAt)} | Staff: ${escapeHtml(record.staffMember)} | Record ID: ${escapeHtml(record.id)}</p>
  </header>
  ${section('Participant details', [
    row('Full name', record.participant.fullName),
    row('DOB', record.participant.dateOfBirth),
    row('Age', record.participant.age),
    row('Gender', record.participant.gender)
  ].join(''))}
  ${section('Guardian / parent details', [
    row('Name', record.guardian.name),
    row('Relationship', record.guardian.relationship),
    row('Phone', record.guardian.phone),
    row('Email', record.guardian.email)
  ].join(''))}
  ${section('Emergency contact', [
    row('Name', record.emergencyContact.name),
    row('Relationship', record.emergencyContact.relationship),
    row('Phone', record.emergencyContact.phone)
  ].join(''))}
  ${section('Medical flags / contraindications', row('Notes', record.medicalFlags))}
  ${section('Goals and sport participation history', row('Notes', record.goalsAndSportHistory))}
  ${section('Maturation/readiness notes', row('Notes', record.maturationReadinessNotes))}
  ${section('Movement competency scoring', [
    row('Squat', record.movementScores.squat),
    row('Hinge', record.movementScores.hinge),
    row('Push', record.movementScores.push),
    row('Pull', record.movementScores.pull),
    row('Lunge', record.movementScores.lunge),
    row('Brace', record.movementScores.brace),
    row('Landing', record.movementScores.landing)
  ].join(''))}
  ${section('Attendance/confidence/readiness notes', row('Notes', record.attendanceConfidenceReadiness))}
  ${section('Coach notes', row('Notes', record.coachNotes))}
</body>
</html>
`;
