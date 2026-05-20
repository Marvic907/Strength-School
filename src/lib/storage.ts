import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingRecord } from '../types/onboarding';

const STORAGE_KEY = 'strength_school_onboarding_records_v1';

export const loadRecords = async (): Promise<OnboardingRecord[]> => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as OnboardingRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveRecord = async (record: OnboardingRecord): Promise<void> => {
  const records = await loadRecords();
  const updated = [record, ...records];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
