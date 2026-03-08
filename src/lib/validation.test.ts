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
  guardianPhone: '+356 1234 5678',
  guardianEmail: 'parent@example.com',
  emergencyName: 'Emergency Contact',
  emergencyRelationship: 'Uncle',
  emergencyPhone: '+356 9876 5432',
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

  test('rejects invalid date format', () => {
    const result = onboardingSchema.safeParse({ ...validInput, participantDob: '01/01/2012' });
    expect(result.success).toBe(false);
  });

  test('trims whitespace before validating required text fields', () => {
    const result = onboardingSchema.safeParse({ ...validInput, staffMember: '   Coach A  ' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.staffMember).toBe('Coach A');
    }
  });
});
