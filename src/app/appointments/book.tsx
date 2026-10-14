// Book Appointment Screen with Conflict Prevention and Case Description
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert 
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  ArrowLeft, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react-native';
import ResponsiveLayout from '../../components/ResponsiveLayout';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../styles/theme';
import { formatMoney } from '../../utils/formatters';
import { hasAppointmentConflict, sanitizeText } from '../../lib/validation';
import { 
  getStoredLawyers, 
  getStoredAppointments, 
  saveStoredAppointments 
} from '../../lib/storage';
import { useAuth } from '../../hooks/useAuth';
import { Appointment, LawyerProfile } from '../../types';

export default function BookAppointmentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useAuth();

  const [lawyers, setLawyers] = useState<LawyerProfile[]>([]);
  const [selectedLawyerId, setSelectedLawyerId] = useState<string>((params.lawyerId as string) || '');
  const [selectedService, setSelectedService] = useState<string>('Boshlang‘ich onlayn maslahat (45 daqiqa)');
  const [appointmentDate, setAppointmentDate] = useState<string>('2026-10-25');
  const [selectedSlot, setSelectedSlot] = useState<string>('14:00 - 14:45');
  const [description, setDescription] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const availableSlots = [
    '09:00 - 09:45',
    '10:00 - 10:45',
    '11:00 - 11:45',
    '14:00 - 14:45',
    '15:00 - 15:45',
    '16:00 - 16:45',
  ];

  useEffect(() => {
    const list = getStoredLawyers();
    setLawyers(list);
    if (!selectedLawyerId && list.length > 0) {
      setSelectedLawyerId(list[0].id);
    }
  }, [selectedLawyerId]);

  const currentLawyer = lawyers.find((l) => l.id === selectedLawyerId) || lawyers[0];

  const handleBookingSubmit = () => {
    setErrorMsg('');
    if (!description.trim()) {
      setErrorMsg('Iltimos, huquqiy muammoingiz haqida qisqacha ma’lumot yozing.');
      return;
    }

    const [start, end] = selectedSlot.split(' - ');
    const existingApps = getStoredAppointments();

    // Check for scheduling conflict
    const conflict = hasAppointmentConflict(
      existingApps.filter((a) => a.lawyer_id === selectedLawyerId),
      appointmentDate,
      start,
      end
    );

    if (conflict) {
      setErrorMsg('Kechirasiz, ushbu vaqt oralig‘i allaqachon bron qilingan. Boshqa vaqtni tanlang.');
      return;
    }

    const newAppointment: Appointment = {
      id: `app-${Date.now()}`,
      client_id: user ? user.id : 'demo-client-id',
      client_name: user ? user.full_name : 'Sardor Qodirov',
      client_phone: user?.phone || '+998 90 333 44 55',
      lawyer_id: currentLawyer ? currentLawyer.id : 'lawyer-1',
      lawyer_name: currentLawyer ? currentLawyer.full_name : 'Rustam Kamolov',
      service_title: selectedService,
      appointment_date: appointmentDate,
      start_time: start,
      end_time: end,
      status: 'Pending',
      description: sanitizeText(description),
      total_amount: currentLawyer ? currentLawyer.consultation_price : 180000,
      payment_status: 'Pending',
      created_at: new Date().toISOString(),
    };

    const updated = [newAppointment, ...existingApps];
    saveStoredAppointments(updated);
    setSuccess(true);
  };

  return (
    <ResponsiveLayout>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={16} color={COLORS.navy} />
          <Text style={styles.backBtnText}>Orqaga qaytish</Text>
        </TouchableOpacity>

        {success ? (
          <View style={styles.successCard}>
            <View style={styles.successIconBox}>
              <CheckCircle size={48} color={COLORS.success} />
            </View>
            <Text style={styles.successTitle}>Uchrashuv muvaffaqiyatli bron qilindi!</Text>
            <Text style={styles.successSubtitle}>
              Bron so‘rovingiz advokatga yuborildi. Advokat tasdiqlashi bilan bildirishnoma olasiz va shaxsiy xavfsiz chat ochiladi.
            </Text>

            {/* Detailed Formal Receipt */}
            <View style={styles.receiptBox}>
              <View style={styles.receiptHeader}>
                <Text style={styles.receiptHeading}>RASMIY BRON KVITANSIYASI</Text>
                <Text style={styles.receiptId}>ID: APP-{Date.now().toString().slice(-6)}</Text>
              </View>

              <View style={styles.receiptItem}>
                <Text style={styles.receiptKey}>👤 Kim bilan (Advokat):</Text>
                <Text style={styles.receiptValue}>{currentLawyer?.full_name || 'Advokat'}</Text>
              </View>

              <View style={styles.receiptItem}>
                <Text style={styles.receiptKey}>📍 Hudud / Ofis:</Text>
                <Text style={styles.receiptValue}>{currentLawyer?.region || 'Toshkent shahri'}</Text>
              </View>

              <View style={styles.receiptItem}>
                <Text style={styles.receiptKey}>📅 Qachon (Sana):</Text>
                <Text style={styles.receiptValueHighlight}>{appointmentDate}</Text>
              </View>

              <View style={styles.receiptItem}>
                <Text style={styles.receiptKey}>⏰ Soat nechida (Vaqt):</Text>
                <Text style={styles.receiptValueHighlight}>{selectedSlot}</Text>
              </View>

              <View style={styles.receiptItem}>
                <Text style={styles.receiptKey}>💼 Xizmat turi:</Text>
                <Text style={styles.receiptValue}>{selectedService}</Text>
              </View>

              <View style={styles.receiptItem}>
                <Text style={styles.receiptKey}>👤 Mijoz (Kim bron qildi):</Text>
                <Text style={styles.receiptValue}>{user?.full_name || 'Hurmatli mijoz'}</Text>
              </View>

              <View style={styles.receiptItem}>
                <Text style={styles.receiptKey}>💰 Maslahat to‘lovi:</Text>
                <Text style={styles.receiptPrice}>
                  {formatMoney(currentLawyer?.consultation_price || 180000)}
                </Text>
              </View>

              <View style={styles.receiptStatusRow}>
                <Text style={styles.receiptKey}>🟢 Holati:</Text>
                <View style={styles.receiptStatusBadge}>
                  <Text style={styles.receiptStatusText}>Advokat tasdiqlashi kutilmoqda</Text>
                </View>
              </View>
            </View>

            <View style={styles.successActions}>
              <TouchableOpacity
                style={styles.toAppsBtn}
                onPress={() => router.push('/appointments')}
              >
                <Text style={styles.toAppsBtnText}>Mening bronlarimga o‘tish</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.toHomeBtn}
                onPress={() => router.push('/')}
              >
                <Text style={styles.toHomeBtnText}>Bosh sahifaga qaytish</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Onlayn yuridik maslahatga yozilish</Text>
            <Text style={styles.formSubtitle}>
              Advokat, qulay vaqt va muammoingiz mazmunini kiriting.
            </Text>

            {errorMsg ? (
              <View style={styles.errorNotice}>
                <AlertCircle size={16} color={COLORS.danger} />
                <Text style={styles.errorNoticeText}>{errorMsg}</Text>
              </View>
            ) : null}

            {/* Step 1: Select Lawyer */}
            <View style={styles.formSection}>
              <Text style={styles.fieldLabel}>1. Advokatni tanlang</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.lawyerScroll}>
                {lawyers.map((l) => (
                  <TouchableOpacity
                    key={l.id}
                    style={[
                      styles.lawyerSelectCard,
                      selectedLawyerId === l.id && styles.lawyerSelectCardActive,
                    ]}
                    onPress={() => setSelectedLawyerId(l.id)}
                  >
                    <Text style={styles.lawyerCardName} numberOfLines={1}>{l.full_name}</Text>
                    <Text style={styles.lawyerCardRegion}>{l.region}</Text>
                    <Text style={styles.lawyerCardPrice}>{formatMoney(l.consultation_price)}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Step 2: Select Date */}
            <View style={styles.formSection}>
              <Text style={styles.fieldLabel}>2. Qabul sanasini tanlang (YYYY-MM-DD)</Text>
              <View style={styles.inputWithIcon}>
                <Calendar size={18} color={COLORS.gold} />
                <TextInput
                  style={styles.input}
                  value={appointmentDate}
                  onChangeText={setAppointmentDate}
                  placeholder="2026-10-25"
                />
              </View>
            </View>

            {/* Step 3: Select Time Slot */}
            <View style={styles.formSection}>
              <Text style={styles.fieldLabel}>3. Bo‘sh vaqt oralig‘i</Text>
              <View style={styles.slotsGrid}>
                {availableSlots.map((slot) => (
                  <TouchableOpacity
                    key={slot}
                    style={[
                      styles.slotBtn,
                      selectedSlot === slot && styles.slotBtnActive,
                    ]}
                    onPress={() => setSelectedSlot(slot)}
                  >
                    <Clock size={13} color={selectedSlot === slot ? COLORS.navy : COLORS.gold} />
                    <Text style={[styles.slotText, selectedSlot === slot && styles.slotTextActive]}>
                      {slot}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Step 4: Problem description */}
            <View style={styles.formSection}>
              <Text style={styles.fieldLabel}>4. Huquqiy muammoning qisqacha tavsifi</Text>
              <TextInput
                style={styles.textArea}
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
                placeholder="Nizo sababi, qaysi tomon bilan bog‘liqligi, mavjud hujjatlar haqida yozing..."
                placeholderTextColor={COLORS.textMuted}
              />
            </View>

            {/* Summary & Submit */}
            <View style={styles.totalRow}>
              <View>
                <Text style={styles.totalLabel}>Konsultatsiya narxi:</Text>
                <Text style={styles.totalValue}>{formatMoney(currentLawyer?.consultation_price || 0)}</Text>
              </View>
              <TouchableOpacity style={styles.submitBtn} onPress={handleBookingSubmit}>
                <Text style={styles.submitBtnText}>Bronni tasdiqlash</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ResponsiveLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xl,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  backBtnText: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '600',
  },
  formCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.md,
  },
  formTitle: {
    color: COLORS.navy,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  formSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginBottom: 20,
  },
  errorNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.dangerLight,
    padding: 10,
    borderRadius: RADIUS.md,
    gap: 8,
    marginBottom: 16,
  },
  errorNoticeText: {
    color: COLORS.danger,
    fontSize: 13,
    flex: 1,
  },
  formSection: {
    marginBottom: 20,
  },
  fieldLabel: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  lawyerScroll: {
    flexDirection: 'row',
  },
  lawyerSelectCard: {
    width: 200,
    padding: 12,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.cream,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
  },
  lawyerSelectCardActive: {
    borderColor: COLORS.gold,
    backgroundColor: COLORS.goldLight + '30',
    borderWidth: 2,
  },
  lawyerCardName: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  lawyerCardRegion: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginBottom: 6,
  },
  lawyerCardPrice: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '800',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    height: 44,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.text,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  slotBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.cream,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 6,
  },
  slotBtnActive: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.goldDark,
  },
  slotText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '600',
  },
  slotTextActive: {
    color: COLORS.navy,
    fontWeight: '800',
  },
  textArea: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    padding: 12,
    fontSize: 14,
    color: COLORS.text,
    minHeight: 90,
    textAlignVertical: 'top',
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 8,
  },
  totalLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
  totalValue: {
    color: COLORS.navy,
    fontSize: 18,
    fontWeight: '800',
  },
  submitBtn: {
    backgroundColor: COLORS.gold,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
  },
  submitBtnText: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '700',
  },
  successCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.xxl,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.md,
  },
  successIconBox: {
    marginBottom: 16,
  },
  successTitle: {
    color: COLORS.navy,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  successSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 520,
    marginBottom: 20,
  },
  receiptBox: {
    backgroundColor: '#F8F9FB',
    padding: 20,
    borderRadius: RADIUS.lg,
    width: '100%',
    maxWidth: 520,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...SHADOWS.sm,
  },
  receiptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginBottom: 12,
  },
  receiptHeading: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.navy,
    letterSpacing: 1.2,
  },
  receiptId: {
    fontSize: 11,
    color: COLORS.goldDark,
    fontWeight: '700',
  },
  receiptItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  receiptKey: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  receiptValue: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: '600',
    textAlign: 'right',
    maxWidth: '55%',
  },
  receiptValueHighlight: {
    fontSize: 14,
    color: COLORS.navy,
    fontWeight: '800',
    textAlign: 'right',
  },
  receiptPrice: {
    fontSize: 15,
    color: COLORS.navy,
    fontWeight: '900',
  },
  receiptStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  receiptStatusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  receiptStatusText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '700',
  },
  successActions: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  toAppsBtn: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
  },
  toAppsBtnText: {
    color: COLORS.gold,
    fontSize: 13,
    fontWeight: '700',
  },
  toHomeBtn: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.cream,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  toHomeBtnText: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
  },
});
