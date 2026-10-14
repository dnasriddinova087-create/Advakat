// Appointment Card Component with Status Indicators and Action Controls
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Calendar, 
  Clock, 
  User, 
  MessageCircle, 
  CheckCircle, 
  XCircle, 
  CreditCard,
  AlertCircle 
} from 'lucide-react-native';
import { Appointment, AppointmentStatus } from '../types';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';
import { formatDateUz, formatMoney } from '../utils/formatters';

interface AppointmentCardProps {
  appointment: Appointment;
  isLawyerView?: boolean;
  onStatusChange?: (id: string, newStatus: AppointmentStatus) => void;
  onPay?: (appointment: Appointment) => void;
}

export default function AppointmentCard({
  appointment,
  isLawyerView = false,
  onStatusChange,
  onPay,
}: AppointmentCardProps) {
  const router = useRouter();

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'Confirmed':
        return {
          bg: COLORS.successLight,
          color: COLORS.success,
          text: 'Tasdiqlangan',
          icon: <CheckCircle size={14} color={COLORS.success} />,
        };
      case 'Pending':
        return {
          bg: COLORS.warningLight,
          color: COLORS.warning,
          text: 'Tasdiqlash kutilmoqda',
          icon: <AlertCircle size={14} color={COLORS.warning} />,
        };
      case 'Rejected':
        return {
          bg: COLORS.dangerLight,
          color: COLORS.danger,
          text: 'Rad etilgan',
          icon: <XCircle size={14} color={COLORS.danger} />,
        };
      case 'Cancelled':
        return {
          bg: COLORS.cream,
          color: COLORS.textMuted,
          text: 'Bekor qilingan',
          icon: <XCircle size={14} color={COLORS.textMuted} />,
        };
      case 'Completed':
        return {
          bg: COLORS.infoLight,
          color: COLORS.info,
          text: 'Yakunlangan',
          icon: <CheckCircle size={14} color={COLORS.info} />,
        };
    }
  };

  const badge = getStatusBadge(appointment.status);

  return (
    <View style={styles.card}>
      {/* Top Header: Service & Status */}
      <View style={styles.topRow}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text style={styles.serviceTitle} numberOfLines={1}>
            {appointment.service_title || 'Yuridik konsultatsiya'}
          </Text>
          <Text style={styles.partyText}>
            {isLawyerView
              ? `Mijoz: ${appointment.client_name || 'Noma’lum mijoz'}`
              : `Advokat: ${appointment.lawyer_name || 'Advokat'}`}
          </Text>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
          {badge.icon}
          <Text style={[styles.statusText, { color: badge.color }]}>
            {badge.text}
          </Text>
        </View>
      </View>

      {/* Date & Time */}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Calendar size={14} color={COLORS.gold} />
          <Text style={styles.metaText}>{formatDateUz(appointment.appointment_date)}</Text>
        </View>
        <View style={styles.metaItem}>
          <Clock size={14} color={COLORS.gold} />
          <Text style={styles.metaText}>
            {appointment.start_time} - {appointment.end_time}
          </Text>
        </View>
      </View>

      {/* Description / Problem */}
      <View style={styles.descBox}>
        <Text style={styles.descText} numberOfLines={2}>
          {appointment.description}
        </Text>
      </View>

      {/* Amount and Payment Status */}
      <View style={styles.financeRow}>
        <View>
          <Text style={styles.financeLabel}>Xizmat haqi:</Text>
          <Text style={styles.amountText}>{formatMoney(appointment.total_amount)}</Text>
        </View>

        <View style={styles.paymentBadge}>
          <Text style={styles.paymentBadgeText}>
            To‘lov: {appointment.payment_status === 'Paid' ? 'To‘langan' : 'Kutilmoqda'}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        {/* Chat Button */}
        <TouchableOpacity
          style={styles.chatBtn}
          onPress={() => router.push(`/chat/conv-1`)}
        >
          <MessageCircle size={14} color={COLORS.navy} />
          <Text style={styles.chatBtnText}>Chat</Text>
        </TouchableOpacity>

        {/* Lawyer Actions */}
        {isLawyerView && appointment.status === 'Pending' && (
          <>
            <TouchableOpacity
              style={styles.acceptBtn}
              onPress={() => onStatusChange && onStatusChange(appointment.id, 'Confirmed')}
            >
              <Text style={styles.acceptBtnText}>Tasdiqlash</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rejectBtn}
              onPress={() => onStatusChange && onStatusChange(appointment.id, 'Rejected')}
            >
              <Text style={styles.rejectBtnText}>Rad etish</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Client Actions */}
        {!isLawyerView && appointment.status === 'Confirmed' && appointment.payment_status !== 'Paid' && (
          <TouchableOpacity
            style={styles.payBtn}
            onPress={() => onPay && onPay(appointment)}
          >
            <CreditCard size={14} color={COLORS.navy} />
            <Text style={styles.payBtnText}>To‘lash (Click/Payme)</Text>
          </TouchableOpacity>
        )}

        {appointment.status === 'Pending' && !isLawyerView && (
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => onStatusChange && onStatusChange(appointment.id, 'Cancelled')}
          >
            <Text style={styles.cancelBtnText}>Bekor qilish</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  serviceTitle: {
    color: COLORS.navy,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  partyText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '500',
  },
  descBox: {
    backgroundColor: COLORS.cream,
    padding: 10,
    borderRadius: RADIUS.sm,
    marginBottom: 12,
  },
  descText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  financeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  financeLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  amountText: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '800',
  },
  paymentBadge: {
    backgroundColor: COLORS.cream,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  paymentBadgeText: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cream,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.md,
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chatBtnText: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '600',
  },
  acceptBtn: {
    flex: 1,
    backgroundColor: COLORS.success,
    paddingVertical: 7,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  acceptBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  rejectBtn: {
    flex: 1,
    backgroundColor: COLORS.danger,
    paddingVertical: 7,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  rejectBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  payBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.gold,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  payBtnText: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '700',
  },
  cancelBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.cream,
  },
  cancelBtnText: {
    color: COLORS.danger,
    fontSize: 12,
    fontWeight: '600',
  },
});
