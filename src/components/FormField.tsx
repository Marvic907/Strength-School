import { Text, TextInput, View, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

type Props = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  error?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
};

export const FormField = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline,
  error,
  keyboardType = 'default'
}: Props) => (
  <View style={styles.wrapper}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, multiline && styles.multiline, error && styles.errorInput]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.muted}
      multiline={multiline}
      keyboardType={keyboardType}
      textAlignVertical={multiline ? 'top' : 'center'}
    />
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  wrapper: { marginBottom: theme.spacing.sm },
  label: { fontWeight: '700', marginBottom: 6, color: theme.colors.primary },
  input: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: '#D6DCE5',
    paddingHorizontal: 14,
    minHeight: 48,
    color: theme.colors.text
  },
  multiline: { minHeight: 88, paddingVertical: 10 },
  errorInput: { borderColor: theme.colors.danger },
  error: { color: theme.colors.danger, marginTop: 4 }
});
