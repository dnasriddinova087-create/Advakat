// Lawyer Profile Screen with Credentials, Bio, Services, Schedule, and Reviews
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  Star, 
  MapPin, 
  Briefcase, 
  ShieldCheck, 
  ShieldAlert, 
  GraduationCap, 
  Building2, 
  Clock, 
  Calendar, 
  MessageCircle, 
  CheckCircle2, 
  ArrowLeft 
} from 'lucide-react-native';
import ResponsiveLayout from '../../components/ResponsiveLayout';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../styles/theme';
import { formatMoney } from '../../utils/formatters';
import { getStoredLawyers } from '../../lib/storage';
import { INITIAL_REVIEWS } from '../../lib/mockData';
import { LawyerProfile } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';

export default function LawyerDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useLanguage();

  const [lawyer, setLawyer] = useState<LawyerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lawyers = getStoredLawyers();
    const found = lawyers.find((l) => l.id === id) || lawyers[0];
    setLawyer(found || null);
    setLoading(false);
  }, [id]);

  if (loading) return <ResponsiveLayout><LoadingState /></ResponsiveLayout>;
  if (!lawyer) return <ResponsiveLayout><ErrorState message="Advokat topilmadi" /></ResponsiveLayout>;

  return (
    <ResponsiveLayout>
      <View style={styles.container}>
        {/* Back navigation button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={16} color={COLORS.navy} />
          <Text style={styles.backBtnText}>Barcha advokatlarga qaytish</Text>
        </TouchableOpacity>

        {/* Profile Header Card */}
        <View style={styles.headerCard}>
          <View style={styles.headerRow}>
            <Image
              source={{ uri: lawyer.avatar_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400' }}
              style={styles.avatar}
            />

            <View style={styles.headerInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.fullName}>{lawyer.full_name}</Text>
              </View>

              {lawyer.is_verified ? (
                <View style={styles.verifiedBadge}>
                  <ShieldCheck size={14} color={COLORS.navy} />
                  <Text style={styles.verifiedText}>{t.verifiedBadge}</Text>
                  <Text style={styles.licenseText}>(Litsenziya: {lawyer.license_number})</Text>
                </View>
              ) : (
                <View style={styles.unverifiedBadge}>
                  <ShieldAlert size={14} color={COLORS.textMuted} />
                  <Text style={styles.unverifiedText}>{t.notVerifiedBadge}</Text>
                </View>
              )}

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <MapPin size={14} color={COLORS.gold} />
                  <Text style={styles.metaText}>{lawyer.region}, {lawyer.city}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Briefcase size={14} color={COLORS.gold} />
                  <Text style={styles.metaText}>{lawyer.experience_years} yil amaliy tajriba</Text>
                </View>
              </View>

              <View style={styles.ratingRow}>
                <Star size={16} color={COLORS.gold} fill={COLORS.gold} />
                <Text style={styles.ratingVal}>{lawyer.rating.toFixed(2)}</Text>
                <Text style={styles.reviewCount}>({lawyer.review_count} ta mijoz sharhi)</Text>
              </View>
            </View>

            {/* Quick Actions Card */}
            <View style={styles.ctaBox}>
              <Text style={styles.consultPriceLabel}>Boshlang‘ich konsultatsiya:</Text>
              <Text style={styles.consultPriceValue}>{formatMoney(lawyer.consultation_price)}</Text>

              <TouchableOpacity
                style={styles.bookCtaBtn}
                onPress={() => router.push(`/appointments/book?lawyerId=${lawyer.id}`)}
              >
                <Calendar size={16} color={COLORS.navy} />
                <Text style={styles.bookCtaBtnText}>Uchrashuv belgilash</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.chatCtaBtn}
                onPress={() => router.push(`/chat/conv-1`)}
              >
                <MessageCircle size={16} color={COLORS.navy} />
                <Text style={styles.chatCtaBtnText}>Xabar yuborish</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Content Columns: Details + Sidebar */}
        <View style={styles.detailsGrid}>
          {/* Left Column: Bio, Education, Services */}
          <View style={styles.mainCol}>
            {/* Biography */}
            <View style={styles.sectionCard}>
              <Text style={styles.cardSectionTitle}>Biografiya va kasbiy faoliyat</Text>
              <Text style={styles.bioText}>{lawyer.bio}</Text>
            </View>

            {/* Education and Firm */}
            <View style={styles.sectionCard}>
              <Text style={styles.cardSectionTitle}>Malaka va ta’lim</Text>
              <View style={styles.eduItem}>
                <GraduationCap size={18} color={COLORS.gold} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.eduTitle}>{lawyer.education || 'Oliy yuridik ma’lumot'}</Text>
                  <Text style={styles.eduSub}>O‘zbekiston Advokatlar palatasi a’zosi</Text>
                </View>
              </View>
              <View style={[styles.eduItem, { marginTop: 12 }]}>
                <Building2 size={18} color={COLORS.gold} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.eduTitle}>{lawyer.firm_name || 'Advokatlik tuzilmasi'}</Text>
                  <Text style={styles.eduSub}>Litsenziya: {lawyer.license_number}</Text>
                </View>
              </View>
            </View>

            {/* Services Offered */}
            <View style={styles.sectionCard}>
              <Text style={styles.cardSectionTitle}>Ko‘rsatiladigan yuridik xizmatlar</Text>
              {[
                { title: 'Og‘zaki / Onlayn huquqiy konsultatsiya', duration: '45 daqiqa', price: lawyer.consultation_price },
                { title: 'Hujjatlarni tahlil qilish va xulosa berish', duration: '1-2 kun', price: lawyer.consultation_price * 1.5 },
                { title: 'Sud da’vo arizalari va shikoyatlarni tuzish', duration: '2-3 kun', price: lawyer.consultation_price * 2 },
                { title: 'Sud va davlat organlarida to‘liq himoya', duration: 'Shartnoma asosida', price: lawyer.consultation_price * 4 },
              ].map((srv, idx) => (
                <View key={idx} style={styles.serviceRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.serviceName}>{srv.title}</Text>
                    <Text style={styles.serviceDuration}>Muddati: {srv.duration}</Text>
                  </View>
                  <Text style={styles.servicePrice}>{formatMoney(srv.price)}</Text>
                </View>
              ))}
            </View>

            {/* Reviews */}
            <View style={styles.sectionCard}>
              <Text style={styles.cardSectionTitle}>Mijozlar sharhlari ({lawyer.review_count})</Text>
              {INITIAL_REVIEWS.map((rev) => (
                <View key={rev.id} style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewerName}>{rev.client_name}</Text>
                    <View style={{ flexDirection: 'row', gap: 2 }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={12} color={COLORS.gold} fill={COLORS.gold} />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewText}>"{rev.comment}"</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Right Column: Schedule and Working Hours */}
          <View style={styles.sideCol}>
            <View style={styles.sectionCard}>
              <Text style={styles.cardSectionTitle}>Ish jadvali va qabul vaqtlari</Text>
              <View style={styles.scheduleList}>
                {[
                  { day: 'Dushanba', time: '09:00 - 18:00', open: true },
                  { day: 'Seshanba', time: '09:00 - 18:00', open: true },
                  { day: 'Chorshanba', time: '09:00 - 18:00', open: true },
                  { day: 'Payshanba', time: '09:00 - 18:00', open: true },
                  { day: 'Juma', time: '09:00 - 17:00', open: true },
                  { day: 'Shanba', time: '10:00 - 14:00 (Onlayn)', open: true },
                  { day: 'Yakshanba', time: 'Dam olish kuni', open: false },
                ].map((item, i) => (
                  <View key={i} style={styles.scheduleRow}>
                    <Text style={styles.scheduleDay}>{item.day}</Text>
                    <Text style={[styles.scheduleTime, !item.open && { color: COLORS.danger }]}>
                      {item.time}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Languages Supported */}
            <View style={styles.sectionCard}>
              <Text style={styles.cardSectionTitle}>Muloqot tillari</Text>
              <View style={styles.langPillsRow}>
                {lawyer.languages.map((l, i) => (
                  <View key={i} style={styles.langPill}>
                    <Text style={styles.langPillText}>{l}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>
    </ResponsiveLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  backBtnText: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '600',
  },
  headerCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.md,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.cream,
  },
  headerInfo: {
    flex: 2,
    minWidth: 260,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  fullName: {
    color: COLORS.navy,
    fontSize: 22,
    fontWeight: '800',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.goldLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    alignSelf: 'flex-start',
    gap: 4,
    marginBottom: 8,
  },
  verifiedText: {
    color: COLORS.navy,
    fontSize: 11,
    fontWeight: '700',
  },
  licenseText: {
    color: COLORS.navy,
    fontSize: 10,
  },
  unverifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cream,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    alignSelf: 'flex-start',
    gap: 4,
    marginBottom: 8,
  },
  unverifiedText: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingVal: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '800',
  },
  reviewCount: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
  ctaBox: {
    flex: 1,
    minWidth: 240,
    backgroundColor: COLORS.cream,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  consultPriceLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginBottom: 2,
  },
  consultPriceValue: {
    color: COLORS.navy,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
  },
  bookCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gold,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    gap: 8,
    marginBottom: 8,
  },
  bookCtaBtnText: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  chatCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 9,
    borderRadius: RADIUS.md,
    gap: 8,
  },
  chatCtaBtnText: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '600',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  mainCol: {
    flex: 2,
    minWidth: 320,
  },
  sideCol: {
    flex: 1,
    minWidth: 280,
  },
  sectionCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    ...SHADOWS.sm,
  },
  cardSectionTitle: {
    color: COLORS.navy,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 8,
  },
  bioText: {
    color: COLORS.text,
    fontSize: 13,
    lineHeight: 22,
  },
  eduItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  eduTitle: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '600',
  },
  eduSub: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cream,
  },
  serviceName: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '600',
  },
  serviceDuration: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  servicePrice: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  reviewItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cream,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reviewerName: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  reviewText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  scheduleList: {
    gap: 8,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cream,
  },
  scheduleDay: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '500',
  },
  scheduleTime: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '600',
  },
  langPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  langPill: {
    backgroundColor: COLORS.cream,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
  },
  langPillText: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '600',
  },
});
