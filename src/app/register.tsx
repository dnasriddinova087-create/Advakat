// Register Screen with Client vs Lawyer Role Selection
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Scale, Lock, Mail, User, Phone, Award, ShieldCheck, ArrowRight } from 'lucide-react-native';
import ResponsiveLayout from '../components/ResponsiveLayout';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validateUzPhone } from '../lib/validation';
import { UserRole } from '../types';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();

  const [role, setRole] = useState<UserRole>('client');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setErrorMsg('');
    if (!fullName.trim()) {
      setErrorMsg('Ism va familiyangizni kiriting');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMsg('Noto‘g‘ri elektron pochta formati');
      return;
    }
    if (role === 'lawyer' && !licenseNumber.trim()) {
      setErrorMsg('Advokatlik litsenziyasi raqamini kiriting (masalan: ADV-TAS-2024-001)');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Parol kamida 6 ta belgidan iborat bo‘lishi lozim');
      return;
    }

    setLoading(true);
    const res = await register({
      email,
      fullName,
      role,
      phone,
      licenseNumber: role === 'lawyer' ? licenseNumber : undefined,
    });
    setLoading(false);

    if (res.success) {
      if (role === 'lawyer') {
        router.push('/dashboard/lawyer');
      } else {
        router.push('/dashboard/client');
      }
    } else {
      setErrorMsg(res.error || 'Ro‘yxatdan o‘tishda xatolik');
    }
  };

  return (
    <ResponsiveLayout showFooter={false}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.logoRow}>
            <View style={styles.logoBox}>
              <Scale size={24} color={COLORS.navy} />
            </View>
            <Text style={styles.logoText}>Advo<Text style={{ color: COLORS.gold }}>Care</Text></Text>
          </View>

          <Text style={styles.title}>Ro‘yxatdan o‘tish</Text>
          <Text style={styles.subtitle}>
            Platformadan to‘liq foydalanish uchun rolingizni tanlang.
          </Text>

          {/* Role Choice Tabs */}
          <View style={styles.roleTabs}>
            <TouchableOpacity
              style={[styles.roleTab, role === 'client' && styles.roleTabActive]}
              onPress={() => setRole('client')}
            >
              <User size={16} color={role === 'client' ? COLORS.navy : COLORS.textMuted} />
              <Text style={[styles.roleTabText, role === 'client' && styles.roleTabTextActive]}>
                Mijoz (Fuqaro)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.roleTab, role === 'lawyer' && styles.roleTabActive]}
              onPress={() => setRole('lawyer')}
            >
              <Award size={16} color={role === 'lawyer' ? COLORS.navy : COLORS.textMuted} />
              <Text style={[styles.roleTabText, role === 'lawyer' && styles.roleTabTextActive]}>
                Advokat (Himoyachi)
              </Text>
            </TouchableOpacity>
          </View>

          {errorMsg ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
          ) : null}

          {/* Full Name */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>F.I.SH</Text>
            <View style={styles.inputWrapper}>
              <User size={18} color={COLORS.gold} />
              <TextInput
                style={styles.textInput}
                placeholder="Rustam Kamolov"
                placeholderTextColor={COLORS.textMuted}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Elektron pochta</Text>
            <View style={styles.inputWrapper}>
              <Mail size={18} color={COLORS.gold} />
              <TextInput
                style={styles.textInput}
                placeholder="pochta@advocare.uz"
                placeholderTextColor={COLORS.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Phone */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Telefon raqami</Text>
            <View style={styles.inputWrapper}>
              <Phone size={18} color={COLORS.gold} />
              <TextInput
                style={styles.textInput}
                placeholder="+998 90 123 45 67"
                placeholderTextColor={COLORS.textMuted}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Lawyer License Field if lawyer role */}
          {role === 'lawyer' && (
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Advokatlik litsenziyasi raqami</Text>
              <View style={styles.inputWrapper}>
                <Award size={18} color={COLORS.gold} />
                <TextInput
                  style={styles.textInput}
                  placeholder="ADV-TAS-2024-001"
                  placeholderTextColor={COLORS.textMuted}
                  value={licenseNumber}
                  onChangeText={setLicenseNumber}
                />
              </View>
              <Text style={styles.licenseHint}>
                * Litsenziya ma’lumotlari Adliya vazirligi reyestri orqali tekshiriladi.
              </Text>
            </View>
          )}

          {/* Password */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Parol</Text>
            <View style={styles.inputWrapper}>
              <Lock size={18} color={COLORS.gold} />
              <TextInput
                style={styles.textInput}
                placeholder="Kamida 6 belgi"
                placeholderTextColor={COLORS.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity 
            style={styles.submitBtn} 
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.navy} />
            ) : (
              <>
                <Text style={styles.submitBtnText}>Ro‘yxatdan o‘tish</Text>
                <ArrowRight size={16} color={COLORS.navy} />
              </>
            )}
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.loginPrompt}>Allaqachon hisobingiz bormi? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.loginLink}>Kirish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ResponsiveLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: '80%' as any,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    width: '100%',
    maxWidth: 480,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.md,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  logoBox: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  logoText: {
    color: COLORS.navy,
    fontSize: 22,
    fontWeight: '800',
  },
  title: {
    color: COLORS.navy,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16,
  },
  roleTabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.cream,
    borderRadius: RADIUS.md,
    padding: 4,
    marginBottom: 16,
    gap: 4,
  },
  roleTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
    gap: 6,
  },
  roleTabActive: {
    backgroundColor: COLORS.white,
    ...SHADOWS.sm,
  },
  roleTabText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  roleTabTextActive: {
    color: COLORS.navy,
    fontWeight: '700',
  },
  errorBox: {
    backgroundColor: COLORS.dangerLight,
    padding: 10,
    borderRadius: RADIUS.md,
    marginBottom: 14,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 12,
  },
  fieldGroup: {
    marginBottom: 12,
  },
  fieldLabel: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    height: 42,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.text,
    fontSize: 13,
  },
  licenseHint: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 4,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gold,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    marginTop: 10,
    gap: 8,
  },
  submitBtnText: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '700',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },
  loginPrompt: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  loginLink: {
    color: COLORS.goldDark,
    fontSize: 13,
    fontWeight: '700',
  },
});
