// Login Screen with Supabase Auth integration and quick demo account buttons
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Scale, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react-native';
import ResponsiveLayout from '../components/ResponsiveLayout';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';
import { useAuth } from '../hooks/useAuth';
import { validateEmail } from '../lib/validation';

export default function LoginScreen() {
  const router = useRouter();
  const { login, switchDemoRole } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErrorMsg('');
    if (!email) {
      setErrorMsg('Iltimos, elektron pochtangizni kiriting');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMsg('Noto‘g‘ri elektron pochta formati');
      return;
    }
    if (!password) {
      setErrorMsg('Parolni kiriting');
      return;
    }

    setLoading(true);
    const res = await login(email);
    setLoading(false);
    if (res.success) {
      router.push('/');
    } else {
      setErrorMsg(res.error || 'Kirishda xatolik');
    }
  };

  const handleQuickDemo = (role: 'client' | 'lawyer' | 'admin') => {
    switchDemoRole(role);
    if (role === 'admin') router.push('/admin');
    else if (role === 'lawyer') router.push('/dashboard/lawyer');
    else router.push('/dashboard/client');
  };

  return (
    <ResponsiveLayout showFooter={false}>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* Logo Badge */}
          <View style={styles.logoRow}>
            <View style={styles.logoBox}>
              <Scale size={24} color={COLORS.navy} />
            </View>
            <Text style={styles.logoText}>Advo<Text style={{ color: COLORS.gold }}>Care</Text></Text>
          </View>

          <Text style={styles.title}>Tizimga kirish</Text>
          <Text style={styles.subtitle}>
            Shaxsiy kabinetingizga kirish uchun ma’lumotlarni kiriting.
          </Text>

          {errorMsg ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
          ) : null}

          {/* Form */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Elektron pochta</Text>
            <View style={styles.inputWrapper}>
              <Mail size={18} color={COLORS.gold} />
              <TextInput
                style={styles.textInput}
                placeholder="misol@advocare.uz"
                placeholderTextColor={COLORS.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Parol</Text>
            <View style={styles.inputWrapper}>
              <Lock size={18} color={COLORS.gold} />
              <TextInput
                style={styles.textInput}
                placeholder="••••••••"
                placeholderTextColor={COLORS.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity 
            style={styles.submitBtn} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.navy} />
            ) : (
              <>
                <Text style={styles.submitBtnText}>Kirish</Text>
                <ArrowRight size={16} color={COLORS.navy} />
              </>
            )}
          </TouchableOpacity>

          {/* Quick Demo Logins for immediate testing */}
          <View style={styles.quickDemoSection}>
            <Text style={styles.quickDemoTitle}>Tezkor test uchun namunaviy hisoblar:</Text>
            <View style={styles.quickDemoBtns}>
              <TouchableOpacity 
                style={styles.demoBtn}
                onPress={() => handleQuickDemo('client')}
              >
                <Text style={styles.demoBtnText}>👤 Mijoz (Client)</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.demoBtn}
                onPress={() => handleQuickDemo('lawyer')}
              >
                <Text style={styles.demoBtnText}>⚖️ Advokat (Lawyer)</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.demoBtn, { backgroundColor: COLORS.navyLight }]}
                onPress={() => handleQuickDemo('admin')}
              >
                <Text style={[styles.demoBtnText, { color: COLORS.gold }]}>🛡️ Admin (Admin)</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Register Link */}
          <View style={styles.registerRow}>
            <Text style={styles.registerPrompt}>Hisobingiz yo‘qmi? </Text>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text style={styles.registerLink}>Ro‘yxatdan o‘tish</Text>
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
    padding: SPACING.xxl,
    width: '100%',
    maxWidth: 440,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.md,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
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
    marginBottom: 20,
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
    marginBottom: 14,
  },
  fieldLabel: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    height: 44,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.text,
    fontSize: 14,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gold,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    marginTop: 8,
    gap: 8,
  },
  submitBtnText: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '700',
  },
  quickDemoSection: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  quickDemoTitle: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  quickDemoBtns: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  demoBtn: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.cream,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  demoBtnText: {
    color: COLORS.navy,
    fontSize: 11,
    fontWeight: '600',
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerPrompt: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  registerLink: {
    color: COLORS.goldDark,
    fontSize: 13,
    fontWeight: '700',
  },
});
