// Protected Route Guard with Role Verification and Instant Switch Option
import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ShieldAlert, ArrowLeft, KeyRound } from 'lucide-react-native';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import { COLORS, SPACING, RADIUS } from '../styles/theme';
import ResponsiveLayout from './ResponsiveLayout';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({
  children,
  allowedRoles = ['client', 'lawyer', 'admin'],
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, switchDemoRole } = useAuth();

  if (!user) {
    return (
      <ResponsiveLayout>
        <View style={styles.centerContainer}>
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <KeyRound size={32} color={COLORS.gold} />
            </View>
            <Text style={styles.title}>Tizimga kirish talab qilinadi</Text>
            <Text style={styles.subtitle}>
              Ushbu sahifani ko‘rish uchun shaxsiy hisobingizga kiring yoki ro‘yxatdan o‘ting.
            </Text>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.primaryBtnText}>Kirish</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => router.push('/')}
            >
              <ArrowLeft size={16} color={COLORS.navy} />
              <Text style={styles.secondaryBtnText}>Bosh sahifaga qaytish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ResponsiveLayout>
    );
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <ResponsiveLayout>
        <View style={styles.centerContainer}>
          <View style={styles.card}>
            <View style={[styles.iconCircle, { backgroundColor: COLORS.dangerLight }]}>
              <ShieldAlert size={32} color={COLORS.danger} />
            </View>
            <Text style={[styles.title, { color: COLORS.danger }]}>Ruxsat cheklangan</Text>
            <Text style={styles.subtitle}>
              Sizning joriy rolingiz ({user.role.toUpperCase()}) ushbu sahifaga kirish huquqiga ega emas. 
              Talab qilinadigan rol: {allowedRoles.join(', ').toUpperCase()}.
            </Text>

            {/* Quick demo switcher for convenient testing */}
            <View style={styles.roleSwitchBox}>
              <Text style={styles.roleSwitchTitle}>Test qilish uchun rolni o‘zgartiring:</Text>
              <View style={styles.roleBtnRow}>
                {allowedRoles.map((r) => (
                  <TouchableOpacity
                    key={r}
                    style={styles.roleSelectBtn}
                    onPress={() => switchDemoRole(r as any)}
                  >
                    <Text style={styles.roleSelectBtnText}>
                      {r === 'admin' ? '🛡️ Admin' : r === 'lawyer' ? '⚖️ Advokat' : '👤 Mijoz'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => router.push('/')}
            >
              <ArrowLeft size={16} color={COLORS.navy} />
              <Text style={styles.secondaryBtnText}>Bosh sahifaga qaytish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ResponsiveLayout>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  centerContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 500,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    borderRadius: RADIUS.xl,
    maxWidth: 440,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    color: COLORS.navy,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  primaryBtn: {
    backgroundColor: COLORS.navy,
    width: '100%',
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryBtnText: {
    color: COLORS.gold,
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  secondaryBtnText: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '600',
  },
  roleSwitchBox: {
    backgroundColor: COLORS.cream,
    padding: 12,
    borderRadius: RADIUS.md,
    width: '100%',
    marginBottom: 14,
    alignItems: 'center',
  },
  roleSwitchTitle: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  roleBtnRow: {
    flexDirection: 'row',
    gap: 8,
  },
  roleSelectBtn: {
    backgroundColor: COLORS.gold,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
  },
  roleSelectBtnText: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '700',
  },
});
