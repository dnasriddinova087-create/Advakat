// Error State Component with Alert Icon and Retry Button
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import { COLORS, SPACING, RADIUS } from '../styles/theme';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = 'Xatolik yuz berdi',
  message = 'Ma’lumotlarni yuklashda kutilmagan xatolik yuz berdi. Iltimos qaytadan urinib ko‘ring.',
  onRetry,
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <AlertTriangle size={36} color={COLORS.danger} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryBtn} onPress={onRetry}>
          <Text style={styles.retryBtnText}>Qayta urinish</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.dangerLight,
    marginVertical: SPACING.md,
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.dangerLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    color: COLORS.danger,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  message: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    maxWidth: 380,
    lineHeight: 18,
    marginBottom: 14,
  },
  retryBtn: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
  },
  retryBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
  },
});
