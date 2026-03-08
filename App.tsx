import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { FormField } from './src/components/FormField';
import { theme } from './src/constants/theme';
import { buildOnboardingPdfHtml } from './src/lib/pdf';
import { OnboardingFormInput, onboardingSchema } from './src/lib/validation';
import { loadRecords, saveRecord } from './src/lib/storage';
import { OnboardingRecord } from './src/types/onboarding';

type Errors = Partial<Record<keyof OnboardingFormInput, string>>;

const initialState: OnboardingFormInput = {
  staffMember: '',
  participantFullName: '',
  participantDob: '',
  participantAge: 12,
  participantGender: '',
  guardianName: '',
  guardianRelationship: '',
  guardianPhone: '',
  guardianEmail: '',
  emergencyName: '',
  emergencyRelationship: '',
  emergencyPhone: '',
  medicalFlags: '',
  goalsAndSportHistory: '',
  maturationReadinessNotes: '',
  movementSquat: 3,
  movementHinge: 3,
  movementPush: 3,
  movementPull: 3,
  movementLunge: 3,
  movementBrace: 3,
  movementLanding: 3,
  attendanceConfidenceReadiness: '',
  coachNotes: ''
};

const scoreFieldMap = [
  ['Squat', 'movementSquat'],
  ['Hinge', 'movementHinge'],
  ['Push', 'movementPush'],
  ['Pull', 'movementPull'],
  ['Lunge', 'movementLunge'],
  ['Brace', 'movementBrace'],
  ['Landing', 'movementLanding']
] as const;

export default function App() {
  const [form, setForm] = useState<OnboardingFormInput>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [records, setRecords] = useState<OnboardingRecord[]>([]);
  const [tab, setTab] = useState<'intake' | 'records'>('intake');

  useEffect(() => {
    loadRecords().then(setRecords);
  }, []);

  const handleText = (key: keyof OnboardingFormInput, value: string) => {
    setForm((current) => ({ ...current, [key]: key === 'participantAge' ? Number(value || 0) : value }));
  };

  const validate = (): boolean => {
    const parsed = onboardingSchema.safeParse(form);
    if (parsed.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: Errors = {};
    parsed.error.errors.forEach((issue) => {
      const key = issue.path[0] as keyof OnboardingFormInput;
      fieldErrors[key] = issue.message;
    });
    setErrors(fieldErrors);
    Alert.alert('Validation failed', 'Please complete required safety-critical sections.');
    return false;
  };

  const toRecord = useMemo(
    () => ():
      OnboardingRecord => ({
        id: `rec_${Date.now()}`,
        createdAt: new Date().toISOString(),
        staffMember: form.staffMember,
        participant: {
          fullName: form.participantFullName,
          dateOfBirth: form.participantDob,
          age: form.participantAge,
          gender: form.participantGender
        },
        guardian: {
          name: form.guardianName,
          relationship: form.guardianRelationship,
          phone: form.guardianPhone,
          email: form.guardianEmail
        },
        emergencyContact: {
          name: form.emergencyName,
          relationship: form.emergencyRelationship,
          phone: form.emergencyPhone
        },
        medicalFlags: form.medicalFlags,
        goalsAndSportHistory: form.goalsAndSportHistory,
        maturationReadinessNotes: form.maturationReadinessNotes,
        movementScores: {
          squat: form.movementSquat,
          hinge: form.movementHinge,
          push: form.movementPush,
          pull: form.movementPull,
          lunge: form.movementLunge,
          brace: form.movementBrace,
          landing: form.movementLanding
        },
        attendanceConfidenceReadiness: form.attendanceConfidenceReadiness,
        coachNotes: form.coachNotes
      }),
    [form]
  );

  const submit = async () => {
    if (!validate()) return;
    const record = toRecord();
    await saveRecord(record);
    setRecords((current) => [record, ...current]);
    Alert.alert('Saved', 'Onboarding record saved successfully.');
    setTab('records');
  };

  const generatePdf = async (record: OnboardingRecord) => {
    const html = buildOnboardingPdfHtml(record);
    const file = await Print.printToFileAsync({ html });
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(file.uri, { mimeType: 'application/pdf', dialogTitle: 'Share onboarding PDF' });
    } else {
      Alert.alert('PDF generated', `PDF created at ${file.uri}`);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.logoPlaceholder}><Text style={styles.logoPlaceholderText}>SS</Text></View>
        <View>
          <Text style={styles.title}>Strength School Malta</Text>
          <Text style={styles.subtitle}>Youth Onboarding App</Text>
        </View>
      </View>
      <View style={styles.tabs}>
        {(['intake', 'records'] as const).map((nextTab) => (
          <Pressable
            key={nextTab}
            onPress={() => setTab(nextTab)}
            style={[styles.tab, tab === nextTab && styles.activeTab]}
          >
            <Text style={[styles.tabText, tab === nextTab && styles.activeTabText]}>{nextTab.toUpperCase()}</Text>
          </Pressable>
        ))}
      </View>

      {tab === 'intake' ? (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.sectionTitle}>Participant details</Text>
          <FormField label="Staff member" value={form.staffMember} onChangeText={(v) => handleText('staffMember', v)} error={errors.staffMember} />
          <FormField label="Participant full name" value={form.participantFullName} onChangeText={(v) => handleText('participantFullName', v)} error={errors.participantFullName} />
          <FormField label="Date of birth" value={form.participantDob} onChangeText={(v) => handleText('participantDob', v)} placeholder="YYYY-MM-DD" error={errors.participantDob} />
          <FormField label="Age" value={String(form.participantAge)} onChangeText={(v) => handleText('participantAge', v)} keyboardType="numeric" error={errors.participantAge} />
          <FormField label="Gender" value={form.participantGender} onChangeText={(v) => handleText('participantGender', v)} error={errors.participantGender} />

          <Text style={styles.sectionTitle}>Guardian/parent details</Text>
          <FormField label="Guardian name" value={form.guardianName} onChangeText={(v) => handleText('guardianName', v)} error={errors.guardianName} />
          <FormField label="Relationship" value={form.guardianRelationship} onChangeText={(v) => handleText('guardianRelationship', v)} error={errors.guardianRelationship} />
          <FormField label="Phone" value={form.guardianPhone} onChangeText={(v) => handleText('guardianPhone', v)} keyboardType="phone-pad" error={errors.guardianPhone} />
          <FormField label="Email" value={form.guardianEmail} onChangeText={(v) => handleText('guardianEmail', v)} keyboardType="email-address" error={errors.guardianEmail} />

          <Text style={styles.sectionTitle}>Emergency contacts</Text>
          <FormField label="Emergency contact name" value={form.emergencyName} onChangeText={(v) => handleText('emergencyName', v)} error={errors.emergencyName} />
          <FormField label="Relationship" value={form.emergencyRelationship} onChangeText={(v) => handleText('emergencyRelationship', v)} error={errors.emergencyRelationship} />
          <FormField label="Phone" value={form.emergencyPhone} onChangeText={(v) => handleText('emergencyPhone', v)} keyboardType="phone-pad" error={errors.emergencyPhone} />

          <Text style={styles.sectionTitle}>Health and performance context</Text>
          <FormField label="Medical flags / contraindications" value={form.medicalFlags} onChangeText={(v) => handleText('medicalFlags', v)} multiline error={errors.medicalFlags} />
          <FormField label="Goals and sport participation history" value={form.goalsAndSportHistory} onChangeText={(v) => handleText('goalsAndSportHistory', v)} multiline error={errors.goalsAndSportHistory} />
          <FormField label="Maturation/readiness notes" value={form.maturationReadinessNotes} onChangeText={(v) => handleText('maturationReadinessNotes', v)} multiline error={errors.maturationReadinessNotes} />

          <Text style={styles.sectionTitle}>Movement competency scoring (1-5)</Text>
          {scoreFieldMap.map(([label, key]) => (
            <View key={key} style={styles.scoreRow}>
              <Text style={styles.scoreLabel}>{label}</Text>
              <View style={styles.scoreButtons}>
                {[1, 2, 3, 4, 5].map((score) => (
                  <Pressable
                    key={score}
                    onPress={() => setForm((current) => ({ ...current, [key]: score }))}
                    style={[styles.scoreButton, form[key] === score && styles.scoreButtonActive]}
                  >
                    <Text style={[styles.scoreText, form[key] === score && styles.scoreTextActive]}>{score}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ))}

          <FormField label="Attendance/confidence/readiness notes" value={form.attendanceConfidenceReadiness} onChangeText={(v) => handleText('attendanceConfidenceReadiness', v)} multiline error={errors.attendanceConfidenceReadiness} />
          <FormField label="Coach notes" value={form.coachNotes} onChangeText={(v) => handleText('coachNotes', v)} multiline error={errors.coachNotes} />

          <Pressable style={styles.saveButton} onPress={submit}>
            <Text style={styles.saveText}>Save onboarding record</Text>
          </Pressable>
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {records.length === 0 ? (
            <Text style={styles.empty}>No records yet. Complete an intake form first.</Text>
          ) : (
            records.map((record) => (
              <View key={record.id} style={styles.card}>
                <Text style={styles.cardTitle}>{record.participant.fullName}</Text>
                <Text style={styles.cardSub}>{record.createdAt}</Text>
                <Text style={styles.cardSub}>Coach: {record.staffMember}</Text>
                <Pressable style={styles.pdfButton} onPress={() => generatePdf(record)}>
                  <Text style={styles.pdfText}>Generate PDF summary</Text>
                </Pressable>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: theme.spacing.md, backgroundColor: theme.colors.card },
  logoPlaceholder: { width: 42, height: 42, borderRadius: 8, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center' },
  logoPlaceholderText: { color: '#fff', fontWeight: '800' },
  title: { color: theme.colors.primary, fontWeight: '800', fontSize: 18 },
  subtitle: { color: theme.colors.muted, fontSize: 13 },
  tabs: { flexDirection: 'row', paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.sm, gap: 8 },
  tab: { flex: 1, borderWidth: 1, borderColor: '#CBD4E0', borderRadius: theme.radius.sm, paddingVertical: 10, alignItems: 'center', backgroundColor: theme.colors.card },
  activeTab: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  tabText: { color: theme.colors.primary, fontWeight: '700' },
  activeTabText: { color: '#fff' },
  container: { paddingHorizontal: theme.spacing.md, paddingBottom: 40 },
  sectionTitle: { marginTop: theme.spacing.md, marginBottom: 8, color: theme.colors.primary, fontWeight: '800', fontSize: 16 },
  scoreRow: { marginBottom: theme.spacing.sm },
  scoreLabel: { fontWeight: '700', color: theme.colors.primary, marginBottom: 6 },
  scoreButtons: { flexDirection: 'row', gap: 8 },
  scoreButton: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: '#CBD4E0', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  scoreButtonActive: { backgroundColor: theme.colors.accent, borderColor: theme.colors.accent },
  scoreText: { fontWeight: '700', color: theme.colors.primary },
  scoreTextActive: { color: '#fff' },
  saveButton: { marginTop: theme.spacing.lg, backgroundColor: theme.colors.success, borderRadius: theme.radius.md, minHeight: 52, justifyContent: 'center', alignItems: 'center' },
  saveText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  empty: { marginTop: 20, color: theme.colors.muted },
  card: { padding: theme.spacing.md, borderRadius: theme.radius.md, backgroundColor: '#fff', marginBottom: theme.spacing.sm, borderWidth: 1, borderColor: '#E2E8F0' },
  cardTitle: { fontWeight: '800', color: theme.colors.primary, fontSize: 16 },
  cardSub: { color: theme.colors.muted, marginTop: 2 },
  pdfButton: { marginTop: theme.spacing.sm, backgroundColor: theme.colors.accent, paddingVertical: 10, borderRadius: theme.radius.sm, alignItems: 'center' },
  pdfText: { color: '#fff', fontWeight: '700' }
});
