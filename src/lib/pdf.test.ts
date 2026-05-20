import { describe, expect, test } from 'vitest';
import { buildOnboardingPdfHtml, escapeHtml } from './pdf';
import { OnboardingRecord } from '../types/onboarding';

describe('pdf helper', () => {
  test('escapes dangerous html sequences', () => {
    expect(escapeHtml('<script>alert("x")</script>')).toContain('&lt;script&gt;');
  });

  test('includes required section headings', () => {
    const record: OnboardingRecord = {
      id: 'rec_1',
      createdAt: '2024-01-01T00:00:00.000Z',
      staffMember: 'Coach',
      participant: { fullName: 'Client', dateOfBirth: '2013-10-10', age: 10, gender: 'Male' },
      guardian: { name: 'Parent', relationship: 'Father', phone: '1234567', email: 'a@b.com' },
      emergencyContact: { name: 'Emergency', relationship: 'Aunt', phone: '777' },
      medicalFlags: 'None.',
      goalsAndSportHistory: 'Football history.',
      maturationReadinessNotes: 'Monitor growth spurts.',
      movementScores: { squat: 3, hinge: 3, push: 3, pull: 3, lunge: 3, brace: 3, landing: 3 },
      attendanceConfidenceReadiness: 'Good.',
      coachNotes: 'Technique emphasis.'
    };

    const html = buildOnboardingPdfHtml(record);
    expect(html).toContain('Movement competency scoring');
    expect(html).toContain('Strength School Malta - Youth Onboarding Summary');
  });
});
