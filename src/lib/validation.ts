import { z } from 'zod';

const score = z.number().int().min(1).max(5);

export const onboardingSchema = z.object({
  staffMember: z.string().min(2, 'Staff member name is required'),
  participantFullName: z.string().min(2, 'Participant full name is required'),
  participantDob: z.string().min(4, 'Date of birth is required'),
  participantAge: z.coerce.number().int().min(5).max(21),
  participantGender: z.string().min(1, 'Gender is required'),
  guardianName: z.string().min(2, 'Guardian name is required'),
  guardianRelationship: z.string().min(2, 'Guardian relationship is required'),
  guardianPhone: z.string().min(7, 'Guardian phone is required'),
  guardianEmail: z.string().email('Valid guardian email is required'),
  emergencyName: z.string().min(2, 'Emergency contact name is required'),
  emergencyRelationship: z.string().min(2, 'Emergency contact relationship is required'),
  emergencyPhone: z.string().min(7, 'Emergency contact phone is required'),
  medicalFlags: z.string().min(5, 'Medical flags/contraindications are required for safety'),
  goalsAndSportHistory: z.string().min(5, 'Goals and sport history are required'),
  maturationReadinessNotes: z.string().min(5, 'Maturation/readiness notes are required'),
  movementSquat: score,
  movementHinge: score,
  movementPush: score,
  movementPull: score,
  movementLunge: score,
  movementBrace: score,
  movementLanding: score,
  attendanceConfidenceReadiness: z.string().min(5, 'Attendance/confidence/readiness notes are required'),
  coachNotes: z.string().min(2, 'Coach notes are required')
});

export type OnboardingFormInput = z.infer<typeof onboardingSchema>;
