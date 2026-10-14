// Appointments List Screen with Status Filters and Click/Payme Test Checkout
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Modal 
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  CalendarDays, 
  Plus, 
  CreditCard, 
  CheckCircle, 
  X, 
  ShieldCheck, 
  AlertTriangle 
} from 'lucide-react-native';
import ResponsiveLayout from '../../components/ResponsiveLayout';
import AppointmentCard from '../../components/AppointmentCard';
import EmptyState from '../../components/EmptyState';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../styles/theme';
import { formatMoney } from '../../utils/formatters';
import { 
  getStoredAppointments, 
  saveStoredAppointments 
} from '../../lib/storage';
import { useAuth } from '../../hooks/useAuth';
import { Appointment, AppointmentStatus, PaymentProvider } from '../../types';

export default function AppointmentsScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<string>('Barchasi');
  const [payingApp, setPayingApp] = useState<Appointment | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>('click');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    const list = getStoredAppointments();
    setAppointments(list);
  };

  const handleStatusChange = (id: string, newStatus: AppointmentStatus) => {
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status: newStatus } : a
    );
    setAppointments(updated);
    saveStoredAppointments(updated);
  };

  const handleStartPay = (app: Appointment) => {
    setPayingApp(app);
    setPaymentSuccess(false);
  };

  const handleExecutePayment = () => {
    if (!payingApp) return;
    setIsProcessingPayment(true);

    setTimeout(() => {
      const updated = appointments.map((a) =>
        a.id === payingApp.id
          ? {
              ...a,
              payment_status: 'Paid' as const,
              payment_provider: selectedProvider,
            }
          : a
      );
      setAppointments(updated);
      saveStoredAppointments(updated);
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
    }, 1000);
  };

  const filtered = appointments.filter((a) => {
    if (filter === 'Barchasi') return true;
    return a.status === filter;
  });

  return (
    <ResponsiveLayout>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.pageTitle}>Uchrashuvlar va bronlar</Text>
            <Text style={styles.pageSubtitle}>
              Advokatlar bilan belgilangan onlayn va oflayn qabullar tarixi
            </Text>
          </View>
          <TouchableOpacity
            style={styles.bookNewBtn}
            onPress={() => router.push('/appointments/book')}
          >
            <Plus size={16} color={COLORS.navy} />
            <Text style={styles.bookNewBtnText}>Yangi bron qilish</Text>
          </TouchableOpacity>
        </View>

        {/* Status Filter Tabs */}
        <View style={styles.filterTabsRow}>
          {['Barchasi', 'Pending', 'Confirmed', 'Completed', 'Cancelled', 'Rejected'].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterTab,
                filter === status && styles.filterTabActive,
              ]}
              onPress={() => setFilter(status)}
            >
              <Text
                style={[
                  styles.filterTabText,
                  filter === status && styles.filterTabTextActive,
                ]}
              >
                {status === 'Pending'
                  ? 'Kutilmoqda'
                  : status === 'Confirmed'
                  ? 'Tasdiqlangan'
                  : status === 'Completed'
                  ? 'Yakunlangan'
                  : status === 'Cancelled'
                  ? 'Bekor qilingan'
                  : status === 'Rejected'
                  ? 'Rad etilgan'
                  : 'Barchasi'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Appointments List */}
        {filtered.length > 0 ? (
          <View style={styles.list}>
            {filtered.map((item) => (
              <AppointmentCard
                key={item.id}
                appointment={item}
                isLawyerView={user?.role === 'lawyer'}
                onStatusChange={handleStatusChange}
                onPay={handleStartPay}
              />
            ))}
          </View>
        ) : (
          <EmptyState
            title="Uchrashuvlar mavjud emas"
            description="Ushbu toifada hozircha hech qanday bron topilmadi."
            actionLabel="Yangi uchrashuv belgilash"
            onAction={() => router.push('/appointments/book')}
          />
        )}

        {/* Click / Payme / Uzum Checkout Modal (Sandbox & Ready) */}
        {payingApp && (
          <Modal transparent animationType="fade" visible={Boolean(payingApp)}>
            <View style={styles.modalBackdrop}>
              <View style={styles.modalCard}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>To‘lovni amalga oshirish</Text>
                  <TouchableOpacity onPress={() => setPayingApp(null)}>
                    <X size={20} color={COLORS.navy} />
                  </TouchableOpacity>
                </View>

                {paymentSuccess ? (
                  <View style={styles.modalSuccessBox}>
                    <CheckCircle size={44} color={COLORS.success} />
                    <Text style={styles.modalSuccessTitle}>To‘lov muvaffaqiyatli qabul qilindi!</Text>
                    <Text style={styles.modalSuccessDesc}>
                      Konsultatsiya to‘lovi tasdiqlandi. Kvitansiya saqlandi.
                    </Text>
                    <TouchableOpacity
                      style={styles.modalDoneBtn}
                      onPress={() => setPayingApp(null)}
                    >
                      <Text style={styles.modalDoneBtnText}>Yopish</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <View style={styles.sandboxNotice}>
                      <AlertTriangle size={16} color={COLORS.goldDark} />
                      <Text style={styles.sandboxNoticeText}>
                        Sinov rejimi (Sandbox): Click va Payme to‘lov shlyuzi integratsiyasi tayyorlangan. Haqiqiy to‘lov mablag‘i yechilmaydi.
                      </Text>
                    </View>

                    <Text style={styles.modalAmountLabel}>To‘lov miqdori:</Text>
                    <Text style={styles.modalAmountVal}>{formatMoney(payingApp.total_amount)}</Text>

                    <Text style={styles.providerSelectLabel}>To‘lov usulini tanlang:</Text>
                    <View style={styles.providerRow}>
                      {[
                        { id: 'click', name: 'CLICK' },
                        { id: 'payme', name: 'PAYME' },
                        { id: 'uzum', name: 'UZUM BANK' },
                      ].map((prov) => (
                        <TouchableOpacity
                          key={prov.id}
                          style={[
                            styles.providerCard,
                            selectedProvider === prov.id && styles.providerCardActive,
                          ]}
                          onPress={() => setSelectedProvider(prov.id as any)}
                        >
                          <Text
                            style={[
                              styles.providerCardName,
                              selectedProvider === prov.id && styles.providerCardNameActive,
                            ]}
                          >
                            {prov.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    <TouchableOpacity
                      style={styles.modalPayBtn}
                      onPress={handleExecutePayment}
                      disabled={isProcessingPayment}
                    >
                      <CreditCard size={16} color={COLORS.navy} />
                      <Text style={styles.modalPayBtnText}>
                        {isProcessingPayment ? 'O‘tkazilmoqda...' : `${selectedProvider.toUpperCase()} orqali to‘lash`}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </Modal>
        )}
      </View>
    </ResponsiveLayout>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 12,
  },
  pageTitle: {
    color: COLORS.navy,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  pageSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  bookNewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    gap: 6,
  },
  bookNewBtnText: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  filterTabsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },
  filterTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterTabActive: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  filterTabText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  filterTabTextActive: {
    color: COLORS.gold,
    fontWeight: '700',
  },
  list: {
    gap: 12,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(11, 20, 36, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
  },
  modalCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    width: '100%',
    maxWidth: 440,
    ...SHADOWS.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    color: COLORS.navy,
    fontSize: 18,
    fontWeight: '800',
  },
  sandboxNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.warningLight,
    padding: 10,
    borderRadius: RADIUS.md,
    gap: 8,
    marginBottom: 16,
  },
  sandboxNoticeText: {
    color: COLORS.navy,
    fontSize: 11,
    lineHeight: 16,
    flex: 1,
  },
  modalAmountLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
  modalAmountVal: {
    color: COLORS.navy,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 16,
  },
  providerSelectLabel: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
  },
  providerRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  providerCard: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.cream,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  providerCardActive: {
    borderColor: COLORS.gold,
    backgroundColor: COLORS.goldLight + '30',
    borderWidth: 2,
  },
  providerCardName: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '700',
  },
  providerCardNameActive: {
    color: COLORS.goldDark,
  },
  modalPayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gold,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    gap: 8,
  },
  modalPayBtnText: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '700',
  },
  modalSuccessBox: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  modalSuccessTitle: {
    color: COLORS.navy,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 12,
    marginBottom: 6,
  },
  modalSuccessDesc: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalDoneBtn: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
  },
  modalDoneBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
});
