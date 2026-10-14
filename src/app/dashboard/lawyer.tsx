// Lawyer Dashboard Screen with Booking Approvals, Income Metrics, and Service Management
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Award, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  Clock, 
  DollarSign, 
  MessageCircle, 
  Users, 
  TrendingUp, 
  Briefcase 
} from 'lucide-react-native';
import ResponsiveLayout from '../../components/ResponsiveLayout';
import ProtectedRoute from '../../components/ProtectedRoute';
import AppointmentCard from '../../components/AppointmentCard';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../styles/theme';
import { formatMoney } from '../../utils/formatters';
import { useAuth } from '../../hooks/useAuth';
import { 
  getStoredAppointments, 
  saveStoredAppointments 
} from '../../lib/storage';
import { Appointment, AppointmentStatus } from '../../types';

export default function LawyerDashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    setAppointments(getStoredAppointments());
  }, []);

  const handleStatusChange = (id: string, newStatus: AppointmentStatus) => {
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status: newStatus } : a
    );
    setAppointments(updated);
    saveStoredAppointments(updated);
  };

  const pendingRequests = appointments.filter((a) => a.status === 'Pending');
  const confirmedSessions = appointments.filter((a) => a.status === 'Confirmed');
  const totalRevenue = appointments
    .filter((a) => a.payment_status === 'Paid')
    .reduce((sum, a) => sum + (a.total_amount || 0), 0);

  return (
    <ProtectedRoute allowedRoles={['lawyer', 'admin']}>
      <ResponsiveLayout>
        <View style={styles.container}>
          {/* Lawyer Info Card */}
          <View style={styles.lawyerHeaderCard}>
            <View>
              <Text style={styles.greetingTitle}>Advokat kabineti: {user?.full_name}</Text>
              <Text style={styles.lawyerBadge}>
                Litsenziya: ADV-TAS-2015-084 • O‘zbekiston Advokatlar palatasi a’zosi
              </Text>
            </View>

            <View style={styles.verifiedTag}>
              <Award size={14} color={COLORS.navy} />
              <Text style={styles.verifiedTagText}>Tasdiqlangan advokat</Text>
            </View>
          </View>

          {/* Key Metrics */}
          <View style={styles.kpiRow}>
            <View style={styles.kpiCard}>
              <Clock size={20} color={COLORS.warning} />
              <Text style={styles.kpiValue}>{pendingRequests.length}</Text>
              <Text style={styles.kpiLabel}>Yangi bron so‘rovlari</Text>
            </View>

            <View style={styles.kpiCard}>
              <Calendar size={20} color={COLORS.success} />
              <Text style={styles.kpiValue}>{confirmedSessions.length}</Text>
              <Text style={styles.kpiLabel}>Tasdiqlangan maslahatlar</Text>
            </View>

            <View style={styles.kpiCard}>
              <TrendingUp size={20} color={COLORS.goldDark} />
              <Text style={styles.kpiValue}>{formatMoney(totalRevenue)}</Text>
              <Text style={styles.kpiLabel}>Jami tushum (Daromad)</Text>
            </View>
          </View>

          {/* Pending Appointments for Approval */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Tasdiqlash kutilayotgan murojaatlar ({pendingRequests.length})
            </Text>
            {pendingRequests.length > 0 ? (
              pendingRequests.map((app) => (
                <AppointmentCard
                  key={app.id}
                  appointment={app}
                  isLawyerView={true}
                  onStatusChange={handleStatusChange}
                />
              ))
            ) : (
              <View style={styles.emptyNotice}>
                <Text style={styles.emptyNoticeText}>Yangi kutilayotgan so‘rovlar yo‘q.</Text>
              </View>
            )}
          </View>

          {/* Confirmed Schedule */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Tasdiqlangan uchrashuvlar jadvali ({confirmedSessions.length})
            </Text>
            {confirmedSessions.length > 0 ? (
              confirmedSessions.map((app) => (
                <AppointmentCard
                  key={app.id}
                  appointment={app}
                  isLawyerView={true}
                  onStatusChange={handleStatusChange}
                />
              ))
            ) : (
              <View style={styles.emptyNotice}>
                <Text style={styles.emptyNoticeText}>Hozircha rejalashtirilgan qabullar yo‘q.</Text>
              </View>
            )}
          </View>
        </View>
      </ResponsiveLayout>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 960,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xl,
  },
  lawyerHeaderCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 12,
  },
  greetingTitle: {
    color: COLORS.navy,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  lawyerBadge: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.goldLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.md,
    gap: 6,
  },
  verifiedTagText: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '700',
  },
  kpiRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  kpiCard: {
    flex: 1,
    minWidth: 180,
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  kpiValue: {
    color: COLORS.navy,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 6,
    marginBottom: 2,
  },
  kpiLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: COLORS.navy,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  emptyNotice: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  emptyNoticeText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
});
