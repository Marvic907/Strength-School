export type MovementPattern = 'squat' | 'hinge' | 'push' | 'pull' | 'lunge' | 'brace' | 'landing';

export type OnboardingRecord = {
  id: string;
  createdAt: string;
  staffMember: string;
  participant: {
    fullName: string;
    dateOfBirth: string;
    age: number;
    gender: string;
  };
  guardian: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalFlags: string;
  goalsAndSportHistory: string;
  maturationReadinessNotes: string;
  movementScores: Record<MovementPattern, number>;
  attendanceConfidenceReadiness: string;
  coachNotes: string;
};
