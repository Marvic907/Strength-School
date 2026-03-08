import { z } from 'zod';

const score = z.number().int().min(1).max(5);
const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
const phoneRegex = /^[0-9+()\-\s]{7,20}$/;

const cleanText = (minimum: number, message: string) =>
  z.string().trim().min(minimum, message).max(1000, 'Input is too long');

export const onboardingSchema = z.object({
  staffMember: cleanText(2, 'Staff member name is required'),
  participantFullName: cleanText(2, 'Participant full name is required'),
  participantDob: z
    .string()
    .trim()
    .regex(dobRegex, 'Date of birth must use YYYY-MM-DD format'),
  participantAge: z.coerce.number().int().min(5).max(21),
  participantGender: cleanText(1, 'Gender is required'),
  guardianName: cleanText(2, 'Guardian name is required'),
  guardianRelationship: cleanText(2, 'Guardian relationship is required'),
  guardianPhone: z.string().trim().regex(phoneRegex, 'Valid guardian phone is required'),
  guardianEmail: z.string().trim().email('Valid guardian email is required'),
  emergencyName: cleanText(2, 'Emergency contact name is required'),
  emergencyRelationship: cleanText(2, 'Emergency contact relationship is required'),
  emergencyPhone: z.string().trim().regex(phoneRegex, 'Valid emergency contact phone is required'),
  medicalFlags: cleanText(5, 'Medical flags/contraindications are required for safety'),
  goalsAndSportHistory: cleanText(5, 'Goals and sport history are required'),
  maturationReadinessNotes: cleanText(5, 'Maturation/readiness notes are required'),
  movementSquat: score,
  movementHinge: score,
  movementPush: score,
  movementPull: score,
  movementLunge: score,
  movementBrace: score,
  movementLanding: score,
  attendanceConfidenceReadiness: cleanText(5, 'Attendance/confidence/readiness notes are required'),
  coachNotes: cleanText(2, 'Coach notes are required')
});

export type OnboardingFormInput = z.infer<typeof onboardingSchema>;
