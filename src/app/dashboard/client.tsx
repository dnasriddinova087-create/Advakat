// Client Dashboard Screen with Bookings, Chat Shortcuts, and Document Vault
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
  CalendarDays, 
  MessageCircle, 
  FileText, 
  User, 
  Plus, 
  Clock, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react-native';
import ResponsiveLayout from '../../components/ResponsiveLayout';
import ProtectedRoute from '../../components/ProtectedRoute';
import AppointmentCard from '../../components/AppointmentCard';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../styles/theme';
import { useAuth } from '../../hooks/useAuth';
import { 
  getStoredAppointments, 
  getStoredConversations, 
  saveStoredAppointments 
} from '../../lib/storage';
import { Appointment, Conversation, AppointmentStatus } from '../../types';

export default function ClientDashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeTab, setActiveTab] = useState<'appointments' | 'messages' | 'documents'>('appointments');

  useEffect(() => {
    setAppointments(getStoredAppointments());
    setConversations(getStoredConversations());
  }, []);

  const handleStatusChange = (id: string, newStatus: AppointmentStatus) => {
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status: newStatus } : a
    );
    setAppointments(updated);
    saveStoredAppointments(updated);
  };

  const pendingCount = appointments.filter((a) => a.status === 'Pending').length;
  const confirmedCount = appointments.filter((a) => a.status === 'Confirmed').length;

  return (
    <ProtectedRoute allowedRoles={['client', 'admin']}>
      <ResponsiveLayout>
        <View style={styles.container}>
          {/* Dashboard Header */}
          <View style={styles.welcomeCard}>
            <View style={styles.welcomeInfo}>
              <Text style={styles.greetingText}>Xush kelibsiz, {user?.full_name}!</Text>
              <Text style={styles.userRoleBadge}>Mijoz kabineti</Text>
            </View>

            <TouchableOpacity
              style={styles.newBookingBtn}
              onPress={() => router.push('/appointments/book')}
            >
              <Plus size={16} color={COLORS.navy} />
              <Text style={styles.newBookingBtnText}>Advokatga yozilish</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Metrics */}
          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <Clock size={20} color={COLORS.warning} />
              <Text style={styles.metricVal}>{pendingCount}</Text>
              <Text style={styles.metricLabel}>Tasdiqlash kutilmoqda</Text>
            </View>
            <View style={styles.metricCard}>
              <ShieldCheck size={20} color={COLORS.success} />
              <Text style={styles.metricVal}>{confirmedCount}</Text>
              <Text style={styles.metricLabel}>Tasdiqlangan qabullar</Text>
            </View>
            <View style={styles.metricCard}>
              <MessageCircle size={20} color={COLORS.gold} />
              <Text style={styles.metricVal}>{conversations.length}</Text>
              <Text style={styles.metricLabel}>Faol suhbatlar</Text>
            </View>
          </View>

          {/* Tab Navigation */}
          <View style={styles.tabsRow}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'appointments' && styles.tabActive]}
              onPress={() => setActiveTab('appointments')}
            >
              <CalendarDays size={16} color={activeTab === 'appointments' ? COLORS.navy : COLORS.textMuted} />
              <Text style={[styles.tabText, activeTab === 'appointments' && styles.tabTextActive]}>
                Mening bronlarim ({appointments.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === 'messages' && styles.tabActive]}
              onPress={() => setActiveTab('messages')}
            >
              <MessageCircle size={16} color={activeTab === 'messages' ? COLORS.navy : COLORS.textMuted} />
              <Text style={[styles.tabText, activeTab === 'messages' && styles.tabTextActive]}>
                Xabarlar ({conversations.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === 'documents' && styles.tabActive]}
              onPress={() => setActiveTab('documents')}
            >
              <FileText size={16} color={activeTab === 'documents' ? COLORS.navy : COLORS.textMuted} />
              <Text style={[styles.tabText, activeTab === 'documents' && styles.tabTextActive]}>
                Hujjatlar ombori
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {activeTab === 'appointments' && (
            <View style={styles.tabContent}>
              {appointments.length > 0 ? (
                appointments.map((app) => (
                  <AppointmentCard
                    key={app.id}
                    appointment={app}
                    isLawyerView={false}
                    onStatusChange={handleStatusChange}
                    onPay={() => router.push('/appointments')}
                  />
                ))
              ) : (
                <View style={styles.emptyBox}>
                  <Text style={styles.emptyTitle}>Sizda hali bronlar yo‘q</Text>
                  <TouchableOpacity 
                    style={styles.findLawyerBtn}
                    onPress={() => router.push('/lawyers')}
                  >
                    <Text style={styles.findLawyerBtnText}>Advokat tanlash</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}

          {activeTab === 'messages' && (
            <View style={styles.tabContent}>
              {conversations.map((conv) => (
                <TouchableOpacity
                  key={conv.id}
                  style={styles.convCard}
                  onPress={() => router.push(`/chat/${conv.id}`)}
                >
                  <View style={styles.convIcon}>
                    <User size={20} color={COLORS.navy} />
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.convName}>{conv.lawyer_name}</Text>
                    <Text style={styles.convLastMsg} numberOfLines={1}>
                      {conv.last_message}
                    </Text>
                  </View>
                  <Text style={styles.convDate}>Bugun</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {activeTab === 'documents' && (
            <View style={styles.tabContent}>
              <View style={styles.docNotice}>
                <ShieldCheck size={20} color={COLORS.success} />
                <Text style={styles.docNoticeText}>
                  Barcha yuklangan yuridik hujjatlar xavfsiz shifrlangan va faqat siz hamda tayinlangan advokatingizga ochiq (Row Level Security).
                </Text>
              </View>

              {[
                { title: 'shartnoma_n42.pdf', size: '2.4 MB', date: '2026-10-14' },
                { title: 'pasport_nusxa.jpg', size: '1.1 MB', date: '2026-10-12' },
              ].map((doc, idx) => (
                <View key={idx} style={styles.docItem}>
                  <FileText size={20} color={COLORS.gold} />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.docItemTitle}>{doc.title}</Text>
                    <Text style={styles.docItemMeta}>{doc.size} • Yuklangan sana: {doc.date}</Text>
                  </View>
                  <Text style={styles.docStatusSecure}>Himoyalangan</Text>
                </View>
              ))}
            </View>
          )}
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
  welcomeCard: {
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
  welcomeInfo: {},
  greetingText: {
    color: COLORS.navy,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  userRoleBadge: {
    color: COLORS.goldDark,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  newBookingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    gap: 6,
  },
  newBookingBtnText: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  metricCard: {
    flex: 1,
    minWidth: 180,
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  metricVal: {
    color: COLORS.navy,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 6,
    marginBottom: 2,
  },
  metricLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    gap: 4,
    flexWrap: 'wrap',
  },
  tab: {
    flex: 1,
    minWidth: 160,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
    gap: 6,
  },
  tabActive: {
    backgroundColor: COLORS.cream,
  },
  tabText: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextActive: {
    color: COLORS.navy,
    fontWeight: '700',
  },
  tabContent: {
    gap: 12,
  },
  emptyBox: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyTitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 12,
  },
  findLawyerBtn: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
  },
  findLawyerBtnText: {
    color: COLORS.gold,
    fontSize: 13,
    fontWeight: '700',
  },
  convCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  convIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  convName: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  convLastMsg: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  convDate: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  docNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successLight,
    padding: 12,
    borderRadius: RADIUS.md,
    gap: 10,
    marginBottom: 10,
  },
  docNoticeText: {
    color: COLORS.navy,
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  docItemTitle: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  docItemMeta: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  docStatusSecure: {
    color: COLORS.success,
    fontSize: 11,
    fontWeight: '700',
  },
});
