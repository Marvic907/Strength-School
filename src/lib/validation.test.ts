import { describe, expect, test } from 'vitest';
import { onboardingSchema } from './validation';

const validInput = {
  staffMember: 'Coach A',
  participantFullName: 'Youth Athlete',
  participantDob: '2012-01-01',
  participantAge: 12,
  participantGender: 'Female',
  guardianName: 'Parent Name',
  guardianRelationship: 'Mother',
  guardianPhone: '12345678',
  guardianEmail: 'parent@example.com',
  emergencyName: 'Emergency Contact',
  emergencyRelationship: 'Uncle',
  emergencyPhone: '98765432',
  medicalFlags: 'No contraindications reported.',
  goalsAndSportHistory: 'Wants to improve sprint speed, currently plays football.',
  maturationReadinessNotes: 'Early puberty signs, monitor training load progression.',
  movementSquat: 3,
  movementHinge: 3,
  movementPush: 3,
  movementPull: 3,
  movementLunge: 3,
  movementBrace: 3,
  movementLanding: 3,
  attendanceConfidenceReadiness: 'Good attendance and confidence baseline.',
  coachNotes: 'Start with technique-led sessions.'
};

describe('onboarding schema', () => {
  test('accepts valid onboarding data', () => {
    const result = onboardingSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  test('rejects missing safety-critical medical flags', () => {
    const result = onboardingSchema.safeParse({ ...validInput, medicalFlags: '' });
    expect(result.success).toBe(false);
  });
});
